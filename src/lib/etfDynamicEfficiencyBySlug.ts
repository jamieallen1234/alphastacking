import type { EtfDynamicDef, EtfDynamicEfficiencyDef } from '@/lib/etfDynamicRegistryTypes'
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

export function applyMonthlyEfficiencyGradePatch(
  base: EtfDynamicEfficiencyDef,
  patch: MonthlyEfficiencyGradePatch | null,
  slug: string
): EtfDynamicEfficiencyDef {
  if (!patch) return base

  const out: EtfDynamicEfficiencyDef = {
    ...base,
    notes: base.notes != null ? [...base.notes] : undefined,
    footnotes: base.footnotes != null ? [...base.footnotes] : undefined,
  }

  if (patch.capital && base.capital) {
    if (slug === 'ntsd' && patch.capital.grade !== 'N/A') {
      out.capital = {
        ...base.capital,
        grade: patch.capital.grade,
        tooltip: NTSD_CAPITAL_EFFICIENCY_TOOLTIP_GRADED,
        gradeTone: patch.capital.grade === 'A+' ? 'gold' : base.capital.gradeTone,
      }
    } else {
      out.capital = { ...base.capital, grade: patch.capital.grade }
    }
  }

  if (patch.alpha && base.alpha) {
    out.alpha = { ...base.alpha, grade: patch.alpha.grade }
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
      grade: 'B',
      tooltip: capitalEfficiencyTooltip(
        'BEGS targets leveraged long exposure to a blended cryptocurrency and precious-metals basket via futures, swaps, and ETPs—high-beta equity-style sleeves stacked in one wrapper.'
      ),
    },
    alpha: {
      grade: 'B',
      tooltip: alphaEfficiencyStackedTooltip(
        'The non-equity leg is the commodities/crypto stack beyond plain large-cap beta—daily-reset leverage and roll mechanics dominate outcomes versus spot coins or bullion.'
      ),
    },
  },
  btgd: {
    capital: {
      grade: 'B',
      tooltip: capitalEfficiencyTooltip(
        'BTGD seeks simultaneous ~100% bitcoin and ~100% gold exposure—two macro betas implemented with futures and ETPs per Quantify’s STKd design.'
      ),
    },
    alpha: {
      grade: 'B',
      tooltip: alphaEfficiencyStackedTooltip(
        'The sleeve beyond core equity-style beta here is the paired gold and bitcoin book plus implementation drag—futures curve and collateral mechanics drive incremental outcomes.'
      ),
    },
  },
  isbg: {
    capital: {
      grade: 'N/A',
      tooltip: insufficientHistoryTooltip(
        'ISBG combines bitcoin and gold beta with an options-income overlay per Quantify disclosures; capital-efficiency grading needs more overlapping live NAV history.'
      ),
    },
    alpha: {
      grade: 'N/A',
      tooltip: insufficientHistoryTooltip(
        'The income and volatility-selling sleeves sit on top of dual commodity/digital betas—alpha-style outcomes require more live data before assignment.'
      ),
    },
  },
  issb: {
    capital: {
      grade: 'N/A',
      tooltip: insufficientHistoryTooltip(
        'ISSB pairs large-cap U.S. equity exposure with bitcoin and an options-premium sleeve; stacked capital efficiency is tracked once sufficient live NAV exists.'
      ),
    },
    alpha: {
      grade: 'N/A',
      tooltip: insufficientHistoryTooltip(
        'The stacked book includes short-volatility and distribution mechanics alongside equity and crypto legs—grade when history threshold is met.'
      ),
    },
  },
  ooqb: {
    capital: {
      grade: 'B',
      tooltip: capitalEfficiencyTooltip(
        'OOQB targets roughly ~100% Nasdaq-100 notional alongside ~100% bitcoin futures exposure in one listed wrapper (Volatility Shares One+One™ design).'
      ),
    },
    alpha: {
      grade: 'B',
      tooltip: alphaEfficiencyStackedTooltip(
        'The non-core sleeve is bitcoin futures exposure engineered alongside Nasdaq beta—implementation, margin, and roll dominate versus a single-index mental model.'
      ),
    },
  },
  oosb: {
    capital: {
      grade: 'B',
      tooltip: capitalEfficiencyTooltip(
        'OOSB targets ~100% S&P 500 notional alongside ~100% bitcoin futures—stacked large-cap U.S. beta plus digital-asset futures per sponsor disclosures.'
      ),
    },
    alpha: {
      grade: 'B',
      tooltip: alphaEfficiencyStackedTooltip(
        'Incremental sleeve is bitcoin futures stacked on the equity book—futures funding, exchange limits, and path risk are the main non-equity levers.'
      ),
    },
  },
  rssx: {
    capital: {
      grade: 'B',
      tooltip: capitalEfficiencyTooltip(
        'RSSX layers a U.S. large-cap equity sleeve with gold and bitcoin exposure (Return Stacked® mandate—see prospectus for notional weights and instruments).'
      ),
    },
    alpha: {
      grade: 'B',
      tooltip: alphaEfficiencyStackedTooltip(
        'Gold and bitcoin sleeves sit alongside the equity core—hard-asset and digital-scarcity betas implemented with futures, trusts, or swaps per filings.'
      ),
    },
    footnotes: [EFFICIENCY_PROVISIONAL_FOOTNOTE],
  },
  wtib: {
    capital: {
      grade: 'B',
      tooltip: capitalEfficiencyTooltip(
        'WTIB balances crude oil and bitcoin futures/ETP exposure in an actively tilted sleeve—commodity + digital beta in one fund.'
      ),
    },
    alpha: {
      grade: 'B',
      tooltip: alphaEfficiencyStackedTooltip(
        'The non-U.S.-large-cap leg is the oil/bitcoin futures stack and how USCF allocates between them—curve and funding matter as much as spot narratives.'
      ),
    },
    footnotes: [EFFICIENCY_PROVISIONAL_FOOTNOTE],
  },
  rsst: {
    capital: {
      grade: 'B',
      tooltip: capitalEfficiencyTooltip(
        'RSST targets roughly a dollar of U.S. large-cap equity notional alongside a dollar of systematic managed futures per Return Stacked® disclosures.'
      ),
    },
    alpha: {
      grade: 'B',
      tooltip: alphaEfficiencyStackedTooltip(
        'The alpha sleeve is trend-following managed futures across rates, FX, commodities, and equity indices—implemented with futures and collateral per filings.'
      ),
    },
  },
  gde: {
    capital: {
      grade: 'B',
      tooltip: capitalEfficiencyTooltip(
        'GDE pairs U.S. large-cap equity with a gold futures overlay—WisdomTree’s capital-efficient gold-plus-equity structure per prospectus.'
      ),
    },
    alpha: {
      grade: 'B',
      tooltip: alphaEfficiencyStackedTooltip(
        'The non-core sleeve is gold futures exposure for convexity versus real-rate and stress regimes—roll and margin interact with the equity leg.'
      ),
    },
  },
  flsp: {
    alpha: {
      grade: 'A',
      tooltip: alphaEfficiencyUnstackedTooltip(
        'FLSP is a pure systematic alternatives sleeve—style premia and macro-style signals without a bundled S&P 500 stack per sponsor mandate.'
      ),
    },
  },
  ialt: {
    alpha: {
      grade: 'N/A',
      tooltip: insufficientHistoryTooltip(
        'IALT’s multi-sleeve alternatives book requires sufficient live history to judge alpha efficiency versus hurdle rates—see prospectus for current engines.'
      ),
    },
  },
  caos: {
    alpha: {
      grade: 'C',
      tooltip: alphaEfficiencyUnstackedTooltip(
        'CAOS is a tail-risk / convexity sleeve—options and volatility-linked positioning designed to pay in crash regimes rather than grind equity-like returns.'
      ),
    },
  },
  spmo: {
    capital: {
      grade: 'B',
      tooltip: capitalEfficiencyTooltip(
        'SPMO targets S&P 500 momentum factor exposure—rules-based tilts toward recent relative strength within the large-cap universe.'
      ),
    },
  },
  vflo: {
    capital: {
      grade: 'B',
      tooltip: capitalEfficiencyTooltip(
        'VFLO emphasizes free-cash-flow-rich U.S. equities versus a broad benchmark—factor equity.'
      ),
    },
  },
  avuv: {
    capital: {
      grade: 'B',
      tooltip: capitalEfficiencyTooltip(
        'AVUV is actively managed U.S. small-cap value—profitability and value tilts versus a Russell 2000 Value–style opportunity set.'
      ),
    },
  },
  sass: {
    capital: {
      grade: 'N/A',
      tooltip: insufficientHistoryTooltip(
        'SASS is a concentrated U.S. value sleeve (~20–25 names); capital efficiency vs SPY is assessed after the minimum live NAV window is met.'
      ),
    },
  },
  cta: {
    alpha: {
      grade: 'B',
      tooltip: alphaEfficiencyUnstackedTooltip(
        'Simplify CTA is a diversified managed-futures sleeve—trend and macro signals across asset classes in a single systematic ETF.'
      ),
    },
  },
  dbmf: {
    alpha: {
      grade: 'A',
      tooltip: alphaEfficiencyUnstackedTooltip(
        'DBMF implements replication of hedge-fund managed-futures industry returns—rates, FX, commodities, and equity index futures per dynamic beta engine.'
      ),
    },
  },
  kmlm: {
    alpha: {
      grade: 'B',
      tooltip: alphaEfficiencyUnstackedTooltip(
        'KMLM is KraneShares’ managed-futures ETF—systematic trend and macro exposure without a bundled equity stack.'
      ),
    },
  },
  clse: {
    capital: {
      grade: 'B',
      tooltip: capitalEfficiencyTooltip(
        'CLSE is long/short U.S. equity with net exposure below 1.0 beta—capital efficiency is scored on excess return vs SPY net of costs per long/short rules.'
      ),
    },
  },
  orr: {
    capital: {
      grade: 'B',
      tooltip: capitalEfficiencyTooltip(
        'ORR is a global long/short equity ETF—single-name longs and shorts with meaningful short exposure per Militia disclosures.'
      ),
    },
  },
  asgm: {
    capital: {
      grade: 'B',
      tooltip: capitalEfficiencyTooltip(
        'ASGM blends a strategic equity component with AlphaSimplex systematic macro futures—rates, FX, and commodities alongside listed equity risk.'
      ),
    },
    alpha: {
      grade: 'B',
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
      grade: 'B',
      tooltip: alphaEfficiencyUnstackedTooltip(
        'MRGR tracks S&P Merger Arbitrage Index economics—deal targets, acquirer hedges, and bounded net exposure per rules-based event sleeves.'
      ),
    },
  },
}

