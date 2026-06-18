import type { PriceSeries } from '@/lib/yahooFinance'

/** Each holding row for preset portfolios. Shared across all preset files. */
export interface PresetHolding {
  ticker: string
  weightPct: number
  beta: number
  blurb: string
}

export type RebalanceSchedule = 'none' | 'quarterly' | 'annual'

export interface PresetDefinition {
  id: string
  region: 'us' | 'ca'
  /** When true, NAV is reported in CAD (uses CAD/USD conversion for US-denominated sleeves). */
  cadDenominated: boolean
  rebalanceSchedule: RebalanceSchedule
  holdings: PresetHolding[]
  /** Per-preset stable cache invariants (e.g. synthetic-series version, proxy notes). */
  extraCacheKeyTags: readonly string[]
}

/** Σ wᵢβᵢ with weights as fractions */
export function weightedBeta(holdings: PresetHolding[]): number {
  return holdings.reduce((s, h) => s + (h.weightPct / 100) * h.beta, 0)
}

export function presetSymbols(p: PresetDefinition): string[] {
  return p.holdings.map((h) => h.ticker.toUpperCase())
}

export function presetWeights(p: PresetDefinition): number[] {
  return p.holdings.map((h) => h.weightPct / 100)
}

// -------------------- Preset IDs --------------------
export const US_5_4_3_2_1_PRESET_ID = 'us-5-4-3-2-1-v6'
export const US_UPRO_PREMIA_STACK_PRESET_ID = 'us-upro-premia-stack-v1'
export const US_INTL_PRESET_ID = 'us-intl-v2'
export const US_ADVANCED_PRESET_ID = 'us-advanced-v1'
export const US_CORE_BH_PRESET_ID = 'us-core-bh-v4'
export const US_GDE_CLSE_BLEND_PRESET_ID = 'us-gde-clse-blend-v3'
export const CA_INTL_PRESET_ID = 'ca-intl-v10'
export const CA_CORE_BH_PRESET_ID = 'ca-core-bh-v6'
export const CA_USSL_QQQL_HDGE_PRESET_ID = 'ca-ussl-qqql-hdge-v3'
export const CA_SSO_DGLM_RGBM_ARB_PRESET_ID = 'ca-sso-dglm-rgbm-arb-v3'
export const US_ALPHA_STACK_PRESET_ID = 'us-alpha-stack-v2'
export const CA_ALPHA_STACK_PRESET_ID = 'ca-alpha-stack-v6'
export const CA_FACTOR_FCMO_PRESET_ID = 'ca-factor-fcmo-v2'
export const US_RISK_PARITY_PRESET_ID = 'us-risk-parity-v4'
export const US_LONG_SHORT_EQUITY_PRESET_ID = 'us-long-short-equity-v1'
export const US_LETF_STACK_2X_PRESET_ID = 'us-letf-stack-2x-v1'
export const US_LETF_STACK_3X_PRESET_ID = 'us-letf-stack-3x-v1'
export const US_FOUR_ALPHA_QUADRANTS_PRESET_ID = 'us-four-alpha-quadrants-v1'
export const CA_FOUR_ALPHA_QUADRANTS_PRESET_ID = 'ca-four-alpha-quadrants-v1'

// -------------------- Holdings --------------------
export const usInternationalHoldings: PresetHolding[] = [
  { ticker: 'ORR', weightPct: 20, beta: 0.5, blurb: 'Lower-beta diversifier.' },
  { ticker: 'SSO', weightPct: 20, beta: 2, blurb: '2× S&P 500 — leveraged core beta.' },
  { ticker: 'FLSP', weightPct: 15, beta: 0, blurb: 'Risk premia sleeve.' },
  { ticker: 'NTSD', weightPct: 15, beta: 1.6, blurb: '90/60 U.S. large-cap + EAFE-style intl (capital-efficient core sleeve).' },
  { ticker: 'CLSE', weightPct: 10, beta: 0.6, blurb: 'US long/short equity.' },
  { ticker: 'MATE', weightPct: 10, beta: 1, blurb: 'Managed futures sleeve (charts may proxy pre-history with RSST).' },
  { ticker: 'RSSY', weightPct: 10, beta: 1, blurb: 'Futures yield sleeve.' },
]

