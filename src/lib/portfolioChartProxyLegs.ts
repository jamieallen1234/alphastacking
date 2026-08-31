import { CA_ETF_DYNAMIC_REGISTRY, US_ETF_DYNAMIC_REGISTRY } from '@/lib/etfDynamicRegistry'
import {
  ETF_STACK_EXPOSURE_BY_SLUG,
  type EtfStackExposureConfig,
  type SleeveComponent,
} from '@/lib/etfStackExposureBySlug'
import {
  ETF_SIMILARITY_TAGS_BY_SLUG_CA,
  ETF_SIMILARITY_TAGS_BY_SLUG_US,
  similarEtfSlugsFor,
  type EtfSimilarityUniverse,
} from '@/lib/etfSimilarityTags'
import { blendPriceSeriesMulti } from '@/lib/syntheticProxyMerge'
import type { PriceSeries } from '@/lib/yahooFinance'

export type BlendComponent = { symbol: string; weight: number }
export type BlendSpec = { blend: BlendComponent[] }
/** A single stack leg: either a ticker symbol (100% leg) or a weighted blend of tickers (one overlay leg). */
export type ProxyLeg = string | BlendSpec
export type ProxyDef = {
  legs: ProxyLeg[]
  /**
   * Gross notional % for borrow-drag in buildPreInceptionProductStackMerge.
   * 200 when building from scratch (e.g. SPY + MF blend).
   * 100 when the proxy is an existing fund whose borrow cost is already embedded (e.g. RSST for MATE).
   */
  grossExposurePct?: number
  /**
   * Multiplier applied to the proxy's daily returns before splicing. Used when the proxy fund has a
   * different gross leverage than the target (e.g. HOLD 1.5x proxied by RSST 2x → 1.5/2 = 0.75), so the
   * pre-inception line reflects the target's actual leverage. Defaults to 1 (raw splice).
   */
  legReturnScale?: number
}

/**
 * Explicit proxy definitions for portfolio / builder chart (pre-inception stack merge).
 * Manual entries override auto resolution from `ETF_STACK_EXPOSURE_BY_SLUG`.
 * A string leg that is itself a key here is a chain proxy: the system extends that ticker's history
 * first (Phase 1), then uses the extended series as a proxy leg for the outer fund (Phase 2).
 */
