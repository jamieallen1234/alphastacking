import type { Metadata } from 'next'
import LearnArticleShell from '@/components/learn/LearnArticleShell'
import ReturnStackingExplainedArticle from '@/components/learn/ReturnStackingExplainedArticle'
import { RETURN_STACKING_EXPLAINED_SLUG } from '@/lib/learnArticles'
import { pairedAlternates } from '@/lib/seoAlternates'

export const metadata: Metadata = {
  title: 'What Is Return Stacking? The Tool Behind Alpha Stacking Canada',
  description:
    'Return stacking layers two investment exposures on one dollar using futures, swaps, or other derivatives. It is the capital-efficiency tool that alpha stacking uses to add independent return sources.',
  alternates: pairedAlternates('/learn/return-stacking-explained', '/ca/learn/return-stacking-explained', 'ca'),
}

export default function CaReturnStackingExplainedPage() {
  return (
    <LearnArticleShell edition="ca" currentSlug={RETURN_STACKING_EXPLAINED_SLUG}>
      <ReturnStackingExplainedArticle edition="ca" />
    </LearnArticleShell>
  )
}
