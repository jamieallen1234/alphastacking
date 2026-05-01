/** ETF hub groupings. US uses split return-stacked rows; CA collapses those into one "Return Stacked" section (see `getEtfHubCategoryRows`). */
export const ETF_CATEGORY_ROWS = [
  {
    id: 'return-stacked-ge-2x',
    title: 'Return Stacked — 2×',
    subtitle:
      'Funds that hold roughly 1× equity and 1× an alternative sleeve (managed futures, macro, commodities) on the same dollar, using futures or swaps.',
  },
  {
    id: 'return-stacked-lt-2x',
    title: 'Return Stacked — Lower Leverage',
    subtitle:
      'Similar to the 2× category but with a smaller alternative overlay relative to the equity sleeve — total notional is between 1× and 2×.',
  },
  {
    id: 'premia-systematic-alternatives',
    title: 'Premia and systematic alternatives',
    subtitle:
      'Rules-based funds that harvest persistent return factors — value, carry, momentum, quality — across many markets simultaneously.',
  },
  {
    id: 'factor',
    title: 'Factor',
    subtitle:
      'Equity ETFs that tilt toward specific stock characteristics — momentum, value, quality, small-cap — that have historically outperformed the broad market over long periods.',
  },
  {
    id: 'managed-futures',
    title: 'Managed futures',
    subtitle:
      'Trend-following funds that go long or short across equities, bonds, currencies, and commodities based on which direction prices are moving.',
  },
  {
    id: 'long-short',
    title: 'Long/short',
    subtitle:
      'Funds that hold long positions in stocks they expect to outperform and short positions in stocks they expect to underperform.',
  },
  {
    id: 'global-macro',
    title: 'Global macro',
    subtitle:
      'Funds that take positions across currencies, interest rates, equities, and commodities based on macroeconomic themes and regime analysis.',
  },
  {
    id: 'arbitrage',
    title: 'Arbitrage',
    subtitle:
      'Merger arbitrage funds buy companies that have announced acquisition deals and short the acquirer, capturing the spread between the current stock price and the deal price. Returns are driven by deal completion rates and timelines, with low correlation to broad equity moves.',
  },
  {
    id: 'leveraged-equity',
    title: 'Leveraged equity ETFs',
    subtitle:
      'Daily-resetting funds that deliver 2× or 3× the daily return of a broad equity index. They amplify both gains and losses, and volatility drag means long-term returns don\'t simply scale with the multiple.',
  },
  {
    id: 'crypto',
    title: 'Crypto & digital assets',
    subtitle:
      'ETFs providing exposure to bitcoin, ethereum, or a basket of digital assets.',
  },
] as const

export type EtfCategoryRow = { id: string; title: string; subtitle?: string }

/** Hub section list: US keeps "Return Stacked - 2x" and "Lower Leverage"; CA shows a single Return Stacked block. */
export function getEtfHubCategoryRows(variant: 'us' | 'ca'): EtfCategoryRow[] {
  if (variant === 'us') {
    return ETF_CATEGORY_ROWS.map((r) => ({ id: r.id, title: r.title, subtitle: r.subtitle }))
  }
  return [
    {
      id: 'return-stacked',
      title: 'Return Stacked',
      subtitle:
        'Funds that hold an equity sleeve and an alternative sleeve (managed futures, macro, commodities) simultaneously on the same capital, using futures or swaps. You keep the full equity position and add a diversifying return source on top.',
    },
    ...ETF_CATEGORY_ROWS.filter(
      (r) =>
        r.id !== 'return-stacked-ge-2x' &&
        r.id !== 'return-stacked-lt-2x' &&
        r.id !== 'managed-futures'
    ).map((r) => ({ id: r.id, title: r.title, subtitle: r.subtitle })),
  ]
}