export const CHART_STACK_PRODUCT_PROXY_LEGS: Record<string, ProxyDef> = {
  /** SPY + (70% DBMF + 30% KMLM) managed-futures blend, back to KMLM's Dec 2020 inception. */
  RSST: {
    legs: ['SPY', { blend: [{ symbol: 'DBMF', weight: 0.7 }, { symbol: 'KMLM', weight: 0.3 }] }],
    grossExposurePct: 200,
  },
  /** Chains through RSST: uses extended RSST series; RSST's borrow cost is already embedded. */
  MATE: { legs: ['RSST'], grossExposurePct: 100 },
  /** Pre-inception: AGG (broad US bonds) + DBMF (managed-futures replication) mirrors RSBT's two-sleeve design. */
  RSBT: { legs: ['AGG', 'DBMF'] },
  /** Pre-inception: SPDW (developed world ex-US equity) + DBMF (managed-futures replication) mirrors RSIT's two-sleeve design. */
  RSIT: { legs: ['SPDW', 'DBMF'] },
  /** Pre-inception: VT (global equity) + AGG (US bonds) mirrors RSSB's two-sleeve design. */
  RSSB: { legs: ['VT', 'AGG'] },
  BTGD: { legs: ['BITO', 'GLD'] },
  OOQB: { legs: ['QQQ', 'BITO'] },
  OOSB: { legs: ['SPY', 'BITO'] },
  RSSX: { legs: ['SPY', 'BITO', 'GLD'] },
  WTIB: { legs: ['USO', 'BITO'] },
  /** Pre-listing: 50% cash-flow "cash cows" value + 50% quality-GARP blend; extends joint history before VFLO's inception. */
  VFLO: { legs: [{ blend: [{ symbol: 'COWZ', weight: 0.5 }, { symbol: 'GARP', weight: 0.5 }] }] },
  /** Pre-listing: same US momentum-factor strategy (Fidelity U.S. Momentum vs S&P 500 Momentum); extends joint history before FCMO.NE's inception. */
  'FCMO.NE': { legs: ['SPMO'] },
  /** Pre-listing: Canadian-listed global technology ETF used for FINN's innovation-heavy global equity sleeve. */
  'FINN.NE': { legs: ['TEC.TO'] },
  /** Pre-listing: 90% TIPS + 90% gold futures; TIP extends to 2003, GLD to 2004. Gross = 180%. */
  GDT: { legs: ['TIP', 'GLD'], grossExposurePct: 180 },
  /**
   * Pre-listing: Canadian 130/30 long/short equity proxy. The 100% capital allocation is
   * 23% XSP, 35% XIU, 30% PFLS, and 12% SSO. This produces 130% long exposure
   * (23 + 35 + 48 from PFLS + 24 from SSO) and 30% short exposure from PFLS.
   * The real PFAE series takes over at its first listed session.
   */
  'PFAE.TO': {
    legs: [
      {
        blend: [
          { symbol: 'XSP.TO', weight: 0.23 },
          { symbol: 'PFLS.TO', weight: 0.3 },
          { symbol: 'XIU.TO', weight: 0.35 },
          { symbol: 'SSO', weight: 0.12 },
        ],
      },
    ],
  },
  /** Pre-listing: US-listed merger arbitrage; extends joint history before ARB.TO's inception (MRGR live since 2013). */
  'ARB.TO': { legs: ['MRGR'] },
  /** Pre-listing: US-listed AAA CLO ETF, used to extend BAAA.TO's floating-rate credit sleeve. */
  'BAAA.TO': { legs: ['JAAA'] },
  /** Pre-listing: 50% Convergence long/short + 50% international small-cap value, net of a 25% small-cap-beta short (IWM) to approximate ORR's long/short net exposure; extends joint history before ORR's inception. */
  ORR: {
    legs: [{ blend: [{ symbol: 'CLSE', weight: 0.5 }, { symbol: 'AVDV', weight: 0.5 }, { symbol: 'IWM', weight: -0.25 }] }],
    grossExposurePct: 100,
  },
}

/** CME-style bitcoin futures exposure → BITO; otherwise spot-style proxy → IBIT (see sleeve `name` in stack map). */
export function bitcoinChartProxyYahooFromSleeveName(name: string): 'IBIT' | 'BITO' {
  const n = name.toLowerCase()
  const mentionsBitcoin = n.includes('bitcoin') || n.includes('btc')
  const mentionsFutures =
    /\bfutures?\b/i.test(n) ||
    /\bcme\b/i.test(n) ||
    /rolling (btc|bitcoin)/i.test(n)
  if (mentionsBitcoin && mentionsFutures) return 'BITO'
  return 'IBIT'
}

export function findSlugByYahooSymbol(sym: string): string | null {
  const u = sym.trim().toUpperCase()
  for (const slug of Object.keys(US_ETF_DYNAMIC_REGISTRY)) {
    if (US_ETF_DYNAMIC_REGISTRY[slug as keyof typeof US_ETF_DYNAMIC_REGISTRY]!.yahooSymbol.toUpperCase() === u) {
      return slug
    }
  }
  for (const slug of Object.keys(CA_ETF_DYNAMIC_REGISTRY)) {
    if (CA_ETF_DYNAMIC_REGISTRY[slug as keyof typeof CA_ETF_DYNAMIC_REGISTRY]!.yahooSymbol.toUpperCase() === u) {
      return slug
    }
  }
  return null
}

