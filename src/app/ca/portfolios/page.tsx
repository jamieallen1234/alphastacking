import PortfoliosHub from '@/components/PortfoliosHub'

export const metadata = {
  title: 'Portfolios — Alpha Stacking (Canadian edition)',
  description: 'US and Canadian model portfolios with live charts.',
}

export default function CaPortfoliosHubPage() {
  return <PortfoliosHub edition="ca" />
}
