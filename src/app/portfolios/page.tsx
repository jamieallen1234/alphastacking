import PortfoliosHub from '@/components/PortfoliosHub'
import { loadPortfolioHubAlphaBySlug } from '@/lib/loadPortfolioHubAlpha'
import { pairedAlternates } from '@/lib/seoAlternates'

export const metadata = {
  title: 'Portfolios — Alpha Stacking',
  description:
    'US model portfolios with live total-return charts — leveraged multi-sleeve and buy-and-hold mixes, each with holdings, weights, and 1-year alpha vs SPY.',
  alternates: pairedAlternates('/portfolios', '/ca/portfolios', 'us'),
}

export default async function PortfoliosHubPage() {
  const hubDataBySlug = await loadPortfolioHubAlphaBySlug()
  return <PortfoliosHub edition="us" hubDataBySlug={hubDataBySlug} />
}
