import type { PresetHolding } from './usInternational'

export const CA_SSO_DGLM_RGBM_ARB_PRESET_ID = 'ca-sso-dglm-rgbm-arb-v3'

export const caSsoDglmRgbmArbHoldings: PresetHolding[] = [
  {
    ticker: 'SSO',
    weightPct: 35,
    beta: 2,
    blurb: '2x daily S&P 500 exposure for high-conviction U.S. beta.',
  },
  {
    ticker: 'RSSY',
    weightPct: 10,
    beta: 1,
    blurb: 'Return-stacked equity + managed futures sleeve.',
  },
  {
    ticker: 'MATE',
    weightPct: 10,
    beta: 1.6,
    blurb: 'Equity plus managed-futures stack (CAD-converted in chart pipeline).',
  },
  {
    ticker: 'DGLM.TO',
    weightPct: 10,
    beta: 0.35,
    blurb: 'Systematic global macro alternatives sleeve.',
  },
  {
    ticker: 'RGBM.TO',
    weightPct: 10,
    beta: 0.85,
    blurb: 'Return-stacked global balanced + macro sleeve.',
  },
  {
    ticker: 'ARB.TO',
    weightPct: 25,
    beta: 0.05,
    blurb: 'Event-driven merger/SPAC arbitrage diversifier.',
  },
]

export function caSsoDglmRgbmArbWeights(): number[] {
  return caSsoDglmRgbmArbHoldings.map((h) => h.weightPct / 100)
}

export function caSsoDglmRgbmArbSymbols(): string[] {
  return caSsoDglmRgbmArbHoldings.map((h) => h.ticker.toUpperCase())
}
