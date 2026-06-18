import type { StrategyPieSlice } from '@/components/StrategyPieChart'

// -------------------- Derived category pie (every portfolio) --------------------
//
// Each slice fuses an alpha category (from the ETF hub taxonomy) with the index growth
// engine that funds it. Growth is assigned to alpha sections by leverage: high-leverage
// (3×) growth pairs with the lowest-beta alpha, moderate-leverage growth pairs with the
// most directional (Long/short) alpha, and a lone growth engine splits across same-beta
// sleeves. See the plan / `buildPairedSlices` below.
//
// NOTE for new portfolios: any genuinely new ticker must be added to one of the maps
// below (stacked split, factor, growth, or alpha), or it renders as "Unclassified".

type HoldingInput = { ticker: string; weightPct: number }

/** Self-paired return-stacked funds: [equity index label | null, alpha category]. */
const STACK_SPLIT: Record<string, [string | null, string]> = {
  MATE: ['S&P 500', 'Managed futures'],
  RSST: ['S&P 500', 'Managed futures'],
  RSSY: ['S&P 500', 'Premia/carry'],
  RSSB: ['Global', 'Fixed income'],
  GDE: ['S&P 500', 'Real assets/gold'],
  NTSX: ['S&P 500', 'Fixed income'],
  GDT: [null, 'Real assets/gold'],
  'RGBM.TO': ['Global', 'Global macro'],
  // Equity on both sides (US large-cap base + long/short equity overlay): split between
  // its S&P 500 beta and its long/short alpha rather than counting it as pure alpha.
  WTLS: ['S&P 500', 'Long/short'],
}

/**
 * Long-only factor funds: self-paired. Growth is the fund's OWN equity holdings (not a separate
 * S&P 500 index sleeve) and the factor tilt is the alpha. In a factor barbell (e.g. momentum + value)
 * the growth is the equity of those factor holdings; when a real growth engine (LETF in GROWTH_FUNDS)
 * is also present it adds its own index growth on top.
 */
const FACTOR_FUNDS: Record<string, string> = {
  SPMO: 'US large-cap',
  VFLO: 'US large-cap',
  'ZLB.TO': 'Canadian equity',
  'FCMO.TO': 'US large-cap',
}

/** Pure-growth funds (levered / plain index): ticker → index label. */
const GROWTH_FUNDS: Record<string, string> = {
  SSO: 'S&P 500',
  UPRO: 'S&P 500',
  'USSL.TO': 'S&P 500',
  QQQ: 'Nasdaq-100',
  QLD: 'Nasdaq-100',
  'QQQL.TO': 'Nasdaq-100',
  'HEQL.TO': 'Global',
  NTSD: 'S&P 500/Intl',
}

/** Leverage multiple per growth fund (drives high-vs-moderate pairing). */
const LEVERAGE: Record<string, number> = {
  UPRO: 3,
  SSO: 2,
  QLD: 2,
  NTSD: 1.5,
  'USSL.TO': 1.25,
  'QQQL.TO': 1.25,
  'HEQL.TO': 1.25,
  QQQ: 1,
}

/** Pure-alpha funds: ticker → ETF hub alpha category. */
const ALPHA_FUNDS: Record<string, string> = {
  CLSE: 'Long/short',
  ORR: 'Long/short',
  'HDGE.TO': 'Long/short',
  'PFLS.TO': 'Long/short',
  // Market-neutral (beta ~0.12): behaves like a premia/carry sleeve, not directional long/short.
  'PFMN.TO': 'Premia/carry',
  'ATSX.TO': 'Long/short',
  FLSP: 'Premia/carry',
  FOXY: 'Premia/carry',
  IALT: 'Premia/carry',
  DBMF: 'Managed futures',
  HARD: 'Global macro',
  'DGLM.TO': 'Global macro',
  'ARB.TO': 'Arbitrage',
  ZROZ: 'Fixed income',
  GLD: 'Real assets/gold',
}

/** Indicative net equity beta per alpha category (sorts hedged vs directional). */
const SECTION_BETA: Record<string, number> = {
  'Long/short': 0.6,
  'Real assets/gold': 0.1,
  Arbitrage: 0.05,
  'Premia/carry': 0,
  'Managed futures': 0,
  'Global macro': 0,
  'Fixed income': -0.1,
}

/** Human phrase per alpha category, shown on the "Alpha:" legend line. */
const ALPHA_PHRASE: Record<string, string> = {
  'Long/short': 'long/short equity',
  'Premia/carry': 'systematic premia / carry',
  'Managed futures': 'managed futures (trend)',
  'Global macro': 'global macro',
  Arbitrage: 'merger arbitrage',
  Factor: 'equity factor (momentum, value)',
  'Fixed income': 'long-duration bonds',
  'Real assets/gold': 'gold / real assets',
}

