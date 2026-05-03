import Link from 'next/link'
import { portfoliosPath, learnPath, usEtfHubPath, portfolioBuilderPath } from '@/lib/siteRegion'
import styles from './LearnArticle.module.css'

export default function HowToBuildAlphaStackingArticle({ edition }: { edition: 'us' | 'ca' }) {
  const isCa = edition === 'ca'
  const portfoliosHref = portfoliosPath(isCa)
  const learnHref = learnPath(isCa)
  const builderHref = portfolioBuilderPath(isCa)
  const etfHref = usEtfHubPath(isCa)

  return (
    <article className={styles.article}>
      <header>
        <div className={styles.headerRow}>
          <span className={styles.eyebrow}>Portfolio construction</span>
          <span className={styles.readTime}>~6 min read</span>
        </div>
        <h1 className={styles.title}>How to build an alpha stacking portfolio</h1>
        <p className={styles.deck}>
          Equity is the core. Everything else is sized around it: trend-following, long/short, and
          macro strategies that can earn when stocks aren&apos;t. Construction logic first, then a
          worked portfolio example.
        </p>
      </header>

      <section className={styles.section} aria-labelledby="s1">
        <h2 id="s1" className={styles.sectionTitle}>
          What you&apos;re solving for
        </h2>
        <p className={styles.body}>
          Index funds work. The S&amp;P 500 has compounded at roughly 10% annually for the past
          century, and a simple index fund captures that without effort or fees. Most people with
          a 30-year horizon and the discipline to hold through drawdowns will do fine with one.
        </p>
        <p className={styles.body}>
          The case for alpha stacking is narrower: equity has long dead zones, and they tend to
          arrive at the worst times. The S&amp;P 500 was flat from 2000 to 2010, fell 50% twice in
          that decade. In 2022, equities and bonds fell together for the first time in decades.
          Alpha stacking carries return sources that earn in those regimes, funded not by selling
          stocks but by the same capital through derivatives. You keep the equity exposure and add
          something on top.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s2">
        <h2 id="s2" className={styles.sectionTitle}>
          The four building blocks
        </h2>
        <p className={styles.body}>
          Every alpha stacking portfolio draws from the same four building blocks.
        </p>
        <div className={styles.principles}>
          <div className={styles.principle}>
            <span className={styles.principleLabel}>1. Equity: the core sleeve</span>
            <p className={styles.principleText}>
              Equity beta drives the majority of long-run return. In leveraged alpha stacks the
              equity sleeve is often a 2&times; or 3&times; leveraged ETF (SSO, UPRO, SPXL), sized
              smaller so the portfolio still behaves roughly like owning the S&amp;P 500. In
              non-leveraged builds, it&apos;s SPY, QQQ, or a factor ETF like AVUV or SPMO.
            </p>
          </div>
          <div className={styles.principle}>
            <span className={styles.principleLabel}>2. Trend-following: the bear market sleeve</span>
            <p className={styles.principleText}>
              Managed futures funds (DBMF, KMLM, MATE) trend-follow across equities, bonds,
              currencies, and commodities. In a sustained equity decline, falling rates and rising
              volatility create clean trends that managed futures can capture. They earned
              significantly in 2022 when everything else was falling.
            </p>
          </div>
          <div className={styles.principle}>
            <span className={styles.principleLabel}>3. Long/short equity: the dispersion play</span>
            <p className={styles.principleText}>
              Long/short equity funds (CLSE, ORR) hold long positions in stocks they like and short
              positions in stocks they don&apos;t. Their returns depend less on market direction and
              more on whether good stocks beat bad ones. In choppy sideways markets where the index
              goes nowhere, a strong long/short fund can still compound.
            </p>
          </div>
          <div className={styles.principle}>
            <span className={styles.principleLabel}>4. Macro &amp; alternatives: the regime diversifier</span>
            <p className={styles.principleText}>
              Systematic macro (HFGM), style premia (FLSP), and merger arbitrage (MRGR) each have
              return profiles with low correlation to the other sleeves. Merger arb earns when deal
              spreads tighten, independent of market direction. Style premia exploit persistent
              factors across many markets. These sleeves earn in environments the others don&apos;t
              cover.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="s3">
        <h2 id="s3" className={styles.sectionTitle}>
          How the sleeves fit together
        </h2>
        <p className={styles.body}>
          The key constraint is <strong>total beta</strong>: how much the portfolio moves with the
          stock market. A beta of 1.0 tracks the S&amp;P 500 roughly in line. Add multiple leveraged
          sleeves without accounting for how they interact and you can end up with something that
          behaves like 3&times; the index, far more volatile than intended.
        </p>
        <p className={styles.body}>
          The target is usually a total beta near 1.0 with the return sources spread across multiple
          sleeves. If the equity sleeve is 2&times; levered, you hold a smaller dollar allocation to
          keep total beta near 1.0. For example: 35% in SSO (2&times;, beta ~2.0) contributes about
          0.70 of total beta. Adding 20% MATE (stacked equity + managed futures, beta ~1.4)
          contributes another 0.28. The remaining allocation to CLSE, FLSP, and MRGR brings total
          beta to roughly 1.0 while adding return sources that aren&apos;t equity-dependent.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s4">
        <h2 id="s4" className={styles.sectionTitle}>
          A worked example: US Alpha Stack
        </h2>
        <p className={styles.body}>
          The{' '}
          <Link href={`${portfoliosHref}/us-advanced`} className={styles.inlineLink}>
            US Alpha Stack
          </Link>{' '}
          model portfolio illustrates how these principles translate into actual weights. It uses a
          leveraged equity sleeve as the core, sized to keep total beta near 1.0, then layers in
          managed futures, long/short equity, and systematic alternatives, each chosen for its
          independent edge.
        </p>
        <p className={styles.body}>
          The model rebalances annually. Daily-resetting leverage drifts over time, and annual
          rebalancing keeps the beta target intact. Use it as a starting point in the{' '}
          <Link href={builderHref} className={styles.inlineLink}>
            portfolio builder
          </Link>
          , copy the weights, adjust the sleeves, and see how the historical chart changes versus
          SPY.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s5">
        <h2 id="s5" className={styles.sectionTitle}>
          Alpha stacking vs. the index
        </h2>
        <p className={styles.body}>
          Both approaches have real arguments. Here&apos;s where each one wins.
        </p>
        <div className={styles.principles}>
          <div className={styles.principle}>
            <span className={styles.principleLabel}>Alpha stacking earns across regimes</span>
            <p className={styles.principleText}>
              An index fund needs stocks to go up. Alpha stacking carries sleeves that can earn
              when they don&apos;t. In 2022, when the S&amp;P 500 fell 18% and bonds fell 13%,
              managed futures ETFs gained 20–30%. In the lost decade of 2000–2010, systematic macro
              and long/short outperformed. A multi-sleeve portfolio doesn&apos;t need any single
              regime to cooperate.
            </p>
          </div>
          <div className={styles.principle}>
            <span className={styles.principleLabel}>Index funds win on simplicity</span>
            <p className={styles.principleText}>
              A plain index fund is one decision: buy, hold, reinvest. No manager risk, no
              rebalancing calculus, no tracking multiple strategies. Over 30-year horizons, the
              equity risk premium has consistently rewarded patience. If you can hold through
              drawdowns and your timeline is genuinely long, the index wins on simplicity.
            </p>
          </div>
          <div className={styles.principle}>
            <span className={styles.principleLabel}>Who the tradeoff favors</span>
            <p className={styles.principleText}>
              Alpha stacking makes the most sense over medium-term horizons (10–20 years), or when
              sequence-of-return risk is real: near retirement, in distribution phase, or when a
              major drawdown would change your plan. An index fund makes the most sense when your
              horizon is genuinely long and you can afford to ignore the ride.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="s6">
        <h2 id="s6" className={styles.sectionTitle}>
          Where to start
        </h2>
        <p className={styles.body}>
          Start with the model portfolios. Pick one that matches your situation, read the{' '}
          <Link href={etfHref} className={styles.inlineLink}>
            ETF pages
          </Link>{' '}
          for each holding, and rebuild it in the portfolio builder to see the historical numbers.
          That process makes the construction logic real in a way reading about it doesn&apos;t.
        </p>
        <p className={styles.body}>
          The Capital and Alpha Efficiency grades on each ETF page are a useful filter: they show
          whether a fund is actually delivering on its role after costs.
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
        Educational content only; not investment advice, not a recommendation to buy or sell any
        security. Past performance does not guarantee future results. Leveraged and alternative
        funds involve substantial risk.
      </p>
    </article>
  )
}
