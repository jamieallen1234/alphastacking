import { NextResponse } from 'next/server'
import { chartErrorResponse, chartJsonResponse } from '@/lib/chartApiHelper'
import { getCachedEtfChart } from '@/lib/getCachedEtfChart'
import { isAllowedEtfChartSymbol } from '@/lib/etfChartSymbols'
import type { YahooRange } from '@/lib/yahooFinance'

const ALLOWED: YahooRange[] = ['1mo', 'ytd', '1y', '2y', '3y', '5y', 'max']

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const symbol = (searchParams.get('symbol') || '').toUpperCase()
  const rangeRaw = (searchParams.get('range') || '1y') as YahooRange
  const range = ALLOWED.includes(rangeRaw) ? rangeRaw : '1y'

  if (!isAllowedEtfChartSymbol(symbol)) {
    return NextResponse.json({ error: 'Unsupported symbol.' }, { status: 400 })
  }

  try {
    const data = await getCachedEtfChart(symbol, range)
    return chartJsonResponse(data)
  } catch (e) {
    return chartErrorResponse(e, 'Failed to load ETF chart', { mapBadInput: false })
  }
}
