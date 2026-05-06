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
}

function bundle(
  equityTags: readonly string[],
  alphaTags: readonly string[],
  provenance: SimilarityTagProvenance
): EtfSimilarityTagBundle {
  return {
    equityTags,
    alphaTags,
    provenance,
  }
}

/**
 * US-listed dynamic ETF slugs — tags for similarity matching within `US_ETF_DYNAMIC_REGISTRY`.
 */
export const ETF_SIMILARITY_TAGS_BY_SLUG_US: Record<string, EtfSimilarityTagBundle> = {
  // --- Return-stacked / sleeves from ETF_STACK_EXPOSURE_BY_SLUG ---
  mate: bundle(['us_large_cap'], ['managed_futures'], 'sleeve'),
  rsst: bundle(['us_large_cap'], ['managed_futures'], 'sleeve'),
  ctap: bundle(['us_large_cap'], ['managed_futures'], 'sleeve'),
  hold: bundle(['us_large_cap'], ['managed_futures'], 'sleeve'),
  rssy: bundle(['us_large_cap'], ['futures_yield'], 'sleeve'),
  rssb: bundle(['global_equity', 'equity_treasury_stack'], ['treasuries'], 'sleeve'),
  ntsx: bundle(['us_large_cap', 'equity_treasury_stack'], ['treasuries'], 'sleeve'),
  ntsi: bundle(['developed_ex_us', 'equity_treasury_stack'], ['treasuries'], 'sleeve'),
  ntse: bundle(['emerging_markets', 'equity_treasury_stack'], ['treasuries'], 'sleeve'),
  ntsd: bundle(['us_large_cap', 'international'], ['international'], 'sleeve'),
  /** US equity + gold overlay — `pm_gold` on equity ties to other gold PM stacks for similarity. */
  gde: bundle(['us_large_cap', 'pm_gold'], ['gold_commodity', 'pm_gold'], 'sleeve'),
  gdmn: bundle(['gold_miners', 'pm_gold'], ['gold_commodity', 'pm_gold'], 'sleeve'),
  gdt: bundle(['inflation_linked_bonds'], ['gold_commodity', 'pm_gold'], 'sleeve'),
  rssx: bundle(['us_large_cap'], ['gold_commodity', 'crypto', 'crypto_bitcoin', 'crypto_ethereum', 'pm_gold'], 'sleeve'),
  /** Shared equity sleeve shape for half-us-large / half-macro stacks (see stack map). */
  asgm: bundle(['global_equity', 'macro_equity_stack'], ['global_macro'], 'sleeve'),
  hfgm: bundle(['us_large_cap', 'macro_equity_stack'], ['global_macro'], 'sleeve'),
  /** Bitcoin + gold; pm_* + crypto majors for asset-family matching. */
  btgd: bundle(['crypto', 'crypto_major', 'crypto_bitcoin'], ['precious_metals', 'gold_commodity', 'pm_gold'], 'sleeve'),
  ooqb: bundle(['nasdaq100'], ['crypto', 'crypto_bitcoin'], 'sleeve'),
  oosb: bundle(['us_large_cap'], ['crypto', 'crypto_bitcoin'], 'sleeve'),
  begs: bundle(
    ['crypto', 'crypto_major', 'crypto_bitcoin', 'crypto_ethereum'],
    ['precious_metals', 'pm_gold', 'pm_silver'],
    'sleeve'
  ),
  wtib: bundle(['commodity_energy'], ['crypto', 'crypto_bitcoin'], 'sleeve'),

  // --- Factor / style ---
  spmo: bundle(['us_large_cap', 'momentum'], [], 'manual'),
  ptf: bundle(['us_large_cap', 'momentum'], [], 'manual'),
  vflo: bundle(['us_large_cap', 'free_cash_flow'], [], 'manual'),
  cowz: bundle(['us_large_cap', 'free_cash_flow'], [], 'manual'),
  avuv: bundle(['us_small_cap', 'value'], [], 'seeded'),
  avdv: bundle(['international', 'small_cap', 'value', 'international_small_value'], [], 'manual'),
  flsp: bundle(['us_large_cap', 'systematic_alternatives'], ['multi_factor_alternative'], 'manual'),
  ialt: bundle(['global_equity', 'systematic_alternatives'], ['multi_factor_alternative'], 'manual'),
  caos: bundle(['us_large_cap', 'tail_risk'], ['tail_risk'], 'manual'),
  attr: bundle(['us_large_cap', 'tail_risk'], ['tail_risk'], 'manual'),

  // --- Leveraged beta (LETF similarity group; hub unchanged) ---
  sso: bundle(['us_large_cap', 'leveraged_equity'], [], 'manual'),
  upro: bundle(['us_large_cap', 'leveraged_equity'], [], 'manual'),
  qld: bundle(['nasdaq_leverage', 'leveraged_equity'], [], 'manual'),
  tqqq: bundle(['nasdaq_leverage', 'leveraged_equity'], [], 'manual'),

  // --- Other ---
  /** Active concentrated US value (Russell 1000/3000 Value–sourced; not buy-write). */
  sass: bundle(['us_large_cap', 'value', 'active_concentrated_value'], [], 'manual'),
  /**
   * Net-long L/S (not market-neutral). Gross book ~110% long / 50% short per `exposureSummary` —
   * peer with ORR (~150% / 100%) via `ls_net_long_similar_gross`.
   */
  clse: bundle(['us_large_cap', 'long_short_equity', 'ls_net_long_similar_gross'], [], 'manual'),
  /**
   * Global net-long L/S; gross ~150% long / 100% short per `exposureSummary` — same peer band as CLSE.
   */
  orr: bundle(['global_equity', 'long_short_equity', 'ls_net_long_similar_gross'], [], 'manual'),
  mrgr: bundle(['merger_arbitrage'], [], 'seeded'),
  mema: bundle(['emerging_markets', 'managed_futures'], ['managed_futures'], 'seeded'),
  cta: bundle([], ['managed_futures'], 'seeded'),
  dbmf: bundle([], ['managed_futures'], 'seeded'),
  kmlm: bundle([], ['managed_futures'], 'seeded'),
  hard: bundle(['hard_assets_long_short'], ['commodities'], 'manual'),
}

