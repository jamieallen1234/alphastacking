/** ETF hub groupings. US uses split return-stacked rows; CA collapses those into one “Return Stacked” section (see `getEtfHubCategoryRows`). */
export const ETF_CATEGORY_ROWS = [
  { id: 'return-stacked-ge-2x', title: 'Return Stacked - 2x' },
  { id: 'return-stacked-lt-2x', title: 'Return Stacked - Lower Leverage' },
  { id: 'premia-systematic-alternatives', title: 'Premia and systematic alternatives' },
  { id: 'factor', title: 'Factor' },
  { id: 'managed-futures', title: 'Managed futures' },
  { id: 'long-short', title: 'Long/short' },
  { id: 'global-macro', title: 'Global macro' },
  { id: 'arbitrage', title: 'Arbitrage' },
  { id: 'leveraged-equity', title: 'Leveraged equity ETFs (advanced)' },
  { id: 'crypto', title: 'Crypto & digital assets' },
] as const

export type EtfCategoryRow = { id: string; title: string }

/** Hub section list: US keeps “Return Stacked - 2x” and “Lower Leverage”; CA shows a single Return Stacked block. */
export function getEtfHubCategoryRows(variant: 'us' | 'ca'): EtfCategoryRow[] {
  if (variant === 'us') {
    return ETF_CATEGORY_ROWS.map((r) => ({ id: r.id, title: r.title }))
  }
  return [
    { id: 'return-stacked', title: 'Return Stacked' },
    ...ETF_CATEGORY_ROWS.filter(
      (r) =>
        r.id !== 'return-stacked-ge-2x' &&
        r.id !== 'return-stacked-lt-2x' &&
        r.id !== 'managed-futures'
    ).map((r) => ({ id: r.id, title: r.title })),
  ]
}
