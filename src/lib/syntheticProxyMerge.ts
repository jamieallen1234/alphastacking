import { dayKeyToUtcNoonUnix, seriesToNyDayPriceMap } from '@/lib/portfolioMath'
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

export async function heqlSyntheticOverlapFirstTradeSec(): Promise<number> {
  return fetchFirstTradeDateSec('HEQT.TO')
}

/** Same S&P CAD anchor as HEQL for pre-listing 1.25× simulation. */
export async function usslSyntheticOverlapFirstTradeSec(): Promise<number> {
  return fetchFirstTradeDateSec('HEQT.TO')
}

/** Nasdaq-100 anchor for pre-listing 1.25× simulation (QQQ adj. TR, then CAD in chart pipeline). */
export async function qqqlSyntheticOverlapFirstTradeSec(): Promise<number> {
  return fetchFirstTradeDateSec('QQQ')
}
