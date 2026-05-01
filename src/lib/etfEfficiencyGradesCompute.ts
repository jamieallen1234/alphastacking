import type { EtfDynamicDef, EtfDynamicEfficiencyDef } from '@/lib/etfDynamicRegistryTypes'
import { isAllowedEtfChartSymbol } from '@/lib/etfChartSymbols'
import { EFFICIENCY_PROVISIONAL_FOOTNOTE } from '@/lib/etfEfficiencyTooltipFraming'
import {
  ETF_STACK_EXPOSURE_BY_SLUG,
  stackBucketExposureSplitPct,
  type EtfStackExposureConfig,
} from '@/lib/etfStackExposureBySlug'
import { fetchDailySeries, type PriceSeries } from '@/lib/yahooFinance'

/** Partial override merged onto static `efficiency` (grades + optional footnotes). */
export type MonthlyEfficiencyGradePatch = {
  capital?: { grade: string }
  alpha?: { grade: string }
  footnotes?: string[]
}

export type MonthlyEfficiencySnapshot = {
  monthKey: string
  us: Record<string, MonthlyEfficiencyGradePatch | null>
  ca: Record<string, MonthlyEfficiencyGradePatch | null>
}

function alignedCloseSeries(
  etf: PriceSeries,
  bench: PriceSeries
): { etf: number[]; bench: number[]; firstTs: number; lastTs: number } | null {
  // Yahoo `max` bars often differ by 1s across symbols; align by UTC day bucket, not raw second.
  const dayKey = (tsSec: number) => Math.floor(tsSec / 86400)
  const benchByTs = new Map<number, { ts: number; px: number }>()
  for (let i = 0; i < bench.timestamps.length; i++) {
    const ts = bench.timestamps[i]!
    const px = bench.prices[i]!
    if (!Number.isFinite(px) || px <= 0) continue
    benchByTs.set(dayKey(ts), { ts, px })
  }
  const etfC: number[] = []
  const benchC: number[] = []
  const tsList: number[] = []
  for (let i = 0; i < etf.timestamps.length; i++) {
    const t = etf.timestamps[i]!
    const e = etf.prices[i]!
    const b = benchByTs.get(dayKey(t))
    if (b == null || !Number.isFinite(e) || e <= 0) continue
    etfC.push(e)
    benchC.push(b.px)
    // Shared day key is enough for history windows; keep ETF timestamp for monotonic ordering.
    tsList.push(t)
  }
  if (etfC.length < 60 || tsList.length < 2) return null
  return {
    etf: etfC,
    bench: benchC,
    firstTs: tsList[0]!,
    lastTs: tsList[tsList.length - 1]!,
  }
}

function cagrFromCloses(closes: number[], tradingIntervals: number): number | null {
  if (closes.length < 2 || tradingIntervals < 60) return null
  const first = closes[0]!
  const last = closes[closes.length - 1]!
  if (first <= 0 || last <= 0) return null
  const years = tradingIntervals / 252
  // ~4 months threshold (skill rule); 0.30y avoids edge misses around holiday/session counts.
  if (years < 0.30) return null
  return (last / first) ** (1 / years) - 1
}

function betaFromAlignedCloses(etfCloses: number[], benchCloses: number[]): number | null {
  if (etfCloses.length !== benchCloses.length || etfCloses.length < 20) return null
  const etfRet: number[] = []
  const benchRet: number[] = []
  for (let i = 1; i < etfCloses.length; i++) {
    const e0 = etfCloses[i - 1]
    const e1 = etfCloses[i]
    const b0 = benchCloses[i - 1]
    const b1 = benchCloses[i]
    if (!e0 || !e1 || !b0 || !b1 || e0 <= 0 || b0 <= 0) continue
    etfRet.push(e1 / e0 - 1)
    benchRet.push(b1 / b0 - 1)
  }
  if (etfRet.length < 20 || etfRet.length !== benchRet.length) return null
  const meanE = etfRet.reduce((s, x) => s + x, 0) / etfRet.length
  const meanB = benchRet.reduce((s, x) => s + x, 0) / benchRet.length
  let cov = 0
  let varB = 0
  for (let i = 0; i < etfRet.length; i++) {
    cov += (etfRet[i]! - meanE) * (benchRet[i]! - meanB)
    varB += (benchRet[i]! - meanB) ** 2
  }
  if (varB <= 0) return null
  const beta = cov / varB
  return beta === 0 ? 0.01 : beta
}

