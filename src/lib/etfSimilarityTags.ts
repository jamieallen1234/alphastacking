/**
 * Strategy-aware ETF similarity tags (equity sleeve vs alpha / overlay sleeve).
 * Used only for “Similar ETFs” peer lists — not hub navigation.
 *
 * Precedence when extending: structured sleeve maps (`ETF_STACK_EXPOSURE_BY_SLUG`)
 * first; text seeding only when sleeves don’t resolve; manual override last.
 */

import { ETF_STACK_EXPOSURE_BY_SLUG } from '@/lib/etfStackExposureBySlug'

export type SimilarityTagProvenance = 'sleeve' | 'seeded' | 'manual'

/** Normalized asset-tag strings (multi-valued per ETF). */
export type EtfSimilarityEquityTag = string
export type EtfSimilarityAlphaTag = string

export type EtfSimilarityTagBundle = {
  equityTags: readonly EtfSimilarityEquityTag[]
  alphaTags: readonly EtfSimilarityAlphaTag[]
  /** How this bundle was derived (review / maintenance). */
  provenance: SimilarityTagProvenance
  /**
   * Display-only descriptor chips for systematic-futures funds: asset classes traded
   * (`equities`/`bonds`/`currencies`/`commodities`) and styles (`carry`). Rendered as chips but NOT
   * used for peer matching (so a diversified CTA does not peer a single-asset fund just because they
   * share an asset class).
   */
  extraDisplayTags?: readonly string[]
}

function bundle(
  equityTags: readonly string[],
  alphaTags: readonly string[],
  provenance: SimilarityTagProvenance,
  extraDisplayTags?: readonly string[]
): EtfSimilarityTagBundle {
  return {
    equityTags,
    alphaTags,
    provenance,
    ...(extraDisplayTags ? { extraDisplayTags } : {}),
  }
}

/**
 * US-listed dynamic ETF slugs — tags for similarity matching within `US_ETF_DYNAMIC_REGISTRY`.
 */
