import PortfolioBuilderPage from '@/components/PortfolioBuilderPage'

export const metadata = {
  title: 'Portfolio Builder — Alpha Stacking',
  description: 'Create an ETF portfolio and generate a live return chart.',
}

export default function PortfolioBuilderUsPage() {
  return <PortfolioBuilderPage edition="us" />
}

