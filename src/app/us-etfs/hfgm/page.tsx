import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import EtfPageHubNav from '@/components/EtfPageHubNav'
import EtfChartPanel from '@/components/EtfChartPanel'
import EtfPageDisclaimers from '@/components/EtfPageDisclaimers'
import { getCachedHfgmChart } from '@/lib/getCachedEtfChart'
import styles from './page.module.css'

export const metadata = {
  title: 'HFGM ETF — Alpha Stacking',
  description:
    'Unlimited HFGM Global Macro ETF (HFGM): global macro replication, Unlimited pedigree, and regime context.',
}

export default async function HfgmEtfPage() {
  const hfgmChart = await getCachedHfgmChart('1y')

  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.section}>
        <EtfPageHubNav variant="us" />
        <Link href="/us-etfs#global-macro" className={styles.back}>
          ← ETFs
        </Link>
        <span className={styles.badge}>Global macro</span>
        <h1 className={styles.heading}>HFGM — Unlimited HFGM Global Macro ETF</h1>
        <p className={styles.lede}>
          HFGM is an actively managed <strong>global macro</strong> ETF: it aims to mirror{' '}
          <strong>return characteristics</strong> of the hedge fund industry’s <strong>Global Macro</strong>{' '}
          sector (gross-of-fees style), with long and short positions in <strong>underlying ETFs</strong> and{' '}
          <strong>futures</strong>—listed <strong>alternatives</strong> exposure to macro themes.
        </p>

        <ul className={styles.meta}>
          <li>
            <strong>Ticker:</strong> HFGM
          </li>
          <li>
            <strong>Issuer:</strong> Unlimited ETFs / Unlimited Funds, Inc. (sub-adviser)
          </li>
          <li>
            <strong>Inception:</strong> April 14, 2025
          </li>
          <li>
            <strong>Beta:</strong>{' '}
            {hfgmChart.betaVsSpy1y != null ? hfgmChart.betaVsSpy1y.toFixed(2) : '—'}
          </li>
          <li>
            <strong>MER:</strong> 1.00%
          </li>
          <li>
            <strong>AUM:</strong> ~$35M
          </li>
        </ul>

        <h2 className={styles.chartHeading}>HFGM price history</h2>
        <EtfChartPanel symbol="HFGM" initialPayload={hfgmChart} />

        <div className={styles.bodySection}>
          <h2>Strategy</h2>
          <p>
            Disclosures frame the fund as targeting a portfolio whose performance characteristics resemble the{' '}
            <strong>hedge fund Global Macro</strong> sector’s recent gross returns and volatility—often with{' '}
            <strong>roughly twice</strong> the sector’s volatility budget—using roughly <strong>10–30</strong>{' '}
            long and short positions in <strong>ETFs</strong> and <strong>exchange-listed futures</strong>. It
            is <strong>not</strong> a hedge fund and does not invest in hedge funds; it implements a{' '}
            <strong>macro trading</strong> idea set in a regulated ETF wrapper with{' '}
            <strong>risk management</strong> via diversification and derivatives.
          </p>
          <p>
            That design is built for <strong>cross-asset</strong> opportunity: rates, equities, commodities,
            currencies, and related themes—where <strong>quant</strong> and discretionary macro processes
            historically hunt for <strong>alpha</strong> outside single-index beta.
          </p>
        </div>

        <div className={styles.bodySection}>
          <h2>Manager and Issuer Pedigree</h2>
          <p>
            Unlimited Funds and Unlimited ETFs are a focused liquid-alts franchise; consolidated group AUM is
            not marketed at global megabank scale—verify the latest figures on Unlimited disclosures.{' '}
            <strong>Unlimited ETFs</strong> packages hedge-industry return <strong>analytics</strong> into
            transparent ETFs—lower fees and daily liquidity versus private funds, with{' '}
            <strong>Unlimited Funds, Inc.</strong> driving sub-advised portfolio construction. The lineup sits
            in the same “democratize <strong>alternatives</strong>” lane as other <strong>liquid alts</strong>{' '}
            sponsors: research-led process, institutional <strong>execution</strong>, and ongoing oversight.
          </p>
          <p>
            For HFGM, the differentiated offer is translating <strong>sector-level</strong> Global Macro
            behavior into a diversified ETF portfolio—where <strong>research</strong> depth and{' '}
            <strong>execution</strong> quality matter as much as any single trade idea.
          </p>
        </div>

        <div className={styles.bodySection}>
          <h2>Outperformance</h2>
          <p>
            <strong>Global macro</strong> sleeves tend to add most when <strong>macro regimes</strong> shift
            clearly—<strong>rates</strong> repricing, <strong>FX</strong> breakouts, commodity cycles, or policy
            shocks—creating dispersion across countries and asset classes.
          </p>
          <p>
            The richest stretches are often multi-quarter <strong>trends</strong> and{' '}
            <strong>cross-market</strong> stress: environments where macro traders earn from directional and
            relative trades rather than passive equity beta alone.
          </p>
        </div>

        <div className={styles.bodySection}>
          <h2>Official ETF page</h2>
          <p>
            Read the official ETF page for holdings, performance, prospectus, and documents:{' '}
            <a href="https://unlimitedetfs.com/hfgm/" target="_blank" rel="noopener noreferrer">
              HFGM official page
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
