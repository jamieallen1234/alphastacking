import { unstable_cache } from 'next/cache'
import { CA_ETF_DYNAMIC_REGISTRY, US_ETF_DYNAMIC_REGISTRY } from '@/lib/etfDynamicRegistry'
import { stackExposureLineAvailability } from '@/lib/etfStackExposureBySlug'
import { mergeDynamicEtfEfficiencyWithPatch } from '@/lib/etfDynamicEfficiencyBySlug'
import { getCachedMonthlyEfficiencyPatchForSlug } from '@/lib/getCachedMonthlyEtfEfficiencyGrades'

export type PortfolioBuilderEfficiencyGrade = 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D'

export type PortfolioBuilderEtfOption = {
  slug: string
  universe: 'us' | 'ca'
  symbol: string
  displayTicker: string
  title: string
  /** ETF page shows a Capital efficiency row (include N/A / pending compute). */
  capitalEligible: boolean
  /** ETF page shows an Alpha efficiency row. */
  alphaEligible: boolean
  /** Letter grade when computed; null if line exists but grade is N/A or missing. */
  capitalGrade: PortfolioBuilderEfficiencyGrade | null
  alphaGrade: PortfolioBuilderEfficiencyGrade | null
}

function asGrade(v: string | undefined): PortfolioBuilderEfficiencyGrade | null {
  if (v === 'A+' || v === 'A' || v === 'B+' || v === 'B' || v === 'C' || v === 'D') return v
  return null
}

async function buildOptionsForUniverse(universe: 'us' | 'ca'): Promise<PortfolioBuilderEtfOption[]> {
  const registry = universe === 'us' ? US_ETF_DYNAMIC_REGISTRY : CA_ETF_DYNAMIC_REGISTRY

  const rows = await Promise.all(
    Object.entries(registry).map(async ([slug, def]) => {
      const patch = await getCachedMonthlyEfficiencyPatchForSlug(slug, universe).catch(() => null)
      const merged = mergeDynamicEtfEfficiencyWithPatch(def, slug, universe, patch)
      const stackLines = stackExposureLineAvailability(slug)
      const capitalEligible =
        merged.efficiency?.capital != null && (!stackLines || stackLines.hasEquitySleeve)
      const alphaEligible =
        merged.efficiency?.alpha != null && (!stackLines || stackLines.hasNonEquitySleeve)
      const capitalGrade = asGrade(merged.efficiency?.capital?.grade)
      const alphaGrade = asGrade(merged.efficiency?.alpha?.grade)
      return {
        slug,
        universe,
        symbol: def.yahooSymbol,
        displayTicker: def.displayTicker,
        title: def.h1Title,
        capitalEligible,
        alphaEligible,
        capitalGrade,
        alphaGrade,
      } satisfies PortfolioBuilderEtfOption
    })
  )
  return rows.sort((a, b) => a.displayTicker.localeCompare(b.displayTicker))
}

const DAY = 86400

export const getCachedPortfolioBuilderOptionsUs = unstable_cache(
  async () => buildOptionsForUniverse('us'),
  ['portfolio-builder-options-v5-efficiency-step-b-plus-cap', 'us'],
  { revalidate: DAY }
)

export const getCachedPortfolioBuilderOptionsCa = unstable_cache(
  async () => {
    const [ca, us] = await Promise.all([
      buildOptionsForUniverse('ca'),
      buildOptionsForUniverse('us'),
    ])
    return [...ca, ...us].sort((a, b) => a.displayTicker.localeCompare(b.displayTicker))
  },
  ['portfolio-builder-options-v5-efficiency-step-b-plus-cap', 'ca'],
  { revalidate: DAY }
)

