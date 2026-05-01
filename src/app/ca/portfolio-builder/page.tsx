import PortfolioBuilderPage from '@/components/PortfolioBuilderPage'

export const metadata = {
  title: 'Portfolio Builder — Alpha Stacking (Canadian edition)',
  description:
    'Build a custom portfolio from Canadian and US-listed ETFs, set weights, and generate a live return chart versus SPY with max drawdown — Canadian edition.',
}

export default function PortfolioBuilderCaPage() {
  return <PortfolioBuilderPage edition="ca" />
}

