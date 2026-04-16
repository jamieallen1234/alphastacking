import { unstable_cache } from 'next/cache'
import { computePortfolioChart } from '@/lib/computePortfolioChart'
import {
  CA_CORE_BH_PRESET_ID,
  caCoreBuyHoldSymbols,
  caCoreBuyHoldWeights,
} from '@/lib/presets/caBuyHold'
import {
  CA_USSL_QQQL_HDGE_PRESET_ID,
  caUsslQqqlHdgeSymbols,
  caUsslQqqlHdgeWeights,
} from '@/lib/presets/caBuyHoldHdge'
import {
  CA_INTL_PRESET_ID,
  caInternationalSymbols,
  caInternationalWeights,
} from '@/lib/presets/caInternational'
import {
  US_CORE_BH_PRESET_ID,
  usCoreBuyHoldSymbols,
  usCoreBuyHoldWeights,
} from '@/lib/presets/usBuyHold'
import {
  US_INTL_PRESET_ID,
  usInternationalSymbols,
  usInternationalWeights,
} from '@/lib/presets/usInternational'

const DAY = 86400

/**
 * Default preset view: last ~1 calendar year of daily bars (good balance of recency vs window).
 * Users can switch to **2Y**, **5Y** (`5y`), or **All** (`max`) for longer inception-clipped windows.
 */
const PRESET_CHART_RANGE = '1y' as const

export const getCachedUsInternationalChart = unstable_cache(
  async () =>
    computePortfolioChart({
      symbols: usInternationalSymbols(),
      weights: usInternationalWeights(),
      range: PRESET_CHART_RANGE,
      rebalanceSchedule: 'quarterly',
    }),
  [
    'preset-chart',
    US_INTL_PRESET_ID,
    PRESET_CHART_RANGE,
    'synth-heql-mate-v1',
    'notional-10k',
    'default-1y',
    'quarterly-rebal',
  ],
  { revalidate: DAY }
)

export const getCachedCaInternationalChart = unstable_cache(
  async () =>
    computePortfolioChart({
      symbols: caInternationalSymbols(),
      weights: caInternationalWeights(),
      range: PRESET_CHART_RANGE,
      cadDenominated: true,
      rebalanceSchedule: 'quarterly',
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
    'quarterly-rebal',
    'cad-levered-125-footnote',
  ],
  { revalidate: DAY }
)

export const getCachedUsCoreBuyHoldChart = unstable_cache(
  async () =>
    computePortfolioChart({
      symbols: usCoreBuyHoldSymbols(),
      weights: usCoreBuyHoldWeights(),
      range: PRESET_CHART_RANGE,
      rebalanceSchedule: 'none',
    }),
  [
    'preset-chart',
    US_CORE_BH_PRESET_ID,
    PRESET_CHART_RANGE,
    'notional-10k',
    'default-1y',
    'buy-hold',
  ],
  { revalidate: DAY }
)

export const getCachedCaCoreBuyHoldChart = unstable_cache(
  async () =>
    computePortfolioChart({
      symbols: caCoreBuyHoldSymbols(),
      weights: caCoreBuyHoldWeights(),
      range: PRESET_CHART_RANGE,
      cadDenominated: true,
      rebalanceSchedule: 'none',
    }),
  [
    'preset-chart',
    CA_CORE_BH_PRESET_ID,
    PRESET_CHART_RANGE,
    'notional-10k',
    'cad-vfv-usdcad',
    'heql-cad-fin-v2',
    'default-1y',
    'buy-hold',
    'ussl-qqql-cad125-synth',
    'core-30-30-15-25',
  ],
  { revalidate: DAY }
)

export const getCachedCaUsslQqqlHdgeChart = unstable_cache(
  async () =>
    computePortfolioChart({
      symbols: caUsslQqqlHdgeSymbols(),
      weights: caUsslQqqlHdgeWeights(),
      range: PRESET_CHART_RANGE,
      cadDenominated: true,
      rebalanceSchedule: 'none',
    }),
  [
    'preset-chart',
    CA_USSL_QQQL_HDGE_PRESET_ID,
    PRESET_CHART_RANGE,
    'notional-10k',
    'cad-vfv-usdcad',
    'default-1y',
    'buy-hold',
    'ussl-qqql-hdge-60-15-25',
  ],
  { revalidate: DAY }
)
