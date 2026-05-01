import type { Metadata } from 'next'
import LearnArticleShell from '@/components/learn/LearnArticleShell'
import ReturnStackingVsAlphaStackingArticle from '@/components/learn/ReturnStackingVsAlphaStackingArticle'

export const metadata: Metadata = {
  title: 'Return stacking vs. alpha stacking — Learn — Alpha Stacking',
  description:
    'Return stacking is a capital efficiency technique; alpha stacking is a portfolio construction philosophy. How they differ, what tools they share, and why the distinction matters.',
}

export default function ReturnStackingVsAlphaStackingPage() {
  return (
    <LearnArticleShell>
      <ReturnStackingVsAlphaStackingArticle edition="us" />
    </LearnArticleShell>
  )
}
