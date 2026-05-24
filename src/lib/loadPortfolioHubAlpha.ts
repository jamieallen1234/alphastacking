import { getCachedPresetChart1y } from '@/lib/getCachedPresetChart'
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
} from '@/lib/presets'

/** Live hub slugs → preset IDs (1Y preset charts; alpha = portfolio TR% minus SPY TR% over the same window). */
const HUB_SLUG_TO_PRESET_ID: Record<string, string> = {
  'us-international': US_INTL_PRESET_ID,
  'us-advanced': US_ADVANCED_PRESET_ID,
  'us-core-buy-hold': US_CORE_BH_PRESET_ID,
  'us-gde-clse-blend': US_GDE_CLSE_BLEND_PRESET_ID,
  'alpha-stack': US_ALPHA_STACK_PRESET_ID,
  'upro-premia-stack': US_UPRO_PREMIA_STACK_PRESET_ID,
  '5-4-3-2-1': US_5_4_3_2_1_PRESET_ID,
  'ca-international': CA_INTL_PRESET_ID,
  'ca-core-buy-hold': CA_CORE_BH_PRESET_ID,
  'ca-ussl-qqql-hdge': CA_USSL_QQQL_HDGE_PRESET_ID,
  'ca-sso-dglm-rgbm-arb': CA_SSO_DGLM_RGBM_ARB_PRESET_ID,
  'ca-alpha-stack': CA_ALPHA_STACK_PRESET_ID,
}

export async function loadPortfolioHubAlphaBySlug(): Promise<Record<string, number | null>> {
  const entries = await Promise.all(
    Object.entries(HUB_SLUG_TO_PRESET_ID).map(async ([slug, presetId]) => {
      const payload = await getCachedPresetChart1y(presetId)
      return [slug, payload.excessAlphaPercent ?? null] as const
    })
  )
  return Object.fromEntries(entries)
}
