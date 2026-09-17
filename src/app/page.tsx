import HomePage from '@/components/HomePage'
import { loadHomePortfolioChartSlots } from '@/lib/loadHomePortfolioCharts'
import { pairedAlternates } from '@/lib/seoAlternates'

export const metadata = {
  alternates: pairedAlternates('/', '/ca', 'us'),
}

export default async function Home() {
  const homePortfolioChartSlots = await loadHomePortfolioChartSlots('us')
  return <HomePage variant="us" homePortfolioChartSlots={homePortfolioChartSlots} />
}
