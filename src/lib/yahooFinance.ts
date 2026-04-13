export type YahooRange =
  | '1d'
  | '5d'
  | '1mo'
  | '3mo'
  | '6mo'
  | '1y'
  | '2y'
  | '5y'
  | 'ytd'
  | 'max'

export interface PriceSeries {
  symbol: string
  timestamps: number[]
  /** Adjusted close when available, else regular close */
  prices: number[]
}

const YAHOO_UA =
  'Mozilla/5.0 (compatible; Alphastacking/1.0; +https://github.com/) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

/** Drop bars before `minSec` (unix seconds, inclusive). */
export function clipSeriesFromTime(s: PriceSeries, minSec: number): PriceSeries {
  const timestamps: number[] = []
  const prices: number[] = []
  for (let i = 0; i < s.timestamps.length; i++) {
    if (s.timestamps[i]! >= minSec) {
      timestamps.push(s.timestamps[i]!)
      prices.push(s.prices[i]!)
    }
  }
  return { ...s, timestamps, prices }
}

export async function fetchFirstTradeDateSec(symbol: string): Promise<number> {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
    symbol.trim()
  )}?interval=1d&range=5d`

  const res = await fetch(url, {
    headers: { 'User-Agent': YAHOO_UA, Accept: 'application/json' },
    next: { revalidate: 86400 },
  })

  if (!res.ok) {
    throw new Error(`Yahoo Finance HTTP ${res.status} for ${symbol}`)
  }

  const data: unknown = await res.json()
  const chart = data as {
    chart?: {
      error?: { description?: string }
      result?: Array<{ meta?: { firstTradeDate?: number } }>
    }
  }

  const err = chart.chart?.error?.description
  if (err) throw new Error(err)

  const ft = chart.chart?.result?.[0]?.meta?.firstTradeDate
  if (ft == null || !Number.isFinite(ft)) {
    throw new Error(`No first trade date for ${symbol}`)
  }
  return ft
}

export async function fetchDailySeries(
  symbol: string,
  range: YahooRange
): Promise<PriceSeries> {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
    symbol.trim()
  )}?interval=1d&range=${range}`

  const res = await fetch(url, {
    headers: { 'User-Agent': YAHOO_UA, Accept: 'application/json' },
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    throw new Error(`Yahoo Finance HTTP ${res.status} for ${symbol}`)
  }

  const data: unknown = await res.json()
  const chart = data as {
    chart?: {
      error?: { description?: string }
      result?: Array<{
        timestamp: number[]
        indicators?: {
          adjclose?: Array<{ adjclose?: Array<number | null> }>
          quote?: Array<{ close?: Array<number | null> }>
        }
      }>
    }
  }

  const err = chart.chart?.error?.description
  if (err) throw new Error(err)

  const result = chart.chart?.result?.[0]
  if (!result?.timestamp?.length) {
    throw new Error(`No price data for ${symbol}`)
  }

  const ts = result.timestamp
  const adj = result.indicators?.adjclose?.[0]?.adjclose
  const close = result.indicators?.quote?.[0]?.close

  const prices: number[] = []
  const timestamps: number[] = []

  for (let i = 0; i < ts.length; i++) {
    const p =
      adj?.[i] != null && !Number.isNaN(adj[i]!)
        ? adj[i]!
        : close?.[i] != null && !Number.isNaN(close[i]!)
          ? close[i]!
          : null
    if (p != null && p > 0) {
      timestamps.push(ts[i]!)
      prices.push(p)
    }
  }

  if (!timestamps.length) {
    throw new Error(`No usable closes for ${symbol}`)
  }

  return { symbol, timestamps, prices }
}
