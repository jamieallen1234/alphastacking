import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import EtfPageHubNav from '@/components/EtfPageHubNav'
import EtfChartPanel from '@/components/EtfChartPanel'
import EtfPageDisclaimers from '@/components/EtfPageDisclaimers'
import { getCachedRssyChart } from '@/lib/getCachedEtfChart'
import styles from './page.module.css'

export const metadata = {
  title: 'RSSY ETF — Alpha Stacking',
  description:
    'Return Stacked U.S. Stocks & Futures Yield ETF (RSSY): equity stack, futures yield sleeve, and manager context.',
}

export default async function RssyEtfPage() {
  const rssyChart = await getCachedRssyChart('1y')

  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.section}>
        <EtfPageHubNav variant="us" />
        <Link href="/us-etfs#return-stacked-ge-2x" className={styles.back}>
          ← ETFs
        </Link>
        <span className={styles.badge}>Return Stacked - 2x</span>
        <h1 className={styles.heading}>RSSY — Return Stacked U.S. Stocks & Futures Yield ETF</h1>
        <p className={styles.lede}>
          RSSY targets roughly dollar-for-dollar large-cap U.S. equity exposure alongside a parallel{' '}
          <strong>futures yield</strong> sleeve—systematic <strong>carry</strong> harvested long and short
          across global futures, <strong>daily</strong> rebalanced for capital-efficient stacking beyond pure
          beta.
        </p>

        <ul className={styles.meta}>
          <li>
            <strong>Ticker:</strong> RSSY
          </li>
          <li>
            <strong>Issuer:</strong> Tidal Trust II / Tidal Investments LLC (adviser)
          </li>
          <li>
            <strong>Inception:</strong> May 28, 2024
          </li>
          <li>
            <strong>Beta:</strong>{' '}
            {rssyChart.betaVsSpy1y != null ? rssyChart.betaVsSpy1y.toFixed(2) : '—'}
          </li>
          <li>
            <strong>MER:</strong> 0.98%
          </li>
          <li>
            <strong>AUM:</strong> ~$96M
          </li>
        </ul>

        <h2 className={styles.chartHeading}>RSSY price history</h2>
        <EtfChartPanel symbol="RSSY" initialPayload={rssyChart} />

        <div className={styles.bodySection}>
          <h2>Strategy</h2>
          <p>
            The fund applies the Return Stacked® blueprint: seek roughly <strong>100% notional</strong>{' '}
            large-cap U.S. equity—via ETFs such as <strong>IVV</strong>, U.S. equity index futures, or
            combinations—and roughly <strong>100% notional</strong> to a <strong>quantitative futures yield</strong>{' '}
            program. That second sleeve goes long and short futures across commodities, rates, currencies, and
            equity indices to target the <strong>yield</strong> component of futures—<strong>roll</strong>{' '}
            dynamics and curve positioning—not only directional price moves. The portfolio <strong>rebalances daily</strong>; leverage through
            derivatives amplifies both upside and downside—prospectus language stresses leverage and turnover
            risk.
          </p>
          <p>
            Stacking two engines aims for <strong>risk-adjusted</strong> diversification: sponsor materials
            highlight historically <strong>low average correlation</strong> of the yield sleeve to stocks and
            bonds—not a guarantee, but the economic pitch beside core equity beta.
          </p>
        </div>

        <div className={styles.bodySection}>
          <h2>Manager and Issuer Pedigree</h2>
          <p>
            Tidal and the Return Stacked® franchise sit on a multi-ETF platform that is far smaller than
            top-tier index complexes; consolidated sponsor AUM is not published at iShares/Vanguard scale
            (see Tidal and Return Stacked disclosures).{' '}
            <strong>Tidal Investments LLC</strong> serves as investment adviser;{' '}
            <strong>Newfound Research LLC</strong> sub-advises; <strong>ReSolve Asset Management SEZC</strong>{' '}
            (Cayman) is <strong>futures trading advisor</strong>—a team known for systematic{' '}
            <strong>quant</strong> research and institutional <strong>risk management</strong> in futures. The
            Return Stacked® brand packages that stack for ETF investors: <strong>rules-based</strong>{' '}
            equity implementation plus a <strong>futures yield</strong>{' '}
            engine where edge is process and execution,
            not discretionary stock picking.
          </p>
        </div>

        <div className={styles.bodySection}>
          <h2>Outperformance</h2>
          <p>
            The <strong>futures yield</strong> sleeve tends to add the most when <strong>global futures</strong>{' '}
            markets offer strong <strong>roll</strong> and <strong>curve</strong> opportunity: e.g.{' '}
            <strong>commodity</strong> complexes in sustained <strong>backwardation</strong> or otherwise
            supportive <strong>term structure</strong>; <strong>rate</strong> and{' '}
            <strong>Treasury futures</strong> regimes where curve shape rewards holding and rolling; and{' '}
            <strong>FX</strong> phases where <strong>policy-rate gaps</strong> between countries drive currency
            futures payoff. Those environments often coincide with <strong>inflation</strong> surprises, sharp{' '}
            <strong>dollar</strong> moves, or growth scares—macro stress where equities wobble but futures
            markets reprice across assets.
          </p>
          <p>
            The first sleeve is <strong>large-cap U.S. beta</strong>; incremental return versus that equity leg
            comes mainly from the <strong>futures yield</strong>{' '}stack when those cross-asset curve and roll
            conditions line up—not from treating the fund as an S&amp;P 500 horse race.
          </p>
        </div>

        <div className={styles.bodySection}>
          <h2>Official ETF page</h2>
          <p>
            Read the official ETF page for holdings, performance, factsheet, prospectus, and fund details:{' '}
            <a
              href="https://www.returnstackedetfs.com/rssy-return-stacked-us-stocks-futures-yield/"
              target="_blank"
              rel="noopener noreferrer"
            >
              RSSY official page
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
