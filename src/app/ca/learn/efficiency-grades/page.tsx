import type { Metadata } from 'next'
import LearnArticleShell from '@/components/learn/LearnArticleShell'
import EfficiencyGradesArticle from '@/components/learn/EfficiencyGradesArticle'
import { EFFICIENCY_GRADES_SLUG } from '@/lib/learnArticles'

export const metadata: Metadata = {
  title: 'Capital, Alpha, and Stacked Efficiency grades | Learn | Alpha Stacking (Canadian edition)',
  description:
    'What the letter grades on ETF pages measure, how Capital Efficiency and Alpha Efficiency are calculated, and what the grades do not tell you.',
}

export default function CaEfficiencyGradesPage() {
  return (
    <LearnArticleShell edition="ca" currentSlug={EFFICIENCY_GRADES_SLUG}>
      <EfficiencyGradesArticle edition="ca" />
    </LearnArticleShell>
  )
}
