import Link from 'next/link'
import { portfoliosPath, learnPath } from '@/lib/siteRegion'
import styles from './LearnArticle.module.css'

export default function PortfolioScoreArticle({ edition }: { edition: 'us' | 'ca' }) {
  const isCa = edition === 'ca'
  const portfolioHref = portfoliosPath(isCa)
  const learnHref = learnPath(isCa)

  return (
    <article className={styles.article}>
      <header>
        <div className={styles.headerRow}>
          <span className={styles.eyebrow}>Reference</span>
          <span className={styles.readTime}>~3 min read</span>
        </div>
        <h1 className={styles.title}>How portfolio scores work</h1>
        <p className={styles.deck}>
          What the A/B/C grade on each portfolio means, how it is calculated, and what it does not
          tell you.
        </p>
      </header>

      <section className={styles.section} aria-labelledby="s1">
        <h2 id="s1" className={styles.sectionTitle}>
          What the score is
        </h2>
        <p className={styles.body}>
          Every model portfolio shows a letter grade: A+, A, B+, B, C, or D. It is a single number
          that summarises how that portfolio has performed against the S&amp;P 500 across three
          things: how much it returned, how far it fell in its worst period, and how much market
          risk it carries. SPY scores around B. That is the baseline.
        </p>
        <p className={styles.body}>
          A portfolio that has meaningfully beaten SPY with similar or smaller drawdowns will score
          A or A+. One that has roughly matched SPY will score B. One that has lagged or had a
          worse drawdown than SPY will score C or D.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s2">
        <h2 id="s2" className={styles.sectionTitle}>
          Three factors, three weights
        </h2>
        <p className={styles.body}>
          Three inputs feed the score, each with a fixed weight:
        </p>
        <div className={styles.principles}>
          <div className={styles.principle}>
            <span className={styles.principleLabel}>Alpha — 50%</span>
            <p className={styles.principleText}>
              Did the portfolio beat the S&amp;P 500? Beating it by more than 25% over the window
              earns the full points here. Lagging by more than 15% scores zero. Everything in
              between is prorated.
            </p>
          </div>
          <div className={styles.principle}>
            <span className={styles.principleLabel}>Max drawdown — 30%</span>
            <p className={styles.principleText}>
              Did the portfolio fall less than the S&amp;P 500 in its worst period? A significantly
              smaller drawdown earns the full 30%. A drawdown that is substantially worse than
              SPY&apos;s earns nothing.
            </p>
          </div>
          <div className={styles.principle}>
            <span className={styles.principleLabel}>Beta — 20%</span>
            <p className={styles.principleText}>
              Does the portfolio carry less market sensitivity than 1.0? A weighted beta below 1.0
              earns the full 20%. Above 1.0 loses points. This rewards portfolios that achieve
              their returns without simply amplifying market exposure.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="s3">
        <h2 id="s3" className={styles.sectionTitle}>
          How the score blends over time
        </h2>
        <p className={styles.body}>
          The score blends two time windows: the last 12 months (50%) and the full available
          history (50%). Blending stops a single lucky or unlucky year from dominating.
        </p>
        <p className={styles.body}>
          If a portfolio is under one year old, only the full-history window is used. The final
          grade is then dropped by one letter to flag the short track record. A short window is
          unlikely to have covered more than one or two of the five market environments
          (growth, inflation, recession, deflation, and choppy/sideways markets), so a
          high score early on carries less weight. A new portfolio that would otherwise score A
          will show B+ until it has at least one full year of data.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s4">
        <h2 id="s4" className={styles.sectionTitle}>
          What the grades mean in practice
        </h2>
        <dl className={styles.defChart}>
          {([
            ['A+', 'Substantially beat SPY with a smaller drawdown. Strong returns and better downside protection across the measured window.'],
            ['A',  'Meaningfully beat SPY with a similar or smaller drawdown. The portfolio has earned its complexity over the measured period.'],
            ['B+', 'Beat SPY modestly, or matched it with a clearly better drawdown. A step above the index baseline.'],
            ['B',  'Roughly matched SPY in both return and drawdown. This is where SPY itself would score.'],
            ['C',  'Lagged SPY or had a noticeably worse drawdown. Worth understanding why before investing.'],
            ['D',  'Both underperformed SPY and had a worse drawdown over the same period.'],
          ] as const).map(([grade, desc]) => (
            <div key={grade} className={styles.defRow} style={{ padding: '0.45rem 1.15rem', gridTemplateColumns: '2.5rem 1fr' }}>
              <dt className={styles.defTerm}>{grade}</dt>
              <dd className={styles.defDesc}>{desc}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={styles.section} aria-labelledby="s5">
        <h2 id="s5" className={styles.sectionTitle}>
          What the score does not tell you
        </h2>
        <p className={styles.body}>
          The score is backward-looking and uses a single benchmark (SPY). A portfolio with a B
          might suit your goals better than an A-rated one if the A relies on one specific market
          environment to shine.
        </p>
        <p className={styles.body}>
          The measured window may only cover one or two of those five environments. A high score
          in a limited window is not the same as a strategy that holds up across all of them.
        </p>
        <p className={styles.body}>
          Use the score as a starting point, not a conclusion. Read the portfolio description and
          understand the strategy before making a decision based on the grade alone.
        </p>
      </section>

      <div className={styles.ctaRow}>
        <Link href={portfolioHref} className={styles.cta}>
          Browse model portfolios →
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
