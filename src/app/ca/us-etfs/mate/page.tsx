import MateEtfPageContent from '@/components/usEtfPages/MateEtfPageContent'

export const metadata = {
  title: 'MATE ETF — Alpha Stacking (Canadian edition)',
  description:
    'Man Active Trend Enhanced ETF (MATE): 100% S&P 500 stacked with 100% managed futures, manager context.',
}

export default function CaMateEtfPage() {
  return <MateEtfPageContent hubBase="/ca/us-etfs" />
}
