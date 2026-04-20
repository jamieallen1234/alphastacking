import HomePage from '@/components/HomePage'
import { loadHomePortfolioChartSlots } from '@/lib/loadHomePortfolioCharts'

export default async function Home() {
  const homePortfolioChartSlots = await loadHomePortfolioChartSlots('us')
  return <HomePage variant="us" homePortfolioChartSlots={homePortfolioChartSlots} />
}
