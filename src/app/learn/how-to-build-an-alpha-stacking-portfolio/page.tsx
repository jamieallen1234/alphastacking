import type { Metadata } from 'next'
import LearnArticleShell from '@/components/learn/LearnArticleShell'
import HowToBuildAlphaStackingArticle from '@/components/learn/HowToBuildAlphaStackingArticle'

export const metadata: Metadata = {
  title: 'How to build an alpha stacking portfolio — Learn — Alpha Stacking',
  description:
    'A walkthrough of alpha stacking portfolio construction: the four sleeve types, how they interact, beta targeting, and a worked example using the US Alpha Stack model.',
}

export default function HowToBuildAlphaStackingPage() {
  return (
    <LearnArticleShell>
      <HowToBuildAlphaStackingArticle edition="us" />
    </LearnArticleShell>
  )
}
