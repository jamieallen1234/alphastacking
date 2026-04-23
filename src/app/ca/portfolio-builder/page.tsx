import PortfolioBuilderPage from '@/components/PortfolioBuilderPage'

export const metadata = {
  title: 'Portfolio Builder — Alpha Stacking (Canadian edition)',
  description: 'Create a temporary ETF portfolio and generate a live chart in Canadian edition.',
}

export default function PortfolioBuilderCaPage() {
  return <PortfolioBuilderPage edition="ca" />
}

