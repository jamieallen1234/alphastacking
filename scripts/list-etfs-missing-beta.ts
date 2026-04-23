/**
 * Lists registry ETFs where portfolio-builder beta is null (same logic as
 * `buildOptionsForUniverse` in portfolioBuilderEtfOptions.ts).
 *
 * Usage: npx tsx scripts/list-etfs-missing-beta.ts
 */
import { CA_ETF_DYNAMIC_REGISTRY, US_ETF_DYNAMIC_REGISTRY } from '../src/lib/etfDynamicRegistry'
import { computeBetaVsBenchmark, defaultBetaBenchmarkForSymbol } from '../src/lib/getCachedEtfChart'
import { fetchDailySeries, type PriceSeries } from '../src/lib/yahooFinance'

type Universe = 'us' | 'ca'

async function missingForUniverse(universe: Universe) {
  const registry = universe === 'us' ? US_ETF_DYNAMIC_REGISTRY : CA_ETF_DYNAMIC_REGISTRY
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

  const out: { universe: Universe; slug: string; yahoo: string; ticker: string; reason: string }[] = []

  for (const [slug, def] of Object.entries(registry)) {
    const benchmark = (
      def.betaBenchmarkSymbol?.trim() || defaultBetaBenchmarkForSymbol(def.yahooSymbol)
    ).toUpperCase()
    const etf1y = await fetchDailySeries(def.yahooSymbol, '1y').catch(() => null)
    const bench1y = await loadBenchmark1y(benchmark)
    let reason: string
    if (!etf1y || etf1y.timestamps.length === 0) reason = 'ETF 1y series missing'
    else if (!bench1y || bench1y.timestamps.length === 0) reason = `Benchmark ${benchmark} 1y missing`
    else {
      const beta = computeBetaVsBenchmark(etf1y, bench1y)
      if (beta != null) continue
      reason = 'Regression null (<20 aligned returns or zero benchmark variance)'
    }
    out.push({
      universe,
      slug,
      yahoo: def.yahooSymbol,
      ticker: def.displayTicker,
      reason,
    })
  }
  return out.sort((a, b) => a.ticker.localeCompare(b.ticker))
}

async function main() {
  const us = await missingForUniverse('us')
  const ca = await missingForUniverse('ca')
  const all = [...us, ...ca]

  console.log('=== US registry (missing beta) ===')
  if (us.length === 0) console.log('(none)')
  else for (const r of us) console.log(`${r.ticker.padEnd(8)} ${r.yahoo.padEnd(12)} slug=${r.slug} — ${r.reason}`)

  console.log('\n=== CA registry (missing beta) ===')
  if (ca.length === 0) console.log('(none)')
  else for (const r of ca) console.log(`${r.ticker.padEnd(8)} ${r.yahoo.padEnd(12)} slug=${r.slug} — ${r.reason}`)

  console.log(`\nTotal: ${all.length} (US ${us.length}, CA ${ca.length})`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
