import type { PresetHolding } from './usInternational'

export const CA_INTL_PRESET_ID = 'ca-intl-v10'

export const caInternationalHoldings: PresetHolding[] = [
  {
    ticker: 'SSO',
    weightPct: 20,
    beta: 2,
    blurb: '2× S&P 500 — US leveraged equity',
  },
  {
    ticker: 'HEQL.TO',
    weightPct: 10,
    beta: 1.25,
    blurb: '1.25× Global equity',
  },
  {
    ticker: 'QLD',
    weightPct: 10,
    beta: 2,
    blurb: '2× Nasdaq-100 leveraged equity.',
  },
  {
    ticker: 'HDGE.TO',
    weightPct: 15,
    beta: 0.5,
    blurb: 'Long/short equity (~110% / ~50% gross).',
  },
  {
    ticker: 'PFLS.TO',
    weightPct: 15,
    beta: 0.48,
    blurb: 'Long/short equity (~160% / ~100% gross).',
  },
  {
    ticker: 'PFMN.TO',
    weightPct: 15,
    beta: 0.12,
    blurb: 'Market-neutral long/short equity.',
  },
  {
    ticker: 'ATSX.TO',
    weightPct: 15,
    beta: 0.8,
    blurb: '150/50 Canadian long/short equity (TSX 60).',
  },
]

export function caInternationalWeights(): number[] {
  return caInternationalHoldings.map((h) => h.weightPct / 100)
}

export function caInternationalSymbols(): string[] {
  return caInternationalHoldings.map((h) => h.ticker.toUpperCase())
}
