import type { PresetHolding } from './usInternational'

export const US_CORE_BH_PRESET_ID = 'us-core-bh-v2'

export const usCoreBuyHoldHoldings: PresetHolding[] = [
  {
    ticker: 'VFLO',
    weightPct: 20,
    beta: 0.75,
    blurb: 'US large-cap cash cows (VictoryShares).',
  },
  {
    ticker: 'AVUV',
    weightPct: 20,
    beta: 1.15,
    blurb: 'US small-cap value (Avantis).',
  },
  {
    ticker: 'QQQ',
    weightPct: 30,
    beta: 1.05,
    blurb: 'Nasdaq-100 exposure.',
  },
  {
    ticker: 'SPMO',
    weightPct: 30,
    beta: 1.1,
    blurb: 'S&P 500 momentum factor.',
  },
]

export function usCoreBuyHoldWeights(): number[] {
  return usCoreBuyHoldHoldings.map((h) => h.weightPct / 100)
}

export function usCoreBuyHoldSymbols(): string[] {
  return usCoreBuyHoldHoldings.map((h) => h.ticker.toUpperCase())
}
