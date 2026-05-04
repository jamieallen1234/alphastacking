import PortfolioBuilderPage from '@/components/PortfolioBuilderPage'
import { parsePortfolioBuilderPrefill } from '@/lib/portfolioBuilderPrefill'

export const metadata = {
  title: 'Portfolio Builder — Alpha Stacking',
  description:
    'Build a custom ETF portfolio, set weights, and generate a live total-return chart versus SPY with max drawdown. Test any mix of return-stacked, managed futures, long/short, and equity ETFs.',
}

export default async function PortfolioBuilderUsPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}) {
  const sp = searchParams != null ? await searchParams : {}
  const initialPrefill = parsePortfolioBuilderPrefill(sp)
  return <PortfolioBuilderPage edition="us" initialPrefill={initialPrefill} />
}

