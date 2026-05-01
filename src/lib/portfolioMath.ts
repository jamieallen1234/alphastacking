import type { PriceSeries } from './yahooFinance'

/** Normalized series start at 1; chart payloads multiply by this for a $10k-style axis. */
export const CHART_NOTIONAL_START_USD = 10_000

export interface PortfolioSeriesPoint {
  t: number
  /** Portfolio value with initial allocation = 1 */
  value: number
  /** NY trading date YYYY-MM-DD (for benchmark alignment) */
  nyDay?: string
}

/** NY trading calendar date YYYY-MM-DD (for aligning Yahoo bars that use different unix seconds). */
export function nyTradingDayKey(tsSec: number): string {
  return new Date(tsSec * 1000).toLocaleDateString('en-CA', { timeZone: 'America/New_York' })
}

/** Last bar per NY day wins (Yahoo sometimes has multiple entries per calendar day). */
export function seriesToNyDayPriceMap(series: PriceSeries): Map<string, number> {
  const m = new Map<string, number>()
  for (let i = 0; i < series.timestamps.length; i++) {
    const day = nyTradingDayKey(series.timestamps[i]!)
    m.set(day, series.prices[i]!)
  }
  return m
}

export function dayKeyToUtcNoonUnix(dayKey: string): number {
  const [y, mo, d] = dayKey.split('-').map(Number)
  return Math.floor(Date.UTC(y, mo - 1, d, 12, 0, 0) / 1000)
}

/**
 * Buy-and-hold from the first aligned **NY trading day** where every symbol has a close.
 * Yahoo daily bars often use slightly different unix timestamps across tickers; intersecting on
 * calendar day fixes empty intersections.
 */
export function buildBuyAndHoldSeries(
  series: PriceSeries[],
  weights: number[]
): PortfolioSeriesPoint[] {
  if (series.length !== weights.length) {
    throw new Error('Series count must match weights count')
  }
  if (series.length === 0) return []

  const dayMaps = series.map((s) => seriesToNyDayPriceMap(s))

  let common: Set<string> | null = null
  for (const dm of dayMaps) {
    const keys = new Set(dm.keys())
    if (common === null) {
      common = keys
    } else {
      const next = new Set<string>()
      for (const k of common) {
        if (keys.has(k)) next.add(k)
      }
      common = next
    }
  }
  if (!common || common.size === 0) return []

  const sortedDays = [...common].sort()
  const day0 = sortedDays[0]!
  const basePrices = dayMaps.map((dm) => dm.get(day0))
  if (basePrices.some((p) => p == null || p <= 0)) return []

  const out: PortfolioSeriesPoint[] = []
  for (const day of sortedDays) {
    let v = 0
    for (let i = 0; i < dayMaps.length; i++) {
      const p = dayMaps[i]!.get(day)
      const p0 = basePrices[i]!
      if (p == null || p <= 0) {
        v = NaN
        break
      }
      v += weights[i]! * (p / p0)
    }
    if (!Number.isNaN(v)) {
      out.push({ t: dayKeyToUtcNoonUnix(day), value: v, nyDay: day })
    }
  }
  return out
}

function calendarYearFromNyDay(nyDay: string): number {
  const y = Number(nyDay.split('-')[0])
  return Number.isFinite(y) ? y : 0
}

/**
 * Same calendar alignment as {@link buildBuyAndHoldSeries}; after each session’s close, apply
 * daily returns, then on the first session of a new **calendar year** rescale holdings to `weights`.
 */
