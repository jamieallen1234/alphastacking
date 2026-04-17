import { unstable_cache } from 'next/cache'
import { fetchDailySeries, type PriceSeries, type YahooRange } from '@/lib/yahooFinance'
import { ETF_CHART_SYMBOLS, type EtfChartYahooSymbol } from '@/lib/etfChartSymbols'

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

function isRecoverableEmptySeriesError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err)
  return msg.includes('No price data') || msg.includes('No usable closes')
}

async function buildEtfChartPayload(
  yahooSymbol: string,
  range: YahooRange
): Promise<EtfChartPayload> {
  let effectiveRange: YahooRange = range
  let series: PriceSeries
  try {
    series = await fetchDailySeries(yahooSymbol, range)
  } catch (err) {
    if (range === 'max' || !isRecoverableEmptySeriesError(err)) throw err
    series = await fetchDailySeries(yahooSymbol, 'max')
    effectiveRange = 'max'
  }
  const spy = await fetchDailySeries('SPY', '1y')
  const first = series.prices[0]
  const last = series.prices[series.prices.length - 1]

  const values =
    first && first > 0 ? series.prices.map((p) => (p / first) * START_NOTIONAL) : []

  const betaVsSpy1y = computeBetaVsSpy(series, spy)

  return {
    symbol: series.symbol,
    range: effectiveRange,
    chartStartDate: formatNyDate(series.timestamps[0]!),
    timestamps: series.timestamps,
    values,
    totalReturnPercent: first && last && first > 0 ? ((last / first - 1) * 100) : null,
    betaVsSpy1y,
  }
}

function createEtfChartLoader(yahooSymbol: EtfChartYahooSymbol) {
  return unstable_cache(
    async (range: YahooRange = '1y') => buildEtfChartPayload(yahooSymbol, range),
    [
      'etf-chart',
      yahooSymbol,
      'v4-unified',
      'notional-10k',
      'adj-close',
      'beta-spy-1y',
    ],
    { revalidate: DAY }
  )
}

const CACHED_ETF_CHART: Record<EtfChartYahooSymbol, ReturnType<typeof createEtfChartLoader>> =
  {} as Record<EtfChartYahooSymbol, ReturnType<typeof createEtfChartLoader>>

for (const sym of ETF_CHART_SYMBOLS) {
  CACHED_ETF_CHART[sym] = createEtfChartLoader(sym)
}

/** Cached ETF price series + beta vs SPY (1y overlap). */
export async function getCachedEtfChart(
  yahooSymbol: string,
  range: YahooRange = '1y'
): Promise<EtfChartPayload> {
  const sym = yahooSymbol.toUpperCase() as EtfChartYahooSymbol
  const loader = CACHED_ETF_CHART[sym]
  if (!loader) {
    throw new Error(`Unsupported ETF chart symbol: ${yahooSymbol}`)
  }
  return loader(range)
}

/** MATE historically used `max` default in one path; keep 1y for hub parity. */
export async function getCachedMateChart(range: YahooRange = '1y') {
  return getCachedEtfChart('MATE', range)
}

export async function getCachedHdgeChart(range: YahooRange = '1y') {
  return getCachedEtfChart('HDGE.TO', range)
}

export async function getCachedRssyChart(range: YahooRange = '1y') {
  return getCachedEtfChart('RSSY', range)
}

export async function getCachedPfmnChart(range: YahooRange = '1y') {
  return getCachedEtfChart('PFMN.TO', range)
}

export async function getCachedHfgmChart(range: YahooRange = '1y') {
  return getCachedEtfChart('HFGM', range)
}

export async function getCachedArbChart(range: YahooRange = '1y') {
  return getCachedEtfChart('ARB.TO', range)
}

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