export const usAdvancedHoldings: PresetHolding[] = [
  { ticker: 'NTSD', weightPct: 10, beta: 1.6, blurb: '90/60 U.S. large-cap + EAFE-style intl (capital-efficient core).' },
  { ticker: 'UPRO', weightPct: 7.5, beta: 3, blurb: '3× daily S&P 500 (reset path risk).' },
  { ticker: 'SSO', weightPct: 12.5, beta: 2, blurb: '2× S&P 500 — leveraged core beta.' },
  { ticker: 'MATE', weightPct: 12.5, beta: 1, blurb: 'Managed futures sleeve (charts may proxy pre-history with RSST).' },
  { ticker: 'RSSY', weightPct: 5, beta: 1, blurb: 'Futures yield sleeve.' },
  { ticker: 'ORR', weightPct: 20, beta: 0.5, blurb: 'Lower-beta diversifier.' },
  { ticker: 'CLSE', weightPct: 7.5, beta: 0.6, blurb: 'U.S. long/short equity.' },
  { ticker: 'FLSP', weightPct: 12.5, beta: 0, blurb: 'Risk premia sleeve.' },
  { ticker: 'IALT', weightPct: 12.5, beta: 0.35, blurb: 'Multi-strategy alternatives sleeve.' },
]

export const usCoreBuyHoldHoldings: PresetHolding[] = [
  { ticker: 'VFLO', weightPct: 20, beta: 0.75, blurb: 'US large-cap cash cows (VictoryShares).' },
  { ticker: 'CLSE', weightPct: 20, beta: 0.6, blurb: 'Net-long US long/short equity sleeve (Convergence).' },
  { ticker: 'QQQ', weightPct: 30, beta: 1.05, blurb: 'Nasdaq-100 exposure.' },
  { ticker: 'SPMO', weightPct: 30, beta: 1.1, blurb: 'S&P 500 momentum factor.' },
]

export const usGdeClseBlendHoldings: PresetHolding[] = [
  { ticker: 'GDE', weightPct: 25, beta: 1.02, blurb: 'Capital-efficient U.S. equity plus gold futures overlay.' },
  { ticker: 'CLSE', weightPct: 25, beta: 0.6, blurb: 'U.S. long/short equity diversifier.' },
  { ticker: 'SSO', weightPct: 10, beta: 2, blurb: '2× daily S&P 500 leverage sleeve.' },
  { ticker: 'FLSP', weightPct: 10, beta: 0.45, blurb: 'Franklin systematic style premia sleeve.' },
  { ticker: 'VFLO', weightPct: 15, beta: 0.75, blurb: 'Large-cap free-cash-flow quality tilt.' },
  { ticker: 'SPMO', weightPct: 15, beta: 1.1, blurb: 'S&P 500 momentum factor.' },
]

export const caInternationalHoldings: PresetHolding[] = [
  { ticker: 'SSO', weightPct: 20, beta: 2, blurb: '2× S&P 500 — US leveraged equity' },
  { ticker: 'HEQL.TO', weightPct: 10, beta: 1.25, blurb: '1.25× Global equity' },
  { ticker: 'QLD', weightPct: 10, beta: 2, blurb: '2× Nasdaq-100 leveraged equity.' },
  { ticker: 'HDGE.TO', weightPct: 15, beta: 0.5, blurb: 'Long/short equity (~110% / ~50% gross).' },
  { ticker: 'PFLS.TO', weightPct: 15, beta: 0.48, blurb: 'Long/short equity (~160% / ~100% gross).' },
  { ticker: 'PFMN.TO', weightPct: 15, beta: 0.12, blurb: 'Market-neutral long/short equity.' },
  { ticker: 'ATSX.TO', weightPct: 15, beta: 0.8, blurb: '150/50 Canadian long/short equity (TSX 60).' },
]

