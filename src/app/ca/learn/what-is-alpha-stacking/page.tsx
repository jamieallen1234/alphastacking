import type { Metadata } from 'next'
import LearnArticleShell from '@/components/learn/LearnArticleShell'
import WhatIsAlphaStackingArticle from '@/components/learn/WhatIsAlphaStackingArticle'
import { WHAT_IS_ALPHA_SLUG } from '@/lib/learnArticles'
import { pairedAlternates } from '@/lib/seoAlternates'

export const metadata: Metadata = {
  title: 'What is alpha stacking | Learn | Alpha Stacking (Canadian edition)',
  description:
    'Alpha stacking keeps equity as the core and adds return sources that earn in different environments: managed futures, long/short, macro, and merger arb held on the same capital.',
  alternates: pairedAlternates('/learn/what-is-alpha-stacking', '/ca/learn/what-is-alpha-stacking', 'ca'),
}

export default function CaWhatIsAlphaStackingPage() {
  return (
    <LearnArticleShell edition="ca" currentSlug={WHAT_IS_ALPHA_SLUG}>
      <WhatIsAlphaStackingArticle edition="ca" />
    </LearnArticleShell>
  )
}
