import {
  buildAnnuallyRebalancedSeries,
  buildBuyAndHoldSeries,
  buildQuarterlyRebalancedSeries,
  CHART_NOTIONAL_START_USD,
  maxDrawdownPercentFromLevels,
  normalizedBenchmarkByNyDays,
  nyTradingDayKey,
  perHoldingTotalReturnPercentsAligned,
  seriesToNyDayPriceMap,
  totalReturnPercent,
  totalReturnPercentFromValues,
} from '@/lib/portfolioMath'
import { buildIaltMergedDailySeries, ialtSyntheticOverlapFirstTradeSec } from '@/lib/ialtSyntheticSeries'
import {
  buildNtsdMergedDailySeries,
  ntsdSyntheticOverlapFirstTradeSec,
} from '@/lib/ntsdSyntheticSeries'
import {
  HEQL_FIRST_REAL_NY_DAY,
  HEQL_SYNTHETIC_ANNUAL_DRAG,
  HEQL_SYNTHETIC_LEVERAGE,
  HFGM_ASGM_SYNTHETIC_ANNUAL_DRAG,
  QQQL_FIRST_REAL_NY_DAY,
  USSL_FIRST_REAL_NY_DAY,
} from '@/lib/syntheticChartConstants'
import {
  buildLeveredUnderlyingMergeSeries,
  heqlSyntheticOverlapFirstTradeSec,
  hfgmSyntheticOverlapFirstTradeSec,
  mateSyntheticOverlapFirstTradeSec,
  qqqlSyntheticOverlapFirstTradeSec,
  usslSyntheticOverlapFirstTradeSec,
} from '@/lib/syntheticProxyMerge'
import {
  CAD_SPY_PROXY_SYMBOL,
  CAD_UNHEDGED_SP500_PROXY_SYMBOL,
  convertUsdPricesToCad,
  isCadListedSymbol,
  USDCAD_YAHOO_SYMBOL,
} from '@/lib/cadUsdConversion'
import {
  clipSeriesFromTime,
  fetchDailySeries,
  fetchFirstTradeDateSec,
  runWithYahooGaps,
  type PriceSeries,
  type YahooRange,
} from '@/lib/yahooFinance'

export type SyntheticModelingKind =
  | 'ntsd'
  | 'cad_levered_125'
  | 'mate_rsst'
  | 'ialt_flsp_dbmf'
  | 'hfgm_asgm'
  | 'dglm_dbmf'

export interface SyntheticModelingNote {
  /** Ticker as in the basket (e.g. HEQL.TO, MATE). */
  slotSymbol: string
  firstRealNyDay: string
  kind: SyntheticModelingKind
  /** 1.25× CAD levered sleeve: which index TR is scaled (QQQ is converted to CAD in the pipeline). */
  cadLeveredUnderlying?: 'HEQT.TO' | 'QQQ' | 'VFV.TO' | 'SPY'
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
  /** Portfolio total return minus benchmark over the charted window (same dates). */
  excessAlphaPercent: number | null
  /** Max peak-to-trough drawdown on the charted window (same Yahoo `range` as the series). */
  maxDrawdownPortfolioPercent: number | null
  maxDrawdownBenchmarkPercent: number | null
  limitingSymbol: string
  limitingFirstTradeDate: string
  chartStartDate: string | null
  asOf: string | null
  /** Synthetic sleeves used in this basket (footnotes; may be outside the selected range window). */
  syntheticModeling: SyntheticModelingNote[]
  /**
   * When CAD, US-listed legs are converted with USDCAD; benchmark **data** is `CAD_SPY_PROXY_SYMBOL`
   * (XSP.TO, CAD-hedged S&P 500; `benchmarkSymbol` in the payload stays `SPY` for readability).
   */
  chartCurrency?: 'USD' | 'CAD'
  /**
   * `quarterly`: weights reset on the first session of each calendar quarter (after that day’s returns).
   * `annual`: weights reset on the first session of each calendar year (after that day’s returns).
   */
  rebalanceSchedule: 'none' | 'quarterly' | 'annual'
  /** Each holding’s buy-and-hold TR % over the same common NY days as the chart (merged/synthetic series per symbol). */
  holdingTotalReturnPercents: { symbol: string; totalReturnPercent: number | null }[]
}

