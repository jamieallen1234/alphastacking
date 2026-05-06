import Link from 'next/link'
import FeedbackInlineLink from '@/components/FeedbackInlineLink'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PortfolioBuilderTool from '@/components/PortfolioBuilderTool'
import {
  ETF_PAGES_BUILDER_101_SLUG,
  EFFICIENCY_GRADES_SLUG,
  learnArticlePath,
} from '@/lib/learnArticles'
import {
  getCachedPortfolioBuilderOptionsCa,
  getCachedPortfolioBuilderOptionsUs,
} from '@/lib/portfolioBuilderEtfOptions'
import type { PortfolioPrefillHolding } from '@/lib/portfolioBuilderPrefill'
import styles from '@/app/portfolios/PortfoliosPage.module.css'

export default async function PortfolioBuilderPage({
  edition,
  initialPrefill,
}: {
  edition: 'us' | 'ca'
  initialPrefill?: PortfolioPrefillHolding[] | null
}) {
  const options =
    edition === 'ca'
      ? await getCachedPortfolioBuilderOptionsCa()
      : await getCachedPortfolioBuilderOptionsUs()
  const isCa = edition === 'ca'
  const learn101 = learnArticlePath(isCa, ETF_PAGES_BUILDER_101_SLUG)
  const learnGrades = learnArticlePath(isCa, EFFICIENCY_GRADES_SLUG)

  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.section}>
        <div className={styles.sectionLabel}>
          {edition === 'ca' ? 'Canadian edition' : 'United States'}
        </div>
        <h1 className={styles.heading}>Portfolio builder</h1>
        <p className={styles.lede}>
          Pick tickers, set weights to 100%, and generate a return chart. The chart shows total return
          versus SPY and max drawdown for any date range with available history.
        </p>
        <PortfolioBuilderTool edition={edition} options={options} initialPrefill={initialPrefill ?? null} />
        <div className={styles.builderPostToolDivider} aria-hidden />
        <div className={styles.builderPostToolBlock}>
          <p className={styles.builderCue}>
            Charts are historical simulations only. Read{' '}
            <Link href={learn101}>ETF pages, model portfolios, and the portfolio builder</Link> for a full
            walkthrough and limitations.{' '}
            <Link href={learnGrades}>Efficiency grades</Link> explain what the Equity / Alpha filters refer to.
          </p>
          <div className={styles.builderFeedbackRow}>
            <FeedbackInlineLink isCa={edition === 'ca'} context="builder" showDivider={false} />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

