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
          <span className={styles.readTime}>~3 min read</span>
        </div>
        <h1 className={styles.title}>What is alpha stacking</h1>
        <p className={styles.deck}>
          Most portfolios lean on equity for the bulk of long-run return. Alpha stacking adds other
          return sources: strategies that can earn when stocks are flat or falling, held alongside
          equity on the same capital.
        </p>
      </header>

      <section className={styles.section} aria-labelledby="s1">
        <h2 id="s1" className={styles.sectionTitle}>
          Equity sleeve + Alpha sleeve
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
          Definitions
        </h2>
        <dl className={styles.defChart} aria-label="Key terms">
          <div className={styles.defRow}>
            <dt className={styles.defTerm}>Alpha</dt>
            <dd className={styles.defDesc}>
              Return above what equity beta alone explains over a stretch of time. Here it means
              sleeves whose payoff does not come from owning more of the same index.
            </dd>
          </div>
          <div className={styles.defRow}>
            <dt className={styles.defTerm}>Stacking</dt>
            <dd className={styles.defDesc}>
              Running more than one sleeve on the same dollar of capital (leverage or return-stacked
              funds), instead of selling equity to fund an alternative. The second sleeve is often a
              diversifier relative to equity.
            </dd>
          </div>
          <div className={styles.defRow}>
            <dt className={styles.defTerm}>Alpha stacking</dt>
            <dd className={styles.defDesc}>
              Equity sleeve plus one or more alpha sleeves, sized together. You keep full equity
              exposure and add sources that can earn when stocks are flat or down.
            </dd>
          </div>
          <div className={styles.defRow}>
            <dt className={styles.defTerm}>Alpha sleeve</dt>
            <dd className={styles.defDesc}>
              A sleeve with a structural edge (trend, dispersion, macro, deal spreads, and similar)
              that can pay when direction or risk appetite is not helping plain equity.
            </dd>
          </div>
          <div className={styles.defRow}>
            <dt className={styles.defTerm}>Diversifier</dt>
            <dd className={styles.defDesc}>
              Often added for lower correlation or smoother rides. Useful, but not the same bar as an
              alpha sleeve, which needs a clear path to earn on its own, not only to dilute risk.
            </dd>
          </div>
        </dl>
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
