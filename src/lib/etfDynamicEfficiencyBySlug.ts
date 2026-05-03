import type { EtfDynamicDef, EtfDynamicEfficiencyDef } from '@/lib/etfDynamicRegistryTypes'
import { stackBucketExposureSplitPct } from '@/lib/etfStackExposureBySlug'
import type {
  MonthlyEfficiencyGradePatch,
  MonthlyEfficiencySnapshot,
} from '@/lib/etfEfficiencyGradesCompute'
import { NTSD_CAPITAL_EFFICIENCY_TOOLTIP_GRADED } from '@/lib/etfEfficiencyNtsdCopy'
import {
  EFFICIENCY_PROVISIONAL_FOOTNOTE,
  alphaEfficiencyStackedTooltip,
  alphaEfficiencyUnstackedTooltip,
  capitalEfficiencyTooltip,
  insufficientHistoryTooltip,
} from '@/lib/etfEfficiencyTooltipFraming'

const LETTER_POINTS: Record<string, number> = { 'A+': 5, A: 4, 'B+': 3, B: 2, C: 1, D: 0 }

function pointsToLetter(points: number): string {
  if (points >= 4.5) return 'A+'
  if (points >= 3.5) return 'A'
  if (points >= 2.5) return 'B+'
  if (points >= 1.5) return 'B'
  if (points >= 0.5) return 'C'
  return 'D'
}

function attachStackedEfficiency(
  def: EtfDynamicDef,
  eff: EtfDynamicEfficiencyDef,
  slug: string
): EtfDynamicEfficiencyDef {
  let cp = def.capitalBucketExposurePct ?? 0
  let ap = def.alphaBucketExposurePct ?? 0
  const stackSplit = stackBucketExposureSplitPct(slug)
  if (stackSplit && stackSplit.capital > 0 && stackSplit.alpha > 0) {
    cp = stackSplit.capital
    ap = stackSplit.alpha
  }
  // Stacked score applies only to blended equity+alpha products.
  if (cp <= 0 || ap <= 0 || def.allEquityStack) return eff
  if (!eff.capital || !eff.alpha) return eff
  const cGrade = eff.capital.grade
  const aGrade = eff.alpha.grade
  if (!cGrade || !aGrade) return eff
  const cPts = LETTER_POINTS[cGrade]
  const aPts = LETTER_POINTS[aGrade]
  if (cPts == null || aPts == null) return eff
  const wC = cp / (cp + ap)
  const wA = ap / (cp + ap)
  const blended = cPts * wC + aPts * wA
  const grade = pointsToLetter(blended)
  return {
    ...eff,
    stacked: {
      grade,
      gradeTone: grade === 'A+' ? 'gold' : 'muted',
      tooltip:
        `Stacked Efficiency blends Capital- and Alpha-bucket efficiency using configured sleeve weights (${Math.round(wC * 100)}% capital bucket / ${Math.round(wA * 100)}% alpha bucket).` +
        `\n\nThis line is only shown when both bucket grades are available (e.g. equity + managed futures, or dual macro sleeves in one fund).`,
    },
  }
}

function secondParagraphFromTooltip(tooltip: string | undefined): string | null {
  if (!tooltip) return null
  const parts = tooltip.split('\n\n').map((p) => p.trim()).filter((p) => p.length > 0)
  return parts.length >= 2 ? parts[1]! : parts.length === 1 ? parts[0]! : null
}

