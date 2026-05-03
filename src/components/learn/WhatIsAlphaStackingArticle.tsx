import Link from 'next/link'
import { portfoliosPath, learnPath, usEtfHubPath } from '@/lib/siteRegion'
import styles from './LearnArticle.module.css'

export default function WhatIsAlphaStackingArticle({ edition }: { edition: 'us' | 'ca' }) {
  const isCa = edition === 'ca'
  const portfoliosHref = portfoliosPath(isCa)
  const learnHref = learnPath(isCa)
  const etfHref = usEtfHubPath(isCa)

  return (
    <article className={styles.article}>
      <header>
        <div className={styles.headerRow}>
          <span className={styles.eyebrow}>Concepts</span>
          <span className={styles.readTime}>~4 min read</span>
        </div>
        <h1 className={styles.title}>What is alpha stacking</h1>
        <p className={styles.deck}>
          An equity portfolio has one engine. Alpha stacking adds others: strategies that can earn
          when stocks are flat or falling, held alongside equity on the same capital.
        </p>
      </header>

      <section className={styles.section} aria-labelledby="s1">
        <h2 id="s1" className={styles.sectionTitle}>
          Equity plus something else
        </h2>
        <p className={styles.body}>
          Most portfolios are equity portfolios. Index funds, growth portfolios, even 60/40
          allocations are overwhelmingly driven by whether stocks go up. Bonds help in some
          downturns but move with stocks in others. In 2022, both fell together.
        </p>
        <p className={styles.body}>
          Alpha stacking keeps the equity exposure and adds return sources that earn in those
          environments. Not by reducing equity, but by holding additional strategies on the same
          capital.
        </p>
        <p className={styles.body}>
          The strategies that qualify are the ones whose returns genuinely don&apos;t depend on
          stocks going up: managed futures, which trend-follows across rates, currencies, and
          commodities; long/short equity, which earns from winners beating losers regardless of
          market direction; systematic macro, which trades rate and currency movements; merger
          arbitrage, which earns from deal spreads closing. Each earns from something equity
          doesn&apos;t.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s2">
        <h2 id="s2" className={styles.sectionTitle}>
          How the same capital holds multiple exposures
        </h2>
        <p className={styles.body}>
          Normally, adding an alternative sleeve means selling equity to make room. That trade-off
          is real: every dollar in managed futures is a dollar not in stocks. Alpha stacking avoids
          it through <strong>capital efficiency</strong>: leveraged ETFs and return-stacked funds
          use derivatives to hold more than one exposure on the same dollar of capital.
        </p>
        <p className={styles.body}>
          A fund like MATE or RSST holds roughly $1 of S&amp;P 500 exposure and $1 of managed
          futures for every $1 you invest. The cash collateral backs both sleeves via futures
          contracts. You get both exposures without choosing between them.
        </p>
        <p className={styles.body}>
          Alternatively, a leveraged equity ETF like SSO (2&times; S&amp;P 500) lets you hold half
          the dollar allocation to equity while maintaining full equity beta. That frees the other
          half for alternative sleeves without cutting equity exposure. Full equity position, plus
          genuinely independent return sources.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s3">
        <h2 id="s3" className={styles.sectionTitle}>
          Selection: why not all diversifiers qualify
        </h2>
        <p className={styles.body}>
          Diversification alone isn&apos;t the goal. Bonds are negatively correlated to stocks in
          some environments but fail in others (rising rates, stagflation). Gold reduces
          correlation but earns close to nothing in real terms over long periods. Adding these
          diversifiers reduces risk without meaningfully adding independent return.
        </p>
        <p className={styles.body}>
          Alpha stacking is more selective. Each sleeve needs a structural edge that earns
          independent of what stocks are doing:
        </p>
        <div className={styles.principles}>
          <div className={styles.principle}>
            <span className={styles.principleLabel}>Managed futures</span>
            <p className={styles.principleText}>
              Trend-following across equities, rates, currencies, and commodities. Earns when
              markets trend, which tends to happen during prolonged bear markets. In 2022, managed
              futures gained 20–30% while stocks and bonds both fell.
            </p>
          </div>
          <div className={styles.principle}>
            <span className={styles.principleLabel}>Long/short equity</span>
            <p className={styles.principleText}>
              Long positions in favored stocks, short positions in weak ones. Returns come from
              dispersion between winners and losers, which happens in bull, bear, and sideways
              markets. Direction doesn&apos;t determine outcome; stock selection does.
            </p>
          </div>
          <div className={styles.principle}>
            <span className={styles.principleLabel}>Merger arbitrage</span>
            <p className={styles.principleText}>
              Buys deal targets and hedges the acquirer. Earns when announced deals close at or
              near the agreed price. The return comes from a structural spread between announcement
              price and close price, largely independent of market direction.
            </p>
          </div>
          <div className={styles.principle}>
            <span className={styles.principleLabel}>Systematic macro</span>
            <p className={styles.principleText}>
              Positions in rates, currencies, and commodities driven by macro signals. Often earns
              during the same rate and currency moves that drive equity drawdowns, making it a
              genuine complement to the equity sleeve.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="s4">
        <h2 id="s4" className={styles.sectionTitle}>
          What the name means
        </h2>
        <p className={styles.body}>
          Alpha is return above what equity alone delivers. Stacking is running multiple sources
          of it on the same capital. You&apos;re not replacing equity, you&apos;re adding on top.
        </p>
        <p className={styles.body}>
          The difference from generic diversification is the bar for inclusion. A diversifier just
          needs low correlation. An alpha stack sleeve needs a structural reason to earn, not just
          to soften drawdowns. The goal is a portfolio that compounds in multiple environments, not
          one that dilutes equity with lower-returning assets.
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
