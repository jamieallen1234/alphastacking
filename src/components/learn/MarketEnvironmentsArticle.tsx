import Link from 'next/link'
import { portfolioBuilderPath, learnPath } from '@/lib/siteRegion'
import EnvironmentChart from '@/components/EnvironmentChart'
import styles from './LearnArticle.module.css'

interface Props {
  edition: 'us' | 'ca'
  timestamps: number[]
  values: number[]
}

export default function MarketEnvironmentsArticle({ edition, timestamps, values }: Props) {
  const isCa = edition === 'ca'
  const builderHref = portfolioBuilderPath(isCa)
  const learnHref = learnPath(isCa)

  return (
    <article className={styles.article}>
      <header>
        <div className={styles.headerRow}>
          <span className={styles.eyebrow}>Concepts</span>
          <span className={styles.readTime}>~5 min read</span>
        </div>
        <h1 className={styles.title}>Five market environments</h1>
        <p className={styles.deck}>
          What growth, inflation, recession, deflation, and choppy markets look like on a chart, and
          why a portfolio that only thrives in one of them is a fragile portfolio.
        </p>
      </header>

      <section className={styles.section} aria-labelledby="s1">
        <h2 id="s1" className={styles.sectionTitle}>
          What a market environment is
        </h2>
        <p className={styles.body}>
          A market environment is a macro regime: a stretch of months or years where one dominant
          force shapes what earns and what loses. Equities rising on strong GDP growth is a
          different game than equities falling as central banks crush inflation, which is different
          again from a credit freeze, a commodity collapse, or a directionless tape with no macro
          trend at all.
        </p>
        <p className={styles.body}>
          The chart below shows SPY (normalized to $10,000) from 2000 to today, colored by
          environment. Hover over any point to see the date, price, and which environment was
          active. A 3-month minimum is applied: shorter blips are absorbed into the surrounding
          period.
        </p>

        <EnvironmentChart timestamps={timestamps} values={values} height={220} />
      </section>

      <section className={styles.section} aria-labelledby="s2">
        <h2 id="s2" className={styles.sectionTitle}>
          The five environments
        </h2>

        <div className={styles.principles}>
          <div className={styles.principle}>
            <span className={styles.principleLabel} style={{ color: '#5dca8a' }}>Growth</span>
            <p className={styles.principleText}>
              GDP is expanding, earnings are rising, and central banks are broadly accommodative or
              neutral. Equities trend up, credit spreads tighten, and a plain index fund does well.
              This is the default state for much of the post-1982 era. The failure mode: growth
              environments end. Portfolios that are all-equity have no cushion when the environment
              shifts, and the shift is never announced in advance.
            </p>
          </div>

          <div className={styles.principle}>
            <span className={styles.principleLabel} style={{ color: '#e8944a' }}>Inflation</span>
            <p className={styles.principleText}>
              Prices are rising faster than central banks want. Real returns on cash and nominal
              bonds are eroding. Commodities, real assets, and trend-following strategies tend to
              win. Equities can still rise in mild inflation but struggle once tightening bites.
              The 2021 to mid-2022 surge is the clearest recent example: CPI reached 9%, oil went
              from $50 to $130, and a standard 60/40 portfolio had its worst year in decades. The
              failure mode: inflation that turns into a recession (stagflation) hits everything.
            </p>
          </div>

          <div className={styles.principle}>
            <span className={styles.principleLabel} style={{ color: '#e24b4a' }}>Recession</span>
            <p className={styles.principleText}>
              Economic output is contracting, unemployment is rising, and credit is tightening.
              Equities fall sharply; bonds (especially government bonds) often outperform as
              investors seek safety and central banks cut rates. The GFC from September 2008 to
              June 2009 cut SPY in half in nine months. COVID in early 2020 did roughly the same
              in ten weeks. The failure mode: recessions that turn deflationary (like the GFC)
              are especially destructive for leveraged and risk assets.
            </p>
          </div>

          <div className={styles.principle}>
            <span className={styles.principleLabel} style={{ color: '#85b7eb' }}>Deflation</span>
            <p className={styles.principleText}>
              Prices are falling or expected to fall. Cash and long-duration Treasuries are the
              winners because a dollar tomorrow buys more than a dollar today. The 2014 to early
              2016 period is a clean example: oil crashed from $100 to $28, commodities broadly
              collapsed, and the threat of sustained price deflation pushed long-bond yields to
              multi-decade lows. The failure mode: a deflation scare that reverts quickly leaves
              duration holders exposed to a sharp yield spike.
            </p>
          </div>

          <div className={styles.principle}>
            <span className={styles.principleLabel} style={{ color: '#c9a84c' }}>Sideways Chop</span>
            <p className={styles.principleText}>
              No macro theme is in control. Markets churn between support and resistance, news
              flow reverses trends before they establish, and momentum strategies get whipsawed.
              Q4 2018 is a compact example: the Fed raised rates into slowing growth, trade
              tensions spiked, and SPY dropped 20% in a quarter then snapped back just as fast.
              Long/short equity strategies that can go both directions tend to hold up better here
              than pure trend-followers. The failure mode: what looks choppy can transition into
              a real bear market without warning.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="s3">
        <h2 id="s3" className={styles.sectionTitle}>
          Why all five matter
        </h2>
        <p className={styles.body}>
          A total-market index fund is the right default for most people. It captures growth
          environments well and historically recovers from recessions and deflation over long enough
          horizons. The tradeoff is that it has no independent return source for inflation or
          choppy periods, and the recovery timeline after a severe drawdown can be a decade or
          longer.
        </p>
        <p className={styles.body}>
          Alpha stacking adds return sources that are designed to earn in the environments where
          equities struggle. Managed futures capture trends in any market. Gold and commodity
          overlays buffer inflation. Long-duration bonds perform in recessions and deflation.
          Long/short equity earns in choppy tapes. The goal is a portfolio that has something
          working in every column of the table above, not just the growth column.
        </p>
        <p className={styles.body}>
          The portfolio score on each model portfolio penalizes short track records partly because
          of this: a portfolio that has only been live during a growth environment has no data on
          how it handles the other four. A score built on one environment is a weak signal.
        </p>
      </section>

      <div className={styles.ctaRow}>
        <Link href={builderHref} className={styles.cta}>
          Try the portfolio builder →
        </Link>
      </div>

      <Link href={learnHref} className={styles.back}>
        ← All Learn articles
      </Link>

      <p className={styles.legal}>
        Educational content only; not investment advice, not a recommendation to buy or sell any
        security. Past performance does not guarantee future results. Leveraged and alternative
        funds involve substantial risk. Market environment classifications are illustrative and
        based on dominant macro conditions during each period; reasonable analysts may define
        environment boundaries differently.
      </p>
    </article>
  )
}
