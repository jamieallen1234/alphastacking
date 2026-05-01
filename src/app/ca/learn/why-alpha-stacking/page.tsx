import type { Metadata } from 'next'
import LearnArticleShell from '@/components/learn/LearnArticleShell'
import WhyAlphaStackingArticle from '@/components/learn/WhyAlphaStackingArticle'

export const metadata: Metadata = {
  title: 'Why alpha stacking — Learn — Alpha Stacking (Canadian edition)',
  description:
    'How alpha stacking compares to index funds, mutual funds, return stacking, all-weather portfolios, leveraged ETFs, and covered-call funds — with honest "when it wins / when it loses" for each.',
}

export default function CaWhyAlphaStackingPage() {
  return (
    <LearnArticleShell>
      <WhyAlphaStackingArticle edition="ca" />
    </LearnArticleShell>
  )
}
