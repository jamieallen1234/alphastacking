import type { Metadata } from 'next'
import LearnArticleShell from '@/components/learn/LearnArticleShell'
import WhatIsAlphaStackingArticle from '@/components/learn/WhatIsAlphaStackingArticle'

export const metadata: Metadata = {
  title: 'What is alpha stacking | Learn | Alpha Stacking (Canadian edition)',
  description:
    'Alpha stacking keeps equity as the core and adds return sources that earn in different regimes: managed futures, long/short, macro, and merger arb held on the same capital.',
}

export default function CaWhatIsAlphaStackingPage() {
  return (
    <LearnArticleShell edition="ca">
      <WhatIsAlphaStackingArticle edition="ca" />
    </LearnArticleShell>
  )
}
