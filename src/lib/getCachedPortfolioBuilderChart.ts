import { unstable_cache } from 'next/cache'
import { computePortfolioChart, type PortfolioChartPayload } from '@/lib/computePortfolioChart'
import type { YahooRange } from '@/lib/yahooFinance'

const DAY = 86400
const chartLoaderByKey = new Map<string, () => Promise<PortfolioChartPayload>>()

function normalizeSymbols(symbols: string[]): string[] {
  return symbols.map((s) => s.trim().toUpperCase())
}

function normalizeWeights(weights: number[]): number[] {
  const sum = weights.reduce((a, b) => a + b, 0)
  if (!Number.isFinite(sum) || sum <= 0) return []
  return weights.map((w) => w / sum)
}

function cacheKeyFor(
  symbols: string[],
  weights: number[],
  range: YahooRange,
  cadDenominated: boolean
): string {
  const s = normalizeSymbols(symbols).join(',')
  const w = normalizeWeights(weights)
    .map((x) => x.toFixed(6))
    .join(',')
  return `${cadDenominated ? 'ca' : 'us'}:${range}:${s}:${w}`
}

export async function getCachedPortfolioBuilderChart(params: {
  symbols: string[]
  weights: number[]
  range: YahooRange
  cadDenominated: boolean
}): Promise<PortfolioChartPayload> {
  const symbols = normalizeSymbols(params.symbols)
  const weights = normalizeWeights(params.weights)
  const key = cacheKeyFor(symbols, weights, params.range, params.cadDenominated)
  let loader = chartLoaderByKey.get(key)
  if (!loader) {
    loader = unstable_cache(
      async () =>
        computePortfolioChart({
          symbols,
          weights,
          range: params.range,
          cadDenominated: params.cadDenominated,
          rebalanceSchedule: 'none',
        }),
      ['portfolio-builder-chart-v1', key],
      { revalidate: DAY }
    )
    chartLoaderByKey.set(key, loader)
  }
  return loader()
}

