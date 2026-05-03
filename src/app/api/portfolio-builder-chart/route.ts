import { NextResponse } from 'next/server'
import { getCachedPortfolioBuilderChart } from '@/lib/getCachedPortfolioBuilderChart'
import type { YahooRange } from '@/lib/yahooFinance'

const ALLOWED_RANGES: YahooRange[] = ['1mo', 'ytd', '1y', '2y', '3y', '5y', 'max']

type BuilderChartRequest = {
  symbols?: string[]
  weights?: number[]
  range?: YahooRange
  edition?: 'us' | 'ca'
}

function normalizeSymbols(raw: unknown): string[] {
  if (!Array.isArray(raw)) return []
  return raw
    .map((s) => (typeof s === 'string' ? s.trim().toUpperCase() : ''))
    .filter(Boolean)
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

  try {
    const payload = await getCachedPortfolioBuilderChart({
      symbols,
      weights,
      range,
      cadDenominated,
    })
    return NextResponse.json(payload, {
      headers: {
        'Cache-Control': 'private, no-store',
      },
    })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Failed to load chart data'
    const lower = message.toLowerCase()
    const status = lower.includes('not enough') || lower.includes('at least') ? 400 : 502
    return NextResponse.json({ error: message }, { status })
  }
}

