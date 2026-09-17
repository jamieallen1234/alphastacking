import HomePage from '@/components/HomePage'
import { loadHomePortfolioChartSlots } from '@/lib/loadHomePortfolioCharts'
import { pairedAlternates } from '@/lib/seoAlternates'

export const metadata = {
  title: 'Alpha Stacking — Canadian edition',
  description:
    'Model portfolios and ETF research for Canadian investors — CAD-listed tickers alongside US-listed funds, with CAD context where it matters.',
  alternates: pairedAlternates('/', '/ca', 'ca'),
}

export default async function CaHomePage() {
  const homePortfolioChartSlots = await loadHomePortfolioChartSlots('ca')
  return <HomePage variant="ca" homePortfolioChartSlots={homePortfolioChartSlots} />
}
