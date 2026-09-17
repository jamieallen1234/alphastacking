import HomePage from '@/components/HomePage'
import { loadHomePortfolioChartSlots } from '@/lib/loadHomePortfolioCharts'
import { pairedAlternates } from '@/lib/seoAlternates'

export const metadata = {
  title: 'Alpha Stacking: Beyond Return Stacking | Canada',
  description:
    'Alpha stacking builds on return stacking for Canadian investors. Compare CAD-listed and US-listed ETFs, model portfolios, and live total-return charts.',
  alternates: pairedAlternates('/', '/ca', 'ca'),
}

export default async function CaHomePage() {
  const homePortfolioChartSlots = await loadHomePortfolioChartSlots('ca')
  return <HomePage variant="ca" homePortfolioChartSlots={homePortfolioChartSlots} />
}
