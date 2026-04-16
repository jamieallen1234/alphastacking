import type { PresetHolding } from './usInternational'

export const CA_CORE_BH_PRESET_ID = 'ca-core-bh-v5'

export const caCoreBuyHoldHoldings: PresetHolding[] = [
  {
    ticker: 'USSL.TO',
    weightPct: 30,
    beta: 1.25,
    blurb:
      '1.25× S&P 500 (charts: 1.25× VFV.TO TR + Canadian borrow on extra 0.25× notional; same S&P proxy as benchmark).',
  },
  {
    ticker: 'QQQL.TO',
    weightPct: 30,
    beta: 1.25,
    blurb: '1.25× Nasdaq-100 (charts: 1.25× QQQ TR in CAD + Canadian borrow on extra 0.25× notional).',
  },
  {
    ticker: 'ZLB.TO',
    weightPct: 25,
    beta: 0.63,
    blurb: 'BMO Low Volatility US Equity (CAD-hedged).',
  },
  {
    ticker: 'PFLS.TO',
    weightPct: 15,
    beta: 0.48,
    blurb: 'Long/short equity.',
  },
]

export function caCoreBuyHoldWeights(): number[] {
  return caCoreBuyHoldHoldings.map((h) => h.weightPct / 100)
}

export function caCoreBuyHoldSymbols(): string[] {
  return caCoreBuyHoldHoldings.map((h) => h.ticker.toUpperCase())
}
