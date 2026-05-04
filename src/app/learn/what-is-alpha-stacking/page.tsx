import type { Metadata } from 'next'
import LearnArticleShell from '@/components/learn/LearnArticleShell'
import WhatIsAlphaStackingArticle from '@/components/learn/WhatIsAlphaStackingArticle'
import { WHAT_IS_ALPHA_SLUG } from '@/lib/learnArticles'

export const metadata: Metadata = {
  title: 'What is alpha stacking | Learn | Alpha Stacking',
  description:
    'Alpha stacking keeps equity as the core and adds return sources that earn in different regimes: managed futures, long/short, macro, and merger arb held on the same capital.',
}

export default function WhatIsAlphaStackingPage() {
  return (
    <LearnArticleShell edition="us" currentSlug={WHAT_IS_ALPHA_SLUG}>
      <WhatIsAlphaStackingArticle edition="us" />
    </LearnArticleShell>
  )
}
