import { unstable_cache } from 'next/cache'
import { CA_ETF_DYNAMIC_REGISTRY, US_ETF_DYNAMIC_REGISTRY } from '@/lib/etfDynamicRegistry'
import { stackExposureLineAvailability } from '@/lib/etfStackExposureBySlug'
import { mergeDynamicEtfEfficiencyWithPatch } from '@/lib/etfDynamicEfficiencyBySlug'
import { getCachedMonthlyEfficiencyPatchForSlug } from '@/lib/getCachedMonthlyEtfEfficiencyGrades'
import {
  computeBetaVsBenchmark,
  defaultBetaBenchmarkForSymbol,
} from '@/lib/getCachedEtfChart'
import { fetchDailySeries, type PriceSeries } from '@/lib/yahooFinance'

export type PortfolioBuilderEfficiencyGrade = 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D'

const LETF_SYMBOLS = new Set([
  'SSO',
  'UPRO',
  'QLD',
  'TQQQ',
  'HEQL.TO',
  'USSL.TO',
  'QQQL.TO',
])

function builderCategoryFor(def: { yahooSymbol: string; badge: string }): string {
  return LETF_SYMBOLS.has(def.yahooSymbol.toUpperCase()) ? 'LETF' : def.badge
}

export type PortfolioBuilderEtfOption = {
  slug: string
  universe: 'us' | 'ca'
  symbol: string
  displayTicker: string
  title: string
  category: string
  /** ETF page shows a Capital efficiency row (include N/A / pending compute). */
  capitalEligible: boolean
  /** ETF page shows an Alpha efficiency row. */
  alphaEligible: boolean
  /** ETF page shows a blended Stacked efficiency row (equity + alpha sleeves). */
  stackedEligible: boolean
  /** Letter grade when computed; null if line exists but grade is N/A or missing. */
  capitalGrade: PortfolioBuilderEfficiencyGrade | null
  alphaGrade: PortfolioBuilderEfficiencyGrade | null
  stackedGrade: PortfolioBuilderEfficiencyGrade | null
  /** Same 1y regression beta as the ETF detail chart (listing benchmark). */
  beta: number | null
}

function asGrade(v: string | undefined): PortfolioBuilderEfficiencyGrade | null {
  if (v === 'A+' || v === 'A' || v === 'B+' || v === 'B' || v === 'C' || v === 'D') return v
  return null
}

async function buildOptionsForUniverse(universe: 'us' | 'ca'): Promise<PortfolioBuilderEtfOption[]> {
  const registry = universe === 'us' ? US_ETF_DYNAMIC_REGISTRY : CA_ETF_DYNAMIC_REGISTRY
  /** De-dupe benchmark fetches when many tickers share SPY or XIU.TO. */
  const benchmarkLoads = new Map<string, Promise<PriceSeries | null>>()
  function loadBenchmark1y(benchmark: string): Promise<PriceSeries | null> {
    const k = benchmark.trim().toUpperCase()
    let p = benchmarkLoads.get(k)
    if (!p) {
      p = fetchDailySeries(k, '1y').catch(() => null)
      benchmarkLoads.set(k, p)
    }
    return p
  }

  const rows = await Promise.all(
    Object.entries(registry).map(async ([slug, def]) => {
      const benchmark = (
        def.betaBenchmarkSymbol?.trim() || defaultBetaBenchmarkForSymbol(def.yahooSymbol)
      ).toUpperCase()
      const [patch, etf1y, bench1y] = await Promise.all([
        getCachedMonthlyEfficiencyPatchForSlug(slug, universe).catch(() => null),
        fetchDailySeries(def.yahooSymbol, '1y').catch(() => null),
        loadBenchmark1y(benchmark),
      ])
      const beta = etf1y && bench1y ? computeBetaVsBenchmark(etf1y, bench1y) : null
      const merged = mergeDynamicEtfEfficiencyWithPatch(def, slug, universe, patch)
      const stackLines = stackExposureLineAvailability(slug)
      const stackedEligible = merged.efficiency?.stacked != null
      const capitalEligible =
        !stackedEligible && merged.efficiency?.capital != null && (!stackLines || stackLines.hasEquitySleeve)
      const alphaEligible =
        !stackedEligible && merged.efficiency?.alpha != null && (!stackLines || stackLines.hasNonEquitySleeve)
      const capitalGrade = asGrade(merged.efficiency?.capital?.grade)
      const alphaGrade = asGrade(merged.efficiency?.alpha?.grade)
      const stackedGrade = asGrade(merged.efficiency?.stacked?.grade)
      return {
        slug,
        universe,
        symbol: def.yahooSymbol,
        displayTicker: def.displayTicker,
        title: def.h1Title,
        category: stackedEligible ? 'Stacked' : builderCategoryFor(def),
        capitalEligible,
        alphaEligible,
        stackedEligible,
        capitalGrade,
        alphaGrade,
        stackedGrade,
        beta,
      } satisfies PortfolioBuilderEtfOption
    })
  )
  return rows.sort((a, b) => a.displayTicker.localeCompare(b.displayTicker))
}

const DAY = 86400

export const getCachedPortfolioBuilderOptionsUs = unstable_cache(
  async () => buildOptionsForUniverse('us'),
  ['portfolio-builder-options-v10-stacked-efficiency', 'us'],
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
  ['portfolio-builder-options-v10-stacked-efficiency', 'ca'],
  { revalidate: DAY }
)

