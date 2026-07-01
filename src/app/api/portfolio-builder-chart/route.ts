import { NextResponse } from 'next/server'
import { chartErrorResponse, chartJsonResponse } from '@/lib/chartApiHelper'
import { getCachedPortfolioBuilderChart } from '@/lib/getCachedPortfolioBuilderChart'
import { allowChartRequest } from '@/lib/chartRateLimit'
import { clientIp } from '@/lib/rateLimit'
import { isValidTickerSymbol } from '@/lib/tickerSymbol'
import type { YahooRange } from '@/lib/yahooFinance'

const ALLOWED_RANGES: YahooRange[] = ['1mo', 'ytd', '1y', '2y', '3y', '5y', 'max']

const ALLOWED_REBALANCE = ['none', 'quarterly', 'annual'] as const
type RebalanceSchedule = (typeof ALLOWED_REBALANCE)[number]

type BuilderChartRequest = {
  symbols?: string[]
  weights?: number[]
  range?: YahooRange
  edition?: 'us' | 'ca'
  rebalanceSchedule?: RebalanceSchedule
}

function normalizeSymbols(raw: unknown): string[] {
  if (!Array.isArray(raw)) return []
  return raw
    .map((s) => (typeof s === 'string' ? s.trim().toUpperCase() : ''))
    .filter(isValidTickerSymbol)
    .slice(0, 20)
}

function normalizeWeights(raw: unknown, n: number): number[] | null {
  if (!Array.isArray(raw) || raw.length !== n) return null
  const nums = raw.map((x) => (typeof x === 'number' ? x : Number.NaN))
  if (nums.some((x) => !Number.isFinite(x) || x < 0)) return null
  const sum = nums.reduce((a, b) => a + b, 0)
  if (sum <= 0) return null
  return nums.map((x) => x / sum)
}

export async function POST(req: Request) {
  if (!allowChartRequest(clientIp(req))) {
    return NextResponse.json({ error: 'Too many requests. Please slow down.' }, { status: 429 })
  }

  let body: BuilderChartRequest
  try {
    body = (await req.json()) as BuilderChartRequest
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const symbols = normalizeSymbols(body.symbols)
  if (symbols.length < 1) {
    return NextResponse.json({ error: 'Add at least one ETF row.' }, { status: 400 })
  }
  const weights = normalizeWeights(body.weights, symbols.length)
  if (!weights) {
    return NextResponse.json({ error: 'Invalid allocation weights.' }, { status: 400 })
  }

  const range = ALLOWED_RANGES.includes(body.range ?? '1y') ? (body.range ?? '1y') : '1y'
  const cadDenominated = body.edition === 'ca'
  const rebalanceSchedule: RebalanceSchedule =
    ALLOWED_REBALANCE.includes(body.rebalanceSchedule as RebalanceSchedule)
      ? (body.rebalanceSchedule as RebalanceSchedule)
      : 'none'

  try {
    const payload = await getCachedPortfolioBuilderChart({
      symbols,
      weights,
      range,
      cadDenominated,
      rebalanceSchedule,
    })
    return chartJsonResponse(payload)
  } catch (e) {
    return chartErrorResponse(e, 'Failed to load chart data')
  }
}
