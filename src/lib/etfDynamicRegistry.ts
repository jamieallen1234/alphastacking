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

const PED_VERIFY =
  'Verify fees, leverage or short limits, tax character, and current holdings on the issuer’s official ETF page and filings—this site is educational only, not a recommendation.'

/** One or more pedigree paragraphs, then a shared verification line. */
function ped(...main: string[]): string[] {
  return [...main, PED_VERIFY]
}

function cryptoLede(ticker: string, thesis: string): string {
  return `${ticker} is an exchange-traded product that, per sponsor disclosures, ${thesis}`
}

export const US_ETF_DYNAMIC_REGISTRY: Record<string, EtfDynamicDef> = {
  begs: {
    yahooSymbol: 'BEGS',
    hubCategoryId: 'crypto',
    badge: 'Crypto & digital assets',
    h1Title: 'BEGS — Rareview 2x Bull Cryptocurrency & Precious Metals ETF',
    displayTicker: 'BEGS',
    issuer: 'Rareview Capital',
    inception: 'Feb 7, 2025',
    mer: '0.99%',
    aum: '~$12M',
    pageTitle: 'BEGS ETF — Alpha Stacking',
    description: 'Rareview 2x Bull Cryptocurrency & Precious Metals ETF (BEGS): leveraged crypto + metals sleeve.',
    lede: cryptoLede(
      'BEGS',
      'targets leveraged long exposure to a blended cryptocurrency and precious-metals basket using derivatives and ETPs.'
    ),
    strategyParas: [
      'BEGS is a 2× long sleeve: the sponsor uses futures, swaps, and other ETPs to stack crypto and precious-metals beta into one listed vehicle—daily reset and compounding math mean path dependence differs from simply holding spot coins or bullion.',
      'Collateral, exchange limits, and borrow/funding markets for the underlying sleeves can gap versus NAV; read Rareview’s prospectus for the exact basket, rebalance rules, and risk factors before sizing.',
    ],
    pedigreeParas: ped(
      `Rareview Capital is an independent ETF issuer focused on thematic and digital-asset products; it operates outside the Big Three index oligopoly, so distribution and research coverage are thinner than mega-brand funds—confirm current firm figures on rareviewcapital.com or Form ADV filings rather than third-party aggregators.`,
      `Because BEGS is small-cap by AUM and trades leveraged exposure, bid/ask spreads and premium/discount to NAV can swing harder than large plain-vanilla ETFs—liquidity is part of the “implementation beta” you own alongside the strategy.`,
    ),
    outperfParas: [
      'The design shines when both digital assets and precious metals trend with supportive volatility—gold catching a real-rate or stress bid while crypto retains speculative liquidity often produces the cleanest dual-beta tape for a leveraged long wrapper.',
      'Sharp reversals, correlated selloffs across metals and tokens, or funding spikes that invert futures curves are the natural adversaries—favorable windows are trending, not chop-filled, regimes where you can tolerate daily reset behavior.',
    ],
    officialUrl:
      'https://rareviewcapital.com/2x-bull-cryptocurrency-precious-metals-etf/',
    officialLabel: 'Rareview (BEGS)',
  },

  btgd: {
    yahooSymbol: 'BTGD',
    hubCategoryId: 'crypto',
    badge: 'Crypto & digital assets',
    h1Title: 'BTGD — STKd 100% Bitcoin & 100% Gold ETF',
    displayTicker: 'BTGD',
    issuer: 'Quantify Funds',
    inception: 'Oct 15, 2024',
    mer: '1.05%',
    aum: '~$45M',
    pageTitle: 'BTGD ETF — Alpha Stacking',
    description: 'STKd 100% Bitcoin & 100% Gold ETF (BTGD): stacked bitcoin and gold exposure.',
    lede: cryptoLede(
      'BTGD',
      'seeks simultaneous ~100% bitcoin and ~100% gold exposure via futures and ETPs in a capital-efficient structure.'
    ),
    strategyParas: [
      'Quantify’s “STKd” line is explicitly about stacking two sleeves of notional exposure per dollar invested—bitcoin futures/ETPs for digital scarcity beta and gold futures/ETPs for monetary-metal beta—so collateral, margin, and roll mechanics are the entire game versus holding physical coins and bars.',
      'When both legs trend together, compounding can feel exhilarating; when they diverge violently (risk-on crypto vs. risk-off gold), the fund must rebalance risk budgets—read the supplement for how weights are reset and what happens around CME or exchange halts.',
    ],
    pedigreeParas: ped(
      `Quantify Funds is a California-based issuer that has leaned into branded “stacked” ETPs rather than broad passive lineups; it is not a top-ten sponsor by AUM, so operational resilience depends on a narrow product set and focused distribution—verify any firm-level metrics on quantifyfunds.com.`,
      `Because BTGD sits in the same ecosystem as Quantify’s IncomeSTKd funds, compare fee stacks and options overlays across tickers so you are not accidentally doubling the same macro bet in multiple products.`,
    ),
    outperfParas: [
      'You want regimes where bitcoin’s liquidity cycle and gold’s real-rate / FX sensitivity are both working—not necessarily in the same direction every day, but with clean trends that futures books can ride without constant whipsaw.',
      'The hardest tape is sharp deleveraging that hits crypto funding while gold spikes on flight-to-quality—both can move fast, but correlation spikes can still stress dual-book margin; sizing should assume gap risk, not smooth Gaussian returns.',
    ],
    officialUrl: 'https://quantifyfunds.com/btgd',
    officialLabel: 'Quantify Funds (BTGD)',
  },

  isbg: {
    yahooSymbol: 'ISBG',
    hubCategoryId: 'crypto',
    badge: 'Crypto & digital assets',
    h1Title: 'ISBG — IncomeSTKd 1x Bitcoin & 1x Gold Premium ETF',
    displayTicker: 'ISBG',
    issuer: 'Quantify Funds',
    inception: 'Jan 20, 2026',
    mer: '1.14%',
    aum: '~$28M',
    pageTitle: 'ISBG ETF — Alpha Stacking',
    description: 'IncomeSTKd bitcoin + gold premium ETF (ISBG).',
    lede: cryptoLede(
      'ISBG',
      'combines bitcoin and gold beta with an options-income overlay aimed at periodic distributions.'
    ),
    strategyParas: [
      'ISBG is not just dual beta: Quantify layers listed options (typically on equity or futures proxies) to harvest implied volatility while funding distributions—so you are long two macro sleeves and short convexity in specific strike zones; gap-through risk after earnings or macro prints is the trade-off for yield.',
      'Distribution yield can mix ordinary income, short-term gains, and return of capital; tax character changes with option rolls—use ETF Facts and the Section 19 notices rather than assuming “bond-like coupon.”',
    ],
    pedigreeParas: ped(
      `Quantify’s IncomeSTKd suite competes with yield-focused crypto ETPs from larger sponsors; its edge is packaging bespoke stacks for RIAs who want tickers instead of separately managed option books—scale is boutique, so monitoring capacity in the options markets matters more than for trillion-dollar complexes.`,
      `Because ISBG shares sponsor DNA with BTGD/ISSB, read each prospectus side by side: sleeve weights, fee breakpoints, and whether the same desk runs the option overlay for multiple tickers.`,
    ),
    outperfParas: [
      'Premium harvesting works when implied vol is rich but realized paths stay range-bound—think gold grinding with upward skew and bitcoin oscillating inside a band rather than vertical melt-ups or liquidation cascades.',
      'The constructive case is a “carry plus diversifier” window: both underlyings behave well enough that short options survive, yet not so explosively that wings blow through strikes—when either leg gaps, expect NAV to reflect option loss before the metals/crypto story even finishes printing.',
    ],
    officialUrl: 'https://quantifyfunds.com/isbg',
    officialLabel: 'Quantify Funds (ISBG)',
  },

  issb: {
    yahooSymbol: 'ISSB',
    hubCategoryId: 'crypto',
    badge: 'Crypto & digital assets',
    h1Title: 'ISSB — IncomeSTKd 1x US Stocks & 1x Bitcoin Premium ETF',
    displayTicker: 'ISSB',
    issuer: 'Quantify Funds',
    inception: 'Jan 20, 2026',
    mer: '1.14%',
    aum: '~$22M',
    pageTitle: 'ISSB ETF — Alpha Stacking',
    description: 'IncomeSTKd US stocks + bitcoin premium ETF (ISSB).',
    lede: cryptoLede(
      'ISSB',
      'pairs large-cap U.S. equity beta with bitcoin beta and an options-premium sleeve for income.'
    ),
    strategyParas: [
      'ISSB explicitly marries S&P 500–style equity beta with bitcoin futures/ETP exposure, then sells volatility to fund distributions—so correlations matter: when stocks and bitcoin sell off together, short option legs can face simultaneous pressure on two uncorrelated “short vol” books.',
      'Collateral routing between equity futures, Treasury bills, and crypto derivatives is spelled out in the prospectus; any mismatch during stress weeks is where tracking error versus a mental model of “QQQ + BTC + yield” shows up.',
    ],
    pedigreeParas: ped(
      `Quantify pitches ISSB to advisors who want a single-ticker “traditional risk asset + digital risk asset + income” story; the sponsor is not trying to compete with Vanguard on expense ratios—it competes on structure, which means you must understand the derivative stack, not just the marketing slide.`,
      `Given the sleeve overlap with other Quantify stacked products, map your aggregate exposure across accounts so you are not stacking multiple short-vol books on the same S&P and BTC betas.`,
    ),
    outperfParas: [
      'Ideal tape: large-cap equities grind higher on earnings while bitcoin provides a diversifying liquidity beta, and index implied volatility sits high enough that the overlay captures carry without repeated gap-through.',
      'Hard tape: macro shocks that hammer both books (2022-style) or liquidity vacuums where bitcoin gaps down faster than options models price—favorable regimes are “orderly risk-on with vol to sell,” not synchronized crash weeks.',
    ],
    officialUrl: 'https://quantifyfunds.com/issb',
    officialLabel: 'Quantify Funds (ISSB)',
  },

  ooqb: {
    yahooSymbol: 'OOQB',
    hubCategoryId: 'crypto',
    badge: 'Crypto & digital assets',
    h1Title: 'OOQB — One+One™ Nasdaq-100® and Bitcoin ETF',
    displayTicker: 'OOQB',
    issuer: 'Volatility Shares',
    inception: 'Feb 18, 2025',
    mer: '0.85%',
    aum: '~$180M',
    pageTitle: 'OOQB ETF — Alpha Stacking',
    description: 'One+One Nasdaq-100 and Bitcoin ETF (OOQB).',
    lede: cryptoLede(
      'OOQB',
      'targets ~100% Nasdaq-100 exposure alongside ~100% bitcoin futures exposure in one listed wrapper.'
    ),
    strategyParas: [
      'Volatility Shares built its franchise engineering listed products around volatility and convexity; OOQB extends that toolkit to “One+One” stacking—Nasdaq-100 futures or swaps plus bitcoin futures so each dollar of NAV carries roughly a dollar of each risk factor before fees.',
      'Because both sleeves are high-beta, margin and exchange rules can force de-risking faster than a 60/40 fund—read the prospectus for concentration limits, collateral eligible securities, and what happens if one leg limits up or down while the other is open.',
    ],
    pedigreeParas: ped(
      `Volatility Shares is best known for VIX-linked ETPs that broke new ground (and new risk education) for U.S. investors; the sponsor’s DNA is derivatives engineering, not plain-vanilla indexing—OOQB inherits that culture: tight operations desks, aggressive disclosure updates, and a user base that understands path risk.`,
      `Listed AUM across Volatility Shares’ complex is meaningful within structured ETPs but still a fraction of BlackRock or State Street—expect episodic liquidity pockets around headline crypto moves rather than continuous tight spreads like SPY.`,
    ),
    outperfParas: [
      'You are paid for tolerating double-barreled growth risk: mega-cap tech leadership (Nasdaq) plus global liquidity flows into bitcoin futures when both trend, dispersion stays orderly, and funding markets behave.',
      'The constructive regime is “AI capex + risk-on liquidity” without a simultaneous deleveraging in crypto—if bitcoin funding blows out while Nasdaq gaps down, both legs correlate higher than marketing decks imply, so favor windows where each sleeve has independent drivers.',
    ],
    officialUrl:
      'https://www.sec.gov/Archives/edgar/data/1884021/000121390025015195/ea0230938-03_497k.htm',
    officialLabel: 'Volatility Shares — SEC summary prospectus (OOQB)',
  },

  oosb: {
    yahooSymbol: 'OOSB',
    hubCategoryId: 'crypto',
    badge: 'Crypto & digital assets',
    h1Title: 'OOSB — One+One™ S&P 500® and Bitcoin ETF',
    displayTicker: 'OOSB',
    issuer: 'Volatility Shares',
    inception: 'Feb 18, 2025',
    mer: '0.85%',
    aum: '~$95M',
    pageTitle: 'OOSB ETF — Alpha Stacking',
    description: 'One+One S&P 500 and Bitcoin ETF (OOSB).',
    lede: cryptoLede(
      'OOSB',
      'targets ~100% S&P 500 exposure alongside ~100% bitcoin futures in a single fund.'
    ),
    strategyParas: [
      'OOSB swaps broad U.S. large-cap beta for Nasdaq in OOQB’s recipe—same stacking idea, different equity factor: you inherit S&P sector breadth (financials, industrials, defensives) alongside bitcoin’s idiosyncratic path.',
      'Implementation still relies on futures/swap stacks; compare roll yields on S&P futures versus CME bitcoin contracts when contango/backwardation dominates P&L more than cash equity dividends.',
    ],
    pedigreeParas: ped(
      `Volatility Shares remains one of the few issuers repeatedly bringing “vol + crypto + equity stack” ideas to market quickly; regulators and exchanges treat these filings with scrutiny, so prospectus supplements are often the best real-time source for exposure caps.`,
      `Because OOQB and OOSB share sponsor DNA, stress-test them as siblings: if you own both, you may be doubling bitcoin risk while swapping Nasdaq for S&P—be explicit about the net macro bet.`,
    ),
    outperfParas: [
      'Works best when the S&P grinds higher on broad earnings while bitcoin captures a parallel liquidity bid—diversification shows up when correlations stay below one even as both rise.',
      'Hard when macro tightening hits every risk asset simultaneously; the sleeve is not a hedge fund—it is two high-beta sleeves in one wrapper—favorable periods are orderly bull markets with functioning futures markets, not liquidity earthquakes.',
    ],
    officialUrl:
      'https://www.sec.gov/Archives/edgar/data/1884021/000121390025015194/ea0230935-03_497k.htm',
    officialLabel: 'Volatility Shares — SEC summary prospectus (OOSB)',
  },

  rssx: {
    yahooSymbol: 'RSSX',
    hubCategoryId: 'crypto',
    badge: 'Crypto & digital assets',
    h1Title: 'RSSX — Return Stacked U.S. Stocks & Gold/Bitcoin ETF',
    displayTicker: 'RSSX',
    issuer: 'Tidal / Return Stacked ETFs',
    inception: 'May 29, 2025',
    mer: '0.68%',
    aum: '~$55M',
    pageTitle: 'RSSX ETF — Alpha Stacking',
    description: 'Return Stacked U.S. Stocks & Gold/Bitcoin ETF (RSSX).',
    lede:
      'RSSX applies the Return Stacked® design: large-cap U.S. equity exposure layered with gold and bitcoin sleeves in one fund.',
    strategyParas: [
      'RSSX is the Return Stacked® line’s “equity + hard assets + digital scarcity” experiment: filings describe how much notional gold and bitcoin exposure sits alongside the U.S. large-cap sleeve, including whether sleeves use futures, trusts, or swaps and how collateral is partitioned.',
      'Because gold and bitcoin can respond oppositely to real rates, the fund can behave like a barbell—until liquidity crises correlate everything; read the risk factors on simultaneous drawdowns in equities and crypto.',
    ],
    pedigreeParas: ped(
      `Tidal Investments acts as adviser on a shelf of thematic and alternatives ETFs; Return Stacked® is a partner brand (ReSolve/Newfound intellectual lineage) focused on capital-efficient multi-sleeve portfolios—smaller than mega banks but purpose-built for advisor education and transparent sleeves.`,
      `The intellectual capital behind Return Stacked® comes from systematic managers who publish research on stacking premia; that matters because marketing decks align with actual portfolio construction more closely than many generic thematic funds.`,
    ),
    outperfParas: [
      'The payoff diagram shines when U.S. equities deliver carry while gold hedges real-rate shocks and bitcoin captures speculative liquidity—three sleeves, three different macro channels.',
      'Constructive environments are “macro disagreement” markets: rates and risk appetite send different signals to each sleeve—when every asset class moves in lockstep down, stacking does not magically erase beta.',
    ],
    officialUrl:
      'https://www.returnstackedetfs.com/rssx-return-stacked-us-stocks-gold-bitcoin/',
    officialLabel: 'Return Stacked ETFs (RSSX)',
  },

  wtib: {
    yahooSymbol: 'WTIB',
    hubCategoryId: 'crypto',
    badge: 'Crypto & digital assets',
    h1Title: 'WTIB — USCF Oil Plus Bitcoin Strategy Fund',
    displayTicker: 'WTIB',
    issuer: 'USCF Investments',
    inception: 'Dec 9, 2025',
    mer: '0.93%',
    aum: '~$18M',
    pageTitle: 'WTIB ETF — Alpha Stacking',
    description: 'USCF Oil Plus Bitcoin Strategy Fund (WTIB).',
    lede:
      'WTIB combines crude oil and bitcoin futures/ETP exposure in an actively managed sleeve targeting balanced notional risk across the two themes.',
    strategyParas: [
      'Unlike passive dual-beta ETFs, WTIB is actively allocated between crude oil futures/ETPs and bitcoin futures/ETPs—USCF’s commodity heritage (USO lineage) shows up in how the desk tilts when curve shape or crypto volatility dominates.',
      'Oil curve (WTI contango/backwardation) and bitcoin funding can each drag NAV for months unrelated to spot “story”—read shareholder letters for recent positioning bands.',
    ],
    pedigreeParas: ped(
      `USCF Investments built its reputation on listed commodity ETPs before crypto became investable at scale; the firm’s infrastructure is energy-markets native, meaning bitcoin is bolted onto a commodity operations stack rather than the other way around—understand which desk systems handle each leg.`,
      `USCF’s broader complex is typically quoted in the low billions USD of ETP assets—meaningful in commodities, tiny versus integrated banks—expect WTIB to remain a specialist satellite holding.`,
    ),
    outperfParas: [
      'Best when oil catches a supply-demand shock or geopolitical premium while bitcoin trades on its own liquidity cycle—macro “reflation + digitization” narratives can lift both, but independence is the diversification pitch.',
      'Hardest when dollar liquidity vanishes and every high-beta sleeve sells together; WTIB is not a hedge—favorable tape is trending energy with orderly crypto funding, not synchronized deleveraging.',
    ],
    officialUrl: 'https://www.uscfinvestments.com/wtib',
    officialLabel: 'USCF Investments (WTIB)',
  },

  rsst: {
    yahooSymbol: 'RSST',
    hubCategoryId: 'return-stacked-ge-2x',
    badge: 'Return Stacked - 2x',
    h1Title: 'RSST — Return Stacked U.S. Stocks & Managed Futures ETF',
    displayTicker: 'RSST',
    issuer: 'Tidal / Return Stacked ETFs',
    inception: 'Sep 5, 2023',
    mer: '1.04%',
    aum: '~$340M',
    pageTitle: 'RSST ETF — Alpha Stacking',
    description: 'Return Stacked U.S. Stocks & Managed Futures ETF (RSST).',
    lede:
      'RSST targets roughly dollar-for-dollar large-cap U.S. equity alongside a systematic managed-futures sleeve—return stacking in a single ticker.',
    strategyParas: [
      'Filings describe roughly a dollar of U.S. large-cap equity exposure layered with a dollar of systematic managed-futures exposure—implemented with futures, swaps, and cash collateral so each NAV dollar carries two macro engines before fees and roll costs.',
      'The CTA sleeve is trend- and macro-style across rates, FX, and commodities; when equity and trend signals disagree, margin and correlation assumptions in the prospectus matter more than a simple “60/40 plus alts” mental model.',
    ],
    pedigreeParas: ped(
      `Return Stacked® is the retail wrapper for intellectual capital from ReSolve / Newfound-style systematic research—Tidal acts as adviser on a shelf built to explain capital efficiency to advisors, not to hide sleeves inside opaque hedge funds.`,
      `Tidal’s footprint is boutique versus BlackRock, but the mandate is institutional in spirit: model-driven rebalances, published philosophy, and shareholder reports that deserve a quarterly read because gross and net futures exposure can shift with volatility targeting.`,
    ),
    outperfParas: [
      'You earn the design fee when equities grind higher while managed futures harvest directional trends elsewhere—rates breaking one way, dollar trends, or commodity curves—so the second sleeve diversifies equity path risk instead of doubling it.',
      'CTA engines bleed in fast mean-reversion or liquidity shocks that invert signals; favorable tape is persistent macro trends with orderly futures markets, not every quarter where stocks and bonds both sell off in sync.',
    ],
    officialUrl:
      'https://www.returnstackedetfs.com/rsst-return-stacked-us-stocks-managed-futures/',
    officialLabel: 'Return Stacked ETFs (RSST)',
  },

  ntsd: {
    yahooSymbol: 'NTSD',
    hubCategoryId: 'return-stacked-lt-2x',
    badge: 'Return Stacked - Lower Leverage',
    h1Title: 'NTSD — WisdomTree Efficient U.S. Plus International Equity Fund',
    displayTicker: 'NTSD',
    issuer: 'WisdomTree',
    inception: 'Mar 19, 2026',
    mer: '0.35%',
    aum: '~$420M',
    pageTitle: 'NTSD ETF — Alpha Stacking',
    description: 'WisdomTree Efficient U.S. Plus International Equity Fund (NTSD).',
    lede:
      'NTSD is a capital-efficient 90/60-style sleeve: U.S. large-cap equities plus developed international equity exposure via futures and related instruments.',
    strategyParas: [
      'WisdomTree’s “efficient” line uses futures and swaps to add developed international beta on top of a U.S. equity sleeve without fully doubling cash equity—exact notional targets and eligible markets live in the prospectus and methodology PDF, including how MSCI EAFE-style exposure is collateralized.',
      'Roll yield on international equity index futures and dividend-withholding mechanics can diverge from owning ADRs or local shares for years at a time; compare realized tracking versus a 50/50 split of VTI and VEA if you want to see where implementation alpha or drag shows up.',
    ],
    pedigreeParas: ped(
      `WisdomTree built its brand on fundamentally weighted and capital-efficient ETFs before mega issuers copied the playbook; NTSD sits in that engineering tradition—transparent sleeves, published collateral policy, and a global ETP footprint large enough for tight operational infrastructure.`,
      `WisdomTree, Inc. reported record global ETP and tokenized AUM of about $143 billion as of Dec. 31, 2025, with broader group figures near $150B including related acquisitions—meaningful scale for futures-based funds without being the default default-risk counterparty in every market.`,
    ),
    outperfParas: [
      'The sleeve pays when EAFE-style markets rerate faster than U.S. large caps while futures implementation stays cheap—classic “international catches up” windows with orderly currency markets.',
      'It hurts when the dollar rips, international earnings disappoint, and futures sit in contango simultaneously; this is still equity risk stacked across regions, not a hedge fund—favorable regimes are broad non-U.S. leadership, not every U.S. drawdown.',
    ],
    officialUrl:
      'https://www.wisdomtree.com/investments/etfs/capital-efficient/ntsd',
    officialLabel: 'WisdomTree (NTSD)',
  },

  gde: {
    yahooSymbol: 'GDE',
    hubCategoryId: 'return-stacked-lt-2x',
    badge: 'Return Stacked - Lower Leverage',
    h1Title: 'GDE — WisdomTree Efficient Gold Plus Equity Strategy Fund',
    displayTicker: 'GDE',
    issuer: 'WisdomTree',
    inception: 'Mar 15, 2022',
    mer: '0.20%',
    aum: '~$950M',
    pageTitle: 'GDE ETF — Alpha Stacking',
    description: 'WisdomTree Efficient Gold Plus Equity Strategy Fund (GDE).',
    lede:
      'GDE pairs large-cap U.S. equity exposure with a layered gold futures overlay—capital-efficient exposure to both stocks and gold.',
    strategyParas: [
      'GDE is explicitly a barbell: U.S. large-cap equity for growth and carry, gold futures for convexity versus real-rate shocks and geopolitical stress; WisdomTree documents how much notional gold sits per dollar of equity and how collateral is posted across sleeves.',
      'Gold futures carry (contango/backwardation) and equity margin can interact in stress—read the risk section on simultaneous margin calls and how the fund might rebalance if one leg gaps while the other is closed.',
    ],
    pedigreeParas: ped(
      `WisdomTree’s commodity and currency franchise predates many copycat “efficient” wrappers; GDE inherits a sponsor that knows how to run futures-based commodity sleeves inside regulated ’40 Act funds rather than bolting gold on as a marketing afterthought.`,
      `With roughly $143B in global ETP and tokenized AUM as of late 2025, WisdomTree has the balance sheet and legal bench to maintain complex collateral schedules—still smaller than the big three, but not a one-product shop.`,
    ),
    outperfParas: [
      'Constructive when equities trend but investors want insurance against real-rate spikes or dollar stress—gold often pays on the margin when the Fed is perceived as behind the curve or geopolitical risk reprices safe havens.',
      'Gold can grind lower for quarters when real yields rise and risk appetite stays firm; the stacked sleeve is not magic diversification—favorable tape is “growth up, vol contained, but tail hedges still bid,” not permanent negative correlation.',
    ],
    officialUrl:
      'https://www.wisdomtree.com/investments/etfs/capital-efficient/gde',
    officialLabel: 'WisdomTree (GDE)',
  },

  flsp: {
    yahooSymbol: 'FLSP',
    hubCategoryId: 'premia-systematic-alternatives',
    badge: 'Premia and systematic alternatives',
    h1Title: 'FLSP — Franklin Systematic Style Premia ETF',
    displayTicker: 'FLSP',
    issuer: 'Franklin Templeton',
    inception: 'Dec 18, 2019',
    mer: '0.65%',
    aum: '~$55M',
    pageTitle: 'FLSP ETF — Alpha Stacking',
    description: 'Franklin Systematic Style Premia ETF (FLSP).',
    lede:
      'FLSP is an actively managed alternatives-leaning ETF targeting style premia and multi-asset long/short sleeves with an absolute-return posture.',
    strategyParas: [
      'Franklin’s filings frame FLSP as a systematic multi-sleeve book—signals tied to style premia (value, momentum, carry analogues) implemented with futures, swaps, and long/short equity where permitted; gross exposure and leverage caps are the first numbers to verify each quarter.',
      'Because sleeves rebalance off models, headline beta can look nothing like the S&P 500 even when equities are inside the portfolio—treat shareholder reports as mandatory, not optional, for understanding current net and factor tilts.',
    ],
    pedigreeParas: ped(
      `Franklin Templeton is a top-tier global active manager with deep quant and multi-asset benches; FLSP sits inside that ecosystem rather than a garage-shop factor ETF—operational risk and compliance depth match the complexity of the mandate.`,
      `Franklin Resources reported preliminary group AUM of about $1.68 trillion at Dec. 31, 2025—scale that matters for prime brokerage relationships and swap line capacity, even if FLSP itself is a satellite sleeve on the balance sheet.`,
    ),
    outperfParas: [
      'Pays when style and cross-asset spreads are wide enough that systematic long/short books earn after transaction costs—think post-shock mean reversion, leadership handoffs between growth and value, or rates markets that trend instead of chop.',
      'Bleeds when factors whipsaw and financing tightens; favorable regimes are dispersion-rich, not low-vol grind higher where every sleeve pays a vig to stay hedged.',
    ],
    officialUrl:
      'https://www.franklintempleton.com/investments/options/exchange-traded-funds/products/28388/SINGLCLASS/franklin-liberty-systematic-style-premia-etf/FLSP',
    officialLabel: 'Franklin Templeton (FLSP)',
  },

  ialt: {
    yahooSymbol: 'IALT',
    hubCategoryId: 'premia-systematic-alternatives',
    badge: 'Premia and systematic alternatives',
    h1Title: 'IALT — iShares Systematic Alternatives Active ETF',
    displayTicker: 'IALT',
    issuer: 'BlackRock iShares',
    inception: 'Dec 9, 2025',
    mer: '~0.99% (see prospectus / ETF Facts)',
    aum: '~$110M',
    pageTitle: 'IALT ETF — Alpha Stacking',
    description: 'iShares Systematic Alternatives Active ETF (IALT).',
    lede:
      'IALT is BlackRock’s actively managed multi-strategy systematic alternatives ETF—built to rotate risk across market-neutral, strategic-premia, and dynamic macro sleeves rather than loading a single equity factor.',
    strategyParas: [
      'BlackRock’s product materials describe three implementation pillars: a market-neutral sleeve (relative positions across single names), a strategic-premia sleeve (relative value across countries and asset classes tied to valuation, sentiment, growth, and inflation signals), and a dynamic macro sleeve that can take directional equity and credit risk when models favor it.',
      'The fund can use swaps, futures, options, and forwards across global equities, rates, credit, and commodities; sleeves rebalance with model output, so headline exposures can look different quarter to quarter.',
    ],
    pedigreeParas: ped(
      `BlackRock Fund Advisors serves as investment adviser; the listed portfolio managers sit with BlackRock’s Systematic Investing franchise—the same global quant organization that runs large institutional systematic books. BlackRock, Inc. reported about $14.0 trillion in total assets under management at Dec. 31, 2025 (annual filing / earnings), providing infrastructure, data, and compliance depth behind the ETF wrapper.`,
      `iShares is BlackRock’s retail ETF brand; IALT is a newer sleeve, so live track records are short versus flagship beta funds—monitor actual sleeve mix in shareholder reports rather than relying on marketing labels alone.`
    ),
    outperfParas: [
      'The mandate is built for environments where security-level dispersion, cross-country valuation gaps, or macro inflection points matter more than owning a static 60/40 mix—market-neutral books can earn when pair trades work, strategic premia can monetize macro tilts, and the dynamic macro sleeve can add convexity when trends break.',
      'When every sleeve faces hostile conditions at once (tight liquidity, correlated selloffs, or sharp reversals that whipsaw models), multi-strategy fees and implementation drag show up quickly—favorable regimes are those where at least one pillar is clearly “open for business,” not when all markets grind in sync.',
    ],
    officialUrl: 'https://www.ishares.com/us/products/346898/ishares-systematic-alternatives-active-etf',
    officialLabel: 'iShares (IALT)',
  },

  caos: {
    yahooSymbol: 'CAOS',
    hubCategoryId: 'premia-systematic-alternatives',
    badge: 'Premia and systematic alternatives',
    h1Title: 'CAOS — Alpha Architect Tail Risk ETF',
    displayTicker: 'CAOS',
    issuer: 'Alpha Architect',
    inception: 'Aug 14, 2013',
    mer: '0.63%',
    aum: '~$42M',
    pageTitle: 'CAOS ETF — Alpha Stacking',
    description: 'Alpha Architect Tail Risk ETF (CAOS).',
    lede:
      'CAOS uses S&P 500-linked option structures to express convexity and tail hedging alongside or instead of plain equity beta.',
    strategyParas: [
      'CAOS is not a long-only put ladder bought once a year; Alpha Architect’s disclosures describe rules around S&P 500-linked options (puts, spreads, or combinations depending on vintage documents) with explicit budgets for premium spend and roll cadence.',
      'Theta bleed is the product: you are renting crash convexity. If implied volatility collapses after you buy protection, NAV can fall even when stocks are flat—size the sleeve as insurance, not core beta.',
    ],
    pedigreeParas: ped(
      `Alpha Architect built its brand publishing factor research and transparent rules before launching ETFs; CAOS inherits that culture—prospectus language tends to be precise about what is systematic versus manager discretion in vol regimes.`,
      `Firm AUM is boutique versus BlackRock, but the sponsor’s audience is advisor-quant literate—expect frequent methodology blogs and updates when option markets regime-shift, which matters more for tail products than for vanilla indexers.`,
    ),
    outperfParas: [
      'You “win” when realized volatility and gap risk exceed what option prices implied—sharp drawdowns, correlation spikes, or liquidity events where convexity pays multiples of the carry you burned in calm quarters.',
      'You lose slowly in grind-higher, low-vol bull markets and can lose fast if you buy protection into a vol spike that mean-reverts; favorable tape is episodic stress, not buy-and-hold compounding.',
    ],
    officialUrl: 'https://funds.alphaarchitect.com/caos/',
    officialLabel: 'Alpha Architect (CAOS)',
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
      'S&P’s momentum index ranks S&P 500 constituents on risk-adjusted price strength over a defined lookback, then rebalances semiannually—so you inherit concentrated winners (often mega-cap growth) until the next rebalance forces turnover.',
      'Momentum crashes happen when leadership flips between rebalances; read S&P Dow Jones methodology for volatility scaling and buffer rules that damp (but do not eliminate) whipsaw.',
    ],
    pedigreeParas: ped(
      `Invesco is a top-five ETF issuer by listed assets with deep capital markets and securities lending infrastructure; SPMO benefits from tight tracking and liquidity in a crowded factor category.`,
      `Invesco Ltd. reported preliminary AUM of about $2.17 trillion at Dec. 31, 2025—scale that supports tight spreads on a $13B sleeve even when momentum names are the most crowded trades in the market.`,
    ),
    outperfParas: [
      'Momentum pays when trends persist longer than consensus expects—AI capex cycles, narrow leadership, or sector rotations where winners keep winning into the next rebalance.',
      'It hurts in sharp factor reversals (growth to value handoffs) and after parabolic moves that mean-revert between index rebalances; favorable tape is trending, orderly liquidity, not every risk-on rip.',
    ],
    officialUrl:
      'https://www.invesco.com/us/financial-products/etfs/product-detail?audienceType=Investor&ticker=SPMO',
    officialLabel: 'Invesco (SPMO)',
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
      'Victory’s index sorts the eligible universe for free-cash-flow yield and related quality screens, then weights toward names that convert accounting earnings into distributable cash—expect persistent tilts to cash-rich sectors (tech platforms with ads, healthcare cash machines, selective industrials) versus asset-heavy cyclicals.',
      'FCF yield is backward-looking: commodity or consumer cycles can flip cash conversion faster than annual statements; compare VFLO to profitability indexes if you want to see how capex timing changes rankings.',
    ],
    pedigreeParas: ped(
      `Victory Capital runs multi-affiliate equity boutiques under one listed holding company; VictoryShares benefits from shared index governance and capital markets coverage while the FCF methodology is Victory’s proprietary ruleset.`,
      `With about $314 billion in total client assets at year-end 2025, Victory has institutional-grade operations for a $6B factor sleeve—meaningful scale for creation/redemption even when value/cash-flow factors fall out of favor.`,
    ),
    outperfParas: [
      'Works when investors pay up for balance-sheet optionality and punish levered story stocks—late cycle, credit tightening, or macro ranges where cash deployment (buybacks, dividends, M&A) drives returns.',
      'Lags speculative rallies where multiples expand on negative or thin cash flows; favorable tape is fundamentals-first leadership, not meme liquidity.',
    ],
    officialUrl:
      'https://www.vcm.com/products/victoryshares-etfs/victoryshares-etfs-list/victoryshares-free-cash-flow-etf',
    officialLabel: 'VictoryShares (VFLO)',
  },

  avgv: {
    yahooSymbol: 'AVGV',
    hubCategoryId: 'factor',
    badge: 'Factor',
    h1Title: 'AVGV — Avantis All Equity Markets Value ETF',
    displayTicker: 'AVGV',
    issuer: 'Avantis Investors',
    inception: 'Jun 2023',
    structure: 'Fund of funds',
    mer: '0.26%',
    aum: '~$240M',
    pageTitle: 'AVGV ETF — Alpha Stacking',
    description:
      'Avantis All Equity Markets Value ETF (AVGV): active global equity value via underlying Avantis ETFs.',
    lede:
      'AVGV is an actively managed fund-of-funds: under normal conditions it invests at least 80% of assets in equity ETFs—primarily other Avantis funds—allocated across regions and market caps to pursue long-term capital appreciation with a value tilt.',
    strategyParas: [
      'Implementation is sleeve-based rather than a single-country stock screen: managers set and adjust weights across underlying Avantis equity ETFs (U.S., international, emerging, large and small cap value sleeves per current disclosures), so you own the firm’s implementation stack plus an extra layer of asset-allocation judgment.',
      'You pay this fund’s expense ratio on top of the weighted expenses of the underlying ETFs; performance and risks compound through those holdings. The sponsor discloses that results would have been lower without a contractual fee waiver on part of the management fee—confirm the current waiver end date and net/gross figures on the official fund page before sizing.',
    ],
    pedigreeParas: ped(
      `Avantis’s team and process trace to Dimensional Fund Advisors DNA—broad diversification, profitability and value signals, and disciplined portfolio construction—while American Century Investment Management serves as investment adviser under the Avantis Investors brand.`,
      `AVGV packages that philosophy as a one-ticker sleeve across geographies instead of picking a single regional value ETF; verify current underlying lineup, geographic ranges, and turnover in the latest annual or semiannual report rather than relying on stale third-party snapshots.`,
    ),
    outperfParas: [
      'The structure tends to work when global value spreads are widening and capital rotates away from narrow mega-cap growth leadership—multiple regional value sleeves can participate when the tape broadens beyond one market.',
      'It is a harder fit when a single geography or factor dominates (for example U.S. large growth squeezing everything else) or when emerging-markets stress hits several sleeves at once; favorable regimes are orderly credit markets with cross-region value participation, not single-theme melt-ups.',
    ],
    officialUrl:
      'https://www.avantisinvestors.com/avantis-investments/avantis-all-equity-markets-value-etf',
    officialLabel: 'Avantis (AVGV)',
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
      'Avantis applies DFA-style academic tilts with real-time implementation: emphasize higher expected returns from size, value, and profitability while avoiding the junkiest balance sheets in the small-cap value box.',
      'The fund is diversified across hundreds of names but still carries small-cap liquidity and credit beta—read semiannual reports for sector tilts when banks or energy dominate the value cohort.',
    ],
    pedigreeParas: ped(
      `Avantis’s leadership came from Dimensional Fund Advisors; the shop’s DNA is market-wide diversification with systematic tilts rather than 20-name deep value bets—AVUV is the retail ETF expression of that philosophy.`,
      `American Century surpassed $300 billion in assets under supervision in Sept. 2025; Avantis is one of the fastest-growing sleeves inside that ecosystem, which matters for trading infrastructure in illiquid names.`,
    ),
    outperfParas: [
      'Small-cap value works when profitability spreads widen and investors rotate out of mega-cap concentration—classic “catch-up” trades after large-cap growth derates.',
      'It hurts in liquidity-driven rallies where unprofitable small caps squeeze higher, or when credit markets seize; favorable tape is improving fundamentals with orderly funding markets, not every Fed pivot.',
    ],
    officialUrl:
      'https://www.avantisinvestors.com/avantis-investments/avantis-us-small-cap-value-etf',
    officialLabel: 'Avantis (AVUV)',
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
      'SASS is stock-picking, not factor beta: the team hunts corporate events, sum-of-the-parts discounts, and balance-sheet repair stories inside a tight 20–25 name sleeve—position sizes and overlap with passive value ETFs will be low.',
      'Liquidity in a young ETF plus concentrated shorts (if any per docs) can widen premiums/discounts to NAV around stress; read the latest holdings file before sizing as a core holding.',
    ],
    pedigreeParas: ped(
      `M.D. Sass has operated as an independent New York value shop for decades—culture is Graham-and-Dodd security analysis with institutional client roots rather than ETF-first marketing.`,
      `Regulatory AUM is mid-market versus mega complexes; that keeps incentives aligned with concentrated performance but means operational resources are leaner—verify Form ADV for personnel and assets before allocating meaningful capital.`,
    ),
    outperfParas: [
      'Alpha shows up when catalysts reprice misunderstood franchises—spin-offs close, capital returns accelerate, or complex structures simplify while fundamentals stay intact.',
      'Single-name risk dominates: one broken thesis can swamp a quarter; favorable tape is high dispersion value with functioning credit markets, not passive factor drift.',
    ],
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
    inception: 'Mar 7, 2022',
    mer: '0.75%',
    aum: '~$150M',
    pageTitle: 'CTA ETF — Alpha Stacking',
    description: 'Simplify Managed Futures Strategy ETF (CTA).',
    lede:
      'CTA delivers a systematic managed-futures sleeve (Altis models) across equities, rates, commodities, and FX—low correlation to equity beta.',
    strategyParas: [
      'Simplify licenses Altis Partners’ systematic managed-futures signals; the sleeve can be long or short futures across asset classes with volatility-aware sizing—exact universes and rebalance frequencies are in the prospectus and fact sheet.',
      'Because exposure is model-driven, headline beta can flip sign quarter to quarter; compare CTA to equity index correlation over full cycles, not during one trending macro year.',
    ],
    pedigreeParas: ped(
      `Simplify built its brand on convexity and hedged equity ETFs before expanding into pure CTA sleeves; the firm markets complexity with unusually clear options diagrams—CTA inherits that education-first distribution style.`,
      `Simplify’s complex is commonly quoted in the mid-single-digit billions USD—large enough for serious prime brokerage relationships but still nimble versus integrated banks.`,
    ),
    outperfParas: [
      'Trend sleeves earn when macro variables persist—directional rates, sustained dollar moves, or commodity curves that trend long enough for models to load size.',
      'They bleed in choppy, range-bound markets and after sharp reversals that stop out trends; favorable tape is macro persistence with liquid futures, not every equity correction.',
    ],
    officialUrl:
      'https://www.simplify.us/etfs/cta-simplify-managed-futures-strategy-etf',
    officialLabel: 'Simplify (CTA)',
  },

  dbmf: {
    yahooSymbol: 'DBMF',
    hubCategoryId: 'managed-futures',
    badge: 'Managed futures',
    h1Title: 'DBMF — iMGP DBi Managed Futures Strategy ETF',
    displayTicker: 'DBMF',
    issuer: 'iMGP / DBi',
    inception: 'May 7, 2019',
    mer: '0.85%',
    aum: '~$1.1B',
    pageTitle: 'DBMF ETF — Alpha Stacking',
    description: 'iMGP DBi Managed Futures Strategy ETF (DBMF).',
    lede:
      'DBMF seeks to replicate pre-fee managed-futures hedge fund exposures via a liquid, exchange-traded wrapper—macro trend and relative-value sleeves.',
    strategyParas: [
      'DBi’s methodology reverse-engineers aggregate positioning of large CTAs using daily futures disclosures, then implements a liquid futures portfolio to mimic pre-fee hedge-fund beta—tracking error versus actual funds is the product risk you are buying.',
      'Replication lag matters around inflection points: when CTAs de-gross simultaneously, DBMF may rebalance on a different clock than underlying funds—read how often weights reset.',
    ],
    pedigreeParas: ped(
      `iMGP is a multi-boutique platform that packages specialist managers for mutual fund and ETF channels; DBi’s managed-futures research team sits inside that ecosystem with a published intellectual history on CTA replication.`,
      `Platform AUM is mid-market versus global banks, but DBMF’s ~$1.1B sleeve is one of the larger listed CTA proxies—liquidity and roll execution are materially better than sub-$50M peers.`,
    ),
    outperfParas: [
      'You get paid when diversified CTA beta trends cleanly and listed futures can keep up with what opaque hedge funds do gross of fees—think sustained macro moves with low implementation slippage.',
      'You lose when replication error spikes (CTA crowding, position limits) or when trends mean-revert faster than daily positioning data implies; favorable tape is transparent trend persistence, not secret sauce alpha.',
    ],
    officialUrl:
      'https://www.imgp.com/us/fund/us53700t8273-imgp-dbi-managed-futures-strategy-etf/',
    officialLabel: 'iMGP / DBi (DBMF)',
  },

  kmlm: {
    yahooSymbol: 'KMLM',
    hubCategoryId: 'managed-futures',
    badge: 'Managed futures',
    h1Title: 'KMLM — KraneShares Mount Lucas Managed Futures Index Strategy ETF',
    displayTicker: 'KMLM',
    issuer: 'KraneShares',
    inception: 'Dec 1, 2020',
    mer: '~0.90% (verify ETF Facts)',
    aum: '~$400M',
    pageTitle: 'KMLM ETF — Alpha Stacking',
    description: 'KraneShares Mount Lucas Managed Futures Index Strategy ETF (KMLM).',
    lede:
      'KMLM tracks the KFA MLM Index—a Mount Lucas–designed, rules-based trend program implemented with liquid futures across commodities, currencies, and global bonds (with materially less reliance on equity index futures than many equity-heavy CTAs).',
    strategyParas: [
      'Krane’s disclosures describe roughly two dozen futures markets grouped into three sleeves (commodities, currencies, and global bonds) with volatility-aware weights and equal-risk contributions inside each basket—signals are time-series momentum style, so the fund can be long or short individual markets as trends evolve.',
      'Futures rolls, margin, and exchange limits are central operational risks; read Krane’s methodology PDF alongside the prospectus for rebalance cadence and risk caps.',
    ],
    pedigreeParas: ped(
      `Krane Funds Advisors lists the ETF and handles U.S. distribution; Mount Lucas Management LP is the index architect behind the KFA MLM Index. Mount Lucas has run systematic futures research since the 1980s and focuses on transparent, exchange-traded implementation of trend and macro premia rather than opaque hedge-fund share classes.`,
      `KraneShares’ U.S.-listed ETF complex is typically quoted in the high single-digit billions USD in sponsor league tables (order of magnitude)—large enough for institutional trading infrastructure but still a specialist versus integrated mega banks.`
    ),
    outperfParas: [
      'Time-series momentum pays when macro trends persist for months across FX, commodities, and rates—think sustained dollar moves, energy curves, or directional bond markets—while equities chop sideways. That is the classic “CTA diversification” window this sleeve is engineered for.',
      'Fast mean-reversion, liquidity shocks that invert futures curves, or synchronized risk-off can still punish trend systems after fees—favorable environments are those where trends are clean enough that implementation costs stay small relative to signal strength.',
    ],
    officialUrl: 'https://www.kraneshares.com/kmlm',
    officialLabel: 'KraneShares (KMLM)',
  },

  clse: {
    yahooSymbol: 'CLSE',
    hubCategoryId: 'long-short',
    badge: 'Long/short',
    h1Title: 'CLSE — Convergence Long/Short Equity ETF',
    displayTicker: 'CLSE',
    issuer: 'Convergence Investment Partners',
    inception: 'Dec 2009 (strategy); listed Feb 2022',
    mer: '~1.52% total (0.95% mgmt + short/margin costs; see sponsor table)',
    aum: '~$28M',
    pageTitle: 'CLSE ETF — Alpha Stacking',
    description:
      'Convergence Long/Short Equity ETF (CLSE): net-long U.S. equity sleeve that pairs a proprietary dynamic quantitative model with discretionary flexibility—long “strong” franchises, short structurally challenged names.',
    lede:
      'CLSE is Convergence’s listed long/short equity sleeve: the sponsor frames it as a net-long book that goes long fundamentally resilient businesses while shorting deteriorating models—implemented with a proprietary dynamic quantitative engine plus manager discretion rather than a passive factor basket.',
    strategyParas: [
      'CIP’s materials emphasize a dual toolkit—rules-based signals for timing and risk budgeting, overlaid with fundamental work on business quality, balance sheets, and catalyst paths. Gross, net, and short books shift with the model and manager judgment; fiscal quarter-end holdings files and exposure tables are the ground truth versus any one-sentence summary.',
      'Shorting is structural to the thesis, so dividend pass-through on borrowed stock, borrow fees, and margin interest are real P&L lines—sponsor fee tables separate management fees from those variable costs. In violent short squeezes or rate spikes, the short book can hurt even when the long book is correct on fundamentals.',
    ],
    pedigreeParas: ped(
      `Convergence Investment Partners runs the strategy out of Florida with a long institutional pedigree in long/short equity; the ETF is the same mandate packaged for exchange liquidity, with published fact sheets, investor guides, and quarterly holdings downloads on investcip.com rather than a bare ticker stub.`,
      `Listed AUM is boutique versus mega issuers—expect wider median bid/ask and more days away from NAV than SPY-class funds—so implementation (limit orders, patience around rebalances) matters as much as the underlying stock calls.`,
    ),
    outperfParas: [
      'The sleeve is built for stretches when U.S. dispersion reopens: earnings revisions diverge by sector, “quality” re-rates faster than junk, and single-name shorts pay for funding a net-long posture—classic stock-picker weather after a long stretch of macro-only correlations.',
      'When every factor loads on the same liquidity trade or rates shock, long and short legs can move together; favorable environments are idiosyncratic earnings cycles and orderly securities lending, not every coordinated risk-off session.',
    ],
    officialUrl: 'https://www.investcip.com/etfstrategies.html',
    officialLabel: 'Convergence Investment Partners (CLSE)',
  },

  orr: {
    yahooSymbol: 'ORR',
    hubCategoryId: 'long-short',
    badge: 'Long/short',
    h1Title: 'ORR — Militia Long/Short Equity ETF',
    displayTicker: 'ORR',
    issuer: 'Militia Investments',
    inception: 'Jan 2025',
    mer: '1.30% management; headline ratio includes short dividends and borrow (see ETF Facts)',
    aum: '~$22M',
    pageTitle: 'ORR ETF — Alpha Stacking',
    description:
      'Militia Long/Short Equity ETF (ORR): actively managed, higher-turnover fundamental long/short global equity—David Orr’s team runs the same style as Militia’s hedge-fund complex inside a Nasdaq-listed wrapper.',
    lede:
      'ORR is Militia’s global long/short equity ETF: the sponsor describes a higher-turnover, fundamental stock-selection process across regions—longs in mispriced franchises, shorts funding pairs and hedges—with capital appreciation as the stated objective rather than tracking an index.',
    strategyParas: [
      'Under normal circumstances the fund invests the bulk of assets in equities and equity ETFs, mixing single names with baskets where it improves liquidity or express a macro view. Turnover is intentionally high versus closet-index funds, so each month’s schedule of investments is more informative than stale marketing blurbs.',
      'Because shorts are economically large, published expense ratios can look eye-watering next to plain equity ETFs: dividend pass-through on borrowed stock and financing costs flow through the expense line even when management fees are mid-single digits—read the “adjusted” fee disclosure and compare net-of-financing performance to peers, not just the headline ratio.',
    ],
    pedigreeParas: ped(
      `Militia is led by founder and CIO David Orr, who also runs a long/short global hedge-fund complex; ORR is the ETF share class of that intellectual property, distributed with operational plumbing typical of advisor-focused ETF launches (compliance docs, shareholder reports, and a dedicated militiaetf.com landing page).`,
      `The franchise is boutique by design—capacity, borrow relationships, and PM continuity matter more than brand marketing—verify Form ADV assets, personnel, and prime-broker lineup alongside live AUM on the sponsor site before sizing.`,
    ),
    outperfParas: [
      'Edge shows up when global leadership diverges enough that stock-specific shorts pay for themselves: Japan quality vs. U.S. megacap, EM airports vs. domestic REITs, or thematic unwinds where fundamentals and positioning disagree for months, not days.',
      'Macro “risk-on / risk-off” tapes crush dispersion; the constructive case is wide cross-regional earnings revision gaps with orderly securities lending—not synchronized liquidity shocks where every book correlates to one factor.',
    ],
    officialUrl: 'https://militiaetf.com/',
    officialLabel: 'Militia Long/Short Equity ETF (ORR)',
  },

  asgm: {
    yahooSymbol: 'ASGM',
    hubCategoryId: 'global-macro',
    badge: 'Global macro',
    h1Title: 'ASGM — Virtus AlphaSimplex Global Macro ETF',
    displayTicker: 'ASGM',
    issuer: 'Virtus / AlphaSimplex',
    inception: 'Aug 4, 2025',
    mer: '0.86%',
    aum: '~$210M',
    pageTitle: 'ASGM ETF — Alpha Stacking',
    description:
      'Virtus AlphaSimplex Global Macro ETF (ASGM): systematic global macro sleeve that pairs dedicated equity risk with futures across rates, FX, and commodities—Virtus lists AlphaSimplex as sub-adviser.',
    lede:
      'ASGM packages AlphaSimplex’s research-driven global macro engine inside Virtus’s ETF shelf: the mandate blends a strategic equity component with systematic futures sleeves designed to rotate macro risk—rates, currencies, commodities—rather than betting everything on a single equity factor.',
    strategyParas: [
      'Virtus disclosures describe adaptive risk budgeting layered on trend and macro signals; gross exposure can expand or contract with volatility targeting, so headline beta in any given month may look nothing like a 60/40 proxy. Futures implementation, roll timing, and margin are central—read how sleeves interact when equities and bonds sell off together.',
      'Because the process is model-driven, the failure mode is regime shift: models optimized on long histories can lag abrupt policy reversals or liquidity shocks. Stress tests against 2020 and 2022-style months matter more than a single backtested decade.',
    ],
    pedigreeParas: ped(
      `AlphaSimplex spun out of MIT-linked quantitative finance (Andrew Lo’s research ecosystem) before becoming Virtus’s systematic macro affiliate—its edge is published methodology, peer-reviewed roots, and institutional risk systems rather than discretionary macro “stories.”`,
      `Virtus Investment Partners is a public multi-boutique manager with consolidated assets in the tens of billions of dollars per SEC filings—large enough for prime brokerage and swap infrastructure, while ASGM remains a specialist ETF for investors who want macro convexity alongside listed equity beta.`,
    ),
    outperfParas: [
      'The design pays when macro variables diverge: dollar trends vs. EM, curve steepeners vs. equities, or commodity shocks that hit sectors unevenly—windows where futures sleeves earn while an equity core still participates in carry.',
      'Whipsaw tape punishes adaptive systems that flip signals monthly; favorable environments are persistent trends with liquid curves, not single-meeting Fed reversals where every asset reprices in one session.',
    ],
    officialUrl: 'https://www.virtus.com/products/virtus-alphasimplex-global-macro-etf',
    officialLabel: 'Virtus (ASGM)',
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
      'MRGR seeks investment results (before fees and expenses) that track the S&P Merger Arbitrage Index—an event-driven sleeve that owns announced deal targets and hedges acquirer risk rather than betting on equity factor tilts.',
    strategyParas: [
      'ProShares’ disclosures describe physical holdings of target and acquirer equities tied to eligible mergers, supplemented with swaps to obtain additional long exposure and short acquirer exposure, Treasury bills for residual cash, and USD hedging on foreign deals—net exposure is bounded per the index rules, so economics come from deal spreads and financing, not from loading equity beta factors.',
      'Deal breaks, regulatory delays, and acquirer stock repricing are first-order risks; read the prospectus for concentration limits, rebalancing around deal closings, and tax treatment of merger consideration.',
    ],
    pedigreeParas: ped(
      `ProShares Advisors LLC advises the fund; ProShares is part of the broader ProFunds Group that pioneered listed leveraged and inverse products before expanding into strategic beta sleeves such as merger arbitrage. Industry league tables generally place ProShares’ complex in the tens of billions of USD in listed ETP assets (order of magnitude).`,
      `The underlying S&P Dow Jones Indices merger-arbitrage methodology is maintained independently of ProShares; that separation matters for investors who want rules-based event exposure rather than a single PM’s discretion.`
    ),
    outperfParas: [
      'Merger arbitrage earns when announced deal spreads compensate you for completion and regulatory risk—think busy M&A calendars, friendly transactions, and financing markets that let arbitrageurs lever spreads without stress.',
      'Deal breaks, antitrust surprises, or acquirer equity drawdowns can dominate returns—those are the risks you are paid to warehouse. When completions run on time and spreads mean-revert toward zero, the sleeve is doing what it was built for: harvesting event risk, not timing equity factor premia.',
    ],
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
      'Canadian offering documents describe a global balanced core (equities and investment-grade-style fixed income) overlaid with a systematic managed-futures book across rates, FX, and commodities—capital efficiency comes from derivatives, so margin, performance fees, and leverage caps belong in every pre-trade checklist.',
      'Alternative mutual fund status permits tools plain ETFs cannot use; read how the macro sleeve is collateralized in CAD versus USD exposures and what happens if one leg hits exchange limits while others remain open.',
    ],
    pedigreeParas: ped(
      `Return Stacked® Canada inherits the same intellectual lineage as the U.S. line—ReSolve / Newfound-style capital-efficiency research packaged for TSX investors via LongPoint as manager—narrow franchise, purpose-built slides, and advisor education rather than bank-branch distribution.`,
      `Sponsor scale is modest next to RBC iShares or BMO, but that keeps the product honest about capacity: you are buying a sleeve engineered for stacking, not a closet indexer with a macro sticker.`,
    ),
    outperfParas: [
      'Constructive when global balanced beta grinds while futures sleeves harvest independent trends—dollar cycles, curve steepeners, or commodity shocks that do not move global equities in lockstep.',
      'Stress arrives when correlations spike and both sleeves de-risk into the same liquidity hole; favorable tape is persistent macro trends with functioning futures markets, not simultaneous crashes in stocks and bonds with vol targeting cutting exposure late.',
    ],
    officialUrl: 'https://returnstackedetfs.ca/rgbm-global-balanced-macro-etf/',
    officialLabel: 'Return Stacked ETFs Canada (RGBM)',
  },

  onec: {
    yahooSymbol: 'ONEC.TO',
    hubCategoryId: 'premia-systematic-alternatives',
    badge: 'Premia and systematic alternatives',
    h1Title: 'ONEC.TO — Accelerate OneChoice Alternative Multi-Asset Fund',
    displayTicker: 'ONEC',
    issuer: 'Accelerate Financial Technologies',
    inception: 'Jan 27, 2021',
    structure: 'Alternative ETF',
    mer: '0.20%*',
    aum: '~$95M CAD',
    pageTitle: 'ONEC.TO ETF — Alpha Stacking',
    description: 'Accelerate OneChoice Alternative Multi-Asset Fund (ONEC.TO).',
    lede:
      'ONEC is a single-ticket multi-alternative sleeve: mixes of credit, macro, long/short equity, and real-asset exposures per Accelerate’s mandate.',
    strategyParas: [
      'ONEC is effectively a fund-of-alternatives: sleeves span credit, macro, long/short equity, and real assets per Accelerate’s portfolio construction—verify stacked MERs, incentive fees on underlying funds, and how often the adviser rebalances between sleeves in ETF Facts. *Fee note: 0.20% management fee, plus the fees of the underlying ETFs/funds it holds.',
      'Because sleeves can share macro sensitivities, “diversified alts” can still correlate in CAD risk-off episodes—model stress with simultaneous equity, credit, and liquidity shocks rather than assuming negative beta to TSX.',
    ],
    pedigreeParas: ped(
      `Accelerate carved out a niche listing hedge-fund-like sleeves for Canadian retail and advisors before the big banks copied every wrapper; ONEC is the firm’s one-ticket bet that investors want packaged complexity with TSX liquidity.`,
      `Firm scale is boutique versus bank asset managers—operational depth is fine for listed alts, but capacity and secondary-market liquidity deserve monitoring on a sub-$100M sleeve.`,
    ),
    outperfParas: [
      'Pays when at least one sleeve is clearly earning—credit dislocation trades, macro trends, or long/short dispersion—while others tread water, so the blended correlation to 60/40 actually falls.',
      'Hurts when every alt sleeve faces hostile funding markets at once; favorable tape is rich dispersion with functioning leverage in underlyings, not synchronized deleveraging.',
    ],
    officialUrl: 'https://accelerateshares.com/investment-solutions/onec/',
    officialLabel: 'Accelerate (ONEC)',
  },

  pfaa: {
    yahooSymbol: 'PFAA.TO',
    hubCategoryId: 'premia-systematic-alternatives',
    badge: 'Premia and systematic alternatives',
    h1Title: 'PFAA.TO — Picton Mahoney Multi-Strategy Alpha Alternative Fund ETF',
    displayTicker: 'PFAA',
    issuer: 'Picton Mahoney',
    inception: 'May 3, 2022',
    structure: 'Alternative ETF',
    mer: '0.95%*',
    aum: '~$78M CAD',
    pageTitle: 'PFAA.TO ETF — Alpha Stacking',
    description: 'Picton Mahoney multi-strategy alpha alternatives ETF (PFAA.TO).',
    lede:
      'PFAA packages Picton Mahoney’s multi-strategy alpha process—long/short, relative value, and macro sleeves—in an ETF structure.',
    strategyParas: [
      'PFAA is Picton’s multi-strat sleeve in ETF form: internal capital rotates between long/short equity, relative-value credit, and macro books as risk budgets change—monthly factsheets matter more than a one-page marketing summary.',
      'Performance fees and higher MER stacks versus plain beta are explicit tradeoffs; compare net-of-fee outcomes to owning separate Picton sleeves if you care about fee attribution. *Fee note: 0.95% management fee plus 20% performance fee above a 2% hurdle rate.',
    ],
    pedigreeParas: ped(
      `Picton Mahoney is one of Canada’s larger independent alt managers; PICTON Investments has cited low-teens billions CAD in firm AUM in recent communications—enough depth for multi-strat infrastructure while still boutique versus global banks.`,
      `The firm’s brand is risk-managed alpha, not closet indexing; PFAA inherits a culture of drawdown controls and weekly risk meetings rather than passive replication desks.`,
    ),
    outperfParas: [
      'Wins when sleeves diversify each other—macro trends paying while equity long/short harvests dispersion, or credit RV working while equities chop.',
      'Loses when every sleeve pays for the same macro shock (liquidity, leverage, correlation to one); favorable tape is at least one clean trend or spread environment, not universal calm.',
    ],
    officialUrl:
      'https://casl.pictonmahoney.com/en/Solutions/Fortified-Alternative-Funds-Solutions.aspx',
    officialLabel: 'Picton Mahoney (Fortified alternatives — PFAA)',
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
      'BMO’s index ranks TSX-listed stocks for historical beta and volatility, then weights toward the calmer cohort—expect structural tilts to regulated utilities, staples, and large financials when energy and miners dominate cap-weight Canada.',
      'Low-volatility is not low-return by mandate, but it will underperform speculative TSX rallies where small-cap resource names squeeze; read methodology for sector caps and rebalance frequency to understand turnover.',
    ],
    pedigreeParas: ped(
      `BMO ETFs are among Canada’s largest third-party issuers; ZLB’s ~$6B scale means tight spreads, deep creation/redemption, and index governance backed by a major bank balance sheet.`,
      `BMO Financial Group reported company-wide AUM of about CDN $507 billion at Oct. 31, 2025—bank-scale infrastructure behind a factor sleeve that still behaves differently than BMO’s cap-weight flagship products.`,
    ),
    outperfParas: [
      'Pays when investors favor stable cash flows and defensives—TSX ranges, credit worries, or late-cycle rotations out of high-beta commodity beta.',
      'Hurts in rip-roaring commodity or liquidity rallies where volatility itself is rewarded; favorable tape is risk-off tone or quality leadership, not every cyclical upswing.',
    ],
    officialUrl:
      'https://www.bmoetfs.ca/etfs/zlb-bmo-low-volatility-canadian-equity-etf',
    officialLabel: 'BMO ETFs (ZLB)',
  },

  atsx: {
    yahooSymbol: 'ATSX.TO',
    hubCategoryId: 'long-short',
    badge: 'Long/short',
    h1Title: 'ATSX.TO — Accelerate Canadian Long Short Equity Fund',
    displayTicker: 'ATSX',
    issuer: 'Accelerate Financial Technologies',
    inception: 'May 10, 2019',
    structure: 'Alternative ETF',
    mer: '0.00%*',
    aum: '~$42M CAD',
    pageTitle: 'ATSX.TO ETF — Alpha Stacking',
    description: 'Accelerate Canadian Long Short Equity Fund (ATSX.TO).',
    lede:
      'ATSX runs a quantitative 150/50 Canadian long/short sleeve vs. the S&P/TSX 60—directional hedge-fund-style exposure in an ETF.',
    strategyParas: [
      'The mandate is a 150% long / 50% short book versus S&P/TSX 60 names—systematic signals pick leaders and laggards inside the benchmark, so factor tilts can cluster in banks, energy, and rails when the model chases the same macro regime.',
      'Leverage magnifies both alpha and model error; verify current gross/net in ETF Facts because a 150/50 template still carries meaningful equity beta through the long sleeve. *Fee note: 0% management fee; performance fee is 50% of outperformance above the S&P/TSX 60 index.',
    ],
    pedigreeParas: ped(
      `Accelerate specializes in bringing hedge-fund economics to TSX tickers; ATSX is part of that playbook—boutique scale, advisor-focused distribution, and wrappers that accept complexity retail mutual funds cannot.`,
      `Without bank-tier balance sheets, secondary-market liquidity and borrow availability on Canadian mid-caps deserve monitoring—especially around resource supercycles when shorts get crowded.`,
    ),
    outperfParas: [
      'Works when TSX60 dispersion is high—stock-specific earnings revisions matter more than WTI alone—and factor signals cleanly separate quality from junk inside the benchmark.',
      'Suffers when everything trades as one macro beta (commodity + rates shock) and short books pay borrow while longs re-rate down together.',
    ],
    officialUrl: 'https://accelerateshares.com/investment-solutions/atsx/',
    officialLabel: 'Accelerate (ATSX)',
  },

  pfls: {
    yahooSymbol: 'PFLS.TO',
    hubCategoryId: 'long-short',
    badge: 'Long/short',
    h1Title: 'PFLS.TO — Picton Mahoney Fortified Long Short Alternative Fund ETF',
    displayTicker: 'PFLS',
    issuer: 'Picton Mahoney',
    inception: 'Jul 15, 2020',
    structure: 'Alternative ETF',
    mer: '0.9%',
    aum: '~$62M CAD',
    pageTitle: 'PFLS.TO ETF — Alpha Stacking',
    description: 'Picton Mahoney Fortified Long Short Alternative Fund ETF (PFLS.TO).',
    lede:
      'PFLS pursues global long/short equity with moderate net exposure—Authentic Hedge®-style risk management in an ETF wrapper.',
    strategyParas: [
      'PFLS blends Picton’s risk-managed long/short equity process with moderate net exposure—longs in resilient growers or quality cyclicals, shorts funding factor hedges—so you still carry equity risk, just damped versus 100% long TSX or ACWI.',
      'Global sleeves mean currency and regional session risk; confirm whether the mandate hedges USD/EUR exposure back to CAD and how option overlays (if used per docs) cap tail losses. *Fee note: 0.95% management fee plus 20% performance fee above a 2% hurdle rate.',
    ],
    pedigreeParas: ped(
      `Picton’s “Fortified” and “Authentic Hedge” branding signals institutional risk budgeting ported to ETFs—multi-billion CAD firm resources behind a sleeve that still behaves like a hedge fund return stream.`,
      `Low-teens billions CAD in firm AUM (per recent issuer communications) supports prime brokerage relationships and short borrow infrastructure beyond what sub-$10M boutiques can access.`,
    ),
    outperfParas: [
      'Pays when moderate net plus pair trades earns while macro storms buffet long-only peers—leadership spreads inside sectors, orderly credit markets, and stock pickers rewarded for balance-sheet work.',
      'Hurts in correlation spikes where shorts and longs re-rate together; favorable tape is dispersion-rich global equities, not single-factor melt-ups.',
    ],
    officialUrl:
      'https://casl.pictonmahoney.com/en/Solutions/Fortified-Alternative-Funds-Solutions.aspx',
    officialLabel: 'Picton Mahoney (Fortified alternatives — PFLS)',
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
      'TGAF runs a diversified global book: bottom-up longs across regions, shorts funding factor and single-name hedges, with room for options per alternative-fund rules—gross near 140% notional is intentional engineering, not accidental drift.',
      'Because it is Class E of a pooled trust with other series, flows in mutual fund channels can affect cash balances and transaction costs for ETF unitholders—read financial statements for shared expenses and turnover.',
    ],
    pedigreeParas: ped(
      'Tralucent’s materials frame TGAF as an ETF unit class of the same Tralucent Global Alt (Long/Short) Equity Fund that has run since March 2020—first offered under an offering memorandum, later as conventional fund classes, then as TSX-listed ETF units (November 2023). It is the same mandate and sleeve in a different wrapper, not a separate product line with a different book.',
      'The ~$55M figure in Tralucent’s November 2023 ETF launch materials referred to company-wide AUM, not total net assets of this fund. TGAF is Class E of one pooled trust with the A, M, and F series on the same portfolio; total fund net assets (all unit classes, one book) are materially larger than that firm-level headline—use the simplified prospectus Fund Facts or fund financial statements for the current figure.'
    ),
    outperfParas: [
      'Alpha accrues when global dispersion is wide enough that a 200-name book can be short crowded winners and long neglected quality without every leg sharing the same macro beta.',
      'Macro storms that crush all regions together overwhelm stock picking; favorable tape is idiosyncratic earnings cycles with functioning short locates, not synchronized central-bank hiking.',
    ],
    officialUrl: 'https://tralucent.ca/about-the-etf/',
    officialLabel: 'Tralucent (TGAF)',
  },

  dglm: {
    yahooSymbol: 'DGLM.TO',
    hubCategoryId: 'global-macro',
    badge: 'Global macro',
    h1Title: 'DGLM.TO — Desjardins Global Macro ETF',
    displayTicker: 'DGLM',
    issuer: 'Desjardins Global Asset Management',
    inception: 'Aug 28, 2025',
    structure: 'Alternative ETF',
    mer: '0.9%',
    aum: '~$32M CAD',
    pageTitle: 'DGLM.TO ETF — Alpha Stacking',
    description: 'Desjardins Global Macro ETF (DGLM.TO).',
    lede:
      'DGLM is a long/short global macro sleeve—equities, rates, commodities, and currencies—with Graham Capital noted as sub-advisor in disclosures.',
    strategyParas: [
      'DGLM pairs Desjardins’ Canadian distribution with Graham Capital’s systematic macro engine—futures and forwards across rates, FX, commodities, and selective equity beta—so sleeve weights can swing materially month to month as signals change.',
      'Alternative ETF status permits leverage and shorting beyond plain funds; read exposure bands, currency hedging defaults, and how much equity beta remains when macro sleeves de-risk.',
    ],
    pedigreeParas: ped(
      `Desjardins Global Asset Management sits inside one of Canada’s largest cooperative financial groups; Desjardins Group reported about $123 billion in AUM at Dec. 31, 2025—institutional-grade operations for a small listed sleeve.`,
      `Graham Capital is a Connecticut-based CTA/macro institution; sub-advising DGLM imports hedge-fund-style signal research into a retail-accessible TSX ticker, with governance split between Desjardins as manager and Graham as sub-advisor.`,
    ),
    outperfParas: [
      'Pays when macro variables diverge—curve steepeners, dollar trends, commodity shocks—with enough persistence that systematic sleeves earn after fees.',
      'Bleeds in whipsaw macro where signals flip quickly; favorable tape is clean trends with liquid futures, not single-meeting Fed reversals.',
    ],
    officialUrl: 'https://www.fondsdesjardins.com/etf/global-macro/',
    officialLabel: 'Desjardins (DGLM)',
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
      'BTCC-B holds spot BTC with custodial procedures described in ETF Facts—key risks are cold-storage operational failure, regulatory treatment of crypto ETFs, and tracking versus spot when creation baskets include cash or proxies.',
      'CAD unhedged means your P&L mixes bitcoin beta with CAD/USD moves versus a globally USD-priced coin—compare to Purpose’s USD unit class if you want cleaner USD BTC exposure from Canada.',
    ],
    pedigreeParas: ped(
      `Purpose led Canada’s spot crypto ETF wave before U.S. approvals; BTCC’s multi-billion AUM tier proves the issuer can run daily creations with institutional custodians rather than experimental garage custody.`,
      `Purpose remains independent versus bank-owned issuers—nimble product design but fewer implicit balance-sheet backstops; verify latest custodian and insurance disclosures on each annual update.`,
    ),
    outperfParas: [
      'You are long the full bitcoin liquidity cycle—tightening Fed into risk-on handoffs, ETF inflows, halving narratives—when leverage in the system is benign and futures basis stays orderly.',
      'Drawdowns remain equity-crash severity when macro and crypto leverage unwind together; favorable tape is sustained bid for BTC with functioning banking rails, not every speculative rip.',
    ],
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
      'ETHX-B is plain spot ETH in a regulated wrapper—staking yield and restaking loops generally sit outside the mandate until prospectuses explicitly allow them; your return is price plus frictions, not validator cash flows.',
      'Ether trades as a high-beta liquidity asset with protocol-specific catalysts (upgrade timelines, ETF flows, L2 competition); CAD unhedged units add FX noise versus globally USD-denominated spot references.',
    ],
    pedigreeParas: ped(
      `CI Global Asset Management is one of Canada’s largest ETF and mutual fund manufacturers; pairing with Galaxy Digital brings crypto-native trading and custody expertise into CI’s compliance and distribution machine.`,
      `CI Financial Corp. reporting gives consolidated scale—large enough for institutional custodians and tight primary markets on a ~$650M sleeve, even if crypto AUM is a fraction of CI’s total book.`,
    ),
    outperfParas: [
      'Constructive when ETH captures speculative liquidity plus idiosyncratic upgrades—fee burns, L2 adoption, institutional on-chain narratives—without a simultaneous deleveraging in stablecoins or centralized venues.',
      'Brutal drawdowns still mirror bitcoin crashes when funding markets break; favorable tape is orderly crypto credit with rising on-chain usage, not every macro risk-on day.',
    ],
    officialUrl: 'https://funds.cifinancial.com/en/funds/alternative_investments/CIGalaxyEthereumETF.html',
    officialLabel: 'CI Galaxy Ethereum ETF',
  },
}
