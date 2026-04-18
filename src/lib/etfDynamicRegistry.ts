/**
 * On-site ETF write-ups for hub tickers that do not use a hand-authored `page.tsx`.
 * Hand-authored pages (MATE, RSSY, HFGM, HDGE, PFMN, ARB) stay in `src/app/.../<slug>/`.
 */

export type EtfDynamicDef = {
  /** Yahoo Finance symbol for `/api/etf-chart` and SSG (must be in `ETF_CHART_SYMBOLS`). */
  yahooSymbol: string
  /** Hub section `id` / hash (see `etfCategories.ts`; CA Return Stacked → `return-stacked`). */
  hubCategoryId: string
  badge: string
  h1Title: string
  displayTicker: string
  issuer: string
  inception: string
  structure?: string
  mer: string
  aum: string
  pageTitle: string
  description: string
  lede: string
  strategyParas: string[]
  pedigreeParas: string[]
  outperfParas: string[]
  officialUrl: string
  officialLabel: string
}

/** Optional `groupAum` sentence: issuer-level / group assets under management from public reporting (verify on issuer sites). */
function ped(issuer: string, groupAum?: string): string[] {
  const scale =
    groupAum != null && groupAum.trim().length > 0 ? ` ${groupAum.trim()}` : ''
  return [
    `${issuer} offers this ETF within its public fund lineup; strategy, fees, and risks are described in the prospectus, ETF Facts, and periodic reports.${scale}`,
    `Verify current fees, holdings, and risk factors on the official product page before making decisions—this site is educational only.`,
  ]
}

function outf(edge: string): string[] {
  return [
    `The edge tends to show up when ${edge}. Liquidity, tracking error, and tax treatment still matter versus holding the broad benchmark directly.`,
    `Conditions can flip quickly: factor spreads compress, correlations rise, or funding costs move—keep position size consistent with your risk budget.`,
  ]
}

function cryptoLede(ticker: string, thesis: string): string {
  return `${ticker} is an exchange-traded product that, per sponsor disclosures, ${thesis}`
}

const US_CRYPTO_OFFICIAL = 'https://www.etf.com/'

