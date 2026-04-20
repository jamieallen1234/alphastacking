import HfgmEtfPageContent from '@/components/usEtfPages/HfgmEtfPageContent'

export const metadata = {
  title: 'HFGM ETF — Alpha Stacking (Canadian edition)',
  description:
    'Unlimited HFGM Global Macro ETF (HFGM): global macro replication, Unlimited pedigree, and regime context.',
}

export default function CaHfgmEtfPage() {
  return <HfgmEtfPageContent hubBase="/ca/us-etfs" />
}
