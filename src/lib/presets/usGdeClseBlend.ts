import type { PresetHolding } from './usInternational'

export const US_GDE_CLSE_BLEND_PRESET_ID = 'us-gde-clse-blend-v3'

export const usGdeClseBlendHoldings: PresetHolding[] = [
  {
    ticker: 'GDE',
    weightPct: 25,
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
    ticker: 'SSO',
    weightPct: 10,
    beta: 2,
    blurb: '2× daily S&P 500 leverage sleeve.',
  },
  {
    ticker: 'FLSP',
    weightPct: 10,
    beta: 0.45,
    blurb: 'Franklin systematic style premia sleeve.',
  },
  {
    ticker: 'VFLO',
    weightPct: 15,
    beta: 0.75,
    blurb: 'Large-cap free-cash-flow quality tilt.',
  },
  {
    ticker: 'SPMO',
    weightPct: 15,
    beta: 1.1,
    blurb: 'S&P 500 momentum factor.',
  },
]

export function usGdeClseBlendWeights(): number[] {
  return usGdeClseBlendHoldings.map((h) => h.weightPct / 100)
}

export function usGdeClseBlendSymbols(): string[] {
  return usGdeClseBlendHoldings.map((h) => h.ticker.toUpperCase())
}
