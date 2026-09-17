import Link from 'next/link'
import { portfolioBuilderPath, portfoliosPath, learnPath } from '@/lib/siteRegion'
import type { StrategyLearnTopic } from '@/lib/strategyLearnTopics'
import styles from './LearnArticle.module.css'

export default function StrategyLearnArticle({
  edition,
  topic,
}: {
  edition: 'us' | 'ca'
  topic: StrategyLearnTopic
}) {
  const isCa = edition === 'ca'
  const portfoliosHref = portfoliosPath(isCa)
  const builderHref = portfolioBuilderPath(isCa)
  const learnHref = learnPath(isCa)
  const etfPath = (slug: string) => (isCa ? `/ca/us-etfs/${slug}` : `/us-etfs/${slug}`)

  return (
    <article className={styles.article}>
      <header>
        <div className={styles.headerRow}>
          <span className={styles.eyebrow}>{topic.eyebrow}</span>
          <span className={styles.readTime}>{topic.read}</span>
        </div>
        <h1 className={styles.title}>{topic.title}</h1>
        <p className={styles.deck}>{topic.deck}</p>
      </header>

      <section className={styles.section} aria-labelledby="what-it-is">
        <h2 id="what-it-is" className={styles.sectionTitle}>
          What it is
        </h2>
        <p className={styles.body}>{topic.definition}</p>
      </section>

      <section className={styles.section} aria-labelledby="how-it-earns">
        <h2 id="how-it-earns" className={styles.sectionTitle}>
          How it earns
        </h2>
        <p className={styles.body}>{topic.mechanism}</p>
      </section>

      <section className={styles.section} aria-labelledby="when-it-fails">
        <h2 id="when-it-fails" className={styles.sectionTitle}>
          When it fails
        </h2>
        <p className={styles.body}>{topic.failureMode}</p>
      </section>

      <section className={styles.section} aria-labelledby="alpha-stacking-role">
        <h2 id="alpha-stacking-role" className={styles.sectionTitle}>
          Its role in alpha stacking
        </h2>
        <p className={styles.body}>{topic.alphaStackingRole}</p>
      </section>

      <section className={styles.section} aria-labelledby="what-to-check">
        <h2 id="what-to-check" className={styles.sectionTitle}>
          What to check before using it
        </h2>
        <div className={styles.principles}>
          {topic.selectionNotes.map((note) => (
            <div className={styles.principle} key={note}>
              <p className={styles.principleText}>{note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="related-etfs">
        <h2 id="related-etfs" className={styles.sectionTitle}>
          ETFs to research
        </h2>
        <div className={styles.compareGrid}>
          {topic.etfs.map((etf) => (
            <Link
              href={etfPath(etf.slug)}
              className={`${styles.compareCard} ${styles.compareCardLink}`}
              key={etf.ticker}
            >
              <span className={styles.compareBadge}>{etf.ticker}</span>
              <h3 className={styles.compareTitle}>{etf.ticker} ETF research</h3>
              <p className={styles.compareBody}>{etf.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className={styles.ctaRow}>
        <Link href={portfoliosHref} className={styles.cta}>
          Browse model portfolios →
        </Link>
        <Link href={builderHref} className={styles.cta}>
          Test a portfolio in the builder →
        </Link>
      </div>

      <Link href={learnHref} className={styles.back}>
        ← All Learn articles
      </Link>

      <p className={styles.legal}>
        Educational content only; not investment advice, not a recommendation to buy or sell any
        security. Past performance does not guarantee future results. Leveraged and alternative
        funds involve substantial risk.
      </p>
    </article>
  )
}
