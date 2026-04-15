import { unstable_cache } from 'next/cache'
import { computePortfolioChart } from '@/lib/computePortfolioChart'
import {
  CA_INTL_PRESET_ID,
  caInternationalSymbols,
  caInternationalWeights,
} from '@/lib/presets/caInternational'
import {
  US_INTL_PRESET_ID,
  usInternationalSymbols,
  usInternationalWeights,
} from '@/lib/presets/usInternational'

const DAY = 86400

/**
 * Default preset view: last ~1 calendar year of daily bars (good balance of recency vs window).
 * Users can switch to **All** (`5y` Yahoo pull) for a longer inception-clipped window.
 */
const PRESET_CHART_RANGE = '1y' as const

export const getCachedUsInternationalChart = unstable_cache(
  async () =>
    computePortfolioChart({
      symbols: usInternationalSymbols(),
      weights: usInternationalWeights(),
      range: PRESET_CHART_RANGE,
    }),
  ['preset-chart', US_INTL_PRESET_ID, PRESET_CHART_RANGE, 'synth-heql-mate-v1', 'notional-10k', 'default-1y'],
  { revalidate: DAY }
)

export const getCachedCaInternationalChart = unstable_cache(
  async () =>
    computePortfolioChart({
      symbols: caInternationalSymbols(),
      weights: caInternationalWeights(),
      range: PRESET_CHART_RANGE,
      cadDenominated: true,
    }),
  [
    'preset-chart',
    CA_INTL_PRESET_ID,
    PRESET_CHART_RANGE,
    'synth-heql-inception-2023-10-12',
    'notional-10k',
    'cad-vfv-usdcad',
    'heql-cad-fin-v2',
    'default-1y',
  ],
  { revalidate: DAY }
)