const DEFAULT_BENCHMARK = 'SPY'

/**
 * Buy-and-hold portfolio vs benchmark (default SPY), inception-clipped to the newest holding’s listing.
 */
export async function computePortfolioChart(params: {
  symbols: string[]
  weights: number[]
  range: YahooRange
  /** Yahoo symbol for benchmark prices (default SPY, or `CAD_SPY_PROXY_SYMBOL` when `cadDenominated`). */
  benchmarkSymbol?: string
  /** US-listed legs → CAD via NY-aligned USDCAD; benchmark fetch defaults to XSP.TO; payload still labels it SPY. */
  cadDenominated?: boolean
  rebalanceSchedule?: 'none' | 'quarterly' | 'annual'
}): Promise<PortfolioChartPayload> {
  const { symbols, weights, range } = params
  const rebalanceSchedule = params.rebalanceSchedule ?? 'none'
  const cadDenominated = params.cadDenominated ?? false
  const benchmarkFetchSymbol =
    params.benchmarkSymbol ?? (cadDenominated ? CAD_SPY_PROXY_SYMBOL : DEFAULT_BENCHMARK)
  /** CAD charts pull XSP.TO (hedged) but present the line as SPY (S&P 500) to match user language. */
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
  const ialtIdx = upper.indexOf('IALT')
  const flspIdx = upper.indexOf('FLSP')
  const dbmfIdx = upper.indexOf('DBMF')
  const hfgmIdx = upper.indexOf('HFGM')
  const asgmIdx = upper.indexOf('ASGM')
  const dglmIdx = upper.indexOf('DGLM.TO')
  const needIaltFlspProxy = ialtIdx >= 0 && flspIdx < 0
  const needIaltDbmfProxy = ialtIdx >= 0 && dbmfIdx < 0
  const needDglmDbmfProxy = dglmIdx >= 0 && dbmfIdx < 0
  const needHfgmAsgmProxy = hfgmIdx >= 0 && asgmIdx < 0
  const heqlIdx = symbols.findIndex((s) => s.toUpperCase() === 'HEQL.TO')
  const usslIdx = symbols.findIndex((s) => s.toUpperCase() === 'USSL.TO')
  const qqqlIdx = symbols.findIndex((s) => s.toUpperCase() === 'QQQL.TO')

  const firstTradeSecs = await runWithYahooGaps(
    symbols.map(
      (s, i) => () =>
        ntsdIdx >= 0 && i === ntsdIdx
          ? ntsdSyntheticOverlapFirstTradeSec()
          : mateIdx >= 0 && i === mateIdx
            ? mateSyntheticOverlapFirstTradeSec()
            : ialtIdx >= 0 && i === ialtIdx
              ? ialtSyntheticOverlapFirstTradeSec()
              : hfgmIdx >= 0 && i === hfgmIdx
                ? hfgmSyntheticOverlapFirstTradeSec()
                : dglmIdx >= 0 && i === dglmIdx
                  ? fetchFirstTradeDateSec('DBMF')
                : heqlIdx >= 0 && i === heqlIdx
                  ? heqlSyntheticOverlapFirstTradeSec()
                  : usslIdx >= 0 && i === usslIdx
                    ? usslSyntheticOverlapFirstTradeSec(cadDenominated)
                    : qqqlIdx >= 0 && i === qqqlIdx
                      ? qqqlSyntheticOverlapFirstTradeSec()
                      : fetchFirstTradeDateSec(s)
    )
  )
  const effectiveStartSec = Math.max(...firstTradeSecs)
  const limitingIdx = firstTradeSecs.indexOf(effectiveStartSec)
  const limitingSymbol = symbols[limitingIdx]!

  const needExtraSpy = ntsdIdx >= 0 && benchmarkFetchSymbol.toUpperCase() !== 'SPY'

  const needHeqt = heqlIdx >= 0
  const needQqq = qqqlIdx >= 0

  const nowSec = Math.floor(Date.now() / 1000)
  const maxWindow = range === 'max' ? { fromSec: effectiveStartSec, toSec: nowSec } : undefined

  const seriesAndBenchTasks: Array<() => Promise<PriceSeries | null>> = [
    ...symbols.map((s) => () => fetchDailySeries(s, range, maxWindow)),
    () => fetchDailySeries(benchmarkFetchSymbol, range, maxWindow),
    () => (ntsdIdx >= 0 ? fetchDailySeries('EFA', range, maxWindow) : Promise.resolve(null)),
    () => (needExtraSpy ? fetchDailySeries('SPY', range, maxWindow) : Promise.resolve(null)),
    () => (needHeqt ? fetchDailySeries('HEQT.TO', range, maxWindow) : Promise.resolve(null)),
    () => (needQqq ? fetchDailySeries('QQQ', range, maxWindow) : Promise.resolve(null)),
    () => (mateIdx >= 0 ? fetchDailySeries('RSST', range, maxWindow) : Promise.resolve(null)),
    () => (needIaltFlspProxy ? fetchDailySeries('FLSP', range, maxWindow) : Promise.resolve(null)),
    () => (needIaltDbmfProxy ? fetchDailySeries('DBMF', range, maxWindow) : Promise.resolve(null)),
    () => (needDglmDbmfProxy ? fetchDailySeries('DBMF', range, maxWindow) : Promise.resolve(null)),
    () => (needHfgmAsgmProxy ? fetchDailySeries('ASGM', range, maxWindow) : Promise.resolve(null)),
    () =>
      usslIdx >= 0 && cadDenominated
        ? fetchDailySeries(CAD_UNHEDGED_SP500_PROXY_SYMBOL, range, maxWindow)
        : Promise.resolve(null),
    () => (cadDenominated ? fetchDailySeries(USDCAD_YAHOO_SYMBOL, range, maxWindow) : Promise.resolve(null)),
  ]
  const mergedSeriesResults = await runWithYahooGaps(seriesAndBenchTasks)
  let r = 0
  const series = mergedSeriesResults.slice(r, r + symbols.length) as PriceSeries[]
  r += symbols.length
  const benchSeries = mergedSeriesResults[r++] as PriceSeries
  const efaExtra = mergedSeriesResults[r++] as PriceSeries | null
  const spyExtra = mergedSeriesResults[r++] as PriceSeries | null
  const heqtExtra = mergedSeriesResults[r++] as PriceSeries | null
  const qqqExtra = mergedSeriesResults[r++] as PriceSeries | null
  const rsstExtra = mergedSeriesResults[r++] as PriceSeries | null
  const ialtFlspExtra = mergedSeriesResults[r++] as PriceSeries | null
  const ialtDbmfExtra = mergedSeriesResults[r++] as PriceSeries | null
  const dglmDbmfExtra = mergedSeriesResults[r++] as PriceSeries | null
  const hfgmAsgmExtra = mergedSeriesResults[r++] as PriceSeries | null
  const usslVfvExtra = mergedSeriesResults[r++] as PriceSeries | null
  const usdCadSeries = mergedSeriesResults[r++] as PriceSeries | null

  let seriesMut = series
  let efaMut = efaExtra
  let spyMut = spyExtra
  let rsstMut = rsstExtra
  let qqqMut = qqqExtra
  let ialtFlspMut: typeof ialtFlspExtra = ialtFlspExtra
  let ialtDbmfMut: typeof ialtDbmfExtra = ialtDbmfExtra
  let dglmDbmfMut: typeof dglmDbmfExtra = dglmDbmfExtra
  let hfgmAsgmMut: typeof hfgmAsgmExtra = hfgmAsgmExtra

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
    if (qqqMut != null) qqqMut = convertUsdPricesToCad(qqqMut, usdCadSeries)
    if (ialtFlspMut != null) ialtFlspMut = convertUsdPricesToCad(ialtFlspMut, usdCadSeries)
    if (ialtDbmfMut != null) ialtDbmfMut = convertUsdPricesToCad(ialtDbmfMut, usdCadSeries)
    if (dglmDbmfMut != null) dglmDbmfMut = convertUsdPricesToCad(dglmDbmfMut, usdCadSeries)
    if (hfgmAsgmMut != null) hfgmAsgmMut = convertUsdPricesToCad(hfgmAsgmMut, usdCadSeries)
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

  if (ialtIdx >= 0) {
    const flspU = flspIdx >= 0 ? seriesMut[flspIdx]! : ialtFlspMut
    const dbmfU = dbmfIdx >= 0 ? seriesMut[dbmfIdx]! : ialtDbmfMut
    if (
      flspU != null &&
      dbmfU != null &&
      flspU.timestamps.length >= 2 &&
      dbmfU.timestamps.length >= 2
    ) {
      const { series: mergedIalt, modeling } = buildIaltMergedDailySeries(
        seriesMut[ialtIdx]!,
        flspU,
        dbmfU
      )
      seriesMut[ialtIdx] = mergedIalt
      if (modeling != null) {
        syntheticModeling.push({
          slotSymbol: symbols[ialtIdx]!,
          firstRealNyDay: modeling.firstRealNyDay,
          kind: 'ialt_flsp_dbmf',
        })
      }
    }
  }

  if (dglmIdx >= 0) {
    const dglmUnderlying = dbmfIdx >= 0 ? seriesMut[dbmfIdx]! : dglmDbmfMut
    if (dglmUnderlying != null && dglmUnderlying.timestamps.length >= 2) {
      const { series: mergedDglm, modeling } = buildLeveredUnderlyingMergeSeries(
        seriesMut[dglmIdx]!,
        dglmUnderlying,
        1,
        0
      )
      seriesMut[dglmIdx] = mergedDglm
      if (modeling != null) {
        syntheticModeling.push({
          slotSymbol: symbols[dglmIdx]!,
          firstRealNyDay: modeling.firstRealNyDay,
          kind: 'dglm_dbmf',
        })
      }
    }
  }

  if (hfgmIdx >= 0) {
    const asgmUnderlying = asgmIdx >= 0 ? seriesMut[asgmIdx]! : hfgmAsgmMut
    if (asgmUnderlying != null && asgmUnderlying.timestamps.length >= 2) {
      const hfgmPreMerge = seriesMut[hfgmIdx]!
      const { series: mergedHfgm, modeling } = buildLeveredUnderlyingMergeSeries(
        hfgmPreMerge,
        asgmUnderlying,
        1.5,
        HFGM_ASGM_SYNTHETIC_ANNUAL_DRAG
      )
      seriesMut[hfgmIdx] = mergedHfgm
      const undM = seriesToNyDayPriceMap(asgmUnderlying)
      const tarM = seriesToNyDayPriceMap(hfgmPreMerge)
      const onCommon = [...undM.keys()].filter((d) => tarM.has(d)).sort()
      const firstRealNy = modeling?.firstRealNyDay ?? onCommon[0]
      if (firstRealNy) {
        syntheticModeling.push({
          slotSymbol: symbols[hfgmIdx]!,
          firstRealNyDay: firstRealNy,
          kind: 'hfgm_asgm',
        })
      }
    }
  }

  const pushCad125 = (
    idx: number,
    underlying: PriceSeries,
    firstRealFloor: string,
    cadLeveredUnderlying: 'HEQT.TO' | 'QQQ' | 'VFV.TO' | 'SPY'
  ) => {
    const { series: merged, modeling } = buildLeveredUnderlyingMergeSeries(
      seriesMut[idx]!,
      underlying,
      HEQL_SYNTHETIC_LEVERAGE,
      HEQL_SYNTHETIC_ANNUAL_DRAG,
      firstRealFloor
    )
    seriesMut[idx] = merged
    if (modeling != null) {
      syntheticModeling.push({
        slotSymbol: symbols[idx]!,
        firstRealNyDay: modeling.firstRealNyDay,
        kind: 'cad_levered_125',
        cadLeveredUnderlying,
      })
    }
  }

  if (usslIdx >= 0) {
    if (cadDenominated) {
      if (usslVfvExtra == null || usslVfvExtra.timestamps.length < 2) {
        throw new Error('VFV.TO series required for USSL.TO on CAD-denominated charts')
      }
      pushCad125(usslIdx, usslVfvExtra, USSL_FIRST_REAL_NY_DAY, 'VFV.TO')
    } else {
      pushCad125(usslIdx, benchSeries, USSL_FIRST_REAL_NY_DAY, 'SPY')
    }
  }

  if (qqqlIdx >= 0) {
    if (!cadDenominated || qqqMut == null) {
      throw new Error('QQQL.TO requires a CAD-denominated chart (underlying QQQ is converted with USDCAD).')
    }
    pushCad125(qqqlIdx, qqqMut, QQQL_FIRST_REAL_NY_DAY, 'QQQ')
  }

  if (heqlIdx >= 0 && heqtExtra != null) {
    pushCad125(heqlIdx, heqtExtra, HEQL_FIRST_REAL_NY_DAY, 'HEQT.TO')
  }

  const clipped = seriesMut.map((s) => clipSeriesFromTime(s, effectiveStartSec))
  const benchClipped = clipSeriesFromTime(benchSeries, effectiveStartSec)

  if (clipped.some((s) => s.timestamps.length < 2)) {
    throw new Error('Not enough history after the newest holding’s listing date for this range.')
  }

  const points =
    rebalanceSchedule === 'quarterly'
      ? buildQuarterlyRebalancedSeries(clipped, weights)
      : rebalanceSchedule === 'annual'
        ? buildAnnuallyRebalancedSeries(clipped, weights)
        : buildBuyAndHoldSeries(clipped, weights)
  if (points.length < 2) {
    throw new Error('Not enough overlapping sessions for this basket and range after inception.')
  }

  const tr = totalReturnPercent(points)

  const dayKeys = points.map((p) => p.nyDay ?? '')
  const benchmarkValues = normalizedBenchmarkByNyDays(benchClipped, dayKeys)
  if (!benchmarkValues) {
    throw new Error(`Could not align ${benchmarkFetchSymbol} benchmark to portfolio dates.`)
  }
  const benchmarkTotalReturnPercent = totalReturnPercentFromValues(benchmarkValues)

  const excessAlphaPercent =
    tr != null && benchmarkTotalReturnPercent != null
      ? tr - benchmarkTotalReturnPercent
      : null

  const valueLine = points.map((p) => p.value * CHART_NOTIONAL_START_USD)
  const benchLine = benchmarkValues.map((v) => v * CHART_NOTIONAL_START_USD)
  const maxDrawdownPortfolioPercent = maxDrawdownPercentFromLevels(valueLine)
  const maxDrawdownBenchmarkPercent = maxDrawdownPercentFromLevels(benchLine)

  /** First **plotted** session in this Yahoo `range` window (NY day) — not the basket overlap date (see `limitingFirstTradeDate`). */
  const chartStartDate = points[0]?.nyDay ?? null
  const limitingFirstTradeDate = nyTradingDayKey(effectiveStartSec)

  const holdingTotalReturnPercents = perHoldingTotalReturnPercentsAligned(clipped, symbols)

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
    excessAlphaPercent,
    maxDrawdownPortfolioPercent,
    maxDrawdownBenchmarkPercent,
    limitingSymbol,
    limitingFirstTradeDate,
    chartStartDate,
    syntheticModeling,
    chartCurrency: cadDenominated ? 'CAD' : 'USD',
    rebalanceSchedule,
    asOf:
      points.length > 0
        ? new Date(points[points.length - 1]!.t * 1000).toISOString().slice(0, 10)
        : null,
    holdingTotalReturnPercents,
  }
}

export function emptyPortfolioChartPayload(chartCurrency: 'USD' | 'CAD'): PortfolioChartPayload {
  return {
    symbols: [],
    weights: [],
    range: 'max',
    timestamps: [],
    values: [],
    totalReturnPercent: null,
    benchmarkSymbol: 'SPY',
    benchmarkValues: [],
    benchmarkTotalReturnPercent: null,
    excessAlphaPercent: null,
    maxDrawdownPortfolioPercent: null,
    maxDrawdownBenchmarkPercent: null,
    limitingSymbol: '',
    limitingFirstTradeDate: '',
    chartStartDate: null,
    asOf: null,
    syntheticModeling: [],
    chartCurrency,
    rebalanceSchedule: 'none',
    holdingTotalReturnPercents: [],
  }
}
