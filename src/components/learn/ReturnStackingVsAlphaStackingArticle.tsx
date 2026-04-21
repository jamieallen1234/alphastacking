import Link from 'next/link'
import { portfoliosPath, learnPath } from '@/lib/siteRegion'
import styles from './LearnArticle.module.css'

export default function ReturnStackingVsAlphaStackingArticle({ edition }: { edition: 'us' | 'ca' }) {
  const isCa = edition === 'ca'
  const portfoliosHref = portfoliosPath(isCa)
  const learnHref = learnPath(isCa)

  return (
    <article className={styles.article}>
      <header>
        <div className={styles.headerRow}>
          <span className={styles.eyebrow}>Concepts</span>
          <span className={styles.readTime}>~5 min read</span>
        </div>
        <h1 className={styles.title}>Return Stacking vs. Alpha Stacking: What&apos;s the Difference?</h1>
        <p className={styles.deck}>
          Return stacking gives you more exposure per dollar. Alpha stacking gives you better sources of return.
          They&apos;re related ideas — but they&apos;re not the same thing, and confusing them leads to portfolios
          that look diversified but aren&apos;t.
        </p>
      </header>

      <section className={styles.section} aria-labelledby="s1">
        <h2 id="s1" className={styles.sectionTitle}>
          Start with return stacking
        </h2>
        <p className={styles.body}>
          Return stacking is a <strong>capital efficiency</strong> technique. The core idea: instead of choosing
          between owning equities or managed futures, you use derivatives and futures to hold both simultaneously on
          the same dollar of capital.
        </p>
        <p className={styles.body}>
          A fund like <strong>RSST</strong> or <strong>MATE</strong> is the clearest example. For every $1 you invest,
          you get roughly $1 of S&amp;P 500 exposure and $1 of managed futures exposure — $2 of notional exposure on
          $1 of capital. The collateral (your cash) backs both sleeves via futures contracts rather than direct stock
          ownership.
        </p>
        <p className={styles.body}>
          This is genuinely useful. It solves the &quot;opportunity cost&quot; problem: traditionally, adding a
          diversifying sleeve meant reducing your equity allocation to make room. Return stacking removes that
          trade-off.
        </p>
        <p className={styles.body}>
          But return stacking alone has limits. Most return-stacked funds simply layer one thing on top of another —
          usually bonds, trend, or gold on top of equity beta. The stacked sleeve is chosen for{' '}
          <strong>diversification</strong>, not necessarily for <strong>alpha</strong>. And if that sleeve is
          low-returning or negatively correlated to equities only in specific regimes, you end up with more complexity
          without meaningfully better compounding.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s2">
        <h2 id="s2" className={styles.sectionTitle}>
          What alpha stacking adds
        </h2>
        <p className={styles.body}>
          Alpha stacking starts from the same capital-efficiency insight but asks a harder question: what are the{' '}
          <strong>strongest return sources</strong> available, and how do they interact with each other?
        </p>
        <p className={styles.body}>
          Rather than stacking one diversifier on top of equity beta, alpha stacking combines multiple{' '}
          <strong>independent return premia</strong> — each with its own edge, its own regime — in a way that&apos;s
          deliberately engineered for compounding across bull, bear, and sideways markets.
        </p>
        <p className={styles.body}>The distinction comes down to three things:</p>
        <div className={styles.principles}>
          <div className={styles.principle}>
            <span className={styles.principleLabel}>1. Selection</span>
            <p className={styles.principleText}>
              Return stacking is agnostic about what gets stacked. Alpha stacking is opinionated — it seeks sleeves
              with genuine structural edge: trend-following, merger spreads, long/short equity dispersion, systematic
              macro. These are premia that exist because of persistent behavioral or structural market frictions, not
              just because someone needed a diversifier.
            </p>
          </div>
          <div className={styles.principle}>
            <span className={styles.principleLabel}>2. Interaction</span>
            <p className={styles.principleText}>
              Alpha stacking treats correlation as a design variable, not an afterthought. Managed futures and
              long/short equity don&apos;t just diversify each other — they tend to earn in different regimes, so
              blending them creates a smoother compounding path. The goal is a portfolio where something is always
              working, not a portfolio where everything is correlated until a crisis hits.
            </p>
          </div>
          <div className={styles.principle}>
            <span className={styles.principleLabel}>3. Beta engineering</span>
            <p className={styles.principleText}>
              A well-constructed alpha stack targets a deliberate overall beta — typically near 1.0 — so the portfolio
              earns equity-like returns without being purely equity-dependent. This is different from a return-stacked
              fund that simply adds notional exposure and lets the beta land wherever it lands.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="s3">
        <h2 id="s3" className={styles.sectionTitle}>
          A concrete illustration
        </h2>
        <p className={styles.body}>Consider two portfolios:</p>
        <div className={styles.compareGrid}>
          <div className={styles.compareCard}>
            <span className={styles.compareBadge}>Return stacked</span>
            <h3 className={styles.compareTitle}>Portfolio A</h3>
            <p className={styles.compareBody}>
              60% RSST (S&amp;P 500 + managed futures), 40% SPY. You have equity beta and a trend sleeve. It&apos;s
              capital efficient. But the managed futures component is the only diversifier, the overall construction is
              equity-heavy, and if trend underperforms for an extended period (as it did 2012–2019), the portfolio just
              looks like a lagging version of SPY.
            </p>
          </div>
          <div className={`${styles.compareCard} ${styles.compareCardFeatured}`}>
            <span className={`${styles.compareBadge} ${styles.compareBadgeGold}`}>Alpha stacked</span>
            <h3 className={styles.compareTitle}>Portfolio B</h3>
            <p className={styles.compareBody}>
              Core leveraged equity (SSO) providing beta, layered with managed futures (MATE), long/short equity (CLSE),
              systematic alternatives (FLSP/IALT), and macro (HFGM) — each sized to target beta ~1.0 overall. Multiple
              independent return sources, each contributing when others are quiet, engineered so the portfolio
              isn&apos;t dependent on any single regime.
            </p>
          </div>
        </div>
        <p className={styles.body}>
          Both use return stacking as a tool. But Portfolio B is alpha stacking — the sleeves are chosen for their
          edge, sized for their interaction, and combined with an explicit outcome in mind.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s4">
        <h2 id="s4" className={styles.sectionTitle}>
          Why it matters for portfolio construction
        </h2>
        <p className={styles.body}>
          If you approach portfolio construction as &quot;what can I stack on top of my equity position,&quot;
          you&apos;ll end up with a more complex version of an equity portfolio. If you approach it as &quot;what are
          the best independent return sources and how do I combine them efficiently,&quot; you end up with something
          structurally different.
        </p>
        <p className={styles.body}>
          That&apos;s the shift alpha stacking asks you to make. Equity beta is one return source — a good one, with a
          strong long-run track record. But it&apos;s not the only one, and it&apos;s not always the best one for every
          market environment. The goal is to own enough of it to participate in bull markets while having enough
          independent alpha sources to compound through the periods when equities don&apos;t deliver.
        </p>
        <p className={styles.body}>
          <strong>Return stacking is the mechanism. Alpha stacking is the philosophy.</strong>
        </p>
      </section>

      <p className={styles.closing}>
        The model portfolios on this site are built around this distinction. See how the sleeves combine.
      </p>
      <div className={styles.ctaRow}>
        <Link href={portfoliosHref} className={styles.cta}>
          View model portfolios →
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