export const CA_ETF_DYNAMIC_EFFICIENCY: Record<string, EtfDynamicEfficiencyDef> = {
  rgbm: {
    capital: {
      grade: 'B',
      tooltip: capitalEfficiencyTooltip(
        'RGBM stacks a global balanced core (equities and investment-grade-style bonds) with a systematic managed-futures sleeve per Canadian offering documents.'
      ),
    },
    alpha: {
      grade: 'B',
      tooltip: alphaEfficiencyStackedTooltip(
        'The macro sleeve trades rates, FX, and commodities via derivatives—Return Stacked® Canada mandate with performance-fee mechanics per prospectus.'
      ),
    },
  },
  onec: {
    alpha: {
      grade: 'B',
      tooltip: alphaEfficiencyUnstackedTooltip(
        'ONEC is a multi-alternative fund-of-funds—credit, macro, long/short equity, and real-asset sleeves rebalanced by Accelerate per mandate.'
      ),
    },
  },
  pfaa: {
    alpha: {
      grade: 'B',
      tooltip: alphaEfficiencyUnstackedTooltip(
        'PFAA is Picton Mahoney’s multi-strategy sleeve—long/short equity, relative-value credit, and macro books in one ETF wrapper.'
      ),
    },
  },
  zlb: {
    capital: {
      grade: 'B',
      tooltip: capitalEfficiencyTooltip(
        'ZLB tracks BMO’s Canadian low-volatility factor index—rules-based tilts toward historically lower-beta TSX names.'
      ),
    },
  },
  atsx: {
    capital: {
      grade: 'B',
      tooltip: capitalEfficiencyTooltip(
        'ATSX runs a ~150% long / 50% short systematic book versus the S&P/TSX 60—Canadian long/short equity with leverage per ETF Facts.'
      ),
    },
  },
  pfls: {
    capital: {
      grade: 'B',
      tooltip: capitalEfficiencyTooltip(
        'PFLS is Picton’s global long/short equity sleeve with moderate net exposure—Authentic Hedge® risk budgeting in ETF form.'
      ),
    },
  },
  tgaf: {
    capital: {
      grade: 'B',
      tooltip: capitalEfficiencyTooltip(
        'TGAF is a global long/short equity ETF (~100% long, ~40% short) benchmarked to MSCI ACWI NR (CAD) per Tralucent disclosures.'
      ),
    },
  },
  dglm: {
    alpha: {
      grade: 'B',
      tooltip: alphaEfficiencyUnstackedTooltip(
        'DGLM is Desjardins’ long/short global macro sleeve—Graham Capital sub-advised futures and forwards across rates, FX, commodities, and selective equity beta.'
      ),
    },
    footnotes: [EFFICIENCY_PROVISIONAL_FOOTNOTE],
  },
  btccb: {
    capital: {
      grade: 'B',
      tooltip: capitalEfficiencyTooltip(
        'BTCC-B holds spot Bitcoin in cold storage—CAD-unhedged Purpose Bitcoin ETF units, direct digital-asset beta in a regulated wrapper.'
      ),
    },
  },
  ethxb: {
    capital: {
      grade: 'B',
      tooltip: capitalEfficiencyTooltip(
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

  const merged = patch ? applyMonthlyEfficiencyGradePatch(staticEff, patch, slug) : staticEff
  return { ...def, efficiency: merged }
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
  const merged = patch ? applyMonthlyEfficiencyGradePatch(staticEff, patch, slug) : staticEff
  return { ...def, efficiency: merged }
}