export const ETF_SIMILARITY_TAGS_BY_SLUG_US: Record<string, EtfSimilarityTagBundle> = {
  // --- Return-stacked / capital-efficient (dual; `return_stacked` bridges the base sleeve, alpha overlay differentiates) ---
  mate: bundle(['us', 'large_cap', 'return_stacked', '2x_leveraged'], ['managed_futures'], 'sleeve'),
  rsst: bundle(['us', 'large_cap', 'return_stacked', '2x_leveraged'], ['managed_futures'], 'sleeve'),
  rsbt: bundle([], ['treasuries', 'medium_duration', 'managed_futures', 'return_stacked', '2x_leveraged'], 'sleeve'),
  rsit: bundle(['developed_ex_us', 'large_cap', 'return_stacked', '2x_leveraged'], ['managed_futures'], 'sleeve'),
  hold: bundle(['us', 'large_cap', 'return_stacked', '1.5x_leveraged'], ['managed_futures'], 'sleeve'),
  rssy: bundle(['us', 'large_cap', 'return_stacked', '2x_leveraged'], ['futures_yield'], 'sleeve'),
  rssb: bundle(['global', 'large_cap', 'return_stacked', '2x_leveraged'], ['treasuries', 'medium_duration'], 'sleeve'),
  ntsx: bundle(['us', 'large_cap', 'return_stacked', '1.5x_leveraged'], ['treasuries', 'medium_duration'], 'sleeve'),
  ntsi: bundle(['developed_ex_us', 'large_cap', 'return_stacked', '1.5x_leveraged'], ['treasuries', 'medium_duration'], 'sleeve'),
  ntse: bundle(['emerging_markets', 'large_cap', 'return_stacked', '1.5x_leveraged'], ['treasuries', 'medium_duration'], 'sleeve'),
  /** 90% US large-cap + 60% developed-ex-US equity (1.5x); the second equity sleeve is the alpha leg. */
  ntsd: bundle(['us', 'large_cap', 'return_stacked', '1.5x_leveraged'], ['developed_ex_us'], 'sleeve'),
  gde: bundle(['us', 'large_cap', 'return_stacked', '1.6x_leveraged'], ['gold'], 'sleeve'),
  gdmn: bundle(['gold_miners', 'return_stacked', '1.8x_leveraged'], ['gold'], 'sleeve'),
  /** Rare earth/strategic metals miners equity + base-metals futures overlay; distinct from precious-metals stacks. */
  wdig: bundle(['metals_miners', 'return_stacked', '1.8x_leveraged'], ['base_metals'], 'sleeve'),
  gdt: bundle(['inflation_linked_bonds', 'long_duration', 'return_stacked', '1.8x_leveraged'], ['gold'], 'sleeve'),
  rssx: bundle(['us', 'large_cap', 'return_stacked', '2x_leveraged'], ['gold', 'bitcoin', 'ethereum'], 'sleeve'),
  asgm: bundle(['global', 'return_stacked', '1.5x_leveraged'], ['global_macro'], 'sleeve'),
  hfgm: bundle(['us', 'large_cap', 'return_stacked', '1.5x_leveraged'], ['global_macro'], 'sleeve'),
  btgd: bundle(['bitcoin', 'return_stacked', '2x_leveraged'], ['gold'], 'sleeve'),
  ooqb: bundle(['us', 'large_cap', 'growth', 'return_stacked', '2x_leveraged'], ['bitcoin'], 'sleeve'),
  oosb: bundle(['us', 'large_cap', 'return_stacked', '2x_leveraged'], ['bitcoin'], 'sleeve'),
  begs: bundle(['bitcoin', 'ethereum', 'return_stacked', '2x_leveraged'], ['gold', 'silver'], 'sleeve'),
  wtib: bundle(['commodity_energy', 'return_stacked', '2x_leveraged'], ['bitcoin'], 'sleeve'),
  /** 100% S&P 500 + ~10% bitcoin overlay = ~110% gross, effectively unleveraged; no multiple tag. */
  spbc: bundle(['us', 'large_cap', 'return_stacked'], ['bitcoin'], 'sleeve'),

  // --- Factor / style (equity-only; factor tag gates, geo/size/style/sub-factor rank) ---
  spmo: bundle(['momentum', 'us', 'large_cap', 'passive'], [], 'manual'),
  ptf: bundle(['momentum', 'us', 'large_cap', 'passive'], [], 'manual'),
  /** Active quantitative US large/mid-cap momentum (shorter lookback; 30-50 names). */
  fmtm: bundle(['momentum', 'us', 'large_cap', 'active'], [], 'manual'),
  vflo: bundle(['value', 'fcf_growth', 'us', 'large_cap', 'passive'], [], 'manual'),
  sflo: bundle(['value', 'fcf_growth', 'us', 'small_cap', 'passive'], [], 'manual'),
  garp: bundle(['value', 'quality', 'growth', 'us', 'large_cap', 'passive'], [], 'manual'),
  cowz: bundle(['value', 'fcf_growth', 'us', 'large_cap', 'passive'], [], 'manual'),
  avuv: bundle(['value', 'us', 'small_cap', 'active'], [], 'manual'),
  avdv: bundle(['value', 'developed_ex_us', 'small_cap', 'active'], [], 'manual'),
  sgrt: bundle(['value', 'earnings_growth', 'us', 'large_cap', 'active'], [], 'manual'),
  copy: bundle(['value', 'global', 'large_cap', 'active'], [], 'seeded'),
  emeq: bundle(['quality', 'competitive_advantage', 'emerging_markets', 'all_cap', 'active'], [], 'manual'),
  /** Active concentrated US value (Russell 1000/3000 Value-sourced; not buy-write). */
  /** Active concentrated US equity; secular-trend valuation discipline (~30 names). */
  afos: bundle(['concentrated', 'us', 'all_cap', 'active'], [], 'manual'),
  /** Quantitative trend-following US large-cap equity (~25 names); long-only momentum. */
  strn: bundle(['momentum', 'concentrated', 'us', 'large_cap', 'active'], [], 'manual'),

  // --- Leveraged beta (equity-only; grouped by `leveragedPeers`, the multiple is display/rank) ---
  sso: bundle(['us', 'large_cap', '2x_leveraged'], [], 'manual'),
  upro: bundle(['us', 'large_cap', '3x_leveraged'], [], 'manual'),
  qld: bundle(['us', 'large_cap', 'growth', '2x_leveraged'], [], 'manual'),
  tqqq: bundle(['us', 'large_cap', 'growth', '3x_leveraged'], [], 'manual'),

  // --- Long/short, alternatives, managed futures, credit ---
  // Single-asset systematic futures: shows "Managed futures" + its asset class as display-only chips,
  // but carries no matching tags so it is not pulled into the diversified-CTA peer group.
  foxy: bundle([], [], 'manual', ['managed_futures', 'currencies']),
  flsp: bundle(['multi_strategy_alternative'], ['multi_strategy_alternative'], 'manual'),
  ialt: bundle(['multi_strategy_alternative'], ['multi_strategy_alternative'], 'manual'),
  caos: bundle([], ['tail_risk'], 'manual'),
  attr: bundle(['us', 'large_cap', 'tail_risk'], ['tail_risk'], 'manual'),
  vamo: bundle(['us', 'large_cap', 'value', 'momentum', 'long_short', 'tactical_hedge'], [], 'manual'),
  clse: bundle(['us', 'large_cap', 'long_short'], [], 'manual'),
  orr: bundle(['global', 'long_short'], [], 'manual'),
  wtls: bundle(['us', 'large_cap', 'long_short'], ['long_short'], 'sleeve'),
  mrgr: bundle(['arbitrage'], [], 'seeded'),
  mema: bundle(['emerging_markets', 'managed_futures'], ['managed_futures'], 'seeded'),
  cta: bundle([], ['managed_futures'], 'seeded', ['carry', 'equities', 'bonds', 'currencies', 'commodities']),
  dbmf: bundle([], ['managed_futures'], 'seeded', ['equities', 'bonds', 'currencies', 'commodities']),
  // KMLM (Mount Lucas index) trades commodity, currency, and global-bond futures only — no equities.
  kmlm: bundle([], ['managed_futures'], 'seeded', ['bonds', 'currencies', 'commodities']),
  hard: bundle([], [], 'manual', ['managed_futures', 'commodities']),

  // --- Volatility ---
  /** VIRT is a single-stock HFT market-maker; no matching tags — unique strategy with no ETF peers. Display-only: volatility category. */
  virt: bundle([], [], 'manual'),

  // --- Fixed income / structured credit ---
  /** Pure AAA CLO fund: no equity sleeve; alpha is carry spread above SOFR. */
  jaaa: bundle([], ['aaa_clo', 'floating_rate_credit', 'investment_grade_credit'], 'seeded'),
  /** iShares AAA CLO fund; same peer group as JAAA — same structure, different sponsor. */
  cloa: bundle([], ['aaa_clo', 'floating_rate_credit', 'investment_grade_credit'], 'seeded'),
}

