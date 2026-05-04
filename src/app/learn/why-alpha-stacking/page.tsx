import type { Metadata } from 'next'
import LearnArticleShell from '@/components/learn/LearnArticleShell'
import WhyAlphaStackingArticle from '@/components/learn/WhyAlphaStackingArticle'
import { WHY_ALPHA_STACKING_SLUG } from '@/lib/learnArticles'

export const metadata: Metadata = {
  title: 'Why alpha stacking | Learn | Alpha Stacking',
  description:
    'How alpha stacking compares to index funds, return stacking, all-weather portfolios, and leveraged ETFs, with a plain language read on when each option tends to fit.',
}

export default function WhyAlphaStackingPage() {
  return (
    <LearnArticleShell edition="us" currentSlug={WHY_ALPHA_STACKING_SLUG}>
      <WhyAlphaStackingArticle edition="us" />
    </LearnArticleShell>
  )
}
