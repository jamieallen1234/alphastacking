import { portfolios } from '@/lib/portfolios'

export type PortfolioPageKind = 'live' | 'placeholder' | 'stub'

/** Where the card appears on the portfolios hub (US: category ids; CA: annual-rebalance / buy-hold). */
export type PortfolioHubSection =
  | 'annual-rebalance'   // CA only
  | 'buy-hold'           // CA only
  | 'multi-strat'
  | 'return-stacked'
  | 'letf-2x'
  | 'letf-3x'
  | 'factor'
  | 'trend'
  | 'risk-parity'
  | 'long-short'
  | 'retirement'

export interface PortfolioHubCategoryDef {
  id: PortfolioHubSection
  title: string
  subtitle?: string
}

export const US_PORTFOLIO_CATEGORIES: PortfolioHubCategoryDef[] = [
  { id: 'multi-strat', title: 'Multi-Strat', subtitle: 'Diversified multi-sleeve models balanced across strategies.' },
  { id: 'return-stacked', title: 'Return Stacked', subtitle: 'Capital-efficient sleeves that add alpha without reducing equity exposure.' },
  { id: 'letf-2x', title: 'LETF 2x', subtitle: '2x leveraged equity core paired with offsetting alternatives.' },
  { id: 'letf-3x', title: 'LETF 3x', subtitle: '3x leveraged equity core — advanced portfolios with amplified risk and return.' },
  { id: 'factor', title: 'Factor', subtitle: 'Equity factor portfolios — momentum, value, and quality.' },
  { id: 'trend', title: 'Trend / CTA', subtitle: 'Managed futures and systematic alternatives as the primary alpha engine.' },
  { id: 'risk-parity', title: 'Risk Parity', subtitle: 'All-weather diversification across equity, bonds, and real assets.' },
  { id: 'long-short', title: 'Long/Short', subtitle: 'Net-long long/short equity across US and global markets.' },
  { id: 'retirement', title: 'Retirement', subtitle: 'Low-beta bond alternatives for capital preservation.' },
]

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
  /** Weighted beta of the preset holdings — used for grade computation on hub cards. */
  weightedBeta?: number
  /** Rebalance cadence — used to render subsection labels within a category. */
  rebalance?: 'annual' | 'none'
}