/** CA hub registry slugs — peers only within Canadian listings. */
export const ETF_SIMILARITY_TAGS_BY_SLUG_CA: Record<string, EtfSimilarityTagBundle> = {
  rgbm: bundle(['global', 'bonds', 'return_stacked', '2x_leveraged'], ['global_macro'], 'sleeve'),
  onec: bundle(['multi_strategy_alternative'], ['multi_strategy_alternative'], 'seeded'),
  pfaa: bundle(['multi_strategy_alternative'], ['multi_strategy_alternative'], 'seeded'),
  pfae: bundle(['canada', 'long_short'], [], 'manual'),
  zlb: bundle(['low_volatility', 'canada', 'large_cap', 'passive'], [], 'manual'),
  fcmo: bundle(['momentum', 'us', 'large_cap', 'passive'], [], 'manual'),
  fccm: bundle(['momentum', 'canada', 'large_cap', 'passive'], [], 'manual'),
  finn: bundle(['momentum', 'concentrated', 'global', 'all_cap', 'active'], [], 'manual'),
  /** Systematic multi-asset market-neutral; ~0 net directional bias. */
  pmm: bundle(['global'], ['market_neutral'], 'seeded'),
  atsx: bundle(['canada', 'long_short'], [], 'manual'),
  pfls: bundle(['global', 'long_short'], [], 'manual'),
  tgaf: bundle(['global', 'long_short'], [], 'manual'),
  dglm: bundle([], ['global_macro'], 'seeded'),
  btccb: bundle(['bitcoin'], [], 'seeded'),
  hsu: bundle(['us', 'large_cap', '2x_leveraged'], [], 'seeded'),
  hqu: bundle(['us', 'large_cap', 'growth', '2x_leveraged'], [], 'seeded'),
  /** Modeled from VFV.TO (S&P 500) — large-cap, not small-cap. 1.25x leverage. */
  ussl: bundle(['us', 'large_cap', '1.25x_leveraged'], [], 'seeded'),
  qqql: bundle(['us', 'large_cap', 'growth', '1.25x_leveraged'], [], 'seeded'),
  heql: bundle(['canada', 'large_cap', '1.25x_leveraged'], [], 'seeded'),
  /** Spot ether sleeve — pairs with BTCC-B via crypto-major matching (bitcoin vs ethereum). */
  ethxb: bundle(['ethereum'], [], 'seeded'),
  hdge: bundle(['us', 'large_cap', 'long_short'], [], 'manual'),
  pfmn: bundle(['preferreds_credit'], ['credit'], 'seeded'),
  arb: bundle(['arbitrage'], ['arbitrage'], 'seeded'),
  /** Pure AAA CLO structured credit; no equity sleeve. Peers with other credit-alpha sleeves. */
  baaa: bundle([], ['aaa_clo', 'floating_rate_credit', 'investment_grade_credit'], 'seeded'),
}