/** Map a sleeve to a Yahoo proxy leg (portfolio chart only). Returns null for sleeves we do not model (e.g. managed futures yield). */
export function mapComponentToChartProxyLeg(c: SleeveComponent): string | null {
  const n = c.name.toLowerCase()
  if (c.assetClass === 'equity') return null
  if (c.assetClass === 'crypto') {
    if (n.includes('ethereum')) return 'ETHA'
    if (n.includes('bitcoin') || n.includes('btc')) return bitcoinChartProxyYahooFromSleeveName(c.name)
    return 'IBIT'
  }
  if (c.assetClass === 'commodity') {
    if (n.includes('gold')) return 'GLD'
    if (n.includes('silver')) return 'SLV'
    if (n.includes('oil') || n.includes('crude') || n.includes('wti') || n.includes('brent')) return 'USO'
    return null
  }
  if (c.assetClass === 'alternatives') {
    if (n.includes('gold')) return 'GLD'
    if (n.includes('silver')) return 'SLV'
    if (n.includes('oil') || n.includes('crude') || n.includes('wti')) return 'USO'
    if (n.includes('ethereum')) return 'ETHA'
    if (n.includes('bitcoin') || n.includes('btc')) return bitcoinChartProxyYahooFromSleeveName(c.name)
    return null
  }
  if (c.assetClass === 'fixed-income') return null
  return null
}

/** True when the stack map supports building ≥2 Yahoo legs (equity + mapped alpha, or ≥2 mapped alts e.g. BTGD). */
export function slugEligibleForAutoChartProxies(m: EtfStackExposureConfig): boolean {
  const hasEquity = m.components.some((c) => c.assetClass === 'equity')
  const mappedAlphaCount = m.components.filter((c) => mapComponentToChartProxyLeg(c) != null).length
  if (hasEquity) return mappedAlphaCount >= 1
  return mappedAlphaCount >= 2
}

function buildAutoStackProxyLegs(slug: string): string[] | null {
  const m = ETF_STACK_EXPOSURE_BY_SLUG[slug]
  if (!m || !slugEligibleForAutoChartProxies(m)) return null

  const legs: string[] = []
  const hasEquity = m.components.some((c) => c.assetClass === 'equity')

  if (hasEquity) {
    const b = m.coreBenchmarkSymbol?.trim()
    if (b) {
      legs.push(b)
    } else {
      legs.push('SPY')
    }
  }

  for (const c of m.components) {
    if (hasEquity && c.assetClass === 'equity') continue
    const y = mapComponentToChartProxyLeg(c)
    if (y) {
      const x = y.trim().toUpperCase()
      if (!legs.includes(x)) legs.push(x)
    }
  }

  return legs.length >= 2 ? legs : null
}

/** Sum of sleeve notionals % from the stack map (e.g. 200 for 100+100 stacks). */
export function grossExposurePctForSlug(slug: string): number | null {
  const m = ETF_STACK_EXPOSURE_BY_SLUG[slug]
  if (!m) return null
  return m.components.reduce((s, c) => s + c.pct, 0)
}

/**
 * Gross notional % for financing drag: ProxyDef explicit value, then registry sum, then leg count × 100, else 200.
 */
export function grossExposureForChartProxy(yahooSymbol: string, slug: string | null): number {
  if (slug) {
    const g = grossExposurePctForSlug(slug)
    if (g != null && g > 0) return g
  }
  const manual = CHART_STACK_PRODUCT_PROXY_LEGS[yahooSymbol.trim().toUpperCase()]
  if (manual) {
    if (manual.grossExposurePct != null) return manual.grossExposurePct
    return manual.legs.length * 100
  }
  return 200
}

/**
 * All symbols needed for fetching: direct leg symbols plus any chain-proxy descendants (recursive).
 * E.g. for MATE → ['RSST', 'SPY', 'DBMF', 'KMLM'] (RSST is a chain ticker; its leaves are included).
 */
export function collectProxyFetchSymbols(def: ProxyDef): string[] {
  const syms = new Set<string>()
  for (const leg of def.legs) {
    if (typeof leg === 'string') {
      const u = leg.toUpperCase()
      syms.add(u)
      const chainDef = CHART_STACK_PRODUCT_PROXY_LEGS[u]
      if (chainDef) {
        for (const s of collectProxyFetchSymbols(chainDef)) syms.add(s)
      }
    } else {
      for (const c of leg.blend) syms.add(c.symbol.toUpperCase())
    }
  }
  return [...syms]
}

