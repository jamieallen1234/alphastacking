import {
  buildBuyAndHoldSeries,
  CHART_NOTIONAL_START_USD,
  maxDrawdownPercentFromLevels,
  normalizedBenchmarkByNyDays,
  nyTradingDayKey,
  totalReturnPercent,
  totalReturnPercentFromValues,
} from '@/lib/portfolioMath'
import {
  buildNtsdMergedDailySeries,
  ntsdSyntheticOverlapFirstTradeSec,
} from '@/lib/ntsdSyntheticSeries'
import {
  HEQL_FIRST_REAL_NY_DAY,
  HEQL_SYNTHETIC_ANNUAL_DRAG,
  HEQL_SYNTHETIC_LEVERAGE,
} from '@/lib/syntheticChartConstants'
import {
  buildLeveredUnderlyingMergeSeries,
  heqlSyntheticOverlapFirstTradeSec,
  mateSyntheticOverlapFirstTradeSec,
} from '@/lib/syntheticProxyMerge'
import {
  CAD_SPY_PROXY_SYMBOL,
  convertUsdPricesToCad,
  isCadListedSymbol,
  USDCAD_YAHOO_SYMBOL,
} from '@/lib/cadUsdConversion'
import {
  clipSeriesFromTime,
  fetchDailySeries,
  fetchFirstTradeDateSec,
  type YahooRange,
} from '@/lib/yahooFinance'

export type SyntheticModelingKind = 'ntsd' | 'heql_heqt' | 'mate_rsst'

export interface SyntheticModelingNote {
  /** Ticker as in the basket (e.g. HEQL.TO, MATE). */
  slotSymbol: string
  firstRealNyDay: string
  kind: SyntheticModelingKind
}

export interface PortfolioChartPayload {
  symbols: string[]
  weights: number[]
  range: YahooRange
  timestamps: number[]
  values: number[]
  totalReturnPercent: number | null
  benchmarkSymbol: string
  benchmarkValues: number[]
  benchmarkTotalReturnPercent: number | null
  /** Max peak-to-trough drawdown on the charted window (same Yahoo `range` as the series). */
  maxDrawdownPortfolioPercent: number | null
  maxDrawdownBenchmarkPercent: number | null
  limitingSymbol: string
  limitingFirstTradeDate: string
  chartStartDate: string | null
  asOf: string | null
  /** Hypothetical pre-inception sleeves still visible in the chart window. */
  syntheticModeling: SyntheticModelingNote[]
  /**
   * When CAD, US-listed legs are converted with USDCAD; benchmark **data** is VFV.TO
   * (`benchmarkSymbol` in the payload is still labeled `SPY` for readability).
   */
  chartCurrency?: 'USD' | 'CAD'
}

const DEFAULT_BENCHMARK = 'SPY'

/**
 * Buy-and-hold portfolio vs benchmark (default SPY), inception-clipped to the newest holding’s listing.
 */
