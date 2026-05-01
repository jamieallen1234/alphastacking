/**
 * On-site ETF write-ups for hub tickers. Featured US/CA entries live in `etfFeaturedRegistryDefs.ts`
 * and are merged here so every ETF page uses `EtfDynamicPageLayout`.
 */

import { CA_ETF_FEATURED_PART, US_ETF_FEATURED_PART } from '@/lib/etfFeaturedRegistryDefs'
import { NTSD_CAPITAL_EFFICIENCY_TOOLTIP_NA } from '@/lib/etfEfficiencyNtsdCopy'

import type {
  EtfDynamicDef,
  EtfDynamicEfficiencyDef,
  EtfDynamicEfficiencyLineDef,
} from '@/lib/etfDynamicRegistryTypes'

export type {
  EtfDynamicDef,
  EtfDynamicEfficiencyDef,
  EtfDynamicEfficiencyLineDef,
} from '@/lib/etfDynamicRegistryTypes'

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
    capitalBucketExposurePct: 100,
    alphaBucketExposurePct: 100,
    hubCategoryId: 'crypto',
    badge: 'Crypto & digital assets',
    h1Title: 'BEGS — Rareview 2x Bull Cryptocurrency & Precious Metals ETF',
    displayTicker: 'BEGS',
    issuer: 'Rareview Capital',
    inception: 'Feb 7, 2025',
    structure: 'Leveraged crypto + precious-metals',
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
    capitalBucketExposurePct: 100,
    alphaBucketExposurePct: 100,
    hubCategoryId: 'crypto',
    badge: 'Crypto & digital assets',
    h1Title: 'BTGD — STKd 100% Bitcoin & 100% Gold ETF',
    displayTicker: 'BTGD',
    issuer: 'Quantify Funds',
    inception: 'Oct 15, 2024',
    structure: 'Stacked bitcoin + gold futures',
    mer: '1.05%',
    aum: '~$45M',
    pageTitle: 'BTGD ETF — Alpha Stacking',
    description: 'STKd 100% Bitcoin & 100% Gold ETF (BTGD): stacked bitcoin and gold exposure.',
    lede: cryptoLede(
      'BTGD',
      'seeks simultaneous ~100% bitcoin and ~100% gold exposure via futures and ETPs in a capital-efficient structure.'
    ),
    strategyParas: [
      'Quantify’s “STKd” line is explicitly about stacking two sleeves per dollar invested—bitcoin futures/ETPs for digital scarcity beta and gold futures/ETPs for monetary-metal beta—so collateral, margin, and roll mechanics are the entire game versus holding physical coins and bars.',
      'When both legs trend together, compounding can feel exhilarating; when they diverge violently (risk-on crypto vs. risk-off gold), the fund must rebalance risk budgets—read the supplement for how weights are reset and what happens around CME or exchange halts.',
    ],
    pedigreeParas: ped(
      `Quantify Funds is a California-based issuer that has leaned into branded “stacked” ETPs rather than broad passive lineups; it is not a top-ten sponsor by AUM, so operational resilience depends on a narrow product set and focused distribution—verify any firm-level metrics on quantifyfunds.com.`,
      `Several issuers now list stacked crypto and metals products with similar headlines—compare fee stacks, collateral policy, and exact sleeve notionals in each prospectus so you are not accidentally doubling the same macro bet in multiple tickers.`,
    ),
    outperfParas: [
      'You want regimes where bitcoin’s liquidity cycle and gold’s real-rate / FX sensitivity are both working—not necessarily in the same direction every day, but with clean trends that futures books can ride without constant whipsaw.',
      'The hardest tape is sharp deleveraging that hits crypto funding while gold spikes on flight-to-quality—both can move fast, but correlation spikes can still stress dual-book margin; sizing should assume gap risk, not smooth Gaussian returns.',
    ],
    officialUrl: 'https://quantifyfunds.com/btgd',
    officialLabel: 'Quantify Funds (BTGD)',
  },

  ooqb: {
    yahooSymbol: 'OOQB',
    capitalBucketExposurePct: 100,
    alphaBucketExposurePct: 100,
    hubCategoryId: 'crypto',
    badge: 'Crypto & digital assets',
    h1Title: 'OOQB — One+One™ Nasdaq-100® and Bitcoin ETF',
    displayTicker: 'OOQB',
    issuer: 'Volatility Shares',
    inception: 'Feb 18, 2025',
    structure: 'Stacked Nasdaq-100 + bitcoin',
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
    capitalBucketExposurePct: 100,
    alphaBucketExposurePct: 100,
    hubCategoryId: 'crypto',
    badge: 'Crypto & digital assets',
    h1Title: 'OOSB — One+One™ S&P 500® and Bitcoin ETF',
    displayTicker: 'OOSB',
    issuer: 'Volatility Shares',
    inception: 'Feb 18, 2025',
    structure: 'Stacked S&P 500 + bitcoin',
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
    structure: 'Return-stacked US equity + gold/bitcoin',
    capitalBucketExposurePct: 100,
    alphaBucketExposurePct: 100,
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
    capitalBucketExposurePct: 100,
    alphaBucketExposurePct: 100,
    hubCategoryId: 'crypto',
    badge: 'Crypto & digital assets',
    h1Title: 'WTIB — USCF Oil Plus Bitcoin Strategy Fund',
    displayTicker: 'WTIB',
    issuer: 'USCF Investments',
    inception: 'Dec 9, 2025',
    structure: 'Oil + bitcoin strategy',
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
    structure: 'Return-stacked US equity + managed futures',
    capitalBucketExposurePct: 100,
    alphaBucketExposurePct: 100,
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
    allEquityStack: true,
    h1Title: 'NTSD — WisdomTree Efficient U.S. Plus International Equity Fund',
    displayTicker: 'NTSD',
    issuer: 'WisdomTree',
    inception: 'Mar 19, 2026',
    structure: 'Capital-efficient US + international equity',
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
    efficiency: {
      capital: {
        tooltip: NTSD_CAPITAL_EFFICIENCY_TOOLTIP_NA,
      },
    },
  },

  gde: {
    yahooSymbol: 'GDE',
    hubCategoryId: 'return-stacked-lt-2x',
    badge: 'Return Stacked - Lower Leverage',
    h1Title: 'GDE — WisdomTree Efficient Gold Plus Equity Strategy Fund',
    displayTicker: 'GDE',
    issuer: 'WisdomTree',
    inception: 'Mar 15, 2022',
    structure: 'Capital-efficient US equity + gold',
    capitalBucketExposurePct: 80,
    alphaBucketExposurePct: 80,
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

  gdmn: {
    yahooSymbol: 'GDMN',
    hubCategoryId: 'return-stacked-ge-2x',
    badge: 'Return Stacked - 2x',
    h1Title: 'GDMN — WisdomTree Efficient Gold Plus Gold Miners Strategy Fund',
    displayTicker: 'GDMN',
    issuer: 'WisdomTree',
    inception: 'Dec 16, 2021',
    structure: 'Gold miners + gold futures stack',
    capitalBucketExposurePct: 100,
    alphaBucketExposurePct: 100,
    mer: '0.45%',
    aum: '~$232M',
    pageTitle: 'GDMN ETF — Alpha Stacking',
    description: 'WisdomTree Efficient Gold Plus Gold Miners Strategy Fund (GDMN).',
    lede:
      'GDMN stacks global gold miners equity exposure with a leveraged gold-futures sleeve to target a higher-conviction precious-metals expression in one ETF wrapper.',
    strategyParas: [
      'WisdomTree disclosures describe a two-sleeve construction: equity holdings in companies deriving substantial revenue from gold mining plus U.S.-listed gold futures collateralized with Treasury/cash instruments. The futures leg introduces leverage and can amplify both upside and downside versus a miners-only allocation.',
      'The key implementation drivers are futures curve shape, collateral yield, and miners-equity sensitivity to operational/geographic shocks. In stress, miners can trade like cyclical equities while gold futures respond more directly to real rates and dollar moves—so sleeve interaction matters more than headline metals direction.',
    ],
    pedigreeParas: ped(
      `WisdomTree’s capital-efficient lineup extends beyond broad equity stacks; GDMN shows the same derivatives-in-ETF engineering applied to precious metals, leveraging the firm’s long-standing commodity/futures infrastructure rather than treating futures as an afterthought.`,
      `WisdomTree has reported roughly $143B in global ETP and tokenized assets (late-2025 disclosures), providing scale for collateral, operations, and market-making support while still running specialist sleeves like GDMN for investors who want a concentrated metals stack.`,
    ),
    outperfParas: [
      'The setup tends to work best when gold and miners rally together—typically in falling-real-yield or policy-uncertainty regimes where bullion strength feeds earnings leverage in miners. In those windows, the futures sleeve can add convex upside to equity participation.',
      'Challenging tapes include rising real yields, stronger dollar trends, or equity-led selloffs where miners de-rate faster than bullion. Favorable regimes are sustained precious-metals uptrends with functioning futures liquidity, not short, violent reversals that whipsaw both sleeves.',
    ],
    officialUrl: 'https://www.wisdomtree.com/investments/etfs/capital-efficient/gdmn',
    officialLabel: 'WisdomTree (GDMN)',
  },

  flsp: {
    yahooSymbol: 'FLSP',
    hubCategoryId: 'premia-systematic-alternatives',
    badge: 'Premia and systematic alternatives',
    h1Title: 'FLSP — Franklin Systematic Style Premia ETF',
    displayTicker: 'FLSP',
    issuer: 'Franklin Templeton',
    inception: 'Dec 18, 2019',
    structure: 'Systematic style-premia alternatives',
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
    structure: 'Multi-strategy systematic alternatives',
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
    structure: 'Tail-risk options',
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

  sso: {
    yahooSymbol: 'SSO',
    hubCategoryId: 'factor',
    badge: 'Factor',
    h1Title: 'SSO — ProShares Ultra S&P500',
    displayTicker: 'SSO',
    issuer: 'ProShares',
    inception: 'Jun 2006',
    structure: '2x daily S&P 500 leverage',
    mer: '0.89%',
    aum: '~$7.5B',
    pageTitle: 'SSO ETF — Alpha Stacking',
    description: 'ProShares Ultra S&P500 (SSO): 2× daily S&P 500 leverage. How it works, when it earns, and how to size it as an equity sleeve in an alpha stacking portfolio.',
    lede:
      'SSO delivers 2× the daily return of the S&P 500, reset at the close of each session.',
    strategyParas: [
      `SSO resets its leverage daily — each day's target is 2× the S&P 500's return for that day. That means the longer you hold it, the more its returns depend on the path the market takes, not just the start and end points. A market that grinds up steadily lets daily compounding work in your favor; a market that whipsaws — down 3%, up 3%, down 3% — bleeds the position even if it ends flat.`,
      'This is not a flaw in the fund; it is the mathematical property of daily-reset leverage. The implication for portfolio construction is that SSO works best as a deliberate equity sleeve in a multi-sleeve portfolio, sized so the overall portfolio beta stays near 1.0, with other sleeves to pick up the slack in choppy or declining markets.',
    ],
    pedigreeParas: ped(
      `ProShares is one of the largest U.S. leveraged and inverse ETF sponsors, with long operating history in daily-reset index products and deep derivatives execution infrastructure.`,
      `The issuer’s parent complex is measured in the tens of billions in ETF assets in public league tables, giving SSO scale and secondary-market liquidity that many niche leveraged products lack.`
    ),
    outperfParas: [
      'SSO performs best in sustained equity uptrends with relatively calm day-to-day moves — the kind of environment where the S&P 500 is trending higher over weeks and months without big reversals. Daily compounding works in your favor when volatility is low and direction is clear.',
      'It struggles in choppy, directionless markets and takes outsized damage in sharp sell-offs, since losses compound the same way gains do. As an equity sleeve in an alpha stacking portfolio, SSO requires other sleeves to earn while equity is pausing or declining.',
    ],
    officialUrl: 'https://www.proshares.com/our-etfs/leveraged-and-inverse/sso',
    officialLabel: 'ProShares (SSO)',
  },

  upro: {
    yahooSymbol: 'UPRO',
    hubCategoryId: 'factor',
    badge: 'Factor',
    h1Title: 'UPRO — ProShares UltraPro S&P500',
    displayTicker: 'UPRO',
    issuer: 'ProShares',
    inception: 'Jun 2009',
    structure: '3x daily S&P 500 leverage',
    mer: '0.91%',
    aum: '~$5.0B',
    pageTitle: 'UPRO ETF — Alpha Stacking',
    description: 'ProShares UltraPro S&P500 (UPRO): 3x daily S&P 500 leverage.',
    lede:
      'UPRO targets three times the daily return of the S&P 500, before fees and expenses, using listed derivatives and collateral management.',
    strategyParas: [
      'UPRO is a high-octane daily reset vehicle: it seeks ~3x of each day’s S&P 500 move, then rebalances notional for the next session. Over multi-day windows, realized outcomes depend heavily on volatility and sequence of returns.',
      'This structure is generally used for tactical views or explicitly risk-managed overlays. In sustained trends, compounding can amplify returns; in volatile two-way markets, volatility drag can materially erode performance versus simple 3x intuition.',
    ],
    pedigreeParas: ped(
      `ProShares has run leveraged index ETFs across cycles since the mid-2000s and is a category-defining issuer for daily-reset exposure tools in U.S. markets.`,
      `Scale, primary-market relationships, and established index-linked derivatives workflows are key implementation advantages for a fund like UPRO where execution quality matters as much as headline leverage.`
    ),
    outperfParas: [
      'UPRO historically benefits most in persistent broad-equity bull runs where index breadth and earnings momentum keep S&P trend strength intact for extended periods.',
      'Favorable conditions are strong directional tapes with controlled volatility; repeated sharp reversals and panic deleveraging windows are where daily-reset convexity typically works against holders.',
    ],
    officialUrl: 'https://www.proshares.com/our-etfs/leveraged-and-inverse/upro',
    officialLabel: 'ProShares (UPRO)',
  },

  qld: {
    yahooSymbol: 'QLD',
    hubCategoryId: 'factor',
    badge: 'Factor',
    h1Title: 'QLD — ProShares Ultra QQQ',
    displayTicker: 'QLD',
    issuer: 'ProShares',
    inception: 'Jun 2006',
    structure: '2x daily Nasdaq-100 leverage',
    mer: '0.95%',
    aum: '~$9.0B',
    pageTitle: 'QLD ETF — Alpha Stacking',
    description: 'ProShares Ultra QQQ (QLD): 2x daily Nasdaq-100 leverage.',
    lede:
      'QLD seeks daily investment results, before fees and expenses, corresponding to two times the daily performance of the Nasdaq-100 Index.',
    strategyParas: [
      'QLD gives levered access to Nasdaq-100 beta with a daily reset, typically implemented through index swaps and futures rather than cash stock replication. That makes path and volatility just as important as directional conviction.',
      'Because the underlying index is growth and tech heavy, macro rate shifts and valuation compression can produce larger swings than broad-market leverage funds. Position sizing and rebalance discipline matter more than simple long-only assumptions.',
    ],
    pedigreeParas: ped(
      `ProShares is a leading sponsor in leveraged index wrappers and has operated Ultra and UltraPro families through multiple volatility regimes.`,
      `Category scale and liquidity are stronger than many thematic leveraged products, but users should still monitor spread behavior and tracking around high-vol sessions.`
    ),
    outperfParas: [
      'QLD tends to perform best when mega-cap growth leadership is persistent and the Nasdaq-100 trend is strong with relatively contained realized volatility.',
      'Constructive regimes are clean risk-on growth expansions; violent factor rotations and whipsaw rate shocks are usually adverse for daily-reset leveraged Nasdaq exposure.',
    ],
    officialUrl: 'https://www.proshares.com/our-etfs/leveraged-and-inverse/qld',
    officialLabel: 'ProShares (QLD)',
  },

  tqqq: {
    yahooSymbol: 'TQQQ',
    hubCategoryId: 'factor',
    badge: 'Factor',
    h1Title: 'TQQQ — ProShares UltraPro QQQ',
    displayTicker: 'TQQQ',
    issuer: 'ProShares',
    inception: 'Feb 2010',
    structure: '3x daily Nasdaq-100 leverage',
    mer: '0.86%',
    aum: '~$23B',
    pageTitle: 'TQQQ ETF — Alpha Stacking',
    description: 'ProShares UltraPro QQQ (TQQQ): 3x daily Nasdaq-100 leverage.',
    lede:
      'TQQQ targets three times the daily return of the Nasdaq-100 Index, before fees and expenses, via derivative exposure and daily rebalancing.',
    strategyParas: [
      'TQQQ is one of the highest-beta mainstream index ETFs: it resets to ~3x Nasdaq-100 exposure each day, so compounding dominates medium-horizon outcomes. Trend helps; chop and volatility drag hurt.',
      'It is generally used as a tactical expression on growth leadership, not a passive core allocation. Funding costs, derivative execution, and index concentration all matter when volatility rises.',
    ],
    pedigreeParas: ped(
      `ProShares’ leveraged lineup is one of the most established in U.S. ETFs, and TQQQ is among the highest-liquidity products in the daily-reset Nasdaq leverage category.`,
      `Large asset scale and active secondary-market participation support tradability, but risk remains dominated by path dependence and concentrated growth-equity exposure.`
    ),
    outperfParas: [
      'TQQQ can outperform dramatically in sustained Nasdaq uptrends where breadth and earnings revisions keep growth leadership intact over long stretches.',
      'Favorable regimes are persistent, directional growth rallies with manageable volatility; sudden style reversals and liquidity shocks are the primary failure mode for 3x daily exposure.',
    ],
    officialUrl: 'https://www.proshares.com/our-etfs/leveraged-and-inverse/tqqq',
    officialLabel: 'ProShares (TQQQ)',
  },

  spmo: {
    yahooSymbol: 'SPMO',
    hubCategoryId: 'factor',
    badge: 'Factor',
    h1Title: 'SPMO — Invesco S&P 500 Momentum ETF',
    displayTicker: 'SPMO',
    issuer: 'Invesco',
    inception: 'Oct 2015',
    structure: 'US large-cap momentum factor',
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
    structure: 'US free-cash-flow factor',
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

  avuv: {
    yahooSymbol: 'AVUV',
    hubCategoryId: 'factor',
    badge: 'Factor',
    h1Title: 'AVUV — Avantis U.S. Small Cap Value ETF',
    displayTicker: 'AVUV',
    issuer: 'Avantis Investors',
    inception: 'Sep 2019',
    structure: 'US small-cap value factor',
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
    structure: 'Concentrated active US value',
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
    structure: 'Systematic managed-futures',
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
    structure: 'Managed-futures replication',
    mer: '0.85%',
    aum: '~$1.1B',
    pageTitle: 'DBMF ETF — Alpha Stacking',
    description: 'iMGP DBi Managed Futures Strategy ETF (DBMF): CTA replication via listed futures. How it works, what tape it earns in, and its role in an alpha stacking portfolio.',
    lede:
      'DBMF replicates the aggregate positioning of large managed-futures hedge funds in a listed ETF wrapper, using daily futures disclosures to reverse-engineer what the CTA universe is holding.',
    strategyParas: [
      `Managed futures funds trend-follow across equities, bonds, currencies, and commodities simultaneously. DBMF captures this by inferring what the largest CTA hedge funds are positioned in, then running a liquid futures portfolio to match it. You're not paying for any single manager's alpha — you're getting the aggregate direction of the CTA industry at lower cost than accessing those funds directly.`,
      'The trade-off is replication lag. When the CTA universe pivots — entering or exiting a trend — DBMF rebalances on a slightly different clock. In fast-moving markets this gap can matter; in sustained, slowly developing trends (which are the best environment for managed futures anyway), it matters less.',
    ],
    pedigreeParas: ped(
      `iMGP is a multi-boutique platform that packages specialist managers for mutual fund and ETF channels; DBi’s managed-futures research team sits inside that ecosystem with a published intellectual history on CTA replication.`,
      `Platform AUM is mid-market versus global banks, but DBMF’s ~$1.1B sleeve is one of the larger listed CTA proxies—liquidity and roll execution are materially better than sub-$50M peers.`,
    ),
    outperfParas: [
      'DBMF earns in sustained, directional macro moves — rising rates, falling equities in a clear bear market, a persistent dollar trend — where the large CTA funds are clearly positioned and the trends last long enough for DBMF to track them. 2022 is the benchmark case: equity and bond markets both trended sharply, managed futures earned across the board, and DBMF captured most of that.',
      'It struggles in choppy, range-bound markets where price moves reverse quickly before trends can develop. It also gives back gains when an established trend reverses sharply — managed futures are trend-followers, not trend-predictors, so they exit after the trend has broken. In a sideways equity market where nothing is trending, this sleeve is likely flat-to-negative.',
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
    structure: 'Rules-based managed-futures trend',
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

  mema: {
    yahooSymbol: 'MEMA',
    betaBenchmarkSymbol: 'EEM',
    hubCategoryId: 'long-short',
    badge: 'Long/short',
    h1Title: 'MEMA — Man Active Emerging Markets Alternative ETF',
    displayTicker: 'MEMA',
    issuer: 'Man Group',
    inception: 'Dec 16, 2025',
    structure: 'Active emerging-markets long/short equity',
    mer: '0.85%',
    aum: '~$10M',
    pageTitle: 'MEMA ETF — Alpha Stacking',
    description:
      'Man Active Emerging Markets Alternative ETF (MEMA): active EM long/short equity combining systematic signals with discretionary portfolio management.',
    lede:
      'MEMA is Man Group’s actively managed emerging-markets long/short equity ETF: the portfolio can hold both longs and shorts across EM issuers, aiming to compound stock-selection alpha with lower market dependence than a plain long-only EM index sleeve.',
    strategyParas: [
      'Fund materials describe a process that blends quantitative screening with manager discretion, then expresses views through long and short positions in emerging-markets equities and equity-related instruments. The mandate is not benchmark hugging; net exposure can move as risk and opportunity sets change.',
      'Implementation matters more than headline theme: short borrow costs, liquidity in local EM listings, and position sizing discipline can dominate realized returns in stress windows. Read the prospectus and holdings updates to monitor net/gross exposure drift rather than treating MEMA as static “EM beta.”',
    ],
    pedigreeParas: ped(
      `Man Group is a long-standing listed alternatives manager with institutional roots in quantitative and discretionary investing; MEMA extends that research platform into an ETF wrapper for investors who want emerging-markets long/short exposure without a hedge-fund lockup.`,
      `The ETF itself is still early in lifecycle and relatively small by AUM, so trading implementation and capacity management deserve attention alongside pure alpha claims—use limit orders and confirm current liquidity before sizing.`
    ),
    outperfParas: [
      'The sleeve should be most constructive when country and sector dispersion inside emerging markets is wide and persistent—windows where security selection and relative-value shorts can add return independent of broad EM index direction.',
      'It is a harder tape when correlations across EM jump toward one factor and short books get squeezed. Favorable regimes are fundamentally differentiated markets with orderly borrow and turnover, where long and short research can both monetize.',
    ],
    officialUrl: 'https://www.man.com/products/man-active-emerging-markets-alternative-etf',
    officialLabel: 'Man Group (MEMA)',
  },

  clse: {
    yahooSymbol: 'CLSE',
    hubCategoryId: 'long-short',
    badge: 'Long/short',
    h1Title: 'CLSE — Convergence Long/Short Equity ETF',
    displayTicker: 'CLSE',
    issuer: 'Convergence Investment Partners',
    inception: 'Dec 2009 (strategy); listed Feb 2022',
    structure: 'Active long/short US equity',
    mer: '~1.52% total (0.95% mgmt + short/margin costs; see sponsor table)',
    aum: '~$28M',
    pageTitle: 'CLSE ETF — Alpha Stacking',
    description:
      'Convergence Long/Short Equity ETF (CLSE): net-long U.S. long/short equity. Strategy, manager, when it earns, and its role in an alpha stacking portfolio.',
    lede:
      'CLSE is a net-long U.S. equity fund that goes long businesses Convergence expects to outperform and short businesses it expects to deteriorate — returns depend on individual stock selection, not on which way the market moves.',
    strategyParas: [
      'The fund uses a combination of quantitative signals and fundamental analysis: rules-based models for timing and risk sizing, overlaid with manager judgment on business quality and balance-sheet risk. The long book targets fundamentally resilient companies; the short book targets deteriorating ones. The net exposure is long-biased — this is not a market-neutral fund.',
      'Shorting has real costs: borrow fees, dividend pass-through on short positions, and margin interest. These show up in the expense ratio and in the spread between the fund\'s performance and a simple long-only benchmark. In short squeezes or rate spikes, the short book can hurt even if the long book is right on fundamentals.',
    ],
    pedigreeParas: ped(
      `Convergence Investment Partners runs the strategy out of Florida with a long institutional pedigree in long/short equity; the ETF is the same mandate packaged for exchange liquidity, with published fact sheets, investor guides, and quarterly holdings downloads on investcip.com rather than a bare ticker stub.`,
      `Listed AUM is boutique versus mega issuers—expect wider median bid/ask and more days away from NAV than SPY-class funds—so implementation (limit orders, patience around rebalances) matters as much as the underlying stock calls.`,
    ),
    outperfParas: [
      'CLSE earns when stocks diverge from each other — when good companies beat bad ones regardless of what the index does. Active stock dispersion environments, where earnings quality and balance-sheet differences drive divergence between longs and shorts, are the favorable tape. CLSE can compound in flat or sideways equity markets that kill pure index strategies.',
      'It struggles when everything moves together: a sharp macro-driven risk-off where stocks correlate to 1.0 collapses the spread between long and short legs, and a short squeeze can hurt the short book independent of fundamentals. It also needs time — months or years for stock calls to play out — and underperforms in momentum-driven markets where cheap valuation is irrelevant.',
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
    structure: 'Active global long/short equity',
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
    structure: 'Systematic global macro',
    capitalBucketExposurePct: 50,
    alphaBucketExposurePct: 100,
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
    structure: 'Merger arbitrage',
    mer: '0.75%',
    aum: '~$16M',
    pageTitle: 'MRGR ETF — Alpha Stacking',
    description: 'ProShares Merger ETF (MRGR): rules-based merger arbitrage via the S&P Merger Arbitrage Index. How deal-spread harvesting works and when it earns.',
    lede:
      'MRGR tracks the S&P Merger Arbitrage Index, which owns stocks of announced acquisition targets at their current trading price and hedges acquirer exposure — capturing the spread between where deals trade and the announced deal price.',
    strategyParas: [
      'When a company announces it will acquire another at $50 per share and the target trades at $48, that $2 spread is what merger arbitrage captures. The fund holds a basket of these announced-deal positions across the current M&A calendar. The spread exists because deal completion takes time and there is always a chance the deal falls through — you are being paid to warehouse that completion risk.',
      'The economics are driven by deal spreads and financing costs, not by equity beta. Net exposure to the broad market is low by design: the fund is long the target (which trades near the deal price regardless of market direction) and hedges the acquirer. The main risks are deal breaks, regulatory blocks, and acquirer repricing — read the prospectus for how the index handles each.',
    ],
    pedigreeParas: ped(
      `ProShares Advisors LLC advises the fund; ProShares is part of the broader ProFunds Group that pioneered listed leveraged and inverse products before expanding into strategic beta sleeves such as merger arbitrage. Industry league tables generally place ProShares’ complex in the tens of billions of USD in listed ETP assets (order of magnitude).`,
      `The underlying S&P Dow Jones Indices merger-arbitrage methodology is maintained independently of ProShares; that separation matters for investors who want rules-based event exposure rather than a single PM’s discretion.`
    ),
    outperfParas: [
      'Merger arb earns steadily when deals close on schedule: active M&A calendars, friendly transactions where regulatory approval is likely, and financing markets that are calm enough for deal spreads to compress without interruption. Because the return is tied to deal completion rather than equity direction, this sleeve can earn in flat or declining equity markets as long as deals keep closing.',
      'It underperforms when deals break or get blocked: an antitrust challenge that kills a deal, or a sharp drop in the acquirer\'s stock that reprices the economics, can turn a steady spread-earner into a loss. Broad risk-off episodes can also widen spreads faster than they close — the sleeve looks bad in the short run even when most deals eventually close.',
    ],
    officialUrl: 'https://www.proshares.com/our-etfs/strategic/mrgr',
    officialLabel: 'ProShares (MRGR)',
  },

  attr: {
    yahooSymbol: 'ATTR',
    hubCategoryId: 'premia-systematic-alternatives',
    badge: 'Premia and systematic alternatives',
    h1Title: 'ATTR — Arin Tactical Tail Risk ETF',
    displayTicker: 'ATTR',
    issuer: 'ETF Architect / Arin Risk Advisors',
    inception: 'Oct 27, 2025',
    structure: 'Tail-risk equity overlay',
    mer: '0.63%',
    aum: '~$90M',
    pageTitle: 'ATTR ETF — Alpha Stacking',
    description: 'Arin Tactical Tail Risk ETF (ATTR): U.S. large-cap exposure with active tail-risk mitigation.',
    lede:
      'ATTR is an actively managed tail-risk sleeve that seeks U.S. large-cap participation while mitigating severe drawdowns through options structures and tactical overlays.',
    strategyParas: [
      'Issuer materials describe a blend of equity index exposure and options on large-cap benchmarks (notably S&P 500-linked structures), aiming to retain upside participation while dampening left-tail outcomes during stress regimes.',
      'The trade-off is explicit carry cost: hedging and convexity overlays can lag in quiet bull markets, and implementation (strike selection, roll timing, collateral use, and ETF-of-ETF sleeves such as tail-risk allocations) drives realized outcomes versus a plain beta benchmark.',
    ],
    pedigreeParas: ped(
      `ATTR sits on ETF Architect’s operating platform (Empowered Funds, LLC dba EA Advisers), with Arin Risk Advisors as sub-adviser; the structure is a specialist derivatives/risk-management stack rather than plain index replication.`,
      `ETF Architect is a boutique ETF platform (sub-scale versus mega issuers), which often means differentiated exposures and tighter product focus, but also requires investors to monitor liquidity, spreads, and portfolio disclosures more actively than for broad core-beta funds.`,
    ),
    outperfParas: [
      'The sleeve tends to add value in fast-volatility expansions, gap-down tapes, and correlation spikes where options convexity and explicit downside hedges can offset part of equity drawdown pressure.',
      'Expect relative underperformance in smooth, low-volatility melt-ups when protection spend and hedge drag dominate. Favorable regimes are turbulent or regime-shifting markets where downside insurance reprices quickly and nonlinear hedges can monetize.',
    ],
    officialUrl: 'https://arinetfs.com/attr',
    officialLabel: 'Arin ETFs (ATTR)',
  },

  ...US_ETF_FEATURED_PART,
}

export const CA_ETF_DYNAMIC_REGISTRY: Record<string, EtfDynamicDef> = {
  rgbm: {
    yahooSymbol: 'RGBM.TO',
    hubCategoryId: 'return-stacked',
    badge: 'Return Stacked - 2x+',
    h1Title: 'RGBM.TO — Return Stacked® Global Balanced & Macro ETF',
    displayTicker: 'RGBM / RGBM.U',
    issuer: 'LongPoint / Return Stacked® ETFs Canada',
    inception: 'Feb 2025',
    structure: 'Return-stacked balanced + macro alternatives',
    capitalBucketExposurePct: 100,
    alphaBucketExposurePct: 100,
    mer: '0.85% + perf fee',
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
    structure: 'Multi-asset alternatives fund-of-funds',
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
    structure: 'Multi-strategy alpha alternatives',
    mer: '0.95% + perf fee',
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
    betaBenchmarkSymbol: 'XIU.TO',
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
    structure: 'Quantitative long/short equity (150/50)',
    mer: '0% + perf fee',
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
    structure: 'Global long/short equity alternatives',
    mer: '0.95% + perf fee',
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
    structure: 'Global long/short equity alternatives',
    mer: '~1.0%',
    aum: '~$75M+ CAD',
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
    structure: 'Systematic global macro alternatives',
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
    structure: 'Spot Bitcoin',
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

  hsu: {
    yahooSymbol: 'HSU.TO',
    betaBenchmarkSymbol: 'SPY',
    hubCategoryId: 'leveraged-equity',
    badge: 'Leveraged equity ETFs (advanced)',
    h1Title: 'HSU.TO — BetaPro S&P 500 2x Daily Bull ETF',
    displayTicker: 'HSU',
    issuer: 'Global X Investments Canada',
    inception: 'Jun 17, 2008',
    structure: '2x daily S&P 500 leverage',
    mer: '~1.50%',
    aum: '~$170M CAD',
    pageTitle: 'HSU.TO ETF — Alpha Stacking',
    description: 'BetaPro S&P 500 2x Daily Bull ETF (HSU.TO).',
    lede:
      'HSU is Global X Canada’s daily-reset leveraged S&P 500 sleeve, targeting about 2x the index’s one-day move before fees and hedging costs.',
    strategyParas: [
      'HSU uses derivatives and financing tools to target roughly 200% of the S&P 500 on a daily basis. The daily reset matters: multi-day outcomes can diverge materially from 2x simple index return, especially in volatile, mean-reverting tape.',
      'The fund is CAD listed and historically includes currency-hedging mechanics in its structure; compounding drag, financing spread, and path dependence are the core drivers to monitor versus a plain broad-market ETF.',
    ],
    pedigreeParas: ped(
      `Global X Investments Canada (formerly Horizons ETFs Management) is one of the larger Canadian ETF issuers and operates the long-running BetaPro lineup, which gives HSU more operational history than many newer leveraged wrappers.`,
      `Global X Canada is part of Mirae Asset’s global platform, providing institutional derivatives infrastructure and distribution depth behind products that are explicitly designed for tactical, higher-risk exposure.`,
    ),
    outperfParas: [
      'HSU tends to shine in persistent uptrends with contained volatility, when daily compounding can reinforce directional gains and 2x exposure captures strong beta regimes.',
      'Choppy, high-volatility ranges are the hostile regime because path dependence and volatility drag accumulate quickly. Favorable conditions are sustained trend periods, not repeated reversal days.',
    ],
    officialUrl: 'https://www.globalx.ca/product/HSU',
    officialLabel: 'Global X Canada (HSU)',
  },

  hqu: {
    yahooSymbol: 'HQU.TO',
    betaBenchmarkSymbol: 'QQQ',
    hubCategoryId: 'leveraged-equity',
    badge: 'Leveraged equity ETFs (advanced)',
    h1Title: 'HQU.TO — BetaPro NASDAQ-100 2x Daily Bull ETF',
    displayTicker: 'HQU',
    issuer: 'Global X Investments Canada',
    inception: 'Jan 8, 2010',
    structure: '2x daily Nasdaq-100 leverage',
    mer: '~1.44%',
    aum: '~$400M CAD',
    pageTitle: 'HQU.TO ETF — Alpha Stacking',
    description: 'BetaPro NASDAQ-100 2x Daily Bull ETF (HQU.TO).',
    lede:
      'HQU is a daily-reset 2x Nasdaq-100 exposure sleeve in Canada, designed for tactical growth-beta positioning rather than long-horizon buy-and-hold allocation.',
    strategyParas: [
      'The mandate targets about two times the NASDAQ-100 daily return before fees. As with all daily leveraged ETFs, realized multi-day performance depends on sequence of returns, volatility, and rebalance math, not just start-to-end index change.',
      'Because the index is tech-heavy and duration-sensitive, HQU’s risk profile is tightly linked to rates regime, mega-cap concentration, and momentum persistence. Position sizing and holding period discipline matter more than ticker selection alone.',
    ],
    pedigreeParas: ped(
      `Global X Canada has managed leveraged BetaPro products for years, giving HQU a deeper live-history set for compounding behavior than many new-launch leveraged clones.`,
      `The issuer’s integration with the Mirae Asset group supports derivative execution and product operations at scale, but that does not remove instrument-level leverage risk for end investors.`,
    ),
    outperfParas: [
      'HQU tends to outperform in sustained risk-on growth phases where Nasdaq leadership is broad enough to offset daily leverage costs and volatility stays manageable.',
      'It struggles in violent rotations and chop, where reversal-driven compounding drag can erode returns quickly. Favorable regimes are clean momentum markets, not two-way macro whipsaw.',
    ],
    officialUrl: 'https://www.globalx.ca/product/hqu',
    officialLabel: 'Global X Canada (HQU)',
  },

  ussl: {
    yahooSymbol: 'USSL.TO',
    betaBenchmarkSymbol: 'SPY',
    hubCategoryId: 'leveraged-equity',
    badge: 'Leveraged equity ETFs (advanced)',
    h1Title: 'USSL.TO — Global X Enhanced S&P 500 Index ETF',
    displayTicker: 'USSL',
    issuer: 'Global X Investments Canada',
    inception: 'May 21, 2024',
    structure: '1.25x S&P 500 enhanced beta',
    mer: '~0.50%',
    aum: '~$250M CAD',
    pageTitle: 'USSL.TO ETF — Alpha Stacking',
    description: 'Global X Enhanced S&P 500 Index ETF (USSL.TO).',
    lede:
      'USSL targets roughly 1.25x S&P 500 exposure in a Canadian-listed wrapper, aiming for enhanced beta with lower leverage than classic 2x daily products.',
    strategyParas: [
      'Global X materials frame USSL as an enhanced-index sleeve that uses leverage tools to seek about 125% of S&P 500 performance, net of expenses. The lower target multiple can reduce volatility drag versus 2x products, but compounding effects still matter.',
      'Investors should still treat it as a leveraged instrument: financing cost, path dependence, and market-gap risk remain central. It sits between plain beta and high-octane tactical leverage in the implementation spectrum.',
    ],
    pedigreeParas: ped(
      `Global X Canada’s scale in the domestic ETF market and long derivatives track record make USSL more institutionalized than many niche leverage wrappers.`,
      `Backed by Mirae Asset’s global platform, the issuer has broad product infrastructure, but USSL’s outcome remains a function of S&P path and leverage mechanics rather than issuer size alone.`,
    ),
    outperfParas: [
      'USSL generally works best in steady equity uptrends where enhanced beta compounds with limited volatility interruption, giving a cleaner participation profile than 2x leverage.',
      'Sideways chop and abrupt drawdowns can still damage realized compounding. Favorable tape is trending broad-market strength with contained vol, not headline-driven reversal clusters.',
    ],
    officialUrl: 'https://www.globalx.ca/product/ussl',
    officialLabel: 'Global X Canada (USSL)',
  },

  qqql: {
    yahooSymbol: 'QQQL.TO',
    betaBenchmarkSymbol: 'QQQ',
    hubCategoryId: 'leveraged-equity',
    badge: 'Leveraged equity ETFs (advanced)',
    h1Title: 'QQQL.TO — Global X Enhanced NASDAQ-100 Index ETF',
    displayTicker: 'QQQL',
    issuer: 'Global X Investments Canada',
    inception: 'May 21, 2024',
    structure: '1.25x Nasdaq-100 enhanced beta',
    mer: '~0.50%',
    aum: '~$180M CAD',
    pageTitle: 'QQQL.TO ETF — Alpha Stacking',
    description: 'Global X Enhanced NASDAQ-100 Index ETF (QQQL.TO).',
    lede:
      'QQQL is a Canadian-listed enhanced-beta Nasdaq sleeve targeting about 1.25x index exposure, positioned between plain QQQ-style beta and 2x daily leverage.',
    strategyParas: [
      'The product seeks to replicate approximately 125% of NASDAQ-100 performance using permitted leverage tools. That lower multiplier can be more implementation-friendly than 2x structures, but it is still path-dependent leveraged exposure.',
      'Given Nasdaq concentration, results are sensitive to mega-cap tech leadership, rates shocks, and momentum persistence. In practice, the main risk control is sizing and holding discipline, not the reduced leverage multiple alone.',
    ],
    pedigreeParas: ped(
      `QQQL sits in Global X Canada’s enhanced-index lineup, leveraging the same issuer and derivatives plumbing used across BetaPro and other tactical products.`,
      `Global X Canada’s parent ecosystem (Mirae Asset) provides scale and product support, while investors still bear the strategy-level realities of leveraged compounding and growth-factor concentration.`,
    ),
    outperfParas: [
      'QQQL tends to add most when growth leadership trends persist and volatility remains moderate, allowing enhanced beta to compound on the right side of momentum.',
      'It underperforms fastest in reversal-heavy markets or sharp risk-off rotations out of mega-cap tech. Favorable regimes are persistent trend markets, not macro whiplash.',
    ],
    officialUrl: 'https://www.globalx.ca/product/qqql',
    officialLabel: 'Global X Canada (QQQL)',
  },

  heql: {
    yahooSymbol: 'HEQL.TO',
    hubCategoryId: 'leveraged-equity',
    badge: 'Leveraged equity ETFs (advanced)',
    h1Title: 'HEQL.TO — Global X Enhanced All-Equity Asset Allocation ETF',
    displayTicker: 'HEQL',
    issuer: 'Global X Investments Canada',
    inception: 'Oct 10, 2023',
    structure: '1.25x global all-equity allocation',
    mer: '~0.45%',
    aum: '~$19M CAD',
    pageTitle: 'HEQL.TO ETF — Alpha Stacking',
    description: 'Global X Enhanced All-Equity Asset Allocation ETF (HEQL.TO).',
    lede:
      'HEQL is a Canadian-listed enhanced all-equity allocation sleeve that targets roughly 125% exposure to a diversified global equity mix through a fund-of-funds structure.',
    strategyParas: [
      'Global X describes HEQL as an enhanced-growth wrapper that primarily holds diversified equity ETFs and employs cash borrowing to maintain a leverage ratio near 125% within prospectus limits. It is a practical middle ground between plain all-equity beta and higher-volatility daily-reset leverage products.',
      'Because the engine is a leveraged fund-of-funds, realized outcomes depend on underlying regional allocations, financing cost, and equity volatility path. Monthly distributions and rebalancing inside underlying sleeves can also shape return cadence relative to a single-index benchmark.',
    ],
    pedigreeParas: ped(
      `Global X Investments Canada is one of the larger domestic ETF issuers and operates broad lineup depth across core, covered-call, and leveraged products; HEQL benefits from that existing ETF plumbing rather than standing alone as a niche launch.`,
      `Global X Canada is a Mirae Asset subsidiary, giving the sponsor institutional operating scale for borrowing facilities, portfolio implementation, and distribution while keeping the product targeted at Canadian investors who want enhanced global equity exposure in one TSX ticker.`,
    ),
    outperfParas: [
      'HEQL tends to add value in steady, broad global equity uptrends where moderate leverage can compound without frequent volatility shocks. The structure is built to monetize persistent beta participation rather than short-term tactical timing.',
      'It is less favorable in choppy, reversal-heavy markets where financing and compounding drag can erode excess return. Best conditions are durable risk-on tapes with healthy breadth across U.S., international, and emerging equity sleeves.',
    ],
    officialUrl: 'https://www.globalx.ca/product/heql',
    officialLabel: 'Global X Canada (HEQL)',
  },

  ethxb: {
    yahooSymbol: 'ETHX-B.TO',
    hubCategoryId: 'crypto',
    badge: 'Crypto & digital assets',
    h1Title: 'ETHX-B.TO — CI Galaxy Ethereum ETF',
    displayTicker: 'ETHX.B',
    issuer: 'CI Global Asset Management',
    inception: 'Apr 2021',
    structure: 'Spot Ether',
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

  ...CA_ETF_FEATURED_PART,
}
