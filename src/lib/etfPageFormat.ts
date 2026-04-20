import type { EtfChartPayload } from '@/lib/getCachedEtfChart'

/** Beta vs SPY from cached chart payload (1y), for ETF page meta lines. */
export function betaVsSpyDisplay(chart: EtfChartPayload): string {
  return chart.betaVsSpy1y != null ? chart.betaVsSpy1y.toFixed(2) : '—'
}
