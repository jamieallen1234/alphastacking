import PortfoliosHub from '@/components/PortfoliosHub'
import { loadPortfolioHubAlphaBySlug } from '@/lib/loadPortfolioHubAlpha'
import { pairedAlternates } from '@/lib/seoAlternates'

export const metadata = {
  title: 'Portfolios — Alpha Stacking (Canadian edition)',
  description:
    'Canadian and US model portfolios with live total-return charts — CAD-listed and US-listed ETFs, with holdings, weights, and 1-year alpha vs SPY.',
  alternates: pairedAlternates('/portfolios', '/ca/portfolios', 'ca'),
}

export default async function CaPortfoliosHubPage() {
  const hubDataBySlug = await loadPortfolioHubAlphaBySlug()
  return <PortfoliosHub edition="ca" hubDataBySlug={hubDataBySlug} />
}