export function buildAnnuallyRebalancedSeries(
  series: PriceSeries[],
  weights: number[]
): PortfolioSeriesPoint[] {
  if (series.length !== weights.length) {
    throw new Error('Series count must match weight count')
  }
  if (series.length === 0) return []

  const dayMaps = series.map((s) => seriesToNyDayPriceMap(s))

  let common: Set<string> | null = null
  for (const dm of dayMaps) {
    const keys = new Set(dm.keys())
    if (common === null) {
      common = keys
    } else {
      const next = new Set<string>()
      for (const k of common) {
        if (keys.has(k)) next.add(k)
      }
      common = next
    }
  }
  if (!common || common.size === 0) return []

  const sortedDays = [...common].sort()
  const day0 = sortedDays[0]!
  if (dayMaps.some((dm) => {
    const p = dm.get(day0)
    return p == null || p <= 0
  })) {
    return []
  }

  const wSum = weights.reduce((a, b) => a + b, 0)
  if (Math.abs(wSum - 1) > 1e-6) {
    throw new Error('Annual rebalance weights must sum to 1')
  }

  let h = weights.map((w) => w)
  const out: PortfolioSeriesPoint[] = []

  for (let k = 0; k < sortedDays.length; k++) {
    const day = sortedDays[k]!
    if (k > 0) {
      const prev = sortedDays[k - 1]!
      for (let i = 0; i < dayMaps.length; i++) {
        const p0 = dayMaps[i]!.get(prev)
        const p1 = dayMaps[i]!.get(day)
        if (p0 == null || p1 == null || p0 <= 0 || p1 <= 0) {
          return []
        }
        h[i]! *= p1 / p0
      }
      if (calendarYearFromNyDay(day) !== calendarYearFromNyDay(prev)) {
        const tot = h.reduce((a, b) => a + b, 0)
        if (tot <= 0) return []
        h = weights.map((w) => w * tot)
      }
    }

    const value = h.reduce((a, b) => a + b, 0)
    if (!Number.isFinite(value) || value <= 0) return []
    out.push({ t: dayKeyToUtcNoonUnix(day), value, nyDay: day })
  }

  return out
}

/**
 * Each symbol’s total return % from the first to last **common** NY trading day (same intersection
 * as {@link buildBuyAndHoldSeries}). Uses the already-clipped, model-adjusted daily series.
 */
export function perHoldingTotalReturnPercentsAligned(
  series: PriceSeries[],
  symbols: string[]
): { symbol: string; totalReturnPercent: number | null }[] {
  if (series.length !== symbols.length) {
    throw new Error('Series count must match symbol count')
  }
  if (series.length === 0) return []

  const dayMaps = series.map((s) => seriesToNyDayPriceMap(s))

  let common: Set<string> | null = null
  for (const dm of dayMaps) {
    const keys = new Set(dm.keys())
    if (common === null) {
      common = keys
    } else {
      const next = new Set<string>()
      for (const k of common) {
        if (keys.has(k)) next.add(k)
      }
      common = next
    }
  }
  if (!common || common.size < 2) {
    return symbols.map((symbol) => ({ symbol, totalReturnPercent: null }))
  }

  const sortedDays = [...common].sort()
  const day0 = sortedDays[0]!
  const dayN = sortedDays[sortedDays.length - 1]!

  return symbols.map((symbol, i) => {
    const dm = dayMaps[i]!
    const p0 = dm.get(day0)
    const p1 = dm.get(dayN)
    if (p0 == null || p1 == null || p0 <= 0) return { symbol, totalReturnPercent: null }
    return { symbol, totalReturnPercent: ((p1 / p0) - 1) * 100 }
  })
}

function yearQuarterKey(nyDay: string): string {
  const [y, m] = nyDay.split('-').map(Number)
  if (!y || !m) return nyDay
  const q = Math.floor((m - 1) / 3) + 1
  return `${y}-Q${q}`
}

/**
 * Same calendar alignment as {@link buildBuyAndHoldSeries}; after each session’s close, apply
 * daily returns, then on the first session of a new calendar quarter rescale holdings to `weights`.
 */
