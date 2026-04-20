import EtfHub from '@/components/EtfHub'

export const metadata = {
  title: 'ETFs — Alpha Stacking',
  description: 'US-listed ETFs for return stacking, premia, managed futures, long/short, and global macro.',
}

export default function UsEtfHubPage() {
  return <EtfHub listing="us" edition="us" />
}
