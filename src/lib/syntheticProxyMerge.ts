import { CAD_UNHEDGED_SP500_PROXY_SYMBOL } from '@/lib/cadUsdConversion'
import { dayKeyToUtcNoonUnix, nyTradingDayKey, seriesToNyDayPriceMap } from '@/lib/portfolioMath'
import { STACKED_PRODUCT_PROXY_ANNUAL_BORROW_PER_OVERLAY_SLICE } from '@/lib/syntheticChartConstants'
import type { PriceSeries } from '@/lib/yahooFinance'
import { fetchFirstTradeDateSec } from '@/lib/yahooFinance'

export interface SyntheticProxyModeling {
  firstRealNyDay: string
}

export interface LeveredUnderlyingMergeResult {
  series: PriceSeries
  modeling: SyntheticProxyModeling | null
}

/**
 * Pre–first-real target: chained daily returns `leverage × r_underlying − annualDrag/252`.
 * Underlying prices must be Yahoo **adjusted** closes: daily `r_underlying` is **total return**
 * (dividends reinvested per Yahoo’s adjustment). `leverage × r` scales that entire TR — including
 * the dividend/reinvestment piece — by the notional factor (e.g. 1.25× for HEQL vs HEQT).
 * From first overlapping real target session onward: actual closes, scaled continuous at the
 * synthetic anchor (same pattern as NTSD).
 */
export function buildLeveredUnderlyingMergeSeries(
  target: PriceSeries,
  underlying: PriceSeries,
  leverage: number,
  annualDrag: number,
  /** If set, first “real” target day is the earliest common session on or after this (YYYY-MM-DD). */
  firstRealNyFloor?: string
): LeveredUnderlyingMergeResult {
  const undM = seriesToNyDayPriceMap(underlying)
  const tarM = seriesToNyDayPriceMap(target)
  const undDays = [...undM.keys()].sort()

  const onCommon = undDays.filter((d) => tarM.has(d)).sort()
  if (onCommon.length === 0) {
    throw new Error('No overlapping target/underlying sessions for synthetic merge')
  }

  const dataFirst = onCommon[0]!
  const firstReal =
    firstRealNyFloor != null
      ? (onCommon.find((d) => d >= firstRealNyFloor) ?? dataFirst)
      : dataFirst
  const preDays = undDays.filter((d) => d < firstReal)
  const dragDaily = annualDrag / 252

  if (preDays.length === 0) {
    return { series: target, modeling: null }
  }

  const filledTar = forwardFillTargetOnUnderlyingDays(undDays, tarM, firstReal)
  const rFirst = filledTar.get(firstReal)
  if (rFirst == null || rFirst <= 0) {
    throw new Error('Invalid target price on first real overlap day')
  }

  const mergedMap = new Map<string, number>()
  let syn = 100

  for (let i = 0; i < preDays.length; i++) {
    const d = preDays[i]!
    if (i > 0) {
      const prev = preDays[i - 1]!
      const u0 = undM.get(prev)!
      const u1 = undM.get(d)!
      if (u0 > 0 && u1 > 0) {
        const ru = u1 / u0 - 1
        syn *= 1 + leverage * ru - dragDaily
      }
    }
    mergedMap.set(d, syn)
  }

  const synBeforeReal = syn
  const postDays = undDays.filter((d) => d >= firstReal)
  for (const d of postDays) {
    const r = filledTar.get(d)
    if (r != null && r > 0) {
      mergedMap.set(d, synBeforeReal * (r / rFirst))
    }
  }

  const sortedKeys = [...mergedMap.keys()].sort()
  const timestamps: number[] = []
  const prices: number[] = []
  for (const d of sortedKeys) {
    const p = mergedMap.get(d)
    if (p != null && p > 0) {
      timestamps.push(dayKeyToUtcNoonUnix(d))
      prices.push(p)
    }
  }

  if (timestamps.length < 2) {
    throw new Error('Merged synthetic target series has insufficient points')
  }

  return {
    series: { symbol: target.symbol, timestamps, prices },
    modeling: { firstRealNyDay: firstReal },
  }
}

function forwardFillTargetOnUnderlyingDays(
  undDaysSorted: string[],
  tarM: Map<string, number>,
  firstReal: string
): Map<string, number> {
  const out = new Map<string, number>()
  let last: number | null = null
  for (const d of undDaysSorted) {
    const v = tarM.get(d)
    if (v != null && v > 0) last = v
    if (d >= firstReal && last != null) {
      out.set(d, last)
    }
  }
  return out
}

export async function mateSyntheticOverlapFirstTradeSec(): Promise<number> {
  return fetchFirstTradeDateSec('RSST')
}

/** Joint history for HFGM uses ASGM (1.5× daily returns minus `HFGM_ASGM_SYNTHETIC_ANNUAL_DRAG` / 252 in merge) before HFGM’s first real session. */
export async function hfgmSyntheticOverlapFirstTradeSec(): Promise<number> {
  return fetchFirstTradeDateSec('ASGM')
}

