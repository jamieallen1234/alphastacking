import { getStrategyLearnTopic } from '@/lib/strategyLearnTopics'

type StrategyGuide = {
  slug: string
  label: string
}

const GUIDE_BY_CATEGORY: Readonly<Record<string, StrategyGuide>> = {
  'premia-systematic-alternatives': { slug: 'risk-premia', label: 'risk premia' },
  factor: { slug: 'factor-investing', label: 'factor investing' },
  'factor-momentum': { slug: 'factor-investing', label: 'factor investing' },
  'factor-value': { slug: 'factor-investing', label: 'factor investing' },
  'factor-active': { slug: 'factor-investing', label: 'factor investing' },
  'managed-futures': { slug: 'managed-futures', label: 'managed futures' },
  'long-short': { slug: 'long-short-equity', label: 'long/short equity' },
  'global-macro': { slug: 'global-macro', label: 'global macro' },
  arbitrage: { slug: 'merger-arbitrage', label: 'merger arbitrage' },
  'leveraged-equity': { slug: 'leveraged-etfs', label: 'leveraged ETFs' },
}

/**
 * Funds whose return driver is more specific than their hub category. These direct
 * readers to the strategy that explains their most important non-equity sleeve.
 */
const GUIDE_BY_ETF_SLUG: Readonly<Record<string, StrategyGuide>> = {
  hold: { slug: 'managed-futures', label: 'managed futures' },
  mate: { slug: 'managed-futures', label: 'managed futures' },
  rsbt: { slug: 'managed-futures', label: 'managed futures' },
  rsst: { slug: 'managed-futures', label: 'managed futures' },
}

export function getStrategyGuideForEtf(
  etfSlug: string,
  hubCategoryId: string
): StrategyGuide | undefined {
  const guide = GUIDE_BY_ETF_SLUG[etfSlug] ?? GUIDE_BY_CATEGORY[hubCategoryId]
  return guide && getStrategyLearnTopic(guide.slug) ? guide : undefined
}
