import PortfoliosHub from '@/components/PortfoliosHub'
import { loadPortfolioHubAlphaBySlug } from '@/lib/loadPortfolioHubAlpha'
import { pairedAlternates } from '@/lib/seoAlternates'

export const metadata = {
  title: 'Portfolios — Alpha Stacking',
  description:
    'US model portfolios with live total-return charts, holdings, weights, and 1-year excess return versus each model’s benchmark.',
  alternates: pairedAlternates('/portfolios', '/ca/portfolios', 'us'),
}

export default async function PortfoliosHubPage() {
  const hubDataBySlug = await loadPortfolioHubAlphaBySlug('us')
  return <PortfoliosHub edition="us" hubDataBySlug={hubDataBySlug} />
}
