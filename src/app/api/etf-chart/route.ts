import { NextResponse } from 'next/server'
import { getCachedHdgeChart, getCachedMateChart } from '@/lib/getCachedEtfChart'
import type { YahooRange } from '@/lib/yahooFinance'

const ALLOWED: YahooRange[] = ['1mo', 'ytd', '1y', '2y', '5y', 'max']

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const symbol = (searchParams.get('symbol') || '').toUpperCase()
  const rangeRaw = (searchParams.get('range') || '1y') as YahooRange
  const range = ALLOWED.includes(rangeRaw) ? rangeRaw : '1y'

  try {
    if (symbol === 'HDGE.TO') {
      return NextResponse.json(await getCachedHdgeChart(range), {
        headers: { 'Cache-Control': 'private, no-store' },
      })
    }
    if (symbol === 'MATE') {
      return NextResponse.json(await getCachedMateChart(range), {
        headers: { 'Cache-Control': 'private, no-store' },
      })
    }
    return NextResponse.json({ error: 'Unsupported symbol.' }, { status: 400 })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Failed to load ETF chart'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
