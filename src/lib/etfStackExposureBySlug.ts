export type SleeveBucket = 'capital' | 'alpha'

export type SleeveAssetClass =
  | 'equity'
  | 'crypto'
  | 'commodity'
  | 'fixed-income'
  | 'alternatives'

export type SleeveComponent = {
  name: string
  pct: number
  bucket: SleeveBucket
  assetClass: SleeveAssetClass
}

export type EtfStackExposureConfig = {
  components: SleeveComponent[]
  /** Optional benchmark for capital comparison (defaults by market if omitted). */
  capitalMarketBenchmarkSymbol?: string
  /** Optional core benchmark symbol for stacked equity-side comparison. */
  coreBenchmarkSymbol?: string
  /** Optional synthetic core benchmark blend. */
  coreBenchmarkBlend?: Array<{ symbol: string; weightPct: number }>
  /**
   * Equity-only sleeve benchmark for capital efficiency + residual alpha (ignores non-equity
   * sleeves such as bonds in the same notional “capital” bucket).
   */
  equityCoreBenchmarkSymbol?: string
  equityCoreBenchmarkBlend?: Array<{ symbol: string; weightPct: number }>
  /** When true, `coreBenchmarkBlend` is treated as the equity-only core (every leg is equity). */
  equityOnlyUsesCoreBlend?: boolean
  /** Explicitly force all-equity stack capital treatment. */
  allEquityStack?: boolean
}

/**
 * Source-of-truth stack map for sleeve composition used in efficiency calculations.
 * Keep this updated when adding or changing stacked ETFs.
 */
export const ETF_STACK_EXPOSURE_BY_SLUG: Record<string, EtfStackExposureConfig> = {
  mate: {
    components: [
      { name: 'S&P 500 equity', pct: 100, bucket: 'capital', assetClass: 'equity' },
      { name: 'Managed futures', pct: 100, bucket: 'alpha', assetClass: 'alternatives' },
    ],
    capitalMarketBenchmarkSymbol: 'SPY',
    coreBenchmarkSymbol: 'SPY',
  },
  rsst: {
    components: [
      { name: 'S&P 500 equity', pct: 100, bucket: 'capital', assetClass: 'equity' },
      { name: 'Managed futures', pct: 100, bucket: 'alpha', assetClass: 'alternatives' },
    ],
    capitalMarketBenchmarkSymbol: 'SPY',
    coreBenchmarkSymbol: 'SPY',
  },
  rssy: {
    components: [
      { name: 'S&P 500 equity', pct: 100, bucket: 'capital', assetClass: 'equity' },
      { name: 'Futures yield', pct: 100, bucket: 'alpha', assetClass: 'alternatives' },
    ],
    capitalMarketBenchmarkSymbol: 'SPY',
    coreBenchmarkSymbol: 'SPY',
  },
  ntsd: {
    components: [
      { name: 'US equity', pct: 90, bucket: 'capital', assetClass: 'equity' },
      { name: 'International equity', pct: 60, bucket: 'capital', assetClass: 'equity' },
    ],
    capitalMarketBenchmarkSymbol: 'SPY',
    coreBenchmarkBlend: [
      { symbol: 'SPY', weightPct: 90 },
      { symbol: 'VDU', weightPct: 60 },
    ],
    equityOnlyUsesCoreBlend: true,
    allEquityStack: true,
  },
  gde: {
    components: [
      { name: 'US equity', pct: 80, bucket: 'capital', assetClass: 'equity' },
      { name: 'Gold', pct: 80, bucket: 'alpha', assetClass: 'commodity' },
    ],
    capitalMarketBenchmarkSymbol: 'SPY',
    coreBenchmarkSymbol: 'SPY',
  },
  gdmn: {
    components: [
      { name: 'Gold miners equity', pct: 100, bucket: 'capital', assetClass: 'equity' },
      { name: 'Gold futures', pct: 100, bucket: 'alpha', assetClass: 'commodity' },
    ],
    capitalMarketBenchmarkSymbol: 'SPY',
    coreBenchmarkSymbol: 'GDX',
  },
  rssx: {
    components: [
      { name: 'US equity', pct: 100, bucket: 'capital', assetClass: 'equity' },
      { name: 'Gold', pct: 50, bucket: 'alpha', assetClass: 'commodity' },
      { name: 'Bitcoin', pct: 50, bucket: 'alpha', assetClass: 'crypto' },
    ],
    capitalMarketBenchmarkSymbol: 'SPY',
    coreBenchmarkSymbol: 'SPY',
  },
  rgbm: {
    components: [
      { name: 'Global equity', pct: 50, bucket: 'capital', assetClass: 'equity' },
      { name: 'Investment-grade bonds', pct: 50, bucket: 'capital', assetClass: 'fixed-income' },
      { name: 'Macro futures', pct: 100, bucket: 'alpha', assetClass: 'alternatives' },
    ],
    capitalMarketBenchmarkSymbol: 'VFV.TO',
    /** Capital efficiency uses equity sleeve only; bonds + macro are alpha-side. */
    equityCoreBenchmarkSymbol: 'VEQT.TO',
  },
  asgm: {
    components: [
      { name: 'US equity', pct: 50, bucket: 'capital', assetClass: 'equity' },
      { name: 'Global macro futures', pct: 100, bucket: 'alpha', assetClass: 'alternatives' },
    ],
    capitalMarketBenchmarkSymbol: 'SPY',
    coreBenchmarkSymbol: 'VT',
  },
  hfgm: {
    components: [
      { name: 'US equity', pct: 50, bucket: 'capital', assetClass: 'equity' },
      { name: 'Global macro futures', pct: 100, bucket: 'alpha', assetClass: 'alternatives' },
    ],
    capitalMarketBenchmarkSymbol: 'SPY',
    coreBenchmarkSymbol: 'VT',
  },
  btgd: {
    components: [
      { name: 'Bitcoin', pct: 100, bucket: 'capital', assetClass: 'crypto' },
      { name: 'Gold', pct: 100, bucket: 'alpha', assetClass: 'commodity' },
    ],
    capitalMarketBenchmarkSymbol: 'SPY',
    coreBenchmarkSymbol: 'IBIT',
  },
  ooqb: {
    components: [
      { name: 'Nasdaq-100 equity', pct: 100, bucket: 'capital', assetClass: 'equity' },
      { name: 'Bitcoin', pct: 100, bucket: 'alpha', assetClass: 'crypto' },
    ],
    capitalMarketBenchmarkSymbol: 'SPY',
    coreBenchmarkSymbol: 'QQQ',
  },
  oosb: {
    components: [
      { name: 'S&P 500 equity', pct: 100, bucket: 'capital', assetClass: 'equity' },
      { name: 'Bitcoin', pct: 100, bucket: 'alpha', assetClass: 'crypto' },
    ],
    capitalMarketBenchmarkSymbol: 'SPY',
    coreBenchmarkSymbol: 'SPY',
  },
  begs: {
    components: [
      { name: 'Bitcoin', pct: 75, bucket: 'capital', assetClass: 'crypto' },
      { name: 'Ethereum', pct: 25, bucket: 'capital', assetClass: 'crypto' },
      { name: 'Gold', pct: 75, bucket: 'alpha', assetClass: 'commodity' },
      { name: 'Silver', pct: 25, bucket: 'alpha', assetClass: 'commodity' },
    ],
    capitalMarketBenchmarkSymbol: 'SPY',
    coreBenchmarkBlend: [
      { symbol: 'IBIT', weightPct: 75 },
      { symbol: 'ETHA', weightPct: 25 },
    ],
  },
  /** USCF: actively tilted WTI-style crude + bitcoin; no listed equity sleeve — alpha-only vs blend anchor. */
  wtib: {
    components: [
      { name: 'Crude oil (WTI-linked)', pct: 100, bucket: 'capital', assetClass: 'commodity' },
      { name: 'Bitcoin', pct: 100, bucket: 'alpha', assetClass: 'crypto' },
    ],
    capitalMarketBenchmarkSymbol: 'SPY',
    coreBenchmarkBlend: [
      { symbol: 'USO', weightPct: 50 },
      { symbol: 'BTC-USD', weightPct: 50 },
    ],
  },
}

