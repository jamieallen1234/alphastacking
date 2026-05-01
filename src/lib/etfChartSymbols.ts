/**
 * Yahoo Finance symbols supported by `/api/etf-chart` and `getCachedEtfChart`.
 * Keep in sync with hub listings that have on-site ETF pages.
 */
export const ETF_CHART_SYMBOLS = [
  'BEGS',
  'BTGD',
  'OOQB',
  'OOSB',
  'RSSX',
  'WTIB',
  'MATE',
  'RSST',
  'RSSY',
  'NTSD',
  'GDE',
  'GDMN',
  'FLSP',
  'IALT',
  'CAOS',
  'ATTR',
  'SSO',
  'UPRO',
  'QLD',
  'TQQQ',
  'SPMO',
  'VFLO',
  'SASS',
  'AVUV',
  'CTA',
  'DBMF',
  'KMLM',
  'CLSE',
  'MRGR',
  'ORR',
  'ASGM',
  'HFGM',
  'HSU.TO',
  'HQU.TO',
  'USSL.TO',
  'QQQL.TO',
  'HEQL.TO',
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