export async function computePortfolioChart(params: {
  symbols: string[]
  weights: number[]
  range: YahooRange
  /** Yahoo symbol for benchmark prices (default SPY, or VFV.TO when `cadDenominated`). */
  benchmarkSymbol?: string
  /** US-listed legs → CAD via NY-aligned USDCAD; benchmark fetch defaults to VFV.TO; payload still labels it SPY. */
  cadDenominated?: boolean
}): Promise<PortfolioChartPayload> {
  const { symbols, weights, range } = params
  const cadDenominated = params.cadDenominated ?? false
  const benchmarkFetchSymbol =
    params.benchmarkSymbol ?? (cadDenominated ? CAD_SPY_PROXY_SYMBOL : DEFAULT_BENCHMARK)
  /** CAD charts pull VFV.TO but present the line as SPY (S&P 500) to match user language. */
  const benchmarkSymbol = cadDenominated ? 'SPY' : benchmarkFetchSymbol

  if (symbols.length !== weights.length) {
    throw new Error('Symbol count must match weight count')
  }
  if (symbols.length < 2) {
    throw new Error('At least two symbols required')
  }

  const upper = symbols.map((s) => s.toUpperCase())
  const ntsdIdx = upper.indexOf('NTSD')
  const mateIdx = upper.indexOf('MATE')
  const heqlIdx = symbols.findIndex((s) => s.toUpperCase() === 'HEQL.TO')

  const firstTradeSecs = await Promise.all(
    symbols.map(async (s, i) => {
      if (ntsdIdx >= 0 && i === ntsdIdx) return ntsdSyntheticOverlapFirstTradeSec()
      if (mateIdx >= 0 && i === mateIdx) return mateSyntheticOverlapFirstTradeSec()
      if (heqlIdx >= 0 && i === heqlIdx) return heqlSyntheticOverlapFirstTradeSec()
      return fetchFirstTradeDateSec(s)
    })
  )
  const effectiveStartSec = Math.max(...firstTradeSecs)
  const limitingIdx = firstTradeSecs.indexOf(effectiveStartSec)
  const limitingSymbol = symbols[limitingIdx]!

  const needExtraSpy = ntsdIdx >= 0 && benchmarkFetchSymbol.toUpperCase() !== 'SPY'

  const [series, benchSeries, efaExtra, spyExtra, heqtExtra, rsstExtra, usdCadSeries] =
    await Promise.all([
      Promise.all(symbols.map((s) => fetchDailySeries(s, range))),
      fetchDailySeries(benchmarkFetchSymbol, range),
      ntsdIdx >= 0 ? fetchDailySeries('EFA', range) : Promise.resolve(null),
      needExtraSpy ? fetchDailySeries('SPY', range) : Promise.resolve(null),
      heqlIdx >= 0 ? fetchDailySeries('HEQT.TO', range) : Promise.resolve(null),
      mateIdx >= 0 ? fetchDailySeries('RSST', range) : Promise.resolve(null),
      cadDenominated ? fetchDailySeries(USDCAD_YAHOO_SYMBOL, range) : Promise.resolve(null),
    ])

  let seriesMut = series
  let efaMut = efaExtra
  let spyMut = spyExtra
  let rsstMut = rsstExtra

  if (cadDenominated) {
    if (usdCadSeries == null || usdCadSeries.timestamps.length < 2) {
      throw new Error('USDCAD series required for CAD-denominated chart')
    }
    seriesMut = series.map((s, i) =>
      isCadListedSymbol(symbols[i]!) ? s : convertUsdPricesToCad(s, usdCadSeries)
    )
    if (efaMut != null) efaMut = convertUsdPricesToCad(efaMut, usdCadSeries)
    if (spyMut != null) spyMut = convertUsdPricesToCad(spyMut, usdCadSeries)
    if (rsstMut != null) rsstMut = convertUsdPricesToCad(rsstMut, usdCadSeries)
  }

  const syntheticModeling: SyntheticModelingNote[] = []

  if (ntsdIdx >= 0 && efaMut != null) {
    const spyForNtsd =
      benchmarkFetchSymbol.toUpperCase() === 'SPY' ? benchSeries : spyMut!
    const { series: mergedNtsd, modeling } = buildNtsdMergedDailySeries(
      seriesMut[ntsdIdx]!,
      spyForNtsd,
      efaMut
    )
    seriesMut[ntsdIdx] = mergedNtsd
    if (modeling != null) {
      syntheticModeling.push({
        slotSymbol: symbols[ntsdIdx]!,
        firstRealNyDay: modeling.firstRealNyDay,
        kind: 'ntsd',
      })
    }
  }

  if (mateIdx >= 0 && rsstMut != null) {
    const { series: mergedMate, modeling } = buildLeveredUnderlyingMergeSeries(
      seriesMut[mateIdx]!,
      rsstMut,
      1,
      0
    )
    seriesMut[mateIdx] = mergedMate
    if (modeling != null) {
      syntheticModeling.push({
        slotSymbol: symbols[mateIdx]!,
        firstRealNyDay: modeling.firstRealNyDay,
        kind: 'mate_rsst',
      })
    }
  }

  if (heqlIdx >= 0 && heqtExtra != null) {
    const { series: mergedHeql, modeling } = buildLeveredUnderlyingMergeSeries(
      seriesMut[heqlIdx]!,
      heqtExtra,
      HEQL_SYNTHETIC_LEVERAGE,
      HEQL_SYNTHETIC_ANNUAL_DRAG,
      HEQL_FIRST_REAL_NY_DAY
    )
    seriesMut[heqlIdx] = mergedHeql
    if (modeling != null) {
      syntheticModeling.push({
        slotSymbol: symbols[heqlIdx]!,
        firstRealNyDay: modeling.firstRealNyDay,
        kind: 'heql_heqt',
      })
    }
  }

  const clipped = seriesMut.map((s) => clipSeriesFromTime(s, effectiveStartSec))
  const benchClipped = clipSeriesFromTime(benchSeries, effectiveStartSec)

  if (clipped.some((s) => s.timestamps.length < 2)) {
    throw new Error('Not enough history after the newest holding’s listing date for this range.')
  }

  const points = buildBuyAndHoldSeries(clipped, weights)
  if (points.length < 2) {
    throw new Error('Not enough overlapping sessions for this basket and range after inception.')
  }

  const tr = totalReturnPercent(points)
  const firstNy = points[0]?.nyDay
  const syntheticModelingVisible =
    firstNy == null
      ? []
      : syntheticModeling.filter((m) => firstNy < m.firstRealNyDay)

  const dayKeys = points.map((p) => p.nyDay ?? '')
  const benchmarkValues = normalizedBenchmarkByNyDays(benchClipped, dayKeys)
  if (!benchmarkValues) {
    throw new Error(`Could not align ${benchmarkFetchSymbol} benchmark to portfolio dates.`)
  }
  const benchmarkTotalReturnPercent = totalReturnPercentFromValues(benchmarkValues)

  const valueLine = points.map((p) => p.value * CHART_NOTIONAL_START_USD)
  const benchLine = benchmarkValues.map((v) => v * CHART_NOTIONAL_START_USD)
  const maxDrawdownPortfolioPercent = maxDrawdownPercentFromLevels(valueLine)
  const maxDrawdownBenchmarkPercent = maxDrawdownPercentFromLevels(benchLine)

  /** YYYY-MM-DD (NY); matches `availablePresetChartRanges` / overlap logic — not a locale display string. */
  const chartStartDate = points[0]?.nyDay ?? null
  const limitingFirstTradeDate = nyTradingDayKey(effectiveStartSec)

  return {
    symbols,
    weights,
    range,
    timestamps: points.map((p) => p.t),
    values: valueLine,
    totalReturnPercent: tr,
    benchmarkSymbol,
    benchmarkValues: benchLine,
    benchmarkTotalReturnPercent,
    maxDrawdownPortfolioPercent,
    maxDrawdownBenchmarkPercent,
    limitingSymbol,
    limitingFirstTradeDate,
    chartStartDate,
    syntheticModeling: syntheticModelingVisible,
    chartCurrency: cadDenominated ? 'CAD' : 'USD',
    asOf:
      points.length > 0
        ? new Date(points[points.length - 1]!.t * 1000).toISOString().slice(0, 10)
        : null,
  }
}
