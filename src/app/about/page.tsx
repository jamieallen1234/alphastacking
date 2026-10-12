import type { Metadata } from 'next'
import AboutPage from '@/components/AboutPage'
import { pairedAlternates } from '@/lib/seoAlternates'

export const metadata: Metadata = {
  title: 'About Alpha Stacking',
  description:
    'About Alpha Stacking, an independent educational site for ETF portfolio construction, return stacking, and diversified return sources.',
  alternates: pairedAlternates('/about', '/ca/about', 'us'),
}

export default function UsAboutPage() {
  return <AboutPage edition="us" />
}