export function applyMonthlyEfficiencyGradePatch(
  base: EtfDynamicEfficiencyDef,
  patch: MonthlyEfficiencyGradePatch | null,
  slug: string
): EtfDynamicEfficiencyDef {
  const out: EtfDynamicEfficiencyDef = {
    ...base,
    // Never trust static letter grades as fallback; grades are compute-driven.
    capital: base.capital ? { ...base.capital, grade: 'N/A' } : undefined,
    alpha: base.alpha ? { ...base.alpha, grade: 'N/A' } : undefined,
    notes: base.notes != null ? [...base.notes] : undefined,
    footnotes: base.footnotes != null ? [...base.footnotes] : undefined,
  }
  if (!patch) return out

  if (patch.capital && out.capital == null) {
    out.capital = {
      grade: 'N/A',
      tooltip: capitalEfficiencyTooltip(
        'Capital score is computed from live return versus benchmark net of costs; this line is compute-driven.'
      ),
    }
  }
  if (patch.alpha && out.alpha == null) {
    const context =
      secondParagraphFromTooltip(base.alpha?.tooltip) ??
      secondParagraphFromTooltip(base.capital?.tooltip) ??
      'Alpha score is computed from live return above hurdle rate; this line is compute-driven.'
    out.alpha = {
      grade: 'N/A',
      tooltip: alphaEfficiencyUnstackedTooltip(context),
    }
  }

  if (patch.capital && out.capital) {
    if (slug === 'ntsd' && patch.capital.grade !== 'N/A') {
      out.capital = {
        ...out.capital,
        grade: patch.capital.grade,
        tooltip: NTSD_CAPITAL_EFFICIENCY_TOOLTIP_GRADED,
        gradeTone: patch.capital.grade === 'A+' ? 'gold' : out.capital.gradeTone,
      }
    } else {
      out.capital = { ...out.capital, grade: patch.capital.grade }
    }
  }

  if (patch.alpha && out.alpha) {
    out.alpha = { ...out.alpha, grade: patch.alpha.grade }
  }

  if (patch.footnotes != null && patch.footnotes.length > 0) {
    const prev = out.footnotes ?? []
    const add = patch.footnotes.filter((p) => !prev.includes(p))
    if (add.length) out.footnotes = [...prev, ...add]
  }

  return out
}

