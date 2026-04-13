import type { PriceSeries } from './yahooFinance'

export interface PortfolioSeriesPoint {
  t: number
  /** Portfolio value with initial allocation = 1 */
  value: number
}

/**
 * Buy-and-hold from the first aligned session: V(t) = Σ w_i × (P_i(t) / P_i(t₀)).
 * Weights should sum to 1.
 */
export function buildBuyAndHoldSeries(
  series: PriceSeries[],
  weights: number[]
): PortfolioSeriesPoint[] {
  if (series.length !== weights.length) {
    throw new Error('Series count must match weights count')
  }
  if (series.length === 0) return []

  const maps = series.map((s) => {
    const m = new Map<number, number>()
    for (let i = 0; i < s.timestamps.length; i++) {
      m.set(s.timestamps[i]!, s.prices[i]!)
    }
    return m
  })

  let common: Set<number> | null = null
  for (const m of maps) {
    const keys = new Set<number>(m.keys())
    if (common === null) {
      common = keys
    } else {
      const next = new Set<number>()
      for (const k of common) {
        if (keys.has(k)) next.add(k)
      }
      common = next
    }
  }
  if (!common || common.size === 0) return []

  const sorted = [...common].sort((a, b) => a - b)
  const t0 = sorted[0]!
  const basePrices = maps.map((m) => m.get(t0))
  if (basePrices.some((p) => p == null || p <= 0)) return []

  const out: PortfolioSeriesPoint[] = []
  for (const t of sorted) {
    let v = 0
    for (let i = 0; i < maps.length; i++) {
      const p = maps[i]!.get(t)
      const p0 = basePrices[i]!
      if (p == null || p <= 0) {
        v = NaN
        break
      }
      v += weights[i]! * (p / p0)
    }
    if (!Number.isNaN(v)) out.push({ t, value: v })
  }
  return out
}

export function totalReturnPercent(points: PortfolioSeriesPoint[]): number | null {
  if (points.length < 2) return null
  const a = points[0]!.value
  const b = points[points.length - 1]!.value
  if (a <= 0) return null
  return ((b - a) / a) * 100
}

/**
 * 100% allocation to `bench`, normalized to 1 at the first timestamp in `alignToTimestamps`.
 * Returns null if any timestamp is missing from the benchmark series.
 */
export function normalizedBenchmarkSeries(
  bench: PriceSeries,
  alignToTimestamps: number[]
): number[] | null {
  if (alignToTimestamps.length < 2) return null
  const m = new Map<number, number>()
  for (let i = 0; i < bench.timestamps.length; i++) {
    m.set(bench.timestamps[i]!, bench.prices[i]!)
  }
  const raw: number[] = []
  for (const t of alignToTimestamps) {
    const p = m.get(t)
    if (p == null || p <= 0) return null
    raw.push(p)
  }
  const p0 = raw[0]!
  return raw.map((p) => p / p0)
}

export function totalReturnPercentFromValues(values: number[]): number | null {
  if (values.length < 2) return null
  const a = values[0]!
  const b = values[values.length - 1]!
  if (a <= 0) return null
  return ((b - a) / a) * 100
}
