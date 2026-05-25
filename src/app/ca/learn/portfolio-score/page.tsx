import type { Metadata } from 'next'
import LearnArticleShell from '@/components/learn/LearnArticleShell'
import PortfolioScoreArticle from '@/components/learn/PortfolioScoreArticle'
import { PORTFOLIO_SCORE_SLUG } from '@/lib/learnArticles'

export const metadata: Metadata = {
  title: 'How portfolio scores work | Learn | Alpha Stacking (Canadian edition)',
  description:
    'What the A/B/C grade on each portfolio means, how it is calculated, and what it does not tell you.',
}

export default function CaPortfolioScorePage() {
  return (
    <LearnArticleShell edition="ca" currentSlug={PORTFOLIO_SCORE_SLUG}>
      <PortfolioScoreArticle edition="ca" />
    </LearnArticleShell>
  )
}
