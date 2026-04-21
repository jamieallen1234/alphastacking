import { CA_ETF_DYNAMIC_REGISTRY, US_ETF_DYNAMIC_REGISTRY } from '@/lib/etfDynamicRegistry'

/** US ETF hub root (main site vs Canadian edition shell). */
export type PortfolioUsEtfHubBase = '/us-etfs' | '/ca/us-etfs'

const HAND_AUTHORED_US_SLUG: Record<string, string> = {
  MATE: 'mate',
  RSSY: 'rssy',
  HFGM: 'hfgm',
}

/**
 * Issuer / sponsor product pages for proxies that do not have an on-site write-up.
 * Keys must match Yahoo-style tickers used in charts (uppercase).
 */
const OFFICIAL_ETF_HOME: Record<string, string> = {
  SPY: 'https://www.ssga.com/us/en/intermediary/etfs/funds/spdr-sp-500-etf-trust-spy',
  EFA: 'https://www.ishares.com/us/products/239516/ishares-msci-eafe-etf',
  QQQ: 'https://www.invesco.com/us/financial-products/etfs/product-detail?audienceType=Individual&ticker=QQQ',
  'VFV.TO': 'https://www.vanguard.ca/en/product/etf/series/vanguard-sp-500-index-etf',
  'HEQT.TO': 'https://www.globalx.ca/product/heqt',
  'HEQL.TO': 'https://www.globalx.ca/product/heql',
  'USSL.TO': 'https://www.globalx.ca/product/ussl',
  'QQQL.TO': 'https://www.globalx.ca/product/qqql',
}

function slugFromUsRegistry(tickerUpper: string): string | null {
  for (const [slug, def] of Object.entries(US_ETF_DYNAMIC_REGISTRY)) {
    if (def.yahooSymbol.toUpperCase() === tickerUpper) return slug
  }
  return null
}

function slugFromCaRegistry(tickerUpper: string): string | null {
  for (const [slug, def] of Object.entries(CA_ETF_DYNAMIC_REGISTRY)) {
    if (def.yahooSymbol.toUpperCase() === tickerUpper) return slug
  }
  return null
}

/**
 * On-site ETF review when available; otherwise the official fund product URL.
 */
export function getPortfolioProxyEtfNav(
  ticker: string,
  hubBaseUs: PortfolioUsEtfHubBase
): { href: string; external: boolean } | null {
  const t = ticker.trim().toUpperCase()

  const hand = HAND_AUTHORED_US_SLUG[t]
  if (hand) return { href: `${hubBaseUs}/${hand}`, external: false }

  const usSlug = slugFromUsRegistry(t)
  if (usSlug) return { href: `${hubBaseUs}/${usSlug}`, external: false }

  const caSlug = slugFromCaRegistry(t)
  if (caSlug) return { href: `/ca/etfs/${caSlug}`, external: false }

  const official = OFFICIAL_ETF_HOME[t]
  if (official) return { href: official, external: true }

  return null
}
