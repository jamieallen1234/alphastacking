import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PresetIntlChartPanel from '@/components/PresetIntlChartPanel'
import PresetHoldingsTable from '@/components/PresetHoldingsTable'
import { getCachedUsCoreBuyHoldChart, getCachedUsInternationalChart } from '@/lib/getCachedPresetChart'
import { getPortfolioCardById, usPortfolioRoutes } from '@/lib/portfolioRoutes'
import { US_CORE_BH_PRESET_ID, usCoreBuyHoldHoldings } from '@/lib/presets/usBuyHold'
import {
  type PresetHolding,
  US_INTL_PRESET_ID,
  usInternationalHoldings,
  weightedBeta,
} from '@/lib/presets/usInternational'
import styles from '@/app/portfolios/PortfoliosPage.module.css'

const US_LIVE: Record<
  string,
  {
    presetId: string
    holdings: PresetHolding[]
    load: () => ReturnType<typeof getCachedUsInternationalChart>
  }
> = {
  'us-international': {
    presetId: US_INTL_PRESET_ID,
    holdings: usInternationalHoldings,
    load: getCachedUsInternationalChart,
  },
  'us-core-buy-hold': {
    presetId: US_CORE_BH_PRESET_ID,
    holdings: usCoreBuyHoldHoldings,
    load: getCachedUsCoreBuyHoldChart,
  },
}

/** US model portfolio detail; `backHref` is the portfolios hub (e.g. `/portfolios` or `/ca/portfolios`). */
export default async function UsPortfolioDetailMain({
  slug,
  backHref,
}: {
  slug: string
  backHref: string
}) {
  const def = usPortfolioRoutes.find((r) => r.slug === slug)
  if (!def) notFound()

  if (def.kind === 'stub') {
    return (
      <main className={styles.main}>
        <Nav />
        <section className={styles.detailSection}>
          <Link href={backHref} className={styles.back}>
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
          <Link href={backHref} className={styles.back}>
            ← Portfolios
          </Link>
          <span className={styles.detailBadge}>{card.badge}</span>
          <h1 className={styles.detailTitle}>{card.name}</h1>
          <p className={styles.detailLede}>{card.description}</p>

          <p className={styles.stubNote}>
            Live weighted chart and full position-level weights will be published here — same
            methodology as our US international portfolio.
          </p>
        </section>
        <Footer />
      </main>
    )
  }

  const live = US_LIVE[slug]
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
        <Link href={backHref} className={styles.back}>
          ← Portfolios
        </Link>
        {def.badge ? <span className={styles.detailBadge}>{def.badge}</span> : null}
        <h1 className={styles.detailTitle}>{def.title}</h1>
        <p className={styles.detailLede}>{def.description}</p>

        <PresetHoldingsTable holdings={live.holdings} weightedBeta={wb} />

        <h2 className={styles.chartHeading}>Total return (vs SPY)</h2>

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
