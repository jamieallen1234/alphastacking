import type { Metadata } from 'next'
import LearnArticleShell from '@/components/learn/LearnArticleShell'
import EtfPagesPortfolioBuilder101Article from '@/components/learn/EtfPagesPortfolioBuilder101Article'
import { ETF_PAGES_BUILDER_101_SLUG } from '@/lib/learnArticles'
import { pairedAlternates } from '@/lib/seoAlternates'

export const metadata: Metadata = {
  title: 'ETF pages & portfolio builder | Learn | Alpha Stacking',
  description:
    'How to use ETF research pages, model portfolios as templates, and the portfolio builder to stress-test weights and ranges.',
  alternates: pairedAlternates('/learn/etf-pages-and-portfolio-builder-101', '/ca/learn/etf-pages-and-portfolio-builder-101', 'us'),
}

export default function EtfPagesPortfolioBuilder101Page() {
  return (
    <LearnArticleShell edition="us" currentSlug={ETF_PAGES_BUILDER_101_SLUG}>
      <EtfPagesPortfolioBuilder101Article edition="us" />
    </LearnArticleShell>
  )
}
