import type { Metadata } from 'next'
import LearnArticleShell from '@/components/learn/LearnArticleShell'
import EtfPagesPortfolioBuilder101Article from '@/components/learn/EtfPagesPortfolioBuilder101Article'
import { ETF_PAGES_BUILDER_101_SLUG } from '@/lib/learnArticles'

export const metadata: Metadata = {
  title: 'ETF pages & portfolio builder | Learn | Alpha Stacking',
  description:
    'How to use ETF research pages, model portfolios as templates, and the portfolio builder to stress-test weights and ranges.',
}

export default function EtfPagesPortfolioBuilder101Page() {
  return (
    <LearnArticleShell edition="us" currentSlug={ETF_PAGES_BUILDER_101_SLUG}>
      <EtfPagesPortfolioBuilder101Article edition="us" />
    </LearnArticleShell>
  )
}
