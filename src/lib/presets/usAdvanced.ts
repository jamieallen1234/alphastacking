import type { PresetHolding } from './usInternational'

/** US Alpha Stack model (us-advanced preset) — LETF core, capital-efficient sleeve, alts; weights reset each January. */
export const US_ADVANCED_PRESET_ID = 'us-advanced-v1'

export const usAdvancedHoldings: PresetHolding[] = [
  {
    ticker: 'NTSD',
    weightPct: 10,
    beta: 1.6,
    blurb: '90/60 U.S. large-cap + EAFE-style intl (capital-efficient core).',
  },
  {
    ticker: 'UPRO',
    weightPct: 7.5,
    beta: 3,
    blurb: '3× daily S&P 500 (reset path risk).',
  },
  {
    ticker: 'SSO',
    weightPct: 12.5,
    beta: 2,
    blurb: '2× S&P 500 — leveraged core beta.',
  },
  {
    ticker: 'MATE',
    weightPct: 12.5,
    beta: 1,
    blurb: 'Managed futures sleeve (charts may proxy pre-history with RSST).',
  },
  {
    ticker: 'RSSY',
    weightPct: 5,
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
    weightPct: 7.5,
    beta: 0.6,
    blurb: 'U.S. long/short equity.',
  },
  {
    ticker: 'FLSP',
    weightPct: 12.5,
    beta: 0,
    blurb: 'Risk premia sleeve.',
  },
  {
    ticker: 'IALT',
    weightPct: 7.5,
    beta: 0.35,
    blurb: 'Multi-strategy alternatives sleeve.',
  },
  {
    ticker: 'HFGM',
    weightPct: 5,
    beta: 0.55,
    blurb: 'Global long/short equity (hand-authored page).',
  },
]

export function usAdvancedWeights(): number[] {
  return usAdvancedHoldings.map((h) => h.weightPct / 100)
}

export function usAdvancedSymbols(): string[] {
  return usAdvancedHoldings.map((h) => h.ticker.toUpperCase())
}
