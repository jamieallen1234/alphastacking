import type { Metadata } from 'next'
import LearnArticleShell from '@/components/learn/LearnArticleShell'
import ReturnStackingVsAlphaStackingArticle from '@/components/learn/ReturnStackingVsAlphaStackingArticle'

export const metadata: Metadata = {
  title: 'Return Stacking vs. Alpha Stacking — Learn — Alpha Stacking',
  description:
    'Return stacking is capital efficiency per dollar; alpha stacking is choosing and combining independent return premia. How they differ — and why it matters for portfolio construction.',
}

export default function ReturnStackingVsAlphaStackingPage() {
  return (
    <LearnArticleShell>
      <ReturnStackingVsAlphaStackingArticle edition="us" />
    </LearnArticleShell>
  )
}