/** Dynamic US ETF pages: `def.efficiency` in registry overrides these (e.g. NTSD). */
export const US_ETF_DYNAMIC_EFFICIENCY: Record<string, EtfDynamicEfficiencyDef> = {
  begs: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'BEGS targets leveraged long exposure to a blended cryptocurrency and precious-metals basket via futures, swaps, and ETPs—high-beta equity-style sleeves stacked in one wrapper.'
      ),
    },
    alpha: {
      tooltip: alphaEfficiencyStackedTooltip(
        'The non-equity leg is the commodities/crypto stack beyond plain large-cap beta—daily-reset leverage and roll mechanics dominate outcomes versus spot coins or bullion.'
      ),
    },
  },
  btgd: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'BTGD seeks simultaneous ~100% bitcoin and ~100% gold exposure—two macro betas implemented with futures and ETPs per Quantify’s STKd design.'
      ),
    },
    alpha: {
      tooltip: alphaEfficiencyStackedTooltip(
        'The sleeve beyond core equity-style beta here is the paired gold and bitcoin book plus implementation drag—futures curve and collateral mechanics drive incremental outcomes.'
      ),
    },
  },
  ooqb: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'OOQB targets roughly ~100% Nasdaq-100 notional alongside ~100% bitcoin futures exposure in one listed wrapper (Volatility Shares One+One™ design).'
      ),
    },
    alpha: {
      tooltip: alphaEfficiencyStackedTooltip(
        'The non-core sleeve is bitcoin futures exposure engineered alongside Nasdaq beta—implementation, margin, and roll dominate versus a single-index mental model.'
      ),
    },
  },
  oosb: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'OOSB targets ~100% S&P 500 notional alongside ~100% bitcoin futures—stacked large-cap U.S. beta plus digital-asset futures per sponsor disclosures.'
      ),
    },
    alpha: {
      tooltip: alphaEfficiencyStackedTooltip(
        'Incremental sleeve is bitcoin futures stacked on the equity book—futures funding, exchange limits, and path risk are the main non-equity levers.'
      ),
    },
  },
  rssx: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'RSSX layers a U.S. large-cap equity sleeve with gold and bitcoin exposure (Return Stacked® mandate—see prospectus for notional weights and instruments).'
      ),
    },
    alpha: {
      tooltip: alphaEfficiencyStackedTooltip(
        'Gold and bitcoin sleeves sit alongside the equity core—hard-asset and digital-scarcity betas implemented with futures, trusts, or swaps per filings.'
      ),
    },
    footnotes: [EFFICIENCY_PROVISIONAL_FOOTNOTE],
  },
  wtib: {
    alpha: {
      tooltip: alphaEfficiencyStackedTooltip(
        'WTIB is oil plus bitcoin futures/ETP exposure in one fund—no separate listed equity sleeve; efficiency is scored on the non-equity stack versus a crude/bitcoin blend anchor and hurdle rates.'
      ),
    },
    footnotes: [EFFICIENCY_PROVISIONAL_FOOTNOTE],
  },
  rsst: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'RSST targets roughly a dollar of U.S. large-cap equity notional alongside a dollar of systematic managed futures per Return Stacked® disclosures.'
      ),
    },
    alpha: {
      tooltip: alphaEfficiencyStackedTooltip(
        'The alpha sleeve is trend-following managed futures across rates, FX, commodities, and equity indices—implemented with futures and collateral per filings.'
      ),
    },
  },
  gde: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'GDE pairs U.S. large-cap equity with a gold futures overlay—WisdomTree’s capital-efficient gold-plus-equity structure per prospectus.'
      ),
    },
    alpha: {
      tooltip: alphaEfficiencyStackedTooltip(
        'The non-core sleeve is gold futures exposure for convexity versus real-rate and stress regimes—roll and margin interact with the equity leg.'
      ),
    },
  },
  gdmn: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'GDMN pairs global gold miners equity with a leveraged gold futures sleeve; equity-side efficiency reflects whether miners deliver enough return to justify a stacked implementation.'
      ),
    },
    alpha: {
      tooltip: alphaEfficiencyStackedTooltip(
        'The alpha sleeve is gold futures exposure layered on top of miners equity. It is strongest in falling-real-yield or policy-stress tapes, but roll and leverage can drag in hostile rate regimes.'
      ),
    },
  },
  flsp: {
    alpha: {
      tooltip: alphaEfficiencyUnstackedTooltip(
        'FLSP is a pure systematic alternatives sleeve—style premia and macro-style signals without a bundled S&P 500 stack per sponsor mandate.'
      ),
    },
  },
  ialt: {
    alpha: {
      tooltip: insufficientHistoryTooltip(
        'IALT’s multi-sleeve alternatives book requires sufficient live history to judge alpha efficiency versus hurdle rates—see prospectus for current engines.'
      ),
    },
  },
  caos: {
    alpha: {
      tooltip: alphaEfficiencyUnstackedTooltip(
        'CAOS is a tail-risk / convexity sleeve—options and volatility-linked positioning designed to pay in crash regimes rather than grind equity-like returns.'
      ),
    },
  },
  sso: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'SSO seeks 2x daily S&P 500 exposure via swaps and futures; capital efficiency compares realized annualized return versus SPY with daily-reset compounding effects.'
      ),
    },
  },
  upro: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'UPRO targets 3x daily S&P 500 exposure; capital efficiency reflects realized annualized excess versus SPY after path dependence and volatility drag.'
      ),
    },
  },
  qld: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'QLD provides 2x daily Nasdaq-100 exposure; capital efficiency is scored against SPY under the same annualized excess-return framework used for other equity-side ETFs.'
      ),
    },
  },
  tqqq: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'TQQQ provides 3x daily Nasdaq-100 exposure; capital efficiency is measured on realized annualized excess versus SPY, including daily reset compounding behavior.'
      ),
    },
  },
  spmo: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'SPMO targets S&P 500 momentum factor exposure—rules-based tilts toward recent relative strength within the large-cap universe.'
      ),
    },
  },
  vflo: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'VFLO emphasizes free-cash-flow-rich U.S. equities versus a broad benchmark—factor equity.'
      ),
    },
  },
  avuv: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'AVUV is actively managed U.S. small-cap value—profitability and value tilts versus a Russell 2000 Value–style opportunity set.'
      ),
    },
  },
  sass: {
    capital: {
      tooltip: insufficientHistoryTooltip(
        'SASS is a concentrated U.S. value sleeve (~20–25 names); capital efficiency vs SPY is assessed after the minimum live NAV window is met.'
      ),
    },
  },
  cta: {
    alpha: {
      tooltip: alphaEfficiencyUnstackedTooltip(
        'Simplify CTA is a diversified managed-futures sleeve—trend and macro signals across asset classes in a single systematic ETF.'
      ),
    },
  },
  dbmf: {
    alpha: {
      tooltip: alphaEfficiencyUnstackedTooltip(
        'DBMF implements replication of hedge-fund managed-futures industry returns—rates, FX, commodities, and equity index futures per dynamic beta engine.'
      ),
    },
  },
  kmlm: {
    alpha: {
      tooltip: alphaEfficiencyUnstackedTooltip(
        'KMLM is KraneShares’ managed-futures ETF—systematic trend and macro exposure without a bundled equity stack.'
      ),
    },
  },
  clse: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'CLSE is long/short U.S. equity with net exposure below 1.0 beta—capital efficiency is scored on excess return vs SPY net of costs per long/short rules.'
      ),
    },
  },
  orr: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'ORR is a global long/short equity ETF—single-name longs and shorts with meaningful short exposure per Militia disclosures.'
      ),
    },
  },
  asgm: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'ASGM blends a strategic equity component with AlphaSimplex systematic macro futures—rates, FX, and commodities alongside listed equity risk.'
      ),
    },
    alpha: {
      tooltip: alphaEfficiencyStackedTooltip(
        'The macro book rotates with volatility targeting and trend signals; sleeve weights shift with model output—see Virtus disclosures for current implementation bands.'
      ),
    },
    notes: [
      'Sleeve split estimated from sponsor materials and published holdings as of Aug 2025. Grades updated when materially new data is available.',
    ],
    footnotes: [EFFICIENCY_PROVISIONAL_FOOTNOTE],
  },
  mrgr: {
    alpha: {
      tooltip: alphaEfficiencyUnstackedTooltip(
        'MRGR tracks S&P Merger Arbitrage Index economics—deal targets, acquirer hedges, and bounded net exposure per rules-based event sleeves.'
      ),
    },
  },
  attr: {
    alpha: {
      tooltip: alphaEfficiencyUnstackedTooltip(
        'ATTR combines U.S. large-cap exposure with a tactical tail-risk options overlay designed to mitigate deep left-tail events; carry cost and hedge timing drive realized efficiency versus hurdle rates.'
      ),
    },
  },
}

