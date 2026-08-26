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

/**
 * Resolve hub ETF rows; CA merges the two US return-stacked buckets under `return-stacked`.
 * When `listing === 'us'` and `edition === 'ca'`, rewrite `/us-etfs/...` hrefs to `/ca/us-etfs/...`
 * so the Canadian shell stays in-region.
 */
export function getEtfHubItems(
  listing: 'us' | 'ca',
  categoryId: string,
  edition: 'us' | 'ca' = 'us'
): EtfHubListItem[] {
  let rows: EtfHubListItem[]
  if (listing === 'ca' && categoryId === 'return-stacked') {
    rows = [
      ...ETF_HUB_CA['return-stacked-ge-2x'],
      ...ETF_HUB_CA['return-stacked-lt-2x'],
    ]
  } else if (listing === 'ca' && categoryId === 'factor') {
    rows = [
      ...ETF_HUB_CA['factor-momentum'],
      ...ETF_HUB_CA['factor-value'],
      ...ETF_HUB_CA['factor-active'],
    ]
  } else {
    const table = listing === 'ca' ? ETF_HUB_CA : ETF_HUB_US
    rows = table[categoryId as keyof typeof table] ?? []
  }
  if (listing === 'us' && edition === 'ca') {
    return rows.map((item) => ({
      ...item,
      href: item.href.replace(/^\/us-etfs\//, '/ca/us-etfs/'),
    }))
  }
  return rows
}

const usPath = (key: string) => `/us-etfs/${key}`
const caPath = (key: string) => `/ca/etfs/${key}`

/** US-listed crypto / digital sleeves (US hub only; CA hub shows “Coming soon” under the same heading) */
const CRYPTO_HUB_LIST: EtfHubListItem[] = [
  us(
    'ooqb',
    'OOQB — One+One™ Nasdaq-100® and Bitcoin ETF',
    'Volatility Shares: ~100% Nasdaq-100 and ~100% bitcoin futures exposure in one capital-efficient sleeve (listed as OOQB; often discussed as “QQQ + BTC”).',
    usPath('ooqb')
  ),
  us(
    'oosb',
    'OOSB — One+One™ S&P 500® and Bitcoin ETF',
    "Volatility Shares: ~100% S&P 500 and ~100% bitcoin futures, dual exposure similar to OOQB's structure.",
    usPath('oosb')
  ),
  us(
    'rssx',
    'RSSX — Return Stacked U.S. Stocks & Gold/Bitcoin ETF',
    'Return Stacked® line: large-cap U.S. equity stacked with gold and bitcoin sleeves.',
    usPath('rssx')
  ),
  us(
    'spbc',
    'SPBC — Simplify US Equity PLUS Bitcoin Strategy ETF',
    'Simplify: 100% S&P 500 equity with a targeted ~10% spot bitcoin overlay via ETPs, rebalanced quarterly.',
    usPath('spbc')
  ),
  us(
    'wtib',
    'WTIB — USCF Oil Plus Bitcoin Strategy Fund',
    'Actively managed crude oil and bitcoin futures/ETP exposure with roughly balanced notional sleeves.',
    usPath('wtib')
  ),
  us(
    'btgd',
    'BTGD — STKd 100% Bitcoin & 100% Gold ETF',
    'Stacked ~100% bitcoin and ~100% gold exposure via futures and ETPs (Quantify STKd).',
    usPath('btgd')
  ),
  us(
    'begs',
    'BEGS — Rareview 2x Bull Cryptocurrency & Precious Metals ETF',
    'Leveraged long exposure to a blended crypto and precious-metals sleeve (Rareview).',
    usPath('begs')
  ),
]

/** US-listed ETFs shown on `/` (US) ETF hub */
export const ETF_HUB_US: Record<EtfHubCategoryId, EtfHubListItem[]> = {
  'return-stacked-ge-2x': [
    us(
      'rssb',
      'RSSB — Return Stacked® Global Stocks & Bonds ETF',
      'Global equities stacked with a Treasury bond sleeve in one capital-efficient wrapper.',
      usPath('rssb')
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
    us(
      'mate',
      'MATE — Man Active Trend Enhanced ETF',
      '100% S&P 500 beta stacked with 100% trend-following managed futures.',
      '/us-etfs/mate'
    ),
    us(
      'rsbt',
      'RSBT — Return Stacked Bonds & Managed Futures ETF',
      'For each $1 invested, ~$1 broad U.S. bond exposure and ~$1 systematic managed futures trend exposure.',
      usPath('rsbt')
    ),
    us(
      'rsit',
      'RSIT — Return Stacked International Stocks & Managed Futures ETF',
      'For each $1 invested, ~$1 large-cap international equity and ~$1 systematic managed futures (trend) exposure.',
      usPath('rsit')
    ),
  ],
  'return-stacked-lt-2x': [
    us(
      'gdmn',
      'GDMN — WisdomTree Efficient Gold Plus Gold Miners Strategy Fund',
      'Stacks gold miners equity with a leveraged gold-futures sleeve for a concentrated precious-metals expression.',
      usPath('gdmn')
    ),
    us(
      'gde',
      'GDE — WisdomTree Efficient Gold Plus Equity Strategy Fund',
      'Capital-efficient sleeve: large-cap U.S. equities with a layered gold futures overlay (~90/90 notional).',
      usPath('gde')
    ),
    us(
      'ntsx',
      'NTSX — WisdomTree U.S. Efficient Core Fund',
      '90/60 structure: U.S. equity core plus Treasury futures overlay.',
      usPath('ntsx')
    ),
    us(
      'hold',
      'HOLD — Harbor Alpha Layering ETF',
      'Large-cap U.S. equity layered with a trend-following managed-futures sleeve.',
      usPath('hold')
    ),
    us(
      'ntsi',
      'NTSI — WisdomTree International Efficient Core Fund',
      '90/60 structure: developed ex-U.S. equity core plus Treasury futures overlay.',
      usPath('ntsi')
    ),
    us(
      'ntse',
      'NTSE — WisdomTree Emerging Markets Efficient Core Fund',
      '90/60 structure: emerging-markets equity core plus Treasury futures overlay.',
      usPath('ntse')
    ),
    us(
      'gdt',
      'GDT — WisdomTree Efficient TIPS Plus Gold Fund',
      'Inflation-linked Treasuries with a gold futures overlay in a lower-leverage efficient structure.',
      usPath('gdt')
    ),
    us(
      'ntsd',
      'NTSD — WisdomTree Efficient U.S. Plus International Equity Fund',
      'Capital-efficient 90/60 sleeve: U.S. large-cap equities plus developed international equity index futures.',
      usPath('ntsd')
    ),
    us(
      'wdig',
      'WDIG — WisdomTree Efficient Rare Earth Plus Strategic Metals Fund',
      'Pairs rare earth and strategic metals miners equity with a base-metals futures overlay for critical-minerals exposure.',
      usPath('wdig')
    ),
  ],
  'premia-systematic-alternatives': [
    us(
      'ialt',
      'IALT — iShares Systematic Alternatives Active ETF',
      'BlackRock iShares actively managed multi-strategy systematic alternatives.',
      usPath('ialt')
    ),
    us(
      'flsp',
      'FLSP — Franklin Systematic Style Premia ETF',
      'Active style premia and multi-asset long/short sleeves targeting absolute return.',
      usPath('flsp')
    ),
  ],
  'factor-momentum': [
    us(
      'fmtm',
      'FMTM — MarketDesk Focused U.S. Momentum ETF',
      'Active quantitative momentum: 30 to 50 large/mid-cap U.S. names on a shorter lookback that rotates between offense and defense.',
      usPath('fmtm')
    ),
    us(
      'ptf',
      'PTF — Invesco Dorsey Wright Technology Momentum ETF',
      'Technology sector momentum strategy using Dorsey Wright relative-strength rules.',
      usPath('ptf')
    ),
    us(
      'spmo',
      'SPMO — Invesco S&P 500 Momentum ETF',
      'Tracks the S&P 500 Momentum Index—large-cap U.S. names with stronger risk-adjusted momentum scores.',
      usPath('spmo')
    ),
    us(
      'strn',
      'STRN — SMART Trend 25 ETF',
      'Quantitative momentum sleeve: ~25 liquid U.S. large caps selected for technical strength, with sector caps.',
      usPath('strn')
    ),
  ],
  'factor-value': [
    us(
      'avdv',
      'AVDV — Avantis International Small Cap Value ETF',
      'Systematic international small-cap value with profitability screens.',
      usPath('avdv')
    ),
    us(
      'garp',
      'GARP — iShares MSCI USA Quality GARP ETF',
      'Quality growth-at-a-reasonable-price U.S. large/mid sleeve: earnings growth and quality screens tilted toward reasonable valuation.',
      usPath('garp')
    ),
    us(
      'vflo',
      'VFLO — VictoryShares Free Cash Flow ETF',
      'Large-cap U.S. cash-cows sleeve: rules-based free-cash-flow yield vs. a broad large/mid benchmark.',
      usPath('vflo')
    ),
    us(
      'sflo',
      'SFLO — VictoryShares Small Cap Free Cash Flow ETF',
      'Small-cap U.S. cash-cows sleeve: profitability and free-cash-flow yield screens vs. a broad small-cap benchmark.',
      usPath('sflo')
    ),
    us(
      'avuv',
      'AVUV — Avantis U.S. Small Cap Value ETF',
      'Actively managed U.S. small-cap value: profitability, value, and investment discipline vs. Russell 2000 Value.',
      usPath('avuv')
    ),
    us(
      'cowz',
      'COWZ — Pacer U.S. Cash Cows 100 ETF',
      'Rules-based U.S. large-cap free-cash-flow yield factor sleeve.',
      usPath('cowz')
    ),
    us(
      'copy',
      'COPY — Tweedy, Browne Insider + Value ETF',
      'Global deep-value stock selection filtered for corporate insider buying and share buybacks.',
      usPath('copy')
    ),
  ],
  'factor-active': [
    us(
      'emeq',
      'EMEQ — Nomura Focused Emerging Markets Equity ETF',
      'Actively managed, high-conviction emerging-markets equity: a focused all-cap book selected bottom-up rather than tracking an EM index.',
      usPath('emeq')
    ),
    us(
      'afos',
      'AFOS — ARS Focused Opportunities Strategy ETF',
      'Active, concentrated U.S. equity: ~30 high-conviction names chosen for valuation margin of safety and secular-trend exposure.',
      usPath('afos')
    ),
    us(
      'sgrt',
      'SGRT — SMART Earnings Growth 30 ETF',
      'Concentrated active U.S. large-cap: a roughly 30-name, quant-driven earnings-growth book run with no sector constraints.',
      usPath('sgrt')
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
  'single-asset-managed-futures': [
    us(
      'foxy',
      'FOXY — Simplify Currency Strategy ETF',
      'Simplify: systematic EM carry trade and G10 mean-reversion strategy, implemented via currency forwards and futures.',
      usPath('foxy')
    ),
    us(
      'hard',
      'HARD — Simplify Commodities Strategy No K-1 ETF',
      'Systematic long/short hard-assets and commodity futures strategy in an ETF wrapper.',
      usPath('hard')
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
    us(
      'mema',
      'MEMA — Man Active Emerging Markets Alternative ETF',
      'Actively managed emerging-markets long/short equity sleeve using systematic signals plus portfolio-manager discretion.',
      usPath('mema')
    ),
    us(
      'wtls',
      'WTLS — WisdomTree Efficient Long/Short U.S. Equity Fund',
      'Capital-efficient 90% U.S. large-cap equity paired with a 90% ML-driven long/short overlay in one wrapper (WisdomTree / AlphaBeta).',
      usPath('wtls')
    ),
    us(
      'vamo',
      'VAMO — Cambria Value and Momentum ETF',
      "Cambria's quantitative value and momentum U.S. equity fund with systematic tactical hedging via S&P 500 futures (Cambria Investment Management).",
      usPath('vamo')
    ),
  ],
  'global-macro': [
    us(
      'hfgm',
      'HFGM — Unlimited HFGM Global Macro ETF',
      'Active global macro sleeve targeting hedge-fund-sector return dynamics with ETFs and futures.',
      '/us-etfs/hfgm'
    ),
    us(
      'asgm',
      'ASGM — Virtus AlphaSimplex Global Macro ETF',
      'Systematic global macro: equity sleeves plus futures across rates, currencies, and commodities.',
      usPath('asgm')
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
  'leveraged-equity': [
    us(
      'qld',
      'QLD — ProShares Ultra QQQ',
      '2x daily Nasdaq-100 exposure with daily reset leverage.',
      usPath('qld')
    ),
    us(
      'tqqq',
      'TQQQ — ProShares UltraPro QQQ',
      '3x daily Nasdaq-100 leverage for tactical growth-beta expression.',
      usPath('tqqq')
    ),
    us(
      'upro',
      'UPRO — ProShares UltraPro S&P500',
      '3x daily S&P 500 exposure designed for tactical high-beta positioning.',
      usPath('upro')
    ),
    us(
      'sso',
      'SSO — ProShares Ultra S&P500',
      '2x daily S&P 500 exposure via derivatives and daily reset leverage.',
      usPath('sso')
    ),
  ],
  volatility: [
    us(
      'virt',
      'VIRT — Virtu Financial',
      'The only pure-play HFT stock: market-making revenue accelerates when volatility spikes, without the roll drag that erodes traditional VIX ETFs over time.',
      usPath('virt')
    ),
    us(
      'caos',
      'CAOS — Alpha Architect Tail Risk ETF',
      'S&P 500 option structures designed as a tail-risk / convexity sleeve alongside equity beta.',
      usPath('caos')
    ),
    us(
      'attr',
      'ATTR — Arin Tactical Tail Risk ETF',
      'Actively managed U.S. large-cap exposure with tactical tail-risk options overlays aimed at drawdown mitigation.',
      usPath('attr')
    ),
  ],
  crypto: CRYPTO_HUB_LIST,
  'fixed-income': [
    us(
      'cloa',
      'CLOA — iShares AAA CLO Active ETF',
      'BlackRock iShares actively managed fund investing in USD-denominated AAA-rated CLO tranches for floating-rate structured credit income.',
      usPath('cloa')
    ),
    us(
      'jaaa',
      'JAAA — Janus Henderson AAA CLO ETF',
      'Actively managed AAA-rated CLO tranche fund: floating-rate senior structured credit with near-zero duration and equity correlation.',
      usPath('jaaa')
    ),
  ],
}

/** Canadian-listed ETFs shown on `/ca` ETF hub */
export const ETF_HUB_CA: Record<EtfHubCategoryId, EtfHubListItem[]> = {
  'return-stacked-ge-2x': [
    ca(
      'rgbm',
      'RGBM.TO - Return Stacked® Global Balanced & Macro ETF',
      'Canadian Return Stacked® line: ~$1 global balanced sleeve plus ~$1 systematic macro per dollar (USD share class RGBM.U).',
      caPath('rgbm')
    ),
  ],
  'return-stacked-lt-2x': [],
  'premia-systematic-alternatives': [
    ca(
      'onec',
      'ONEC.TO - Accelerate OneChoice Alternative Multi-Asset Fund',
      'Single-ticket mix of alt sleeves: absolute return, credit, real assets, macro, and directional long/short equity.',
      caPath('onec')
    ),
    ca(
      'pfaa',
      'PFAA.TO - Picton Multi-Strategy Alpha Alternative Fund ETF',
      'Picton Mahoney multi-strategy alpha alternatives in an ETF structure.',
      caPath('pfaa')
    ),
    ca(
      'pmm',
      'PMM.TO - Purpose Multi-Strategy Market Neutral Fund',
      'Systematic long/short across equity, FX, rates, and commodities targeting value, carry, and momentum premia with no directional bias.',
      caPath('pmm')
    ),
  ],
  'factor-momentum': [
    ca(
      'fccm',
      'FCCM.TO - Fidelity Canadian Momentum ETF',
      'Rules-based single-factor sleeve: 100 Canadian large-cap names with the strongest momentum signals, rebalanced quarterly.',
      caPath('fccm')
    ),
    ca(
      'fcmo',
      'FCMO.TO - Fidelity U.S. Momentum ETF',
      'Rules-based single-factor sleeve: 100 U.S. large-cap names with the strongest momentum signals, rebalanced quarterly.',
      caPath('fcmo')
    ),
    ca(
      'finn',
      'FINN.NE - Fidelity Global Innovators ETF',
      'Concentrated, actively managed global equity book run by Mark Schmehl, benchmarked to the Nasdaq Composite with a momentum-driven, high-conviction process.',
      caPath('finn')
    ),
    ca(
      'tec',
      'TEC.TO - TD Global Technology Leaders Index ETF',
      'Canadian-listed global technology equity ETF tracking mid- and large-cap technology leaders, with substantial U.S. mega-cap exposure.',
      caPath('tec')
    ),
  ],
  'factor-value': [
    ca(
      'zlb',
      'ZLB.TO - BMO Low Volatility Canadian Equity ETF',
      'Canadian value and defensive equity sleeve: a low-volatility tilt toward cheaper, cash-generative banks, utilities, and staples.',
      caPath('zlb')
    ),
  ],
  'factor-active': [],
  'managed-futures': [],
  'single-asset-managed-futures': [],
  'long-short': [
    ca(
      'atsx',
      'ATSX.TO - Accelerate Canadian Long Short Equity Fund',
      'Quantitative 150/50 Canadian long/short equity vs. S&P/TSX 60, directional hedge-fund-style ETF.',
      caPath('atsx')
    ),
    ca(
      'pfae',
      'PFAE.TO - Picton Mahoney Fortified Enhanced Canadian Equity Alternative Fund ETF',
      '130/30 Canadian equity long/short, ~100% net exposure, Fortified / Authentic Hedge® process.',
      caPath('pfae')
    ),
    ca(
      'hdge',
      'HDGE.TO - Accelerate Absolute Return Fund',
      'Quantitative long/short North American equity strategy in an ETF wrapper.',
      '/ca/etfs/hdge'
    ),
    ca(
      'pfls',
      'PFLS.TO - Picton Mahoney Fortified Long Short Alternative Fund ETF',
      'Global long/short equity with moderate net equity exposure: Authentic Hedge®-style process.',
      caPath('pfls')
    ),
    ca(
      'tgaf',
      'TGAF.TO - Tralucent Global Alt (Long/Short) Equity Fund ETF',
      'Global long/short equity (~100% long / ~40% short) across 200+ names, active alt sleeve vs. MSCI ACWI NR (CAD).',
      caPath('tgaf')
    ),
    ca(
      'pfmn',
      'PFMN.TO - Picton Mahoney Fortified Market Neutral Alternative Fund ETF',
      'Actively managed market-neutral long/short equity: Authentic Hedge® style in an ETF.',
      '/ca/etfs/pfmn'
    ),
  ],
  'global-macro': [
    ca(
      'dglm',
      'DGLM.TO - Desjardins Global Macro ETF',
      'Alternative ETF: long/short global macro across equities, rates, commodities, and currencies (Graham Capital sub-advisor).',
      caPath('dglm')
    ),
  ],
  arbitrage: [
    ca(
      'arb',
      'ARB.TO - Accelerate Arbitrage Fund',
      'Merger and SPAC arbitrage (targets and acquirers) with a low-volatility, event-driven profile.',
      '/ca/etfs/arb'
    ),
  ],
  'leveraged-equity': [
    ca(
      'hqu',
      'HQU.TO - BetaPro NASDAQ-100 2x Daily Bull ETF',
      '2x daily Nasdaq-100 exposure with daily reset leverage.',
      caPath('hqu')
    ),
    ca(
      'qqql',
      'QQQL.TO - Global X Enhanced NASDAQ-100 Index ETF',
      'Enhanced-beta Nasdaq-100 sleeve targeting about 1.25x exposure.',
      caPath('qqql')
    ),
    ca(
      'ussl',
      'USSL.TO - Global X Enhanced S&P 500 Index ETF',
      'Enhanced-beta S&P 500 sleeve targeting about 1.25x exposure.',
      caPath('ussl')
    ),
    ca(
      'hsu',
      'HSU.TO - BetaPro S&P 500 2x Daily Bull ETF',
      '2x daily S&P 500 exposure in CAD for tactical high-beta positioning.',
      caPath('hsu')
    ),
    ca(
      'heql',
      'HEQL.TO - Global X Enhanced All-Equity Asset Allocation ETF',
      'Enhanced all-equity allocation targeting about 1.25x exposure through a diversified global ETF mix.',
      caPath('heql')
    ),
  ],
  volatility: [],
  crypto: [
    ca(
      'btccb',
      'BTCC-B.TO - Purpose Bitcoin ETF (CAD, unhedged)',
      "Spot Bitcoin in cold storage: Purpose's flagship Canadian physical BTC sleeve (competes with CI Galaxy and Fidelity for top AUM).",
      caPath('btccb')
    ),
    ca(
      'ethxb',
      'ETHX-B.TO - CI Galaxy Ethereum ETF (CAD, unhedged)',
      "Spot Ether held in custody: CI / Galaxy's large-capacity Canadian ETH ETF (low fee vs. many peers).",
      caPath('ethxb')
    ),
  ],
  'fixed-income': [
    ca(
      'baaa',
      'BAAA.TO - Brompton Wellington Square AAA CLO ETF',
      'Actively managed portfolio of primarily AAA-rated CLO bonds: structured credit income with floating-rate coupons and low equity correlation.',
      caPath('baaa')
    ),
  ],
}