export type EtfSimilarityUniverse = 'us' | 'ca'

export function getSimilarityTagBundle(
  slug: string,
  universe: EtfSimilarityUniverse
): EtfSimilarityTagBundle | undefined {
  if (universe === 'ca') return ETF_SIMILARITY_TAGS_BY_SLUG_CA[slug]
  return ETF_SIMILARITY_TAGS_BY_SLUG_US[slug]
}

/**
 * Human labels for similarity tags shown as chips on ETF pages. Only mapped tags display;
 * internal disambiguator tags (`ls_net_exposure_*`, `*_stack`, umbrella tags like
 * `crypto_major` / `precious_metals`) are intentionally omitted so chips stay readable.
 */
export const ETF_TAG_DISPLAY_LABELS: Record<string, string> = {
  // Factor
  value: 'Value',
  momentum: 'Momentum',
  growth: 'Growth',
  quality: 'Quality',
  low_volatility: 'Low volatility',
  // Sub-factor
  fcf_growth: 'FCF growth',
  earnings_growth: 'Earnings growth',
  competitive_advantage: 'Competitive advantage',
  concentrated: 'Concentrated',
  // Geography
  us: 'US',
  canada: 'Canada',
  global: 'Global',
  developed_ex_us: 'Developed ex-US',
  emerging_markets: 'Emerging markets',
  international: 'International',
  // Size
  large_cap: 'Large-cap',
  mid_cap: 'Mid-cap',
  small_cap: 'Small-cap',
  all_cap: 'All-cap',
  // Management style
  active: 'Active',
  passive: 'Passive',
  // Structure / leverage
  return_stacked: 'Return stacked',
  '1.25x_leveraged': '1.25x leveraged',
  '1.5x_leveraged': '1.5x leveraged',
  '1.6x_leveraged': '1.6x leveraged',
  '1.8x_leveraged': '1.8x leveraged',
  '2x_leveraged': '2x leveraged',
  '3x_leveraged': '3x leveraged',
  // Strategy / alternatives
  managed_futures: 'Managed futures',
  futures_yield: 'Futures yield',
  global_macro: 'Global macro',
  multi_strategy_alternative: 'Multi-strategy alternatives',
  market_neutral: 'Market neutral',
  arbitrage: 'Arbitrage',
  tail_risk: 'Tail risk',
  tactical_hedge: 'Tactical hedge',
  long_short: 'Long/short',
  // Fixed income / credit
  treasuries: 'Treasuries',
  bonds: 'Bonds',
  short_duration: 'Short duration',
  medium_duration: 'Medium duration',
  long_duration: 'Long duration',
  inflation_linked_bonds: 'Inflation-linked bonds',
  credit: 'Credit',
  investment_grade_credit: 'Investment-grade credit',
  floating_rate_credit: 'Floating-rate credit',
  aaa_clo: 'AAA CLO',
  preferreds_credit: 'Preferred shares',
  // Real assets / commodities
  gold: 'Gold',
  silver: 'Silver',
  gold_miners: 'Gold miners',
  metals_miners: 'Metals miners',
  base_metals: 'Base metals',
  commodity_energy: 'Energy',
  // Asset classes traded + styles (systematic-futures funds; display-only)
  equities: 'Equities',
  currencies: 'Currencies',
  commodities: 'Commodities',
  carry: 'Carry',
  // Crypto
  bitcoin: 'Bitcoin',
  ethereum: 'Ethereum',
}