/**
 * Non-growth environments each alpha category adds resilience in, shown as legend badges.
 * Growth is omitted because it is the implicit shared core of every alpha-stacking book.
 * Lists stay in the canonical order: Inflation, Recession, Deflation, Sideways Chop.
 */
const CATEGORY_ENVIRONMENTS: Record<string, string[]> = {
  'Long/short': ['Sideways Chop'],
  Factor: ['Inflation'],
  'Premia/carry': ['Inflation', 'Sideways Chop'],
  'Managed futures': ['Inflation', 'Recession', 'Deflation'],
  'Global macro': ['Inflation', 'Recession', 'Deflation'],
  Arbitrage: ['Sideways Chop'],
  'Fixed income': ['Recession', 'Deflation'],
  'Real assets/gold': ['Inflation', 'Recession', 'Deflation'],
}

const SLICE_PALETTE = [
  '#7aa6e8',
  '#5dca8a',
  '#e8944a',
  '#c9a84c',
  '#b07ad8',
  '#5cb8c4',
  '#d8728f',
  '#8c9a5b',
  '#c98a5c',
  '#7f8cd0',
]

const DIRECTIONAL_BETA = 0.3

type Section = {
  category: string
  weight: number
  indexes: Set<string>
  growthFunds: string[]
  alphaFunds: string[]
  needy: boolean
}

function uniqueIndexes(set: Set<string>): string {
  return [...new Set([...set].flatMap((s) => s.split('/')))].join('/')
}

/**
 * Build category-pie slices from preset holdings: classify each holding, group pure-alpha
 * funds into sections, then assign each growth engine to a section by leverage/beta.
 * Returns slices summing to ~100% of capital weight, sorted largest-first.
 */
export function buildPairedSlices(holdings: HoldingInput[]): StrategyPieSlice[] {
  const sections = new Map<string, Section>()
  const add = (
    category: string,
    weight: number,
    opts: { growthFund?: string; alphaFund?: string; index?: string | null; needy?: boolean }
  ) => {
    let s = sections.get(category)
    if (!s) {
      s = { category, weight: 0, indexes: new Set(), growthFunds: [], alphaFunds: [], needy: false }
      sections.set(category, s)
    }
    s.weight += weight
    if (opts.growthFund) s.growthFunds.push(opts.growthFund)
    if (opts.alphaFund) s.alphaFunds.push(opts.alphaFund)
    if (opts.index) s.indexes.add(opts.index)
    if (opts.needy) s.needy = true
  }

  const growthQueue: Array<{ ticker: string; weight: number; index: string }> = []

  for (const h of holdings) {
    const t = h.ticker.toUpperCase()
    const w = h.weightPct
    if (STACK_SPLIT[t]) {
      const [index, category] = STACK_SPLIT[t]
      add(category, w, { growthFund: index ? t : undefined, alphaFund: t, index })
    } else if (FACTOR_FUNDS[t]) {
      add('Factor', w, { growthFund: t, alphaFund: t, index: FACTOR_FUNDS[t] })
    } else if (GROWTH_FUNDS[t]) {
      growthQueue.push({ ticker: t, weight: w, index: GROWTH_FUNDS[t] })
    } else if (ALPHA_FUNDS[t]) {
      add(ALPHA_FUNDS[t], w, { alphaFund: t, needy: true })
    } else {
      add(`Unclassified (${t})`, w, { alphaFund: t })
    }
  }

  const needy = [...sections.values()].filter((s) => s.needy).map((s) => s.category)

  if (needy.length === 0) {
    // No pure-alpha sleeve to fund: fold growth into the largest existing self-paired
    // section (e.g. ca-factor-fcmo: Nasdaq growth joins Factor). If nothing exists, the
    // growth becomes its own core slice.
    const largest = [...sections.values()].sort((a, b) => b.weight - a.weight)[0]
    for (const g of growthQueue) {
      if (largest) {
        largest.weight += g.weight
        largest.growthFunds.push(g.ticker)
        largest.indexes.add(g.index)
      } else {
        add(`Growth core (${g.index})`, g.weight, { growthFund: g.ticker, index: g.index })
      }
    }
  } else {
    const directional = needy
      .filter((c) => SECTION_BETA[c] >= DIRECTIONAL_BETA)
      .sort((a, b) => sections.get(b)!.weight - sections.get(a)!.weight)
    const hedgedFirst = [...needy].sort((a, b) => (SECTION_BETA[a] ?? 0) - (SECTION_BETA[b] ?? 0))
    const noDirectional = directional.length === 0
    // Snapshot original alpha weights so the pro-rata split is not compounded by growth
    // already added from a prior growth fund.
    const alphaWeight = new Map(needy.map((c) => [c, sections.get(c)!.weight]))
    const alphaTotal = needy.reduce((sum, c) => sum + alphaWeight.get(c)!, 0) || needy.length

    for (const g of growthQueue) {
      if (noDirectional) {
        // Lone/low-beta book: split this growth engine across all sleeves pro-rata.
        for (const c of needy) {
          const s = sections.get(c)!
          s.weight += g.weight * (alphaWeight.get(c)! / alphaTotal)
          s.growthFunds.push(`${g.ticker}*`)
          s.indexes.add(g.index)
        }
      } else {
        const target =
          (LEVERAGE[g.ticker] ?? 1) >= 2.5 ? hedgedFirst[0] : directional[0]
        const s = sections.get(target)!
        s.weight += g.weight
        s.growthFunds.push(g.ticker)
        s.indexes.add(g.index)
      }
    }
  }

  const ordered = [...sections.values()].sort((a, b) => b.weight - a.weight)
  return ordered.map((s, i) => {
    const indexLabel = uniqueIndexes(s.indexes)
    const hasGrowth = indexLabel.length > 0
    const growthTickers = [...new Set(s.growthFunds)].join(', ')
    const alphaTickers = [...new Set(s.alphaFunds)].join(', ')
    const phrase = ALPHA_PHRASE[s.category]
    // Title is just the alpha category; the paired index is shown on the "Growth:" line.
    // No description: the Alpha/Growth lines already say it.
    return {
      label: s.category,
      weightPct: Math.round(s.weight * 10) / 10,
      color: SLICE_PALETTE[i % SLICE_PALETTE.length],
      growthComponent: hasGrowth ? `${indexLabel}${growthTickers ? ` (${growthTickers})` : ''}` : undefined,
      alpha: phrase ? `${phrase}${alphaTickers ? ` (${alphaTickers})` : ''}` : undefined,
      environments: CATEGORY_ENVIRONMENTS[s.category],
    }
  })
}

