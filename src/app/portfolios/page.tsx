import PortfoliosHub from '@/components/PortfoliosHub'
import { loadPortfolioHubAlphaBySlug } from '@/lib/loadPortfolioHubAlpha'

export const metadata = {
  title: 'Portfolios — Alpha Stacking',
  description: 'Model portfolios with live total-return charts and holdings.',
}

export default async function PortfoliosHubPage() {
  const alphaBySlug = await loadPortfolioHubAlphaBySlug()
  return <PortfoliosHub edition="us" alphaBySlug={alphaBySlug} />
}
