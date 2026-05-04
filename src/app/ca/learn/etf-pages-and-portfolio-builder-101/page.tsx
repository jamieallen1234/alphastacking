import type { Metadata } from 'next'
import LearnArticleShell from '@/components/learn/LearnArticleShell'
import EtfPagesPortfolioBuilder101Article from '@/components/learn/EtfPagesPortfolioBuilder101Article'

export const metadata: Metadata = {
  title: 'ETF pages & portfolio builder | Learn | Alpha Stacking (Canadian edition)',
  description:
    'How to use ETF research pages, model portfolios as templates, and the portfolio builder to stress-test weights and ranges.',
}

export default function CaEtfPagesPortfolioBuilder101Page() {
  return (
    <LearnArticleShell edition="ca">
      <EtfPagesPortfolioBuilder101Article edition="ca" />
    </LearnArticleShell>
  )
}