export const caCoreBuyHoldHoldings: PresetHolding[] = [
  { ticker: 'USSL.TO', weightPct: 35, beta: 1.25, blurb: '1.25× S&P 500 (charts: 1.25× VFV.TO TR + Canadian borrow on extra 0.25× notional; unhedged S&P proxy for this sleeve).' },
  { ticker: 'QQQL.TO', weightPct: 30, beta: 1.25, blurb: '1.25× Nasdaq-100 (charts: 1.25× QQQ TR in CAD + Canadian borrow on extra 0.25× notional).' },
  { ticker: 'ZLB.TO', weightPct: 20, beta: 0.63, blurb: 'BMO Low Volatility US Equity (CAD-hedged).' },
  { ticker: 'PFLS.TO', weightPct: 15, beta: 0.48, blurb: 'Long/short equity (~160% / ~100% gross).' },
]

/** 30 / 25 / 25 / 20 buy-and-hold: CAD momentum + Nasdaq growth + Canadian low-vol + US small-cap value. 60% growth, 40% value. */
export const caFactorFcmoHoldings: PresetHolding[] = [
  { ticker: 'FCMO.TO', weightPct: 30, beta: 1.0, blurb: 'Fidelity U.S. Momentum ETF — 100-stock U.S. large-cap momentum factor, quarterly rebalanced.' },
  { ticker: 'QQQL.TO', weightPct: 25, beta: 1.25, blurb: '1.25× Nasdaq-100 (charts: 1.25× QQQ TR in CAD + Canadian borrow on extra 0.25× notional).' },
  { ticker: 'ZLB.TO', weightPct: 25, beta: 0.63, blurb: 'BMO Low Volatility US Equity (CAD-hedged) — defensive low-beta anchor.' },
  { ticker: 'VFLO', weightPct: 20, beta: 0.75, blurb: 'Large-cap free-cash-flow quality tilt — value factor via high-FCF yield selection.' },
]

/** 50 / 25 / 15 / 10 buy-and-hold: levered US large-cap + NDX + Canadian long/short sleeves. */
export const caUsslQqqlHdgeHoldings: PresetHolding[] = [
  { ticker: 'USSL.TO', weightPct: 50, beta: 1.25, blurb: '1.25× S&P 500 (charts: 1.25× VFV.TO TR + Canadian borrow on extra 0.25× notional; unhedged S&P proxy for this sleeve).' },
  { ticker: 'QQQL.TO', weightPct: 25, beta: 1.25, blurb: '1.25× Nasdaq-100 (charts: 1.25× QQQ TR in CAD + Canadian borrow on extra 0.25× notional).' },
  { ticker: 'PFLS.TO', weightPct: 15, beta: 0.48, blurb: 'Long/short equity (~160% / ~100% gross).' },
  { ticker: 'ATSX.TO', weightPct: 10, beta: 0.8, blurb: '150/50 Canadian long/short equity (TSX 60).' },
]

/** 25 / 20 / 15 / 10 / 10 / 10 / 10 annual-rebalance: momentum + 2x S&P lever + managed futures + alts + FCF quality + futures yield + long/short buffer. Weighted beta ~0.96. */
export const usAlphaStackHoldings: PresetHolding[] = [
  { ticker: 'SPMO', weightPct: 25, beta: 1.1, blurb: 'S&P 500 momentum factor.' },
  { ticker: 'MATE', weightPct: 20, beta: 1, blurb: 'Return-stacked 100% S&P 500 + 100% managed futures.' },
  { ticker: 'IALT', weightPct: 15, beta: 0.35, blurb: 'Systematic multi-strategy alternatives sleeve.' },
  { ticker: 'SSO', weightPct: 10, beta: 2, blurb: '2x S&P 500 — leveraged beta sleeve.' },
  { ticker: 'VFLO', weightPct: 10, beta: 0.75, blurb: 'Large-cap free-cash-flow quality tilt.' },
  { ticker: 'RSSY', weightPct: 10, beta: 1, blurb: 'Return-stacked equity + systematic futures yield sleeve.' },
  { ticker: 'CLSE', weightPct: 10, beta: 0.6, blurb: 'US long/short equity drawdown buffer.' },
]

