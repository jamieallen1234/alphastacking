import type { Metadata } from 'next'
import LearnArticleShell from '@/components/learn/LearnArticleShell'
import HowToBuildAlphaStackingArticle from '@/components/learn/HowToBuildAlphaStackingArticle'
import { HOW_TO_BUILD_SLUG } from '@/lib/learnArticles'

export const metadata: Metadata = {
  title: 'How to build an alpha stacking portfolio | Learn | Alpha Stacking (Canadian edition)',
  description:
    'How the four sleeve types fit together, how to target total beta near 1.0, and a worked example using the US Alpha Stack model portfolio.',
}

export default function CaHowToBuildAlphaStackingPage() {
  return (
    <LearnArticleShell edition="ca" currentSlug={HOW_TO_BUILD_SLUG}>
      <HowToBuildAlphaStackingArticle edition="ca" />
    </LearnArticleShell>
  )
}