/**
 * Terminal (leaf) symbols only, no chain-ticker intermediates.
 * Used for first-trade-date calculation so the binding date is KMLM (Dec 2020), not RSST (Oct 2022).
 * E.g. for MATE → ['SPY', 'DBMF', 'KMLM']; for RSST → ['SPY', 'DBMF', 'KMLM'].
 */
export function collectProxyLeafSymbols(def: ProxyDef): string[] {
  const syms = new Set<string>()
  for (const leg of def.legs) {
    if (typeof leg === 'string') {
      const u = leg.toUpperCase()
      const chainDef = CHART_STACK_PRODUCT_PROXY_LEGS[u]
      if (chainDef) {
        for (const s of collectProxyLeafSymbols(chainDef)) syms.add(s)
      } else {
        syms.add(u)
      }
    } else {
      for (const c of leg.blend) syms.add(c.symbol.toUpperCase())
    }
  }
  return [...syms]
}

/** A fund younger than this (in years) gets an auto similar-ETF proxy if no manual / stack proxy exists. */
export const SIMILAR_PROXY_RECENT_INCEPTION_YEARS = 2
/** A proxy candidate must predate the new fund by at least this many years to actually extend the backtest. */
export const SIMILAR_PROXY_MIN_HISTORY_ADVANTAGE_YEARS = 1

const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000

/** Parse registry inception strings: "Feb 7, 2025", "Jun 2006", or a bare year. Returns epoch ms or null. */
export function parseInceptionTime(s: string): number | null {
  const direct = Date.parse(s)
  if (!Number.isNaN(direct)) return direct
  const monthYear = s.match(/([A-Za-z]{3,})\s+(\d{4})/)
  if (monthYear) {
    const t = Date.parse(`${monthYear[1]} 1, ${monthYear[2]}`)
    if (!Number.isNaN(t)) return t
  }
  const year = s.match(/\b(\d{4})\b/)
  if (year) {
    const t = Date.parse(`Jan 1, ${year[1]}`)
    if (!Number.isNaN(t)) return t
  }
  return null
}

type RegistryHit = {
  slug: string
  universe: EtfSimilarityUniverse
  inception: string
  yahooSymbol: string
}

function findRegistryHitByYahoo(sym: string): RegistryHit | null {
  const u = sym.trim().toUpperCase()
  for (const slug of Object.keys(US_ETF_DYNAMIC_REGISTRY)) {
    const def = US_ETF_DYNAMIC_REGISTRY[slug as keyof typeof US_ETF_DYNAMIC_REGISTRY]!
    if (def.yahooSymbol.toUpperCase() === u) {
      return { slug, universe: 'us', inception: def.inception, yahooSymbol: def.yahooSymbol }
    }
  }
  for (const slug of Object.keys(CA_ETF_DYNAMIC_REGISTRY)) {
    const def = CA_ETF_DYNAMIC_REGISTRY[slug as keyof typeof CA_ETF_DYNAMIC_REGISTRY]!
    if (def.yahooSymbol.toUpperCase() === u) {
      return { slug, universe: 'ca', inception: def.inception, yahooSymbol: def.yahooSymbol }
    }
  }
  return null
}

/**
 * Auto proxy for a short-history fund: its best-rated similar ETF (highest similarity score) whose
 * own history is clearly longer. Picks the next-best real fund an investor could have held — a single
 * 100% leg (no leverage drag). Returns null when the fund is old enough or no older peer qualifies.
 */
