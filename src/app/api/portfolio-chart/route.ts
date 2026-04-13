import { NextResponse } from 'next/server'
import {
  buildBuyAndHoldSeries,
  normalizedBenchmarkSeries,
  totalReturnPercent,
  totalReturnPercentFromValues,
} from '@/lib/portfolioMath'
import {
  clipSeriesFromTime,
  fetchDailySeries,
  fetchFirstTradeDateSec,
  type YahooRange,
} from '@/lib/yahooFinance'

const ALLOWED_RANGES: YahooRange[] = [
  '1mo',
  '3mo',
  '6mo',
  '1y',
  '2y',
  '5y',
  'ytd',
  'max',
]

function parseSymbols(raw: string | null): string[] {
  if (!raw?.trim()) return []
  return raw
    .split(/[,\s]+/)
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean)
    .slice(0, 12)
}

function parseWeights(raw: string | null, n: number): number[] | null {
  if (n <= 0) return null
  if (!raw?.trim()) {
    const w = 1 / n
    return Array.from({ length: n }, () => w)
  }
  const parts = raw.split(/[,\s]+/).filter(Boolean)
  const nums = parts.map((p) => Number.parseFloat(p))
  if (nums.length !== n || nums.some((x) => Number.isNaN(x) || x < 0)) return null
  let sum = nums.reduce((a, b) => a + b, 0)
  if (sum <= 0) return null
  // Treat values > 1 as percentages (e.g. 20, 20, 20)
  if (nums.some((x) => x > 1)) {
    sum = nums.reduce((a, b) => a + b, 0)
    if (sum <= 0) return null
    return nums.map((x) => x / sum)
  }
  return nums.map((x) => x / sum)
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const symbols = parseSymbols(searchParams.get('symbols'))
  if (symbols.length < 2) {
    return NextResponse.json(
      { error: 'Provide at least two comma-separated symbols (e.g. SSO,MATE,ORR,FLSP).' },
      { status: 400 }
    )
  }

  const rangeRaw = (searchParams.get('range') || '1y') as YahooRange
  const range = ALLOWED_RANGES.includes(rangeRaw) ? rangeRaw : '1y'

  const weights = parseWeights(searchParams.get('weights'), symbols.length)
  if (!weights) {
    return NextResponse.json(
      { error: 'Invalid weights: use one number per symbol, or omit for equal weight. Percentages like 20,20,20 are OK.' },
      { status: 400 }
    )
  }

  try {
    const firstTradeSecs = await Promise.all(symbols.map((s) => fetchFirstTradeDateSec(s)))
    const effectiveStartSec = Math.max(...firstTradeSecs)
    const limitingIdx = firstTradeSecs.indexOf(effectiveStartSec)
    const limitingSymbol = symbols[limitingIdx]!

    const [series, spySeries] = await Promise.all([
      Promise.all(symbols.map((s) => fetchDailySeries(s, range))),
      fetchDailySeries('SPY', range),
    ])

    const clipped = series.map((s) => clipSeriesFromTime(s, effectiveStartSec))
    const spyClipped = clipSeriesFromTime(spySeries, effectiveStartSec)

    if (clipped.some((s) => s.timestamps.length < 2)) {
      return NextResponse.json(
        { error: 'Not enough history after the newest holding’s listing date for this range.' },
        { status: 400 }
      )
    }

    const points = buildBuyAndHoldSeries(clipped, weights)
    if (points.length < 2) {
      return NextResponse.json(
        { error: 'Not enough overlapping sessions for this basket and range after inception.' },
        { status: 400 }
      )
    }

    const tr = totalReturnPercent(points)

    const ts = points.map((p) => p.t)
    const benchmarkValues = normalizedBenchmarkSeries(spyClipped, ts)
    if (!benchmarkValues) {
      return NextResponse.json(
        { error: 'Could not align SPY benchmark to portfolio dates.' },
        { status: 502 }
      )
    }
    const benchmarkTotalReturnPercent = totalReturnPercentFromValues(benchmarkValues)

    const firstT = points[0]?.t
    const chartStartDate =
      firstT != null
        ? new Date(firstT * 1000).toLocaleDateString('en-CA', { timeZone: 'America/New_York' })
        : null
    const limitingFirstTradeDate = new Date(effectiveStartSec * 1000).toLocaleDateString(
      'en-CA',
      { timeZone: 'America/New_York' }
    )

    return NextResponse.json(
      {
        symbols,
        weights,
        range,
        timestamps: points.map((p) => p.t),
        values: points.map((p) => p.value),
        totalReturnPercent: tr,
        benchmarkSymbol: 'SPY',
        benchmarkValues,
        benchmarkTotalReturnPercent,
        limitingSymbol,
        limitingFirstTradeDate,
        chartStartDate,
        asOf:
          points.length > 0
            ? new Date(points[points.length - 1]!.t * 1000).toISOString().slice(0, 10)
            : null,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    )
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Failed to load market data'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
