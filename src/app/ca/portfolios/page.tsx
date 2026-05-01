import PortfoliosHub from '@/components/PortfoliosHub'
import { loadPortfolioHubAlphaBySlug } from '@/lib/loadPortfolioHubAlpha'

export const metadata = {
  title: 'Portfolios — Alpha Stacking (Canadian edition)',
  description: 'US and Canadian model portfolios with live charts.',
}

export default async function CaPortfoliosHubPage() {
  const alphaBySlug = await loadPortfolioHubAlphaBySlug()
  return <PortfoliosHub edition="ca" alphaBySlug={alphaBySlug} />
}