function monthsSinceFirstBar(firstTsSec: number, lastTsSec: number): number {
  return (lastTsSec - firstTsSec) / (30.44 * 86400)
}

function averageAnnualYieldInWindow(
  annualYieldSeries: PriceSeries,
  fromTsSec: number,
  toTsSec: number
): number | null {
  if (toTsSec <= fromTsSec) return null
  const vals: number[] = []
  for (let i = 0; i < annualYieldSeries.timestamps.length; i++) {
    const ts = annualYieldSeries.timestamps[i]!
    if (ts < fromTsSec || ts > toTsSec) continue
    const yPct = annualYieldSeries.prices[i]!
    if (!Number.isFinite(yPct)) continue
    const y = yPct / 100
    if (y > -0.05 && y < 0.3) vals.push(y)
  }
  if (vals.length < 10) return null
  return vals.reduce((s, x) => s + x, 0) / vals.length
}

/** Capital score from annual excess return vs SPY (both series already net of fund fees in adj close). */
function capitalLetterFromExcess(etfMinusSpyAnnual: number): string {
  const scorePp = etfMinusSpyAnnual * 100
  if (scorePp >= 6) return 'A+'
  if (scorePp > 1) return 'A'
  if (scorePp >= -2) return 'B'
  if (scorePp >= -6) return 'C'
  return 'D'
}

function alphaLetterFromScorePp(scorePp: number): string {
  // Stricter distribution targets: fewer A+ grades and a wider middle C bucket.
  if (scorePp >= 15) return 'A+'
  if (scorePp >= 8) return 'A'
  if (scorePp >= 4) return 'B'
  if (scorePp >= -2) return 'C'
  return 'D'
}

/** Best-to-worst order; B+ appears only after short-history adjustments (raw scores never emit B+). */
const EFFICIENCY_GRADE_ORDER = ['A+', 'A', 'B+', 'B', 'C', 'D'] as const

/** One notch worse on the ladder; N/A and unknown unchanged; D stays D. */
function downgradeLetterGradeOneStep(grade: string): string {
  if (grade === 'N/A') return grade
  const i = EFFICIENCY_GRADE_ORDER.indexOf(grade as (typeof EFFICIENCY_GRADE_ORDER)[number])
  if (i < 0) return grade
  if (i >= EFFICIENCY_GRADE_ORDER.length - 1) return 'D'
  return EFFICIENCY_GRADE_ORDER[i + 1]!
}

/** When live overlap is short, do not show a letter above `ceiling` (e.g. cap at B+). */
function capEfficiencyGradeForShortHistory(
  grade: string,
  ceiling: (typeof EFFICIENCY_GRADE_ORDER)[number]
): string {
  if (grade === 'N/A') return grade
  const gi = EFFICIENCY_GRADE_ORDER.indexOf(grade as (typeof EFFICIENCY_GRADE_ORDER)[number])
  const ci = EFFICIENCY_GRADE_ORDER.indexOf(ceiling)
  if (gi < 0 || ci < 0) return grade
  if (gi < ci) return ceiling
  return grade
}

function alphaScorePpWithBetaBonus(baseScorePp: number, beta: number | null): number {
  if (baseScorePp <= 0 || beta == null) return baseScorePp
  const absBeta = Math.abs(beta)
  // Reward near-market-neutral alpha sleeves; fades to 0 at |beta|>=0.8.
  const lowBetaBonusPp = Math.max(0, (0.8 - absBeta) * 2.5)
  // Extra credit for defensive negative-beta alpha when it clears hurdle.
  const negativeBetaBonusPp = beta < 0 ? absBeta * 5.0 : 0
  return baseScorePp + lowBetaBonusPp + negativeBetaBonusPp
}