export const US_ETF_DYNAMIC_REGISTRY: Record<string, EtfDynamicDef> = {
  begs: {
    yahooSymbol: 'BEGS',
    hubCategoryId: 'crypto',
    badge: 'Crypto & digital assets',
    h1Title: 'BEGS — Rareview 2x Bull Cryptocurrency & Precious Metals ETF',
    displayTicker: 'BEGS',
    issuer: 'Rareview Capital',
    inception: '—',
    mer: '—',
    aum: '~$12M',
    pageTitle: 'BEGS ETF — Alpha Stacking',
    description: 'Rareview 2x Bull Cryptocurrency & Precious Metals ETF (BEGS): leveraged crypto + metals sleeve.',
    lede: cryptoLede(
      'BEGS',
      'targets leveraged long exposure to a blended cryptocurrency and precious-metals basket using derivatives and ETPs.'
    ),
    strategyParas: [
      'Disclosures typically describe a leveraged long posture toward crypto and precious metals—implementation details, collateral, and reset mechanics live in the prospectus.',
      'Leverage magnifies both upside and downside; funding, futures rolls, and volatility can dominate short-run outcomes.',
    ],
    pedigreeParas: ped(
      'Rareview Capital',
      'Rareview is a specialist ETF sponsor; consolidated group AUM is not published alongside trillion-dollar managers—expect niche scale.'
    ),
    outperfParas: outf('crypto and metals trend together or when implied volatility and trend persistence support leveraged long sleeves'),
    officialUrl: US_CRYPTO_OFFICIAL,
    officialLabel: 'ETF.com profile (verify ticker)',
  },

  btgd: {
    yahooSymbol: 'BTGD',
    hubCategoryId: 'crypto',
    badge: 'Crypto & digital assets',
    h1Title: 'BTGD — STKd 100% Bitcoin & 100% Gold ETF',
    displayTicker: 'BTGD',
    issuer: 'Quantify Funds',
    inception: '—',
    mer: '—',
    aum: '~$45M',
    pageTitle: 'BTGD ETF — Alpha Stacking',
    description: 'STKd 100% Bitcoin & 100% Gold ETF (BTGD): stacked bitcoin and gold exposure.',
    lede: cryptoLede(
      'BTGD',
      'seeks simultaneous ~100% bitcoin and ~100% gold exposure via futures and ETPs in a capital-efficient structure.'
    ),
    strategyParas: [
      'The sponsor frames the fund as a dual-beta sleeve: digital scarcity (bitcoin) alongside monetary-metal exposure (gold), implemented with derivatives.',
      'Collateral, margin, and roll schedules matter; read the latest supplement for exact exposure mechanics.',
    ],
    pedigreeParas: ped(
      'Quantify Funds',
      'Quantify is a focused sponsor; headline firm-wide AUM is not widely quoted in top sponsor league tables—check the issuer site for context.'
    ),
    outperfParas: outf('bitcoin and gold diverge on macro narratives (real rates, risk appetite) yet both sleeves contribute in trending regimes'),
    officialUrl: 'https://quantifyinvestments.com/',
    officialLabel: 'Quantify Funds (issuer)',
  },

  isbg: {
    yahooSymbol: 'ISBG',
    hubCategoryId: 'crypto',
    badge: 'Crypto & digital assets',
    h1Title: 'ISBG — IncomeSTKd 1x Bitcoin & 1x Gold Premium ETF',
    displayTicker: 'ISBG',
    issuer: 'Quantify Funds',
    inception: '—',
    mer: '—',
    aum: '~$28M',
    pageTitle: 'ISBG ETF — Alpha Stacking',
    description: 'IncomeSTKd bitcoin + gold premium ETF (ISBG).',
    lede: cryptoLede(
      'ISBG',
      'combines bitcoin and gold beta with an options-income overlay aimed at periodic distributions.'
    ),
    strategyParas: [
      'Income overlays can clip upside in sharp rallies while adding yield in range-bound tape; verify option strike ladders and distribution policy in fund documents.',
      'Dual exposure plus premium selling increases implementation complexity versus plain spot or futures sleeves.',
    ],
    pedigreeParas: ped(
      'Quantify Funds',
      'Quantify is a focused sponsor; headline firm-wide AUM is not widely quoted in top sponsor league tables—check the issuer site for context.'
    ),
    outperfParas: outf('implied volatility is elevated enough to support premium harvesting without persistent gap risk against short options'),
    officialUrl: 'https://quantifyinvestments.com/',
    officialLabel: 'Quantify Funds (issuer)',
  },

  issb: {
    yahooSymbol: 'ISSB',
    hubCategoryId: 'crypto',
    badge: 'Crypto & digital assets',
    h1Title: 'ISSB — IncomeSTKd 1x US Stocks & 1x Bitcoin Premium ETF',
    displayTicker: 'ISSB',
    issuer: 'Quantify Funds',
    inception: '—',
    mer: '—',
    aum: '~$22M',
    pageTitle: 'ISSB ETF — Alpha Stacking',
    description: 'IncomeSTKd US stocks + bitcoin premium ETF (ISSB).',
    lede: cryptoLede(
      'ISSB',
      'pairs large-cap U.S. equity beta with bitcoin beta and an options-premium sleeve for income.'
    ),
    strategyParas: [
      'The design stacks familiar equity beta with crypto beta, then layers option writing—risk is multi-dimensional versus a single-factor ETF.',
      'Read how collateral is partitioned across sleeves and how distributions are sourced (income vs. return of capital).',
    ],
    pedigreeParas: ped(
      'Quantify Funds',
      'Quantify is a focused sponsor; headline firm-wide AUM is not widely quoted in top sponsor league tables—check the issuer site for context.'
    ),
    outperfParas: outf('equities grind higher while bitcoin’s idiosyncratic moves provide diversification—and options income accrues without constant gap-through'),
    officialUrl: 'https://quantifyinvestments.com/',
    officialLabel: 'Quantify Funds (issuer)',
  },

  ooqb: {
    yahooSymbol: 'OOQB',
    hubCategoryId: 'crypto',
    badge: 'Crypto & digital assets',
    h1Title: 'OOQB — One+One™ Nasdaq-100® and Bitcoin ETF',
    displayTicker: 'OOQB',
    issuer: 'Volatility Shares',
    inception: '—',
    mer: '—',
    aum: '~$180M',
    pageTitle: 'OOQB ETF — Alpha Stacking',
    description: 'One+One Nasdaq-100 and Bitcoin ETF (OOQB).',
    lede: cryptoLede(
      'OOQB',
      'targets ~100% Nasdaq-100 exposure alongside ~100% bitcoin futures exposure in one listed wrapper.'
    ),
    strategyParas: [
      'Return stacking here means dual notional exposure; implementation uses futures and swaps as described by the sponsor.',
      'Capital efficiency can raise volatility and path dependence—compare to separate single-factor holdings.',
    ],
    pedigreeParas: ped(
      'Volatility Shares',
      'Volatility Shares is a specialized leveraged and structured ETP sponsor; industry data typically places its listed complex in the low-to-mid-single-digit billions USD (order of magnitude), not mega-cap index scale.'
    ),
    outperfParas: outf('growth and crypto narratives align, or when each sleeve trends without catastrophic correlation spikes'),
    officialUrl: 'https://volatilityshares.com/',
    officialLabel: 'Volatility Shares',
  },

  oosb: {
    yahooSymbol: 'OOSB',
    hubCategoryId: 'crypto',
    badge: 'Crypto & digital assets',
    h1Title: 'OOSB — One+One™ S&P 500® and Bitcoin ETF',
    displayTicker: 'OOSB',
    issuer: 'Volatility Shares',
    inception: '—',
    mer: '—',
    aum: '~$95M',
    pageTitle: 'OOSB ETF — Alpha Stacking',
    description: 'One+One S&P 500 and Bitcoin ETF (OOSB).',
    lede: cryptoLede(
      'OOSB',
      'targets ~100% S&P 500 exposure alongside ~100% bitcoin futures in a single fund.'
    ),
    strategyParas: [
      'Core U.S. large-cap beta is stacked with bitcoin macro beta; implementation details and collateral reside in offering documents.',
      'Dual exposure can increase drawdown correlation during liquidity shocks—size accordingly.',
    ],
    pedigreeParas: ped(
      'Volatility Shares',
      'Volatility Shares is a specialized leveraged and structured ETP sponsor; industry data typically places its listed complex in the low-to-mid-single-digit billions USD (order of magnitude), not mega-cap index scale.'
    ),
    outperfParas: outf('U.S. equities trend while bitcoin provides a diversifying macro sleeve with independent drivers'),
    officialUrl: 'https://volatilityshares.com/',
    officialLabel: 'Volatility Shares',
  },

  rssx: {
    yahooSymbol: 'RSSX',
    hubCategoryId: 'crypto',
    badge: 'Crypto & digital assets',
    h1Title: 'RSSX — Return Stacked U.S. Stocks & Gold/Bitcoin ETF',
    displayTicker: 'RSSX',
    issuer: 'Tidal / Return Stacked ETFs',
    inception: '—',
    mer: '—',
    aum: '~$55M',
    pageTitle: 'RSSX ETF — Alpha Stacking',
    description: 'Return Stacked U.S. Stocks & Gold/Bitcoin ETF (RSSX).',
    lede:
      'RSSX applies the Return Stacked® design: large-cap U.S. equity exposure layered with gold and bitcoin sleeves in one fund.',
    strategyParas: [
      'Disclosures outline how notional exposure is allocated across equity and commodity sleeves, including derivatives use and collateral.',
      'Multi-asset stacking increases implementation complexity; review leverage, margin, and tax treatment.',
    ],
    pedigreeParas: ped(
      'Tidal Investments / Return Stacked ETFs',
      'Tidal advises multiple ETF suites including Return Stacked®; sponsor footprint is far smaller than the top three index providers—see Tidal and Return Stacked disclosures for breadth.'
    ),
    outperfParas: outf('gold and bitcoin diversify equity risk while each sleeve can trend on distinct macro drivers (real rates, risk appetite)'),
    officialUrl: 'https://www.returnstackedetfs.com/',
    officialLabel: 'Return Stacked ETFs',
  },

  wtib: {
    yahooSymbol: 'WTIB',
    hubCategoryId: 'crypto',
    badge: 'Crypto & digital assets',
    h1Title: 'WTIB — USCF Oil Plus Bitcoin Strategy Fund',
    displayTicker: 'WTIB',
    issuer: 'USCF Investments',
    inception: '—',
    mer: '—',
    aum: '~$18M',
    pageTitle: 'WTIB ETF — Alpha Stacking',
    description: 'USCF Oil Plus Bitcoin Strategy Fund (WTIB).',
    lede:
      'WTIB combines crude oil and bitcoin futures/ETP exposure in an actively managed sleeve targeting balanced notional risk across the two themes.',
    strategyParas: [
      'Energy and digital-asset betas respond to different macro inputs; the manager’s active weights matter as much as the asset mix.',
      'Contango/backwardation in oil and bitcoin volatility can dominate short-run outcomes.',
    ],
    pedigreeParas: ped(
      'USCF Investments',
      'USCF is a commodity-focused ETF sponsor; group AUM is commonly cited in the low-billions USD range in sponsor league data (energy and related ETPs).'
    ),
    outperfParas: outf('commodity supply shocks or inflation scares lift oil while bitcoin follows its own liquidity and narrative cycles'),
    officialUrl: 'https://www.uscfinvestments.com/',
    officialLabel: 'USCF Investments',
  },

  rsst: {
    yahooSymbol: 'RSST',
    hubCategoryId: 'return-stacked-ge-2x',
    badge: 'Return Stacked - 2x',
    h1Title: 'RSST — Return Stacked U.S. Stocks & Managed Futures ETF',
    displayTicker: 'RSST',
    issuer: 'Tidal / Return Stacked ETFs',
    inception: '—',
    mer: '1.04%',
    aum: '~$340M',
    pageTitle: 'RSST ETF — Alpha Stacking',
    description: 'Return Stacked U.S. Stocks & Managed Futures ETF (RSST).',
    lede:
      'RSST targets roughly dollar-for-dollar large-cap U.S. equity alongside a systematic managed-futures sleeve—return stacking in a single ticker.',
    strategyParas: [
      'The equity sleeve typically tracks broad U.S. large-cap beta while the futures sleeve pursues trend and macro signals across asset classes.',
      'Collateral, margin, and rebalance rules are spelled out in fund documents; leverage is structural to the design.',
    ],
    pedigreeParas: ped(
      'Tidal Investments / Return Stacked ETFs',
      'Tidal advises multiple ETF suites including Return Stacked®; sponsor footprint is far smaller than the top three index providers—see Tidal and Return Stacked disclosures for breadth.'
    ),
    outperfParas: outf(
      'persistent macro trends reward the managed-futures engine while equities provide core beta—especially when equity and trend sleeves diverge'
    ),
    officialUrl: 'https://www.returnstackedetfs.com/',
    officialLabel: 'Return Stacked ETFs',
  },

  ntsd: {
    yahooSymbol: 'NTSD',
    hubCategoryId: 'return-stacked-lt-2x',
    badge: 'Return Stacked - Lower Leverage',
    h1Title: 'NTSD — WisdomTree Efficient U.S. Plus International Equity Fund',
    displayTicker: 'NTSD',
    issuer: 'WisdomTree',
    inception: '—',
    mer: '—',
    aum: '~$420M',
    pageTitle: 'NTSD ETF — Alpha Stacking',
    description: 'WisdomTree Efficient U.S. Plus International Equity Fund (NTSD).',
    lede:
      'NTSD is a capital-efficient 90/60-style sleeve: U.S. large-cap equities plus developed international equity exposure via futures and related instruments.',
    strategyParas: [
      'The fund aims for more than 1.0× notional equity exposure through derivatives-based international access while holding a U.S. equity core.',
      'Futures rolls, hedge ratios, and tax treatment differ from plain index funds—read WisdomTree’s methodology summary.',
    ],
    pedigreeParas: ped(
      'WisdomTree',
      'WisdomTree, Inc. reported record global ETP and tokenized AUM of about $143 billion as of Dec. 31, 2025, with broader group figures near $150B including related acquisitions (monthly metrics release).'
    ),
    outperfParas: outf('international equities outperform U.S. beta while implementation cost stays controlled through futures'),
    officialUrl: 'https://www.wisdomtree.com/',
    officialLabel: 'WisdomTree',
  },

  gde: {
    yahooSymbol: 'GDE',
    hubCategoryId: 'return-stacked-lt-2x',
    badge: 'Return Stacked - Lower Leverage',
    h1Title: 'GDE — WisdomTree Efficient Gold Plus Equity Strategy Fund',
    displayTicker: 'GDE',
    issuer: 'WisdomTree',
    inception: '—',
    mer: '—',
    aum: '~$950M',
    pageTitle: 'GDE ETF — Alpha Stacking',
    description: 'WisdomTree Efficient Gold Plus Equity Strategy Fund (GDE).',
    lede:
      'GDE pairs large-cap U.S. equity exposure with a layered gold futures overlay—capital-efficient exposure to both stocks and gold.',
    strategyParas: [
      'The overlay is designed to add gold macro beta without abandoning the equity core; exact weights and rebalancing are in the prospectus.',
      'Gold can diversify equity drawdowns but also drags when real rates spike—monitor both sleeves.',
    ],
    pedigreeParas: ped(
      'WisdomTree',
      'WisdomTree, Inc. reported record global ETP and tokenized AUM of about $143 billion as of Dec. 31, 2025, with broader group figures near $150B including related acquisitions (monthly metrics release).'
    ),
    outperfParas: outf('gold rallies on real-rate or stress trades while equities remain constructive—classic late-cycle diversification'),
    officialUrl: 'https://www.wisdomtree.com/',
    officialLabel: 'WisdomTree',
  },

  flsp: {
    yahooSymbol: 'FLSP',
    hubCategoryId: 'premia-systematic-alternatives',
    badge: 'Premia and systematic alternatives',
    h1Title: 'FLSP — Franklin Systematic Style Premia ETF',
    displayTicker: 'FLSP',
    issuer: 'Franklin Templeton',
    inception: '—',
    mer: '—',
    aum: '~$55M',
    pageTitle: 'FLSP ETF — Alpha Stacking',
    description: 'Franklin Systematic Style Premia ETF (FLSP).',
    lede:
      'FLSP is an actively managed alternatives-leaning ETF targeting style premia and multi-asset long/short sleeves with an absolute-return posture.',
    strategyParas: [
      'Disclosures describe systematic signals across factors and asset classes; sleeves may include long/short equity and derivatives.',
      'Fees and turnover can be higher than broad beta funds—verify net exposure and leverage caps.',
    ],
    pedigreeParas: ped(
      'Franklin Templeton',
      'Franklin Resources (Franklin Templeton) reported preliminary group AUM of about $1.68 trillion at Dec. 31, 2025 (month-end release).'
    ),
    outperfParas: outf('style spreads widen and cross-asset premia persist—environments where multi-strat sleeves earn outside equity beta alone'),
    officialUrl: 'https://www.franklintempleton.com/',
    officialLabel: 'Franklin Templeton',
  },

  ialt: {
    yahooSymbol: 'IALT',
    hubCategoryId: 'premia-systematic-alternatives',
    badge: 'Premia and systematic alternatives',
    h1Title: 'IALT — iShares Systematic Alternatives Active ETF',
    displayTicker: 'IALT',
    issuer: 'BlackRock iShares',
    inception: '—',
    mer: '—',
    aum: '~$110M',
    pageTitle: 'IALT ETF — Alpha Stacking',
    description: 'iShares Systematic Alternatives Active ETF (IALT).',
    lede:
      'IALT is BlackRock’s actively managed multi-strategy systematic alternatives sleeve—designed for diversification vs. traditional 60/40 risk.',
    strategyParas: [
      'The mandate spans sleeves that may include rates, credit, equity factors, and macro—exact mix varies with manager discretion.',
      'Alternatives ETFs can be opaque; prioritize liquidity, fee drag, and correlation vs. your equity book.',
    ],
    pedigreeParas: ped(
      'BlackRock iShares',
      'BlackRock, Inc. reported about $14.0 trillion in total assets under management at Dec. 31, 2025 (annual filing / earnings).'
    ),
    outperfParas: outf('cross-asset correlations compress and idiosyncratic macro trades matter more than single-factor equity beta'),
    officialUrl: 'https://www.ishares.com/',
    officialLabel: 'iShares',
  },

  caos: {
    yahooSymbol: 'CAOS',
    hubCategoryId: 'premia-systematic-alternatives',
    badge: 'Premia and systematic alternatives',
    h1Title: 'CAOS — Alpha Architect Tail Risk ETF',
    displayTicker: 'CAOS',
    issuer: 'Alpha Architect',
    inception: '—',
    mer: '—',
    aum: '~$42M',
    pageTitle: 'CAOS ETF — Alpha Stacking',
    description: 'Alpha Architect Tail Risk ETF (CAOS).',
    lede:
      'CAOS uses S&P 500-linked option structures to express convexity and tail hedging alongside or instead of plain equity beta.',
    strategyParas: [
      'Option overlays can reshape payoff diagrams; premium decay and reset schedules are central to realized outcomes.',
      'Tail-hedge sleeves cost carry in calm markets—position sizing should reflect bleed vs. crash protection.',
    ],
    pedigreeParas: ped(
      'Alpha Architect',
      'Alpha Architect is a research-driven boutique ETF sponsor; published group AUM is modest versus integrated mega-managers—expect specialist factor and tactical scale.'
    ),
    outperfParas: outf('volatility spikes or gap risk dominate—when convexity pays for the option budget'),
    officialUrl: 'https://alphaarchitect.com/',
    officialLabel: 'Alpha Architect',
  },

  spmo: {
    yahooSymbol: 'SPMO',
    hubCategoryId: 'factor',
    badge: 'Factor',
    h1Title: 'SPMO — Invesco S&P 500 Momentum ETF',
    displayTicker: 'SPMO',
    issuer: 'Invesco',
    inception: 'Oct 2015',
    mer: '0.13%',
    aum: '~$13B',
    pageTitle: 'SPMO ETF — Alpha Stacking',
    description: 'Invesco S&P 500 Momentum ETF (SPMO): large-cap U.S. momentum factor.',
    lede:
      'SPMO tracks the S&P 500 Momentum Index—large-cap U.S. names with stronger risk-adjusted momentum scores, rebalanced on a published rules schedule.',
    strategyParas: [
      'Momentum is implemented within the S&P 500 universe, so sector tilts can cluster when leadership narrows.',
      'The rules define lookbacks and volatility scaling; verify current methodology on Invesco’s factsheet.',
    ],
    pedigreeParas: ped(
      'Invesco',
      'Invesco Ltd. reported preliminary AUM of about $2.17 trillion at Dec. 31, 2025 (month-end release).'
    ),
    outperfParas: outf('price trends persist for months (risk-on leadership, sector rotations) and transaction costs stay low vs. the signal strength'),
    officialUrl: 'https://www.invesco.com/us/financial-products/etfs',
    officialLabel: 'Invesco ETF hub',
  },

  vflo: {
    yahooSymbol: 'VFLO',
    hubCategoryId: 'factor',
    badge: 'Factor',
    h1Title: 'VFLO — VictoryShares Free Cash Flow ETF',
    displayTicker: 'VFLO',
    issuer: 'Victory Capital',
    inception: 'Jun 2023',
    mer: '0.44%',
    aum: '~$6B',
    pageTitle: 'VFLO ETF — Alpha Stacking',
    description: 'VictoryShares Free Cash Flow ETF (VFLO): large-cap cash-cows / FCF sleeve.',
    lede:
      'VFLO targets large-cap U.S. names with attractive free-cash-flow yield versus a broad large/mid benchmark—a “cash cows” equity factor sleeve.',
    strategyParas: [
      'The index emphasizes profitability and cash conversion; sector weights can tilt toward cash-generative industries.',
      'FCF screens can lag cyclical turns—balance this sleeve vs. growth or momentum peers.',
    ],
    pedigreeParas: ped(
      'Victory Capital',
      'Victory Capital reported total AUM of about $314 billion at Dec. 31, 2025 (month-end total client assets release).'
    ),
    outperfParas: outf('quality and cash flow outperform junk beta—typically when balance-sheet strength is rewarded over multiple expansion'),
    officialUrl: 'https://www.vcm.com/',
    officialLabel: 'Victory Capital',
  },

  avuv: {
    yahooSymbol: 'AVUV',
    hubCategoryId: 'factor',
    badge: 'Factor',
    h1Title: 'AVUV — Avantis U.S. Small Cap Value ETF',
    displayTicker: 'AVUV',
    issuer: 'Avantis Investors',
    inception: 'Sep 2019',
    mer: '0.25%',
    aum: '~$24B',
    pageTitle: 'AVUV ETF — Alpha Stacking',
    description: 'Avantis U.S. Small Cap Value ETF (AVUV).',
    lede:
      'AVUV is an actively managed U.S. small-cap value ETF: profitability, value, and investment signals vs. a Russell 2000 Value–style opportunity set.',
    strategyParas: [
      'Avantis emphasizes fundamentals and diversification across many names; turnover is typically moderate vs. deep-value concentrates.',
      'Small-cap value can lag in liquidity rallies—expect tracking error vs. large-cap growth.',
    ],
    pedigreeParas: ped(
      'Avantis Investors / American Century',
      'Avantis sits under American Century Investments, which surpassed $300 billion in assets under supervision in Sept. 2025 (firm milestone); parent regulatory AUM is in that neighborhood in Form ADV data.'
    ),
    outperfParas: outf('value and size premia widen—often late-cycle or when rates and dispersion favor profitable small caps'),
    officialUrl: 'https://www.avantisinvestors.com/',
    officialLabel: 'Avantis Investors',
  },

  sass: {
    yahooSymbol: 'SASS',
    hubCategoryId: 'factor',
    badge: 'Factor',
    h1Title: 'SASS — M.D. Sass Concentrated Value ETF',
    displayTicker: 'SASS',
    issuer: 'M.D. Sass',
    inception: 'Mar 2026',
    mer: '0.75%',
    aum: '~$70M',
    pageTitle: 'SASS ETF — Alpha Stacking',
    description: 'M.D. Sass Concentrated Value ETF (SASS): active concentrated U.S. value.',
    lede:
      'SASS is M.D. Sass’s concentrated U.S. value sleeve—a high-conviction book of about 20–25 large and mid-cap names sourced from Russell 1000/3000 Value, emphasizing misunderstood or out-of-favor situations.',
    strategyParas: [
      'The adviser targets value with a catalyst lens—spin-offs, complex balance sheets, and paths to simplification—not passive factor loading.',
      'Concentration raises single-name and sector risk versus broad value indexes; read holdings and position limits in the prospectus.',
    ],
    pedigreeParas: ped(
      'M.D. Sass LLC',
      'M.D. Sass is a long-tenured independent adviser; consolidated regulatory AUM is boutique-to mid-market versus mega ETF complexes—confirm the latest Form ADV and sponsor materials.'
    ),
    outperfParas: outf(
      'value spreads widen and mean-reversion favors patient stock pickers—when quality franchises trade at a discount to normalized cash flows'
    ),
    officialUrl: 'https://www.mdsassetf.com/',
    officialLabel: 'M.D. Sass Concentrated Value ETF',
  },

  cta: {
    yahooSymbol: 'CTA',
    hubCategoryId: 'managed-futures',
    badge: 'Managed futures',
    h1Title: 'CTA — Simplify Managed Futures Strategy ETF',
    displayTicker: 'CTA',
    issuer: 'Simplify Asset Management',
    inception: '—',
    mer: '—',
    aum: '~$150M',
    pageTitle: 'CTA ETF — Alpha Stacking',
    description: 'Simplify Managed Futures Strategy ETF (CTA).',
    lede:
      'CTA delivers a systematic managed-futures sleeve (Altis models) across equities, rates, commodities, and FX—low correlation to equity beta.',
    strategyParas: [
      'Trend and macro signals drive positioning; leverage and notional exposure vary with model output.',
      'Managed futures can whipsaw in choppy, mean-reverting tape—review max drawdown vs. your equity book.',
    ],
    pedigreeParas: ped(
      'Simplify Asset Management',
      'Simplify’s ETF franchise plus advisory AUM is commonly estimated in the mid-single-digit billions USD in industry and regulatory snapshots—far below trillion-scale banks.'
    ),
    outperfParas: outf('persistent trends in rates, FX, or commodities let trend engines earn while equities chop'),
    officialUrl: 'https://www.simplify.us/',
    officialLabel: 'Simplify',
  },

  dbmf: {
    yahooSymbol: 'DBMF',
    hubCategoryId: 'managed-futures',
    badge: 'Managed futures',
    h1Title: 'DBMF — iMGP DBi Managed Futures Strategy ETF',
    displayTicker: 'DBMF',
    issuer: 'iMGP / DBi',
    inception: '—',
    mer: '—',
    aum: '~$1.1B',
    pageTitle: 'DBMF ETF — Alpha Stacking',
    description: 'iMGP DBi Managed Futures Strategy ETF (DBMF).',
    lede:
      'DBMF seeks to replicate pre-fee managed-futures hedge fund exposures via a liquid, exchange-traded wrapper—macro trend and relative-value sleeves.',
    strategyParas: [
      'The strategy is benchmarked to hedge-fund CTA returns in spirit; implementation uses futures and forwards.',
      'Fee drag and replication error matter—compare realized correlation to your equity sleeve over full cycles.',
    ],
    pedigreeParas: ped(
      'iMGP / DBi',
      'iMGP partners with specialist boutiques (including DBi); aggregate platform AUM is mid-market versus global banks—see iMGP disclosures for group totals.'
    ),
    outperfParas: outf('CTA hedge funds earn gross of fees—DBMF aims to capture that beta in listed form when trends dominate'),
    officialUrl: 'https://www.dbi-asset.com/',
    officialLabel: 'DBi (iMGP)',
  },

  kmlm: {
    yahooSymbol: 'KMLM',
    hubCategoryId: 'managed-futures',
    badge: 'Managed futures',
    h1Title: 'KMLM — KraneShares Mount Lucas Managed Futures Index Strategy ETF',
    displayTicker: 'KMLM',
    issuer: 'KraneShares',
    inception: '—',
    mer: '—',
    aum: '~$400M',
    pageTitle: 'KMLM ETF — Alpha Stacking',
    description: 'KraneShares Mount Lucas Managed Futures Index Strategy ETF (KMLM).',
    lede:
      'KMLM follows a rules-based trend program on the KFA MLM Index—futures across commodities, currencies, and global bonds.',
    strategyParas: [
      'Index rules define signal horizons and risk budgets; review rebalancing and sector caps in Krane’s methodology document.',
      'Trend systems can cluster in crisis regimes—liquidity and margin are operational risks.',
    ],
    pedigreeParas: ped(
      'KraneShares',
      'Krane Funds Advisors’ U.S.-listed ETF lineup is often quoted near high single-digit billions USD in ETF sponsor league tables (order of magnitude).'
    ),
    outperfParas: outf('cross-asset trends run for quarters—ideal for time-series momentum with controlled leverage'),
    officialUrl: 'https://www.kraneshares.com/',
    officialLabel: 'KraneShares',
  },

  clse: {
    yahooSymbol: 'CLSE',
    hubCategoryId: 'long-short',
    badge: 'Long/short',
    h1Title: 'CLSE — Convergence Long/Short Equity ETF',
    displayTicker: 'CLSE',
    issuer: 'Convergence Investment Partners',
    inception: '—',
    mer: '—',
    aum: '~$28M',
    pageTitle: 'CLSE ETF — Alpha Stacking',
    description: 'Convergence Long/Short Equity ETF (CLSE).',
    lede:
      'CLSE is an actively managed long/short U.S. equity fund—security selection and pair trades aim for risk-adjusted returns vs. long-only beta.',
    strategyParas: [
      'Net exposure and gross exposure vary with manager views; verify current positioning in shareholder reports.',
      'Shorting and borrow costs can bite in squeezes—liquidity matters.',
    ],
    pedigreeParas: ped(
      'Convergence Investment Partners',
      'Convergence is a focused long/short equity manager; headline firm AUM is not marketed like a mega mutual-fund complex—verify Form ADV and fund documents.'
    ),
    outperfParas: outf('stock dispersion is high and factor spreads widen—environments where security selection dominates index direction'),
    officialUrl: 'https://www.convergenceip.com/',
    officialLabel: 'Convergence Investment Partners',
  },

  orr: {
    yahooSymbol: 'ORR',
    hubCategoryId: 'long-short',
    badge: 'Long/short',
    h1Title: 'ORR — Militia Long/Short Equity ETF',
    displayTicker: 'ORR',
    issuer: 'Militia Investments',
    inception: '—',
    mer: '—',
    aum: '~$22M',
    pageTitle: 'ORR ETF — Alpha Stacking',
    description: 'Militia Long/Short Equity ETF (ORR).',
    lede:
      'ORR pursues a higher-turnover fundamental long/short global equity process—pair trades and thematic books vs. passive beta.',
    strategyParas: [
      'Turnover and short borrow lists change frequently; review holdings lag vs. daily positioning.',
      'Global sleeves add FX and session risk—compare hedging policy in disclosures.',
    ],
    pedigreeParas: ped(
      'Militia Investments',
      'Militia is a concentrated global long/short equity shop without widely published trillion-scale AUM—treat as boutique specialist scale.'
    ),
    outperfParas: outf('leadership rotates across regions and sectors—when stock-picking alpha exceeds macro drift'),
    officialUrl: 'https://militiainvestments.com/',
    officialLabel: 'Militia Investments',
  },

  asgm: {
    yahooSymbol: 'ASGM',
    hubCategoryId: 'global-macro',
    badge: 'Global macro',
    h1Title: 'ASGM — Virtus AlphaSimplex Global Macro ETF',
    displayTicker: 'ASGM',
    issuer: 'Virtus / AlphaSimplex',
    inception: '—',
    mer: '—',
    aum: '~$210M',
    pageTitle: 'ASGM ETF — Alpha Stacking',
    description: 'Virtus AlphaSimplex Global Macro ETF (ASGM).',
    lede:
      'ASGM runs a systematic global macro process: equity sleeves plus futures across rates, currencies, and commodities.',
    strategyParas: [
      'Models allocate risk across macro factors; leverage and net exposure evolve with signals.',
      'Macro sleeves can offset equity drawdowns—or add basis risk if models misread regime shifts.',
    ],
    pedigreeParas: ped(
      'Virtus / AlphaSimplex',
      'Virtus Investment Partners is a public multi-affiliate manager; consolidated AUM runs to tens of billions of USD in quarterly filings—AlphaSimplex is one engine within that ecosystem (see Virtus IR for current totals).'
    ),
    outperfParas: outf('macro trends dominate (rates, FX, commodities) and cross-asset diversification pays'),
    officialUrl: 'https://www.virtus.com/',
    officialLabel: 'Virtus',
  },

  mrgr: {
    yahooSymbol: 'MRGR',
    hubCategoryId: 'arbitrage',
    badge: 'Arbitrage',
    h1Title: 'MRGR — ProShares Merger ETF',
    displayTicker: 'MRGR',
    issuer: 'ProShares',
    inception: 'Dec 2012',
    mer: '0.75%',
    aum: '~$16M',
    pageTitle: 'MRGR ETF — Alpha Stacking',
    description: 'ProShares Merger ETF (MRGR): S&P Merger Arbitrage Index exposure.',
    lede:
      'MRGR tracks the S&P Merger Arbitrage Index—rules-based exposure to global merger-arbitrage dynamics in a single listed wrapper.',
    strategyParas: [
      'The index targets announced M&A situations per S&P’s methodology; positioning and rebalancing rules are in ProShares disclosures.',
      'Replication gap vs. the underlying index and financing costs can matter—compare fund NAV to index over full cycles.',
    ],
    pedigreeParas: ped(
      'ProShares',
      'ProShares is one of the largest U.S. issuers of leveraged, inverse, and strategic beta ETPs; aggregate sponsor footprint is in the tens of billions USD in industry league data (order of magnitude).'
    ),
    outperfParas: outf(
      'deal spreads are wide and completions run on schedule—environments where merger-arbitrage beta pays versus choppy deal breaks'
    ),
    officialUrl: 'https://www.proshares.com/our-etfs/strategic/mrgr',
    officialLabel: 'ProShares (MRGR)',
  },
}

