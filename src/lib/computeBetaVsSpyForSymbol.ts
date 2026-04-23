import { isAllowedEtfChartSymbol } from '@/lib/etfChartSymbols'
import { fetchDailySeries, type PriceSeries } from '@/lib/yahooFinance'

/** Align ETF closes to benchmark by UTC day (same logic as efficiency grades). */
function alignedCloseSeries(
  etf: PriceSeries,
  bench: PriceSeries
): { etf: number[]; bench: number[] } | null {
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
  for (let i = 0; i < etf.timestamps.length; i++) {
    const t = etf.timestamps[i]!
    const e = etf.prices[i]!
    const b = benchByTs.get(dayKey(t))
    if (b == null || !Number.isFinite(e) || e <= 0) continue
    etfC.push(e)
    benchC.push(b.px)
  }
  if (etfC.length < 60) return null
  return { etf: etfC, bench: benchC }
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

/**
 * Regression beta of ETF daily returns on SPY (Yahoo `5y`, day-aligned). Prefer 1y chart beta for short listings.
 * Needs ~60 overlapping sessions; prefer chart-parity 1y beta via `getCachedEtfChart` /
 * `portfolioBuilderEtfOptions` for listings with short history.
 */
export async function computeBetaVsSpyForSymbol(
  etfYahooSymbol: string,
  spyShared: PriceSeries
): Promise<number | null> {
  const sym = etfYahooSymbol.trim()
  if (!isAllowedEtfChartSymbol(sym)) return null
  try {
    const etf = await fetchDailySeries(sym, '5y')
    const aligned = alignedCloseSeries(etf, spyShared)
    if (!aligned) return null
    return betaFromAlignedCloses(aligned.etf, aligned.bench)
  } catch {
    return null
  }
}