export async function heqlSyntheticOverlapFirstTradeSec(): Promise<number> {
  return fetchFirstTradeDateSec('HEQT.TO')
}

/** USSL 1.25× sleeve: VFV.TO when CAD (unhedged S&P proxy), SPY when USD. Chart benchmark may be XSP.TO separately. */
export async function usslSyntheticOverlapFirstTradeSec(cadDenominated: boolean): Promise<number> {
  return fetchFirstTradeDateSec(cadDenominated ? CAD_UNHEDGED_SP500_PROXY_SYMBOL : 'SPY')
}

/** Nasdaq-100 anchor for pre-listing 1.25× simulation (QQQ adj. TR, then CAD in chart pipeline). */
export async function qqqlSyntheticOverlapFirstTradeSec(): Promise<number> {
  return fetchFirstTradeDateSec('QQQ')
}

/** Joint start for multi-leg stacked-product chart proxies (IBIT+GLD, etc.): latest first listing among legs. */
export async function stackedProductProxyOverlapFirstTradeSec(legSymbols: string[]): Promise<number> {
  const secs = await Promise.all(legSymbols.map((s) => fetchFirstTradeDateSec(s)))
  return Math.max(...secs)
}

export type PreInceptionStackMergeOptions = {
  /**
   * Sum of sleeve notionals % from `ETF_STACK_EXPOSURE_BY_SLUG` (e.g. 200 for a 100%+100% stack).
   * Financing drag applies to **max(0, grossExposurePct − 100)** / 100 at `STACKED_PRODUCT_PROXY_ANNUAL_BORROW_PER_OVERLAY_SLICE` / 252.
   */
  grossExposurePct?: number
}

/**
 * Pre-inception: multiply stacked-leg daily returns on sessions **before** the target’s first NY day;
 * subtract wholesale financing on **gross exposure above 100%** (`grossExposurePct`); from first real session
 * onward, scale the target’s actual TR to the synthetic anchor (same re-leveling as MATE/RSST).
 */
export function buildPreInceptionProductStackMerge(
  target: PriceSeries,
  legs: PriceSeries[],
  options?: PreInceptionStackMergeOptions
): { series: PriceSeries; modeling: SyntheticProxyModeling | null } {
  if (legs.length < 1) return { series: target, modeling: null }
  const tarM = seriesToNyDayPriceMap(target)
  const tarDays = [...tarM.keys()].sort()
  if (tarDays.length < 1) return { series: target, modeling: null }
  const firstReal = tarDays[0]!
  const rFirst = tarM.get(firstReal)!
  if (rFirst <= 0) return { series: target, modeling: null }

  const legMaps = legs.map((s) => seriesToNyDayPriceMap(s))
  let inter = new Set(legMaps[0]!.keys())
  for (let i = 1; i < legMaps.length; i++) {
    inter = new Set([...inter].filter((d) => legMaps[i]!.has(d)))
  }
  const preDays = [...inter].filter((d) => d < firstReal).sort()
  if (preDays.length < 1) {
    return { series: target, modeling: null }
  }

  const gross = options?.grossExposurePct ?? 200
  const excessPct = Math.max(0, gross - 100)
  const borrowDragDaily =
    (excessPct / 100) * (STACKED_PRODUCT_PROXY_ANNUAL_BORROW_PER_OVERLAY_SLICE / 252)

  const mergedMap = new Map<string, number>()
  let syn = 100
  mergedMap.set(preDays[0]!, syn)
  for (let i = 1; i < preDays.length; i++) {
    const d0 = preDays[i - 1]!
    const d1 = preDays[i]!
    let factor = 1
    for (const lm of legMaps) {
      const p0 = lm.get(d0)!
      const p1 = lm.get(d1)!
      if (p0 <= 0 || p1 <= 0) return { series: target, modeling: null }
      factor *= p1 / p0
    }
    syn *= factor - borrowDragDaily
    mergedMap.set(d1, syn)
  }
  const synBeforeReal = syn

  for (const d of tarDays) {
    const r = tarM.get(d)!
    mergedMap.set(d, synBeforeReal * (r / rFirst))
  }

  const sortedKeys = [...mergedMap.keys()].sort()
  const timestamps: number[] = []
  const prices: number[] = []
  for (const d of sortedKeys) {
    const p = mergedMap.get(d)
    if (p != null && p > 0) {
      timestamps.push(dayKeyToUtcNoonUnix(d))
      prices.push(p)
    }
  }
  if (timestamps.length < 2) return { series: target, modeling: null }

  return {
    series: { symbol: target.symbol, timestamps, prices },
    modeling: { firstRealNyDay: nyTradingDayKey(target.timestamps[0]!) },
  }
}
