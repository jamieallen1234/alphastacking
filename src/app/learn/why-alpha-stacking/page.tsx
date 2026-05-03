import type { Metadata } from 'next'
import LearnArticleShell from '@/components/learn/LearnArticleShell'
import WhyAlphaStackingArticle from '@/components/learn/WhyAlphaStackingArticle'

export const metadata: Metadata = {
  title: 'Why alpha stacking | Learn | Alpha Stacking',
  description:
    'How alpha stacking compares to index funds, return stacking, all-weather portfolios, and leveraged ETFs. One clear "when each wins" for every comparison.',
}

export default function WhyAlphaStackingPage() {
  return (
    <LearnArticleShell edition="us">
      <WhyAlphaStackingArticle edition="us" />
    </LearnArticleShell>
  )
}
