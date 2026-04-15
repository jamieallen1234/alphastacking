import { dayKeyToUtcNoonUnix, seriesToNyDayPriceMap } from '@/lib/portfolioMath'
import { NTSD_SYNTHETIC_ANNUAL_DRAG } from '@/lib/syntheticChartConstants'
import type { PriceSeries } from '@/lib/yahooFinance'
import { fetchFirstTradeDateSec } from '@/lib/yahooFinance'

/** WisdomTree NTSD 90/60 framework: notional weights on daily returns (not capital weights). */
export const NTSD_SYNTHETIC_US_WEIGHT = 0.9
export const NTSD_SYNTHETIC_INTL_WEIGHT = 0.6

export async function ntsdSyntheticOverlapFirstTradeSec(): Promise<number> {
  const [spy, efa] = await Promise.all([
    fetchFirstTradeDateSec('SPY'),
    fetchFirstTradeDateSec('EFA'),
  ])
  return Math.max(spy, efa)
}

export interface NtsdMergedSeriesResult {
  series: PriceSeries
  /** Present when any chart day used the SPY+EFA proxy before real NTSD closes. */
  modeling: { firstRealNyDay: string } | null
}

/**
 * Pre–first-real-NTSD: chained daily returns 0.9×r_SPY + 0.6×r_EFA − drag/252.
 * From first overlapping real NTSD session onward: actual closes, scaled so the level is
 * continuous at the last synthetic day (preserves post-listing total return vs that anchor).
 */
export function buildNtsdMergedDailySeries(
  ntsd: PriceSeries,
  spy: PriceSeries,
  efa: PriceSeries
): NtsdMergedSeriesResult {
  const spyM = seriesToNyDayPriceMap(spy)
  const efaM = seriesToNyDayPriceMap(efa)
  const ntsdM = seriesToNyDayPriceMap(ntsd)

  const inter = [...spyM.keys()].filter((d) => efaM.has(d)).sort()
  if (inter.length === 0) {
    throw new Error('No SPY/EFA overlap for NTSD synthetic merge')
  }

  const ntsdOnCommon = inter.filter((d) => ntsdM.has(d)).sort()
  if (ntsdOnCommon.length === 0) {
    throw new Error('No NTSD sessions overlapping SPY/EFA for merge')
  }

  const firstReal = ntsdOnCommon[0]!
  const preDays = inter.filter((d) => d < firstReal)
  const dragDaily = NTSD_SYNTHETIC_ANNUAL_DRAG / 252

  if (preDays.length === 0) {
    return { series: ntsd, modeling: null }
  }

  const filledNtsd = forwardFillNtsdOnDays(inter, ntsdM, firstReal)
  const rFirst = filledNtsd.get(firstReal)
  if (rFirst == null || rFirst <= 0) {
    throw new Error('Invalid NTSD price on first real overlap day')
  }

  const mergedMap = new Map<string, number>()
  let syn = 100

  for (let i = 0; i < preDays.length; i++) {
    const d = preDays[i]!
    if (i > 0) {
      const prev = preDays[i - 1]!
      syn *= 1 + blendedReturn(spyM, efaM, prev, d, dragDaily)
    }
    mergedMap.set(d, syn)
  }

  const synBeforeReal = syn

  const postDays = inter.filter((d) => d >= firstReal)
  for (const d of postDays) {
    const r = filledNtsd.get(d)
    if (r == null || r <= 0) continue
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

  if (timestamps.length < 2) {
    throw new Error('Merged NTSD series has insufficient points')
  }

  return {
    series: { symbol: ntsd.symbol, timestamps, prices },
    modeling: { firstRealNyDay: firstReal },
  }
}

function blendedReturn(
  spyM: Map<string, number>,
  efaM: Map<string, number>,
  prevDay: string,
  day: string,
  dragDaily: number
): number {
  const s0 = spyM.get(prevDay)!
  const s1 = spyM.get(day)!
  const e0 = efaM.get(prevDay)!
  const e1 = efaM.get(day)!
  if (s0 <= 0 || e0 <= 0) return 0
  const rS = s1 / s0 - 1
  const rE = e1 / e0 - 1
  return NTSD_SYNTHETIC_US_WEIGHT * rS + NTSD_SYNTHETIC_INTL_WEIGHT * rE - dragDaily
}

/** For NY days ≥ firstReal, carry last NTSD close through SPY/EFA-only holidays. */
function forwardFillNtsdOnDays(
  interSorted: string[],
  ntsdM: Map<string, number>,
  firstReal: string
): Map<string, number> {
  const out = new Map<string, number>()
  let last: number | null = null
  for (const d of interSorted) {
    const v = ntsdM.get(d)
    if (v != null && v > 0) last = v
    if (d >= firstReal) {
      if (last != null) out.set(d, last)
    }
  }
  return out
}
