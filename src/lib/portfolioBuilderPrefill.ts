import type { PresetHolding } from '@/lib/presets/usInternational'

export type PortfolioPrefillHolding = { ticker: string; weightPct: number }

/** Map fractional model weights to integer percents that sum to exactly 100 (largest remainder). */
export function normalizeWeightsToIntegerPercents(weightPcts: number[]): number[] {
  const n = weightPcts.length
  if (n === 0) return []
  const sum = weightPcts.reduce((a, b) => a + b, 0)
  if (sum <= 0) return Array(n).fill(0)
  const exact = weightPcts.map((w) => (w / sum) * 100)
  const floors = exact.map((x) => Math.floor(x + 1e-9))
  let deficit = 100 - floors.reduce((a, b) => a + b, 0)
  const order = exact
    .map((x, i) => ({ i, frac: x - Math.floor(x + 1e-9) }))
    .sort((a, b) => b.frac - a.frac)
  const out = [...floors]
  for (let k = 0; k < deficit; k++) {
    out[order[k]!.i]++
  }
  return out
}

export function buildPortfolioBuilderPrefillHref(
  builderPath: string,
  holdings: PresetHolding[]
): string {
  if (holdings.length === 0) return builderPath
  const ints = normalizeWeightsToIntegerPercents(holdings.map((h) => h.weightPct))
  const symbols = holdings.map((h) => h.ticker.trim()).join(',')
  const weights = ints.join(',')
  const q = new URLSearchParams({ symbols, weights }).toString()
  return `${builderPath}?${q}`
}

export function parsePortfolioBuilderPrefill(
  searchParams: Record<string, string | string[] | undefined>
): PortfolioPrefillHolding[] | null {
  const symRaw = searchParams.symbols
  const wRaw = searchParams.weights
  const symStr = Array.isArray(symRaw) ? symRaw[0] : symRaw
  const wStr = Array.isArray(wRaw) ? wRaw[0] : wRaw
  if (typeof symStr !== 'string' || typeof wStr !== 'string') return null
  const tickers = symStr
    .split(',')
    .map((s) => decodeURIComponent(s.trim()))
    .filter(Boolean)
  const weightInts = wStr
    .split(',')
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => Number.isFinite(n) && n > 0)
  if (tickers.length < 1 || tickers.length !== weightInts.length) return null
  const total = weightInts.reduce((a, b) => a + b, 0)
  if (total !== 100) return null
  if (tickers.length > 20) return null
  return tickers.map((ticker, i) => ({ ticker, weightPct: weightInts[i]! }))
}
