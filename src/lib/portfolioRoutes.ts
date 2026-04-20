import { portfolios } from '@/lib/portfolios'

export type PortfolioPageKind = 'live' | 'placeholder' | 'stub'

/** Where the card appears on the portfolios hub (US page: US-only rows; CA page: grouped by region + section). */
export type PortfolioHubSection = 'annual-rebalance' | 'buy-hold'

export interface PortfolioRouteDef {
  slug: string
  region: 'us' | 'ca'
  kind: PortfolioPageKind
  hubSection: PortfolioHubSection
  title: string
  badge?: string
  description: string
  /** For placeholder/stub: copy metrics from home page cards */
  sourcePortfolioId?: string
  featured?: boolean
}

/** Curated routes for US (`/portfolios/...`) */
export const usPortfolioRoutes: PortfolioRouteDef[] = [
  {
    slug: 'us-international',
    region: 'us',
    kind: 'live',
    hubSection: 'annual-rebalance',
    title: 'US international',
    description:
      'Diversified US-listed mix with intentional beta near 1.0 — modeled with annual rebalance to target weights (first US session of each calendar year).',
    featured: true,
  },
  {
    slug: 'us-core-buy-hold',
    region: 'us',
    kind: 'live',
    hubSection: 'buy-hold',
    title: 'US core (buy & hold)',
    description:
      'VFLO, AVUV, QQQ, and SPMO at 20% / 20% / 30% / 30%; no rebalancing in the model.',
    featured: true,
  },
  {
    slug: 'leveraged-premia',
    region: 'us',
    kind: 'placeholder',
    hubSection: 'annual-rebalance',
    title: 'Leveraged Premia',
    badge: 'Aggressive',
    description: 'UPRO + SSO + MATE + CTAP. High-octane LETF core with return-stacked alts.',
    sourcePortfolioId: 'leveraged-premia',
  },
  {
    slug: 'alpha-stack',
    region: 'us',
    kind: 'stub',
    hubSection: 'annual-rebalance',
    title: 'The Alpha Stack',
    badge: 'Coming soon',
    description: 'Return-stacked core with managed futures overlay — full breakdown in progress.',
    sourcePortfolioId: 'alpha-stack',
  },
  {
    slug: 'capital-efficient',
    region: 'us',
    kind: 'stub',
    hubSection: 'annual-rebalance',
    title: 'Capital Efficient Core',
    badge: 'Coming soon',
    description: 'Balanced leverage with global macro hedge — model portfolio page coming.',
    sourcePortfolioId: 'capital-efficient',
  },
  {
    slug: 'global-macro-blend',
    region: 'us',
    kind: 'stub',
    hubSection: 'annual-rebalance',
    title: 'Global macro blend',
    badge: 'Planned',
    description: 'Placeholder slot for an additional US model portfolio.',
  },
]

/** Curated routes for Canada (`/ca/portfolios/...`) */
export const caPortfolioRoutes: PortfolioRouteDef[] = [
  {
    slug: 'ca-international',
    region: 'ca',
    kind: 'live',
    hubSection: 'annual-rebalance',
    title: 'Canadian international',
    description:
      'TSX and US-listed sleeves in CAD — annual rebalance to target weights (first US session of each calendar year).',
    featured: true,
  },
  {
    slug: 'ca-core-buy-hold',
    region: 'ca',
    kind: 'live',
    hubSection: 'buy-hold',
    title: 'US & Canada - Balanced beta',
    description:
      'USSL.TO, QQQL.TO, ZLB.TO, and PFLS.TO at 30% / 30% / 25% / 15%; no rebalancing in the model.',
    featured: true,
  },
  {
    slug: 'ca-ussl-qqql-hdge',
    region: 'ca',
    kind: 'live',
    hubSection: 'buy-hold',
    title: 'US + hedge long/short',
    description: 'USSL.TO, HDGE.TO, and QQQL.TO at 60% / 25% / 15%; static weights, no rebalancing.',
  },
  {
    slug: 'ca-alpha-stack',
    region: 'ca',
    kind: 'stub',
    hubSection: 'annual-rebalance',
    title: 'Canadian Alpha Stack',
    badge: 'Coming soon',
    description: 'TSX-listed leveraged alternatives — full model page in progress.',
    sourcePortfolioId: 'ca-alpha-stack',
  },
  {
    slug: 'ca-conservative',
    region: 'ca',
    kind: 'stub',
    hubSection: 'annual-rebalance',
    title: 'TSX Efficient Core',
    badge: 'Coming soon',
    description: 'Capital-efficient TSX sleeve — details coming.',
    sourcePortfolioId: 'ca-conservative',
  },
  {
    slug: 'ca-aggressive',
    region: 'ca',
    kind: 'stub',
    hubSection: 'annual-rebalance',
    title: 'Leveraged TSX',
    badge: 'Coming soon',
    description: 'High-conviction Canadian leveraged sleeve — details coming.',
    sourcePortfolioId: 'ca-aggressive',
  },
]

export const HUB_SECTION_LABEL: Record<
  PortfolioHubSection,
  { heading: string; blurb: string }
> = {
  'annual-rebalance': {
    heading: 'Leveraged — annual rebalance',
    blurb: 'Target weights reset on the first US trading session of each calendar year (after that session’s closes).',
  },
  'buy-hold': {
    heading: 'Buy & hold',
    blurb: 'Static weights in the model; no periodic rebalancing.',
  },
}

export function getPortfolioCardById(id: string) {
  return portfolios.find((p) => p.id === id)
}

/** Routes shown on portfolio hub grids (excludes coming-soon stubs and preview-only placeholders). */
export function portfolioHubRoutes(routes: PortfolioRouteDef[]) {
  return routes.filter((r) => r.kind === 'live')
}
