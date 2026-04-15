import type { PresetHolding } from './usInternational'

export const CA_INTL_PRESET_ID = 'ca-intl-v4'

export const caInternationalHoldings: PresetHolding[] = [
  {
    ticker: 'HEQL.TO',
    weightPct: 20,
    beta: 1.25,
    blurb: 'TSX-listed ~1.25× HEQT.TO–style core; listed Oct 12, 2023 (charts proxy pre-history vs HEQT.TO).',
  },
  {
    ticker: 'SSO',
    weightPct: 30,
    beta: 2,
    blurb: '2× S&P 500 — US leveraged equity (CAD chart converts with USDCAD).',
  },
  {
    ticker: 'PFLS.TO',
    weightPct: 20,
    beta: 0.48,
    blurb: 'TSX-listed alternative sleeve.',
  },
  {
    ticker: 'HDGE.TO',
    weightPct: 30,
    beta: 0.18,
    blurb: 'Global macro / hedge sleeve.',
  },
]

export function caInternationalWeights(): number[] {
  return caInternationalHoldings.map((h) => h.weightPct / 100)
}

export function caInternationalSymbols(): string[] {
  return caInternationalHoldings.map((h) => h.ticker.toUpperCase())
}
