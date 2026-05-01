import EtfHub from '@/components/EtfHub'

export const metadata = {
  title: 'ETFs — Alpha Stacking (Canadian edition)',
  description:
    'Canadian-listed ETFs for alpha stacking portfolios — return stacked funds, long/short equity, arbitrage, and systematic alternatives, with write-ups and live charts.',
}

export default function CaEtfHubPage() {
  return <EtfHub listing="ca" edition="ca" />
}
