import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import EtfChartPanel from '@/components/EtfChartPanel'
import { getCachedMateChart } from '@/lib/getCachedEtfChart'
import styles from './page.module.css'

export const metadata = {
  title: 'MATE ETF — Alpha Stacking',
  description:
    'Man Active Trend Enhanced ETF (MATE): structure, manager history, and managed-futures context.',
}

export default async function MateEtfPage() {
  const mateChart = await getCachedMateChart('1y')

  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.section}>
        <Link href="/us-etfs#return-stacked" className={styles.back}>
          ← ETFs
        </Link>
        <span className={styles.badge}>Return stacked</span>
        <h1 className={styles.heading}>MATE — Man Active Trend Enhanced ETF</h1>
        <p className={styles.lede}>
          MATE targets capital growth by layering U.S. equity beta with trend-following managed futures.
          It is built to keep core equity participation while adding a diversifying, rules-based alpha
          sleeve.
        </p>

        <ul className={styles.meta}>
          <li>
            <strong>Ticker:</strong> MATE
          </li>
          <li>
            <strong>Issuer:</strong> Man ETF Series Trust / Man Group
          </li>
          <li>
            <strong>Inception:</strong> Dec 16, 2025
          </li>
          <li>
            <strong>Expense ratio:</strong> 0.97%
          </li>
          <li>
            <strong>Beta:</strong>{' '}
            {mateChart.betaVsSpy1y != null ? mateChart.betaVsSpy1y.toFixed(2) : '—'}
          </li>
        </ul>

        <h2 className={styles.chartHeading}>MATE price history</h2>
        <EtfChartPanel symbol="MATE" initialPayload={mateChart} />

        <div className={styles.bodySection}>
          <h2>How the stack works</h2>
          <p>
            In the fund disclosures, Man describes a two-engine design: an equity strategy plus a
            trend-following strategy. The trend sleeve uses derivatives across equities, rates,
            currencies, and commodities, while collateral and cash management sit in
            Treasuries/cash equivalents.
          </p>
          <p>
            In plain terms: instead of replacing S&amp;P 500 exposure, MATE layers managed futures on top
            through cash-efficient instruments.
          </p>
        </div>

        <div className={styles.bodySection}>
          <h2>Manager history before this ETF</h2>
          <p>
            Man Group’s roots go back to 1783. Its systematic unit, Man AHL, was founded in 1987 as a
            CTA, with Man taking a majority stake in 1989 and full ownership in 1994. On Man’s own
            history pages, AHL is presented as one of the longest-running systematic managers and a
            platform that expanded from trend-following into broader quantitative strategies over time.
          </p>
          <p>
            That matters for MATE: while the ETF itself is new, the managed-futures process comes from a
            long-running systematic research/trading organization.
          </p>
        </div>

        <div className={styles.bodySection}>
          <h2>When managed futures tend to outperform SPY</h2>
          <p>
            Managed futures strategies are generally trend-following. They tend to shine when large,
            persistent trends develop across macro markets: sustained equity selloffs, directional rate
            cycles, prolonged commodity moves, or major FX trends. Those are often the same periods when
            long-only equity beta is under stress.
          </p>
          <p>
            On the issuer page, Man explicitly frames trend-following as historically effective during
            prolonged equity drawdowns (with reference to the Barclay BTOP50 index). In range-bound,
            choppy markets with rapid reversals, trend systems can lag as signals whipsaw.
          </p>
        </div>

        <div className={styles.bodySection}>
          <h2>Official ETF page</h2>
          <p>
            Read the official ETF page for current NAV, premium/discount, holdings, and documents:{' '}
            <a
              href="https://www.man.com/products/man-active-trend-enhanced-etf"
              target="_blank"
              rel="noopener noreferrer"
            >
              MATE official page
            </a>
            .
          </p>
          <p className={styles.smallNote}>
            Educational content only; not investment advice. Past performance does not guarantee future
            results.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  )
}
