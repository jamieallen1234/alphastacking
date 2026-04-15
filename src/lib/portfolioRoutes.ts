import { portfolios } from '@/lib/portfolios'

export type PortfolioPageKind = 'live' | 'placeholder' | 'stub'

export interface PortfolioRouteDef {
  slug: string
  region: 'us' | 'ca'
  kind: PortfolioPageKind
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
    title: 'US international',
    description:
      'Diversified US-listed mix with intentional beta near 1.0. Holdings span leveraged core, alts, and diversifiers.',
    featured: true,
  },
  {
    slug: 'leveraged-premia',
    region: 'us',
    kind: 'placeholder',
    title: 'Leveraged Premia',
    badge: 'Aggressive',
    description: 'UPRO + SSO + MATE + CTAP. High-octane LETF core with return-stacked alts.',
    sourcePortfolioId: 'leveraged-premia',
  },
  {
    slug: 'alpha-stack',
    region: 'us',
    kind: 'stub',
    title: 'The Alpha Stack',
    badge: 'Coming soon',
    description: 'Return-stacked core with managed futures overlay — full breakdown in progress.',
    sourcePortfolioId: 'alpha-stack',
  },
  {
    slug: 'capital-efficient',
    region: 'us',
    kind: 'stub',
    title: 'Capital Efficient Core',
    badge: 'Coming soon',
    description: 'Balanced leverage with global macro hedge — model portfolio page coming.',
    sourcePortfolioId: 'capital-efficient',
  },
  {
    slug: 'global-macro-blend',
    region: 'us',
    kind: 'stub',
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
    title: 'Canadian international',
    description:
      'Mix of TSX-listed and US-listed names with intentional beta near 1.0 — diversified sleeves across geographies.',
    featured: true,
  },
  {
    slug: 'ca-alpha-stack',
    region: 'ca',
    kind: 'stub',
    title: 'Canadian Alpha Stack',
    badge: 'Coming soon',
    description: 'TSX-listed leveraged alternatives — full model page in progress.',
    sourcePortfolioId: 'ca-alpha-stack',
  },
  {
    slug: 'ca-conservative',
    region: 'ca',
    kind: 'stub',
    title: 'TSX Efficient Core',
    badge: 'Coming soon',
    description: 'Capital-efficient TSX sleeve — details coming.',
    sourcePortfolioId: 'ca-conservative',
  },
  {
    slug: 'ca-aggressive',
    region: 'ca',
    kind: 'stub',
    title: 'Leveraged TSX',
    badge: 'Coming soon',
    description: 'High-conviction Canadian leveraged sleeve — details coming.',
    sourcePortfolioId: 'ca-aggressive',
  },
]

export function getPortfolioCardById(id: string) {
  return portfolios.find((p) => p.id === id)
}
