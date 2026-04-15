import type { YahooRange } from '@/lib/yahooFinance'

export interface PresetChartRangeOption {
  range: YahooRange
  label: string
  /** True when overlapping history is shorter than this window (tab is greyed out). */
  disabled: boolean
}

/**
 * Minimum calendar days of **joint** history for a range to be selectable.
 * Eligibility uses only calendar time since overlap inception — not the current chart’s date span
 * (that span changes when you switch 1Y vs 5Y vs All and would make tabs flicker).
 */
export const PRESET_RANGE_MIN_DAYS = {
  '1mo': 21,
  ytd: 45,
  /** Yahoo 1y window works with short overlap (clipped); do not require a full calendar year. */
  '1y': 21,
  '2y': 730,
  '5y': 1825,
  /** All = full daily history from overlap (see period fetch in compute); always on. */
  max: 0,
} as const

const PRESET_TABS: { range: keyof typeof PRESET_RANGE_MIN_DAYS; label: string }[] = [
  { range: '1mo', label: '1M' },
  { range: 'ytd', label: 'YTD' },
  { range: '1y', label: '1Y' },
  { range: '2y', label: '2Y' },
  { range: '5y', label: '5Y' },
  { range: 'max', label: 'All' },
]

/** Calendar days from overlap start (YYYY-MM-DD) to now (UTC-based day count). */
export function calendarDaysSinceOverlapStart(overlapStartYmd: string): number {
  const parts = overlapStartYmd.split('-').map(Number)
  const y = parts[0]!
  const mo = parts[1]!
  const d = parts[2]!
  if (!y || !mo || !d) return 0
  const t0 = Date.UTC(y, mo - 1, d, 17, 0, 0)
  return Math.max(0, Math.floor((Date.now() - t0) / 86_400_000))
}

/** Stable day count for range tabs: calendar days since overlap, at least 1 (avoids all-grey on day 0). */
export function overlapCalendarDaysForPresetUi(overlapStartYmd: string): number {
  return Math.max(1, calendarDaysSinceOverlapStart(overlapStartYmd))
}

export function isPresetRangeEnabled(range: YahooRange, overlapDays: number): boolean {
  const min = PRESET_RANGE_MIN_DAYS[range as keyof typeof PRESET_RANGE_MIN_DAYS]
  if (min === undefined) return false
  return overlapDays >= min
}

/**
 * All preset range tabs are always shown. Tabs that need more joint history than exists are
 * disabled (greyed). **All** (`max`) is always enabled.
 */
export function availablePresetChartRanges(overlapDays: number): PresetChartRangeOption[] {
  return PRESET_TABS.map(({ range, label }) => ({
    range: range as YahooRange,
    label,
    disabled: !isPresetRangeEnabled(range as YahooRange, overlapDays),
  }))
}