export const CA_ETF_DYNAMIC_REGISTRY: Record<string, EtfDynamicDef> = {
  rgbm: {
    yahooSymbol: 'RGBM.TO',
    hubCategoryId: 'return-stacked',
    badge: 'Return Stacked',
    h1Title: 'RGBM.TO — Return Stacked® Global Balanced & Macro ETF',
    displayTicker: 'RGBM / RGBM.U',
    issuer: 'LongPoint / Return Stacked® ETFs Canada',
    inception: 'Feb 2025',
    structure: 'Alternative mutual fund (TSX)',
    mer: '0.85% mgmt + performance fee (see prospectus)',
    aum: '~$33M CAD',
    pageTitle: 'RGBM.TO ETF — Alpha Stacking',
    description: 'Return Stacked® Global Balanced & Macro ETF (RGBM.TO), Canadian listing.',
    lede:
      'RGBM stacks a global balanced sleeve with a systematic macro sleeve—roughly a dollar of each type of exposure per dollar invested, via leverage and derivatives.',
    strategyParas: [
      'Disclosures describe global equities and fixed income sleeves paired with a macro trend book across rates, currencies, and commodities.',
      'Leverage magnifies outcomes; read performance fees, benchmarks, and risk limits in the prospectus.',
    ],
    pedigreeParas: ped(
      'LongPoint / ReSolve / Newfound (sub-advisors per offering docs)',
      'Return Stacked Canada is a narrow ETF franchise; sponsor scale is modest versus Big-Six bank asset managers—see offering documents for sponsor context.'
    ),
    outperfParas: outf(
      'macro trends persist and the balanced sleeve stays diversified—environments where the second sleeve diversifies equity drawdowns'
    ),
    officialUrl: 'https://www.returnstackedetfs.ca/',
    officialLabel: 'Return Stacked® ETFs Canada',
  },

  onec: {
    yahooSymbol: 'ONEC.TO',
    hubCategoryId: 'premia-systematic-alternatives',
    badge: 'Premia and systematic alternatives',
    h1Title: 'ONEC.TO — Accelerate OneChoice Alternative Multi-Asset Fund',
    displayTicker: 'ONEC',
    issuer: 'Accelerate Financial Technologies',
    inception: '—',
    structure: 'Alternative ETF',
    mer: '—',
    aum: '~$95M CAD',
    pageTitle: 'ONEC.TO ETF — Alpha Stacking',
    description: 'Accelerate OneChoice Alternative Multi-Asset Fund (ONEC.TO).',
    lede:
      'ONEC is a single-ticket multi-alternative sleeve: mixes of credit, macro, long/short equity, and real-asset exposures per Accelerate’s mandate.',
    strategyParas: [
      'Fund-of-funds or multi-manager implementation can add fee layers; verify sleeve weights and liquidity in ETF Facts.',
      'Alternatives correlation benefits are not guaranteed—stress-test vs. your equity and bond books.',
    ],
    pedigreeParas: ped(
      'Accelerate Financial Technologies',
      'Accelerate is a Canadian alternative-ETF specialist; it does not publish bank-tier consolidated AUM, and aggregate firm size is far smaller than major bank wealth arms.'
    ),
    outperfParas: outf('dispersion and alternative premia are rich—when non-directional sleeves earn outside core beta'),
    officialUrl: 'https://accelerateshares.com/',
    officialLabel: 'Accelerate ETFs',
  },

  pfaa: {
    yahooSymbol: 'PFAA.TO',
    hubCategoryId: 'premia-systematic-alternatives',
    badge: 'Premia and systematic alternatives',
    h1Title: 'PFAA.TO — Picton Mahoney Multi-Strategy Alpha Alternative Fund ETF',
    displayTicker: 'PFAA',
    issuer: 'Picton Mahoney',
    inception: '—',
    structure: 'Alternative ETF',
    mer: '—',
    aum: '~$78M CAD',
    pageTitle: 'PFAA.TO ETF — Alpha Stacking',
    description: 'Picton Mahoney multi-strategy alpha alternatives ETF (PFAA.TO).',
    lede:
      'PFAA packages Picton Mahoney’s multi-strategy alpha process—long/short, relative value, and macro sleeves—in an ETF structure.',
    strategyParas: [
      'Multi-strategy funds rotate risk budgets across teams; transparency is limited to periodic disclosures.',
      'Fees and performance fees may apply—read the simplified prospectus.',
    ],
    pedigreeParas: ped(
      'Picton Mahoney Asset Management',
      'PICTON Investments has cited low-teens billions CAD in firm assets under management in recent issuer communications—confirm the current headline on pictoninvestments.com.'
    ),
    outperfParas: outf('cross-strategy diversification works—when at least one sleeve is in a favorable regime'),
    officialUrl: 'https://pictonmahoney.com/',
    officialLabel: 'Picton Mahoney',
  },

  zlb: {
    yahooSymbol: 'ZLB.TO',
    hubCategoryId: 'factor',
    badge: 'Factor',
    h1Title: 'ZLB.TO — BMO Low Volatility Canadian Equity ETF',
    displayTicker: 'ZLB',
    issuer: 'BMO Asset Management',
    inception: 'Oct 2011',
    mer: '0.35%',
    aum: '~$5.9B CAD',
    pageTitle: 'ZLB.TO ETF — Alpha Stacking',
    description: 'BMO Low Volatility Canadian Equity ETF (ZLB.TO).',
    lede:
      'ZLB tracks a rules-based Canadian equity sleeve tilted toward historically lower-beta names—a domestic low-volatility factor fund.',
    strategyParas: [
      'The methodology screens and weights TSX names for lower market sensitivity; sector tilts can cluster defensively.',
      'Low vol can lag sharply in speculative rallies—expect tracking error vs. cap-weight Canada.',
    ],
    pedigreeParas: ped(
      'BMO Asset Management',
      'BMO Financial Group reported company-wide assets under management of about CDN $507 billion at Oct. 31, 2025 (annual report), spanning the bank—not ETFs alone.'
    ),
    outperfParas: outf('risk-off tone and quality leadership persist—when investors pay up for stable cash flows'),
    officialUrl: 'https://www.bmo.com/en-ca/main/etfs/',
    officialLabel: 'BMO ETFs',
  },

  atsx: {
    yahooSymbol: 'ATSX.TO',
    hubCategoryId: 'long-short',
    badge: 'Long/short',
    h1Title: 'ATSX.TO — Accelerate Canadian Long Short Equity Fund',
    displayTicker: 'ATSX',
    issuer: 'Accelerate Financial Technologies',
    inception: '—',
    structure: 'Alternative ETF',
    mer: '—',
    aum: '~$42M CAD',
    pageTitle: 'ATSX.TO ETF — Alpha Stacking',
    description: 'Accelerate Canadian Long Short Equity Fund (ATSX.TO).',
    lede:
      'ATSX runs a quantitative 150/50 Canadian long/short sleeve vs. the S&P/TSX 60—directional hedge-fund-style exposure in an ETF.',
    strategyParas: [
      'Net and gross exposures are model-driven; factor tilts can cluster by sector and size.',
      'Leverage inside the long/short book amplifies both alpha and error terms.',
    ],
    pedigreeParas: ped(
      'Accelerate Financial Technologies',
      'Accelerate is a Canadian alternative-ETF specialist; it does not publish bank-tier consolidated AUM, and aggregate firm size is far smaller than major bank wealth arms.'
    ),
    outperfParas: outf('Canadian dispersion is high and factor signals separate winners from laggards'),
    officialUrl: 'https://accelerateshares.com/',
    officialLabel: 'Accelerate ETFs',
  },

  pfls: {
    yahooSymbol: 'PFLS.TO',
    hubCategoryId: 'long-short',
    badge: 'Long/short',
    h1Title: 'PFLS.TO — Picton Mahoney Fortified Long Short Alternative Fund ETF',
    displayTicker: 'PFLS',
    issuer: 'Picton Mahoney',
    inception: '—',
    structure: 'Alternative ETF',
    mer: '—',
    aum: '~$62M CAD',
    pageTitle: 'PFLS.TO ETF — Alpha Stacking',
    description: 'Picton Mahoney Fortified Long Short Alternative Fund ETF (PFLS.TO).',
    lede:
      'PFLS pursues global long/short equity with moderate net exposure—Authentic Hedge®-style risk management in an ETF wrapper.',
    strategyParas: [
      'Moderate net keeps some equity beta while short books hedge factor risks; verify leverage and shorts in disclosures.',
      'Global sleeves add currency exposures—check hedging policy.',
    ],
    pedigreeParas: ped(
      'Picton Mahoney Asset Management',
      'PICTON Investments has cited low-teens billions CAD in firm assets under management in recent issuer communications—confirm the current headline on pictoninvestments.com.'
    ),
    outperfParas: outf('leadership spreads within sectors reward pair trades and moderate net profiles'),
    officialUrl: 'https://pictonmahoney.com/',
    officialLabel: 'Picton Mahoney',
  },

  tgaf: {
    yahooSymbol: 'TGAF.TO',
    hubCategoryId: 'long-short',
    badge: 'Long/short',
    h1Title: 'TGAF.TO — Tralucent Global Alt (Long/Short) Equity Fund ETF',
    displayTicker: 'TGAF',
    issuer: 'Tralucent Asset Management',
    inception: 'Nov 2023',
    structure: 'Alternative ETF',
    mer: '~1.0%',
    aum: '~$75M+ CAD (total fund)',
    pageTitle: 'TGAF.TO ETF — Alpha Stacking',
    description: 'Tralucent Global Alt (Long/Short) Equity Fund ETF (TGAF.TO).',
    lede:
      'TGAF is a global long/short equity ETF—roughly 100% long and ~40% short across 200+ names—benchmarked to MSCI ACWI NR (CAD).',
    strategyParas: [
      'The manager combines bottom-up stock picking with shorting and optionality; read gross/net targets in offering docs.',
      'Alternative mutual fund status permits wider tools than plain equity ETFs—complexity and fees rise accordingly.',
    ],
    pedigreeParas: [
      'Tralucent’s materials frame TGAF as an ETF unit class of the same Tralucent Global Alt (Long/Short) Equity Fund that has run since March 2020—first offered under an offering memorandum, later as conventional fund classes, then as TSX-listed ETF units (November 2023). It is the same mandate and sleeve in a different wrapper, not a separate product line with a different book.',
      'The ~$55M figure in Tralucent’s November 2023 ETF launch materials referred to company-wide AUM, not total net assets of this fund. TGAF is Class E of one pooled trust with the A, M, and F series on the same portfolio; total fund net assets (all unit classes, one book) are materially larger than that firm-level headline—use the simplified prospectus Fund Facts or fund financial statements for the current figure.',
    ],
    outperfParas: outf('global dispersion is wide and stock selection alpha exceeds macro headwinds'),
    officialUrl: 'https://tralucent.ca/',
    officialLabel: 'Tralucent Asset Management',
  },

  dglm: {
    yahooSymbol: 'DGLM.TO',
    hubCategoryId: 'global-macro',
    badge: 'Global macro',
    h1Title: 'DGLM.TO — Desjardins Global Macro ETF',
    displayTicker: 'DGLM',
    issuer: 'Desjardins Global Asset Management',
    inception: '—',
    structure: 'Alternative ETF',
    mer: '—',
    aum: '~$32M CAD',
    pageTitle: 'DGLM.TO ETF — Alpha Stacking',
    description: 'Desjardins Global Macro ETF (DGLM.TO).',
    lede:
      'DGLM is a long/short global macro sleeve—equities, rates, commodities, and currencies—with Graham Capital noted as sub-advisor in disclosures.',
    strategyParas: [
      'Macro sleeves rotate risk with macro themes; leverage and derivatives use can be material.',
      'Alternative ETF status allows flexibility; read the simplified prospectus for exposure bands.',
    ],
    pedigreeParas: ped(
      'Desjardins Global Asset Management / Graham Capital (sub-advisor)',
      'Desjardins Group reported about $123 billion in assets under management at Dec. 31, 2025 (annual reporting); Desjardins Global Asset Management is the institutional asset-management arm (Graham Capital is a sub-advisor to this fund).'
    ),
    outperfParas: outf('macro regimes separate asset classes—when rates, FX, and commodity trends diverge sharply'),
    officialUrl: 'https://www.desjardins.com/',
    officialLabel: 'Desjardins',
  },

  btccb: {
    yahooSymbol: 'BTCC-B.TO',
    hubCategoryId: 'crypto',
    badge: 'Crypto & digital assets',
    h1Title: 'BTCC-B.TO — Purpose Bitcoin ETF',
    displayTicker: 'BTCC.B',
    issuer: 'Purpose Investments',
    inception: 'Feb 2021',
    structure: 'Spot Bitcoin ETF',
    mer: '~1.0%',
    aum: '~$1.5B+ CAD',
    pageTitle: 'BTCC-B.TO ETF — Alpha Stacking',
    description: 'Purpose Bitcoin ETF, CAD unhedged units (BTCC-B.TO)—physically settled spot Bitcoin.',
    lede:
      'BTCC-B is Purpose’s CAD unhedged unit class of the first Canadian spot Bitcoin ETF—direct Bitcoin custody in cold storage, priced in Canadian dollars.',
    strategyParas: [
      'Physically backed: the fund holds BTC; NAV tracks the reference index and custodian pricing—see Purpose’s ETF Facts for fees and replication details.',
      'Crypto is extremely volatile; regulatory, custody, and FX (CAD vs. USD BTC) effects can diverge from holding coins directly.',
    ],
    pedigreeParas: ped(
      'Purpose Investments',
      'Purpose is an independent Canadian ETF issuer with a broad lineup including crypto spot products; firm scale is smaller than Big-Six bank asset managers—verify group AUM on purposeinvest.com.'
    ),
    outperfParas: outf(
      'bitcoin trends cleanly with supportive liquidity and risk appetite—while drawdowns remain severe when macro and leverage unwind'
    ),
    officialUrl: 'https://www.purposeinvest.com/funds/purpose-bitcoin-etf',
    officialLabel: 'Purpose Investments',
  },

  ethxb: {
    yahooSymbol: 'ETHX-B.TO',
    hubCategoryId: 'crypto',
    badge: 'Crypto & digital assets',
    h1Title: 'ETHX-B.TO — CI Galaxy Ethereum ETF',
    displayTicker: 'ETHX.B',
    issuer: 'CI Global Asset Management',
    inception: 'Apr 2021',
    structure: 'Spot Ether ETF',
    mer: '~0.7%',
    aum: '~$650M CAD',
    pageTitle: 'ETHX-B.TO ETF — Alpha Stacking',
    description: 'CI Galaxy Ethereum ETF, CAD unhedged units (ETHX-B.TO)—physically settled spot Ether.',
    lede:
      'ETHX-B holds spot Ether in custody—CI and Galaxy’s Canadian-listed sleeve with a competitive fee versus many alt ETH wrappers.',
    strategyParas: [
      'Direct ETH exposure; staking and on-chain yield are generally outside a plain spot ETF—read the simplified prospectus for permitted activities.',
      'Ether beta is high-volatility and highly correlated to crypto liquidity cycles; layer-2 and protocol narratives can move ETH faster than broad equity beta.',
    ],
    pedigreeParas: ped(
      'CI Global Asset Management / Galaxy Digital (sub-advisor)',
      'CI Global Asset Management is one of Canada’s largest independent asset managers; Galaxy Digital advises on crypto implementation—confirm consolidated figures in CI Financial Corp. reporting.'
    ),
    outperfParas: outf(
      'risk-on liquidity and ETH-specific catalysts align—when network usage and fee markets support the bull case for the asset'
    ),
    officialUrl: 'https://funds.cifinancial.com/en/funds/alternative_investments/CIGalaxyEthereumETF.html',
    officialLabel: 'CI Galaxy Ethereum ETF',
  },
}