/**
 * Chip display order. Tags are grouped into coarse axes (factor → sub-factor → geography → size →
 * asset → strategy → structure → leverage → style); within a group the base (equity) sleeve comes
 * before the overlay (alpha) sleeve, then intra-group order. So a return-stacked fund reads base →
 * overlay (MATE: "US, Large-cap, Managed futures, Return stacked, 2x leveraged"; GDMN: "Gold miners,
 * Gold" not "Gold, Gold miners").
 */
const TAG_DISPLAY_GROUPS: readonly (readonly string[])[] = [
  // Factor
  ['value', 'momentum', 'growth', 'quality', 'low_volatility'],
  // Sub-factor
  ['fcf_growth', 'earnings_growth', 'competitive_advantage', 'concentrated'],
  // Geography
  ['us', 'canada', 'global', 'developed_ex_us', 'emerging_markets', 'international'],
  // Size
  ['large_cap', 'mid_cap', 'small_cap', 'all_cap'],
  // Asset (base exposure / overlay asset)
  [
    'gold', 'silver', 'bitcoin', 'ethereum', 'gold_miners', 'metals_miners', 'base_metals',
    'commodities', 'commodity_energy', 'treasuries', 'bonds', 'inflation_linked_bonds',
    'short_duration', 'medium_duration', 'long_duration', 'aaa_clo', 'floating_rate_credit',
    'investment_grade_credit', 'preferreds_credit', 'credit',
  ],
  // Strategy / overlay
  [
    'managed_futures', 'futures_yield', 'global_macro', 'long_short', 'market_neutral',
    'arbitrage', 'tail_risk', 'tactical_hedge', 'multi_strategy_alternative',
  ],
  // Structure
  ['return_stacked'],
  // Leverage magnitude
  ['1.25x_leveraged', '1.5x_leveraged', '1.6x_leveraged', '1.8x_leveraged', '2x_leveraged', '3x_leveraged'],
  // Management style
  ['active', 'passive'],
]
type TagOrderInfo = { group: number; fine: number }
const TAG_ORDER_INFO: ReadonlyMap<string, TagOrderInfo> = new Map(
  TAG_DISPLAY_GROUPS.flatMap((group, gi) => group.map((t, fi) => [t, { group: gi, fine: fi }] as const))
)

