import { nyTradingDayKey, seriesToNyDayPriceMap } from '@/lib/portfolioMath'
import type { PriceSeries } from '@/lib/yahooFinance'

/** Yahoo FX pair: CAD per 1 USD (adjusted close). */
export const USDCAD_YAHOO_SYMBOL = 'USDCAD=X'

/** CAD-listed, CAD-hedged S&P 500 ETF — benchmark line only for Canadian-denominated portfolio charts. */
export const CAD_SPY_PROXY_SYMBOL = 'XSP.TO'

/** User-facing description of the Canadian equity benchmark used by default. */
export const CAD_SPY_PROXY_LABEL = 'XSP.TO (S&P 500 CAD-hedged)'

/** Unhedged CAD-listed S&P 500 ETF — USSL 1.25× synthetic and related modeling (not the chart benchmark). */
export const CAD_UNHEDGED_SP500_PROXY_SYMBOL = 'VFV.TO'

/** Unhedged CAD-listed Nasdaq-100 ETF — QQQL 1.25× synthetic proxy (BMO Nasdaq 100, inception ~2001, unhedged). */
export const CAD_UNHEDGED_NASDAQ_PROXY_SYMBOL = 'ZQQ.TO'

export function isCadListedSymbol(symbol: string): boolean {
  return /\.(?:TO|NE|V|CN)$/i.test(symbol.trim())
}

export function portfolioBenchmarkLabel(symbol: string): string {
  return symbol.trim().toUpperCase() === CAD_SPY_PROXY_SYMBOL
    ? CAD_SPY_PROXY_LABEL
    : symbol.trim().toUpperCase()
}

/** Express one listing-price series in CAD without adding FX to an already CAD-listed fund. */
export function expressListingPricesInCad(
  symbol: string,
  priceSeries: PriceSeries,
  usdCad: PriceSeries
): PriceSeries {
  return isCadListedSymbol(symbol)
    ? priceSeries
    : convertUsdPricesToCad(priceSeries, usdCad)
}

/** Last NY day in `fxDaysSorted` with key ≤ `day` (ISO YYYY-MM-DD lex order = chronological). */
function cadPerUsdForNyDay(
  fxDaysSorted: string[],
  fxMap: Map<string, number>,
  day: string
): number | null {
  let lo = 0
  let hi = fxDaysSorted.length - 1
  let best = -1
  while (lo <= hi) {
    const mid = (lo + hi) >> 1
    if (fxDaysSorted[mid]! <= day) {
      best = mid
      lo = mid + 1
    } else {
      hi = mid - 1
    }
  }
  if (best < 0) return null
  const v = fxMap.get(fxDaysSorted[best]!)
  return v != null && v > 0 ? v : null
}

/**
 * Notional CAD value of a USD-denominated asset: multiply each close by CAD/USD for that NY day.
 */
export function convertUsdPricesToCad(usSeries: PriceSeries, usdCad: PriceSeries): PriceSeries {
  const fxMap = seriesToNyDayPriceMap(usdCad)
  const fxDays = [...fxMap.keys()].sort()
  const timestamps: number[] = []
  const prices: number[] = []
  for (let i = 0; i < usSeries.timestamps.length; i++) {
    const day = nyTradingDayKey(usSeries.timestamps[i]!)
    const fx = cadPerUsdForNyDay(fxDays, fxMap, day)
    const p = usSeries.prices[i]!
    if (fx != null && p > 0) {
      timestamps.push(usSeries.timestamps[i]!)
      prices.push(p * fx)
    }
  }
  return { symbol: usSeries.symbol, timestamps, prices }
}
