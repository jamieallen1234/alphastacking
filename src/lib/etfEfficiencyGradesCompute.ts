import type { EtfDynamicDef, EtfDynamicEfficiencyDef } from '@/lib/etfDynamicRegistryTypes'
import { isAllowedEtfChartSymbol } from '@/lib/etfChartSymbols'
import { EFFICIENCY_PROVISIONAL_FOOTNOTE } from '@/lib/etfEfficiencyTooltipFraming'
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
  if (scorePp >= 10) return 'A+'
  if (scorePp >= 4) return 'A'
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
  if (text.includes('s&p/tsx') || text.includes('tsx')) return 'XIU.TO'
  return 'SPY'
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
  rfShared?: PriceSeries
): Promise<MonthlyEfficiencyGradePatch | null> {
  if (def.monthlyGradeRecompute === false) return null

  const sym = def.yahooSymbol.trim()
  if (!isAllowedEtfChartSymbol(sym)) return null

  const inferred = inferLines(staticEff)
  let hasCapital = inferred.hasCapital
  let hasAlpha = inferred.hasAlpha

  let etf: PriceSeries
  let benchmark: PriceSeries
  let rf: PriceSeries
  try {
    // Grade on live history up to ~5Y with dense daily bars (Yahoo `max` can be sparse).
    etf = await fetchDailySeries(sym, '5y')
    const equityOnlyByCategory = def.hubCategoryId === 'factor' || def.hubCategoryId === 'long-short'
    const stackedByLines = !equityOnlyByCategory && inferred.hasCapital && inferred.hasAlpha
    if (stackedByLines) {
      const benchSymbol = inferStackedEquityBenchmarkSymbol(def)
      benchmark = await fetchDailySeries(benchSymbol, '5y')
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
  const equityOnlyByCategory = def.hubCategoryId === 'factor' || def.hubCategoryId === 'long-short'
  if (equityOnlyByCategory && beta != null) {
    const useAlpha = beta < 0.8
    hasCapital = !useAlpha
    hasAlpha = useAlpha
  }
  const stackedByLines = !equityOnlyByCategory && inferred.hasCapital && inferred.hasAlpha

  const monthsHist = monthsSinceFirstBar(aligned.firstTs, aligned.lastTs)

  const excess = etfCagr - benchmarkCagr
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
      grade: stackedByLines ? 'B' : capitalLetterFromExcess(excess),
    }
  }

  if (hasAlpha) {
    const alphaBeta = stackedByLines && beta != null ? beta - 1 : beta
    const baseScorePp = stackedByLines
      ? (etfCagr - benchmarkCagr - (riskFreeAnnual + 0.0175)) * 100
      : (etfCagr - riskFreeAnnual) * 100
    const scorePp = alphaScorePpWithBetaBonus(baseScorePp, alphaBeta)
    patch.alpha = {
      grade: alphaLetterFromScorePp(scorePp),
    }
  }

  if (footnotes.length) patch.footnotes = footnotes
  return patch
}
