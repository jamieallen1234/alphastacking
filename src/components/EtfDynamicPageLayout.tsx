import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import EtfPageHubNav from '@/components/EtfPageHubNav'
import EtfChartPanel from '@/components/EtfChartPanel'
import EtfPageDisclaimers from '@/components/EtfPageDisclaimers'
import type { EtfDynamicDef } from '@/lib/etfDynamicRegistry'
import type { EtfChartPayload } from '@/lib/getCachedEtfChart'

export interface EtfDynamicPageLayoutProps {
  variant: 'us' | 'ca'
  /** e.g. `/us-etfs` or `/ca/etfs` */
  hubBase: '/us-etfs' | '/ca/etfs'
  def: EtfDynamicDef
  chart: EtfChartPayload
  /** CSS module from `page.module.css` (same shape as MATE / HDGE ETF pages). */
  styles: Record<string, string>
}

export default function EtfDynamicPageLayout({
  variant,
  hubBase,
  def,
  chart,
  styles,
}: EtfDynamicPageLayoutProps) {
  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.section}>
        <EtfPageHubNav variant={variant} />
        <Link href={`${hubBase}#${def.hubCategoryId}`} className={styles.back}>
          ← ETFs
        </Link>
        <span className={styles.badge}>{def.badge}</span>
        <h1 className={styles.heading}>{def.h1Title}</h1>
        <p className={styles.lede}>{def.lede}</p>

        <ul className={styles.meta}>
          <li>
            <strong>Ticker:</strong> {def.displayTicker}
          </li>
          <li>
            <strong>Issuer:</strong> {def.issuer}
          </li>
          <li>
            <strong>Inception:</strong> {def.inception}
          </li>
          {def.structure ? (
            <li>
              <strong>Structure:</strong> {def.structure}
            </li>
          ) : null}
          <li>
            <strong>Beta:</strong>{' '}
            {chart.betaVsSpy1y != null ? chart.betaVsSpy1y.toFixed(2) : '—'}
          </li>
          <li>
            <strong>MER:</strong> {def.mer}
          </li>
          <li>
            <strong>AUM:</strong> {def.aum}
          </li>
        </ul>

        <h2 className={styles.chartHeading}>{def.displayTicker} price history</h2>
        <EtfChartPanel symbol={def.yahooSymbol} initialPayload={chart} />

        <div className={styles.bodySection}>
          <h2>Strategy</h2>
          {def.strategyParas.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className={styles.bodySection}>
          <h2>Manager and Issuer Pedigree</h2>
          {def.pedigreeParas.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className={styles.bodySection}>
          <h2>Outperformance</h2>
          {def.outperfParas.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className={styles.bodySection}>
          <h2>Official ETF page</h2>
          <p>
            Read the official ETF page for current NAV, holdings, and documents:{' '}
            <a href={def.officialUrl} target="_blank" rel="noopener noreferrer">
              {def.officialLabel}
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