/** Curated routes for US (`/portfolios/...`) */
export const usPortfolioRoutes: PortfolioRouteDef[] = [
  {
    slug: 'us-international',
    region: 'us',
    kind: 'live',
    hubSection: 'multi-strat',
    rebalance: 'annual',
    title: 'US Multi-Strategy',
    description: 'Diversified US-listed mix with intentional beta near 1.0.',
    featured: true,
    addedAt: '2026-04-15',
    weightedBeta: 1.0,
  },
  {
    slug: 'us-advanced',
    region: 'us',
    kind: 'live',
    hubSection: 'multi-strat',
    rebalance: 'annual',
    title: 'US Alpha Stack',
    badge: 'Advanced',
    description:
      'LETF-heavy core with trend, long/short equity, alternatives, and macro sleeves — beta near 1.0.',
    addedAt: '2026-04-20',
    weightedBeta: 1.009,
  },
  {
    slug: 'us-core-buy-hold',
    region: 'us',
    kind: 'live',
    hubSection: 'factor',
    rebalance: 'none',
    title: 'Factor - Momentum & Value Barbell',
    badge: 'Unleveraged',
    description: 'Equity factor sleeves across momentum, free-cash-flow value, and Nasdaq-100 growth, buffered by a long/short equity allocation.',
    featured: true,
    addedAt: '2026-04-15',
    weightedBeta: 0.915,
  },
  {
    slug: 'us-gde-clse-blend',
    region: 'us',
    kind: 'live',
    hubSection: 'multi-strat',
    rebalance: 'none',
    title: 'US + Gold & Alt Blend',
    description:
      'Gold-plus-equity core with long/short equity, S&P 500 leverage, style premia, free-cash-flow tilt, and S&P momentum.',
    addedAt: '2026-04-25',
    weightedBeta: 0.928,
  },
  {
    slug: 'leveraged-premia',
    region: 'us',
    kind: 'placeholder',
    hubSection: 'letf-3x',
    rebalance: 'annual',
    title: 'Leveraged Premia',
    badge: 'Aggressive',
    description: 'UPRO + SSO + MATE. High-octane LETF core with return-stacked alts.',
    sourcePortfolioId: 'leveraged-premia',
    addedAt: '2026-04-15',
  },
  {
    slug: 'alpha-stack',
    region: 'us',
    kind: 'live',
    hubSection: 'trend',
    rebalance: 'annual',
    title: 'Trend - CTA / Managed Futures',
    description: 'Managed futures and systematic alternatives as the primary alpha engine, anchored by S&P momentum equity.',
    addedAt: '2026-05-23',
    weightedBeta: 0.963,
  },
  {
    slug: 'upro-premia-stack',
    region: 'us',
    kind: 'live',
    hubSection: 'letf-3x',
    rebalance: 'annual',
    title: 'UPRO Premia Stack',
    badge: 'Advanced',
    description: '3x S&P 500 core paired with systematic long/short equity and EM currency carry premia.',
    addedAt: '2026-05-23',
    weightedBeta: 1.037,
  },
  {
    slug: '5-4-3-2-1',
    region: 'us',
    kind: 'live',
    hubSection: 'return-stacked',
    rebalance: 'none',
    title: 'Return Stacked - 5:4:3:2:1',
    description: 'Five return-stacked ETFs mapped one-to-one to macro regimes: Growth, Inflation, Recession, Mean-reversion, and Deflation.',
    addedAt: '2026-05-23',
    weightedBeta: 0.838,
  },
  {
    slug: 'letf-stack-2x',
    region: 'us',
    kind: 'live',
    hubSection: 'letf-2x',
    rebalance: 'annual',
    title: 'LETF Stack - 2x',
    description: '2x S&P 500 leveraged core paired with long-duration Treasuries, managed futures trend-following, and gold for cross-regime balance.',
    addedAt: '2026-05-24',
    weightedBeta: 1.063,
  },
  {
    slug: 'letf-stack-3x',
    region: 'us',
    kind: 'live',
    hubSection: 'letf-3x',
    rebalance: 'annual',
    title: 'LETF Stack - 3x',
    badge: 'Advanced',
    description: '3x S&P 500 leveraged core, advanced, paired with long-duration Treasuries, managed futures trend-following, and gold for cross-regime balance.',
    addedAt: '2026-05-24',
    weightedBeta: 1.15,
  },
  {
    slug: 'long-short-equity',
    region: 'us',
    kind: 'live',
    hubSection: 'long-short',
    rebalance: 'none',
    title: 'Long/Short Equity',
    description: 'Net-long long/short equity across US and global markets, paired with capital-efficient international equity overlay and cross-asset diversifiers in managed futures, commodities, and currencies.',
    addedAt: '2026-05-24',
    weightedBeta: 0.818,
  },
  {
    slug: 'risk-parity',
    region: 'us',
    kind: 'live',
    hubSection: 'risk-parity',
    rebalance: 'none',
    title: 'Risk Parity - All Weather',
    description: 'Equity-heavy all-weather with ~90% equity notional (66% US large-cap, 24% developed international), ~36% bonds (Treasuries, TIPS, long-duration zeros), and ~26% gold via return-stacked capital-efficient wrappers.',
    addedAt: '2026-05-24',
    weightedBeta: 0.946,
  },
  {
    slug: 'four-alpha-quadrants',
    region: 'us',
    kind: 'live',
    hubSection: 'multi-strat',
    rebalance: 'annual',
    title: 'Alpha Quadrants',
    badge: 'Advanced',
    description: 'Advanced four-sleeve model, each pairing a shared growth-beta engine with a distinct alpha source: long/short equity, factor premia, systematic premia, and managed futures.',
    addedAt: '2026-06-14',
    weightedBeta: 0.99,
  },
  {
    slug: 'us-bond-alternative',
    region: 'us',
    kind: 'live',
    hubSection: 'retirement',
    rebalance: 'none',
    title: 'Bond Alternative',
    description: 'Five low-beta, non-equity-directional strategies built to outrun the aggregate bond index without equity-level risk.',
    addedAt: '2026-08-14',
    weightedBeta: 0.088,
  },
  {
    slug: 'us-sixty-forty',
    region: 'us',
    kind: 'live',
    hubSection: 'retirement',
    rebalance: 'none',
    title: '60/40 Alpha Stack',
    description: 'Unleveraged equity paired with long/short and trend diversifiers, built for lower drawdown than a traditional 60/40 without giving up return.',
    addedAt: '2026-08-16',
    weightedBeta: 0.497,
  },
]