/**
 * Ordered, de-duped display labels for an ETF's similarity tags (rendered as chips). Sorted by axis
 * group, then base-before-overlay sleeve, then intra-group order; unmapped/internal tags are dropped;
 * duplicate labels collapse to one. Display-only descriptor tags (`extraDisplayTags`) are appended.
 */
export function displayTagLabelsForSlug(slug: string, universe: EtfSimilarityUniverse): string[] {
  const bundle = getSimilarityTagBundle(slug, universe)
  if (!bundle) return []
  const eqSet = new Set(bundle.equityTags)
  const FAR = Number.MAX_SAFE_INTEGER
  const ordered = [...bundle.equityTags, ...bundle.alphaTags]
    .filter((t) => ETF_TAG_DISPLAY_LABELS[t] != null)
    .sort((a, b) => {
      const ia = TAG_ORDER_INFO.get(a)
      const ib = TAG_ORDER_INFO.get(b)
      const ga = ia?.group ?? FAR
      const gb = ib?.group ?? FAR
      if (ga !== gb) return ga - gb
      // Within an axis, base (equity) sleeve before overlay (alpha) sleeve.
      const sa = eqSet.has(a) ? 0 : 1
      const sb = eqSet.has(b) ? 0 : 1
      if (sa !== sb) return sa - sb
      return (ia?.fine ?? FAR) - (ib?.fine ?? FAR)
    })
  // Display-only descriptor chips (asset classes traded, styles like carry) are appended after the
  // ordered matching tags (e.g. a CTA reads "Managed futures, Carry, Equities, Bonds, ...").
  const all = [...ordered, ...(bundle.extraDisplayTags ?? [])]
  const labels: string[] = []
  const seen = new Set<string>()
  for (const tag of all) {
    const label = ETF_TAG_DISPLAY_LABELS[tag]
    if (label && !seen.has(label)) {
      seen.add(label)
      labels.push(label)
    }
  }
  return labels
}

function intersectionSize(a: ReadonlySet<string>, b: ReadonlySet<string>): number {
  let n = 0
  for (const x of a) if (b.has(x)) n += 1
  return n
}

function jaccard(a: ReadonlySet<string>, b: ReadonlySet<string>): number {
  if (a.size === 0 && b.size === 0) return 1
  if (a.size === 0 || b.size === 0) return 0
  let inter = 0
  for (const x of a) if (b.has(x)) inter += 1
  const union = a.size + b.size - inter
  return union === 0 ? 0 : inter / union
}

/** Tags that force an exact candidate match on equity when the subject carries them. */
const UNIQUE_EQUITY_TAGS: readonly string[] = []

const UNIQUE_ALPHA_TAGS: readonly string[] = []

/**
 * Very common equity tags — matching cannot rely on these alone (equity-only funds need a shared “narrow” tag).
 */
const BROAD_EQUITY_TAGS: ReadonlySet<string> = new Set([
  // Geography (rank only — listing geography alone must not pair e.g. ZLB with HEQL).
  'us',
  'canada',
  'global',
  'developed_ex_us',
  'emerging_markets',
  'international',
  // Size
  'large_cap',
  'mid_cap',
  'small_cap',
  'all_cap',
  // Management style
  'active',
  'passive',
  // Sub-factors rank, only the factor tag (value/momentum/growth/quality/low_volatility) gates.
  'fcf_growth',
  'earnings_growth',
  'concentrated',
  'competitive_advantage',
  // Treasury duration refines ranking only; it never gates a pairing alone.
  // (Leverage multiples are gating tags: a leveraged-beta fund must not fall through the
  // broad jaccard path and match plain large-cap funds; `leveragedPeers` groups across multiples.)
  'short_duration',
  'medium_duration',
  'long_duration',
])

function narrowNonBroadTags(subject: ReadonlySet<string>, broad: ReadonlySet<string>): Set<string> {
  const out = new Set<string>()
  for (const t of subject) if (!broad.has(t)) out.add(t)
  return out
}

