import { NextResponse } from 'next/server'
import { chartErrorResponse, chartJsonResponse } from '@/lib/chartApiHelper'
import { computePortfolioChart } from '@/lib/computePortfolioChart'
import type { YahooRange } from '@/lib/yahooFinance'

const ALLOWED_RANGES: YahooRange[] = [
  '1mo',
  '3mo',
  '6mo',
  '1y',
  '2y',
  '3y',
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
      {
        error:
          'Invalid weights: use one number per symbol, or omit for equal weight. Percentages like 20,20,20 are OK.',
      },
      { status: 400 }
    )
  }

  try {
    const payload = await computePortfolioChart({ symbols, weights, range })
    return chartJsonResponse(payload, 'public-1h')
  } catch (e) {
    return chartErrorResponse(e, 'Failed to load market data')
  }
}
