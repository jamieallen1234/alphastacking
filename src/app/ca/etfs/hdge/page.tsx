import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import EtfPageHubNav from '@/components/EtfPageHubNav'
import EtfChartPanel from '@/components/EtfChartPanel'
import EtfPageDisclaimers from '@/components/EtfPageDisclaimers'
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
        <EtfPageHubNav variant="ca" />
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
          <li>
            <strong>MER:</strong> 3.95%
          </li>
          <li>
            <strong>AUM:</strong> ~$105M CAD
          </li>
        </ul>

        <h2 className={styles.chartHeading}>HDGE.TO price history</h2>
        <EtfChartPanel symbol="HDGE.TO" initialPayload={initialChart} />

        <div className={styles.bodySection}>
          <h2>Strategy</h2>
          <p>
            Accelerate describes the fund as a quantitative long/short equity
            strategy that ranks liquid North American stocks and goes long the highest-ranked names while
            shorting lower-ranked names.

          </p>
          <p>
            Accelerate typically runs the portfolio near <strong>~110% gross long</strong> and{' '}
            <strong>~50% gross short</strong>, i.e. <strong>~60% net long</strong>. The{' '}
            <strong>long book</strong> is the model’s top-ranked North American stocks—alpha from owning names
            the factors score as having the strongest expected returns. The <strong>short book</strong> is the
            bottom-ranked slice: alpha when those laggards underperform, plus a partial hedge against market
            risk from the long side.
          </p>
        </div>

        <div className={styles.bodySection}>
          <h2>Manager and Issuer Pedigree</h2>
          <p>
            Accelerate is a Canadian alternative-ETF specialist without bank-tier consolidated AUM reporting;
            aggregate firm size is much smaller than major bank wealth arms. Accelerate launched HDGE in 2019
            as part of its initial alternative ETF lineup and framed the
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
          <h2>Outperformance</h2>
          <p>
            Equity long/short approaches typically do best when stock dispersion is high: strong
            winners and clear losers within sectors, factor rotations, and periods where security selection
            matters more than broad index direction. In those regimes, relative-value alpha can compound
            while net equity exposure stays muted.
          </p>
          <p>
            The richest setup is sustained <strong>two-way</strong> tape—leadership churn, sector and{' '}
            <strong>factor</strong> rotation, and wide spreads between winners and laggards—where both books
            can express <strong>alpha</strong> at once without relying on a single market direction.
          </p>
        </div>

        <div className={styles.bodySection}>
          <h2>Official ETF page</h2>
          <p>
            Read the official ETF page for current holdings, fact sheet, prospectus, fees, and fund
            characteristics:{' '}
            <a href="https://accelerateshares.com/investment-solutions/hdge/" target="_blank" rel="noopener noreferrer">
              HDGE.TO official page
            </a>
            .
          </p>
          <EtfPageDisclaimers />
        </div>
      </section>
      <Footer />
    </main>
  )
}
