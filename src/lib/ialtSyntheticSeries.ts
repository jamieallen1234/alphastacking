import { dayKeyToUtcNoonUnix, seriesToNyDayPriceMap } from '@/lib/portfolioMath'
import type { PriceSeries } from '@/lib/yahooFinance'
import { fetchFirstTradeDateSec } from '@/lib/yahooFinance'

const IALT_FLSP_WEIGHT = 0.5
const IALT_DBMF_WEIGHT = 0.5

/** Joint overlap for IALT proxy: both sleeves must have prices. */
export async function ialtSyntheticOverlapFirstTradeSec(): Promise<number> {
  const [flsp, dbmf] = await Promise.all([
    fetchFirstTradeDateSec('FLSP'),
    fetchFirstTradeDateSec('DBMF'),
  ])
  return Math.max(flsp, dbmf)
}

export interface IaltMergedSeriesResult {
  series: PriceSeries
  modeling: { firstRealNyDay: string } | null
}

/**
 * Pre–first-real-IALT: chained daily returns 0.5×r_FLSP + 0.5×r_DBMF on common NY sessions.
 * From first overlapping real IALT session onward: actual closes, continuous at the anchor.
 */
export function buildIaltMergedDailySeries(
  ialt: PriceSeries,
  flsp: PriceSeries,
  dbmf: PriceSeries
): IaltMergedSeriesResult {
  const flspM = seriesToNyDayPriceMap(flsp)
  const dbmfM = seriesToNyDayPriceMap(dbmf)
  const ialtM = seriesToNyDayPriceMap(ialt)

  const inter = [...flspM.keys()].filter((d) => dbmfM.has(d)).sort()
  if (inter.length === 0) {
    throw new Error('No FLSP/DBMF overlap for IALT synthetic merge')
  }

  const ialtOnCommon = inter.filter((d) => ialtM.has(d)).sort()
  if (ialtOnCommon.length === 0) {
    throw new Error('No IALT sessions overlapping FLSP/DBMF for merge')
  }

  const firstReal = ialtOnCommon[0]!
  const preDays = inter.filter((d) => d < firstReal)

  if (preDays.length === 0) {
    return { series: ialt, modeling: null }
  }

  const filledIalt = forwardFillIaltOnDays(inter, ialtM, firstReal)
  const rFirst = filledIalt.get(firstReal)
  if (rFirst == null || rFirst <= 0) {
    throw new Error('Invalid IALT price on first real overlap day')
  }

  const mergedMap = new Map<string, number>()
  let syn = 100

  for (let i = 0; i < preDays.length; i++) {
    const d = preDays[i]!
    if (i > 0) {
      const prev = preDays[i - 1]!
      syn *= 1 + blendedFlspDbmfReturn(flspM, dbmfM, prev, d)
    }
    mergedMap.set(d, syn)
  }

  const synBeforeReal = syn

  const postDays = inter.filter((d) => d >= firstReal)
  for (const d of postDays) {
    const r = filledIalt.get(d)
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
    throw new Error('Merged IALT series has insufficient points')
  }

  return {
    series: { symbol: ialt.symbol, timestamps, prices },
    modeling: { firstRealNyDay: firstReal },
  }
}

function blendedFlspDbmfReturn(
  flspM: Map<string, number>,
  dbmfM: Map<string, number>,
  prevDay: string,
  day: string
): number {
  const f0 = flspM.get(prevDay)!
  const f1 = flspM.get(day)!
  const d0 = dbmfM.get(prevDay)!
  const d1 = dbmfM.get(day)!
  if (f0 <= 0 || d0 <= 0) return 0
  const rF = f1 / f0 - 1
  const rD = d1 / d0 - 1
  return IALT_FLSP_WEIGHT * rF + IALT_DBMF_WEIGHT * rD
}

function forwardFillIaltOnDays(
  interSorted: string[],
  ialtM: Map<string, number>,
  firstReal: string
): Map<string, number> {
  const out = new Map<string, number>()
  let last: number | null = null
  for (const d of interSorted) {
    const v = ialtM.get(d)
    if (v != null && v > 0) last = v
    if (d >= firstReal) {
      if (last != null) out.set(d, last)
    }
  }
  return out
}
