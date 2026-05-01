import type { PresetHolding } from './usInternational'

export const CA_USSL_QQQL_HDGE_PRESET_ID = 'ca-ussl-qqql-hdge-v3'

/** 50 / 25 / 15 / 10 buy-and-hold: levered US large-cap + NDX + Canadian long/short sleeves. */
export const caUsslQqqlHdgeHoldings: PresetHolding[] = [
  {
    ticker: 'USSL.TO',
    weightPct: 50,
    beta: 1.25,
    blurb:
      '1.25× S&P 500 (charts: 1.25× VFV.TO TR + Canadian borrow on extra 0.25× notional; unhedged S&P proxy for this sleeve).',
  },
  {
    ticker: 'QQQL.TO',
    weightPct: 25,
    beta: 1.25,
    blurb: '1.25× Nasdaq-100 (charts: 1.25× QQQ TR in CAD + Canadian borrow on extra 0.25× notional).',
  },
  {
    ticker: 'PFLS.TO',
    weightPct: 15,
    beta: 0.48,
    blurb: 'Long/short equity (~160% / ~100% gross).',
  },
  {
    ticker: 'ATSX.TO',
    weightPct: 10,
    beta: 0.8,
    blurb: '150/50 Canadian long/short equity (TSX 60).',
  },
]

export function caUsslQqqlHdgeWeights(): number[] {
  return caUsslQqqlHdgeHoldings.map((h) => h.weightPct / 100)
}

export function caUsslQqqlHdgeSymbols(): string[] {
  return caUsslQqqlHdgeHoldings.map((h) => h.ticker.toUpperCase())
}
