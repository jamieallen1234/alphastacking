import PortfoliosHub from '@/components/PortfoliosHub'

export const metadata = {
  title: 'Portfolios — Alpha Stacking',
  description: 'Model portfolios with live total-return charts and holdings.',
}

export default function PortfoliosHubPage() {
  return <PortfoliosHub edition="us" />
}
