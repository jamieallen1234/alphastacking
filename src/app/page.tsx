import HomePage from '@/components/HomePage'
import { loadHomePortfolioChartSlots } from '@/lib/loadHomePortfolioCharts'
import { pairedAlternates } from '@/lib/seoAlternates'

export const metadata = {
  title: 'Alpha Stacking: Beyond Return Stacking | ETFs and Model Portfolios',
  description:
    'Alpha stacking builds on return stacking. Keep efficient core exposure, then add several independent return sources with ETFs, model portfolios, and live total-return charts.',
  alternates: pairedAlternates('/', '/ca', 'us'),
}

export default async function Home() {
  const homePortfolioChartSlots = await loadHomePortfolioChartSlots('us')
  return <HomePage variant="us" homePortfolioChartSlots={homePortfolioChartSlots} />
}