function inferStackedEquityBenchmarkSymbol(def: EtfDynamicDef): string {
  const text = `${def.h1Title} ${def.structure ?? ''} ${def.lede}`.toLowerCase()
  if (text.includes('nasdaq-100') || text.includes('nasdaq 100')) return 'QQQ'
  if (def.yahooSymbol.endsWith('.TO')) return 'VFV.TO'
  return 'SPY'
}

function capitalMarketBenchmarkSymbol(def: EtfDynamicDef, slug?: string): string {
  const mapped = slug ? ETF_STACK_EXPOSURE_BY_SLUG[slug]?.capitalMarketBenchmarkSymbol : undefined
  if (mapped) return mapped
  return def.yahooSymbol.endsWith('.TO') ? 'VFV.TO' : 'SPY'
}

function inferExposureSplitFromCopy(def: EtfDynamicDef): { capital: number; alpha: number } | null {
  const text = `${def.h1Title} ${def.description} ${def.lede} ${def.structure ?? ''}`
  const slash = text.match(/(\d{1,3})\s*\/\s*(\d{1,3})/)
  if (slash) {
    const a = Number(slash[1])
    const b = Number(slash[2])
    if (Number.isFinite(a) && Number.isFinite(b) && a > 0 && b > 0) return { capital: a, alpha: b }
  }
  const pct = [...text.matchAll(/(\d{1,3})\s*%/g)]
    .map((m) => Number(m[1]))
    .filter((n) => Number.isFinite(n) && n > 0)
  if (pct.length >= 2) return { capital: pct[0]!, alpha: pct[1]! }
  return null
}

function inferExposureSplitPct(def: EtfDynamicDef, slug?: string): { capital: number; alpha: number } {
  if (slug) {
    const fromStack = stackBucketExposureSplitPct(slug)
    if (fromStack && (fromStack.capital > 0 || fromStack.alpha > 0)) return fromStack
  }
  if ((def.capitalBucketExposurePct ?? 0) > 0 && (def.alphaBucketExposurePct ?? 0) > 0) {
    return {
      capital: def.capitalBucketExposurePct!,
      alpha: def.alphaBucketExposurePct!,
    }
  }
  const inferred = inferExposureSplitFromCopy(def)
  if (inferred) return inferred
  // Fallback priors when explicit or inferred notional split is unavailable.
  if (def.hubCategoryId === 'return-stacked-lt-2x') return { capital: 90, alpha: 60 }
  if (def.hubCategoryId === 'return-stacked-ge-2x' || def.hubCategoryId === 'return-stacked') {
    return { capital: 100, alpha: 100 }
  }
  const text = `${def.h1Title} ${def.structure ?? ''} ${def.lede}`.toLowerCase()
  if (text.includes('90/60')) return { capital: 90, alpha: 60 }
  if (text.includes('2x') || text.includes('return stacked')) return { capital: 100, alpha: 100 }
  return { capital: 100, alpha: 0 }
}

