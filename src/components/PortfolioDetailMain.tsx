import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PresetIntlChartPanel from '@/components/PresetIntlChartPanel'
import PresetHoldingsTable from '@/components/PresetHoldingsTable'
import { getCachedPresetChart1y } from '@/lib/getCachedPresetChart'
import {
  caPortfolioRoutes,
  getPortfolioCardById,
  type PortfolioRouteDef,
  usPortfolioRoutes,
} from '@/lib/portfolioRoutes'
import {
  CA_ALPHA_STACK_PRESET_ID,
  CA_CORE_BH_PRESET_ID,
  CA_INTL_PRESET_ID,
  CA_SSO_DGLM_RGBM_ARB_PRESET_ID,
  CA_USSL_QQQL_HDGE_PRESET_ID,
  US_5_4_3_2_1_PRESET_ID,
  US_ADVANCED_PRESET_ID,
  US_ALPHA_STACK_PRESET_ID,
  US_CORE_BH_PRESET_ID,
  US_GDE_CLSE_BLEND_PRESET_ID,
  US_INTL_PRESET_ID,
  US_UPRO_PREMIA_STACK_PRESET_ID,
  getPresetById,
  weightedBeta,
} from '@/lib/presets'
import { buildExposureSummaryFromPresetHoldings } from '@/lib/exposureSummary'
import { buildPortfolioBuilderPrefillHref } from '@/lib/portfolioBuilderPrefill'
import { HOW_TO_BUILD_SLUG, learnArticlePath } from '@/lib/learnArticles'
import { portfolioBuilderPath } from '@/lib/siteRegion'
import styles from '@/app/portfolios/PortfoliosPage.module.css'

function PortfolioLearnCue({ backHref }: { backHref: string }) {
  const href = learnArticlePath(backHref.startsWith('/ca/'), HOW_TO_BUILD_SLUG)
  return (
    <p className={styles.detailLearnCue}>
      <Link href={href}>How to read sleeves and model portfolios →</Link>
    </p>
  )
}

const US_SLUG_TO_PRESET_ID: Record<string, string> = {
  'us-international': US_INTL_PRESET_ID,
  'us-advanced': US_ADVANCED_PRESET_ID,
  'us-core-buy-hold': US_CORE_BH_PRESET_ID,
  'us-gde-clse-blend': US_GDE_CLSE_BLEND_PRESET_ID,
  'alpha-stack': US_ALPHA_STACK_PRESET_ID,
  'upro-premia-stack': US_UPRO_PREMIA_STACK_PRESET_ID,
  '5-4-3-2-1': US_5_4_3_2_1_PRESET_ID,
}

const CA_SLUG_TO_PRESET_ID: Record<string, string> = {
  'ca-international': CA_INTL_PRESET_ID,
  'ca-core-buy-hold': CA_CORE_BH_PRESET_ID,
  'ca-ussl-qqql-hdge': CA_USSL_QQQL_HDGE_PRESET_ID,
  'ca-sso-dglm-rgbm-arb': CA_SSO_DGLM_RGBM_ARB_PRESET_ID,
  'ca-alpha-stack': CA_ALPHA_STACK_PRESET_ID,
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
        <PortfolioLearnCue backHref={backHref} />
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
  presetId,
  chartHeading,
}: {
  backHref: string
  def: PortfolioRouteDef
  presetId: string
  chartHeading: string
}) {
  const preset = getPresetById(presetId)
  if (!preset) notFound()

  let chart = null
  let errorMessage: string | null = null
  try {
    chart = await getCachedPresetChart1y(presetId)
  } catch (e) {
    errorMessage = e instanceof Error ? e.message : 'Failed to load chart data'
  }

  const wb = weightedBeta(preset.holdings)
  const exposureSummary = buildExposureSummaryFromPresetHoldings(preset.holdings)
  const siteIsCa = backHref.startsWith('/ca/')
  const builderCopyHref = buildPortfolioBuilderPrefillHref(
    portfolioBuilderPath(siteIsCa),
    preset.holdings
  )

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
        <PortfolioLearnCue backHref={backHref} />

        <PresetHoldingsTable
          holdings={preset.holdings}
          weightedBeta={wb}
          copyBuilderHref={builderCopyHref}
        />

        <h2 className={styles.chartHeading}>{chartHeading}</h2>

        {errorMessage ? <div className={styles.errorBox}>{errorMessage}</div> : null}
        {chart && chart.chartStartDate ? (
          <PresetIntlChartPanel
            presetId={presetId}
            initialPayload={chart}
            overlapInceptionYmd={chart.limitingFirstTradeDate}
            weightedBeta={wb}
            exposureSummary={exposureSummary}
            holdings={preset.holdings.map((h) => ({ ticker: h.ticker, weightPct: h.weightPct }))}
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
            <PortfolioLearnCue backHref={backHref} />

            <p className={styles.stubNote}>
              Live weighted chart and full position-level weights will be published here — same
              methodology as our US Multi-Strategy portfolio.
            </p>
          </section>
          <Footer />
        </main>
      )
    }

    const presetId = US_SLUG_TO_PRESET_ID[slug]
    if (!presetId) notFound()

    return (
      <LiveLayout
        backHref={backHref}
        def={def}
        presetId={presetId}
        chartHeading="Total return (vs SPY)"
      />
    )
  }

  const def = caPortfolioRoutes.find((r) => r.slug === slug)
  if (!def) notFound()

  if (def.kind === 'stub') {
    return <StubLayout backHref={backHref} def={def} />
  }

  const presetId = CA_SLUG_TO_PRESET_ID[slug]
  if (!presetId) notFound()

  return (
    <LiveLayout
      backHref={backHref}
      def={def}
      presetId={presetId}
      chartHeading="Total return (CAD vs SPY)"
    />
  )
}
