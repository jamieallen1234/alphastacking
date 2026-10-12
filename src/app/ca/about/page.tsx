import type { Metadata } from 'next'
import AboutPage from '@/components/AboutPage'
import { pairedAlternates } from '@/lib/seoAlternates'

export const metadata: Metadata = {
  title: 'About Alpha Stacking | Canada',
  description:
    'About Alpha Stacking, an independent educational site for Canadian and U.S. ETF portfolio construction.',
  alternates: pairedAlternates('/about', '/ca/about', 'ca'),
}

export default function CaAboutPage() {
  return <AboutPage edition="ca" />
}
