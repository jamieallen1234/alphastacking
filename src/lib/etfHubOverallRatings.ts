import { unstable_cache } from 'next/cache'
import { CA_ETF_DYNAMIC_REGISTRY, US_ETF_DYNAMIC_REGISTRY } from '@/lib/etfDynamicRegistry'
import { mergeDynamicEtfEfficiencyWithPatch } from '@/lib/etfDynamicEfficiencyBySlug'
import { getCachedMonthlyEfficiencyPatchForSlug } from '@/lib/getCachedMonthlyEtfEfficiencyGrades'
import { stackExposureLineAvailability } from '@/lib/etfStackExposureBySlug'
import type { PortfolioLetterGrade } from '@/lib/portfolioHubGrade'

/** Slug -> single overall efficiency letter grade (null when no live grade yet). */
export type EtfHubOverallRatings = Record<string, PortfolioLetterGrade | null>

function asGrade(v: string | null | undefined): PortfolioLetterGrade | null {
  if (v === 'A+' || v === 'A' || v === 'B+' || v === 'B' || v === 'C' || v === 'D') return v
  return null
}

/**
 * Overall rating = the ETF's primary efficiency grade, matching what the detail page features:
 * stacked (blended equity+alpha) if present, else capital (equity), else alpha.
 * Same selection priority as the portfolio builder's `buildOptionsForUniverse`.
 */
async function buildRatingsForUniverse(universe: 'us' | 'ca'): Promise<EtfHubOverallRatings> {
  const registry = universe === 'us' ? US_ETF_DYNAMIC_REGISTRY : CA_ETF_DYNAMIC_REGISTRY
  const entries = await Promise.all(
    Object.entries(registry).map(async ([slug, def]) => {
      const patch = await getCachedMonthlyEfficiencyPatchForSlug(slug, universe).catch(() => null)
      const merged = mergeDynamicEtfEfficiencyWithPatch(def, slug, universe, patch)
      const eff = merged.efficiency
      const stackLines = stackExposureLineAvailability(slug)

      const stacked = asGrade(eff?.stacked?.grade)
      const capital =
        !stackLines || stackLines.hasEquitySleeve ? asGrade(eff?.capital?.grade) : null
      const alpha = asGrade(eff?.alpha?.grade)

      const overall = stacked ?? capital ?? alpha
      return [slug, overall] as const
    })
  )
  return Object.fromEntries(entries)
}

const DAY = 86400

const getCachedRatingsUs = unstable_cache(
  async () => buildRatingsForUniverse('us'),
  ['etf-hub-overall-ratings-v1', 'us'],
  { revalidate: DAY }
)

const getCachedRatingsCa = unstable_cache(
  async () => buildRatingsForUniverse('ca'),
  ['etf-hub-overall-ratings-v1', 'ca'],
  { revalidate: DAY }
)

/**
 * Ratings lookup for a hub listing. US listing needs only US slugs; CA listing merges
 * US-listed rows into collapsed categories, so combine both universes (CA wins on key clash).
 */
export async function getEtfHubOverallRatings(
  listing: 'us' | 'ca'
): Promise<EtfHubOverallRatings> {
  if (listing === 'us') return getCachedRatingsUs()
  const [ca, us] = await Promise.all([getCachedRatingsCa(), getCachedRatingsUs()])
  return { ...us, ...ca }
}
