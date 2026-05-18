import { dayKeyToUtcNoonUnix, seriesToNyDayPriceMap } from '@/lib/portfolioMath'
import { fetchFirstTradeDateSec } from '@/lib/yahooFinance'
import type { PriceSeries } from '@/lib/yahooFinance'

export interface BlendedSyntheticComponent {
  /** Yahoo symbol used only to fetch the first-trade timestamp for overlap detection. */
  symbol: string
  /** Daily price series for the component (Yahoo adjusted close). */
  series: PriceSeries
  /** Daily-return weight applied in the pre-listing blend (e.g. 0.5 for a 50/50, 0.9 for 90/60). */
  weight: number
}

export interface BlendedSyntheticArgs {
  /** The fund being synthesized. Pre-listing days use the blend; from `firstReal` onward, real closes. */
  target: PriceSeries
  components: BlendedSyntheticComponent[]
  /** Annualized drag applied to each daily blended return (default 0). Converted to `drag/252` per session. */
  annualDrag?: number
}

export interface BlendedSyntheticResult {
  series: PriceSeries
  /** Present when any chart day used the blended proxy before real closes. */
  modeling: { firstRealNyDay: string } | null
}

/** Joint overlap day across all component first-trade timestamps. */
export async function blendedSyntheticOverlapFirstTradeSec(symbols: string[]): Promise<number> {
  const ts = await Promise.all(symbols.map(fetchFirstTradeDateSec))
  return Math.max(...ts)
}

/**
 * Pre–first-real-target: chained daily returns Σ(weight_i × r_i) − annualDrag/252 on common NY sessions.
 * From the first overlapping real target session onward: actual target closes, continuous at the anchor.
 */
export function buildBlendedSyntheticSeries({
  target,
  components,
  annualDrag = 0,
}: BlendedSyntheticArgs): BlendedSyntheticResult {
  if (components.length === 0) {
    throw new Error('buildBlendedSyntheticSeries: at least one component is required')
  }
  const componentMaps = components.map((c) => seriesToNyDayPriceMap(c.series))
  const targetMap = seriesToNyDayPriceMap(target)

  const inter = [...componentMaps[0]!.keys()]
    .filter((d) => componentMaps.every((m) => m.has(d)))
    .sort()
  if (inter.length === 0) {
    throw new Error(`No component overlap for ${target.symbol} synthetic merge`)
  }

  const targetOnCommon = inter.filter((d) => targetMap.has(d)).sort()
  if (targetOnCommon.length === 0) {
    throw new Error(`No ${target.symbol} sessions overlapping components for merge`)
  }

  const firstReal = targetOnCommon[0]!
  const preDays = inter.filter((d) => d < firstReal)
  const dragDaily = annualDrag / 252

  if (preDays.length === 0) {
    return { series: target, modeling: null }
  }

  const filledTarget = forwardFillTargetOnDays(inter, targetMap, firstReal)
  const rFirst = filledTarget.get(firstReal)
  if (rFirst == null || rFirst <= 0) {
    throw new Error(`Invalid ${target.symbol} price on first real overlap day`)
  }

  const mergedMap = new Map<string, number>()
  let syn = 100

  for (let i = 0; i < preDays.length; i++) {
    const d = preDays[i]!
    if (i > 0) {
      const prev = preDays[i - 1]!
      syn *= 1 + blendedReturn(componentMaps, components, prev, d, dragDaily)
    }
    mergedMap.set(d, syn)
  }

  const synBeforeReal = syn

  const postDays = inter.filter((d) => d >= firstReal)
  for (const d of postDays) {
    const r = filledTarget.get(d)
    if (r == null || r <= 0) continue
    mergedMap.set(d, synBeforeReal * (r / rFirst))
  }

  const sortedKeys = [...mergedMap.keys()].sort()
  const timestamps: number[] = []
  const prices: number[] = []
  for (const d of sortedKeys) {
    const p = mergedMap.get(d)
    if (p != null && p > 0) {
      timestamps.push(dayKeyToUtcNoonUnix(d))
      prices.push(p)
    }
  }

  if (timestamps.length < 2) {
    throw new Error(`Merged ${target.symbol} series has insufficient points`)
  }

  return {
    series: { symbol: target.symbol, timestamps, prices },
    modeling: { firstRealNyDay: firstReal },
  }
}

function blendedReturn(
  componentMaps: Map<string, number>[],
  components: BlendedSyntheticComponent[],
  prevDay: string,
  day: string,
  dragDaily: number
): number {
  let acc = 0
  for (let i = 0; i < componentMaps.length; i++) {
    const m = componentMaps[i]!
    const p0 = m.get(prevDay)!
    const p1 = m.get(day)!
    if (p0 <= 0) return 0
    acc += components[i]!.weight * (p1 / p0 - 1)
  }
  return acc - dragDaily
}

function forwardFillTargetOnDays(
  interSorted: string[],
  targetM: Map<string, number>,
  firstReal: string
): Map<string, number> {
  const out = new Map<string, number>()
  let last: number | null = null
  for (const d of interSorted) {
    const v = targetM.get(d)
    if (v != null && v > 0) last = v
    if (d >= firstReal) {
      if (last != null) out.set(d, last)
    }
  }
  return out
}
