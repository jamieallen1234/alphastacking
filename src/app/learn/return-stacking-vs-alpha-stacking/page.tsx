import type { Metadata } from 'next'
import LearnArticleShell from '@/components/learn/LearnArticleShell'
import ReturnStackingVsAlphaStackingArticle from '@/components/learn/ReturnStackingVsAlphaStackingArticle'

export const metadata: Metadata = {
  title: 'Return Stacking vs. Alpha Stacking — Learn — Alpha Stacking',
  description:
    'Plain-language explanation for index investors: return stacking fits more exposure per dollar; alpha stacking is about which return sources you combine — and why that matters.',
}

export default function ReturnStackingVsAlphaStackingPage() {
  return (
    <LearnArticleShell>
      <ReturnStackingVsAlphaStackingArticle edition="us" />
    </LearnArticleShell>
  )
}
