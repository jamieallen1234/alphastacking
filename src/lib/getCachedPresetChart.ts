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
  CA_SSO_DGLM_RGBM_ARB_PRESET_ID,
  caSsoDglmRgbmArbSymbols,
  caSsoDglmRgbmArbWeights,
} from '@/lib/presets/caSsoDglmRgbmArb'
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
  US_GDE_CLSE_BLEND_PRESET_ID,
  usGdeClseBlendSymbols,
  usGdeClseBlendWeights,
} from '@/lib/presets/usGdeClseBlend'
import {
  US_ADVANCED_PRESET_ID,
  usAdvancedSymbols,
  usAdvancedWeights,
} from '@/lib/presets/usAdvanced'
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
      rebalanceSchedule: 'annual',
    }),
  [
    'preset-chart',
    US_INTL_PRESET_ID,
    PRESET_CHART_RANGE,
    'synth-heql-mate-v1',
    'notional-10k',
    'default-1y',
    'annual-rebal',
  ],
  { revalidate: DAY }
)

export const getCachedUsAdvancedChart = unstable_cache(
  async () =>
    computePortfolioChart({
      symbols: usAdvancedSymbols(),
      weights: usAdvancedWeights(),
      range: PRESET_CHART_RANGE,
      rebalanceSchedule: 'annual',
    }),
  [
    'preset-chart',
    US_ADVANCED_PRESET_ID,
    PRESET_CHART_RANGE,
    'notional-10k',
    'default-1y',
    'annual-rebal',
    'upro-sso-mate-ntsd',
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
      rebalanceSchedule: 'annual',
    }),
  [
    'preset-chart',
    CA_INTL_PRESET_ID,
    PRESET_CHART_RANGE,
    'synth-heql-inception-2023-10-12',
    'notional-10k',
    'cad-xsp-bench-vfv-ussl-proxy',
    'heql-cad-fin-v2',
    'default-1y',
    'annual-rebal',
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

export const getCachedUsGdeClseBlendChart = unstable_cache(
  async () =>
    computePortfolioChart({
      symbols: usGdeClseBlendSymbols(),
      weights: usGdeClseBlendWeights(),
      range: PRESET_CHART_RANGE,
      rebalanceSchedule: 'none',
    }),
  [
    'preset-chart',
    US_GDE_CLSE_BLEND_PRESET_ID,
    PRESET_CHART_RANGE,
    'notional-10k',
    'default-1y',
    'buy-hold',
    'gde-clse-qld-mrgr-rssy-vflo',
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
    'cad-xsp-bench-vfv-ussl-proxy',
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
    'cad-xsp-bench-vfv-ussl-proxy',
    'default-1y',
    'buy-hold',
    'ussl-qqql-hdge-60-15-25',
  ],
  { revalidate: DAY }
)

export const getCachedCaSsoDglmRgbmArbChart = unstable_cache(
  async () =>
    computePortfolioChart({
      symbols: caSsoDglmRgbmArbSymbols(),
      weights: caSsoDglmRgbmArbWeights(),
      range: PRESET_CHART_RANGE,
      cadDenominated: true,
      rebalanceSchedule: 'annual',
    }),
  [
    'preset-chart',
    CA_SSO_DGLM_RGBM_ARB_PRESET_ID,
    PRESET_CHART_RANGE,
    'notional-10k',
    'cad-xsp-bench-vfv-ussl-proxy',
    'default-1y',
    'annual-rebal',
    'sso-qld-dglm-rgbm-arb-v3',
    'dglm-dbmf-proxy-v1',
  ],
  { revalidate: DAY }
)

/** Home page: full joint history (`max`), same baskets as the live preset detail charts. */
const PRESET_CHART_RANGE_MAX = 'max' as const

export const getCachedUsInternationalChartMax = unstable_cache(
  async () =>
    computePortfolioChart({
      symbols: usInternationalSymbols(),
      weights: usInternationalWeights(),
      range: PRESET_CHART_RANGE_MAX,
      rebalanceSchedule: 'annual',
    }),
  [
    'preset-chart',
    US_INTL_PRESET_ID,
    PRESET_CHART_RANGE_MAX,
    'synth-heql-mate-v1',
    'notional-10k',
    'home-max',
    'annual-rebal',
  ],
  { revalidate: DAY }
)

export const getCachedCaInternationalChartMax = unstable_cache(
  async () =>
    computePortfolioChart({
      symbols: caInternationalSymbols(),
      weights: caInternationalWeights(),
      range: PRESET_CHART_RANGE_MAX,
      cadDenominated: true,
      rebalanceSchedule: 'annual',
    }),
  [
    'preset-chart',
    CA_INTL_PRESET_ID,
    PRESET_CHART_RANGE_MAX,
    'synth-heql-inception-2023-10-12',
    'notional-10k',
    'cad-xsp-bench-vfv-ussl-proxy',
    'heql-cad-fin-v2',
    'home-max',
    'annual-rebal',
    'cad-levered-125-footnote',
  ],
  { revalidate: DAY }
)

export const getCachedUsCoreBuyHoldChartMax = unstable_cache(
  async () =>
    computePortfolioChart({
      symbols: usCoreBuyHoldSymbols(),
      weights: usCoreBuyHoldWeights(),
      range: PRESET_CHART_RANGE_MAX,
      rebalanceSchedule: 'none',
    }),
  [
    'preset-chart',
    US_CORE_BH_PRESET_ID,
    PRESET_CHART_RANGE_MAX,
    'notional-10k',
    'home-max',
    'buy-hold',
  ],
  { revalidate: DAY }
)

export const getCachedUsAdvancedChartMax = unstable_cache(
  async () =>
    computePortfolioChart({
      symbols: usAdvancedSymbols(),
      weights: usAdvancedWeights(),
      range: PRESET_CHART_RANGE_MAX,
      rebalanceSchedule: 'annual',
    }),
  [
    'preset-chart',
    US_ADVANCED_PRESET_ID,
    PRESET_CHART_RANGE_MAX,
    'notional-10k',
    'home-max',
    'annual-rebal',
    'upro-sso-mate-ntsd',
  ],
  { revalidate: DAY }
)

export const getCachedCaCoreBuyHoldChartMax = unstable_cache(
  async () =>
    computePortfolioChart({
      symbols: caCoreBuyHoldSymbols(),
      weights: caCoreBuyHoldWeights(),
      range: PRESET_CHART_RANGE_MAX,
      cadDenominated: true,
      rebalanceSchedule: 'none',
    }),
  [
    'preset-chart',
    CA_CORE_BH_PRESET_ID,
    PRESET_CHART_RANGE_MAX,
    'notional-10k',
    'cad-xsp-bench-vfv-ussl-proxy',
    'heql-cad-fin-v2',
    'home-max',
    'buy-hold',
    'ussl-qqql-cad125-synth',
    'core-30-30-15-25',
  ],
  { revalidate: DAY }
)
