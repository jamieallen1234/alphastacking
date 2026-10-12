import Link from 'next/link'
import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import { learnPath } from '@/lib/siteRegion'
import styles from './SiteInfoPage.module.css'

export default function MethodologyPage({ edition }: { edition: 'us' | 'ca' }) {
  const isCa = edition === 'ca'

  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.inner}>
        <p className={styles.kicker}>Site</p>
        <h1 className={styles.h1}>Methodology</h1>
        <p className={styles.lede}>
          Alpha Stacking tools summarize historical data and stated portfolio assumptions. They help
          compare trade-offs, but they do not predict returns or replace fund documents.
        </p>

        <div className={styles.section}>
          <h2>ETF pages and sources</h2>
          <p>
            Fund facts such as structure, fees, holdings, and strategy are checked against issuer
            pages, prospectuses, ETF Facts, regulatory filings, and index methodology when available.
            Use the Official sources section on an ETF page to verify current information, since funds
            can change their holdings, fees, and mandates.
          </p>
        </div>

        <div className={styles.section}>
          <h2>Ratings</h2>
          <p>
            Efficiency grades use live adjusted-price history, a stated benchmark, and the fund&apos;s
            category or exposure. They are historical filters, not forecasts or buy and sell ratings.
            Funds with too little live history are shown as N/A or provisional. Read the{' '}
            <Link href={`${learnPath(isCa)}/efficiency-grades`}>Efficiency Grades guide</Link> for the
            calculation and its limits.
          </p>
        </div>

        <div className={styles.section}>
          <h2>Portfolio charts</h2>
          <p>
            Charts start with Yahoo Finance adjusted-close data, which reflects cash distributions and
            splits under Yahoo Finance&apos;s methodology. Portfolio comparisons use common trading sessions
            and a $10,000 starting value. They do not include personal taxes, trading costs, or costs
            that are not explicitly disclosed beside the chart.
          </p>
        </div>

        <div className={styles.section}>
          <h2>Proxy history</h2>
          <p>
            Some newer funds have limited live history. When a chart extends a period with an older
            comparable fund or a stated blend, the chart identifies that proxy in a footnote. A proxy
            shows how a comparable implementation performed, not how the newer fund would have
            performed.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  )
}
