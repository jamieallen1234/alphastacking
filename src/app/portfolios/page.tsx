import PortfoliosHub from '@/components/PortfoliosHub'
import { loadPortfolioHubAlphaBySlug } from '@/lib/loadPortfolioHubAlpha'

export const metadata = {
  title: 'Portfolios — Alpha Stacking',
  description:
    'US model portfolios with live total-return charts — leveraged multi-sleeve and buy-and-hold mixes, each with holdings, weights, and 1-year alpha vs SPY.',
}

export default async function PortfoliosHubPage() {
  const alphaBySlug = await loadPortfolioHubAlphaBySlug()
  return <PortfoliosHub edition="us" alphaBySlug={alphaBySlug} />
}