function buildSyntheticBlendSeries(
  a: PriceSeries,
  b: PriceSeries,
  weightA: number,
  weightB: number
): PriceSeries | null {
  const dayKey = (tsSec: number) => Math.floor(tsSec / 86400)
  const aByDay = new Map<number, { ts: number; px: number }>()
  const bByDay = new Map<number, { ts: number; px: number }>()
  for (let i = 0; i < a.timestamps.length; i++) {
    const ts = a.timestamps[i]!
    const px = a.prices[i]!
    if (!Number.isFinite(px) || px <= 0) continue
    aByDay.set(dayKey(ts), { ts, px })
  }
  for (let i = 0; i < b.timestamps.length; i++) {
    const ts = b.timestamps[i]!
    const px = b.prices[i]!
    if (!Number.isFinite(px) || px <= 0) continue
    bByDay.set(dayKey(ts), { ts, px })
  }
  const days = [...aByDay.keys()].filter((d) => bByDay.has(d)).sort((x, y) => x - y)
  if (days.length < 60) return null
  const timestamps: number[] = []
  const prices: number[] = []
  let synthPx = 100
  for (let i = 0; i < days.length; i++) {
    const day = days[i]!
    const aNow = aByDay.get(day)!
    const bNow = bByDay.get(day)!
    if (i === 0) {
      timestamps.push(Math.max(aNow.ts, bNow.ts))
      prices.push(synthPx)
      continue
    }
    const prevDay = days[i - 1]!
    const aPrev = aByDay.get(prevDay)!
    const bPrev = bByDay.get(prevDay)!
    const retA = aNow.px / aPrev.px - 1
    const retB = bNow.px / bPrev.px - 1
    const blendRet = weightA * retA + weightB * retB
    synthPx *= 1 + blendRet
    timestamps.push(Math.max(aNow.ts, bNow.ts))
    prices.push(synthPx)
  }
  return {
    symbol: `${a.symbol}:${weightA.toFixed(4)}+${b.symbol}:${weightB.toFixed(4)}`,
    timestamps,
    prices,
  }
}

function stackNotionalByAssetClass(mapped: EtfStackExposureConfig): { equity: number; nonEquity: number } {
  let equity = 0
  let nonEquity = 0
  for (const c of mapped.components) {
    if (c.assetClass === 'equity') equity += c.pct
    else nonEquity += c.pct
  }
  return { equity, nonEquity }
}

async function fetchBlendFromLegs(
  legs: Array<{ symbol: string; weightPct: number }>,
  spyShared?: PriceSeries
): Promise<PriceSeries | null> {
  if (legs.length < 2) return null
  const [aLeg, bLeg] = legs
  const [a, b] = await Promise.all([
    aLeg.symbol === 'SPY' && spyShared ? Promise.resolve(spyShared) : fetchDailySeries(aLeg.symbol, '5y'),
    fetchDailySeries(bLeg.symbol, '5y'),
  ])
  return buildSyntheticBlendSeries(a, b, aLeg.weightPct / 100, bLeg.weightPct / 100)
}

/** Equity-only synthetic core for mapped stacks (capital + residual alpha). */
async function getEquityOnlyStackedCoreBenchmarkSeries(
  mapped: EtfStackExposureConfig,
  def: EtfDynamicDef,
  spyShared?: PriceSeries
): Promise<PriceSeries | null> {
  const { equity } = stackNotionalByAssetClass(mapped)
  if (equity <= 0) return null

  if (mapped.equityCoreBenchmarkBlend && mapped.equityCoreBenchmarkBlend.length >= 2) {
    return fetchBlendFromLegs(mapped.equityCoreBenchmarkBlend, spyShared)
  }
  if (mapped.equityCoreBenchmarkSymbol) {
    const sym = mapped.equityCoreBenchmarkSymbol
    if (sym === 'SPY' && spyShared) return spyShared
    return fetchDailySeries(sym, '5y')
  }
  if (mapped.equityOnlyUsesCoreBlend && mapped.coreBenchmarkBlend && mapped.coreBenchmarkBlend.length >= 2) {
    return fetchBlendFromLegs(mapped.coreBenchmarkBlend, spyShared)
  }
  if (mapped.coreBenchmarkSymbol) {
    if (mapped.coreBenchmarkSymbol === 'SPY' && spyShared) return spyShared
    return fetchDailySeries(mapped.coreBenchmarkSymbol, '5y')
  }
  const benchSymbol = inferStackedEquityBenchmarkSymbol(def)
  if (benchSymbol === 'SPY' && spyShared) return spyShared
  return fetchDailySeries(benchSymbol, '5y')
}

/** Non–equity-only stacks: anchor series for beta / hurdle path (e.g. crypto blend). */
async function getMappedNonEquityBenchmarkSeries(
  mapped: EtfStackExposureConfig,
  spyShared?: PriceSeries
): Promise<PriceSeries | null> {
  if (mapped.coreBenchmarkBlend && mapped.coreBenchmarkBlend.length >= 2) {
    return fetchBlendFromLegs(mapped.coreBenchmarkBlend, spyShared)
  }
  if (mapped.coreBenchmarkSymbol) {
    const sym = mapped.coreBenchmarkSymbol
    if (sym === 'SPY' && spyShared) return spyShared
    return fetchDailySeries(sym, '5y')
  }
  return null
}

