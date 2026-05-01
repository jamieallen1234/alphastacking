import EtfHub from '@/components/EtfHub'

export const metadata = {
  title: 'US ETFs — Alpha Stacking (Canadian edition)',
  description:
    'US-listed ETFs for alpha stacking portfolios — return stacked funds, managed futures, long/short equity, merger arb, and leveraged equity — viewed from the Canadian edition.',
}

export default function CaUsEtfHubPage() {
  return <EtfHub listing="us" edition="ca" />
}
