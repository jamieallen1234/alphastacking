/** US international portfolio — weighted beta ≈ 1.0 */

export interface PresetHolding {
  ticker: string
  weightPct: number
  beta: number
  blurb: string
}

export const US_INTL_PRESET_ID = 'us-intl-v2'

export const usInternationalHoldings: PresetHolding[] = [
  {
    ticker: 'NTSD',
    weightPct: 15,
    beta: 1.6,
    blurb: '90/60 U.S. large-cap + EAFE-style intl (capital-efficient core sleeve).',
  },
  {
    ticker: 'SSO',
    weightPct: 20,
    beta: 2,
    blurb: '2× S&P 500 — leveraged core beta.',
  },
  {
    ticker: 'MATE',
    weightPct: 10,
    beta: 1,
    blurb: 'Managed futures sleeve (charts may proxy pre-history with RSST).',
  },
  {
    ticker: 'RSSY',
    weightPct: 10,
    beta: 1,
    blurb: 'Futures yield sleeve.',
  },
  {
    ticker: 'ORR',
    weightPct: 20,
    beta: 0.5,
    blurb: 'Lower-beta diversifier.',
  },
  {
    ticker: 'CLSE',
    weightPct: 10,
    beta: 0.6,
    blurb: 'US long/short equity.',
  },
  {
    ticker: 'FLSP',
    weightPct: 15,
    beta: 0,
    blurb: 'Risk premia sleeve.',
  },
]

export function usInternationalWeights(): number[] {
  return usInternationalHoldings.map((h) => h.weightPct / 100)
}

export function usInternationalSymbols(): string[] {
  return usInternationalHoldings.map((h) => h.ticker.toUpperCase())
}

/** Σ wᵢβᵢ with weights as fractions */
export function weightedBeta(holdings: PresetHolding[]): number {
  return holdings.reduce((s, h) => s + (h.weightPct / 100) * h.beta, 0)
}