/**
 * Granular precious-metal elements — any overlap on both sides ⇒ peers (gold / silver / platinum / palladium).
 */
export const PRECIOUS_METAL_ASSET_TAGS: ReadonlySet<string> = new Set([
  'gold',
  'silver',
  'platinum',
  'palladium',
])

/** Spot / major listed crypto — Bitcoin and Ethereum pair with each other for similarity. */
export const CRYPTO_MAJOR_ASSET_TAGS: ReadonlySet<string> = new Set(['bitcoin', 'ethereum'])

/**
 * Leverage-magnitude tags — any two leveraged-beta funds (e.g. SSO 2x vs UPRO 3x) are peers
 * within the same structure. The specific multiple ranks; this set gates the family.
 */
export const LEVERAGE_TAGS: ReadonlySet<string> = new Set([
  '1.25x_leveraged',
  '1.5x_leveraged',
  '1.6x_leveraged',
  '1.8x_leveraged',
  '2x_leveraged',
  '3x_leveraged',
])

function hasAnyAssetTag(set: ReadonlySet<string>, universe: ReadonlySet<string>): boolean {
  for (const t of set) if (universe.has(t)) return true
  return false
}

/** Both carry at least one pm_* tag (may differ: e.g. gold vs silver still “precious metals”). */
export function preciousMetalAssetPeers(a: ReadonlySet<string>, b: ReadonlySet<string>): boolean {
  return hasAnyAssetTag(a, PRECIOUS_METAL_ASSET_TAGS) && hasAnyAssetTag(b, PRECIOUS_METAL_ASSET_TAGS)
}

/** Both carry bitcoin and/or ethereum sleeve tags — majors compare with each other. */
export function cryptoMajorAssetPeers(a: ReadonlySet<string>, b: ReadonlySet<string>): boolean {
  return hasAnyAssetTag(a, CRYPTO_MAJOR_ASSET_TAGS) && hasAnyAssetTag(b, CRYPTO_MAJOR_ASSET_TAGS)
}

/** Both are leveraged-beta funds (any leverage multiple) — group regardless of exact multiple. */
export function leveragedPeers(a: ReadonlySet<string>, b: ReadonlySet<string>): boolean {
  return hasAnyAssetTag(a, LEVERAGE_TAGS) && hasAnyAssetTag(b, LEVERAGE_TAGS)
}

/**
 * Whether both tag sets align enough on one dimension (equity or alpha).
 */
function dimensionMatches(
  subject: ReadonlySet<string>,
  candidate: ReadonlySet<string>,
  uniqueSingletonTags: readonly string[],
  broadTags: ReadonlySet<string>,
  /** When subject has ≥1 non-broad tag, candidate must share at least one of those narrow tags. */
  requireSharedNarrowTag: boolean
): boolean {
  if (subject.size === 0 && candidate.size === 0) return true
  if (subject.size === 0 || candidate.size === 0) return false

  for (const u of uniqueSingletonTags) {
    if (subject.has(u)) return candidate.has(u)
  }

  if (requireSharedNarrowTag) {
    const narrowS = narrowNonBroadTags(subject, broadTags)
    if (narrowS.size > 0) {
      let sharedNarrow = false
      for (const t of narrowS) {
        if (candidate.has(t)) {
          sharedNarrow = true
          break
        }
      }
      if (!sharedNarrow) return false
      // One shared non-broad tag is enough (e.g. `free_cash_flow`, `systematic_alternatives`, `equity_treasury_stack`).
      return true
    }
  }

  const inter = intersectionSize(subject, candidate)
  if (inter === 0) return false
  if (inter === Math.min(subject.size, candidate.size)) return true
  return jaccard(subject, candidate) >= 0.34
}

