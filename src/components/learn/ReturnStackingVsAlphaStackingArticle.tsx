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
          <span className={styles.readTime}>~6 min read</span>
        </div>
        <h1 className={styles.title}>Return stacking vs. alpha stacking</h1>
        <p className={styles.deck}>
          Return stacking is a capital efficiency technique — a way to fit more exposure into each dollar. Alpha
          stacking is a portfolio construction philosophy — a framework for choosing which exposures to combine and
          why. They use the same tools, but the questions they answer are different.
        </p>
      </header>

      <section className={styles.section} aria-labelledby="s1">
        <h2 id="s1" className={styles.sectionTitle}>
          What return stacking solves
        </h2>
        <p className={styles.body}>
          Return stacking is a <strong>capital efficiency</strong> technique. The core idea: instead of choosing
          between owning equities or managed futures, you use derivatives and futures to hold both simultaneously on
          the same dollar of capital.
        </p>
        <p className={styles.body}>
          A fund like <strong>RSST</strong> or <strong>MATE</strong> is the clearest example. For every $1 you invest,
          you get roughly $1 of S&amp;P 500 exposure and $1 of managed futures exposure — $2 of exposure on
          $1 of capital. The collateral (your cash) backs both sleeves via futures contracts rather than direct stock
          ownership.
        </p>
        <p className={styles.body}>
          This solves a real problem. Traditionally, adding a diversifying sleeve meant selling equities to make room.
          Return stacking removes that trade-off — you keep the full equity position and add something on top.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s2">
        <h2 id="s2" className={styles.sectionTitle}>
          What return stacking doesn&apos;t solve
        </h2>
        <p className={styles.body}>
          Capital efficiency tells you <em>how</em> to stack. It doesn&apos;t tell you <em>what</em> to stack or
          whether the combination will compound well.
        </p>
        <p className={styles.body}>
          Most return-stacked funds layer one thing on top of equity beta — typically bonds, trend, or gold. The
          stacked sleeve is chosen for diversification, not necessarily because it has an independent return engine.
          If that sleeve is low-returning in rising-rate environments (bonds in 2022), or only earns during narrow
          conditions (gold in crisis tapes), you end up with more complexity without meaningfully better compounding.
        </p>
        <p className={styles.body}>
          The failure mode: a portfolio where the stacked sleeve adds cost and complexity, but the dominant driver of
          returns is still just equity beta — you only have one real engine.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s3">
        <h2 id="s3" className={styles.sectionTitle}>
          What alpha stacking adds
        </h2>
        <p className={styles.body}>
          Alpha stacking starts from the same capital-efficiency insight but asks the harder question: which return
          sources have genuine independent edges — and how do they behave when equity doesn&apos;t?
        </p>
        <p className={styles.body}>
          This is where alternative strategies earn their place. Managed futures trend-follow across asset classes:
          in 2022, rising rates and falling equities created clean, persistent trends that managed futures captured
          while equity fell 20%. Long/short equity generates returns from dispersion — stocks diverging from each
          other, winners pulling away from losers — regardless of which direction the index goes. Global macro funds
          can be positioned for the same rate or currency moves that are driving the equity drawdown. None of these
          need equities to rise to generate returns.
        </p>
        <p className={styles.body}>The distinction comes down to three design choices:</p>
        <div className={styles.principles}>
          <div className={styles.principle}>
            <span className={styles.principleLabel}>1. Selection</span>
            <p className={styles.principleText}>
              Return stacking is agnostic about what gets stacked. Alpha stacking is opinionated — it favors sleeves
              with a clear structural reason to earn: trend-following, merger spreads, long/short equity dispersion,
              systematic macro. These exist because of persistent market frictions, not because someone needed a
              diversifier.
            </p>
          </div>
          <div className={styles.principle}>
            <span className={styles.principleLabel}>2. Interaction</span>
            <p className={styles.principleText}>
              Alpha stacking treats correlation as a design choice. Managed futures and long/short equity
              don&apos;t just diversify each other — they tend to earn in different regimes. Blending them means the
              portfolio has a plausible path to compounding in bull, bear, and sideways markets, not just one of
              them.
            </p>
          </div>
          <div className={styles.principle}>
            <span className={styles.principleLabel}>3. Beta target</span>
            <p className={styles.principleText}>
              Beta measures how much a portfolio moves with the stock market: 1.0 means it moves in line with
              the S&amp;P 500; 2.0 means it moves twice as much. A well-constructed alpha stack targets a total
              beta near 1.0 — equity-like market sensitivity — while the sources of that return come from
              multiple independent engines. This is different from a return-stacked fund that piles on
              exposure and lets total risk land wherever it lands.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="s4">
        <h2 id="s4" className={styles.sectionTitle}>
          Side by side
        </h2>
        <p className={styles.body}>These two portfolios use the same underlying tools. The construction logic is different.</p>
        <div className={styles.compareGrid}>
          <div className={styles.compareCard}>
            <span className={styles.compareBadge}>Return stacked</span>
            <h3 className={styles.compareTitle}>Portfolio A</h3>
            <p className={styles.compareBody}>
              60% RSST (S&amp;P 500 + managed futures), 40% SPY. Capital efficient, with equity beta and a trend
              sleeve. But managed futures is the only diversifier. If trend underperforms for a long stretch — as it
              did 2012–2019 — the portfolio looks like a lagging, more expensive version of SPY.
            </p>
          </div>
          <div className={`${styles.compareCard} ${styles.compareCardFeatured}`}>
            <span className={`${styles.compareBadge} ${styles.compareBadgeGold}`}>Alpha stacked</span>
            <h3 className={styles.compareTitle}>Portfolio B</h3>
            <p className={styles.compareBody}>
              Core leveraged equity (SSO) for beta, plus managed futures (MATE), long/short equity (CLSE),
              systematic alternatives (FLSP), and macro (HFGM) — each sized so total market sensitivity is near
              1.0. Multiple independent return engines: when equities chop, trend may earn; when stocks diverge,
              long/short earns; when macro shifts, the macro sleeve earns.
            </p>
          </div>
        </div>
        <p className={styles.body}>
          Both use return stacking as a tool. Portfolio B is alpha stacking — the sleeves are chosen for their
          independent edges, sized for how they interact, and combined so the portfolio isn&apos;t dependent on any
          one environment to compound.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s5">
        <h2 id="s5" className={styles.sectionTitle}>
          Why this matters
        </h2>
        <p className={styles.body}>
          If you approach portfolio construction as &quot;what can I stack on top of my equity position,&quot;
          you end up with a more complex equity portfolio. If you approach it as &quot;what are the independent
          return sources and how do they fit together,&quot; you end up with something structurally different.
        </p>
        <p className={styles.body}>
          Equity is one return source — a good one. But it doesn&apos;t earn in every environment. The case for
          alpha stacking is that you can own enough equity to participate in bull markets while carrying enough
          genuinely independent sleeves to compound through the stretches when equity doesn&apos;t deliver.
        </p>
        <p className={styles.body}>
          <strong>Return stacking is the mechanism. Alpha stacking is the philosophy.</strong>
        </p>
      </section>

      <p className={styles.closing}>
        The model portfolios on this site are built around this distinction — each sleeve chosen for its
        independent edge, sized for how it interacts with the others.
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