/** 34 / 33 / 33 annual-rebalance: 3x S&P core offset by systematic long/short and EM carry premia sleeves. */
export const uproPremaStackHoldings: PresetHolding[] = [
  { ticker: 'UPRO', weightPct: 34, beta: 3, blurb: '3x daily S&P 500 — high-conviction leveraged core.' },
  { ticker: 'FLSP', weightPct: 33, beta: 0, blurb: 'Systematic long/short equity and style premia sleeve.' },
  { ticker: 'FOXY', weightPct: 33, beta: 0.05, blurb: 'Systematic EM carry + G10 mean-reversion currency sleeve.' },
]

/** 45 / 25 / 20 / 10 annual-rebalance: USSL + QQQL leveraged core + managed futures + market-neutral. Weighted beta ~0.96. */
export const caAlphaStackHoldings: PresetHolding[] = [
  { ticker: 'USSL.TO', weightPct: 45, beta: 1.25, blurb: '1.25x S&P 500 (proxied via 1.25x VFV.TO in CAD).' },
  { ticker: 'QQQL.TO', weightPct: 25, beta: 1.25, blurb: '1.25x Nasdaq-100 — tech growth tilt alongside S&P 500 core.' },
  { ticker: 'DGLM.TO', weightPct: 20, beta: 0.35, blurb: 'Systematic global macro managed futures sleeve.' },
  { ticker: 'PFMN.TO', weightPct: 10, beta: 0.12, blurb: 'Market-neutral long/short equity.' },
]

/** 35 / 25 / 20 / 15 / 5 quarterly-rebalance: one holding per macro environment. Weighted beta ~0.83. */
export const us54321Holdings: PresetHolding[] = [
  { ticker: 'RSST', weightPct: 35, beta: 1.0, blurb: 'Return-stacked 100% S&P 500 + 100% managed futures (Growth environment engine).' },
  { ticker: 'GDE', weightPct: 25, beta: 1.02, blurb: 'Capital-efficient US equity plus gold futures overlay (Inflation hedge).' },
  { ticker: 'RSSB', weightPct: 20, beta: 0.80, blurb: 'Return-stacked global stocks + US Treasury bond overlay (Recession ballast).' },
  { ticker: 'CLSE', weightPct: 15, beta: 0.60, blurb: 'US long/short equity (choppy/sideways environment sleeve).' },
  { ticker: 'ZROZ', weightPct: 5, beta: -0.35, blurb: '25+ year zero-coupon Treasuries — extreme duration hyper-ballast (deflation spike).' },
]

/** 55 / 15 / 15 / 15 annual-rebalance: 2x S&P 500 leveraged core with long-duration bond ballast, managed futures, and gold. Weighted beta ~1.06. */
export const usLetfStack2xHoldings: PresetHolding[] = [
  { ticker: 'SSO', weightPct: 55, beta: 2, blurb: '2x daily S&P 500 — the leveraged equity core driving amplified growth returns.' },
  { ticker: 'ZROZ', weightPct: 15, beta: -0.35, blurb: '25+ year zero-coupon Treasuries — long-duration counterweight that spikes in drawdowns and deflation.' },
  { ticker: 'DBMF', weightPct: 15, beta: 0.05, blurb: 'iMGP managed futures — trend-following CTA that tends flat-to-positive in sustained equity drawdowns.' },
  { ticker: 'GLD', weightPct: 15, beta: 0.05, blurb: 'SPDR Gold Shares — inflation and real-asset hedge with near-zero equity correlation.' },
]

