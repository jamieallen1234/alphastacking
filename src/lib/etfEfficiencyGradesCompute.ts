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

const SPY_MER_ANNUAL = 0.00094

function parseMerAnnual(mer: string): number {
  const m = mer.match(/([\d.]+)\s*%/)
  if (!m) return 0.002
  const v = parseFloat(m[1])
  return Number.isFinite(v) ? v / 100 : 0.002
}

function alignedCloseSeries(
  etf: PriceSeries,
  spy: PriceSeries
): { etf: number[]; spy: number[]; firstTs: number; lastTs: number } | null {
  const spyByTs = new Map<number, number>()
  for (let i = 0; i < spy.timestamps.length; i++) {
    spyByTs.set(spy.timestamps[i]!, spy.prices[i]!)
  }
  const etfC: number[] = []
  const spyC: number[] = []
  const tsList: number[] = []
  for (let i = 0; i < etf.timestamps.length; i++) {
    const t = etf.timestamps[i]!
    const e = etf.prices[i]!
    const s = spyByTs.get(t)
    if (s == null || !Number.isFinite(e) || !Number.isFinite(s) || e <= 0 || s <= 0) continue
    etfC.push(e)
    spyC.push(s)
    tsList.push(t)
  }
  if (etfC.length < 60 || tsList.length < 2) return null
  return {
    etf: etfC,
    spy: spyC,
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
  if (years < 0.34) return null
  return (last / first) ** (1 / years) - 1
}

function monthsSinceFirstBar(firstTsSec: number, lastTsSec: number): number {
  return (lastTsSec - firstTsSec) / (30.44 * 86400)
}

/** Simplified capital score vs SPY (annual excess vs SPY, net of extra MER vs SPY). */
function capitalLetterFromExcess(etfMinusSpyAnnual: number, merEtf: number): string {
  const scorePp = (etfMinusSpyAnnual - (merEtf - SPY_MER_ANNUAL)) * 100
  if (scorePp >= 10) return 'A+'
  if (scorePp >= 4) return 'A'
  if (scorePp >= -2) return 'B'
  if (scorePp >= -6) return 'C'
  return 'D'
}

/** Unstacked alpha: annual return net of MER vs ~4.5% hurdle (skill §3, blended RF). */
function alphaLetterUnstacked(etfCagr: number, merEtf: number): string {
  const net = etfCagr - merEtf
  const scorePp = (net - 0.045) * 100
  if (scorePp >= 8) return 'A+'
  if (scorePp >= 4) return 'A'
  if (scorePp >= 1) return 'B'
  if (scorePp >= -1) return 'C'
  return 'D'
}

/**
 * Stacked alpha sleeve (very rough): fund CAGR minus SPY proxy for equity leg,
 * minus stacked hurdle ~ RF + borrow (~6.25% annual).
 */
function alphaLetterStackedProxy(etfCagr: number, spyCagr: number, merEtf: number): string {
  const sleeveNet = etfCagr - spyCagr - merEtf * 0.5
  const scorePp = (sleeveNet - 0.0625) * 100
  if (scorePp >= 8) return 'A+'
  if (scorePp >= 4) return 'A'
  if (scorePp >= 1) return 'B'
  if (scorePp >= -1) return 'C'
  return 'D'
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
  spyShared?: PriceSeries
): Promise<MonthlyEfficiencyGradePatch | null> {
  if (def.monthlyGradeRecompute === false) return null

  const sym = def.yahooSymbol.trim()
  if (!isAllowedEtfChartSymbol(sym)) return null

  const { hasCapital, hasAlpha } = inferLines(staticEff)

  let etf: PriceSeries
  let spy: PriceSeries
  try {
    etf = await fetchDailySeries(sym, 'max')
    spy = spyShared ?? (await fetchDailySeries('SPY', 'max'))
  } catch {
    return null
  }

  const aligned = alignedCloseSeries(etf, spy)
  if (!aligned) return null

  const n = aligned.etf.length
  const intervals = n - 1
  const etfCagr = cagrFromCloses(aligned.etf, intervals)
  const spyCagr = cagrFromCloses(aligned.spy, intervals)
  if (etfCagr == null || spyCagr == null) return null

  const monthsHist = monthsSinceFirstBar(aligned.firstTs, aligned.lastTs)

  const mer = parseMerAnnual(def.mer)
  const excess = etfCagr - spyCagr

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

  const bothRows = hasCapital && hasAlpha

  if (hasCapital) {
    patch.capital = { grade: capitalLetterFromExcess(excess, mer) }
  }

  if (hasAlpha) {
    patch.alpha = {
      grade: bothRows ? alphaLetterStackedProxy(etfCagr, spyCagr, mer) : alphaLetterUnstacked(etfCagr, mer),
    }
  }

  if (footnotes.length) patch.footnotes = footnotes
  return patch
}
