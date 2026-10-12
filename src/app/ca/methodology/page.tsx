import type { Metadata } from 'next'
import MethodologyPage from '@/components/MethodologyPage'
import { pairedAlternates } from '@/lib/seoAlternates'

export const metadata: Metadata = {
  title: 'Methodology | Alpha Stacking Canada',
  description:
    'How Alpha Stacking uses ETF source documents, historical chart data, ratings, portfolio assumptions, and proxy history.',
  alternates: pairedAlternates('/methodology', '/ca/methodology', 'ca'),
}

export default function CaMethodologyPage() {
  return <MethodologyPage edition="ca" />
}