/** 40 / 20 / 20 / 20 annual-rebalance: 3x S&P 500 leveraged core with long-duration bond ballast, managed futures, and gold. Weighted beta ~1.15. */
export const usLetfStack3xHoldings: PresetHolding[] = [
  { ticker: 'UPRO', weightPct: 40, beta: 3, blurb: '3x daily S&P 500 — the high-conviction leveraged equity core.' },
  { ticker: 'ZROZ', weightPct: 20, beta: -0.35, blurb: '25+ year zero-coupon Treasuries — long-duration counterweight that spikes in drawdowns and deflation.' },
  { ticker: 'DBMF', weightPct: 20, beta: 0.05, blurb: 'iMGP managed futures — trend-following CTA that tends flat-to-positive in sustained equity drawdowns.' },
  { ticker: 'GLD', weightPct: 20, beta: 0.05, blurb: 'SPDR Gold Shares — inflation and real-asset hedge with near-zero equity correlation.' },
]

/** 25 / 25 / 20 / 15 / 5 / 5 / 5 buy-and-hold: net-long L/S equity core with capital-efficient international equity overlay and cross-asset diversifiers. Weighted beta ~0.82. */
export const usLongShortEquityHoldings: PresetHolding[] = [
  { ticker: 'CLSE', weightPct: 25, beta: 0.6, blurb: 'Convergence US net-long L/S equity (~110% long / 60% short gross) — systematic US long/short core.' },
  { ticker: 'NTSD', weightPct: 25, beta: 1.6, blurb: '90/60 U.S. large-cap + developed international equity overlay — adds regional equity breadth to the long book.' },
  { ticker: 'WTLS', weightPct: 20, beta: 0.85, blurb: 'WisdomTree 90% U.S. large-cap + 90% ML-driven L/S overlay — capital-efficient L/S in one wrapper.' },
  { ticker: 'ORR', weightPct: 15, beta: 0.55, blurb: 'Militia global L/S equity — fundamental stock selection across regions as the international L/S complement.' },
  { ticker: 'DBMF', weightPct: 5, beta: 0.05, blurb: 'iMGP managed futures — long/short across rates, currencies, and commodities as a cross-asset diversifier.' },
  { ticker: 'HARD', weightPct: 5, beta: 0.2, blurb: 'Simplify systematic L/S commodity futures — commodity long/short sleeve.' },
  { ticker: 'FOXY', weightPct: 5, beta: 0.05, blurb: 'Rareview currency carry and mean-reversion — uncorrelated FX alpha source.' },
]

/** 40 / 20 / 15 / 15 / 10 buy-and-hold: equity-heavy all-weather via return-stacked capital-efficient wrappers. Weighted beta ~0.946. */
export const usRiskParityHoldings: PresetHolding[] = [
  { ticker: 'NTSD', weightPct: 40, beta: 1.6, blurb: '90/60 U.S. large-cap + developed international equity overlay — primary equity engine stacking two regional sleeves per dollar.' },
  { ticker: 'NTSX', weightPct: 20, beta: 0.9, blurb: '90/60 U.S. equity + mid-duration Treasuries — growth/recession balance with a built-in bond cushion.' },
  { ticker: 'GDT', weightPct: 15, beta: 0.05, blurb: '90/90 TIPS + gold — explicit inflation protection covering both real rates and monetary inflation.' },
  { ticker: 'GDE', weightPct: 15, beta: 1.02, blurb: '80/80 U.S. equity + gold overlay — inflation and real-asset hedge alongside equity growth.' },
  { ticker: 'ZROZ', weightPct: 10, beta: -0.35, blurb: '25+ year zero-coupon Treasuries — maximum-duration deflation ballast.' },
]

