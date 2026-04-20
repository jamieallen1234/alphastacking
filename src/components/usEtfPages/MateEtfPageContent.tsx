import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import EtfPageHubNav from '@/components/EtfPageHubNav'
import EtfChartPanel from '@/components/EtfChartPanel'
import EtfPageDisclaimers from '@/components/EtfPageDisclaimers'
import { getCachedMateChart } from '@/lib/getCachedEtfChart'
import type { UsEtfHubBase } from '@/lib/usEtfHubBase'
import styles from '@/app/us-etfs/mate/page.module.css'

export default async function MateEtfPageContent({ hubBase }: { hubBase: UsEtfHubBase }) {
  const mateChart = await getCachedMateChart('1y')

  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.section}>
        <EtfPageHubNav variant="us" />
        <Link href={`${hubBase}#return-stacked-ge-2x`} className={styles.back}>
          ← ETFs
        </Link>
        <span className={styles.badge}>Return Stacked - 2x</span>
        <h1 className={styles.heading}>MATE — Man Active Trend Enhanced ETF</h1>
        <p className={styles.lede}>
          MATE is return-stacked: <strong>100% S&amp;P 500</strong> notional exposure alongside{' '}
          <strong>100%</strong> trend-following <strong>managed futures</strong>—core large-cap U.S.
          equity beta plus a diversifying macro sleeve in one fund.
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
            <strong>Beta:</strong>{' '}
            {mateChart.betaVsSpy1y != null ? mateChart.betaVsSpy1y.toFixed(2) : '—'}
          </li>
          <li>
            <strong>MER:</strong> 0.97%
          </li>
          <li>
            <strong>AUM:</strong> ~$37M
          </li>
        </ul>

        <h2 className={styles.chartHeading}>MATE price history</h2>
        <EtfChartPanel symbol="MATE" initialPayload={mateChart} />

        <div className={styles.bodySection}>
          <h2>Strategy</h2>
          <p>
            Fund disclosures describe that design: <strong>100% S&amp;P 500</strong> equity exposure
            paired with <strong>100%</strong> <strong>managed futures</strong>—trend-following across
            equities, rates, currencies, and commodities via derivatives. Collateral and cash management
            typically sit in Treasuries and cash equivalents.
          </p>
          <p>
            In plain terms: full notional S&amp;P 500 equity exposure sits alongside a full notional
            managed-futures book—cash-efficient implementation, not an either/or trade-off between the two
            engines.
          </p>
        </div>

        <div className={styles.bodySection}>
          <h2>Manager and Issuer Pedigree</h2>
          <p>
            Man Group is among the world’s largest publicly traded alternatives managers — often described
            as the biggest listed hedge fund–style firm — with group assets under management of about
            $227.6 billion as at Dec. 31, 2025 (year-end results announcement). The firm runs systematic quant
            (including Man AHL and Man Numeric),
            discretionary, and multi-asset capabilities across public and private markets, with the explicit
            aim of delivering differentiated performance and risk-adjusted outcomes for clients.
          </p>
          <p>
            Alpha at Man is pursued through research-intensive, institutional-caliber processes: factor and
            trend models, portfolio construction, and execution at scale — not a single gimmick, but a
            business built to compound skill across regimes. For MATE, that backdrop matters: the
            managed-futures sleeve sits inside an organization whose core job is generating excess return
            for clients, not just packaging beta.
          </p>
        </div>

        <div className={styles.bodySection}>
          <h2>Outperformance</h2>
          <p>
            The first sleeve targets <strong>S&amp;P 500</strong> beta; incremental edge vs. that benchmark
            comes from the <strong>managed-futures</strong> stack. Trend-following tends to shine when large,
            persistent trends run across macro: directional rate cycles, commodity runs, major FX moves, or
            equity stress—environments where the second sleeve can diverge from plain large-cap beta.
          </p>
          <p>
            Man frames trend-following as historically additive in those regimes—including prolonged equity
            drawdowns—when the futures book has room to earn while the equity sleeve tracks its core exposure.
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
          <EtfPageDisclaimers />
        </div>
      </section>
      <Footer />
    </main>
  )
}
