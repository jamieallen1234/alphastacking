import EtfHub from '@/components/EtfHub'

export const metadata = {
  title: 'ETFs — Alpha Stacking (Canadian edition)',
  description:
    'Canadian and cross-listed ETFs for return stacking, premia, managed futures, long/short, and global macro.',
}

export default function CaEtfHubPage() {
  return <EtfHub variant="ca" />
}
