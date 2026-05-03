import type { Metadata } from 'next'
import LearnArticleShell from '@/components/learn/LearnArticleShell'
import HowToBuildAlphaStackingArticle from '@/components/learn/HowToBuildAlphaStackingArticle'

export const metadata: Metadata = {
  title: 'How to build an alpha stacking portfolio | Learn | Alpha Stacking (Canadian edition)',
  description:
    'Layering alpha on an all-equity core (trend, long/short, macro), the logic behind building an alpha stacking portfolio, and how a model portfolio was constructed.',
}

export default function CaHowToBuildAlphaStackingPage() {
  return (
    <LearnArticleShell>
      <HowToBuildAlphaStackingArticle edition="ca" />
    </LearnArticleShell>
  )
}
