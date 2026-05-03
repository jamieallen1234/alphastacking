import Link from 'next/link'
import { portfoliosPath, learnPath } from '@/lib/siteRegion'
import styles from './LearnArticle.module.css'

export default function WhyAlphaStackingArticle({ edition }: { edition: 'us' | 'ca' }) {
  const isCa = edition === 'ca'
  const portfoliosHref = portfoliosPath(isCa)
  const learnHref = learnPath(isCa)

  return (
    <article className={styles.article}>
      <header>
        <div className={styles.headerRow}>
          <span className={styles.eyebrow}>Strategy comparison</span>
          <span className={styles.readTime}>~5 min read</span>
        </div>
        <h1 className={styles.title}>Why alpha stacking</h1>
        <p className={styles.deck}>
          Four comparisons: index funds, return stacking, all-weather portfolios, and leveraged
          ETFs alone. Each one covers where each approach has the edge.
        </p>
      </header>

      <section className={styles.section} aria-labelledby="s1">
        <h2 id="s1" className={styles.sectionTitle}>
          vs. index funds
        </h2>
        <p className={styles.body}>
          Index funds: low cost, full equity exposure, no manager risk, and decades of evidence
          beating most active managers over any 10-year stretch. If your horizon is long and you
          can hold through anything, it&apos;s the right call.
        </p>
        <p className={styles.body}>
          Alpha stacking has an edge when the horizon is shorter, sequence-of-return risk is real,
          or a major drawdown would change the plan. A 25% max drawdown is easier to hold through
          than 50%, regardless of what the long-run averages say.
        </p>
        <p className={styles.body}>
          <strong>Index funds win when</strong> you have decades, can hold through anything, and
          want the lowest possible cost and complexity.
        </p>
        <p className={styles.body}>
          <strong>Alpha stacking wins when</strong> consistent compounding matters more than
          maximum long-run return: shorter horizons, near retirement, or when a major drawdown
          would change your plan.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s2">
        <h2 id="s2" className={styles.sectionTitle}>
          vs. return stacking
        </h2>
        <p className={styles.body}>
          Return stacking is the technique that makes alpha stacking possible: using derivatives
          to hold multiple exposures on the same dollar of capital without selling equity to make
          room. A fund like RSST or MATE gives you roughly $1 of S&amp;P 500 and $1 of managed
          futures for every $1 invested. That&apos;s the mechanism.
        </p>
        <p className={styles.body}>
          But a single return-stacked fund isn&apos;t the same as an alpha stacking portfolio.
          Most stack one thing on top of equity beta: usually trend or bonds. If that sleeve goes
          quiet for a few years (managed futures earned nothing 2012–2019), you&apos;re holding a
          more expensive version of SPY. With one stacked sleeve, equity still dominates.
        </p>
        <p className={styles.body}>
          Alpha stacking uses the same capital-efficiency technique but asks the harder question:
          which return sources have genuine independent edges when equity doesn&apos;t earn? It uses
          multiple sleeves so no single one going quiet kills the thesis.
        </p>
        <div className={styles.compareGrid}>
          <div className={styles.compareCard}>
            <span className={styles.compareBadge}>Return stacked</span>
            <h3 className={styles.compareTitle}>Portfolio A</h3>
            <p className={styles.compareBody}>
              60% RSST (S&amp;P 500 + managed futures), 40% SPY. Capital efficient, with equity
              beta and a trend sleeve. But with managed futures as the only diversifier, a flat
              trend period leaves the portfolio looking like lagging, more expensive SPY.
            </p>
          </div>
          <div className={`${styles.compareCard} ${styles.compareCardFeatured}`}>
            <span className={`${styles.compareBadge} ${styles.compareBadgeGold}`}>Alpha stacked</span>
            <h3 className={styles.compareTitle}>Portfolio B</h3>
            <p className={styles.compareBody}>
              Core leveraged equity (SSO) for beta, plus managed futures (MATE), long/short equity
              (CLSE), systematic alternatives (FLSP), and macro (HFGM), each sized so total market
              sensitivity is near 1.0. When equities chop, trend may earn; when stocks diverge,
              long/short earns; when macro shifts, macro earns.
            </p>
          </div>
        </div>
        <p className={styles.body}>
          Both use return stacking as a tool. Portfolio B is alpha stacking: the sleeves are chosen
          for independent edges, sized for how they interact, and combined so the portfolio
          isn&apos;t dependent on any single environment.
        </p>
        <p className={styles.body}>
          <strong>Return stacking wins when</strong> simplicity is the priority and a single
          stacked fund is a meaningful improvement over holding SPY alone.
        </p>
        <p className={styles.body}>
          <strong>Alpha stacking wins when</strong> you want multiple genuinely independent return
          engines and are willing to manage a multi-sleeve portfolio to get them.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s3">
        <h2 id="s3" className={styles.sectionTitle}>
          vs. all-weather portfolios
        </h2>
        <p className={styles.body}>
          All-weather portfolios (Dalio&apos;s original and its derivatives) hold equities, long
          bonds, gold, and commodities weighted so something works in every economic regime. You
          don&apos;t need to predict the environment.
        </p>
        <p className={styles.body}>
          The trade-off is return. All-weather holds a lot of bonds and gold relative to equity.
          2022 was the worst year for long bonds in a generation, and gold earns close to nothing
          in real terms over long periods. The low equity weight means meaningful underperformance
          in bull markets.
        </p>
        <p className={styles.body}>
          <strong>All-weather wins when</strong> maximum downside protection matters more than
          growth, and an investor is willing to give up most of the upside to get it.
        </p>
        <p className={styles.body}>
          <strong>Alpha stacking wins when</strong> the goal is equity-like returns with better
          drawdown management, not sacrificing the majority of the upside to limit the downside.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s4">
        <h2 id="s4" className={styles.sectionTitle}>
          vs. leveraged ETFs alone
        </h2>
        <p className={styles.body}>
          A 2&times; or 3&times; leveraged ETF in isolation captures more upside in bull markets
          and correspondingly more downside in bear markets. UPRO fell over 70% in 2022. That was
          the drawdown you had to survive to participate in the recovery.
        </p>
        <p className={styles.body}>
          LETFs also have daily-reset mechanics that create volatility drag in choppy markets: a
          fund that falls 10% then rises 10% ends about 1% below where it started. They work best
          in sustained, low-volatility uptrends, and require conviction you won&apos;t sell during
          a major drawdown.
        </p>
        <p className={styles.body}>
          Alpha stacking uses leveraged ETFs as the equity engine but sizes them alongside
          uncorrelated sleeves that can earn when equity falls or goes sideways, reducing
          concentration in a single levered bet.
        </p>
        <p className={styles.body}>
          <strong>LETFs alone win when</strong> you have a very long horizon, high drawdown
          tolerance, and conviction that equity bull markets will continue.
        </p>
        <p className={styles.body}>
          <strong>Alpha stacking wins when</strong> you want the return-boosting benefits of
          leverage without concentrating all your risk in one levered equity bet.
        </p>
      </section>

      <div className={styles.ctaRow}>
        <Link href={portfoliosHref} className={styles.cta}>
          View model portfolios →
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
