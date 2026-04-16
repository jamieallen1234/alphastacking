import type { PresetHolding } from './usInternational'

export const CA_USSL_QQQL_HDGE_PRESET_ID = 'ca-ussl-qqql-hdge-v2'

/** 60 / 15 / 25 buy-and-hold: levered US large-cap + NDX + low-beta hedge sleeve. */
export const caUsslQqqlHdgeHoldings: PresetHolding[] = [
  {
    ticker: 'USSL.TO',
    weightPct: 60,
    beta: 1.25,
    blurb:
      '1.25× S&P 500 (charts: 1.25× VFV.TO TR + Canadian borrow on extra 0.25× notional; same S&P proxy as benchmark).',
  },
  {
    ticker: 'HDGE.TO',
    weightPct: 25,
    beta: 0.18,
    blurb: 'Long/short equity, low beta (β ≈ 0.18).',
  },
  {
    ticker: 'QQQL.TO',
    weightPct: 15,
    beta: 1.25,
    blurb: '1.25× Nasdaq-100 (charts: 1.25× QQQ TR in CAD + Canadian borrow on extra 0.25× notional).',
  },
]

export function caUsslQqqlHdgeWeights(): number[] {
  return caUsslQqqlHdgeHoldings.map((h) => h.weightPct / 100)
}

export function caUsslQqqlHdgeSymbols(): string[] {
  return caUsslQqqlHdgeHoldings.map((h) => h.ticker.toUpperCase())
}
