import Link from 'next/link'
import { portfoliosPath, learnPath, usEtfHubPath } from '@/lib/siteRegion'
import { WHY_ALPHA_STACKING_SLUG, learnArticlePath } from '@/lib/learnArticles'
import styles from './LearnArticle.module.css'

export default function ReturnStackingExplainedArticle({ edition }: { edition: 'us' | 'ca' }) {
  const isCa = edition === 'ca'
  const portfoliosHref = portfoliosPath(isCa)
  const learnHref = learnPath(isCa)
  const etfHref = usEtfHubPath(isCa)
  const rsstHref = isCa ? '/ca/us-etfs/rsst' : '/us-etfs/rsst'
  const rssbHref = isCa ? '/ca/us-etfs/rssb' : '/us-etfs/rssb'
  const ntsxHref = isCa ? '/ca/us-etfs/ntsx' : '/us-etfs/ntsx'
  const alphaComparisonHref = learnArticlePath(isCa, WHY_ALPHA_STACKING_SLUG)

  return (
    <article className={styles.article}>
      <header>
        <div className={styles.headerRow}>
          <span className={styles.eyebrow}>Concepts</span>
          <span className={styles.readTime}>~5 min read</span>
        </div>
        <h1 className={styles.title}>What is return stacking?</h1>
        <p className={styles.deck}>
          Return stacking puts two investment exposures on the same dollar. Alpha stacking uses that
          capital-efficiency tool to build beyond one overlay, with several return sources that must
          justify their place in the portfolio.
        </p>
      </header>

      <section className={styles.section} aria-labelledby="s1">
        <h2 id="s1" className={styles.sectionTitle}>
          Return stacking in one sentence
        </h2>
        <p className={styles.body}>
          Return stacking uses leverage to layer a second investment return on top of a core
          allocation, so one dollar of capital supports more than one dollar of market exposure.
          Instead of selling stocks to make room for a diversifier, an investor can keep the stock
          exposure and add the diversifier through a capital-efficient fund.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s2">
        <h2 id="s2" className={styles.sectionTitle}>
          How return stacked ETFs work
        </h2>
        <p className={styles.body}>
          A return stacked ETF commonly uses futures, swaps, and cash collateral to create its
          exposures. The fund may target $1 of stock exposure and $1 of managed-futures exposure for
          every $1 invested. You own one fund, but its economic exposure is closer to two sleeves
          than one.
        </p>
        <p className={styles.body}>
          The futures contracts need only a fraction of their notional value as collateral. That is
          what makes the structure capital efficient. It also means the fund has financing, roll,
          trading, and management costs that a plain unlevered index fund does not have.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s3">
        <h2 id="s3" className={styles.sectionTitle}>
          Common return stacking structures
        </h2>
        <p className={styles.body}>
          <strong>100/100 funds</strong> target a full core sleeve plus a full second sleeve. For
          example, <Link href={rsstHref} className={styles.inlineLink}>RSST</Link> combines U.S.
          stocks with managed futures, while <Link href={rssbHref} className={styles.inlineLink}>RSSB</Link>{' '}
          combines global stocks with bonds. The extra sleeve is meaningful, but so are its costs and
          risks.
        </p>
        <p className={styles.body}>
          <strong>Lower-ratio funds</strong> use less leverage. <Link href={ntsxHref} className={styles.inlineLink}>NTSX</Link>{' '}
          targets roughly 90% U.S. equities with a 60% Treasury futures sleeve. A lower ratio reduces
          the size of the overlay, which can reduce both its benefit and its drag.
        </p>
        <p className={styles.body}>
          <strong>Do-it-yourself stacks</strong> combine separate funds, such as a leveraged equity
          ETF and a managed-futures ETF. This gives the investor control over weights, but it also
          requires tracking total equity exposure, rebalancing, taxes, and the distinct risks of each
          fund. It is not automatically equivalent to a single return stacked ETF.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s4">
        <h2 id="s4" className={styles.sectionTitle}>
          What return stacking costs
        </h2>
        <p className={styles.body}>
          The overlay has to earn more than its all-in drag. That can include the fund expense ratio,
          futures roll and transaction costs, and the financing embedded in the derivative position.
          When short-term rates are high, the hurdle for a stacked sleeve can be higher than investors
          expect.
        </p>
        <p className={styles.body}>
          A simple hypothetical makes the point. If a $10,000 portfolio carries a 100% overlay and
          that sleeve loses 3% after its costs, it subtracts roughly $300 in addition to the core
          portfolio&apos;s result. The core may still be positive, but the stacked portfolio can lag it.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s5">
        <h2 id="s5" className={styles.sectionTitle}>
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

      <section className={styles.section} aria-labelledby="s6">
        <h2 id="s6" className={styles.sectionTitle}>
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
        <p className={styles.body}>
          <Link href={alphaComparisonHref} className={styles.inlineLink}>
            Compare return stacking and alpha stacking
          </Link>{' '}
          to see how that distinction changes portfolio construction.
        </p>
      </section>

      <div className={styles.ctaRow}>
        <Link href={portfoliosHref} className={styles.cta}>
          Browse model portfolios →
        </Link>
        <Link href={etfHref} className={styles.cta}>
          Explore return stacking ETFs →
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
