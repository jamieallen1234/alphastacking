import type { MetadataRoute } from 'next'
import { CA_ETF_DYNAMIC_REGISTRY, US_ETF_DYNAMIC_REGISTRY } from '@/lib/etfDynamicRegistry'
import { caPortfolioRoutes, usPortfolioRoutes } from '@/lib/portfolioRoutes'

const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://alphastacking.co').replace(/\/$/, '')

function abs(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`
  return `${SITE}${p}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set<string>([
    '/',
    '/ca',
    '/portfolios',
    '/ca/portfolios',
    '/us-etfs',
    '/ca/etfs',
    '/ca/us-etfs',
    '/learn',
    '/ca/learn',
    '/us-etfs/mate',
    '/us-etfs/rssy',
    '/us-etfs/hfgm',
    '/ca/us-etfs/mate',
    '/ca/us-etfs/rssy',
    '/ca/us-etfs/hfgm',
    '/ca/etfs/hdge',
    '/ca/etfs/arb',
    '/ca/etfs/pfmn',
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

  return [...paths].sort().map((route) => ({
    url: abs(route),
    changeFrequency: 'weekly' as const,
    priority: route === '/' ? 1 : route === '/ca' ? 0.9 : 0.7,
  }))
}