export function resolveSimilarEtfProxyDef(yahooSymbol: string, now: number = Date.now()): ProxyDef | null {
  const hit = findRegistryHitByYahoo(yahooSymbol)
  if (!hit) return null
  const incept = parseInceptionTime(hit.inception)
  if (incept == null) return null
  if ((now - incept) / MS_PER_YEAR > SIMILAR_PROXY_RECENT_INCEPTION_YEARS) return null

  const tagMap = hit.universe === 'us' ? ETF_SIMILARITY_TAGS_BY_SLUG_US : ETF_SIMILARITY_TAGS_BY_SLUG_CA
  const registry = hit.universe === 'us' ? US_ETF_DYNAMIC_REGISTRY : CA_ETF_DYNAMIC_REGISTRY
  const targetGross = grossExposurePctForSlug(hit.slug) ?? 100
  const peers = similarEtfSlugsFor(hit.slug, hit.universe, Object.keys(tagMap))
  for (const peerSlug of peers) {
    const peerDef = registry[peerSlug as keyof typeof registry]
    if (!peerDef) continue
    const peerIncept = parseInceptionTime(peerDef.inception)
    if (peerIncept == null) continue
    if ((incept - peerIncept) / MS_PER_YEAR >= SIMILAR_PROXY_MIN_HISTORY_ADVANTAGE_YEARS) {
      // Scale the peer's daily returns to the target's leverage (e.g. HOLD 1.5x via RSST 2x → 0.75).
      const peerGross = grossExposurePctForSlug(peerSlug) ?? 100
      const legReturnScale = peerGross > 0 ? targetGross / peerGross : 1
      return { legs: [peerDef.yahooSymbol.toUpperCase()], grossExposurePct: 100, legReturnScale }
    }
  }
  return null
}

/**
 * Resolved proxy def for a Yahoo symbol: manual map first, then auto-derives from
 * `ETF_STACK_EXPOSURE_BY_SLUG`, then (for short-history funds) the best-rated similar ETF.
 */
export function resolveProxyDef(yahooSymbol: string): ProxyDef | null {
  const u = yahooSymbol.trim().toUpperCase()
  const manual = CHART_STACK_PRODUCT_PROXY_LEGS[u]
  if (manual) return manual
  const slug = findSlugByYahooSymbol(u)
  if (slug) {
    const legs = buildAutoStackProxyLegs(slug)
    if (legs) return { legs }
  }
  return resolveSimilarEtfProxyDef(u)
}

/**
 * Resolves a ProxyDef's legs to PriceSeries[] for buildPreInceptionProductStackMerge.
 * String legs: look up in seriesBySymbol (Phase 1 may have already extended chain-proxy entries).
 * BlendSpec legs: blend all components (2 or more; weights may be negative for a short leg) into one series.
 * Returns null if any required series is missing or too short.
 */
export function buildResolvedStackLegs(
  def: ProxyDef,
  seriesBySymbol: Map<string, PriceSeries>
): PriceSeries[] | null {
  const result: PriceSeries[] = []
  for (const leg of def.legs) {
    if (typeof leg === 'string') {
      const ser = seriesBySymbol.get(leg.toUpperCase())
      if (ser == null || ser.timestamps.length < 2) return null
      result.push(ser)
    } else {
      if (leg.blend.length < 2) return null
      const resolvedLegs: { series: PriceSeries; weight: number }[] = []
      for (const component of leg.blend) {
        const ser = seriesBySymbol.get(component.symbol.toUpperCase())
        if (ser == null || ser.timestamps.length < 2) return null
        resolvedLegs.push({ series: ser, weight: component.weight })
      }
      result.push(blendPriceSeriesMulti(resolvedLegs))
    }
  }
  return result.length >= 1 ? result : null
}

/**
 * Compat shim: flattens a ProxyDef to a flat string[] of all direct symbols (no chain recursion).
 * Use resolveProxyDef + collectProxyLeafSymbols for first-trade-date calculations.
 */
export function resolveChartProxyLegs(yahooSymbol: string): string[] | null {
  const def = resolveProxyDef(yahooSymbol)
  if (!def) return null
  const syms: string[] = []
  for (const leg of def.legs) {
    if (typeof leg === 'string') {
      syms.push(leg.toUpperCase())
    } else {
      for (const c of leg.blend) syms.push(c.symbol.toUpperCase())
    }
  }
  return syms.length >= 1 ? syms : null
}
