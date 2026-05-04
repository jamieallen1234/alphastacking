import Link from 'next/link'
import {
  learnPath,
  portfolioBuilderPath,
  portfoliosPath,
  usEtfHubPath,
} from '@/lib/siteRegion'
import styles from './LearnArticle.module.css'

export default function EtfPagesPortfolioBuilder101Article({ edition }: { edition: 'us' | 'ca' }) {
  const isCa = edition === 'ca'
  const portfoliosHref = portfoliosPath(isCa)
  const builderHref = portfolioBuilderPath(isCa)
  const learnHref = learnPath(isCa)
  const usEtfHubHref = usEtfHubPath(isCa)
  const caEtfHubHref = '/ca/etfs'

  return (
    <article className={styles.article}>
      <header>
        <div className={styles.headerRow}>
          <span className={styles.eyebrow}>Site guide</span>
          <span className={styles.readTime}>~5 min read</span>
        </div>
        <h1 className={styles.title}>ETF pages, model portfolios, and the portfolio builder</h1>
        <p className={styles.deck}>
          Read the ETF write-ups to understand each fund, browse the model portfolios to see how they combine, then
          rebuild or modify any mix in the portfolio builder to explore how the chart and metrics respond.
        </p>
      </header>

      <section className={styles.section} aria-labelledby="s1">
        <h2 id="s1" className={styles.sectionTitle}>
          Start from the ETF hubs
        </h2>
        <p className={styles.body}>
          If you&apos;re new to ETFs: a <strong>ticker</strong> (SPY, VFV, etc.) is the symbol for a fund on an
          exchange. Our write-ups describe what each fund does — they are educational only, not a recommendation to
          buy or sell anything.
        </p>
        <p className={styles.body}>
          The ETF hubs list every fund we&apos;ve written up with live price history.{' '}
          <Link href={usEtfHubHref} className={styles.inlineLink}>
            US ETFs
          </Link>{' '}
          covers US-listed names on both editions.{' '}
          <Link href={caEtfHubHref} className={styles.inlineLink}>
            CA ETFs
          </Link>{' '}
          covers Canadian-listed funds on the Canadian edition. Use CA ETFs when you care about
          Canadian-listed products and quotes; use US ETFs when you hold or research US-listed funds (many
          investors use both).
        </p>
        <p className={styles.body}>
          Each page covers what the fund does, who runs it, and when it tends to earn, plus a total-return
          chart you can switch across time ranges. Letter grades summarize capital efficiency or
          return-stacking; tooltips on each page explain how they&apos;re calculated. Footnotes
          flag when history is extended with a modeled proxy.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s2">
        <h2 id="s2" className={styles.sectionTitle}>
          Use sample portfolios as templates
        </h2>
        <p className={styles.body}>
          The{' '}
          <Link href={portfoliosHref} className={styles.inlineLink}>
            model portfolios
          </Link>{' '}
          section is the fastest way to see a full mix: each live portfolio page shows each holding&apos;s weight, a
          chart versus the S&amp;P500 index, and a holdings table you can read next to the ETF pages.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s3">
        <h2 id="s3" className={styles.sectionTitle}>
          Portfolio Builder
        </h2>
        <p className={styles.body}>
          Open the{' '}
          <Link href={builderHref} className={styles.inlineLink}>
            portfolio builder
          </Link>
          . Add one row per position, choose tickers from the dropdown, and enter allocation percentages.
          Optional filters narrow the list by efficiency grade if you want to stay in that framework.
        </p>
        <p className={styles.body}>
          Once the percentages add to 100%, hit the Generate button and the tool draws a portfolio chart: switch time
          ranges, compare your line to the benchmark, and read total return and drawdown for the period. Try small
          changes (fewer funds, different weights) to see how sensitive the modeled outcome is.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s4">
        <h2 id="s4" className={styles.sectionTitle}>
          Limitations
        </h2>
        <p className={styles.body}>
          Charts are backtests and live history, not forecasts. They ignore taxes, transaction costs, rebalancing
          friction, and funding costs except where explicitly modeled in footnotes. Leveraged and alternative funds
          can fail or change behavior in ways history doesn&apos;t capture. Use the builder to clarify trade-offs,
          not to predict outcomes.
        </p>
      </section>

      <div className={styles.ctaRow}>
        <Link href={portfoliosHref} className={styles.cta}>
          Browse model portfolios →
        </Link>
        <Link href={builderHref} className={styles.cta}>
          Open portfolio builder →
        </Link>
      </div>

      <Link href={learnHref} className={styles.back}>
        ← All Learn articles
      </Link>

      <p className={styles.legal}>
        Educational content only; not investment advice, not a recommendation to buy or sell any security. Past
        performance does not guarantee future results. Leveraged and alternative funds involve substantial risk.
      </p>
    </article>
  )
}
