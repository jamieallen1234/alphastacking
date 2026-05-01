import EtfHub from '@/components/EtfHub'

export const metadata = {
  title: 'ETFs — Alpha Stacking',
  description:
    'US-listed ETFs for alpha stacking portfolios — return stacked funds, managed futures, long/short equity, merger arb, systematic alternatives, and leveraged equity, with write-ups and live charts.',
}

export default function UsEtfHubPage() {
  return <EtfHub listing="us" edition="us" />
}