/** Curated routes for Canada (`/ca/portfolios/...`) */
export const caPortfolioRoutes: PortfolioRouteDef[] = [
  {
    slug: 'ca-international',
    region: 'ca',
    kind: 'live',
    hubSection: 'multi-strat',
    rebalance: 'annual',
    title: 'Global + Long/Short',
    description: 'CAD-diversified US and Canadian sleeves with intentional beta near 1.0.',
    featured: true,
    addedAt: '2026-04-15',
    weightedBeta: 1.010,
  },
  {
    slug: 'ca-core-buy-hold',
    region: 'ca',
    kind: 'live',
    hubSection: 'multi-strat',
    rebalance: 'none',
    title: 'US & Canada - Low Beta & Long/Short',
    description:
      'Levered US growth stack with Canadian low-vol equity and preferred income.',
    featured: true,
    addedAt: '2026-04-15',
    weightedBeta: 1.011,
  },
  {
    slug: 'ca-factor-fcmo',
    region: 'ca',
    kind: 'live',
    hubSection: 'factor',
    rebalance: 'none',
    title: 'Factor - Momentum & Value',
    description: 'Canadian-listed momentum and Nasdaq growth paired with US small-cap value — 60% growth, 40% value, buy and hold.',
    addedAt: '2026-05-25',
    weightedBeta: 0.92,
  },
  {
    slug: 'ca-ussl-qqql-hdge',
    region: 'ca',
    kind: 'live',
    hubSection: 'long-short',
    rebalance: 'none',
    title: 'US + Long/Short',
    description:
      'Concentrated levered US growth with a Canadian market-neutral long/short sleeve — three positions, buy and hold.',
    addedAt: '2026-04-15',
    weightedBeta: 1.090,
  },
  {
    slug: 'ca-sso-dglm-rgbm-arb',
    region: 'ca',
    kind: 'live',
    hubSection: 'multi-strat',
    rebalance: 'annual',
    title: 'S&P 500 + Macro Stack',
    description:
      'Concentrated U.S. leveraged beta blended with Canadian macro, return-stacked, and arbitrage diversifiers.',
    addedAt: '2026-04-25',
    weightedBeta: 1.093,
  },
  {
    slug: 'ca-alpha-stack',
    region: 'ca',
    kind: 'live',
    hubSection: 'multi-strat',
    rebalance: 'none',
    title: 'Canadian Alpha Stack',
    description: 'Leveraged S&P 500 and Nasdaq core with managed futures and market-neutral sleeves.',
    addedAt: '2026-05-23',
    weightedBeta: 0.957,
  },
  {
    slug: 'ca-aggressive',
    region: 'ca',
    kind: 'stub',
    hubSection: 'multi-strat',
    rebalance: 'annual',
    title: 'Leveraged TSX',
    badge: 'Coming soon',
    description: 'High-conviction Canadian leveraged sleeve, details coming.',
    sourcePortfolioId: 'ca-aggressive',
    addedAt: '2026-04-15',
  },
  {
    slug: 'ca-four-alpha-quadrants',
    region: 'ca',
    kind: 'live',
    hubSection: 'multi-strat',
    rebalance: 'annual',
    title: 'Alpha Quadrants',
    badge: 'Advanced',
    description: 'Advanced four-sleeve model, each pairing a shared growth-beta engine with a distinct alpha source: long/short equity, factor premia, systematic premia, and managed futures.',
    addedAt: '2026-06-14',
    weightedBeta: 0.99,
  },
  {
    slug: 'ca-bond-alternative',
    region: 'ca',
    kind: 'live',
    hubSection: 'retirement',
    rebalance: 'none',
    title: 'Bond Alternative',
    description: 'Five low-beta, non-equity-directional strategies built to outrun the aggregate bond index without equity-level risk.',
    addedAt: '2026-08-14',
    weightedBeta: 0.107,
  },
  {
    slug: 'ca-sixty-forty',
    region: 'ca',
    kind: 'live',
    hubSection: 'retirement',
    rebalance: 'none',
    title: '60/40 Alpha Stack',
    description: 'Unleveraged equity paired with long/short and trend diversifiers, built for lower drawdown than a traditional 60/40 without giving up return.',
    addedAt: '2026-08-16',
    weightedBeta: 0.465,
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
  'multi-strat': {
    heading: 'Multi-Strat',
    blurb: 'Diversified multi-sleeve models balanced across strategies.',
  },
  'return-stacked': {
    heading: 'Return Stacked',
    blurb: 'Capital-efficient sleeves that add alpha without reducing equity exposure.',
  },
  'letf-2x': {
    heading: 'LETF 2x',
    blurb: '2x leveraged equity core paired with offsetting alternatives.',
  },
  'letf-3x': {
    heading: 'LETF 3x',
    blurb: '3x leveraged equity core — advanced portfolios with amplified risk and return.',
  },
  'factor': {
    heading: 'Factor',
    blurb: 'Equity factor portfolios — momentum, value, and quality.',
  },
  'trend': {
    heading: 'Trend / CTA',
    blurb: 'Managed futures and systematic alternatives as the primary alpha engine.',
  },
  'risk-parity': {
    heading: 'Risk Parity',
    blurb: 'All-weather diversification across equity, bonds, and real assets.',
  },
  'long-short': {
    heading: 'Long/Short',
    blurb: 'Net-long long/short equity across US and global markets.',
  },
  'retirement': {
    heading: 'Retirement',
    blurb: 'Low-beta bond alternatives for capital preservation.',
  },
}

export function getPortfolioCardById(id: string) {
  return portfolios.find((p) => p.id === id)
}

/** Routes shown on portfolio hub grids (excludes coming-soon stubs and preview-only placeholders). */
export function portfolioHubRoutes(routes: PortfolioRouteDef[]) {
  return routes.filter((r) => r.kind === 'live')
}
