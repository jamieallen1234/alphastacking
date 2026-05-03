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
          <span className={styles.readTime}>~8 min read</span>
        </div>
        <h1 className={styles.title}>How to build an alpha stacking portfolio</h1>
        <p className={styles.deck}>
          Alpha stacking is a way to take an all-equity portfolio and layer on top additional sources of alpha
          such as trend-following, long/short, macro, and alternative strategies to generate additional sources of returns through the
          different stages of market cycles.
        </p>
        <p className={styles.deck}>
          This walkthrough explains the logic behind constructing an alpha stacking portfolio, then works through
          how a model portfolio was constructed.
        </p>
      </header>

      <section className={styles.section} aria-labelledby="s1">
        <h2 id="s1" className={styles.sectionTitle}>
          What you&apos;re solving for
        </h2>
        <p className={styles.body}>
          A standard index fund portfolio has one engine: equity beta. It does well when stocks go up and
          does poorly when they don&apos;t. There&apos;s nothing wrong with that. Most of the time stocks
          do go up, and index funds capture that cleanly. But equity has long stretches where it delivers
          nothing. The S&amp;P 500 was flat for a decade from 2000–2010. It fell 50% twice in that window.
        </p>
        <p className={styles.body}>
          Alpha stacking is about owning equity <em>and</em> carrying other return sources alongside it:
          sources that can earn when equity isn&apos;t. The goal is a portfolio that compounds more
          consistently, not a portfolio that takes more risk to chase higher highs.
        </p>
        <p className={styles.body}>
          The tool that makes this possible is <strong>capital efficiency</strong>: using leveraged ETFs and
          return-stacked funds lets you hold more than one return source without selling your equity to make
          room. You keep the equity exposure and add something on top, funded by derivatives rather than
          by liquidating existing positions.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s2">
        <h2 id="s2" className={styles.sectionTitle}>
          The four building blocks
        </h2>
        <p className={styles.body}>
          Every alpha stacking portfolio is assembled from the same four types of sleeves. Not every
          portfolio needs all four, but understanding each role makes the construction logic clear.
        </p>
        <div className={styles.principles}>
          <div className={styles.principle}>
            <span className={styles.principleLabel}>1. Equity: the core engine</span>
            <p className={styles.principleText}>
              Equity beta drives the majority of long-run return. The market goes up more than it goes down
              over time, and you want to own that. In leveraged alpha stacks, this sleeve is often a 2× or
              3× leveraged equity ETF (SSO, UPRO, SPXL), sized smaller so the overall portfolio still
              behaves roughly like owning the S&amp;P 500. In non-leveraged builds, this is SPY, QQQ, or
              a factor ETF like AVUV or SPMO.
            </p>
          </div>
          <div className={styles.principle}>
            <span className={styles.principleLabel}>2. Trend-following: the drawdown buffer</span>
            <p className={styles.principleText}>
              Managed futures funds like DBMF, KMLM, and MATE trend-follow across asset classes: equities,
              bonds, currencies, commodities. When equity is in a sustained decline, like in 2022, falling
              rates and rising volatility create trends in rates and FX that managed futures can capture.
              These funds don&apos;t consistently profit in crashes, but they tend to do well in prolonged
              bear markets where the trends are clear. They&apos;re the sleeve most likely to be earning
              while equities are falling.
            </p>
          </div>
          <div className={styles.principle}>
            <span className={styles.principleLabel}>3. Long/short equity: the dispersion play</span>
            <p className={styles.principleText}>
              Long/short equity funds (CLSE, ORR) hold long positions in stocks they like and short
              positions in stocks they don&apos;t. Their returns depend less on whether the market goes up
              or down and more on whether good stocks beat bad ones, which tends to happen regardless of
              direction. In choppy, sideways markets where the index goes nowhere, a strong long/short fund
              can still compound.
            </p>
          </div>
          <div className={styles.principle}>
            <span className={styles.principleLabel}>4. Macro &amp; alternatives: the regime diversifier</span>
            <p className={styles.principleText}>
              Systematic macro (HFGM), style premia (FLSP), and merger arbitrage (MRGR) each have return
              profiles with low correlation to the other sleeves. Merger arb earns when deal spreads tighten,
              independent of market direction. Style premia exploit persistent factors (value, carry,
              momentum) across many markets. These sleeves earn in different environments; they&apos;re
              the portfolio&apos;s coverage in regimes the other sleeves don&apos;t address.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="s3">
        <h2 id="s3" className={styles.sectionTitle}>
          How the sleeves fit together
        </h2>
        <p className={styles.body}>
          Before the numbers: <strong>beta</strong> is a measure of how much a portfolio moves with the
          stock market. A beta of 1.0 means the portfolio rises and falls roughly in line with the S&amp;P 500.
          A beta of 2.0 means it moves twice as much: double the gains, double the losses. A beta of 0 means
          it has no relationship to the stock market at all.
        </p>
        <p className={styles.body}>
          The key constraint when building an alpha stacking portfolio is <strong>total beta</strong>. If you
          add multiple leveraged sleeves without accounting for how they interact, you can end up with a
          portfolio that behaves like 3× the S&amp;P 500, more volatile than you intended, with outsized
          drawdowns in bad years.
        </p>
        <p className={styles.body}>
          The target is usually a total beta near 1.0, roughly equivalent to owning the index, with the
          sources of return spread across multiple sleeves. That means if the equity sleeve is 2× levered,
          you hold a smaller dollar allocation to it to bring total beta back to 1.0.
        </p>
        <p className={styles.body}>
          For example: a portfolio with 35% in SSO (2× levered, beta ~2.0) contributes about 0.70 of total
          beta. Adding 20% MATE (stacked equity + managed futures, beta ~1.4) contributes another 0.28.
          The remaining allocation to CLSE, FLSP, MRGR brings total beta to roughly 1.0 while adding
          return sources that aren&apos;t equity-dependent.
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
          managed futures, long/short equity, and systematic alternatives, each chosen for its independent
          edge and sized for how it interacts with the other sleeves.
        </p>
        <p className={styles.body}>
          The model is rebalanced annually, which matters for leveraged positions: daily-resetting leverage
          drifts over time, so periodic rebalancing keeps the intended weights and beta target intact.
          Without rebalancing, a strong equity year leaves the portfolio overweight equity and underweight
          the diversifying sleeves.
        </p>
        <p className={styles.body}>
          You can use this portfolio as a starting point in the{' '}
          <Link href={builderHref} className={styles.inlineLink}>
            portfolio builder
          </Link>
          : copy the weights, add or remove sleeves, and see how the historical chart changes. The builder
          shows total return vs SPY and drawdowns for any date range, which makes it easy to see what each
          sleeve is actually contributing.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s5">
        <h2 id="s5" className={styles.sectionTitle}>
          What to watch for
        </h2>
        <p className={styles.body}>
          A few things that matter when building or evaluating an alpha stacking portfolio:
        </p>
        <div className={styles.principles}>
          <div className={styles.principle}>
            <span className={styles.principleLabel}>Correlation in crises</span>
            <p className={styles.principleText}>
              Most diversifying sleeves look good in backtests. The test is what they do in sharp
              drawdowns: do they hold their value, or do they sell off alongside equity? Managed futures
              have a reasonable track record in sustained bear markets. Long/short equity is more variable;
              some managers hold up, others don&apos;t. Tail-risk funds like CAOS will gain in crashes but
              drag in calm markets. Know what you&apos;re buying before adding it.
            </p>
          </div>
          <div className={styles.principle}>
            <span className={styles.principleLabel}>Leverage cost</span>
            <p className={styles.principleText}>
              Leveraged ETFs have embedded borrowing costs. SSO costs more to run than SPY, and that cost
              shows up as a modest drag versus 2× the index. The Capital Efficiency grade on each ETF page
              accounts for this: higher-grade LETFs are delivering enough return per unit of beta to
              justify the cost. Lower-grade ones may not be.
            </p>
          </div>
          <div className={styles.principle}>
            <span className={styles.principleLabel}>Manager risk</span>
            <p className={styles.principleText}>
              Alternative sleeves like long/short equity and macro depend on manager skill. They can change
              strategy, lose key personnel, or underperform for extended stretches. This is different from
              equity beta, where you&apos;re not betting on any manager. Sizing diversifying sleeves at 10–25%
              of the portfolio limits the damage if any single manager goes through a rough patch.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="s6">
        <h2 id="s6" className={styles.sectionTitle}>
          Where to start
        </h2>
        <p className={styles.body}>
          If you&apos;re new to this, start with the model portfolios rather than building from scratch.
          Pick one that matches your risk appetite and time horizon, read through each holding on the{' '}
          <Link href={etfHref} className={styles.inlineLink}>
            ETF pages
          </Link>
          , and then rebuild it in the portfolio builder to see what the historical numbers look like.
          That process will make the construction logic much clearer than reading about it in the abstract.
        </p>
        <p className={styles.body}>
          The efficiency grades on each ETF page are a useful filter: they summarize how well each fund
          delivers on its role, accounting for cost. They&apos;re not a buy signal, but they help you
          avoid funds that look good in theory but deliver poorly in practice.
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
