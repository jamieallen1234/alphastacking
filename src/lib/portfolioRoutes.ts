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
    title: 'US Multi-Strategy',
    description: 'Diversified US-listed mix with intentional beta near 1.0.',
    featured: true,
  },
  {
    slug: 'us-advanced',
    region: 'us',
    kind: 'live',
    hubSection: 'annual-rebalance',
    title: 'US Alpha Stack',
    badge: 'Advanced',
    description:
      'LETF-heavy core with trend, long/short equity, alternatives, and macro sleeves — beta near 1.0.',
  },
  {
    slug: 'us-core-buy-hold',
    region: 'us',
    kind: 'live',
    hubSection: 'buy-hold',
    title: 'Growth & Value Barbell',
    description:
      'Barbell across dividend growth, global value, Nasdaq-100, and S&P momentum.',
    featured: true,
  },
  {
    slug: 'us-gde-clse-blend',
    region: 'us',
    kind: 'live',
    hubSection: 'buy-hold',
    title: 'US + Gold & Alt Blend',
    description:
      'Balanced U.S. mix across capital-efficient gold, long/short equity, merger arb, and selective growth beta.',
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
    title: 'Global Macro Blend',
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
    title: 'Global + Long/Short',
    description: 'CAD-diversified US and Canadian sleeves with intentional beta near 1.0.',
    featured: true,
  },
  {
    slug: 'ca-core-buy-hold',
    region: 'ca',
    kind: 'live',
    hubSection: 'buy-hold',
    title: 'US & Canada - Low Beta & Long/Short',
    description:
      'Levered US growth stack with Canadian low-vol equity and preferred income — modeled in CAD.',
    featured: true,
  },
  {
    slug: 'ca-ussl-qqql-hdge',
    region: 'ca',
    kind: 'live',
    hubSection: 'buy-hold',
    title: 'US + Long/Short',
    description:
      'Concentrated levered US growth with a Canadian market-neutral long/short sleeve — three positions, buy and hold.',
  },
  {
    slug: 'ca-sso-dglm-rgbm-arb',
    region: 'ca',
    kind: 'live',
    hubSection: 'annual-rebalance',
    title: 'S&P 500 + Macro Stack',
    description:
      'Concentrated U.S. leveraged beta blended with Canadian macro, return-stacked, and arbitrage diversifiers.',
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
    heading: 'Leveraged — multi-sleeve',
    blurb:
      'Leveraged equity as the core sleeve, sized alongside trend, long/short, and macro sleeves to keep total market sensitivity near 1.0. Rebalanced annually.',
  },
  'buy-hold': {
    heading: 'Buy & hold',
    blurb: 'Non-leveraged portfolios held without rebalancing — simpler construction, lower maintenance.',
  },
}

export function getPortfolioCardById(id: string) {
  return portfolios.find((p) => p.id === id)
}

/** Routes shown on portfolio hub grids (excludes coming-soon stubs and preview-only placeholders). */
export function portfolioHubRoutes(routes: PortfolioRouteDef[]) {
  return routes.filter((r) => r.kind === 'live')
}
