export type EtfDynamicEfficiencyLineDef = {
  grade?: string
  gradeTone?: 'gold' | 'muted'
  tooltip: string
}

export type EtfDynamicEfficiencyDef = {
  capital?: EtfDynamicEfficiencyLineDef
  alpha?: EtfDynamicEfficiencyLineDef
  stacked?: EtfDynamicEfficiencyLineDef
  notes?: string[]
  footnotes?: string[]
}

export type EtfDynamicDef = {
  yahooSymbol: string
  hubCategoryId: string
  badge: string
  h1Title: string
  displayTicker: string
  issuer: string
  inception: string
  structure?: string
  mer: string
  aum: string
  pageTitle: string
  description: string
  lede: string
  strategyParas: string[]
  pedigreeParas: string[]
  outperfParas: string[]
  officialUrl: string
  officialLabel: string
  efficiency?: EtfDynamicEfficiencyDef
  issuerRole?: 'issuer' | 'manager'
  /**
   * When `html`, `lede` and body paragraph strings may contain trusted inline HTML
   * (e.g. `<strong>`), rendered with `dangerouslySetInnerHTML`.
   */
  contentFormat?: 'html'
  /** Optional HTML note under the price chart (trusted site copy). */
  belowChart?: string
  /**
   * When false, monthly Yahoo-based grade patches are skipped (editorial grades only).
   * @default true
   */
  monthlyGradeRecompute?: boolean
  /**
   * Optional exposure split (percent notional) used for stacked capital-efficiency normalization.
   * Capital usage fraction is computed as:
   *   capitalBucketExposurePct / (capitalBucketExposurePct + alphaBucketExposurePct)
   */
  capitalBucketExposurePct?: number
  alphaBucketExposurePct?: number
  /** True when both sleeves are equity risk and should be treated as capital (not alpha) for capital efficiency. */
  allEquityStack?: boolean
  /** Optional beta benchmark symbol; defaults by market (e.g. `.TO` → `XIU.TO`, US → `SPY`). */
  betaBenchmarkSymbol?: string
}
