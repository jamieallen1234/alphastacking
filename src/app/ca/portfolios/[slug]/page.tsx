import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PresetIntlChartPanel from '@/components/PresetIntlChartPanel'
import PresetHoldingsTable from '@/components/PresetHoldingsTable'
import { getCachedCaCoreBuyHoldChart, getCachedCaInternationalChart } from '@/lib/getCachedPresetChart'
import { caPortfolioRoutes } from '@/lib/portfolioRoutes'
import { CA_CORE_BH_PRESET_ID, caCoreBuyHoldHoldings } from '@/lib/presets/caBuyHold'
import { CA_INTL_PRESET_ID, caInternationalHoldings } from '@/lib/presets/caInternational'
import { type PresetHolding, weightedBeta } from '@/lib/presets/usInternational'
import styles from '@/app/portfolios/PortfoliosPage.module.css'

export const dynamic = 'force-dynamic'

const CA_LIVE: Record<
  string,
  {
    presetId: string
    holdings: PresetHolding[]
    load: () => ReturnType<typeof getCachedCaInternationalChart>
  }
> = {
  'ca-international': {
    presetId: CA_INTL_PRESET_ID,
    holdings: caInternationalHoldings,
    load: getCachedCaInternationalChart,
  },
  'ca-core-buy-hold': {
    presetId: CA_CORE_BH_PRESET_ID,
    holdings: caCoreBuyHoldHoldings,
    load: getCachedCaCoreBuyHoldChart,
  },
}

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

  const live = CA_LIVE[slug]
  if (!live) notFound()

  let chart = null
  let errorMessage: string | null = null
  try {
    chart = await live.load()
  } catch (e) {
    errorMessage = e instanceof Error ? e.message : 'Failed to load chart data'
  }

  const wb = weightedBeta(live.holdings)

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

        <PresetHoldingsTable holdings={live.holdings} weightedBeta={wb} />

        <h2 className={styles.chartHeading}>Total return (CAD vs SPY)</h2>

        {errorMessage ? <div className={styles.errorBox}>{errorMessage}</div> : null}
        {chart && chart.chartStartDate ? (
          <PresetIntlChartPanel
            presetId={live.presetId}
            initialPayload={chart}
            overlapInceptionYmd={chart.limitingFirstTradeDate}
          />
        ) : (
          <p className={styles.pageChartDisclaimer}>
            Educational model only — not investment advice. Betas in the holdings table are
            weighted to the listed names and weights; they may be updated if holdings or methodology
            change.
          </p>
        )}
      </section>
      <Footer />
    </main>
  )
}
