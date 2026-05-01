import PortfoliosHub from '@/components/PortfoliosHub'
import { loadPortfolioHubAlphaBySlug } from '@/lib/loadPortfolioHubAlpha'

export const metadata = {
  title: 'Portfolios — Alpha Stacking (Canadian edition)',
  description:
    'Canadian and US model portfolios with live total-return charts — CAD-listed and US-listed ETFs, with holdings, weights, and 1-year alpha vs SPY.',
}

export default async function CaPortfoliosHubPage() {
  const alphaBySlug = await loadPortfolioHubAlphaBySlug()
  return <PortfoliosHub edition="ca" alphaBySlug={alphaBySlug} />
}
