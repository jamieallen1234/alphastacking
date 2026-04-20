/**
 * Yahoo Finance symbols supported by `/api/etf-chart` and `getCachedEtfChart`.
 * Keep in sync with hub listings that have on-site ETF pages.
 */
export const ETF_CHART_SYMBOLS = [
  'BEGS',
  'BTGD',
  'ISBG',
  'ISSB',
  'OOQB',
  'OOSB',
  'RSSX',
  'WTIB',
  'MATE',
  'RSST',
  'RSSY',
  'NTSD',
  'GDE',
  'FLSP',
  'IALT',
  'CAOS',
  'SPMO',
  'VFLO',
  'SASS',
  'AVGV',
  'AVUV',
  'CTA',
  'DBMF',
  'KMLM',
  'CLSE',
  'MRGR',
  'ORR',
  'ASGM',
  'HFGM',
  'RGBM.TO',
  'ONEC.TO',
  'PFAA.TO',
  'ZLB.TO',
  'ATSX.TO',
  'HDGE.TO',
  'PFLS.TO',
  'PFMN.TO',
  'TGAF.TO',
  'DGLM.TO',
  'BTCC-B.TO',
  'ETHX-B.TO',
  'ARB.TO',
] as const

export type EtfChartYahooSymbol = (typeof ETF_CHART_SYMBOLS)[number]

export function isAllowedEtfChartSymbol(s: string): s is EtfChartYahooSymbol {
  return (ETF_CHART_SYMBOLS as readonly string[]).includes(s.toUpperCase())
}