export function buildQuarterlyRebalancedSeries(
  series: PriceSeries[],
  weights: number[]
): PortfolioSeriesPoint[] {
  if (series.length !== weights.length) {
    throw new Error('Series count must match weight count')
  }
  if (series.length === 0) return []

  const dayMaps = series.map((s) => seriesToNyDayPriceMap(s))

  let common: Set<string> | null = null
  for (const dm of dayMaps) {
    const keys = new Set(dm.keys())
    if (common === null) {
      common = keys
    } else {
      const next = new Set<string>()
      for (const k of common) {
        if (keys.has(k)) next.add(k)
      }
      common = next
    }
  }
  if (!common || common.size === 0) return []

  const sortedDays = [...common].sort()
  const day0 = sortedDays[0]!
  if (dayMaps.some((dm) => {
    const p = dm.get(day0)
    return p == null || p <= 0
  })) {
    return []
  }

  const wSum = weights.reduce((a, b) => a + b, 0)
  if (Math.abs(wSum - 1) > 1e-6) {
    throw new Error('Quarterly rebalance weights must sum to 1')
  }

  let h = weights.map((w) => w)
  const out: PortfolioSeriesPoint[] = []

  for (let k = 0; k < sortedDays.length; k++) {
    const day = sortedDays[k]!
    if (k > 0) {
      const prev = sortedDays[k - 1]!
      for (let i = 0; i < dayMaps.length; i++) {
        const p0 = dayMaps[i]!.get(prev)
        const p1 = dayMaps[i]!.get(day)
        if (p0 == null || p1 == null || p0 <= 0 || p1 <= 0) {
          return []
        }
        h[i]! *= p1 / p0
      }
      if (yearQuarterKey(day) !== yearQuarterKey(prev)) {
        const tot = h.reduce((a, b) => a + b, 0)
        if (tot <= 0) return []
        h = weights.map((w) => w * tot)
      }
    }

    const value = h.reduce((a, b) => a + b, 0)
    if (!Number.isFinite(value) || value <= 0) return []
    out.push({ t: dayKeyToUtcNoonUnix(day), value, nyDay: day })
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
 * Last `benchDays[i]` with `benchDays[i] <= day` (ISO `YYYY-MM-DD` sort order = chronological).
 * Returns index in `benchDays` or -1 if no day is on or before `day`.
 */
function upperBoundBenchDayIndex(benchDays: readonly string[], day: string): number {
  let lo = 0
  let hi = benchDays.length - 1
  let ans = -1
  while (lo <= hi) {
    const mid = (lo + hi) >> 1
    if (benchDays[mid]! <= day) {
      ans = mid
      lo = mid + 1
    } else {
      hi = mid - 1
    }
  }
  return ans
}

/**
 * Align benchmark to portfolio **NY calendar days** (same order as portfolio series points).
 *
 * When the benchmark is a different listing calendar (e.g. `XSP.TO` vs. US-listed legs), some
 * portfolio NY sessions have no local benchmark bar. We use the **last benchmark close on or
 * before** that NY day (carry forward), so CAD charts stay aligned without dropping the line.
 */
export function normalizedBenchmarkByNyDays(
  bench: PriceSeries,
  sortedNyDayKeys: string[]
): number[] | null {
  if (sortedNyDayKeys.length < 2) return null
  const dm = seriesToNyDayPriceMap(bench)
  const benchDays = [...dm.keys()]
    .filter((d) => {
      if (!d) return false
      const p = dm.get(d)
      return p != null && p > 0
    })
    .sort()
  if (benchDays.length === 0) return null

  const raw: number[] = []
  for (const day of sortedNyDayKeys) {
    if (!day) return null
    const idx = upperBoundBenchDayIndex(benchDays, day)
    if (idx < 0) return null
    const p = dm.get(benchDays[idx]!)
    if (p == null || p <= 0) return null
    raw.push(p)
  }
  const p0 = raw[0]!
  return raw.map((p) => p / p0)
}

/**
 * @deprecated Prefer normalizedBenchmarkByNyDays — kept for callers that still align on exact unix timestamps.
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

/**
 * Peak-to-trough drawdown on a positive equity curve (constant scale-invariant).
 * Returns the worst `(v / runningPeak - 1) * 100`, always ≤ 0 when defined.
 */
export function maxDrawdownPercentFromLevels(levels: number[]): number | null {
  if (levels.length < 2) return null
  let peak = levels[0]!
  if (peak <= 0) return null
  let worst = 0
  for (const v of levels) {
    if (v > peak) peak = v
    if (peak <= 0) return null
    const r = v / peak - 1
    if (r < worst) worst = r
  }
  return worst * 100
}
