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
  /** ISO date (YYYY-MM-DD) the route + preset first went live on alphastacking.co — drives the /updates page. */
  addedAt?: string
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
    addedAt: '2026-04-15',
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
    addedAt: '2026-04-20',
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
    addedAt: '2026-04-15',
  },
  {
    slug: 'us-gde-clse-blend',
    region: 'us',
    kind: 'live',
    hubSection: 'buy-hold',
    title: 'US + Gold & Alt Blend',
    description:
      'Gold-plus-equity core with long/short equity, S&P 500 leverage, style premia, free-cash-flow tilt, and S&P momentum.',
    addedAt: '2026-04-25',
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
    addedAt: '2026-04-15',
  },
  {
    slug: 'alpha-stack',
    region: 'us',
    kind: 'live',
    hubSection: 'annual-rebalance',
    title: 'US Efficient Core',
    description: 'S&P 500 momentum core with leveraged equity, managed futures, systematic alternatives, futures yield, and free-cash-flow quality.',
    addedAt: '2026-05-23',
  },
  {
    slug: 'upro-premia-stack',
    region: 'us',
    kind: 'live',
    hubSection: 'annual-rebalance',
    title: 'UPRO Premia Stack',
    badge: 'Advanced',
    description: '3x S&P 500 core paired with systematic long/short equity and EM currency carry premia.',
    addedAt: '2026-05-23',
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
    addedAt: '2026-04-15',
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
    addedAt: '2026-04-15',
  },
  {
    slug: 'ca-ussl-qqql-hdge',
    region: 'ca',
    kind: 'live',
    hubSection: 'buy-hold',
    title: 'US + Long/Short',
    description:
      'Concentrated levered US growth with a Canadian market-neutral long/short sleeve — three positions, buy and hold.',
    addedAt: '2026-04-15',
  },
  {
    slug: 'ca-sso-dglm-rgbm-arb',
    region: 'ca',
    kind: 'live',
    hubSection: 'annual-rebalance',
    title: 'S&P 500 + Macro Stack',
    description:
      'Concentrated U.S. leveraged beta blended with Canadian macro, return-stacked, and arbitrage diversifiers.',
    addedAt: '2026-04-25',
  },
  {
    slug: 'ca-alpha-stack',
    region: 'ca',
    kind: 'live',
    hubSection: 'annual-rebalance',
    title: 'Canadian Alpha Stack',
    description: 'Leveraged S&P 500 and Nasdaq core with managed futures and market-neutral sleeves.',
    addedAt: '2026-05-23',
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
    addedAt: '2026-04-15',
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
