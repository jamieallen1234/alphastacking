import type { EtfChartPayload } from '@/lib/getCachedEtfChart'

/** Beta from cached chart payload (1y), benchmark selected by market/symbol. */
export function betaVsSpyDisplay(chart: EtfChartPayload): string {
  return chart.betaVsSpy1y != null ? chart.betaVsSpy1y.toFixed(2) : '—'
}
