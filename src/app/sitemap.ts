import type { MetadataRoute } from 'next'
import { CA_ETF_DYNAMIC_REGISTRY, US_ETF_DYNAMIC_REGISTRY } from '@/lib/etfDynamicRegistry'
import { caPortfolioRoutes, usPortfolioRoutes } from '@/lib/portfolioRoutes'
import { getSiteUrl } from '@/lib/siteUrl'

const SITE = getSiteUrl()

const PAIRED_STATIC_PATHS: ReadonlyArray<readonly [string, string]> = [
  ['/', '/ca'],
  ['/portfolios', '/ca/portfolios'],
  ['/us-etfs', '/ca/us-etfs'],
  ['/contact', '/ca/contact'],
  ['/disclaimers', '/ca/disclaimers'],
  ['/privacy', '/ca/privacy'],
  ['/portfolio-builder', '/ca/portfolio-builder'],
  ['/updates', '/ca/updates'],
  ['/learn', '/ca/learn'],
  ['/learn/what-is-alpha-stacking', '/ca/learn/what-is-alpha-stacking'],
  ['/learn/etf-pages-and-portfolio-builder-101', '/ca/learn/etf-pages-and-portfolio-builder-101'],
  ['/learn/how-to-build-an-alpha-stacking-portfolio', '/ca/learn/how-to-build-an-alpha-stacking-portfolio'],
  ['/learn/why-alpha-stacking', '/ca/learn/why-alpha-stacking'],
  ['/learn/efficiency-grades', '/ca/learn/efficiency-grades'],
  ['/learn/market-environments', '/ca/learn/market-environments'],
  ['/learn/portfolio-score', '/ca/learn/portfolio-score'],
  ['/learn/return-stacking-explained', '/ca/learn/return-stacking-explained'],
]

function abs(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`
  return `${SITE}${p}`
}

function pairedPathsFor(route: string): readonly [string, string] | undefined {
  const staticPair = PAIRED_STATIC_PATHS.find(([usPath, caPath]) => route === usPath || route === caPath)
  if (staticPair) return staticPair

  if (route.startsWith('/us-etfs/')) return [route, `/ca${route}`]
  if (route.startsWith('/ca/us-etfs/')) return [route.slice(3), route]

  if (route.startsWith('/portfolios/')) return [route, `/ca${route}`]
  if (route.startsWith('/ca/portfolios/')) {
    const slug = route.slice('/ca/portfolios/'.length)
    if (usPortfolioRoutes.some((portfolio) => portfolio.slug === slug)) {
      return [`/portfolios/${slug}`, route]
    }
  }

  return undefined
}

function languageAlternates(route: string) {
  const pair = pairedPathsFor(route)
  if (!pair) return undefined
  const [usPath, caPath] = pair
  return {
    languages: {
      'en-US': abs(usPath),
      'en-CA': abs(caPath),
      'x-default': abs(usPath),
    },
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Hubs, content pages, and learn articles. Per-ETF and per-portfolio paths
  // are appended below from the registries so this list stays minimal.
  const paths = new Set<string>([
    '/',
    '/ca',
    '/portfolios',
    '/ca/portfolios',
    '/us-etfs',
    '/ca/etfs',
    '/ca/us-etfs',
    '/contact',
    '/ca/contact',
    '/disclaimers',
    '/ca/disclaimers',
    '/privacy',
    '/ca/privacy',
    '/portfolio-builder',
    '/ca/portfolio-builder',
    '/updates',
    '/ca/updates',
    '/learn',
    '/ca/learn',
    '/learn/what-is-alpha-stacking',
    '/ca/learn/what-is-alpha-stacking',
    '/learn/etf-pages-and-portfolio-builder-101',
    '/ca/learn/etf-pages-and-portfolio-builder-101',
    '/learn/how-to-build-an-alpha-stacking-portfolio',
    '/ca/learn/how-to-build-an-alpha-stacking-portfolio',
    '/learn/why-alpha-stacking',
    '/ca/learn/why-alpha-stacking',
    '/learn/efficiency-grades',
    '/ca/learn/efficiency-grades',
    '/learn/market-environments',
    '/ca/learn/market-environments',
    '/learn/portfolio-score',
    '/ca/learn/portfolio-score',
    '/learn/return-stacking-explained',
    '/ca/learn/return-stacking-explained',
  ])

  for (const slug of Object.keys(US_ETF_DYNAMIC_REGISTRY)) {
    paths.add(`/us-etfs/${slug}`)
    paths.add(`/ca/us-etfs/${slug}`)
  }
  for (const slug of Object.keys(CA_ETF_DYNAMIC_REGISTRY)) {
    paths.add(`/ca/etfs/${slug}`)
  }

  for (const r of usPortfolioRoutes) {
    paths.add(`/portfolios/${r.slug}`)
    paths.add(`/ca/portfolios/${r.slug}`)
  }
  for (const r of caPortfolioRoutes) {
    paths.add(`/ca/portfolios/${r.slug}`)
  }

  return [...paths].sort().map((route) => {
    const alternates = languageAlternates(route)
    return {
      url: abs(route),
      changeFrequency: 'weekly' as const,
      priority: route === '/' ? 1 : route === '/ca' ? 0.9 : 0.7,
      ...(alternates ? { alternates } : {}),
    }
  })
}
