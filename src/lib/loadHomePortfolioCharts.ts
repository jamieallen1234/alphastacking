import { emptyPortfolioChartPayload, type PortfolioChartPayload } from '@/lib/computePortfolioChart'
import {
  getCachedCaInternationalChartMax,
  getCachedUsGdeClseBlendChartMax,
} from '@/lib/getCachedPresetChart'
import { caPortfolioRoutes, usPortfolioRoutes } from '@/lib/portfolioRoutes'

export type HomePortfolioChartSlot = {
  slug: string
  href: string
  title: string
  description: string
  chartHeading: string
  payload: PortfolioChartPayload
}

/** First attempt budget — cold cache + Yahoo can exceed a short deadline and blank the home charts. */
const HOME_CHART_TIMEOUT_MS = 14_000

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | null> {
  let timer: ReturnType<typeof setTimeout> | undefined
  return new Promise((resolve) => {
    timer = setTimeout(() => resolve(null), ms)
    promise
      .then((value) => resolve(value))
      .catch(() => resolve(null))
      .finally(() => {
        if (timer) clearTimeout(timer)
      })
  })
}

/** Mirrors PresetPortfolioChart’s gate (used on the home page to match chart vs fallback). */
export function homeChartPayloadIsRenderable(p: PortfolioChartPayload | null | undefined): boolean {
  if (!p?.chartStartDate || !p.limitingSymbol || !p.limitingFirstTradeDate) return false
  const { values, benchmarkValues, timestamps } = p
  return (
    !!values &&
    !!benchmarkValues &&
    !!timestamps &&
    values.length >= 2 &&
    values.length === benchmarkValues.length &&
    values.length === timestamps.length
  )
}

/**
 * Race the first fetch so ISR stays responsive; if it times out or isn’t chart-ready, await the same
 * cached loader once without a cap so slow cold fills still land after unstable_cache warms.
 */
async function loadHomePresetChartMax(
  load: () => Promise<PortfolioChartPayload>,
  empty: () => PortfolioChartPayload
): Promise<PortfolioChartPayload> {
  const raced = await withTimeout(load(), HOME_CHART_TIMEOUT_MS)
  if (raced && homeChartPayloadIsRenderable(raced)) return raced

  try {
    const waited = await load()
    if (homeChartPayloadIsRenderable(waited)) return waited
  } catch {
    /* empty fallback below */
  }
  return empty()
}

/** Home page model charts (full history `max` range; detail pages still default to 1Y). US: Gold & Alt blend; CA: Global + Long/Short only. */
export async function loadHomePortfolioChartSlots(
  variant: 'us' | 'ca'
): Promise<HomePortfolioChartSlot[]> {
  if (variant === 'us') {
    const empty = () => emptyPortfolioChartPayload('USD')
    const gdeBlendPayload = await loadHomePresetChartMax(() => getCachedUsGdeClseBlendChartMax(), empty)
    const gdeBlendDef = usPortfolioRoutes.find((r) => r.slug === 'us-gde-clse-blend')
    if (!gdeBlendDef) {
      throw new Error('loadHomePortfolioChartSlots: missing US + Gold & Alt Blend route def')
    }
    return [
      {
        slug: gdeBlendDef.slug,
        href: `/portfolios/${gdeBlendDef.slug}`,
        title: gdeBlendDef.title,
        description: gdeBlendDef.description,
        chartHeading: 'Total return vs S&P 500 index — all history',
        payload: gdeBlendPayload,
      },
    ]
  }

  const empty = () => emptyPortfolioChartPayload('CAD')
  const globalLsPayload = await loadHomePresetChartMax(() => getCachedCaInternationalChartMax(), empty)
  const globalLsDef = caPortfolioRoutes.find((r) => r.slug === 'ca-international')
  if (!globalLsDef) {
    throw new Error('loadHomePortfolioChartSlots: missing CA international route def')
  }
  return [
    {
      slug: globalLsDef.slug,
      href: `/ca/portfolios/${globalLsDef.slug}`,
      title: globalLsDef.title,
      description: globalLsDef.description,
      chartHeading: 'Total return vs S&P 500 index — all history (CAD)',
      payload: globalLsPayload,
    },
  ]
}
