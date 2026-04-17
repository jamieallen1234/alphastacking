import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import EtfPageHubNav from '@/components/EtfPageHubNav'
import EtfChartPanel from '@/components/EtfChartPanel'
import EtfPageDisclaimers from '@/components/EtfPageDisclaimers'
import { getCachedArbChart } from '@/lib/getCachedEtfChart'
import styles from './page.module.css'

export const metadata = {
  title: 'ARB.TO ETF — Alpha Stacking',
  description:
    'Accelerate Arbitrage Fund (ARB.TO): merger arbitrage strategy, Accelerate pedigree, and deal-market context.',
}

export default async function ArbEtfPage() {
  const arbChart = await getCachedArbChart('1y')

  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.section}>
        <EtfPageHubNav variant="ca" />
        <Link href="/ca/etfs#arbitrage" className={styles.back}>
          ← ETFs
        </Link>
        <span className={styles.badge}>Arbitrage</span>
        <h1 className={styles.heading}>ARB.TO — Accelerate Arbitrage Fund</h1>
        <p className={styles.lede}>
          ARB.TO is Accelerate’s <strong>merger arbitrage</strong> ETF: it seeks{' '}
          <strong>income</strong> and <strong>capital appreciation</strong> by owning securities of{' '}
          <strong>deal targets</strong> and, where applicable, hedging with acquirer or related shorts—classic{' '}
          <strong>event-driven</strong>, <strong>low-volatility</strong> <strong>alternatives</strong> exposure.
        </p>

        <ul className={styles.meta}>
          <li>
            <strong>Ticker:</strong> ARB
          </li>
          <li>
            <strong>Manager:</strong> Accelerate Financial Technologies Inc.
          </li>
          <li>
            <strong>Inception:</strong> April 7, 2020
          </li>
          <li>
            <strong>Structure:</strong> Alternative ETF (merger / SPAC arbitrage)
          </li>
          <li>
            <strong>Beta:</strong>{' '}
            {arbChart.betaVsSpy1y != null ? arbChart.betaVsSpy1y.toFixed(2) : '—'}
          </li>
          <li>
            <strong>MER:</strong> 1.0%
          </li>
          <li>
            <strong>AUM:</strong> ~$195M CAD
          </li>
        </ul>

        <h2 className={styles.chartHeading}>ARB.TO price history</h2>
        <EtfChartPanel symbol="ARB.TO" initialPayload={arbChart} />

        <div className={styles.bodySection}>
          <h2>Strategy</h2>
          <p>
            The fund invests in listed <strong>equity</strong>, <strong>debt</strong>, and derivative
            securities tied to <strong>announced mergers</strong>, <strong>SPACs</strong>, and corporate
            actions—capturing the <strong>merger risk premium</strong> (spread to deal consideration) while using{' '}
            <strong>shorts</strong> on acquirers or related names when that hedges deal risk. The process is{' '}
            <strong>security-selection</strong>-heavy and <strong>risk-managed</strong> around closing
            probability, timing, and financing.
          </p>
          <p>
            Benchmarking language in fund materials often references <strong>merger arbitrage</strong> indices;
            the economic engine is <strong>deal spreads</strong> and <strong>event</strong> completion—not
            broad equity <strong>beta</strong>.
          </p>
        </div>

        <div className={styles.bodySection}>
          <h2>Manager and Issuer Pedigree</h2>
          <p>
            Accelerate does not publish consolidated AUM comparable to national banks; firm-wide scale is
            modest versus major bank asset-management divisions.{' '}
            <strong>Accelerate</strong> is the same sponsor behind other Canadian <strong>alternative</strong>{' '}
            ETFs (including long/short and arbitrage-style mandates): the firm’s positioning is bringing{' '}
            <strong>hedge-fund-like</strong> strategies into exchange-traded, investor-accessible formats with
            transparent fees and governance.
          </p>
          <p>
            For arbitrage, edge comes from <strong>deal sourcing</strong>, legal and regulatory diligence,
            and disciplined portfolio <strong>risk management</strong>—the same institutional skill set as
            standalone merger-arb desks, packaged for ETF investors.
          </p>
        </div>

        <div className={styles.bodySection}>
          <h2>Outperformance</h2>
          <p>
            <strong>Merger arbitrage</strong> typically earns best when <strong>deal calendars</strong> are
            busy and <strong>spreads</strong> are wide enough to compensate for break risk—friendly credit,
            clear regulatory paths, and acquirer financing that holds.
          </p>
          <p>
            The richest environments are sustained <strong>M&amp;A</strong> cycles with many concurrent
            transactions: more opportunities to diversify idiosyncratic deal risk while harvesting{' '}
            <strong>event</strong> <strong>alpha</strong> from announced transactions.
          </p>
        </div>

        <div className={styles.bodySection}>
          <h2>Official ETF page</h2>
          <p>
            Read the official ETF page for holdings, fact sheet, prospectus, and documents:{' '}
            <a
              href="https://accelerateshares.com/investment-solutions/arb/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ARB.TO official page
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
