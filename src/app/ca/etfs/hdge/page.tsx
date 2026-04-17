import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import EtfChartPanel from '@/components/EtfChartPanel'
import { getCachedHdgeChart } from '@/lib/getCachedEtfChart'
import styles from './page.module.css'

export const metadata = {
  title: 'HDGE.TO ETF — Alpha Stacking',
  description:
    'Accelerate Absolute Return Fund (HDGE.TO): strategy, manager background, and long/short market regime context.',
}

export default async function HdgeEtfPage() {
  const initialChart = await getCachedHdgeChart('1y')

  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.section}>
        <Link href="/ca/etfs#long-short" className={styles.back}>
          ← ETFs
        </Link>
        <span className={styles.badge}>Long/short</span>
        <h1 className={styles.heading}>HDGE.TO — Accelerate Absolute Return Fund</h1>
        <p className={styles.lede}>
          HDGE.TO is positioned as a quantitative long/short North American equity strategy, designed to
          seek positive, risk-adjusted returns with low correlation to broad equity markets.
        </p>

        <ul className={styles.meta}>
          <li>
            <strong>Ticker:</strong> HDGE / HDGE.U
          </li>
          <li>
            <strong>Manager:</strong> Accelerate Financial Technologies Inc.
          </li>
          <li>
            <strong>Inception:</strong> May 10, 2019
          </li>
          <li>
            <strong>Structure:</strong> Alternative ETF (long/short equity)
          </li>
          <li>
            <strong>Beta:</strong> 0.18*
          </li>
        </ul>

        <h2 className={styles.chartHeading}>HDGE.TO price history</h2>
        <EtfChartPanel symbol="HDGE.TO" initialPayload={initialChart} />

        <div className={styles.bodySection}>
          <h2>Strategy check: current long/short exposure</h2>
          <p>
            On the official HDGE page, Accelerate describes the fund as a quantitative long/short equity
            strategy that ranks liquid North American stocks and goes long the highest-ranked names while
            shorting lower-ranked names. The page clearly confirms long/short implementation across U.S.
            and Canadian opportunity sets.
          </p>
          <p>
            I did not find public wording on that page that promises constant fixed notional targets at all
            times. In the latest issuer snapshot (2026-Mar-31), published sector
            weights sum to roughly <strong>109.8% long</strong> and <strong>-46.2% short</strong>, which
            confirms the book can move materially based on positioning.
          </p>
        </div>

        <div className={styles.bodySection}>
          <h2>Manager history and hedge-fund pedigree</h2>
          <p>
            Accelerate launched HDGE in 2019 as part of its initial alternative ETF lineup and framed the
            firm’s mission as bringing hedge-fund and private-equity-like strategies into lower-cost,
            exchange-traded wrappers. The firm’s positioning consistently emphasizes alternative,
            performance-oriented strategies and long/short risk management.
          </p>
          <p>
            In short: the ETF wrapper is public-market convenient, but the playbook is hedge-fund style —
            factor ranking, shorting, and portfolio construction around risk-adjusted returns.
          </p>
        </div>

        <div className={styles.bodySection}>
          <h2>When market-neutral long/short can outperform SPY</h2>
          <p>
            Market-neutral long/short approaches typically do best when stock dispersion is high: strong
            winners and clear losers within sectors, factor rotations, and periods where security selection
            matters more than broad index direction. In those regimes, relative-value alpha can compound
            while net equity exposure stays muted.
          </p>
          <p>
            They often lag during narrow, momentum-driven index rallies where beta dominates and short
            books work against returns. Said differently: long/short tends to win in messy, two-way stock
            markets and lose relative ground in one-way beta melt-ups.
          </p>
        </div>

        <div className={styles.bodySection}>
          <h2>Official ETF page</h2>
          <p>
            For current holdings, fact sheet, prospectus, fees, and published fund characteristics, use the
            issuer page:{' '}
            <a href="https://accelerateshares.com/investment-solutions/hdge/" target="_blank" rel="noopener noreferrer">
              HDGE official page
            </a>
            .
          </p>
          <p className={styles.smallNote}>* Beta is estimated.</p>
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
