import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PresetIntlChartPanel from '@/components/PresetIntlChartPanel'
import PresetHoldingsTable from '@/components/PresetHoldingsTable'
import { getCachedCaInternationalChart } from '@/lib/getCachedPresetChart'
import { caPortfolioRoutes } from '@/lib/portfolioRoutes'
import { CA_INTL_PRESET_ID, caInternationalHoldings } from '@/lib/presets/caInternational'
import { weightedBeta } from '@/lib/presets/usInternational'
import styles from '@/app/portfolios/PortfoliosPage.module.css'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const def = caPortfolioRoutes.find((r) => r.slug === slug)
  return {
    title: def ? `${def.title} — Alpha Stacking` : 'Portfolio',
  }
}

export default async function CaPortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const def = caPortfolioRoutes.find((r) => r.slug === slug)
  if (!def) notFound()

  if (def.kind === 'stub') {
    return (
      <main className={styles.main}>
        <Nav />
        <section className={styles.detailSection}>
          <Link href="/ca/portfolios" className={styles.back}>
            ← Portfolios
          </Link>
          {def.badge ? <span className={styles.detailBadge}>{def.badge}</span> : null}
          <h1 className={styles.detailTitle}>{def.title}</h1>
          <p className={styles.detailLede}>{def.description}</p>
          <p className={styles.stubNote}>
            Full holdings breakdown and live performance chart are not available for this model yet.
          </p>
        </section>
        <Footer />
      </main>
    )
  }

  if (slug !== 'ca-international') notFound()

  let chart = null
  let errorMessage: string | null = null
  try {
    chart = await getCachedCaInternationalChart()
  } catch (e) {
    errorMessage = e instanceof Error ? e.message : 'Failed to load chart data'
  }

  const wb = weightedBeta(caInternationalHoldings)

  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.detailSection}>
        <Link href="/ca/portfolios" className={styles.back}>
          ← Portfolios
        </Link>
        {def.badge ? <span className={styles.detailBadge}>{def.badge}</span> : null}
        <h1 className={styles.detailTitle}>{def.title}</h1>
        <p className={styles.detailLede}>{def.description}</p>

        <div className={styles.disclaimer}>
          <span className={styles.disclaimerIcon}>⚠</span>
          <p>
            Model mix for educational purposes only. Includes both TSX (.TO) and US-listed tickers; aligned
            trading days may be sparser than a single-market portfolio. Not investment advice.
          </p>
        </div>

        <PresetHoldingsTable holdings={caInternationalHoldings} weightedBeta={wb} />

        <h2 className={styles.chartHeading}>Total return (CAD vs SPY)</h2>
        <p className={styles.detailLede} style={{ fontSize: 12, marginBottom: '1rem' }}>
          US-listed legs are converted with NY-aligned <strong>USDCAD</strong>; benchmark is{' '}
          <strong>SPY</strong> (S&amp;P 500 total return in CAD via <strong>VFV.TO</strong>). Chart starts at CA$10k on the first session where
          all holdings overlap. Default view is <strong>1Y</strong>; shorter ranges (1M, YTD) appear
          after enough calendar history since that overlap. <strong>All</strong> uses a Yahoo 5Y
          pull (inception-clipped).
        </p>

        {errorMessage ? <div className={styles.errorBox}>{errorMessage}</div> : null}
        {chart && chart.chartStartDate ? (
          <PresetIntlChartPanel
            presetId={CA_INTL_PRESET_ID}
            initialPayload={chart}
            overlapInceptionYmd={chart.chartStartDate}
          />
        ) : null}
      </section>
      <Footer />
    </main>
  )
}
