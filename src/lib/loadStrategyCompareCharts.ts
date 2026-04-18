import { unstable_cache } from 'next/cache'
import { allPortfolioPresetSymbols } from '@/lib/allPortfolioPresetSymbols'
import type { PortfolioChartPayload } from '@/lib/computePortfolioChart'
import { computePortfolioChart } from '@/lib/computePortfolioChart'
import type { YahooRange } from '@/lib/yahooFinance'

const DAY = 86400

export type StrategyCompareSlot =
  | { ok: true; id: string; heading: string; portfolioLabel: string; payload: PortfolioChartPayload }
  | { ok: false; id: string; heading: string; portfolioLabel: string; message: string }

function assertNotInPresetPortfolios(yahooSymbol: string): void {
  const blocked = allPortfolioPresetSymbols()
  const u = yahooSymbol.trim().toUpperCase()
  if (blocked.has(u)) {
    throw new Error(`Strategy compare chart uses ${u}, which is in a site preset portfolio`)
  }
}

async function etfVsSpySlot(
  id: string,
  heading: string,
  portfolioLabel: string,
  yahooSymbol: string,
  range: YahooRange
): Promise<StrategyCompareSlot> {
  try {
    assertNotInPresetPortfolios(yahooSymbol)
    const payload = await computePortfolioChart({
      symbols: [yahooSymbol, 'SPY'],
      weights: [1, 0],
      range,
    })
    return { ok: true, id, heading, portfolioLabel, payload }
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Failed to load chart'
    return { ok: false, id, heading, portfolioLabel, message }
  }
}

async function basketVsSpySlot(
  id: string,
  heading: string,
  portfolioLabel: string,
  symbols: string[],
  weights: number[],
  range: YahooRange
): Promise<StrategyCompareSlot> {
  try {
    for (const s of symbols) {
      assertNotInPresetPortfolios(s)
    }
    const payload = await computePortfolioChart({ symbols, weights, range })
    return { ok: true, id, heading, portfolioLabel, payload }
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Failed to load chart'
    return { ok: false, id, heading, portfolioLabel, message }
  }
}

/** Five-year (default) buy-and-hold vs SPY for strategy comparison page. */
export async function loadStrategyCompareCharts(
  range: YahooRange = '5y'
): Promise<{
  returnStacking: StrategyCompareSlot[]
  allWeather: StrategyCompareSlot[]
  managedFutures: StrategyCompareSlot[]
  traditional6040: StrategyCompareSlot[]
  btalTail: StrategyCompareSlot[]
}> {
  // Tickers must not appear in any preset portfolio (see allPortfolioPresetSymbols).
  // Return Stacked® + WisdomTree Efficient Core: avoids GDE (often strong vs SPY) and other
  // stacked tickers that may lead SPY in some windows—NTSI/NTSE usually trail US beta in rallies.
  const [rsby, rssb, ntsx, ntsi, ntse, rpar, allw, dbmf, kmlm, classic6040, btal, tail] =
    await Promise.all([
      etfVsSpySlot(
        'rsby',
        'RSBY — Return Stacked®: U.S. large-cap equity plus a bitcoin-linked yield sleeve (one ticker).',
        'RSBY',
        'RSBY',
        range
      ),
      etfVsSpySlot(
        'rssb',
        'RSSB — Return Stacked®: U.S. equity beta plus a bond / income-futures sleeve.',
        'RSSB',
        'RSSB',
        range
      ),
      etfVsSpySlot(
        'ntsx',
        'NTSX — WisdomTree U.S. Efficient Core: equities plus a Treasury futures overlay (~90/60-style notional).',
        'NTSX',
        'NTSX',
        range
      ),
      etfVsSpySlot(
        'ntsi',
        'NTSI — WisdomTree International Efficient Core: developed non-U.S. equities plus futures overlay.',
        'NTSI',
        'NTSI',
        range
      ),
      etfVsSpySlot(
        'ntse',
        'NTSE — WisdomTree Emerging Markets Efficient Core: EM equities plus futures overlay.',
        'NTSE',
        'NTSE',
        range
      ),
      etfVsSpySlot(
        'rpar',
        'RPAR — Risk-parity ETF: stocks, bonds, and commodities in a volatility-balanced mix.',
        'RPAR',
        'RPAR',
        range
      ),
      etfVsSpySlot(
        'allw',
        'ALLW — Multi-asset “all weather”–style stock / bond / alternatives allocation (rules in prospectus).',
        'ALLW',
        'ALLW',
        range
      ),
      etfVsSpySlot(
        'dbmf',
        'DBMF — Managed futures: seeks CTA / trend-fund–like exposures via liquid futures (iMGP / DBi).',
        'DBMF',
        'DBMF',
        range
      ),
      etfVsSpySlot(
        'kmlm',
        'KMLM — Managed futures: tracks the KFA Mount Lucas systematic trend index (KraneShares).',
        'KMLM',
        'KMLM',
        range
      ),
      basketVsSpySlot(
        'vti-bnd',
        '60/40 proxy — 60% Vanguard Total Stock Market (VTI) + 40% U.S. aggregate bonds (BND), rebalanced only at inception here.',
        '60% VTI / 40% BND',
        ['VTI', 'BND'],
        [0.6, 0.4],
        range
      ),
      etfVsSpySlot(
        'btal',
        'BTAL — Anti-beta: long lower-beta U.S. stocks, short higher-beta U.S. stocks (market-neutral sleeve).',
        'BTAL',
        'BTAL',
        range
      ),
      etfVsSpySlot(
        'tail',
        'TAIL — Tail risk: mostly Treasuries plus long-dated, deep out-of-the-money S&P 500 puts (convexity sleeve).',
        'TAIL',
        'TAIL',
        range
      ),
    ])

  return {
    returnStacking: [rsby, rssb, ntsx, ntsi, ntse],
    allWeather: [rpar, allw],
    managedFutures: [dbmf, kmlm],
    traditional6040: [classic6040],
    btalTail: [btal, tail],
  }
}

/** Cached Yahoo pulls for the strategy comparison page (same 5y window for every chart). */
export const getCachedStrategyCompareCharts = unstable_cache(
  async () => loadStrategyCompareCharts('5y'),
  ['strategy-compare-charts', '5y', 'v10-chart-headers'],
  { revalidate: DAY }
)
