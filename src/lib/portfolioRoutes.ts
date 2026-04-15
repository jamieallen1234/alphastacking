import { portfolios } from '@/lib/portfolios'

export type PortfolioPageKind = 'live' | 'placeholder' | 'stub'

/** Where the card appears on the portfolios hub (US page: US-only rows; CA page: grouped by region + section). */
export type PortfolioHubSection = 'leveraged-quarterly' | 'buy-hold'

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
    hubSection: 'leveraged-quarterly',
    title: 'US international',
    description:
      'Diversified US-listed mix with intentional beta near 1.0 — modeled with quarterly rebalance to target weights (first US session of each calendar quarter).',
    featured: true,
  },
  {
    slug: 'us-core-buy-hold',
    region: 'us',
    kind: 'live',
    hubSection: 'buy-hold',
    title: 'US core (buy & hold)',
    description: 'QQQ, SPMO, and VFLO at fixed weights; no rebalancing in the model.',
    featured: true,
  },
  {
    slug: 'leveraged-premia',
    region: 'us',
    kind: 'placeholder',
    hubSection: 'leveraged-quarterly',
    title: 'Leveraged Premia',
    badge: 'Aggressive',
    description: 'UPRO + SSO + MATE + CTAP. High-octane LETF core with return-stacked alts.',
    sourcePortfolioId: 'leveraged-premia',
  },
  {
    slug: 'alpha-stack',
    region: 'us',
    kind: 'stub',
    hubSection: 'leveraged-quarterly',
    title: 'The Alpha Stack',
    badge: 'Coming soon',
    description: 'Return-stacked core with managed futures overlay — full breakdown in progress.',
    sourcePortfolioId: 'alpha-stack',
  },
  {
    slug: 'capital-efficient',
    region: 'us',
    kind: 'stub',
    hubSection: 'leveraged-quarterly',
    title: 'Capital Efficient Core',
    badge: 'Coming soon',
    description: 'Balanced leverage with global macro hedge — model portfolio page coming.',
    sourcePortfolioId: 'capital-efficient',
  },
  {
    slug: 'global-macro-blend',
    region: 'us',
    kind: 'stub',
    hubSection: 'leveraged-quarterly',
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
    hubSection: 'leveraged-quarterly',
    title: 'Canadian international',
    description:
      'TSX and US-listed sleeves in CAD — quarterly rebalance to target weights (first US session of each calendar quarter).',
    featured: true,
  },
  {
    slug: 'ca-core-buy-hold',
    region: 'ca',
    kind: 'live',
    hubSection: 'buy-hold',
    title: 'Canadian core (buy & hold)',
    description:
      'HEQL.TO, USSL.TO, QQQL.TO, PFLS.TO, and ZLB.TO at equal weights; no rebalancing in the model.',
    featured: true,
  },
  {
    slug: 'ca-alpha-stack',
    region: 'ca',
    kind: 'stub',
    hubSection: 'leveraged-quarterly',
    title: 'Canadian Alpha Stack',
    badge: 'Coming soon',
    description: 'TSX-listed leveraged alternatives — full model page in progress.',
    sourcePortfolioId: 'ca-alpha-stack',
  },
  {
    slug: 'ca-conservative',
    region: 'ca',
    kind: 'stub',
    hubSection: 'leveraged-quarterly',
    title: 'TSX Efficient Core',
    badge: 'Coming soon',
    description: 'Capital-efficient TSX sleeve — details coming.',
    sourcePortfolioId: 'ca-conservative',
  },
  {
    slug: 'ca-aggressive',
    region: 'ca',
    kind: 'stub',
    hubSection: 'leveraged-quarterly',
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
  'leveraged-quarterly': {
    heading: 'Leveraged — quarterly rebalance',
    blurb: 'Target weights reset on the first US trading session of each calendar quarter (after that session’s closes).',
  },
  'buy-hold': {
    heading: 'Buy & hold',
    blurb: 'Static weights in the model; no periodic rebalancing.',
  },
}

export function getPortfolioCardById(id: string) {
  return portfolios.find((p) => p.id === id)
}
