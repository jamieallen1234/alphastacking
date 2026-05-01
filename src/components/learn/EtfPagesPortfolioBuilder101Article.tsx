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
          <span className={styles.eyebrow}>Getting started</span>
          <span className={styles.readTime}>~6 min read</span>
        </div>
        <h1 className={styles.title}>ETF pages, sample portfolios, and the portfolio builder</h1>
        <p className={styles.deck}>
          If you are used to one or two broad index funds, this walkthrough shows how to use the ETF write-ups, the
          sample portfolios (pre-built mixes), and the portfolio builder to explore other holdings and weights — step by
          step. Nothing here is personalized advice.
        </p>
      </header>

      <section className={styles.section} aria-labelledby="s1">
        <h2 id="s1" className={styles.sectionTitle}>
          Start from the ETF hubs
        </h2>
        <p className={styles.body}>
          The ETF hubs list funds we have written up with live price history. On the US site, open{' '}
          <Link href="/us-etfs" className={styles.inlineLink}>
            US ETFs
          </Link>
          . On the Canadian edition, Canadian listings live under{' '}
          <Link href={caEtfHubHref} className={styles.inlineLink}>
            CA ETFs
          </Link>
          , while US-listed names stay under{' '}
          <Link href={usEtfHubHref} className={styles.inlineLink}>
            US ETFs
          </Link>{' '}
          so navigation stays in your chosen region.
        </p>
        <p className={styles.body}>
          Each ETF page explains what the fund tries to do, who runs it, and how we think about it — plus a
          total-return chart you can switch between time ranges (for example 1 year vs longer). Where we show letter
          grades, they summarize how capital-efficient or return-stacked a fund is; tooltips on those pages spell out
          the idea in more detail. Footnotes mention when a chart starts late because the fund is new or when we extend
          history with a modeled proxy.
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
          chart versus a broad stock benchmark (S&amp;P 500–style; Canadian pages use the same label with a CAD proxy
          behind the scenes), and a holdings table you can read next to the ETF pages.
        </p>
        <p className={styles.body}>
          Pick a sample portfolio that matches what you want to learn about. Write down each ticker and its percent. If
          a name is unfamiliar, open its ETF page from the hub or from links in the table when we provide them.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s3">
        <h2 id="s3" className={styles.sectionTitle}>
          Rebuild it in the portfolio builder
        </h2>
        <p className={styles.body}>
          Open the{' '}
          <Link href={builderHref} className={styles.inlineLink}>
            portfolio builder
          </Link>
          . Add one row per position, choose tickers from the searchable dropdown, and enter whole-number allocation
          percentages. Optional filters narrow the list by the same efficiency grades you see on ETF pages, if you want
          to stay in that framework.
        </p>
        <p className={styles.body}>
          When the percentages add up to 100%, the tool draws a portfolio chart like the model portfolio pages: change
          the time range, compare your line to the benchmark, and read total return, how much you beat or trailed the
          benchmark, and drawdowns for that period. Try small changes (fewer funds, different weights) to see how
          sensitive the line is — before any real-money decision.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s4">
        <h2 id="s4" className={styles.sectionTitle}>
          Keep the limitations in view
        </h2>
        <p className={styles.body}>
          Charts are educational backtests and live history, not forecasts. They ignore taxes, transaction costs,
          rebalancing frictions, and funding costs except where explicitly modeled in footnotes. Leveraged and
          alternative funds can fail or change behavior in ways history does not repeat. Treat the builder as a way to
          clarify trade-offs, not as a signal service.
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
        Educational content only — not investment advice, not a recommendation to buy or sell any security. Past
        performance does not guarantee future results. Leveraged and alternative funds involve substantial risk.
      </p>
    </article>
  )
}
