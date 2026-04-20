import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ComparisonChartCard from '@/components/ComparisonChartCard'
import type { StrategyCompareSlot } from '@/lib/loadStrategyCompareCharts'
import styles from './StrategiesCompareMain.module.css'

export interface StrategiesCompareMainProps {
  variant: 'us' | 'ca'
  homeHref: string
  charts: {
    returnStacking: StrategyCompareSlot[]
    allWeather: StrategyCompareSlot[]
    managedFutures: StrategyCompareSlot[]
    traditional6040: StrategyCompareSlot[]
    btalTail: StrategyCompareSlot[]
  }
  chartRangeLabel: string
}

export default function StrategiesCompareMain({
  variant,
  homeHref,
  charts,
  chartRangeLabel,
}: StrategiesCompareMainProps) {
  return (
    <main className={styles.main}>
      <Nav />
      <article className={styles.article}>
        <Link href={homeHref} className={styles.back}>
          ← Home
        </Link>
        <p className={styles.kicker}>Comparison</p>
        <h1 className={styles.title}>Alpha stacking vs return stacking and other common approaches</h1>
        <p className={styles.lede}>
          Return stacks, risk-parity funds, managed-futures ETFs, and classic 60/40 mixes usually optimize for diversification
          or drawdowns—not for beating U.S. large cap in a straight total-return race. When the S&amp;P
          500 leads for years, that shows up as <strong>trailing SPY</strong>. Every chart uses the same{' '}
          {chartRangeLabel} window and <strong>total return</strong> (Yahoo adjusted close—dividends and splits
          per Yahoo).
        </p>

        <section className={styles.section} aria-labelledby="h-return-stacking">
          <h2 id="h-return-stacking" className={styles.sectionTitle}>
            Return-stacked &amp; WisdomTree efficient core vs SPY
          </h2>
          <p className={styles.prose}>
            Return Stacked® funds layer sleeves on U.S. equity beta; WisdomTree <strong>Efficient Core</strong>{' '}
            (NTSX, NTSI, NTSE) does the same idea with futures overlays across U.S., developed international,
            and emerging markets—more exposure per dollar than cash-only indexing. They can still{' '}
            <strong>trail SPY</strong> when the stacked leg or non-U.S. sleeves lag after fees. This page
            skips tickers like GDE that often beat SPY over the same window; trust the excess-return line
            on each chart—any name can lead in a lucky span.
          </p>
          <div className={styles.chartGrid}>
            {charts.returnStacking.map((s) => (
              <ComparisonChartCard key={s.id} slot={s} />
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="h-all-weather">
          <h2 id="h-all-weather" className={styles.sectionTitle}>
            All-weather-style funds vs SPY
          </h2>
          <p className={styles.prose}>
            Risk-parity and multi-asset allocation ETFs deliberately dilute pure equity beta with bonds,
            commodities, or volatility overlays. That insurance tends to drag in a one-line total-return
            race against the S&amp;P 500 when stocks outperform other sleeves.
          </p>
          <p className={styles.proseMuted}>
            <strong>RPAR</strong> is a liquid risk-parity ETF; <strong>ALLW</strong> is an all-weather–style
            multi-asset allocation fund—read the prospectus for sleeves and rebalance rules.
          </p>
          <div className={styles.chartGrid}>
            {charts.allWeather.map((s) => (
              <ComparisonChartCard key={s.id} slot={s} />
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="h-managed-futures">
          <h2 id="h-managed-futures" className={styles.sectionTitle}>
            Managed futures vs SPY
          </h2>
          <p className={styles.prose}>
            Listed managed-futures ETFs aim for trend and macro premia with low correlation to equities—but
            they still compete with SPY on a one-line total-return chart. In long U.S. equity rallies, fee
            drag and whipsaw can leave them behind the S&amp;P 500 even when they add value as a diversifier.
          </p>
          <p className={styles.proseMuted}>
            <strong>DBMF</strong> tracks a CTA-style managed-futures index; <strong>KMLM</strong> follows the
            KFA Mount Lucas index—read each prospectus for methodology and risks.
          </p>
          <div className={styles.chartGrid}>
            {charts.managedFutures.map((s) => (
              <ComparisonChartCard key={s.id} slot={s} />
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="h-6040">
          <h2 id="h-6040" className={styles.sectionTitle}>
            Traditional 60/40 vs SPY
          </h2>
          <p className={styles.prose}>
            A textbook U.S. 60/40 (broad stocks + core bonds) is a liability-matching and drawdown
            anchor—not an alpha engine. When rates are volatile or bonds deliver coupons while equities
            sprint, the blend frequently underperforms 100% equities in total return over the same
            calendar span.
          </p>
          <div className={styles.chartGrid}>
            {charts.traditional6040.map((s) => (
              <ComparisonChartCard key={s.id} slot={s} />
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="h-btal-tail">
          <h2 id="h-btal-tail" className={styles.sectionTitle}>
            Anti-beta &amp; tail risk vs SPY
          </h2>
          <p className={styles.prose}>
            <strong>BTAL</strong> targets a market-neutral anti-beta profile (long lower-beta stocks, short
            higher-beta stocks)—a diversifier for equity factor risk, not a bet to beat the S&amp;P 500 in a
            grinding bull. <strong>TAIL</strong> blends Treasuries with deep out-of-the-money puts for crash
            convexity; in calm, upward tape that structure often bleeds carry and lags SPY on headline return.
          </p>
          <div className={styles.chartGrid}>
            {charts.btalTail.map((s) => (
              <ComparisonChartCard key={s.id} slot={s} />
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="h-why">
          <h2 id="h-why" className={styles.sectionTitle}>
            Why those approaches differ from alpha stacking
          </h2>
          <p className={styles.prose}>
            What you saw above is mostly <strong>beta packaging</strong>: rebalance risk, stack diversifiers,
            or split stocks and bonds. Fine for many goals—rarely the same thing as stacking persistent{' '}
            <em>excess</em> return over equities. When fees and non-equity sleeves lag, SPY wins the headline
            number.
          </p>
          <p className={styles.prose}>
            <strong>Alpha stacking</strong> is different: combine the strongest elements of proven sleeves—managed
            futures, long/short, macro, factor premia—<em>synergistically</em> on a core so the book can aim to
            outperform in bull, bear, and choppy markets, not only when one equity factor is winning.
            Capital efficiency makes room for those sleeves next to the core; complexity, fees, and model
            risk come with the package.
          </p>
          <p className={styles.proseMuted}>
            Not investment advice. Read each chart’s excess vs SPY, drawdowns, and the prospectus before you
            allocate.
          </p>
        </section>

        <p className="legalFooterCopy">
          {variant === 'ca'
            ? 'Canadian visitors: U.S.-listed products may have tax and currency implications.'
            : 'U.S. visitors: consider tax status, margin costs, and suitability before using leveraged or alternative sleeves.'}
        </p>
      </article>
      <Footer />
    </main>
  )
}