export const caSsoDglmRgbmArbHoldings: PresetHolding[] = [
  { ticker: 'SSO', weightPct: 35, beta: 2, blurb: '2x daily S&P 500 exposure for high-conviction U.S. beta.' },
  { ticker: 'RSSY', weightPct: 10, beta: 1, blurb: 'Return-stacked equity + managed futures sleeve.' },
  { ticker: 'MATE', weightPct: 10, beta: 1.6, blurb: 'Return-stacked 100% S&P 500 + 100% managed futures.' },
  { ticker: 'DGLM.TO', weightPct: 10, beta: 0.35, blurb: 'Systematic global macro alternatives sleeve.' },
  { ticker: 'RGBM.TO', weightPct: 10, beta: 0.85, blurb: 'Return-stacked global balanced + macro sleeve.' },
  { ticker: 'ARB.TO', weightPct: 25, beta: 0.05, blurb: 'Event-driven merger/SPAC arbitrage diversifier.' },
]

/**
 * 4 Alpha Quadrants (US), annual rebalance: four 25% sleeves, each pairing a shared
 * growth-beta engine with a distinct alpha source. Weighted beta ~0.99.
 */
export const usFourAlphaQuadrantsHoldings: PresetHolding[] = [
  { ticker: 'CLSE', weightPct: 17.5, beta: 0.6, blurb: '[Alpha] US long/short equity, security selection and dispersion, low-net-correlation drawdown buffer.' },
  { ticker: 'SSO', weightPct: 7.5, beta: 2, blurb: '[Growth] 2x S&P 500, leveraged beta paired with the long/short alpha sleeve.' },
  { ticker: 'SPMO', weightPct: 15, beta: 1.1, blurb: '[Growth] S&P 500 momentum factor, equity growth engine for this quadrant.' },
  { ticker: 'VFLO', weightPct: 10, beta: 0.75, blurb: '[Alpha] Large-cap free-cash-flow value tilt, factor-premia alpha alongside momentum.' },
  { ticker: 'UPRO', weightPct: 7, beta: 3, blurb: '[Growth] 3x S&P 500, high-conviction leveraged beta paired with the systematic premia sleeve.' },
  { ticker: 'FLSP', weightPct: 9, beta: 0, blurb: '[Alpha] Systematic long/short equity and style premia sleeve.' },
  { ticker: 'IALT', weightPct: 9, beta: 0.35, blurb: '[Alpha] Systematic multi-strategy alternatives sleeve, carry and premia complement to FLSP.' },
  { ticker: 'MATE', weightPct: 25, beta: 1, blurb: '[Growth + Alpha] Return-stacked 100% S&P 500 + 100% managed futures, growth core and trend-following alpha in one fund.' },
]

/**
 * 4 Alpha Quadrants (Canada), annual rebalance, CAD-denominated: four 25% sleeves using
 * Canadian-listed funds for momentum, plus US-listed long/short, value, and leveraged sleeves
 * converted to CAD. Weighted beta ~0.99.
 */
export const caFourAlphaQuadrantsHoldings: PresetHolding[] = [
  { ticker: 'CLSE', weightPct: 16, beta: 0.6, blurb: '[Alpha] US long/short equity, security selection and dispersion, low-net-correlation drawdown buffer.' },
  { ticker: 'SSO', weightPct: 9, beta: 2, blurb: '[Growth] 2x S&P 500, leveraged beta paired with the long/short alpha sleeve.' },
  { ticker: 'FCMO.TO', weightPct: 18, beta: 1.0, blurb: '[Growth] Fidelity U.S. Momentum ETF, Canadian-listed momentum growth engine for this quadrant.' },
  { ticker: 'VFLO', weightPct: 7, beta: 0.75, blurb: '[Alpha] Large-cap free-cash-flow value tilt, factor-premia alpha alongside momentum.' },
  { ticker: 'UPRO', weightPct: 7.5, beta: 3, blurb: '[Growth] 3x S&P 500, high-conviction leveraged beta paired with the systematic premia sleeves.' },
  { ticker: 'FLSP', weightPct: 9, beta: 0, blurb: '[Alpha] Systematic long/short equity and style premia sleeve.' },
  { ticker: 'PFMN.TO', weightPct: 8.5, beta: 0.12, blurb: '[Alpha] Market-neutral long/short equity, beta-neutral premia complement to FLSP.' },
  { ticker: 'MATE', weightPct: 25, beta: 1, blurb: '[Growth + Alpha] Return-stacked 100% S&P 500 + 100% managed futures, growth core and trend-following alpha in one fund.' },
]

