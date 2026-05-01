import type { PresetHolding } from './usInternational'

export const CA_CORE_BH_PRESET_ID = 'ca-core-bh-v6'

export const caCoreBuyHoldHoldings: PresetHolding[] = [
  {
    ticker: 'USSL.TO',
    weightPct: 35,
    beta: 1.25,
    blurb:
      '1.25× S&P 500 (charts: 1.25× VFV.TO TR + Canadian borrow on extra 0.25× notional; unhedged S&P proxy for this sleeve).',
  },
  {
    ticker: 'QQQL.TO',
    weightPct: 30,
    beta: 1.25,
    blurb: '1.25× Nasdaq-100 (charts: 1.25× QQQ TR in CAD + Canadian borrow on extra 0.25× notional).',
  },
  {
    ticker: 'ZLB.TO',
    weightPct: 20,
    beta: 0.63,
    blurb: 'BMO Low Volatility US Equity (CAD-hedged).',
  },
  {
    ticker: 'PFLS.TO',
    weightPct: 15,
    beta: 0.48,
    blurb: 'Long/short equity (~160% / ~100% gross).',
  },
]

export function caCoreBuyHoldWeights(): number[] {
  return caCoreBuyHoldHoldings.map((h) => h.weightPct / 100)
}

export function caCoreBuyHoldSymbols(): string[] {
  return caCoreBuyHoldHoldings.map((h) => h.ticker.toUpperCase())
}
