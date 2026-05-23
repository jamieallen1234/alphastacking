import type { Metadata } from 'next'
import LearnArticleShell from '@/components/learn/LearnArticleShell'
import ReturnStackingExplainedArticle from '@/components/learn/ReturnStackingExplainedArticle'
import { RETURN_STACKING_EXPLAINED_SLUG } from '@/lib/learnArticles'

export const metadata: Metadata = {
  title: 'Return stacking explained | Learn | Alpha Stacking',
  description:
    'Return stacking holds two exposures on one dollar of capital using futures as collateral. Learn how the mechanism works, what it costs in different rate regimes, and where it breaks down.',
}

export default function ReturnStackingExplainedPage() {
  return (
    <LearnArticleShell edition="us" currentSlug={RETURN_STACKING_EXPLAINED_SLUG}>
      <ReturnStackingExplainedArticle edition="us" />
    </LearnArticleShell>
  )
}
