import type { Metadata } from 'next'
import LearnArticleShell from '@/components/learn/LearnArticleShell'
import WhyAlphaStackingArticle from '@/components/learn/WhyAlphaStackingArticle'
import { WHY_ALPHA_STACKING_SLUG } from '@/lib/learnArticles'
import { pairedAlternates } from '@/lib/seoAlternates'

export const metadata: Metadata = {
  title: 'Return Stacking vs Alpha Stacking: What Goes Further?',
  description:
    'Return stacking creates capital efficiency. Alpha stacking builds on it with multiple independent return sources, deliberate portfolio sizing, and a test for whether each sleeve can earn on its own.',
  alternates: pairedAlternates('/learn/why-alpha-stacking', '/ca/learn/why-alpha-stacking', 'us'),
}

export default function WhyAlphaStackingPage() {
  return (
    <LearnArticleShell edition="us" currentSlug={WHY_ALPHA_STACKING_SLUG}>
      <WhyAlphaStackingArticle edition="us" />
    </LearnArticleShell>
  )
}