function inferLines(staticEff: EtfDynamicEfficiencyDef | undefined): {
  hasCapital: boolean
  hasAlpha: boolean
} {
  if (!staticEff) return { hasCapital: true, hasAlpha: true }
  return {
    hasCapital: staticEff.capital != null,
    hasAlpha: staticEff.alpha != null,
  }
}

export async function computeMonthlyEfficiencyPatchForSlug(
  def: EtfDynamicDef,
  staticEff: EtfDynamicEfficiencyDef | undefined,
  /** When building many slugs in one job, pass one shared SPY `max` series to avoid refetching SPY per ticker. */
  spyShared?: PriceSeries,
  rfShared?: PriceSeries,
  slug?: string
): Promise<MonthlyEfficiencyGradePatch | null> {
  if (def.monthlyGradeRecompute === false) return null

  const sym = def.yahooSymbol.trim()
  if (!isAllowedEtfChartSymbol(sym)) return null

  const inferred = inferLines(staticEff)
  let hasCapital = inferred.hasCapital
  let hasAlpha = inferred.hasAlpha

  const mapped = slug ? ETF_STACK_EXPOSURE_BY_SLUG[slug] : undefined
  let equityN = 0
  let nonEquityN = 0
  if (mapped) {
    const { equity, nonEquity } = stackNotionalByAssetClass(mapped)
    equityN = equity
    nonEquityN = nonEquity
    hasCapital = inferred.hasCapital && equityN > 0
    hasAlpha = inferred.hasAlpha && nonEquityN > 0
  }

  const equityOnlyByCategory = def.hubCategoryId === 'factor' || def.hubCategoryId === 'long-short'
  const mappedStackResidual =
    !equityOnlyByCategory && Boolean(mapped && equityN > 0 && nonEquityN > 0)
  const mappedStackEquityOnly =
    !equityOnlyByCategory && Boolean(mapped && equityN > 0 && nonEquityN === 0)
  const mappedStackNonEquityOnly =
    !equityOnlyByCategory && Boolean(mapped && equityN === 0 && nonEquityN > 0)

  let etf: PriceSeries
  let benchmark: PriceSeries
  let rf: PriceSeries
  try {
    // Grade on live history up to ~5Y with dense daily bars (Yahoo `max` can be sparse).
    etf = await fetchDailySeries(sym, '5y')
    if (mappedStackResidual || mappedStackEquityOnly) {
      const stackedBenchmark = await getEquityOnlyStackedCoreBenchmarkSeries(mapped!, def, spyShared)
      if (!stackedBenchmark) return null
      benchmark = stackedBenchmark
    } else if (mappedStackNonEquityOnly) {
      const nb = await getMappedNonEquityBenchmarkSeries(mapped!, spyShared)
      if (!nb) return null
      benchmark = nb
    } else {
      benchmark = spyShared ?? (await fetchDailySeries('SPY', '5y'))
    }
    rf = rfShared ?? (await fetchDailySeries('^IRX', '5y'))
  } catch {
    return null
  }

  const aligned = alignedCloseSeries(etf, benchmark)
  if (!aligned) return null

  const n = aligned.etf.length
  const intervals = n - 1
  const etfCagr = cagrFromCloses(aligned.etf, intervals)
  const benchmarkCagr = cagrFromCloses(aligned.bench, intervals)
  if (etfCagr == null || benchmarkCagr == null) return null
  const beta = betaFromAlignedCloses(aligned.etf, aligned.bench)
  if (equityOnlyByCategory && beta != null) {
    const useAlpha = beta < 0.8
    hasCapital = !useAlpha
    hasAlpha = useAlpha
  }

  const useResidualStackedAlpha = mappedStackResidual

  const monthsHist = monthsSinceFirstBar(aligned.firstTs, aligned.lastTs)

  let capitalExcess = etfCagr - benchmarkCagr
  const applyMappedStackedCapital =
    !equityOnlyByCategory && Boolean(mapped && equityN > 0 && hasCapital)
  if (applyMappedStackedCapital) {
    try {
      const marketSym = capitalMarketBenchmarkSymbol(def, slug)
      const marketSeries =
        marketSym === 'SPY' && spyShared ? spyShared : await fetchDailySeries(marketSym, '5y')
      if (nonEquityN === 0 && (mapped!.allEquityStack || def.allEquityStack)) {
        const etfVsMarket = alignedCloseSeries(etf, marketSeries)
        if (etfVsMarket) {
          const eqIntervals = etfVsMarket.etf.length - 1
          const eqCagr = cagrFromCloses(etfVsMarket.etf, eqIntervals)
          const marketCagr = cagrFromCloses(etfVsMarket.bench, eqIntervals)
          if (eqCagr != null && marketCagr != null) {
            capitalExcess = eqCagr - marketCagr
          }
        }
      } else if (nonEquityN > 0) {
        const coreVsMarket = alignedCloseSeries(benchmark, marketSeries)
        if (coreVsMarket) {
          const coreIntervals = coreVsMarket.etf.length - 1
          const coreCagr = cagrFromCloses(coreVsMarket.etf, coreIntervals)
          const marketCagr = cagrFromCloses(coreVsMarket.bench, coreIntervals)
          if (coreCagr != null && marketCagr != null) {
            const split = inferExposureSplitPct(def, slug)
            const stackMultiple = (split.capital + split.alpha) / 100
            const effectiveEquityNotional = (split.capital / 100) * stackMultiple
            const coreCapitalAdjustedCagr = coreCagr * Math.max(0.01, effectiveEquityNotional)
            capitalExcess = coreCapitalAdjustedCagr - marketCagr
          }
        }
      }
    } catch {
      // Keep fallback capitalExcess from ETF-vs-core if SPY fetch fails.
    }
  }
  const riskFreeAnnual = averageAnnualYieldInWindow(rf, aligned.firstTs, aligned.lastTs) ?? 0.03

  const patch: MonthlyEfficiencyGradePatch = {}
  const footnotes: string[] = []

  if (monthsHist < 4) {
    if (hasCapital) patch.capital = { grade: 'N/A' }
    if (hasAlpha) patch.alpha = { grade: 'N/A' }
    if (patch.capital || patch.alpha) return { ...patch, footnotes: footnotes.length ? footnotes : undefined }
    return null
  }

  if (monthsHist < 12) {
    footnotes.push(EFFICIENCY_PROVISIONAL_FOOTNOTE)
  }

  if (hasCapital) {
    patch.capital = {
      grade: capitalLetterFromExcess(capitalExcess),
    }
  }

  if (hasAlpha) {
    const alphaBeta = useResidualStackedAlpha && beta != null ? beta - 1 : beta
    let baseScorePp: number
    if (useResidualStackedAlpha) {
      const alphaSleeveReturn = etfCagr - benchmarkCagr
      baseScorePp = (alphaSleeveReturn - (riskFreeAnnual + 0.0175)) * 100
    } else {
      baseScorePp = (etfCagr - riskFreeAnnual) * 100
    }
    const scorePp = alphaScorePpWithBetaBonus(baseScorePp, alphaBeta)
    patch.alpha = {
      grade: alphaLetterFromScorePp(scorePp),
    }
  }

  if (monthsHist < 12) {
    if (patch.capital?.grade) {
      const stepped = downgradeLetterGradeOneStep(patch.capital.grade)
      patch.capital = { grade: capEfficiencyGradeForShortHistory(stepped, 'B+') }
    }
    if (patch.alpha?.grade) {
      const stepped = downgradeLetterGradeOneStep(patch.alpha.grade)
      patch.alpha = { grade: capEfficiencyGradeForShortHistory(stepped, 'B+') }
    }
  }

  if (footnotes.length) patch.footnotes = footnotes
  return patch
}
