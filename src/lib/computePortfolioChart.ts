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
  buildPreInceptionProductStackMerge,
  heqlSyntheticOverlapFirstTradeSec,
  hfgmSyntheticOverlapFirstTradeSec,
  qqqlSyntheticOverlapFirstTradeSec,
  stackedProductProxyOverlapFirstTradeSec,
  usslSyntheticOverlapFirstTradeSec,
} from '@/lib/syntheticProxyMerge'
import {
  buildResolvedStackLegs,
  CHART_STACK_PRODUCT_PROXY_LEGS,
  collectProxyFetchSymbols,
  collectProxyLeafSymbols,
  findSlugByYahooSymbol,
  grossExposureForChartProxy,
  resolveProxyDef,
} from '@/lib/portfolioChartProxyLegs'
import {
  CAD_SPY_PROXY_SYMBOL,
  CAD_UNHEDGED_NASDAQ_PROXY_SYMBOL,
  CAD_UNHEDGED_SP500_PROXY_SYMBOL,
  convertUsdPricesToCad,
  isCadListedSymbol,
  USDCAD_YAHOO_SYMBOL,
} from '@/lib/cadUsdConversion'
import {
  clipSeriesFromTime,
  fetchDailySeries,
  fetchFirstTradeDateSec,
  type PriceSeries,
  type YahooRange,
} from '@/lib/yahooFinance'

export type SyntheticModelingKind =
  | 'ntsd'
  | 'cad_levered_125'
  | 'ialt_flsp_dbmf'
  | 'hfgm_asgm'
  | 'dglm_dbmf'
  | 'stacked_product_proxy'
  | 'stacked_product_proxy_preinception'

export interface SyntheticModelingNote {
  /** Ticker as in the basket (e.g. HEQL.TO, MATE). */
  slotSymbol: string
  firstRealNyDay: string
  kind: SyntheticModelingKind
  /** 1.25× CAD levered sleeve: which index TR is scaled (ZQQ.TO is CAD-listed unhedged Nasdaq-100; VFV.TO is CAD-listed unhedged S&P 500). */
  cadLeveredUnderlying?: 'HEQT.TO' | 'ZQQ.TO' | 'VFV.TO' | 'SPY'
  /**
   * Stacked manual chart proxies (`stacked_product_proxy*`): false when proxy legs are configured but
   * this Yahoo window had no calendar days before the fund’s first session to splice (footnote still
   * discloses methodology). Omitted/true when pre-inception returns were merged.
   */
  stackedProxySpliced?: boolean
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
  /** Annualised Sharpe ratio (CAGR − 4.5% risk-free) / annualised vol. null when < 1 year of data. */
  sharpeRatio: number | null
  /** Annualised Sortino ratio (CAGR − 4.5% risk-free) / annualised downside deviation. null when < 1 year of data. */
  sortinoRatio: number | null
}

const DEFAULT_BENCHMARK = 'SPY'
const RISK_FREE_RATE_ANNUAL = 0.045

function computeSharpeAndSortino(valueLine: number[]): { sharpe: number | null; sortino: number | null } {
  const n = valueLine.length
  // Need at least 240 points (~11.5 months) for meaningful ratios. Using 240 rather than
  // 253 avoids the 1Y window flipping to null as it drifts by a day near the boundary.
  if (n < 240) return { sharpe: null, sortino: null }

  const dailyReturns: number[] = []
  for (let i = 1; i < n; i++) {
    dailyReturns.push((valueLine[i]! - valueLine[i - 1]!) / valueLine[i - 1]!)
  }
  const nPeriods = dailyReturns.length

  const cagr = Math.pow(valueLine[n - 1]! / valueLine[0]!, 252 / nPeriods) - 1

  const mean = dailyReturns.reduce((s, r) => s + r, 0) / nPeriods
  const variance = dailyReturns.reduce((s, r) => s + (r - mean) ** 2, 0) / nPeriods
  const annualizedVol = Math.sqrt(variance) * Math.sqrt(252)
  if (annualizedVol === 0) return { sharpe: null, sortino: null }

  const excess = cagr - RISK_FREE_RATE_ANNUAL
  const sharpe = excess / annualizedVol

  // Downside deviation: sum of squared negative daily returns divided by ALL periods (Sortino's formulation).
  const downsideVariance = dailyReturns.reduce((s, r) => s + Math.min(r, 0) ** 2, 0) / nPeriods
  const downsideDeviation = Math.sqrt(downsideVariance) * Math.sqrt(252)
  if (downsideDeviation === 0) return { sharpe, sortino: null }

  const sortino = excess / downsideDeviation
  return { sharpe, sortino }
}

