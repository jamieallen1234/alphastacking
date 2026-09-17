import EtfHub from '@/components/EtfHub'
import { pairedAlternates } from '@/lib/seoAlternates'

export const metadata = {
  title: 'US ETFs — Alpha Stacking (Canadian edition)',
  description:
    'US-listed ETFs for alpha stacking portfolios — return stacked funds, managed futures, long/short equity, merger arb, and leveraged equity — viewed from the Canadian edition.',
  alternates: pairedAlternates('/us-etfs', '/ca/us-etfs', 'ca'),
}

export default function CaUsEtfHubPage() {
  return <EtfHub listing="us" edition="ca" />
}
