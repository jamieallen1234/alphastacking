import type { Metadata } from 'next'
import LearnArticleShell from '@/components/learn/LearnArticleShell'
import HowToBuildAlphaStackingArticle from '@/components/learn/HowToBuildAlphaStackingArticle'
import { HOW_TO_BUILD_SLUG } from '@/lib/learnArticles'
import { pairedAlternates } from '@/lib/seoAlternates'

export const metadata: Metadata = {
  title: 'How to build an alpha stacking portfolio | Learn | Alpha Stacking',
  description:
    'How the four sleeve types fit together, how to target total beta near 1.0, and a worked example using the US Alpha Stack model portfolio.',
  alternates: pairedAlternates('/learn/how-to-build-an-alpha-stacking-portfolio', '/ca/learn/how-to-build-an-alpha-stacking-portfolio', 'us'),
}

export default function HowToBuildAlphaStackingPage() {
  return (
    <LearnArticleShell edition="us" currentSlug={HOW_TO_BUILD_SLUG}>
      <HowToBuildAlphaStackingArticle edition="us" />
    </LearnArticleShell>
  )
}
