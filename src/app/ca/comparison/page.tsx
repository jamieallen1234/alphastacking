import type { Metadata } from 'next'
import StrategiesCompareMain from '@/components/StrategiesCompareMain'
import { getCachedStrategyCompareCharts } from '@/lib/loadStrategyCompareCharts'

export const metadata: Metadata = {
  title: 'Comparison — portfolio approaches vs SPY & alpha stacking',
  description:
    'Compare common portfolio approaches vs SPY—and how alpha stacking combines proven sleeves synergistically to seek results in bull, bear, and choppy markets.',
}

export const revalidate = 86400

export default async function CaComparisonPage() {
  const charts = await getCachedStrategyCompareCharts()
  return (
    <StrategiesCompareMain
      variant="ca"
      homeHref="/ca"
      charts={charts}
      chartRangeLabel="five-year"
    />
  )
}
