import { computeMonthlyEfficiencyPatchForSlug } from '@/lib/etfEfficiencyGradesCompute'
import { US_ETF_DYNAMIC_REGISTRY, CA_ETF_DYNAMIC_REGISTRY } from '@/lib/etfDynamicRegistry'
import { US_ETF_DYNAMIC_EFFICIENCY, CA_ETF_DYNAMIC_EFFICIENCY } from '@/lib/etfDynamicEfficiencyBySlug'
import { fetchDailySeries } from '@/lib/yahooFinance'

/** One-off script: dumps current live efficiency grades for every US + CA ETF to stdout as JSON. Not part of the app build. */
async function main() {
  const spy5y = await fetchDailySeries('SPY', '5y')
  const rf5y = await fetchDailySeries('^IRX', '5y')

  const results: Record<string, unknown> = {}

  for (const [universe, registry, effTable] of [
    ['us', US_ETF_DYNAMIC_REGISTRY, US_ETF_DYNAMIC_EFFICIENCY],
    ['ca', CA_ETF_DYNAMIC_REGISTRY, CA_ETF_DYNAMIC_EFFICIENCY],
  ] as const) {
    for (const slug of Object.keys(registry)) {
      const def = registry[slug]
      const staticEff = def.efficiency ?? (effTable as Record<string, unknown>)[slug] ?? undefined
      try {
        const patch = await computeMonthlyEfficiencyPatchForSlug(def, staticEff as never, spy5y, rf5y, slug)
        results[`${universe}:${slug}`] = patch
        console.error(`OK ${universe}:${slug}`, JSON.stringify(patch))
      } catch (e) {
        results[`${universe}:${slug}`] = { error: (e as Error).message }
        console.error(`ERR ${universe}:${slug}`, (e as Error).message)
      }
    }
  }

  console.log(JSON.stringify(results, null, 2))
}

main().catch((e) => {
  console.error('FATAL', e)
  process.exit(1)
})
