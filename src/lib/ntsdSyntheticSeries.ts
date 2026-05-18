import {
  blendedSyntheticOverlapFirstTradeSec,
  buildBlendedSyntheticSeries,
  type BlendedSyntheticResult,
} from '@/lib/buildBlendedSyntheticSeries'
import { NTSD_SYNTHETIC_ANNUAL_DRAG } from '@/lib/syntheticChartConstants'
import type { PriceSeries } from '@/lib/yahooFinance'

/** WisdomTree NTSD 90/60 framework: notional weights on daily returns (not capital weights). */
export const NTSD_SYNTHETIC_US_WEIGHT = 0.9
export const NTSD_SYNTHETIC_INTL_WEIGHT = 0.6

export function ntsdSyntheticOverlapFirstTradeSec(): Promise<number> {
  return blendedSyntheticOverlapFirstTradeSec(['SPY', 'EFA'])
}

export type NtsdMergedSeriesResult = BlendedSyntheticResult

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
  return buildBlendedSyntheticSeries({
    target: ntsd,
    components: [
      { symbol: 'SPY', series: spy, weight: NTSD_SYNTHETIC_US_WEIGHT },
      { symbol: 'EFA', series: efa, weight: NTSD_SYNTHETIC_INTL_WEIGHT },
    ],
    annualDrag: NTSD_SYNTHETIC_ANNUAL_DRAG,
  })
}
