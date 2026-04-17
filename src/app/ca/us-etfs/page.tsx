import EtfHub from '@/components/EtfHub'

export const metadata = {
  title: 'US ETFs — Alpha Stacking (Canadian edition)',
  description:
    'US-listed ETFs for return stacking, premia, managed futures, long/short, and global macro — from the Canadian site.',
}

export default function CaUsEtfHubPage() {
  return <EtfHub variant="us" />
}
