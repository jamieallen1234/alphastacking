import { unstable_cache } from 'next/cache'
import { computePortfolioChart } from '@/lib/computePortfolioChart'
import { getPresetById, presetSymbols, presetWeights, type PresetDefinition } from '@/lib/presets'
import type { YahooRange } from '@/lib/yahooFinance'

const DAY = 86400

/**
 * Stable fingerprint of every chart-affecting preset setting. Passed into `unstable_cache` as a
 * cache-key argument so editing holdings, currency, rebalancing, or benchmark settings
 * automatically invalidates its cached chart, without relying on remembering to bump a version
 * tag by hand.
 */
function presetHoldingsSignature(preset: PresetDefinition): string {
  const holdingsKey = preset.holdings.map((h) => `${h.ticker}:${h.weightPct}:${h.beta}`).join(',')
  return [
    holdingsKey,
    preset.extraCacheKeyTags.join(','),
    preset.benchmarkSymbol ?? '',
    preset.cadDenominated ? 'cad' : 'usd',
    preset.rebalanceSchedule,
  ].join('|')
}

/**
 * Single module-level unstable_cache wrapper. Next.js includes runtime arguments in the
 * cache key, so different (presetId, range, holdingsSignature) tuples are stored as distinct
 * entries. Defining it once at module scope avoids the source-location hash collision that
 * occurs when unstable_cache is called inside a function body on every invocation.
 */
const _cachedPresetChart = unstable_cache(
  async (presetId: string, range: YahooRange, _holdingsSignature: string) => {
    // The signature is intentionally an argument so it participates in the cache key.
    void _holdingsSignature
    const preset = mustPreset(presetId)
    return computePresetChart(preset, range)
  },
  ['preset-chart', 'chart-proxy-v22-pfae-130-30-full-capital'],
  { revalidate: DAY }
)

export function getCachedPresetChart1y(presetId: string) {
  const preset = mustPreset(presetId)
  return _cachedPresetChart(presetId, '1y', presetHoldingsSignature(preset))
}

export function getCachedPresetChartMax(presetId: string) {
  const preset = mustPreset(presetId)
  return _cachedPresetChart(presetId, 'max', presetHoldingsSignature(preset))
}

export function getCachedPresetChartForRange(presetId: string, range: YahooRange) {
  const preset = mustPreset(presetId)
  return _cachedPresetChart(presetId, range, presetHoldingsSignature(preset))
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
    benchmarkSymbol: preset.benchmarkSymbol,
    cadDenominated: preset.cadDenominated || undefined,
    rebalanceSchedule: preset.rebalanceSchedule,
  })
}

function mustPreset(presetId: string): PresetDefinition {
  const p = getPresetById(presetId)
  if (!p) throw new Error(`Unknown preset id: ${presetId}`)
  return p
}
