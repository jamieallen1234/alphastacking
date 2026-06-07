/**
 * Conservative ticker-symbol validation for user-supplied symbols that flow into
 * outbound market-data fetches. The upstream host is fixed and symbols are passed
 * through `encodeURIComponent`, so this is defense-in-depth: it bounds the outbound
 * fan-out to plausible tickers and keeps junk out of cache keys.
 *
 * Allows letters, digits, and the punctuation real tickers use: `.` (class shares,
 * e.g. `BRK.B`), `-` (preferred shares), `^` (indices), and `=` (FX / futures notation
 * on Yahoo, e.g. `EURUSD=X`). Deliberately excludes `/` so traversal-looking inputs
 * can't pass. Max 12 chars.
 */
const TICKER_RE = /^[A-Z0-9.\-^=]{1,12}$/

export function isValidTickerSymbol(symbol: string): boolean {
  return TICKER_RE.test(symbol)
}
