import type { EtfDynamicDef, EtfDynamicEfficiencyDef } from '@/lib/etfDynamicRegistryTypes'
import { stackBucketExposureSplitPct } from '@/lib/etfStackExposureBySlug'
import type {
  MonthlyEfficiencyGradePatch,
  MonthlyEfficiencySnapshot,
} from '@/lib/etfEfficiencyGradesCompute'
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
      tooltip: `Stacked Efficiency blends Capital- and Alpha-bucket grades using the configured sleeve weights (${Math.round(wC * 100)}% capital / ${Math.round(wA * 100)}% alpha).`,
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
  patch: MonthlyEfficiencyGradePatch | null
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
    const useGradedOverride =
      patch.capital.grade !== 'N/A' && out.capital.gradedTooltipOverride != null
    if (useGradedOverride) {
      out.capital = {
        ...out.capital,
        grade: patch.capital.grade,
        tooltip: out.capital.gradedTooltipOverride!,
        gradeTone: patch.capital.grade === 'A+' ? 'gold' : out.capital.gradeTone,
      }
    } else {
      out.capital = {
        ...out.capital,
        grade: patch.capital.grade,
        gradeTone: patch.capital.grade === 'A+' ? 'gold' : 'muted',
      }
    }
  }

  if (patch.alpha && out.alpha) {
    out.alpha = {
      ...out.alpha,
      grade: patch.alpha.grade,
      gradeTone: patch.alpha.grade === 'A+' ? 'gold' : 'muted',
    }
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
        'BEGS targets leveraged long exposure to a blended cryptocurrency and precious-metals basket via futures, swaps, and ETPs: high-beta equity-style sleeves stacked in one wrapper.'
      ),
    },
    alpha: {
      tooltip: alphaEfficiencyStackedTooltip(
        'The non-equity leg is the commodities and crypto stack beyond plain large-cap beta. Daily-reset leverage and roll mechanics dominate outcomes versus spot coins or bullion.'
      ),
    },
  },
  btgd: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'BTGD seeks simultaneous ~100% bitcoin and ~100% gold exposure: two macro betas implemented with futures and ETPs.'
      ),
    },
    alpha: {
      tooltip: alphaEfficiencyStackedTooltip(
        'The sleeve beyond core equity-style beta is the paired gold and bitcoin book. Futures curve and collateral mechanics drive incremental outcomes.'
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
        'The non-core sleeve is bitcoin futures exposure implemented alongside Nasdaq beta. Implementation, margin, and roll dominate versus a single-index mental model.'
      ),
    },
  },
  oosb: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'OOSB targets ~100% S&P 500 notional alongside ~100% bitcoin futures: stacked large-cap U.S. beta plus digital-asset futures.'
      ),
    },
    alpha: {
      tooltip: alphaEfficiencyStackedTooltip(
        'The incremental sleeve is bitcoin futures stacked on the equity book. Futures funding, exchange limits, and path risk are the main non-equity levers.'
      ),
    },
  },
  rssx: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'RSSX layers a U.S. large-cap equity sleeve with gold and bitcoin exposure (Return Stacked® design; see the prospectus for current notional weights).'
      ),
    },
    alpha: {
      tooltip: alphaEfficiencyStackedTooltip(
        'Gold and bitcoin sleeves sit alongside the equity core: hard-asset and digital-scarcity betas implemented with futures, trusts, or swaps.'
      ),
    },
    footnotes: [EFFICIENCY_PROVISIONAL_FOOTNOTE],
  },
  wtib: {
    alpha: {
      tooltip: alphaEfficiencyStackedTooltip(
        'WTIB holds oil and bitcoin futures/ETP exposure in one fund with no separate listed equity sleeve. The grade scores the non-equity stack versus a crude/bitcoin blend anchor and hurdle rates.'
      ),
    },
    footnotes: [EFFICIENCY_PROVISIONAL_FOOTNOTE],
  },
  spbc: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'SPBC holds 100% S&P 500 equity (via IVV and E-mini futures) as its capital sleeve. Capital efficiency grades the equity book versus SPY as the benchmark.'
      ),
    },
    alpha: {
      tooltip: alphaEfficiencyStackedTooltip(
        'The alpha sleeve is a ~10% allocation to spot bitcoin via exchange-traded products (currently VanEck HODL), rebalanced quarterly. The grade scores the incremental bitcoin return per unit of crypto-spread risk added above the equity core.'
      ),
    },
  },
  rsbt: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'RSBT holds a broad U.S. bond sleeve targeting the Bloomberg U.S. Aggregate. Capital efficiency grades the bond sleeve versus AGG as the fixed-income hurdle.'
      ),
    },
    alpha: {
      tooltip: alphaEfficiencyStackedTooltip(
        'The alpha sleeve is trend-following managed futures across rates, FX, commodities, and equity indices, using the same blended CTA replication approach as RSST and RSIT.'
      ),
    },
  },
  rsst: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'RSST puts a dollar of U.S. large-cap equity and a dollar of systematic managed futures on the same capital (Return Stacked® structure).'
      ),
    },
    alpha: {
      tooltip: alphaEfficiencyStackedTooltip(
        'The alpha sleeve is trend-following managed futures across rates, FX, commodities, and equity indices.'
      ),
    },
  },
  rsit: {
    capital: {
      tooltip: insufficientHistoryTooltip(
        'RSIT stacks 100% international developed-market equity and 100% managed futures on the same capital. Launched May 2026; insufficient live history to grade capital efficiency.'
      ),
    },
    alpha: {
      tooltip: insufficientHistoryTooltip(
        'The alpha sleeve is trend-following managed futures across rates, FX, commodities, and equity indices, identical in design to the RSST/RSSY family. Launched May 2026; insufficient live history to grade alpha efficiency.'
      ),
    },
  },
  gde: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'GDE pairs U.S. large-cap equity with a gold futures overlay: WisdomTree’s capital-efficient gold-plus-equity structure.'
      ),
    },
    alpha: {
      tooltip: alphaEfficiencyStackedTooltip(
        'The non-core sleeve is gold futures exposure for convexity in real-rate and stress environments. Roll and margin interact with the equity leg.'
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
        'The alpha sleeve is gold futures layered on top of miners equity. It earns most in falling-real-yield or policy-stress tapes, but roll and leverage can drag in hostile rate environments.'
      ),
    },
  },
  wdig: {
    capital: {
      tooltip: insufficientHistoryTooltip(
        'WDIG pairs rare earth and strategic metals miners equity with a base metals futures overlay (90%+90% stacked). Launched May 2026; insufficient live history to grade capital efficiency.'
      ),
    },
    alpha: {
      tooltip: insufficientHistoryTooltip(
        'The alpha sleeve is a base metals futures overlay layered on miners equity. Launched May 2026; insufficient live history to grade alpha efficiency.'
      ),
    },
  },
  flsp: {
    alpha: {
      tooltip: alphaEfficiencyUnstackedTooltip(
        'FLSP is a pure systematic alternatives sleeve: style premia and macro-style signals without a bundled equity stack.'
      ),
    },
  },
  ialt: {
    alpha: {
      tooltip: insufficientHistoryTooltip(
        'IALT’s multi-sleeve alternatives book requires sufficient live history to judge alpha efficiency versus hurdle rates.'
      ),
    },
  },
  caos: {
    alpha: {
      tooltip: alphaEfficiencyUnstackedTooltip(
        'CAOS is a tail-risk and convexity sleeve: options and volatility-linked positioning designed to pay in crash environments rather than grind equity-like returns.'
      ),
    },
  },
  sso: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'SSO seeks 2x daily S&P 500 exposure via swaps and futures. The grade accounts for daily-reset compounding effects.'
      ),
    },
  },
  upro: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'UPRO targets 3x daily S&P 500 exposure. The grade reflects annualized excess versus SPY after path dependence and volatility drag.'
      ),
    },
  },
  qld: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'QLD provides 2x daily Nasdaq-100 exposure. The grade scores annualized excess return versus SPY under the same framework used for all equity-side ETFs.'
      ),
    },
  },
  tqqq: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'TQQQ provides 3x daily Nasdaq-100 exposure. The grade measures annualized excess versus SPY, including daily-reset compounding.'
      ),
    },
  },
  spmo: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'SPMO targets S&P 500 momentum factor exposure: rules-based tilts toward recent relative strength within the large-cap universe.'
      ),
    },
  },
  vflo: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'VFLO emphasizes free-cash-flow-rich U.S. equities versus a broad benchmark. It’s a factor equity sleeve.'
      ),
    },
  },
  avuv: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'AVUV is actively managed U.S. small-cap value with profitability and value tilts versus a Russell 2000 Value–style opportunity set.'
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
  sgrt: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'SGRT is a concentrated, quant-driven U.S. large-cap earnings-growth sleeve; capital efficiency measures its return versus SPY for the equity risk it takes.'
      ),
    },
  },
  emeq: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'EMEQ is an actively managed, focused emerging-markets equity sleeve; capital efficiency measures its return versus SPY for the equity risk it takes.'
      ),
    },
  },
  foxy: {
    alpha: {
      tooltip: insufficientHistoryTooltip(
        'FOXY harvests EM currency carry (long high-yield, short low-yield EM pairs) and G10 mean reversion via currency forwards and futures. Launched February 2025; insufficient live history to grade alpha efficiency.'
      ),
    },
  },
  cta: {
    alpha: {
      tooltip: alphaEfficiencyUnstackedTooltip(
        'Simplify CTA is a diversified managed-futures sleeve: trend and macro signals across asset classes in a single systematic ETF.'
      ),
    },
  },
  dbmf: {
    alpha: {
      tooltip: alphaEfficiencyUnstackedTooltip(
        'DBMF replicates hedge-fund managed-futures industry returns across rates, FX, commodities, and equity index futures via a dynamic beta sleeve.'
      ),
    },
  },
  kmlm: {
    alpha: {
      tooltip: alphaEfficiencyUnstackedTooltip(
        'KMLM is KraneShares’ managed-futures ETF: systematic trend and macro exposure without a bundled equity stack.'
      ),
    },
  },
  vamo: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'VAMO holds a long U.S. equity book (value and momentum factors) and can hedge up to 100% with S&P 500 futures. The grade measures excess return versus SPY, net of costs and tactical hedge drag.'
      ),
    },
  },
  clse: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'CLSE is long/short U.S. equity with net exposure below 1.0 beta. The grade measures excess return versus SPY, net of costs.'
      ),
    },
  },
  orr: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'ORR is a global long/short equity ETF with single-name longs and shorts and meaningful short exposure.'
      ),
    },
  },
  wtls: {
    capital: {
      tooltip: insufficientHistoryTooltip(
        'WTLS holds roughly 90% U.S. large-cap equity as the capital sleeve, benchmarked against SPY. Launched January 2026; insufficient live history to grade capital efficiency.'
      ),
    },
    alpha: {
      tooltip: insufficientHistoryTooltip(
        'The alpha sleeve is a machine-learning-driven long/short U.S. equity overlay adding approximately 90% notional exposure above the equity position. Launched January 2026; insufficient live history to grade alpha efficiency.'
      ),
    },
  },
  asgm: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'ASGM blends a strategic equity component with AlphaSimplex systematic macro futures across rates, FX, and commodities.'
      ),
    },
    alpha: {
      tooltip: alphaEfficiencyStackedTooltip(
        'The macro book rotates with volatility targeting and trend signals; sleeve weights shift with model output.'
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
        'MRGR tracks S&P Merger Arbitrage Index economics: deal targets, acquirer hedges, and bounded net exposure.'
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
  mema: {
    alpha: {
      tooltip: insufficientHistoryTooltip(
        'MEMA is an active emerging-markets long/short equity ETF run by Man Group. Launched December 2025; insufficient live history to grade alpha efficiency.'
      ),
    },
  },
  mate: {
    capital: {
      tooltip: insufficientHistoryTooltip(
        'MATE stacks 100% active managed-futures exposure on top of 100% S&P 500 equity, using swaps to run both on the same capital. Launched December 2025; insufficient live history to grade capital efficiency.'
      ),
    },
    alpha: {
      tooltip: insufficientHistoryTooltip(
        "MATE's alpha sleeve is Man Group's active trend strategy running rates, FX, commodities, and equity indices. Launched December 2025; insufficient live history to grade alpha efficiency."
      ),
    },
  },
  rssy: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'RSSY stacks 100% S&P 500 equity and 100% futures yield on the same capital. Capital efficiency grades the equity sleeve versus SPY.'
      ),
    },
    alpha: {
      tooltip: alphaEfficiencyStackedTooltip(
        'The alpha sleeve is a diversified futures yield book: carry and roll across rates, FX, commodities, and equity index futures.'
      ),
    },
  },
  hfgm: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'HFGM maintains partial equity exposure alongside its global macro overlay; capital efficiency grades that equity component versus SPY.'
      ),
    },
    alpha: {
      tooltip: alphaEfficiencyStackedTooltip(
        "The alpha sleeve is Unlimited's factor-model replication of diversified hedge-fund global macro strategies."
      ),
    },
  },
  ctap: {
    capital: {
      tooltip: insufficientHistoryTooltip(
        'CTAP stacks 100% U.S. equity and 100% managed futures on the same capital using the Simplify implementation. Launched December 2025; insufficient live history to grade capital efficiency.'
      ),
    },
    alpha: {
      tooltip: insufficientHistoryTooltip(
        'The alpha sleeve is a managed futures overlay across rates, FX, commodities, and equity index futures. Launched December 2025; insufficient live history to grade alpha efficiency.'
      ),
    },
  },
  rssb: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'RSSB stacks 100% global equity (ACWI) and 100% intermediate Treasuries on the same capital. Capital efficiency grades the equity sleeve versus SPY.'
      ),
    },
    alpha: {
      tooltip: alphaEfficiencyStackedTooltip(
        'The alpha sleeve is a Treasury bond overlay supplying duration exposure on top of the full global equity position.'
      ),
    },
  },
  gdt: {
    capital: {
      tooltip: insufficientHistoryTooltip(
        "GDT pairs 90% TIPS exposure with a 90% gold futures overlay in WisdomTree's capital-efficient structure. Launched January 2026; insufficient live history to grade capital efficiency."
      ),
    },
    alpha: {
      tooltip: insufficientHistoryTooltip(
        'The alpha sleeve is a gold futures overlay layered on TIPS. Launched January 2026; insufficient live history to grade alpha efficiency.'
      ),
    },
  },
  ntsx: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'NTSX runs 90% U.S. large-cap equity plus a 60% Treasury futures overlay to replicate a 90/60 allocation on one dollar of capital. Capital efficiency grades the equity sleeve versus SPY.'
      ),
    },
    alpha: {
      tooltip: alphaEfficiencyStackedTooltip(
        'The alpha sleeve is a 60% Treasury futures overlay providing duration exposure beyond the equity position.'
      ),
    },
  },
  ntsi: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'NTSI runs 90% developed-world ex-U.S. equity plus a 60% Treasury overlay, mirroring the NTSX structure for international exposure. Capital efficiency grades the equity sleeve versus SPY.'
      ),
    },
    alpha: {
      tooltip: alphaEfficiencyStackedTooltip(
        'The alpha sleeve is a 60% Treasury futures overlay providing duration alongside the international equity position.'
      ),
    },
  },
  ntse: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'NTSE runs 90% emerging-markets equity plus a 60% Treasury overlay, mirroring the NTSX structure for EM exposure. Capital efficiency grades the equity sleeve versus SPY.'
      ),
    },
    alpha: {
      tooltip: alphaEfficiencyStackedTooltip(
        'The alpha sleeve is a 60% Treasury futures overlay providing duration alongside the emerging-markets equity position.'
      ),
    },
  },
  avdv: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'AVDV is a pure equity sleeve: Avantis international small-cap value factor tilt, graded versus SPY as the broad benchmark hurdle.'
      ),
    },
  },
  cowz: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'COWZ is a pure equity sleeve: Pacer free-cash-flow yield factor ranking the top 100 Russell 1000 names on trailing FCF yield, rebalanced annually.'
      ),
    },
  },
  ptf: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'PTF is a pure equity sleeve: Invesco Dorsey Wright technology momentum factor, ranking U.S. technology names on relative strength signals.'
      ),
    },
  },
  hard: {
    alpha: {
      tooltip: insufficientHistoryTooltip(
        'HARD is a long/short commodities and hard-assets ETF from Simplify. Launched February 2026; insufficient live history to grade alpha efficiency.'
      ),
    },
  },
  hold: {
    capital: {
      tooltip: insufficientHistoryTooltip(
        "HOLD layers 75% U.S. equity and 75% managed futures on the same capital using Harbor's alpha-layering structure. Launched August 2025; insufficient live history to grade capital efficiency."
      ),
    },
    alpha: {
      tooltip: insufficientHistoryTooltip(
        'The alpha sleeve is a managed futures overlay across rates, FX, commodities, and equity index futures. Launched August 2025; insufficient live history to grade alpha efficiency.'
      ),
    },
  },

  // --- Fixed income / structured credit ---
  jaaa: {
    alpha: {
      tooltip: alphaEfficiencyUnstackedTooltip(
        'JAAA is a pure floating-rate structured credit sleeve: AAA-rated CLO tranches with near-zero duration and equity correlation. Alpha efficiency grades the carry spread above SOFR delivered per unit of credit-spread risk taken.'
      ),
    },
  },
  cloa: {
    alpha: {
      tooltip: alphaEfficiencyUnstackedTooltip(
        "CLOA is BlackRock's AAA CLO active sleeve: USD-denominated senior CLO tranches with floating-rate coupons. Alpha efficiency grades the carry spread above SOFR delivered per unit of credit-spread risk taken."
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
        'The alpha bucket bundles investment-grade-style bonds and the systematic managed-futures sleeve (~150% combined notional vs ~50% equity): rates, FX, and commodities per the Return Stacked® Canada sleeve design.'
      ),
    },
  },
  onec: {
    alpha: {
      tooltip: alphaEfficiencyUnstackedTooltip(
        'ONEC is a multi-alternative fund-of-funds: credit, macro, long/short equity, and real-asset sleeves rebalanced by Accelerate.'
      ),
    },
  },
  pfaa: {
    alpha: {
      tooltip: alphaEfficiencyUnstackedTooltip(
        'PFAA is Picton Mahoney’s multi-strategy sleeve: long/short equity, relative-value credit, and macro books in one ETF wrapper.'
      ),
    },
  },
  zlb: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        "ZLB tracks BMO's Canadian low-volatility factor index: rules-based tilts toward historically lower-beta TSX names."
      ),
    },
  },
  fcmo: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'FCMO tracks the Fidelity Canada U.S. Momentum Index: 100 U.S. large-cap names ranked on positive momentum signals, quarterly rebalanced. Capital efficiency grades the sleeve versus a CAD-hedged S&P 500 proxy (XSP.TO).'
      ),
    },
  },
  fccm: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'FCCM tracks the Fidelity Canada Canadian Momentum Index: 100 Canadian large-cap names ranked on positive momentum signals, quarterly rebalanced. Capital efficiency grades the sleeve versus a CAD-hedged S&P 500 proxy (XSP.TO).'
      ),
    },
  },
  pmm: {
    alpha: {
      tooltip: alphaEfficiencyUnstackedTooltip(
        'PMM is a systematic market-neutral fund running long/short positions across equities, FX, rates, and commodities using value, carry, and momentum signals. Sub-advised by Neuberger Berman Canada.'
      ),
    },
  },
  atsx: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'ATSX runs a ~150% long / 50% short systematic book versus the S&P/TSX 60. On this site the listed beta and capital-efficiency line use a CAD-hedged S&P 500 proxy (XSP.TO) as the hurdle benchmark.'
      ),
    },
  },
  pfae: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'PFAE runs a ~130% long / 30% short Canadian equity book with roughly full-market net exposure. The capital line scores that sleeve versus a CAD-hedged S&P 500 proxy (XSP.TO).'
      ),
    },
  },
  pfls: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'PFLS is Picton’s global long/short equity sleeve with moderate net exposure: Authentic Hedge® risk budgeting in ETF form.'
      ),
    },
  },
  tgaf: {
    capital: {
      tooltip: capitalEfficiencyTooltip(
        'TGAF is a global long/short equity ETF (~100% long, ~40% short) benchmarked to MSCI ACWI NR (CAD).'
      ),
    },
  },
  dglm: {
    alpha: {
      tooltip: alphaEfficiencyUnstackedTooltip(
        'DGLM is Desjardins’ long/short global macro sleeve, sub-advised by Graham Capital. It trades futures and forwards across rates, FX, commodities, and selective equity beta.'
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
        'BTCC-B holds spot Bitcoin in cold storage: CAD-unhedged Purpose Bitcoin ETF units providing direct digital-asset beta in a regulated wrapper.'
      ),
    },
  },
  ethxb: {
    alpha: {
      tooltip: alphaEfficiencyUnstackedTooltip(
        "ETHX-B holds spot Ether in custody. It's CI Galaxy's Canadian-listed spot sleeve with CAD-unhedged pricing."
      ),
    },
  },
  hdge: {
    alpha: {
      tooltip: alphaEfficiencyUnstackedTooltip(
        "HDGE.TO is Accelerate's long/short equity fund running a diversified book of individual stock longs and shorts across North American equities. The benchmark hurdle for CA ETFs uses XSP.TO."
      ),
    },
  },
  pfmn: {
    alpha: {
      tooltip: alphaEfficiencyUnstackedTooltip(
        'PFMN runs a systematic market-neutral long/short equity book by Picton Mahoney, targeting near-zero net beta. The benchmark hurdle for CA ETFs uses XSP.TO.'
      ),
    },
  },
  arb: {
    alpha: {
      tooltip: alphaEfficiencyUnstackedTooltip(
        "ARB.TO is Accelerate's merger and SPAC arbitrage fund: long announced deal targets against deal terms, with short positions in the acquirer when applicable. The benchmark hurdle for CA ETFs uses XSP.TO."
      ),
    },
  },
  baaa: {
    alpha: {
      tooltip: alphaEfficiencyUnstackedTooltip(
        'BAAA.TO is Brompton\'s actively managed AAA CLO portfolio: floating-rate structured credit income with no equity sleeve, sub-advised by Wellington Square Advisors. The alpha grade scores credit yield delivery versus costs and hurdle.'
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

  const merged = applyMonthlyEfficiencyGradePatch(staticEff, patch)
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
  const merged = applyMonthlyEfficiencyGradePatch(staticEff, patch)
  return { ...def, efficiency: attachStackedEfficiency(def, merged, slug) }
}
