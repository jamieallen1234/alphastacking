import type { PresetHolding } from './usInternational'

export const CA_CORE_BH_PRESET_ID = 'ca-core-bh-v2'

export const caCoreBuyHoldHoldings: PresetHolding[] = [
  {
    ticker: 'HEQL.TO',
    weightPct: 20,
    beta: 1.25,
    blurb: 'Global equity (~1.25× HEQT.TO–style; charts proxy pre-history vs HEQT.TO).',
  },
  {
    ticker: 'USSL.TO',
    weightPct: 20,
    beta: 1.25,
    blurb: '1.25× S&P 500 (charts: 1.25× HEQT.TO TR + Canadian borrow on extra 0.25× notional).',
  },
  {
    ticker: 'QQQL.TO',
    weightPct: 20,
    beta: 1.25,
    blurb: '1.25× Nasdaq-100 (charts: 1.25× QQQ TR in CAD + Canadian borrow on extra 0.25× notional).',
  },
  {
    ticker: 'PFLS.TO',
    weightPct: 20,
    beta: 0.48,
    blurb: 'Long/short equity.',
  },
  {
    ticker: 'ZLB.TO',
    weightPct: 20,
    beta: 0.63,
    blurb: 'BMO Low Volatility US Equity (CAD-hedged).',
  },
]

export function caCoreBuyHoldWeights(): number[] {
  return caCoreBuyHoldHoldings.map((h) => h.weightPct / 100)
}

export function caCoreBuyHoldSymbols(): string[] {
  return caCoreBuyHoldHoldings.map((h) => h.ticker.toUpperCase())
}
