import { unstable_cache } from 'next/cache'
import { fetchDailySeries, type YahooRange } from '@/lib/yahooFinance'

const DAY = 86400
const START_NOTIONAL = 10_000

export interface EtfChartPayload {
  symbol: string
  range: YahooRange
  chartStartDate: string
  timestamps: number[]
  values: number[]
  totalReturnPercent: number | null
  betaVsSpy1y: number | null
}

function formatNyDate(tsSec: number): string {
  return new Date(tsSec * 1000).toLocaleDateString('en-CA', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

export const getCachedMateChart = unstable_cache(
  async (range: YahooRange = 'max'): Promise<EtfChartPayload> => {
    const series = await fetchDailySeries('MATE', range)
    const spy = await fetchDailySeries('SPY', '1y')
    const first = series.prices[0]
    const last = series.prices[series.prices.length - 1]

    const values =
      first && first > 0
        ? series.prices.map((p) => (p / first) * START_NOTIONAL)
        : []

    const betaVsSpy1y = computeBetaVsSpy(series, spy)

    return {
      symbol: series.symbol,
      range,
      chartStartDate: formatNyDate(series.timestamps[0]!),
      timestamps: series.timestamps,
      values,
      totalReturnPercent:
        first && last && first > 0 ? ((last / first - 1) * 100) : null,
      betaVsSpy1y,
    }
  },
  ['etf-chart', 'MATE', 'v2', 'notional-10k', 'adj-close', 'beta-spy-1y'],
  { revalidate: DAY }
)

export const getCachedHdgeChart = unstable_cache(
  async (range: YahooRange = '1y'): Promise<EtfChartPayload> => {
    const series = await fetchDailySeries('HDGE.TO', range)
    const spy = await fetchDailySeries('SPY', '1y')
    const first = series.prices[0]
    const last = series.prices[series.prices.length - 1]

    const values =
      first && first > 0
        ? series.prices.map((p) => (p / first) * START_NOTIONAL)
        : []

    const betaVsSpy1y = computeBetaVsSpy(series, spy)

    return {
      symbol: series.symbol,
      range,
      chartStartDate: formatNyDate(series.timestamps[0]!),
      timestamps: series.timestamps,
      values,
      totalReturnPercent:
        first && last && first > 0 ? ((last / first - 1) * 100) : null,
      betaVsSpy1y,
    }
  },
  ['etf-chart', 'HDGE.TO', 'v1', 'notional-10k', 'adj-close', 'beta-spy-1y'],
  { revalidate: DAY }
)

function alignedDailyReturns(
  aTs: number[],
  aPx: number[],
  bTs: number[],
  bPx: number[]
): { aRet: number[]; bRet: number[] } {
  const bByTs = new Map<number, number>()
  for (let i = 1; i < bTs.length; i++) {
    const prev = bPx[i - 1]
    const cur = bPx[i]
    if (prev && cur && prev > 0) {
      bByTs.set(bTs[i]!, cur / prev - 1)
    }
  }

  const aRet: number[] = []
  const bRet: number[] = []
  for (let i = 1; i < aTs.length; i++) {
    const prev = aPx[i - 1]
    const cur = aPx[i]
    if (!prev || !cur || prev <= 0) continue
    const rA = cur / prev - 1
    const rB = bByTs.get(aTs[i]!)
    if (rB == null || !Number.isFinite(rB)) continue
    aRet.push(rA)
    bRet.push(rB)
  }
  return { aRet, bRet }
}

function computeBetaVsSpy(
  etf: { timestamps: number[]; prices: number[] },
  spy: { timestamps: number[]; prices: number[] }
): number | null {
  const { aRet, bRet } = alignedDailyReturns(etf.timestamps, etf.prices, spy.timestamps, spy.prices)
  if (aRet.length < 20 || bRet.length !== aRet.length) return null
  const meanA = aRet.reduce((s, x) => s + x, 0) / aRet.length
  const meanB = bRet.reduce((s, x) => s + x, 0) / bRet.length
  let cov = 0
  let varB = 0
  for (let i = 0; i < aRet.length; i++) {
    cov += (aRet[i]! - meanA) * (bRet[i]! - meanB)
    varB += (bRet[i]! - meanB) ** 2
  }
  if (varB <= 0) return null
  return cov / varB
}
