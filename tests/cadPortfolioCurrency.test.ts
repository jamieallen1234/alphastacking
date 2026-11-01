import assert from 'node:assert/strict'
import test from 'node:test'
import {
  expressListingPricesInCad,
  isCadListedSymbol,
} from '@/lib/cadUsdConversion'
import { resolvePortfolioBenchmark } from '@/lib/computePortfolioChart'
import { buildNtsdMergedDailySeries } from '@/lib/ntsdSyntheticSeries'
import { PRESET_DEFINITIONS } from '@/lib/presets'
import {
  blendPriceSeriesMulti,
  buildPreInceptionProductStackMerge,
} from '@/lib/syntheticProxyMerge'
import type { PriceSeries } from '@/lib/yahooFinance'

function day(dayOfMonth: number): number {
  return Math.floor(Date.UTC(2025, 0, dayOfMonth, 17) / 1000)
}

function series(symbol: string, prices: number[], firstDay = 2): PriceSeries {
  return {
    symbol,
    timestamps: prices.map((_, i) => day(firstDay + i)),
    prices,
  }
}

function totalReturn(priceSeries: PriceSeries): number {
  const first = priceSeries.prices[0]!
  const last = priceSeries.prices.at(-1)!
  return last / first - 1
}

const risingUsdCad = series('USDCAD=X', [1, 1.03, 1.07, 1.1])

test('CAD listing detection covers TSX and Cboe Canada without adding false FX', () => {
  assert.equal(isCadListedSymbol('VFV.TO'), true)
  assert.equal(isCadListedSymbol('FINN.NE'), true)
  assert.equal(isCadListedSymbol('SPY'), false)

  const finn = series('FINN.NE', [100, 100, 100, 100])
  assert.strictEqual(expressListingPricesInCad('FINN.NE', finn, risingUsdCad), finn)
  assert.ok(
    Math.abs(totalReturn(expressListingPricesInCad('SPY', finn, risingUsdCad)) - 0.1) < 1e-12
  )
})

test('CAD benchmark resolution uses accurately labelled XSP and preserves custom benchmarks', () => {
  assert.deepEqual(resolvePortfolioBenchmark({ cadDenominated: true }), {
    benchmarkSymbol: 'XSP.TO',
    benchmarkLabel: 'XSP.TO (S&P 500 CAD-hedged)',
  })
  assert.deepEqual(
    resolvePortfolioBenchmark({ cadDenominated: true, benchmarkSymbol: 'XBB.TO' }),
    { benchmarkSymbol: 'XBB.TO', benchmarkLabel: 'XBB.TO' }
  )
  const usdBondBenchmark = resolvePortfolioBenchmark({
    cadDenominated: true,
    benchmarkSymbol: 'AGG',
  })
  assert.deepEqual(usdBondBenchmark, { benchmarkSymbol: 'AGG', benchmarkLabel: 'AGG' })
  assert.ok(
    Math.abs(
      totalReturn(
        expressListingPricesInCad(
          usdBondBenchmark.benchmarkSymbol,
          series('AGG', [100, 100, 100, 100]),
          risingUsdCad
        )
      ) - 0.1
    ) < 1e-12
  )
  assert.deepEqual(resolvePortfolioBenchmark({ cadDenominated: false }), {
    benchmarkSymbol: 'SPY',
    benchmarkLabel: 'SPY',
  })
})

test('every Canadian preset reports CAD while US presets retain USD defaults', () => {
  const canadian = PRESET_DEFINITIONS.filter((preset) => preset.region === 'ca')
  const unitedStates = PRESET_DEFINITIONS.filter((preset) => preset.region === 'us')
  assert.ok(canadian.length > 0)
  assert.ok(unitedStates.length > 0)
  assert.ok(canadian.every((preset) => preset.cadDenominated))
  assert.ok(unitedStates.every((preset) => !preset.cadDenominated))
  assert.equal(
    canadian.find((preset) => preset.benchmarkSymbol === 'XBB.TO')?.benchmarkSymbol,
    'XBB.TO'
  )
})

test('a USD 90/60 synthetic is built in USD then receives one CAD conversion', () => {
  const target = series('NTSD', [100, 100], 4)
  const flatSpy = series('SPY', [100, 100, 100, 100])
  const flatEfa = series('EFA', [100, 100, 100, 100])
  const merged = buildNtsdMergedDailySeries(target, flatSpy, flatEfa).series
  const cad = expressListingPricesInCad('NTSD', merged, risingUsdCad)
  const expectedWithOneFxConversion = (1 + totalReturn(merged)) * 1.1 - 1

  assert.ok(Math.abs(totalReturn(cad) - expectedWithOneFxConversion) < 1e-12)
  assert.ok(totalReturn(cad) < 0.11)
})

test('a two-sleeve USD stack receives one FX return, not one per sleeve', () => {
  const target = series('RSST', [100, 100], 4)
  const flatEquity = series('SPY', [100, 100, 100, 100])
  const flatManagedFutures = series('DBMF', [100, 100, 100, 100])
  const merged = buildPreInceptionProductStackMerge(
    target,
    [flatEquity, flatManagedFutures],
    { grossExposurePct: 100 }
  ).series
  const cad = expressListingPricesInCad('RSST', merged, risingUsdCad)

  assert.ok(Math.abs(totalReturn(cad) - 0.1) < 1e-12)
})

test('a mixed CAD proxy applies FX only at the USD component weight', () => {
  const cadLeg = series('XIU.TO', [100, 100])
  const usdLeg = series('SSO', [100, 100])
  const usdLegInCad = expressListingPricesInCad('SSO', usdLeg, series('USDCAD=X', [1, 1.1]))
  const blended = blendPriceSeriesMulti([
    { series: cadLeg, weight: 0.88 },
    { series: usdLegInCad, weight: 0.12 },
  ])

  assert.ok(Math.abs(totalReturn(blended) - 0.012) < 1e-12)
})