// -------------------- Registry --------------------
export const PRESET_DEFINITIONS: PresetDefinition[] = [
  {
    id: US_5_4_3_2_1_PRESET_ID,
    region: 'us',
    cadDenominated: false,
    rebalanceSchedule: 'quarterly',
    holdings: us54321Holdings,
    extraCacheKeyTags: ['quarterly-rebal', 'rsst-gde-rssb-clse-zroz-v6', 'rssb-vt-agg-proxy-v1', 'rsst-spy-mf-proxy-v1'],
  },
  {
    id: US_UPRO_PREMIA_STACK_PRESET_ID,
    region: 'us',
    cadDenominated: false,
    rebalanceSchedule: 'annual',
    holdings: uproPremaStackHoldings,
    extraCacheKeyTags: ['annual-rebal', 'upro-flsp-foxy-v1'],
  },
  {
    id: US_INTL_PRESET_ID,
    region: 'us',
    cadDenominated: false,
    rebalanceSchedule: 'annual',
    holdings: usInternationalHoldings,
    extraCacheKeyTags: ['synth-heql-mate-v1', 'annual-rebal'],
  },
  {
    id: US_ADVANCED_PRESET_ID,
    region: 'us',
    cadDenominated: false,
    rebalanceSchedule: 'annual',
    holdings: usAdvancedHoldings,
    extraCacheKeyTags: ['annual-rebal', 'upro-sso-mate-ntsd'],
  },
  {
    id: US_CORE_BH_PRESET_ID,
    region: 'us',
    cadDenominated: false,
    rebalanceSchedule: 'none',
    holdings: usCoreBuyHoldHoldings,
    extraCacheKeyTags: ['buy-hold'],
  },
  {
    id: US_GDE_CLSE_BLEND_PRESET_ID,
    region: 'us',
    cadDenominated: false,
    rebalanceSchedule: 'none',
    holdings: usGdeClseBlendHoldings,
    extraCacheKeyTags: ['buy-hold', 'gde-clse-sso-flsp-vflo-spmo-v3'],
  },
  {
    id: CA_INTL_PRESET_ID,
    region: 'ca',
    cadDenominated: false,
    rebalanceSchedule: 'annual',
    holdings: caInternationalHoldings,
    extraCacheKeyTags: [
      'synth-heql-inception-2023-10-12',
      'cad-xsp-bench-vfv-ussl-proxy',
      'heql-cad-fin-v2',
      'annual-rebal',
      'cad-levered-125-footnote',
    ],
  },
  {
    id: CA_CORE_BH_PRESET_ID,
    region: 'ca',
    cadDenominated: false,
    rebalanceSchedule: 'none',
    holdings: caCoreBuyHoldHoldings,
    extraCacheKeyTags: [
      'cad-xsp-bench-vfv-ussl-proxy',
      'heql-cad-fin-v2',
      'buy-hold',
      'ussl-qqql-cad125-synth',
      'core-30-30-15-25',
    ],
  },
  {
    id: CA_FACTOR_FCMO_PRESET_ID,
    region: 'ca',
    cadDenominated: false,
    rebalanceSchedule: 'none',
    holdings: caFactorFcmoHoldings,
    extraCacheKeyTags: ['buy-hold', 'fcmo-qqql-zlb-vflo-v1'],
  },
  {
    id: CA_USSL_QQQL_HDGE_PRESET_ID,
    region: 'ca',
    cadDenominated: false,
    rebalanceSchedule: 'none',
    holdings: caUsslQqqlHdgeHoldings,
    extraCacheKeyTags: ['cad-xsp-bench-vfv-ussl-proxy', 'buy-hold', 'ussl-qqql-hdge-60-15-25'],
  },
  {
    id: US_ALPHA_STACK_PRESET_ID,
    region: 'us',
    cadDenominated: false,
    rebalanceSchedule: 'annual',
    holdings: usAlphaStackHoldings,
    extraCacheKeyTags: ['annual-rebal', 'spmo-mate-ialt-sso-vflo-rssy-clse-v4', 'mate-kmlm-chain-v1'],
  },
  {
    id: CA_ALPHA_STACK_PRESET_ID,
    region: 'ca',
    cadDenominated: false,
    rebalanceSchedule: 'annual',
    holdings: caAlphaStackHoldings,
    extraCacheKeyTags: ['cad-xsp-bench-vfv-ussl-proxy', 'annual-rebal', 'ussl-qqql-dglm-pfmn-v1'],
  },
  {
    id: US_LETF_STACK_2X_PRESET_ID,
    region: 'us',
    cadDenominated: false,
    rebalanceSchedule: 'annual',
    holdings: usLetfStack2xHoldings,
    extraCacheKeyTags: ['annual-rebal', 'sso-zroz-dbmf-gld-v1'],
  },
  {
    id: US_LETF_STACK_3X_PRESET_ID,
    region: 'us',
    cadDenominated: false,
    rebalanceSchedule: 'annual',
    holdings: usLetfStack3xHoldings,
    extraCacheKeyTags: ['annual-rebal', 'upro-zroz-dbmf-gld-v1'],
  },
  {
    id: US_LONG_SHORT_EQUITY_PRESET_ID,
    region: 'us',
    cadDenominated: false,
    rebalanceSchedule: 'none',
    holdings: usLongShortEquityHoldings,
    extraCacheKeyTags: ['buy-hold', 'clse-ntsd-wtls-orr-dbmf-hard-foxy-v1'],
  },
  {
    id: US_RISK_PARITY_PRESET_ID,
    region: 'us',
    cadDenominated: false,
    rebalanceSchedule: 'none',
    holdings: usRiskParityHoldings,
    extraCacheKeyTags: ['buy-hold', 'ntsd-ntsx-gde-zroz-gdt-v4', 'gdt-tip-gld-proxy-v1'],
  },
  {
    id: CA_SSO_DGLM_RGBM_ARB_PRESET_ID,
    region: 'ca',
    cadDenominated: false,
    rebalanceSchedule: 'annual',
    holdings: caSsoDglmRgbmArbHoldings,
    extraCacheKeyTags: [
      'cad-xsp-bench-vfv-ussl-proxy',
      'annual-rebal',
      'sso-qld-dglm-rgbm-arb-v3',
      'dglm-dbmf-proxy-v1',
    ],
  },
  {
    id: US_FOUR_ALPHA_QUADRANTS_PRESET_ID,
    region: 'us',
    cadDenominated: false,
    rebalanceSchedule: 'annual',
    holdings: usFourAlphaQuadrantsHoldings,
    extraCacheKeyTags: ['annual-rebal', 'clse-sso-spmo-vflo-upro-flsp-ialt-mate-v1', 'mate-kmlm-chain-v1'],
  },
  {
    id: CA_FOUR_ALPHA_QUADRANTS_PRESET_ID,
    region: 'ca',
    cadDenominated: false,
    rebalanceSchedule: 'annual',
    holdings: caFourAlphaQuadrantsHoldings,
    extraCacheKeyTags: [
      'cad-xsp-bench-vfv-ussl-proxy',
      'annual-rebal',
      'clse-sso-fcmo-vflo-upro-flsp-pfmn-mate-v2',
      'mate-kmlm-chain-v1',
      'fcmo-spmo-proxy-v1',
    ],
  },
]

export function getPresetById(id: string): PresetDefinition | undefined {
  return PRESET_DEFINITIONS.find((p) => p.id === id)
}

// Trick to ensure PriceSeries module-load order is harmless for callers using `@/lib/presets`.
export type { PriceSeries }