function similarityScore(
  eqS: ReadonlySet<string>,
  alS: ReadonlySet<string>,
  eqC: ReadonlySet<string>,
  alC: ReadonlySet<string>,
  mode: 'dual' | 'equity_only' | 'alpha_only'
): number {
  if (mode === 'equity_only') {
    return intersectionSize(eqS, eqC) + jaccard(eqS, eqC)
  }
  if (mode === 'alpha_only') {
    return intersectionSize(alS, alC) + jaccard(alS, alC)
  }
  return intersectionSize(eqS, eqC) + intersectionSize(alS, alC)
}

/**
 * Tag-bundle shape for similarity: do not cross equity-only ↔ alpha-only ↔ dual (stacked) peers.
 * Pure managed-futures sleeves (CTA, DBMF, KMLM) stay in alpha_only; return stacks stay in dual.
 */
export function similarityStructureMode(
  equityTags: ReadonlySet<string>,
  alphaTags: ReadonlySet<string>
): 'dual' | 'equity_only' | 'alpha_only' | 'empty' {
  const hasEq = equityTags.size > 0
  const hasAl = alphaTags.size > 0
  if (hasEq && hasAl) return 'dual'
  if (hasEq && !hasAl) return 'equity_only'
  if (!hasEq && hasAl) return 'alpha_only'
  return 'empty'
}

/**
 * Returns slug keys in `universe` that qualify as similar to `slug`, excluding self.
 */
export function similarEtfSlugsFor(
  slug: string,
  universe: EtfSimilarityUniverse,
  universeSlugs: readonly string[]
): string[] {
  const subject = getSimilarityTagBundle(slug, universe)
  if (!subject) return []

  const eqS = new Set(subject.equityTags)
  const alS = new Set(subject.alphaTags)
  const subjectMode = similarityStructureMode(eqS, alS)
  if (subjectMode === 'empty') return []

  const out: Array<{ s: string; score: number }> = []

  for (const candSlug of universeSlugs) {
    if (candSlug === slug) continue
    const cand = getSimilarityTagBundle(candSlug, universe)
    if (!cand) continue
    const eqC = new Set(cand.equityTags)
    const alC = new Set(cand.alphaTags)
    if (similarityStructureMode(eqC, alC) !== subjectMode) continue

    let ok = false
    if (subjectMode === 'dual') {
      const eqOk =
        cryptoMajorAssetPeers(eqS, eqC) ||
        preciousMetalAssetPeers(eqS, eqC) ||
        dimensionMatches(eqS, eqC, UNIQUE_EQUITY_TAGS, BROAD_EQUITY_TAGS, true)
      const alOk =
        cryptoMajorAssetPeers(alS, alC) ||
        preciousMetalAssetPeers(alS, alC) ||
        dimensionMatches(alS, alC, UNIQUE_ALPHA_TAGS, new Set(), false)
      ok = eqOk && alOk
    } else if (subjectMode === 'equity_only') {
      ok =
        cryptoMajorAssetPeers(eqS, eqC) ||
        preciousMetalAssetPeers(eqS, eqC) ||
        leveragedPeers(eqS, eqC) ||
        dimensionMatches(eqS, eqC, UNIQUE_EQUITY_TAGS, BROAD_EQUITY_TAGS, true)
    } else {
      ok =
        cryptoMajorAssetPeers(alS, alC) ||
        preciousMetalAssetPeers(alS, alC) ||
        dimensionMatches(alS, alC, UNIQUE_ALPHA_TAGS, new Set(), false)
    }

    if (!ok) continue
    const score = similarityScore(eqS, alS, eqC, alC, subjectMode)
    out.push({ s: candSlug, score })
  }

  out.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return a.s.localeCompare(b.s)
  })

  const maxPeers = 14
  return out.slice(0, maxPeers).map((x) => x.s)
}

/** For provenance audits: slugs that appear in stack map should prefer sleeve-derived tags. */
export function slugHasStructuredStackMap(slug: string): boolean {
  return slug in ETF_STACK_EXPOSURE_BY_SLUG
}
