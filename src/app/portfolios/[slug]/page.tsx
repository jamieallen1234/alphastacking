import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PresetIntlChartPanel from '@/components/PresetIntlChartPanel'
import PresetHoldingsTable from '@/components/PresetHoldingsTable'
import Sparkline from '@/components/Sparkline'
import { getCachedUsInternationalChart } from '@/lib/getCachedPresetChart'
import { getPortfolioCardById, usPortfolioRoutes } from '@/lib/portfolioRoutes'
import {
  US_INTL_PRESET_ID,
  usInternationalHoldings,
  weightedBeta,
} from '@/lib/presets/usInternational'
import styles from '../PortfoliosPage.module.css'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const def = usPortfolioRoutes.find((r) => r.slug === slug)
  return {
    title: def ? `${def.title} — Alpha Stacking` : 'Portfolio',
  }
}

export default async function UsPortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const def = usPortfolioRoutes.find((r) => r.slug === slug)
  if (!def) notFound()

  if (def.kind === 'stub') {
    return (
      <main className={styles.main}>
        <Nav />
        <section className={styles.detailSection}>
          <Link href="/portfolios" className={styles.back}>
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

  if (def.kind === 'placeholder' && def.sourcePortfolioId) {
    const card = getPortfolioCardById(def.sourcePortfolioId)
    if (!card) notFound()
    return (
      <main className={styles.main}>
        <Nav />
        <section className={styles.detailSection}>
          <Link href="/portfolios" className={styles.back}>
            ← Portfolios
          </Link>
          <span className={styles.detailBadge}>{card.badge}</span>
          <h1 className={styles.detailTitle}>{card.name}</h1>
          <p className={styles.detailLede}>{card.description}</p>

          <div className={styles.metricsRowStatic}>
            <div className={styles.metricBlock}>
              <span
                className={`${styles.metricVal} ${card.metrics.returnPositive ? '' : styles.metricValNeg}`}
              >
                {card.metrics.return1y}
              </span>
              <span className={styles.metricLab}>1Y (illustrative)</span>
            </div>
            <div className={styles.metricBlock}>
              <span className={styles.metricVal}>{card.metrics.sharpe}</span>
              <span className={styles.metricLab}>Sharpe</span>
            </div>
            <div className={styles.metricBlock}>
              <span className={`${styles.metricVal} ${styles.metricValNeg}`}>{card.metrics.maxDD}</span>
              <span className={styles.metricLab}>Max DD</span>
            </div>
          </div>

          <div className={styles.sparkWrap}>
            <Sparkline points={card.sparkPoints} color={card.sparkColor} />
          </div>

          <p className={styles.stubNote}>
            Live weighted chart and full position-level weights will be published here — same
            methodology as our US international portfolio.
          </p>
        </section>
        <Footer />
      </main>
    )
  }

  if (slug !== 'us-international') notFound()

  let chart = null
  let errorMessage: string | null = null
  try {
    chart = await getCachedUsInternationalChart()
  } catch (e) {
    errorMessage = e instanceof Error ? e.message : 'Failed to load chart data'
  }

  const wb = weightedBeta(usInternationalHoldings)

  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.detailSection}>
        <Link href="/portfolios" className={styles.back}>
          ← Portfolios
        </Link>
        {def.badge ? <span className={styles.detailBadge}>{def.badge}</span> : null}
        <h1 className={styles.detailTitle}>{def.title}</h1>
        <p className={styles.detailLede}>{def.description}</p>

        <div className={styles.disclaimer}>
          <span className={styles.disclaimerIcon}>⚠</span>
          <p>
            Model mix for educational purposes only. Betas are approximate. Not a recommendation to buy
            or sell any security.
          </p>
        </div>

        <PresetHoldingsTable holdings={usInternationalHoldings} weightedBeta={wb} />

        <h2 className={styles.chartHeading}>Total return (vs SPY)</h2>
        <p className={styles.detailLede} style={{ fontSize: 12, marginBottom: '1rem' }}>
          Chart starts at $10,000 at the first session where all holdings trade; benchmark is SPY
          on the same dates. Default view is <strong>1Y</strong>; shorter ranges (1M, YTD) appear
          once the basket has enough overlapping history since the youngest listing.
        </p>

        {errorMessage ? <div className={styles.errorBox}>{errorMessage}</div> : null}
        {chart && chart.chartStartDate ? (
          <PresetIntlChartPanel
            presetId={US_INTL_PRESET_ID}
            initialPayload={chart}
            overlapInceptionYmd={chart.chartStartDate}
          />
        ) : null}
      </section>
      <Footer />
    </main>
  )
}
