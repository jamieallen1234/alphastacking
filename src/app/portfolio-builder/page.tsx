import PortfolioBuilderPage from '@/components/PortfolioBuilderPage'

export const metadata = {
  title: 'Portfolio Builder — Alpha Stacking',
  description:
    'Build a custom ETF portfolio, set weights, and generate a live total-return chart versus SPY with max drawdown. Test any mix of return-stacked, managed futures, long/short, and equity ETFs.',
}

export default function PortfolioBuilderUsPage() {
  return <PortfolioBuilderPage edition="us" />
}

