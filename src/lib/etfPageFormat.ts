import type { EtfChartPayload } from '@/lib/getCachedEtfChart'

/** Formatted beta from cached chart payload (1y, listing benchmark). */
export function chartBetaDisplay(chart: EtfChartPayload): string {
  return chart.beta1y != null ? chart.beta1y.toFixed(2) : '—'
}
