import type { PresetHolding } from './usInternational'

export const US_GDE_CLSE_BLEND_PRESET_ID = 'us-gde-clse-blend-v1'

export const usGdeClseBlendHoldings: PresetHolding[] = [
  {
    ticker: 'GDE',
    weightPct: 20,
    beta: 1.02,
    blurb: 'Capital-efficient U.S. equity plus gold futures overlay.',
  },
  {
    ticker: 'CLSE',
    weightPct: 25,
    beta: 0.6,
    blurb: 'U.S. long/short equity diversifier.',
  },
  {
    ticker: 'QLD',
    weightPct: 15,
    beta: 2,
    blurb: '2x daily Nasdaq-100 leverage sleeve.',
  },
  {
    ticker: 'MRGR',
    weightPct: 10,
    beta: 0.4,
    blurb: 'Merger arbitrage sleeve.',
  },
  {
    ticker: 'RSSY',
    weightPct: 20,
    beta: 1,
    blurb: 'U.S. stocks plus futures yield return-stacked sleeve.',
  },
  {
    ticker: 'VFLO',
    weightPct: 10,
    beta: 0.75,
    blurb: 'Large-cap free-cash-flow quality tilt.',
  },
]

export function usGdeClseBlendWeights(): number[] {
  return usGdeClseBlendHoldings.map((h) => h.weightPct / 100)
}

export function usGdeClseBlendSymbols(): string[] {
  return usGdeClseBlendHoldings.map((h) => h.ticker.toUpperCase())
}
