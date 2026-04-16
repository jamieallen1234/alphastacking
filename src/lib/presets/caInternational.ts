import type { PresetHolding } from './usInternational'

export const CA_INTL_PRESET_ID = 'ca-intl-v6'

export const caInternationalHoldings: PresetHolding[] = [
  {
    ticker: 'SSO',
    weightPct: 30,
    beta: 2,
    blurb: '2× S&P 500 — US leveraged equity (CAD chart converts with USDCAD).',
  },
  {
    ticker: 'HDGE.TO',
    weightPct: 30,
    beta: 0.18,
    blurb: 'Long/short equity, beta neutral.',
  },
  {
    ticker: 'HEQL.TO',
    weightPct: 20,
    beta: 1.25,
    blurb: 'Global equity (~1.25× HEQT.TO–style; charts proxy pre-history vs HEQT.TO).',
  },
  {
    ticker: 'PFLS.TO',
    weightPct: 20,
    beta: 0.48,
    blurb: 'Long/short equity.',
  },
]

export function caInternationalWeights(): number[] {
  return caInternationalHoldings.map((h) => h.weightPct / 100)
}

export function caInternationalSymbols(): string[] {
  return caInternationalHoldings.map((h) => h.ticker.toUpperCase())
}
