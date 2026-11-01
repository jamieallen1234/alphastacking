import PortfoliosHub from '@/components/PortfoliosHub'
import { loadPortfolioHubAlphaBySlug } from '@/lib/loadPortfolioHubAlpha'
import { pairedAlternates } from '@/lib/seoAlternates'

export const metadata = {
  title: 'Portfolios — Alpha Stacking (Canadian edition)',
  description:
    'Canadian and US model portfolios with live CAD total-return charts, holdings, weights, and 1-year excess return versus each model’s benchmark.',
  alternates: pairedAlternates('/portfolios', '/ca/portfolios', 'ca'),
}

export default async function CaPortfoliosHubPage() {
  const hubDataBySlug = await loadPortfolioHubAlphaBySlug('ca')
  return <PortfoliosHub edition="ca" hubDataBySlug={hubDataBySlug} />
}
