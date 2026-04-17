import { ETF_CATEGORY_ROWS } from '@/lib/etfCategories'

export type EtfHubCategoryId = (typeof ETF_CATEGORY_ROWS)[number]['id']

export type EtfHubListItem = {
  /** Stable key for React lists */
  key: string
  /** First line: `TICKER — Legal / marketing name` */
  nameLine: string
  /** One-line strategy blurb */
  desc: string
  /** On-site write-up path (`/us-etfs/...` or `/ca/etfs/...`) */
  href: string
}

function us(
  key: string,
  nameLine: string,
  desc: string,
  href: string
): EtfHubListItem {
  return { key, nameLine, desc, href }
}

function ca(
  key: string,
  nameLine: string,
  desc: string,
  href: string
): EtfHubListItem {
  return { key, nameLine, desc, href }
}

/** Resolve hub ETF rows; CA merges the two US return-stacked buckets under `return-stacked`. */
export function getEtfHubItems(variant: 'us' | 'ca', categoryId: string): EtfHubListItem[] {
  if (variant === 'ca' && categoryId === 'return-stacked') {
    return [
      ...ETF_HUB_CA['return-stacked-ge-2x'],
      ...ETF_HUB_CA['return-stacked-lt-2x'],
    ]
  }
  const table = variant === 'ca' ? ETF_HUB_CA : ETF_HUB_US
  return table[categoryId as keyof typeof table] ?? []
}

const usPath = (key: string) => `/us-etfs/${key}`
const caPath = (key: string) => `/ca/etfs/${key}`

/** US-listed crypto / digital sleeves (US hub only; CA hub shows “Coming soon” under the same heading) */
const CRYPTO_HUB_LIST: EtfHubListItem[] = [
  us(
    'begs',
    'BEGS — Rareview 2x Bull Cryptocurrency & Precious Metals ETF',
    'Leveraged long exposure to a blended crypto and precious-metals sleeve (Rareview).',
    usPath('begs')
  ),
  us(
    'btgd',
    'BTGD — STKd 100% Bitcoin & 100% Gold ETF',
    'Stacked ~100% bitcoin and ~100% gold exposure via futures and ETPs (Quantify STKd).',
    usPath('btgd')
  ),
  us(
    'isbg',
    'ISBG — IncomeSTKd 1x Bitcoin & 1x Gold Premium ETF',
    'Dual beta to bitcoin and gold with options-income overlay; weekly distribution focus (Quantify).',
    usPath('isbg')
  ),
  us(
    'issb',
    'ISSB — IncomeSTKd 1x US Stocks & 1x Bitcoin Premium ETF',
    'Large-cap U.S. equity plus bitcoin beta with premium options sleeve; weekly income tilt (Quantify).',
    usPath('issb')
  ),
  us(
    'ooqb',
    'OOQB — One+One™ Nasdaq-100® and Bitcoin ETF',
    'Volatility Shares: ~100% Nasdaq-100 and ~100% bitcoin futures exposure in one capital-efficient sleeve (listed as OOQB; often discussed as “QQQ + BTC”).',
    usPath('ooqb')
  ),
  us(
    'oosb',
    'OOSB — One+One™ S&P 500® and Bitcoin ETF',
    'Volatility Shares: ~100% S&P 500 and ~100% bitcoin futures—dual exposure similar to OOQB’s structure.',
    usPath('oosb')
  ),
  us(
    'rssx',
    'RSSX — Return Stacked U.S. Stocks & Gold/Bitcoin ETF',
    'Return Stacked® line: large-cap U.S. equity stacked with gold and bitcoin sleeves.',
    usPath('rssx')
  ),
  us(
    'wtib',
    'WTIB — USCF Oil Plus Bitcoin Strategy Fund',
    'Actively managed crude oil and bitcoin futures/ETP exposure with roughly balanced notional sleeves.',
    usPath('wtib')
  ),
]

