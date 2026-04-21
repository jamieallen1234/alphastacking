import type { ReactNode } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import EtfPageHubNav from '@/components/EtfPageHubNav'
import EtfChartPanel from '@/components/EtfChartPanel'
import type { EtfChartPayload } from '@/lib/getCachedEtfChart'

export type EtfPageHubBase = '/us-etfs' | '/ca/etfs' | '/ca/us-etfs'

/** Meta line order: Ticker → Issuer/Manager → Inception → Structure? → Beta → MER → AUM */
export type EtfPageMeta = {
  ticker: string
  issuerOrManager: string
  /** Defaults to Issuer (use Manager for some CA alts). */
  issuerRole?: 'issuer' | 'manager'
  inception: string
  mer: string
  aum: string
  structure?: string
  beta: string
}

export type EtfPageTemplateProps = {
  variant: 'us' | 'ca'
  hubBase: EtfPageHubBase
  hubCategoryId: string
  badge: string
  heading: string
  lede: ReactNode
  meta: EtfPageMeta
  chart: {
    /** e.g. `MATE` or `HDGE.TO` — used in “{label} price history” */
    displayLabel: string
    yahooSymbol: string
    payload: EtfChartPayload
  }
  /** Optional note directly under the chart (e.g. model-portfolio proxy). */
  belowChart?: ReactNode
  styles: Record<string, string>
  children: ReactNode
}

export default function EtfPageTemplate({
  variant,
  hubBase,
  hubCategoryId,
  badge,
  heading,
  lede,
  meta,
  chart,
  belowChart,
  styles,
  children,
}: EtfPageTemplateProps) {
  const issuerLabel = meta.issuerRole === 'manager' ? 'Manager' : 'Issuer'

  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.section}>
        <EtfPageHubNav variant={variant} />
        <Link href={`${hubBase}#${hubCategoryId}`} className={styles.back}>
          ← ETFs
        </Link>
        <span className={styles.badge}>{badge}</span>
        <h1 className={styles.heading}>{heading}</h1>
        <p className={styles.lede}>{lede}</p>

        <ul className={styles.meta}>
          <li>
            <strong>Ticker:</strong> {meta.ticker}
          </li>
          <li>
            <strong>{issuerLabel}:</strong> {meta.issuerOrManager}
          </li>
          <li>
            <strong>Inception:</strong> {meta.inception}
          </li>
          {meta.structure ? (
            <li>
              <strong>Structure:</strong> {meta.structure}
            </li>
          ) : null}
          <li>
            <strong>Beta:</strong> {meta.beta}
          </li>
          <li>
            <strong>MER:</strong> {meta.mer}
          </li>
          <li>
            <strong>AUM:</strong> {meta.aum}
          </li>
        </ul>

        <h2 className={styles.chartHeading}>{chart.displayLabel} price history</h2>
        <EtfChartPanel symbol={chart.yahooSymbol} initialPayload={chart.payload} />
        {belowChart}

        {children}
      </section>
      <Footer />
    </main>
  )
}