export const CA_ETF_DYNAMIC_EFFICIENCY: Record<string, EtfDynamicEfficiencyDef> = {
  rgbm: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'RGBM’s capital bucket is the global equity sleeve (~50% notional); efficiency grades that sleeve versus a broad Canadian equity benchmark after stack scaling.'
      ),
    },
    alpha: {
      tooltip: alphaEfficiencyStackedTooltip(
        'The alpha bucket bundles investment-grade-style bonds and the systematic managed-futures sleeve (~150% combined notional vs ~50% equity)—rates, FX, and commodities per Return Stacked® Canada disclosures.'
      ),
    },
  },
  onec: {
    alpha: {
      tooltip: alphaEfficiencyUnstackedTooltip(
        'ONEC is a multi-alternative fund-of-funds—credit, macro, long/short equity, and real-asset sleeves rebalanced by Accelerate per mandate.'
      ),
    },
  },
  pfaa: {
    alpha: {
      tooltip: alphaEfficiencyUnstackedTooltip(
        'PFAA is Picton Mahoney’s multi-strategy sleeve—long/short equity, relative-value credit, and macro books in one ETF wrapper.'
      ),
    },
  },
  zlb: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'ZLB tracks BMO’s Canadian low-volatility factor index—rules-based tilts toward historically lower-beta TSX names.'
      ),
    },
  },
  atsx: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'ATSX runs a ~150% long / 50% short systematic book versus the S&P/TSX 60—Canadian long/short equity with leverage per ETF Facts.'
      ),
    },
  },
  pfls: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'PFLS is Picton’s global long/short equity sleeve with moderate net exposure—Authentic Hedge® risk budgeting in ETF form.'
      ),
    },
  },
  tgaf: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'TGAF is a global long/short equity ETF (~100% long, ~40% short) benchmarked to MSCI ACWI NR (CAD) per Tralucent disclosures.'
      ),
    },
  },
  dglm: {
    alpha: {
      tooltip: alphaEfficiencyUnstackedTooltip(
        'DGLM is Desjardins’ long/short global macro sleeve—Graham Capital sub-advised futures and forwards across rates, FX, commodities, and selective equity beta.'
      ),
    },
    footnotes: [EFFICIENCY_PROVISIONAL_FOOTNOTE],
  },
  hsu: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'HSU is a 2x daily S&P 500 leverage sleeve in CAD. Capital efficiency reflects realized excess return versus a broad U.S. equity benchmark after compounding drag and financing costs.'
      ),
    },
  },
  hqu: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'HQU is a 2x daily Nasdaq-100 leverage sleeve. Capital efficiency depends on trend persistence versus volatility drag from daily-reset leverage.'
      ),
    },
  },
  ussl: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'USSL targets about 1.25x S&P 500 exposure. Capital efficiency compares enhanced-beta delivery versus standard broad U.S. equity exposure net of leverage costs.'
      ),
    },
  },
  qqql: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'QQQL targets about 1.25x Nasdaq-100 exposure. Capital efficiency reflects whether enhanced growth beta offsets financing and compounding frictions over live periods.'
      ),
    },
  },
  heql: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'HEQL targets about 1.25x globally diversified equity exposure via a fund-of-funds structure. Capital efficiency reflects leveraged equity delivery net of financing and compounding drag.'
      ),
    },
  },
  btccb: {
    alpha: {
      tooltip: alphaEfficiencyUnstackedTooltip(
        'BTCC-B holds spot Bitcoin in cold storage—CAD-unhedged Purpose Bitcoin ETF units, direct digital-asset beta in a regulated wrapper.'
      ),
    },
  },
  ethxb: {
    alpha: {
      tooltip: alphaEfficiencyUnstackedTooltip(
        'ETHX-B holds spot Ether in custody—CI Galaxy’s Canadian-listed spot sleeve with CAD unhedged pricing.'
      ),
    },
  },
}

