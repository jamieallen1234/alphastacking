import { unstable_cache } from 'next/cache'
import { computePortfolioChart } from '@/lib/computePortfolioChart'
import { getPresetById, presetSymbols, presetWeights, type PresetDefinition } from '@/lib/presets'
import type { YahooRange } from '@/lib/yahooFinance'

const DAY = 86400

/**
 * Single module-level unstable_cache wrapper. Next.js includes runtime arguments in the
 * cache key, so different (presetId, range) pairs are stored as distinct entries.
 * Defining it once at module scope avoids the source-location hash collision that occurs
 * when unstable_cache is called inside a function body on every invocation.
 */
const _cachedPresetChart = unstable_cache(
  async (presetId: string, range: YahooRange) => {
    const preset = mustPreset(presetId)
    return computePresetChart(preset, range)
  },
  ['preset-chart', 'chart-proxy-v15'],
  { revalidate: DAY }
)

export function getCachedPresetChart1y(presetId: string) {
  return _cachedPresetChart(presetId, '1y')
}

export function getCachedPresetChartMax(presetId: string) {
  return _cachedPresetChart(presetId, 'max')
}

export function getCachedPresetChartForRange(presetId: string, range: YahooRange) {
  return _cachedPresetChart(presetId, range)
}

/** Uncached compute path — kept for callers that explicitly need a fresh fetch. */
export function computeUncachedPresetChart(presetId: string, range: YahooRange) {
  const preset = mustPreset(presetId)
  return computePresetChart(preset, range)
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
