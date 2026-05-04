import { CA_ETF_DYNAMIC_REGISTRY, US_ETF_DYNAMIC_REGISTRY } from '@/lib/etfDynamicRegistry'
import {
  ETF_STACK_EXPOSURE_BY_SLUG,
  type EtfStackExposureConfig,
  type SleeveComponent,
} from '@/lib/etfStackExposureBySlug'

/**
 * Explicit multi-leg Yahoo symbols for portfolio / builder chart proxies (pre-inception stack merge).
 * Manual entries override auto resolution from `ETF_STACK_EXPOSURE_BY_SLUG`.
 * Bitcoin leg: **BITO** if the sleeve/fund is futures-based; **IBIT** for spot / physical / generic “bitcoin” proxy.
 */
export const CHART_STACK_PRODUCT_PROXY_LEGS: Record<string, string[]> = {
  BTGD: ['BITO', 'GLD'],
  OOQB: ['QQQ', 'BITO'],
  OOSB: ['SPY', 'BITO'],
  RSSX: ['SPY', 'BITO', 'GLD'],
  WTIB: ['USO', 'BITO'],
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
 * Gross notional % for financing drag: registry sum, else ~100× manual leg count, else 200.
 */
export function grossExposureForChartProxy(yahooSymbol: string, slug: string | null): number {
  if (slug) {
    const g = grossExposurePctForSlug(slug)
    if (g != null && g > 0) return g
  }
  const manual = CHART_STACK_PRODUCT_PROXY_LEGS[yahooSymbol.trim().toUpperCase()]
  if (manual?.length) return manual.length * 100
  return 200
}

/** Resolved proxy legs for a Yahoo symbol: manual map overrides auto stack-derived legs. */
export function resolveChartProxyLegs(yahooSymbol: string): string[] | null {
  const u = yahooSymbol.trim().toUpperCase()
  const manual = CHART_STACK_PRODUCT_PROXY_LEGS[u]
  if (manual?.length) return manual
  const slug = findSlugByYahooSymbol(u)
  if (!slug) return null
  return buildAutoStackProxyLegs(slug)
}