/** US-listed ETFs shown on `/` (US) ETF hub */
export const ETF_HUB_US: Record<EtfHubCategoryId, EtfHubListItem[]> = {
  'return-stacked-ge-2x': [
    us(
      'mate',
      'MATE — Man Active Trend Enhanced ETF',
      '100% S&P 500 beta stacked with 100% trend-following managed futures.',
      '/us-etfs/mate'
    ),
    us(
      'rsst',
      'RSST — Return Stacked U.S. Stocks & Managed Futures ETF',
      'For each $1 invested, ~$1 large-cap U.S. equity and ~$1 systematic managed futures (trend) exposure.',
      usPath('rsst')
    ),
    us(
      'rssy',
      'RSSY — Return Stacked U.S. Stocks & Futures Yield ETF',
      'Large-cap U.S. equity stacked with a systematic futures yield (carry) sleeve.',
      '/us-etfs/rssy'
    ),
  ],
  'return-stacked-lt-2x': [
    us(
      'ntsd',
      'NTSD — WisdomTree Efficient U.S. Plus International Equity Fund',
      'Capital-efficient 90/60 sleeve: U.S. large-cap equities plus developed international equity index futures.',
      usPath('ntsd')
    ),
    us(
      'gde',
      'GDE — WisdomTree Efficient Gold Plus Equity Strategy Fund',
      'Capital-efficient sleeve: large-cap U.S. equities with a layered gold futures overlay (~90/90 notional).',
      usPath('gde')
    ),
  ],
  'premia-systematic-alternatives': [
    us(
      'flsp',
      'FLSP — Franklin Systematic Style Premia ETF',
      'Active style premia and multi-asset long/short sleeves targeting absolute return.',
      usPath('flsp')
    ),
    us(
      'ialt',
      'IALT — iShares Systematic Alternatives Active ETF',
      'BlackRock iShares actively managed multi-strategy systematic alternatives.',
      usPath('ialt')
    ),
    us(
      'caos',
      'CAOS — Alpha Architect Tail Risk ETF',
      'S&P 500 option structures designed as a tail-risk / convexity sleeve alongside equity beta.',
      usPath('caos')
    ),
  ],
  factor: [
    us(
      'spmo',
      'SPMO — Invesco S&P 500 Momentum ETF',
      'Tracks the S&P 500 Momentum Index—large-cap U.S. names with stronger risk-adjusted momentum scores.',
      usPath('spmo')
    ),
    us(
      'vflo',
      'VFLO — VictoryShares Free Cash Flow ETF',
      'Large-cap U.S. cash-cows sleeve: rules-based free-cash-flow yield vs. a broad large/mid benchmark.',
      usPath('vflo')
    ),
    us(
      'avuv',
      'AVUV — Avantis U.S. Small Cap Value ETF',
      'Actively managed U.S. small-cap value: profitability, value, and investment discipline vs. Russell 2000 Value.',
      usPath('avuv')
    ),
  ],
  'managed-futures': [
    us(
      'cta',
      'CTA — Simplify Managed Futures Strategy ETF',
      'Systematic futures sleeve (Altis models) across equities, rates, commodities, and FX—low equity correlation.',
      usPath('cta')
    ),
    us(
      'dbmf',
      'DBMF — iMGP DBi Managed Futures Strategy ETF',
      'Seeks to replicate pre-fee managed-futures hedge fund exposures (SG CTA / factor approach) in an ETF wrapper.',
      usPath('dbmf')
    ),
    us(
      'kmlm',
      'KMLM — KraneShares Mount Lucas Managed Futures Index Strategy ETF',
      'Rules-based trend following on the KFA MLM Index—commodity, currency, and global bond futures.',
      usPath('kmlm')
    ),
  ],
  'long-short': [
    us(
      'clse',
      'CLSE — Convergence Long/Short Equity ETF',
      'Actively managed long/short U.S. equity (Convergence Investment Partners).',
      usPath('clse')
    ),
    us(
      'orr',
      'ORR — Militia Long/Short Equity ETF',
      'Higher-turnover fundamental long/short global equity (Militia Investments).',
      usPath('orr')
    ),
  ],
  'global-macro': [
    us(
      'asgm',
      'ASGM — Virtus AlphaSimplex Global Macro ETF',
      'Systematic global macro: equity sleeves plus futures across rates, currencies, and commodities.',
      usPath('asgm')
    ),
    us(
      'hfgm',
      'HFGM — Unlimited HFGM Global Macro ETF',
      'Active global macro sleeve targeting hedge-fund-sector return dynamics with ETFs and futures.',
      '/us-etfs/hfgm'
    ),
  ],
  arbitrage: [
    us(
      'mrgr',
      'MRGR — ProShares Merger ETF',
      'Rules-based exposure to the S&P Merger Arbitrage Index—liquid listed sleeve for announced M&A spreads.',
      usPath('mrgr')
    ),
  ],
  crypto: CRYPTO_HUB_LIST,
}

