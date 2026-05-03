import type { Metadata } from 'next'
import LearnArticleShell from '@/components/learn/LearnArticleShell'
import WhyAlphaStackingArticle from '@/components/learn/WhyAlphaStackingArticle'

export const metadata: Metadata = {
  title: 'Why alpha stacking | Learn | Alpha Stacking (Canadian edition)',
  description:
    'How alpha stacking compares to index funds, return stacking, all-weather portfolios, and leveraged ETFs. One clear "when each wins" for every comparison.',
}

export default function CaWhyAlphaStackingPage() {
  return (
    <LearnArticleShell>
      <WhyAlphaStackingArticle edition="ca" />
    </LearnArticleShell>
  )
}
