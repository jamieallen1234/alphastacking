import HomePage from '@/components/HomePage'
import { loadHomePortfolioChartSlots } from '@/lib/loadHomePortfolioCharts'

export const metadata = {
  title: 'Alpha Stacking — Canadian edition',
  description:
    'Alpha stacking combines proven sleeves in synergistic ways—model portfolios and ETF research for Canadian investors, with CAD context where noted.',
}

export default async function CaHomePage() {
  const homePortfolioChartSlots = await loadHomePortfolioChartSlots('ca')
  return <HomePage variant="ca" homePortfolioChartSlots={homePortfolioChartSlots} />
}
