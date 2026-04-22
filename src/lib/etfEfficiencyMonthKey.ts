/**
 * Calendar month bucket in America/New_York — used as `unstable_cache` key so
 * efficiency grades recompute on the first request of each new month (site ETF
 * session convention).
 */
export function efficiencyMonthKeyNy(date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
  }).formatToParts(date)
  const y = parts.find((p) => p.type === 'year')?.value
  const m = parts.find((p) => p.type === 'month')?.value
  return `${y}-${m}`
}
