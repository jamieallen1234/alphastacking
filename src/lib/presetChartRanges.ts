import type { YahooRange } from '@/lib/yahooFinance'

export interface PresetChartRangeOption {
  range: YahooRange
  label: string
}

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

/**
 * Shorter Yahoo windows only if the basket has been overlapped long enough; otherwise we’d be
 * asking for more calendar span than exists since the youngest listing. **1Y** is always listed
 * (window is inception-clipped). **All** uses the preset `5y` Yahoo pull — not five full years
 * if overlap is shorter.
 */
export function availablePresetChartRanges(
  overlapStartYmd: string
): PresetChartRangeOption[] {
  const days = calendarDaysSinceOverlapStart(overlapStartYmd)
  const out: PresetChartRangeOption[] = []

  if (days >= 21) out.push({ range: '1mo', label: '1M' })
  if (days >= 45) out.push({ range: 'ytd', label: 'YTD' })
  /** Always offer 1Y so the default tab exists even for newer baskets (Yahoo window is inception-clipped). */
  out.push({ range: '1y', label: '1Y' })
  out.push({ range: '5y', label: 'All' })

  return out
}
