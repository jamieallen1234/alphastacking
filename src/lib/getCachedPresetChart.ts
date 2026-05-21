import { unstable_cache } from 'next/cache'
import { computePortfolioChart } from '@/lib/computePortfolioChart'
import { getPresetById, presetSymbols, presetWeights, type PresetDefinition } from '@/lib/presets'
import type { YahooRange } from '@/lib/yahooFinance'

const presetChartLoaderByKey = new Map<string, () => ReturnType<typeof computePresetChart>>()

const DAY = 86400

/**
 * Default preset view: last ~1 calendar year of daily bars (good balance of recency vs window).
 * Users can switch to **2Y**, **3Y**, **5Y** (`5y`), or **All** (`max`) for longer inception-clipped windows.
 */
const PRESET_CHART_RANGE = '1y' as const

/**
 * Server-side cached preset chart (1y range used on portfolio detail pages and hub previews).
 *
 * Cache keys mirror the pre-refactor per-preset wrappers so the existing `chart-proxy-v10`
 * cache stays valid after deploy.
 */
export function getCachedPresetChart1y(presetId: string) {
  const preset = mustPreset(presetId)
  return unstable_cache(
    () => computePresetChart(preset, PRESET_CHART_RANGE),
    cacheKeyFor(preset, PRESET_CHART_RANGE),
    { revalidate: DAY }
  )()
}

/** Home page: full joint history (`max`), same baskets as the live preset detail charts. */
export function getCachedPresetChartMax(presetId: string) {
  const preset = mustPreset(presetId)
  return unstable_cache(
    () => computePresetChart(preset, 'max'),
    cacheKeyFor(preset, 'max'),
    { revalidate: DAY }
  )()
}

/** Uncached compute path — kept for callers that explicitly need a fresh fetch. */
export function computeUncachedPresetChart(presetId: string, range: YahooRange) {
  const preset = mustPreset(presetId)
  return computePresetChart(preset, range)
}

/** Server-side cached preset chart for any range (24-hour TTL). */
export function getCachedPresetChartForRange(presetId: string, range: YahooRange) {
  const preset = mustPreset(presetId)
  const k = `${preset.id}\t${range}`
  let loader = presetChartLoaderByKey.get(k)
  if (!loader) {
    loader = unstable_cache(
      () => computePresetChart(preset, range),
      [...cacheKeyFor(preset, range)],
      { revalidate: DAY }
    )
    presetChartLoaderByKey.set(k, loader)
  }
  return loader()
}

function computePresetChart(preset: PresetDefinition, range: YahooRange) {
  return computePortfolioChart({
    symbols: presetSymbols(preset),
    weights: presetWeights(preset),
    range,
    cadDenominated: preset.cadDenominated || undefined,
    rebalanceSchedule: preset.rebalanceSchedule,
  })
}

function mustPreset(presetId: string): PresetDefinition {
  const p = getPresetById(presetId)
  if (!p) throw new Error(`Unknown preset id: ${presetId}`)
  return p
}

/**
 * Cache-key shape. Bumped to `chart-proxy-v11` for the registry-driven refactor; the existing
 * per-preset tags (`extraCacheKeyTags`) are still included so a preset content change can opt-in
 * to invalidate via a tag bump in the registry.
 */
function cacheKeyFor(preset: PresetDefinition, range: YahooRange): string[] {
  return [
    'preset-chart',
    'chart-proxy-v11',
    preset.id,
    range,
    ...preset.extraCacheKeyTags,
    'notional-10k',
  ]
}
