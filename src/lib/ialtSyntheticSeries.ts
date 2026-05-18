import {
  blendedSyntheticOverlapFirstTradeSec,
  buildBlendedSyntheticSeries,
  type BlendedSyntheticResult,
} from '@/lib/buildBlendedSyntheticSeries'
import type { PriceSeries } from '@/lib/yahooFinance'

const IALT_FLSP_WEIGHT = 0.5
const IALT_DBMF_WEIGHT = 0.5

/** Joint overlap for IALT proxy: both sleeves must have prices. */
export function ialtSyntheticOverlapFirstTradeSec(): Promise<number> {
  return blendedSyntheticOverlapFirstTradeSec(['FLSP', 'DBMF'])
}

export type IaltMergedSeriesResult = BlendedSyntheticResult

/**
 * Pre–first-real-IALT: chained daily returns 0.5×r_FLSP + 0.5×r_DBMF on common NY sessions.
 * From first overlapping real IALT session onward: actual closes, continuous at the anchor.
 */
export function buildIaltMergedDailySeries(
  ialt: PriceSeries,
  flsp: PriceSeries,
  dbmf: PriceSeries
): IaltMergedSeriesResult {
  return buildBlendedSyntheticSeries({
    target: ialt,
    components: [
      { symbol: 'FLSP', series: flsp, weight: IALT_FLSP_WEIGHT },
      { symbol: 'DBMF', series: dbmf, weight: IALT_DBMF_WEIGHT },
    ],
  })
}