/** Sum of `pct` by sleeve `bucket` for a mapped stack (used for splits + stacked grade weights). */
export function stackBucketExposureSplitPct(
  slug: string
): { capital: number; alpha: number } | null {
  const m = ETF_STACK_EXPOSURE_BY_SLUG[slug]
  if (!m) return null
  let capitalBucket = 0
  let alphaBucket = 0
  for (const c of m.components) {
    if (c.bucket === 'capital') capitalBucket += c.pct
    else if (c.bucket === 'alpha') alphaBucket += c.pct
  }
  if (capitalBucket <= 0 && alphaBucket <= 0) return null
  return { capital: capitalBucket, alpha: alphaBucket }
}

/** True if the mapped stack includes any `assetClass === 'equity'` sleeve (for UI labels vs scorecard exposure). */
export function stackMappedHasEquityAssetClass(slug: string): boolean {
  const m = ETF_STACK_EXPOSURE_BY_SLUG[slug]
  if (!m) return false
  return m.components.some((c) => c.assetClass === 'equity')
}

/** ETF page label for the `eff.capital` grade row: non-equity stacks (e.g. BTGD) use “Capital”, not “Equity”. */
export function capitalEfficiencyMetaLabel(slug: string | undefined): 'Equity Efficiency:' | 'Capital Efficiency:' {
  if (!slug || !ETF_STACK_EXPOSURE_BY_SLUG[slug]) return 'Equity Efficiency:'
  return stackMappedHasEquityAssetClass(slug) ? 'Equity Efficiency:' : 'Capital Efficiency:'
}

/**
 * Whether mapped stacks have capital-bucket vs alpha-bucket sleeves (grading rows).
 * Uses `bucket` (not `assetClass`): e.g. BTGD’s bitcoin sleeve is capital-bucket but not equity.
 * Field names remain `hasEquitySleeve` / `hasNonEquitySleeve` for call-site compatibility.
 */
export function stackExposureLineAvailability(
  slug: string
): { hasEquitySleeve: boolean; hasNonEquitySleeve: boolean } | null {
  const split = stackBucketExposureSplitPct(slug)
  if (!split) return null
  return {
    hasEquitySleeve: split.capital > 0,
    hasNonEquitySleeve: split.alpha > 0,
  }
}

