import type { StrategyPieSlice } from '@/components/StrategyPieChart'

/**
 * 4 Alpha Quadrants slice data. Each slice pairs a shared growth-beta component
 * (the donut's center label) with a distinct alpha source.
 */
export const FOUR_ALPHA_QUADRANTS_SLICES: StrategyPieSlice[] = [
  {
    label: 'Long/short + 2× SPY',
    weightPct: 25,
    color: '#7aa6e8',
    growthComponent: '2× SPY (SSO)',
    alpha: 'long/short equity',
    environments: ['Choppy/Sideways', 'Growth'],
    description: 'Security selection and dispersion alpha, paired with leveraged S&P 500 beta.',
  },
  {
    label: 'Momentum + value',
    weightPct: 25,
    color: '#5dca8a',
    growthComponent: 'momentum factor',
    alpha: 'factor premia',
    environments: ['Growth', 'Inflation'],
    description: 'Momentum growth engine paired with a free-cash-flow value alpha sleeve.',
  },
  {
    label: 'Premia + 3× SPY',
    weightPct: 25,
    color: '#e8944a',
    growthComponent: '3× SPY (UPRO)',
    alpha: 'systematic premia / carry',
    environments: ['Choppy/Sideways', 'Inflation', 'Growth'],
    description: 'Style premia and multi-strategy alternatives, paired with high-conviction leveraged beta.',
  },
  {
    label: 'Managed futures + SPY',
    weightPct: 25,
    color: '#c9a84c',
    growthComponent: 'SPY sleeve in MATE',
    alpha: 'managed futures',
    environments: ['Inflation', 'Recession', 'Deflation', 'Growth'],
    description: 'Trend-following crisis alpha return-stacked with S&P 500 beta in a single fund.',
  },
]

/** slug → pie slices, for portfolio pages that should render a StrategyPieChart. */
export const PORTFOLIO_SLUG_TO_PIE_SLICES: Record<string, StrategyPieSlice[]> = {
  'four-alpha-quadrants': FOUR_ALPHA_QUADRANTS_SLICES,
  'ca-four-alpha-quadrants': FOUR_ALPHA_QUADRANTS_SLICES,
}
