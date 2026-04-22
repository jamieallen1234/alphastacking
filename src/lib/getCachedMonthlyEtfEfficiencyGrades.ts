import { unstable_cache } from 'next/cache'
import {
  CA_ETF_DYNAMIC_REGISTRY,
  US_ETF_DYNAMIC_REGISTRY,
} from '@/lib/etfDynamicRegistry'
import {
  CA_ETF_DYNAMIC_EFFICIENCY,
  US_ETF_DYNAMIC_EFFICIENCY,
} from '@/lib/etfDynamicEfficiencyBySlug'
import { efficiencyMonthKeyNy } from '@/lib/etfEfficiencyMonthKey'
import {
  computeMonthlyEfficiencyPatchForSlug,
  type MonthlyEfficiencyGradePatch,
} from '@/lib/etfEfficiencyGradesCompute'
import { fetchDailySeries } from '@/lib/yahooFinance'

const DAY = 86400
/** ~29d safety revalidate; primary invalidation is the month key changing on NY month rollover. */
const MONTHLY_EFFICIENCY_REVALIDATE_SEC = 29 * DAY

const slugLoaderByKey = new Map<string, () => Promise<MonthlyEfficiencyGradePatch | null>>()

function pruneSlugLoaders(currentMonthKey: string) {
  for (const k of slugLoaderByKey.keys()) {
    if (!k.startsWith(`${currentMonthKey}:`)) slugLoaderByKey.delete(k)
  }
}

/**
 * Monthly Yahoo-based grade patch for **one** ETF page. Cached per (NY month, universe, slug).
 * Avoids loading all tickers on every detail view (that was ~15s+ with sequential Yahoo pacing).
 */
export async function getCachedMonthlyEfficiencyPatchForSlug(
  slug: string,
  universe: 'us' | 'ca'
): Promise<MonthlyEfficiencyGradePatch | null> {
  const monthKey = efficiencyMonthKeyNy()
  pruneSlugLoaders(monthKey)

  const registry = universe === 'us' ? US_ETF_DYNAMIC_REGISTRY : CA_ETF_DYNAMIC_REGISTRY
  const def = registry[slug]
  if (!def) return null

  const staticEff =
    def.efficiency ??
    (universe === 'us'
      ? US_ETF_DYNAMIC_EFFICIENCY[slug as keyof typeof US_ETF_DYNAMIC_EFFICIENCY]
      : CA_ETF_DYNAMIC_EFFICIENCY[slug as keyof typeof CA_ETF_DYNAMIC_EFFICIENCY]) ??
    undefined

  const cacheKey = `${monthKey}:${universe}:${slug}`
  let loader = slugLoaderByKey.get(cacheKey)
  if (!loader) {
    loader = unstable_cache(
      async () => {
        const spy5y = await fetchDailySeries('SPY', '5y')
        const rf5y = await fetchDailySeries('^IRX', '5y')
        return computeMonthlyEfficiencyPatchForSlug(def, staticEff, spy5y, rf5y, slug)
      },
      ['etf-efficiency-monthly-per-slug-v20-explicit-sleeve-map', monthKey, universe, slug],
      { revalidate: MONTHLY_EFFICIENCY_REVALIDATE_SEC }
    )
    slugLoaderByKey.set(cacheKey, loader)
  }

  return loader()
}