// -------------------- Custom (macro-environment) pies --------------------
//
// A couple of portfolios are macro-environment books, not alpha-stacking books, so the
// derived growth+alpha pie misrepresents them. They use hand-authored regime slices keyed
// to the macro environments (see EnvironmentChart `ENV_COLORS`).

/** Macro-environment palette (mirrors EnvironmentChart's ENV_COLORS). */
const ENV_COLORS = {
  Growth: '#5dca8a',
  Inflation: '#e8944a',
  Recession: '#e24b4a',
  Deflation: '#85b7eb',
  'Sideways Chop': '#c9a84c',
} as const

export interface PieConfig {
  slices: StrategyPieSlice[]
  centerLabel: string
  centerSubLabel: string
}

const CUSTOM_PIE_CONFIG: Record<string, PieConfig> = {
  '5-4-3-2-1': {
    centerLabel: 'Macro regimes',
    centerSubLabel: '5 environments',
    slices: [
      { label: 'Growth', weightPct: 35, color: ENV_COLORS.Growth, description: 'RSST: 100% S&P 500 plus 100% managed futures, the growth engine.' },
      { label: 'Inflation', weightPct: 25, color: ENV_COLORS.Inflation, description: 'GDE: capital-efficient US equity plus a gold overlay, the inflation hedge.' },
      { label: 'Recession', weightPct: 20, color: ENV_COLORS.Recession, description: 'RSSB: global stocks plus a US Treasury overlay, the recession ballast.' },
      { label: 'Sideways Chop', weightPct: 15, color: ENV_COLORS['Sideways Chop'], description: 'CLSE: US long/short equity for mean-reverting, range-bound tapes.' },
      { label: 'Deflation', weightPct: 5, color: ENV_COLORS.Deflation, description: 'ZROZ: 25+ year zero-coupon Treasuries, the deflation ballast.' },
    ],
  },
  'risk-parity': {
    centerLabel: 'All-Weather',
    centerSubLabel: '4 quadrants',
    slices: [
      { label: 'Growth', weightPct: 40, color: ENV_COLORS.Growth, description: 'NTSD: 90/60 US plus developed-international equity, the growth engine.' },
      { label: 'Inflation', weightPct: 30, color: ENV_COLORS.Inflation, description: 'GDT (TIPS plus gold) and GDE (equity plus gold), the inflation hedges.' },
      { label: 'Recession', weightPct: 20, color: ENV_COLORS.Recession, description: 'NTSX: 90/60 US equity plus Treasuries, the recession cushion.' },
      { label: 'Deflation', weightPct: 10, color: ENV_COLORS.Deflation, description: 'ZROZ: maximum-duration zero-coupon Treasuries, the deflation ballast.' },
    ],
  },
}

/**
 * Pie configuration for a portfolio detail page. A few macro-environment books use custom
 * regime slices; every other preset (including the Alpha Quadrants) derives a growth+alpha
 * category pie from its holdings, so new portfolios get a pie automatically.
 */
export function pieConfigForPreset(slug: string, holdings: HoldingInput[]): PieConfig {
  const custom = CUSTOM_PIE_CONFIG[slug]
  if (custom) return custom
  return { slices: buildPairedSlices(holdings), centerLabel: 'Growth', centerSubLabel: 'shared core' }
}