/** Re-export for chart footnotes / PresetPortfolioChart. */
export { CHART_STACK_PRODUCT_PROXY_LEGS } from '@/lib/portfolioChartProxyLegs'

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
  const usedDefaultBenchmark = params.benchmarkSymbol == null
  const benchmarkFetchSymbol =
    params.benchmarkSymbol ?? (cadDenominated ? CAD_SPY_PROXY_SYMBOL : DEFAULT_BENCHMARK)
  /** CAD charts pull XSP.TO (hedged) but present the default line as SPY (S&P 500) to match user language. */
  const benchmarkSymbol = cadDenominated && usedDefaultBenchmark ? 'SPY' : benchmarkFetchSymbol

  if (symbols.length !== weights.length) {
    throw new Error('Symbol count must match weight count')
  }
  if (symbols.length < 1) {
    throw new Error('At least one symbol required')
  }

  const upper = symbols.map((s) => s.toUpperCase())
  const ntsdIdx = upper.indexOf('NTSD')
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

  const nowSec = Math.floor(Date.now() / 1000)

  const initialFirstTrades = await Promise.all(
    symbols.map((s, i) => {
      const proxyDef = resolveProxyDef(s)
      if (proxyDef) {
        const leafSyms = collectProxyLeafSymbols(proxyDef)
        return stackedProductProxyOverlapFirstTradeSec(leafSyms)
      }
      return ntsdIdx >= 0 && i === ntsdIdx
        ? ntsdSyntheticOverlapFirstTradeSec()
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
    })
  )
  let slotFirstTradeSec = [...initialFirstTrades]
  const portfolioOverlapStartSec = Math.max(...slotFirstTradeSec)

  const needExtraSpy = ntsdIdx >= 0 && benchmarkFetchSymbol.toUpperCase() !== 'SPY'

  const needHeqt = heqlIdx >= 0
  const needZqq = qqqlIdx >= 0

  const maxWindow =
    range === 'max' ? { fromSec: portfolioOverlapStartSec, toSec: nowSec } : undefined

  const seriesAndBenchTasks: Array<() => Promise<PriceSeries | null>> = [
    ...symbols.map((s) => () => fetchDailySeries(s, range, maxWindow)),
    () => fetchDailySeries(benchmarkFetchSymbol, range, maxWindow),
    () => (ntsdIdx >= 0 ? fetchDailySeries('EFA', range, maxWindow) : Promise.resolve(null)),
    () => (needExtraSpy ? fetchDailySeries('SPY', range, maxWindow) : Promise.resolve(null)),
    () => (needHeqt ? fetchDailySeries('HEQT.TO', range, maxWindow) : Promise.resolve(null)),
    () => (needZqq ? fetchDailySeries(CAD_UNHEDGED_NASDAQ_PROXY_SYMBOL, range, maxWindow) : Promise.resolve(null)),
    () => (needIaltFlspProxy ? fetchDailySeries('FLSP', range, maxWindow) : Promise.resolve(null)),
    () => (needIaltDbmfProxy ? fetchDailySeries('DBMF', range, maxWindow) : Promise.resolve(null)),
    () => (needDglmDbmfProxy ? fetchDailySeries('DBMF', range, maxWindow) : Promise.resolve(null)),
    () => (needHfgmAsgmProxy ? fetchDailySeries('ASGM', range, maxWindow) : Promise.resolve(null)),
    () =>
      usslIdx >= 0
        ? fetchDailySeries(CAD_UNHEDGED_SP500_PROXY_SYMBOL, range, maxWindow)
        : Promise.resolve(null),
    () => (cadDenominated ? fetchDailySeries(USDCAD_YAHOO_SYMBOL, range, maxWindow) : Promise.resolve(null)),
  ]
  const mergedSeriesResults = await Promise.all(seriesAndBenchTasks.map((fn) => fn()))
  let r = 0
  const series = mergedSeriesResults.slice(r, r + symbols.length) as PriceSeries[]
  r += symbols.length
  const benchSeries = mergedSeriesResults[r++] as PriceSeries
  const efaExtra = mergedSeriesResults[r++] as PriceSeries | null
  const spyExtra = mergedSeriesResults[r++] as PriceSeries | null
  const heqtExtra = mergedSeriesResults[r++] as PriceSeries | null
  const zqqExtra = mergedSeriesResults[r++] as PriceSeries | null
  const ialtFlspExtra = mergedSeriesResults[r++] as PriceSeries | null
  const ialtDbmfExtra = mergedSeriesResults[r++] as PriceSeries | null
  const dglmDbmfExtra = mergedSeriesResults[r++] as PriceSeries | null
  const hfgmAsgmExtra = mergedSeriesResults[r++] as PriceSeries | null
  const usslVfvExtra = mergedSeriesResults[r++] as PriceSeries | null
  const usdCadSeries = mergedSeriesResults[r++] as PriceSeries | null

  let seriesMut = series
  let efaMut = efaExtra
  let spyMut = spyExtra
  let zqqMut = zqqExtra
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
    // zqqMut is ZQQ.TO (CAD-listed, unhedged) — no USDCAD conversion needed
    if (ialtFlspMut != null) ialtFlspMut = convertUsdPricesToCad(ialtFlspMut, usdCadSeries)
    if (ialtDbmfMut != null) ialtDbmfMut = convertUsdPricesToCad(ialtDbmfMut, usdCadSeries)
    if (dglmDbmfMut != null) dglmDbmfMut = convertUsdPricesToCad(dglmDbmfMut, usdCadSeries)
    if (hfgmAsgmMut != null) hfgmAsgmMut = convertUsdPricesToCad(hfgmAsgmMut, usdCadSeries)
  }

  const proxyLegSymsNeeded = new Set<string>()
  for (const s of symbols) {
    const def = resolveProxyDef(s)
    if (def) collectProxyFetchSymbols(def).forEach((sym) => proxyLegSymsNeeded.add(sym.toUpperCase()))
  }
  const proxyLegList = [...proxyLegSymsNeeded]

  const proxyHistoryWindow =
    range === 'max'
      ? { fromSec: Math.floor(Date.UTC(2005, 0, 1) / 1000), toSec: nowSec }
      : undefined

  let proxyLegBySym = new Map<string, PriceSeries>()
  if (proxyLegList.length > 0) {
    const proxyFetched = await Promise.all(
      proxyLegList.map((sym) => fetchDailySeries(sym, range, proxyHistoryWindow))
    )
    proxyLegList.forEach((sym, i) => proxyLegBySym.set(sym.toUpperCase(), proxyFetched[i]!))
    if (cadDenominated && usdCadSeries != null) {
      const next = new Map<string, PriceSeries>()
      for (const sym of proxyLegList) {
        let ser = proxyLegBySym.get(sym)!
        if (!isCadListedSymbol(sym)) {
          ser = convertUsdPricesToCad(ser, usdCadSeries)
        }
        next.set(sym, ser)
      }
      proxyLegBySym = next
    }
  }

  // Phase 1: extend chain-proxy tickers in proxyLegBySym before they are used as proxy legs.
  // E.g. RSST is fetched for use as MATE's proxy leg; extend RSST back to Dec 2020 first so MATE inherits that history.
  for (const sym of [...proxyLegBySym.keys()]) {
    const chainDef = CHART_STACK_PRODUCT_PROXY_LEGS[sym.toUpperCase()]
    if (!chainDef) continue
    const ser = proxyLegBySym.get(sym.toUpperCase())
    if (!ser) continue
    const legSeries = buildResolvedStackLegs(chainDef, proxyLegBySym)
    if (!legSeries) continue
    const gross = chainDef.grossExposurePct ?? grossExposureForChartProxy(sym, findSlugByYahooSymbol(sym))
    const result = buildPreInceptionProductStackMerge(ser, legSeries, { grossExposurePct: gross })
    if (result.spliced) proxyLegBySym.set(sym.toUpperCase(), result.series)
  }

  const syntheticModeling: SyntheticModelingNote[] = []

  // Phase 2: apply proxy defs to portfolio symbols using the (potentially chain-extended) proxyLegBySym.
  for (let i = 0; i < symbols.length; i++) {
    const def = resolveProxyDef(symbols[i]!)
    if (!def) continue
    const legSeries = buildResolvedStackLegs(def, proxyLegBySym)
    if (!legSeries) continue
    const slug = findSlugByYahooSymbol(symbols[i]!)
    const gross = def.grossExposurePct ?? grossExposureForChartProxy(symbols[i]!, slug)
    const pin = buildPreInceptionProductStackMerge(seriesMut[i]!, legSeries, {
      grossExposurePct: gross,
      legReturnScale: def.legReturnScale,
    })
    if (pin.modeling != null && pin.series.timestamps.length >= 2) {
      if (pin.spliced) {
        seriesMut[i] = pin.series
        slotFirstTradeSec[i] = Math.min(slotFirstTradeSec[i]!, pin.series.timestamps[0]!)
      }
      syntheticModeling.push({
        slotSymbol: symbols[i]!,
        firstRealNyDay: pin.modeling.firstRealNyDay,
        kind: 'stacked_product_proxy_preinception',
        stackedProxySpliced: pin.spliced,
      })
    }
  }

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
    cadLeveredUnderlying: 'HEQT.TO' | 'ZQQ.TO' | 'VFV.TO' | 'SPY'
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
    if (usslVfvExtra != null && usslVfvExtra.timestamps.length >= 2) {
      // USSL.TO modeled as 1.25x VFV.TO (CAD S&P 500), used in its listing currency.
      pushCad125(usslIdx, usslVfvExtra, USSL_FIRST_REAL_NY_DAY, 'VFV.TO')
    } else {
      pushCad125(usslIdx, benchSeries, USSL_FIRST_REAL_NY_DAY, 'SPY')
    }
  }

  if (qqqlIdx >= 0) {
    if (zqqMut == null || zqqMut.timestamps.length < 2) {
      throw new Error('QQQL.TO requires its ZQQ.TO underlying (CAD-listed unhedged Nasdaq-100) to model the 1.25x sleeve.')
    }
    // QQQL.TO modeled as 1.25x ZQQ.TO (CAD Nasdaq-100), used in its listing currency.
    pushCad125(qqqlIdx, zqqMut, QQQL_FIRST_REAL_NY_DAY, 'ZQQ.TO')
  }

  if (heqlIdx >= 0 && heqtExtra != null) {
    pushCad125(heqlIdx, heqtExtra, HEQL_FIRST_REAL_NY_DAY, 'HEQT.TO')
  }

  const effectiveStartSec = Math.max(...slotFirstTradeSec)
  const limitingIdx = slotFirstTradeSec.indexOf(effectiveStartSec)
  const limitingSymbol = symbols[limitingIdx]!

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
  const { sharpe: sharpeRatio, sortino: sortinoRatio } = computeSharpeAndSortino(valueLine)

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
    sharpeRatio,
    sortinoRatio,
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
    sharpeRatio: null,
    sortinoRatio: null,
  }
}
