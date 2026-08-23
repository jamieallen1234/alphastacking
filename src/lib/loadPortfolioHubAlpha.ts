import { getCachedPresetChart1y, getCachedPresetChartMax } from '@/lib/getCachedPresetChart'
import {
  CA_ALPHA_STACK_PRESET_ID,
  CA_BOND_ALT_PRESET_ID,
  CA_CORE_BH_PRESET_ID,
  CA_FACTOR_FCMO_PRESET_ID,
  CA_FOUR_ALPHA_QUADRANTS_PRESET_ID,
  CA_INTL_PRESET_ID,
  CA_SIXTY_FORTY_PRESET_ID,
  CA_SSO_DGLM_RGBM_ARB_PRESET_ID,
  CA_USSL_QQQL_HDGE_PRESET_ID,
  US_5_4_3_2_1_PRESET_ID,
  US_ADVANCED_PRESET_ID,
  US_ALPHA_STACK_PRESET_ID,
  US_BOND_ALT_PRESET_ID,
  US_CORE_BH_PRESET_ID,
  US_FOUR_ALPHA_QUADRANTS_PRESET_ID,
  US_GDE_CLSE_BLEND_PRESET_ID,
  US_INTL_PRESET_ID,
  US_SIXTY_FORTY_PRESET_ID,
  US_UPRO_PREMIA_STACK_PRESET_ID,
  US_RISK_PARITY_PRESET_ID,
  US_LONG_SHORT_EQUITY_PRESET_ID,
  US_LETF_STACK_2X_PRESET_ID,
  US_LETF_STACK_3X_PRESET_ID,
} from '@/lib/presets'
import type { ScorecardPayload } from '@/lib/portfolioHubGrade'

export interface PortfolioHubSlugData {
  excessAlphaPercent: number | null
  payload1y: ScorecardPayload
  payloadMax: ScorecardPayload
}

/** Live portfolio route slugs mapped to their holdings presets. */
export const HUB_SLUG_TO_PRESET_ID: Record<string, string> = {
  'us-international': US_INTL_PRESET_ID,
  'us-advanced': US_ADVANCED_PRESET_ID,
  'us-core-buy-hold': US_CORE_BH_PRESET_ID,
  'us-gde-clse-blend': US_GDE_CLSE_BLEND_PRESET_ID,
  'alpha-stack': US_ALPHA_STACK_PRESET_ID,
  'upro-premia-stack': US_UPRO_PREMIA_STACK_PRESET_ID,
  '5-4-3-2-1': US_5_4_3_2_1_PRESET_ID,
  'risk-parity': US_RISK_PARITY_PRESET_ID,
  'long-short-equity': US_LONG_SHORT_EQUITY_PRESET_ID,
  'letf-stack-2x': US_LETF_STACK_2X_PRESET_ID,
  'letf-stack-3x': US_LETF_STACK_3X_PRESET_ID,
  'four-alpha-quadrants': US_FOUR_ALPHA_QUADRANTS_PRESET_ID,
  'ca-international': CA_INTL_PRESET_ID,
  'ca-core-buy-hold': CA_CORE_BH_PRESET_ID,
  'ca-factor-fcmo': CA_FACTOR_FCMO_PRESET_ID,
  'ca-ussl-qqql-hdge': CA_USSL_QQQL_HDGE_PRESET_ID,
  'ca-sso-dglm-rgbm-arb': CA_SSO_DGLM_RGBM_ARB_PRESET_ID,
  'ca-alpha-stack': CA_ALPHA_STACK_PRESET_ID,
  'ca-four-alpha-quadrants': CA_FOUR_ALPHA_QUADRANTS_PRESET_ID,
  'us-bond-alternative': US_BOND_ALT_PRESET_ID,
  'ca-bond-alternative': CA_BOND_ALT_PRESET_ID,
  'us-sixty-forty': US_SIXTY_FORTY_PRESET_ID,
  'ca-sixty-forty': CA_SIXTY_FORTY_PRESET_ID,
}

function toScorecardPayload(p: {
  totalReturnPercent: number | null
  benchmarkTotalReturnPercent: number | null
  maxDrawdownPortfolioPercent: number | null
  maxDrawdownBenchmarkPercent: number | null
  limitingFirstTradeDate: string
}): ScorecardPayload {
  return {
    totalReturnPercent: p.totalReturnPercent ?? null,
    benchmarkTotalReturnPercent: p.benchmarkTotalReturnPercent ?? null,
    maxDrawdownPortfolioPercent: p.maxDrawdownPortfolioPercent ?? null,
    maxDrawdownBenchmarkPercent: p.maxDrawdownBenchmarkPercent ?? null,
    limitingFirstTradeDate: p.limitingFirstTradeDate ?? '',
  }
}

/**
 * One preset's Yahoo fetch failing (rate limiting, a transient outage) must not fail the whole
 * hub page's static prerender — skip that slug's card rather than rejecting the entire batch.
 */
export async function loadPortfolioHubAlphaBySlug(): Promise<Record<string, PortfolioHubSlugData>> {
  const entries = await Promise.all(
    Object.entries(HUB_SLUG_TO_PRESET_ID).map(async ([slug, presetId]) => {
      try {
        const [p1y, pMax] = await Promise.all([
          getCachedPresetChart1y(presetId),
          getCachedPresetChartMax(presetId),
        ])
        const data: PortfolioHubSlugData = {
          excessAlphaPercent: p1y.excessAlphaPercent ?? null,
          payload1y: toScorecardPayload(p1y),
          payloadMax: toScorecardPayload(pMax),
        }
        return [slug, data] as const
      } catch (e) {
        console.error(`loadPortfolioHubAlphaBySlug: failed to load "${slug}" (${presetId})`, e)
        return null
      }
    })
  )
  return Object.fromEntries(entries.filter((e): e is [string, PortfolioHubSlugData] => e !== null))
}
