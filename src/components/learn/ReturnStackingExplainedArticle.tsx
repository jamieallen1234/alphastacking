import Link from 'next/link'
import { portfoliosPath, learnPath, usEtfHubPath } from '@/lib/siteRegion'
import styles from './LearnArticle.module.css'

export default function ReturnStackingExplainedArticle({ edition }: { edition: 'us' | 'ca' }) {
  const isCa = edition === 'ca'
  const portfoliosHref = portfoliosPath(isCa)
  const learnHref = learnPath(isCa)
  const etfHref = usEtfHubPath(isCa)

  return (
    <article className={styles.article}>
      <header>
        <div className={styles.headerRow}>
          <span className={styles.eyebrow}>Concepts</span>
          <span className={styles.readTime}>~3 min read</span>
        </div>
        <h1 className={styles.title}>Return stacking explained</h1>
        <p className={styles.deck}>
          Hold two investments at once without selling one to pay for the other. Here is how it
          works and when it hurts you.
        </p>
      </header>

      <section className={styles.section} aria-labelledby="s1">
        <h2 id="s1" className={styles.sectionTitle}>
          The idea
        </h2>
        <p className={styles.body}>
          Normally, adding a second investment means selling something to make room. Return stacking
          avoids that by using leverage: you hold both at once, and your stocks stay untouched. The
          catch is that leverage has a cost, and the second investment has to earn enough to cover it.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s2">
        <h2 id="s2" className={styles.sectionTitle}>
          The main flavors
        </h2>
        <p className={styles.body}>
          <strong>100/100 funds</strong> give you a full stock position plus a full second sleeve on
          the same dollar. RSST (stocks + managed futures) and RSSB (stocks + bonds) work this way.
          You pay borrowing costs for the extra leverage.
        </p>
        <p className={styles.body}>
          <strong>Lower-ratio funds</strong>{' '}use less leverage. WisdomTree&apos;s NTSX holds 90%
          equities with a 60% bond sleeve. Other WisdomTree variants run 90/90. Less borrowing cost,
          but less of the second sleeve too.
        </p>
        <p className={styles.body}>
          You can also <strong>build it yourself</strong>: put 50% in SSO (a 2&times; S&amp;P 500
          ETF) and 50% in DBMF (a managed futures ETF). That gives you roughly the same exposure as
          RSST with more control over each piece.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s3">
        <h2 id="s3" className={styles.sectionTitle}>
          When it fails
        </h2>
        <p className={styles.body}>
          It fails when both sleeves lose at the same time. In 2022, stocks and bonds both fell
          hard. A fund holding both via return stacking lost on both sides and still paid borrowing
          costs on top.
        </p>
        <p className={styles.body}>
          It also fails when the second sleeve does not earn enough to cover the cost of leverage.
          If managed futures returns 3% and borrowing costs 5%, that sleeve is losing you 2% per
          year before anything else. At $10,000 that is $200 per year in the wrong direction.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s4">
        <h2 id="s4" className={styles.sectionTitle}>
          Return stacking vs. alpha stacking
        </h2>
        <p className={styles.body}>
          Return stacking is just the mechanism: hold two things on one dollar. It does not say
          which two things to pick. You could stack something that moves with stocks, which mostly
          just adds risk. Or you could stack something that tends to earn when stocks do not.
        </p>
        <p className={styles.body}>
          Alpha stacking is more selective. Every sleeve must have a credible case for generating
          real returns on its own, not just diversifying or reducing volatility. A sleeve that
          lowers risk but earns nothing does not clear the bar.
        </p>
        <p className={styles.body}>
          The portfolio is sized to keep total equity sensitivity near 1.0 and to limit drawdowns
          across multiple market cycles. Full participation in bull markets, shallower holes in
          bear markets.
        </p>
      </section>

      <div className={styles.ctaRow}>
        <Link href={portfoliosHref} className={styles.cta}>
          Browse model portfolios →
        </Link>
        <Link href={etfHref} className={styles.cta}>
          Browse ETFs →
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
