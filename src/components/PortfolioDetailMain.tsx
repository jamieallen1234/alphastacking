import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PresetIntlChartPanel from '@/components/PresetIntlChartPanel'
import PresetHoldingsTable from '@/components/PresetHoldingsTable'
import {
  getCachedCaCoreBuyHoldChart,
  getCachedCaInternationalChart,
  getCachedCaUsslQqqlHdgeChart,
  getCachedUsAdvancedChart,
  getCachedUsCoreBuyHoldChart,
  getCachedUsInternationalChart,
} from '@/lib/getCachedPresetChart'
import {
  caPortfolioRoutes,
  getPortfolioCardById,
  type PortfolioRouteDef,
  usPortfolioRoutes,
} from '@/lib/portfolioRoutes'
import { CA_CORE_BH_PRESET_ID, caCoreBuyHoldHoldings } from '@/lib/presets/caBuyHold'
import { CA_USSL_QQQL_HDGE_PRESET_ID, caUsslQqqlHdgeHoldings } from '@/lib/presets/caBuyHoldHdge'
import { CA_INTL_PRESET_ID, caInternationalHoldings } from '@/lib/presets/caInternational'
import { US_CORE_BH_PRESET_ID, usCoreBuyHoldHoldings } from '@/lib/presets/usBuyHold'
import { US_ADVANCED_PRESET_ID, usAdvancedHoldings } from '@/lib/presets/usAdvanced'
import {
  type PresetHolding,
  US_INTL_PRESET_ID,
  usInternationalHoldings,
  weightedBeta,
} from '@/lib/presets/usInternational'
import styles from '@/app/portfolios/PortfoliosPage.module.css'

type LiveEntry = {
  presetId: string
  holdings: PresetHolding[]
  load: () => ReturnType<typeof getCachedUsInternationalChart>
}

const US_LIVE: Record<string, LiveEntry> = {
  'us-international': {
    presetId: US_INTL_PRESET_ID,
    holdings: usInternationalHoldings,
    load: getCachedUsInternationalChart,
  },
  'us-advanced': {
    presetId: US_ADVANCED_PRESET_ID,
    holdings: usAdvancedHoldings,
    load: getCachedUsAdvancedChart,
  },
  'us-core-buy-hold': {
    presetId: US_CORE_BH_PRESET_ID,
    holdings: usCoreBuyHoldHoldings,
    load: getCachedUsCoreBuyHoldChart,
  },
}

const CA_LIVE: Record<string, LiveEntry> = {
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
  'ca-ussl-qqql-hdge': {
    presetId: CA_USSL_QQQL_HDGE_PRESET_ID,
    holdings: caUsslQqqlHdgeHoldings,
    load: getCachedCaUsslQqqlHdgeChart,
  },
}

function StubLayout({
  backHref,
  def,
}: {
  backHref: string
  def: PortfolioRouteDef
}) {
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

async function LiveLayout({
  backHref,
  def,
  live,
  chartHeading,
}: {
  backHref: string
  def: PortfolioRouteDef
  live: LiveEntry
  chartHeading: string
}) {
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

        <h2 className={styles.chartHeading}>{chartHeading}</h2>

        {errorMessage ? <div className={styles.errorBox}>{errorMessage}</div> : null}
        {chart && chart.chartStartDate ? (
          <PresetIntlChartPanel
            presetId={live.presetId}
            initialPayload={chart}
            overlapInceptionYmd={chart.limitingFirstTradeDate}
          />
        ) : (
          <p className={styles.pageChartDisclaimer}>
            Educational model only — not investment advice. Betas in the holdings table are weighted to
            the listed names and weights; they may be updated if holdings or methodology change.
          </p>
        )}
      </section>
      <Footer />
    </main>
  )
}

export interface PortfolioDetailMainProps {
  slug: string
  backHref: string
  /** `us`: `usPortfolioRoutes` only. `ca`: `caPortfolioRoutes` only. */
  routeSet: 'us' | 'ca'
}

/**
 * Model portfolio detail: stubs, US-only placeholders, and live preset charts.
 * Used for `/portfolios/[slug]` (US) and `/ca/portfolios/[slug]` when the slug is a CA route.
 */
export default async function PortfolioDetailMain({ slug, backHref, routeSet }: PortfolioDetailMainProps) {
  if (routeSet === 'us') {
    const def = usPortfolioRoutes.find((r) => r.slug === slug)
    if (!def) notFound()

    if (def.kind === 'stub') {
      return <StubLayout backHref={backHref} def={def} />
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

    return (
      <LiveLayout
        backHref={backHref}
        def={def}
        live={live}
        chartHeading="Total return (vs SPY)"
      />
    )
  }

  const def = caPortfolioRoutes.find((r) => r.slug === slug)
  if (!def) notFound()

  if (def.kind === 'stub') {
    return <StubLayout backHref={backHref} def={def} />
  }

  const live = CA_LIVE[slug]
  if (!live) notFound()

  return (
    <LiveLayout
      backHref={backHref}
      def={def}
      live={live}
      chartHeading="Total return (CAD vs SPY)"
    />
  )
}