/** Canadian-listed ETFs shown on `/ca` ETF hub */
export const ETF_HUB_CA: Record<EtfHubCategoryId, EtfHubListItem[]> = {
  'return-stacked-ge-2x': [
    ca(
      'rgbm',
      'RGBM.TO — Return Stacked® Global Balanced & Macro ETF',
      'Canadian Return Stacked® line: ~$1 global balanced sleeve plus ~$1 systematic macro per dollar (USD share class RGBM.U).',
      caPath('rgbm')
    ),
  ],
  'return-stacked-lt-2x': [],
  'premia-systematic-alternatives': [
    ca(
      'onec',
      'ONEC.TO — Accelerate OneChoice Alternative Multi-Asset Fund',
      'Single-ticket mix of alt sleeves—absolute return, credit, real assets, macro, and directional long/short equity.',
      caPath('onec')
    ),
    ca(
      'pfaa',
      'PFAA.TO — Picton Multi-Strategy Alpha Alternative Fund ETF',
      'Picton Mahoney multi-strategy alpha alternatives in an ETF structure.',
      caPath('pfaa')
    ),
  ],
  factor: [
    ca(
      'zlb',
      'ZLB.TO — BMO Low Volatility Canadian Equity ETF',
      'Rules-based Canadian equity sleeve tilted toward historically lower-beta names (low-volatility factor).',
      caPath('zlb')
    ),
  ],
  'managed-futures': [],
  'long-short': [
    ca(
      'atsx',
      'ATSX.TO — Accelerate Canadian Long Short Equity Fund',
      'Quantitative 150/50 Canadian long/short equity vs. S&P/TSX 60—directional hedge-fund-style ETF.',
      caPath('atsx')
    ),
    ca(
      'hdge',
      'HDGE.TO — Accelerate Absolute Return Fund',
      'Quantitative long/short North American equity strategy in an ETF wrapper.',
      '/ca/etfs/hdge'
    ),
    ca(
      'pfls',
      'PFLS.TO — Picton Mahoney Fortified Long Short Alternative Fund ETF',
      'Global long/short equity with moderate net equity exposure—Authentic Hedge®-style process.',
      caPath('pfls')
    ),
    ca(
      'pfmn',
      'PFMN.TO — Picton Mahoney Fortified Market Neutral Alternative Fund ETF',
      'Actively managed market-neutral long/short equity—Authentic Hedge® style in an ETF.',
      '/ca/etfs/pfmn'
    ),
    ca(
      'tgaf',
      'TGAF.TO — Tralucent Global Alt (Long/Short) Equity Fund ETF',
      'Global long/short equity (~100% long / ~40% short) across 200+ names—active alt sleeve vs. MSCI ACWI NR (CAD).',
      caPath('tgaf')
    ),
  ],
  'global-macro': [
    ca(
      'dglm',
      'DGLM.TO — Desjardins Global Macro ETF',
      'Alternative ETF: long/short global macro across equities, rates, commodities, and currencies (Graham Capital sub-advisor).',
      caPath('dglm')
    ),
  ],
  arbitrage: [
    ca(
      'arb',
      'ARB.TO — Accelerate Arbitrage Fund',
      'Merger and SPAC arbitrage—targets and acquirers—with a low-volatility, event-driven profile.',
      '/ca/etfs/arb'
    ),
  ],
  crypto: [
    ca(
      'btccb',
      'BTCC-B.TO — Purpose Bitcoin ETF (CAD, unhedged)',
      'Spot Bitcoin in cold storage—Purpose’s flagship Canadian physical BTC sleeve (competes with CI Galaxy and Fidelity for top AUM).',
      caPath('btccb')
    ),
    ca(
      'ethxb',
      'ETHX-B.TO — CI Galaxy Ethereum ETF (CAD, unhedged)',
      'Spot Ether held in custody—CI / Galaxy’s large-capacity Canadian ETH ETF (low fee vs. many peers).',
      caPath('ethxb')
    ),
  ],
}