/** CA hub registry slugs — peers only within Canadian listings. */
export const ETF_SIMILARITY_TAGS_BY_SLUG_CA: Record<string, EtfSimilarityTagBundle> = {
  rgbm: bundle(['global_equity'], ['global_macro', 'investment_grade_credit'], 'sleeve'),
  onec: bundle(['global_multi_alternative'], ['multi_strategy_alternative'], 'seeded'),
  pfaa: bundle(['global_multi_alternative'], ['multi_strategy_alternative'], 'seeded'),
  /** ~130% long / 30% short Canadian equity — ~100% net; pairs with ATSX (150/50, same net). */
  pfae: bundle(['canadian_equity', 'long_short_equity', 'ls_net_exposure_100pct'], [], 'manual'),
  zlb: bundle(['canadian_equity', 'low_volatility'], [], 'seeded'),
  /** 150/50 vs TSX 60 — ~100% net equity exposure; not the moderate-net global L/S cluster. */
  atsx: bundle(['canadian_equity', 'long_short_equity', 'ls_net_exposure_100pct'], [], 'manual'),
  /** Moderate net long (e.g. ~60% net per scorecard model) — not full-market net like ATSX/PFAE. */
  pfls: bundle(['global_equity', 'long_short_equity', 'ls_net_exposure_mod_60'], [], 'manual'),
  tgaf: bundle(['global_equity', 'long_short_equity', 'ls_net_exposure_mod_60'], [], 'manual'),
  dglm: bundle([], ['global_macro'], 'seeded'),
  btccb: bundle(['crypto', 'crypto_major', 'crypto_bitcoin'], [], 'seeded'),
  hsu: bundle(['us_large_cap', 'leveraged_equity'], [], 'seeded'),
  hqu: bundle(['nasdaq_leverage', 'leveraged_equity'], [], 'seeded'),
  ussl: bundle(['us_small_cap', 'leveraged_equity'], [], 'seeded'),
  qqql: bundle(['nasdaq_leverage', 'leveraged_equity'], [], 'seeded'),
  heql: bundle(['canadian_equity', 'leveraged_equity'], [], 'seeded'),
  /** Spot ether sleeve — pair with BTCC-B via `crypto_major` / `crypto_ethereum` vs `crypto_bitcoin`. */
  ethxb: bundle(['crypto', 'crypto_major', 'crypto_ethereum'], [], 'seeded'),
  hdge: bundle(['us_large_cap', 'long_short_equity', 'ls_net_exposure_mod_60'], [], 'manual'),
  pfmn: bundle(['preferreds_credit'], ['credit'], 'seeded'),
  arb: bundle(['global_macro', 'multi_asset'], ['absolute_return'], 'seeded'),
}

export type EtfSimilarityUniverse = 'us' | 'ca'

export function getSimilarityTagBundle(
  slug: string,
  universe: EtfSimilarityUniverse
): EtfSimilarityTagBundle | undefined {
  if (universe === 'ca') return ETF_SIMILARITY_TAGS_BY_SLUG_CA[slug]
  return ETF_SIMILARITY_TAGS_BY_SLUG_US[slug]
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
const UNIQUE_EQUITY_TAGS: readonly string[] = ['international_small_value']

const UNIQUE_ALPHA_TAGS: readonly string[] = []

/**
 * Very common equity tags — matching cannot rely on these alone (equity-only funds need a shared “narrow” tag).
 */
const BROAD_EQUITY_TAGS: ReadonlySet<string> = new Set([
  'us_large_cap',
  'global_equity',
  'international',
  'emerging_markets',
  'developed_ex_us',
  'nasdaq100',
  'international_small_value',
  /** Listing geography alone must not pair e.g. ZLB (low vol) with HEQL (leveraged). */
  'canadian_equity',
  /** Style tag shared by many L/S funds — net exposure bands (`ls_net_exposure_*`) disambiguate. */
  'long_short_equity',
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
  'pm_gold',
  'pm_silver',
  'pm_platinum',
  'pm_palladium',
])

/** Spot / major listed crypto — Bitcoin and Ethereum pair with each other for similarity. */
export const CRYPTO_MAJOR_ASSET_TAGS: ReadonlySet<string> = new Set(['crypto_bitcoin', 'crypto_ethereum'])

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
