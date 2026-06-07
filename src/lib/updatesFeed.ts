/**
 * Site-additions feed for `/updates` (US) and `/ca/updates` (CA).
 *
 * Source of truth: `addedToSite` on each ETF registry row, and `addedAt` on each
 * portfolio route. Skills (`create-etf-page`, `add-portfolio`) populate these
 * fields when adding a new entry; this module just sorts and groups them.
 */

import { CA_ETF_DYNAMIC_REGISTRY, US_ETF_DYNAMIC_REGISTRY } from '@/lib/etfDynamicRegistry'
import type { EtfDynamicDef } from '@/lib/etfDynamicRegistryTypes'
import { LEARN_ARTICLES } from '@/lib/learnArticles'
import { caPortfolioRoutes, usPortfolioRoutes } from '@/lib/portfolioRoutes'
import type { PortfolioRouteDef } from '@/lib/portfolioRoutes'
import { homePath } from '@/lib/siteRegion'

export type UpdateKind = 'etf' | 'portfolio' | 'learn' | 'feature'

export interface UpdateEntry {
  kind: UpdateKind
  date: string
  slug: string
  ticker?: string
  title: string
  href: string
  blurb: string
}

export interface UpdateDay {
  date: string
  displayDate: string
  entries: UpdateEntry[]
}

const DISPLAY_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function formatDisplayDate(iso: string): string {
  const [y, m, d] = iso.split('-').map((n) => Number(n))
  if (!y || !m || !d) return iso
  return `${DISPLAY_MONTHS[m - 1]} ${d}, ${y}`
}

function stripHtml(s: string): string {
  return s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').trim()
}

function truncate(s: string, max: number): string {
  if (s.length <= max) return s
  const cut = s.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > max - 24 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.\s]+$/, '') + '…'
}

function etfBlurb(def: EtfDynamicDef): string {
  return truncate(stripHtml(def.lede || def.description || ''), 160)
}

function etfDisplayTitle(def: EtfDynamicDef): string {
  // h1Title shapes vary ('TICKER — Long Name' or 'TICKER - Long Name'). Strip the
  // leading ticker + separator so the card title reads like a fund name.
  const t = def.h1Title || ''
  const parts = t.split(/\s+[—-]\s+/)
  return parts.length > 1 ? parts.slice(1).join(' - ').trim() : t.trim()
}

function etfEntries(
  registry: Record<string, EtfDynamicDef>,
  hrefPrefix: string,
): UpdateEntry[] {
  const out: UpdateEntry[] = []
  for (const [slug, def] of Object.entries(registry)) {
    if (!def.addedToSite) continue
    out.push({
      kind: 'etf',
      date: def.addedToSite,
      slug,
      ticker: def.displayTicker,
      title: etfDisplayTitle(def),
      href: `${hrefPrefix}/${slug}`,
      blurb: etfBlurb(def),
    })
  }
  return out
}

function portfolioEntries(
  routes: PortfolioRouteDef[],
  hrefPrefix: string,
): UpdateEntry[] {
  const out: UpdateEntry[] = []
  for (const route of routes) {
    // Skip stubs and placeholders ("Coming soon" / "Planned"): they have no real page yet.
    if (route.kind !== 'live') continue
    if (!route.addedAt) continue
    out.push({
      kind: 'portfolio',
      date: route.addedAt,
      slug: route.slug,
      title: route.title,
      href: `${hrefPrefix}/${route.slug}`,
      blurb: route.description,
    })
  }
  return out
}

interface SiteFeatureDef {
  date: string
  slug: string
  title: string
  blurb: string
}

/** One-off site features worth announcing on `/updates`, outside the registry-driven feeds. */
const SITE_FEATURES: SiteFeatureDef[] = [
  {
    date: '2026-06-07',
    slug: 'light-mode',
    title: 'Light mode',
    blurb: 'Switch between dark and light themes with the toggle in the nav bar. Your choice is remembered on your next visit.',
  },
]

function featureEntries(isCa: boolean): UpdateEntry[] {
  const home = homePath(isCa)
  return SITE_FEATURES.map((f) => ({
    kind: 'feature' as const,
    date: f.date,
    slug: f.slug,
    title: f.title,
    href: home,
    blurb: f.blurb,
  }))
}

function learnEntries(isCa: boolean): UpdateEntry[] {
  return LEARN_ARTICLES.map((a) => ({
    kind: 'learn' as const,
    date: a.publishedDate,
    slug: a.slug,
    title: a.title,
    href: isCa ? `/ca/learn/${a.slug}` : `/learn/${a.slug}`,
    blurb: a.deck,
  }))
}

function kindRank(k: UpdateKind): number {
  if (k === 'feature') return 0
  if (k === 'portfolio') return 1
  if (k === 'learn') return 2
  return 3
}

function compareEntries(a: UpdateEntry, b: UpdateEntry): number {
  const rankDiff = kindRank(a.kind) - kindRank(b.kind)
  if (rankDiff !== 0) return rankDiff
  const aKey = (a.ticker || a.slug).toLowerCase()
  const bKey = (b.ticker || b.slug).toLowerCase()
  return aKey < bKey ? -1 : aKey > bKey ? 1 : 0
}

export function getUpdatesFeed(edition: 'us' | 'ca'): UpdateDay[] {
  const entries: UpdateEntry[] = []

  if (edition === 'us') {
    entries.push(...featureEntries(false))
    entries.push(...portfolioEntries(usPortfolioRoutes, '/portfolios'))
    entries.push(...learnEntries(false))
    entries.push(...etfEntries(US_ETF_DYNAMIC_REGISTRY, '/us-etfs'))
  } else {
    entries.push(...featureEntries(true))
    entries.push(...portfolioEntries(caPortfolioRoutes, '/ca/portfolios'))
    entries.push(...portfolioEntries(usPortfolioRoutes, '/portfolios'))
    entries.push(...learnEntries(true))
    entries.push(...etfEntries(CA_ETF_DYNAMIC_REGISTRY, '/ca/etfs'))
    entries.push(...etfEntries(US_ETF_DYNAMIC_REGISTRY, '/ca/us-etfs'))
  }

  const byDate = new Map<string, UpdateEntry[]>()
  for (const e of entries) {
    const bucket = byDate.get(e.date) ?? []
    bucket.push(e)
    byDate.set(e.date, bucket)
  }

  const days: UpdateDay[] = Array.from(byDate.entries()).map(([date, list]) => ({
    date,
    displayDate: formatDisplayDate(date),
    entries: list.slice().sort(compareEntries),
  }))

  days.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
  return days
}
