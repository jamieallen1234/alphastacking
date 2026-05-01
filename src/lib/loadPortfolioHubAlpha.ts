import type { PortfolioChartPayload } from '@/lib/computePortfolioChart'
import {
  getCachedCaCoreBuyHoldChart,
  getCachedCaInternationalChart,
  getCachedCaSsoDglmRgbmArbChart,
  getCachedCaUsslQqqlHdgeChart,
  getCachedUsAdvancedChart,
  getCachedUsCoreBuyHoldChart,
  getCachedUsGdeClseBlendChart,
  getCachedUsInternationalChart,
} from '@/lib/getCachedPresetChart'

/** Live hub slugs → loaders (1Y preset charts; alpha = portfolio TR% minus SPY TR% over the same window). */
const HUB_SLUG_LOADERS: Record<string, () => Promise<PortfolioChartPayload>> = {
  'us-international': getCachedUsInternationalChart,
  'us-advanced': getCachedUsAdvancedChart,
  'us-core-buy-hold': getCachedUsCoreBuyHoldChart,
  'us-gde-clse-blend': getCachedUsGdeClseBlendChart,
  'ca-international': getCachedCaInternationalChart,
  'ca-core-buy-hold': getCachedCaCoreBuyHoldChart,
  'ca-ussl-qqql-hdge': getCachedCaUsslQqqlHdgeChart,
  'ca-sso-dglm-rgbm-arb': getCachedCaSsoDglmRgbmArbChart,
}

export async function loadPortfolioHubAlphaBySlug(): Promise<Record<string, number | null>> {
  const entries = await Promise.all(
    Object.entries(HUB_SLUG_LOADERS).map(async ([slug, load]) => {
      const payload = await load()
      return [slug, payload.excessAlphaPercent ?? null] as const
    })
  )
  return Object.fromEntries(entries)
}