export function mergeDynamicEtfEfficiency(
  def: EtfDynamicDef,
  slug: string,
  universe: 'us' | 'ca',
  snapshot?: MonthlyEfficiencySnapshot | null
): EtfDynamicDef {
  const map = universe === 'us' ? US_ETF_DYNAMIC_EFFICIENCY : CA_ETF_DYNAMIC_EFFICIENCY
  const staticEff = def.efficiency ?? map[slug]
  const patch = snapshot
    ? universe === 'us'
      ? snapshot.us[slug] ?? null
      : snapshot.ca[slug] ?? null
    : null

  if (!staticEff) return def

  const merged = applyMonthlyEfficiencyGradePatch(staticEff, patch, slug)
  return { ...def, efficiency: attachStackedEfficiency(def, merged, slug) }
}

/** Merge using a precomputed monthly patch (single-slug fetch path). */
export function mergeDynamicEtfEfficiencyWithPatch(
  def: EtfDynamicDef,
  slug: string,
  universe: 'us' | 'ca',
  patch: MonthlyEfficiencyGradePatch | null
): EtfDynamicDef {
  const map = universe === 'us' ? US_ETF_DYNAMIC_EFFICIENCY : CA_ETF_DYNAMIC_EFFICIENCY
  const staticEff = def.efficiency ?? map[slug]
  if (!staticEff) return def
  const merged = applyMonthlyEfficiencyGradePatch(staticEff, patch, slug)
  return { ...def, efficiency: attachStackedEfficiency(def, merged, slug) }
}
