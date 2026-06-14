/**
 * On-site ETF write-ups for all US and CA hub tickers.
 * Body copy for select ETFs is imported from `etfFeaturedRegistryBodies.ts`.
 */

import * as fb from '@/lib/etfFeaturedRegistryBodies'
import {
  alphaEfficiencyStackedTooltip,
  alphaEfficiencyUnstackedTooltip,
  capitalEfficiencyTooltip,
  insufficientHistoryTooltip,
} from '@/lib/etfEfficiencyTooltipFraming'
import { HFGM_ASGM_SYNTHETIC_ANNUAL_DRAG } from '@/lib/syntheticChartConstants'

const NTSD_CAPITAL_SLEEVE_P2 =
  'NTSD targets a capital-efficient blend of U.S. large-cap equity with additional developed international equity notional via futures and related instruments. It’s a 90/60-style equity stack, not an uncorrelated managed-futures alpha sleeve.'

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

/** One or more pedigree paragraphs (shared disclaimers live in `EtfPageDisclaimers`). */
function ped(...main: string[]): string[] {
  return [...main]
}

function cryptoLede(ticker: string, thesis: string): string {
  return `${ticker} ${thesis}`
}

const HFGM_PROXY_NOTE_HTML = `Model portfolio charts on this site extend HFGM before its first listed session using 1.5× ASGM (Virtus AlphaSimplex Global Macro) daily total returns minus ~${(HFGM_ASGM_SYNTHETIC_ANNUAL_DRAG * 100).toFixed(1)}% annual drag as a proxy; the chart above is HFGM-only (Yahoo adjusted close).`

const TIDAL_RETURN_STACKED_PEDIGREE_PARAS = ped(
  `Return Stacked® ETFs package ReSolve / Newfound-style capital-efficiency research through Tidal’s ETF platform, with transparent notional sleeves rather than opaque alternatives wrappers.`,
  `The complex is smaller than mega-index issuers, but purpose-built around sleeve-level implementation and disclosure. Read holdings and shareholder reports because gross and net exposures can move with volatility targeting and futures conditions.`
)

const WISDOMTREE_PEDIGREE_PARAS = ped(
  `WisdomTree built its brand on fundamentally weighted and capital-efficient ETFs well before many copycat implementations. The same derivatives-and-collateral framework underpins its Efficient Core and related stacked sleeves.`,
  `WisdomTree has reported roughly $143B+ in global ETP and tokenized AUM (late-2025 disclosures), giving institutional futures and collateral infrastructure while still operating as a specialist versus the largest index houses.`
)

const PROSHARES_PEDIGREE_PARAS = ped(
  `ProShares is one of the category-defining sponsors in listed leveraged and inverse ETFs, with a long operating history in daily-reset index exposure and established derivatives execution infrastructure.`,
  `Its broader complex sits in the tens of billions of dollars of listed ETF assets in public league tables, which supports primary-market depth and secondary liquidity across both leveraged and strategic sleeves.`
)

export const US_ETF_DYNAMIC_REGISTRY: Record<string, EtfDynamicDef> = {
  begs: {
    yahooSymbol: 'BEGS',
    capitalBucketExposurePct: 75,
    alphaBucketExposurePct: 75,
    hubCategoryId: 'crypto',
    badge: 'Return Stacked - Crypto',
    h1Title: 'BEGS — Rareview 2x Bull Cryptocurrency & Precious Metals ETF',
    displayTicker: 'BEGS',
    issuer: 'Rareview Capital',
    inception: 'Feb 7, 2025',
    addedToSite: '2026-04-17',
    structure: 'Leveraged crypto + precious-metals',
    mer: '0.99%',
    aum: '~$12M',
    pageTitle: 'BEGS ETF — Alpha Stacking',
    description: 'Rareview 2x Bull Cryptocurrency & Precious Metals ETF (BEGS): leveraged crypto + metals sleeve.',
    contentFormat: 'html',
    lede: cryptoLede(
      'BEGS',
      'targets leveraged long exposure to a blended cryptocurrency and precious-metals basket using derivatives and ETPs.'
    ),
    strategyParas: [
      'BEGS is a 2× long sleeve: futures, swaps, and ETPs stack crypto and precious-metals beta into one listed vehicle. Daily reset means path dependence diverges from simply holding spot coins or bullion.',
      'Collateral, exchange limits, and funding markets can gap versus NAV. The exact basket, rebalance rules, and risk factors are in Rareview’s prospectus.',
    ],
    pedigreeParas: ped(
      `Rareview Capital is an independent ETF issuer focused on thematic and digital-asset products. It sits outside the Big Three index oligopoly, so distribution and research coverage are thinner than mega-brand funds.`,
      `BEGS is small by AUM and trades leveraged exposure, so bid/ask spreads and premium/discount to NAV can swing harder than large plain-vanilla ETFs. Liquidity is part of the return profile.`,
    ),
    outperfParas: [
      'Outperforms when <strong>both assets trend with supportive volatility</strong>: gold catching a real-rate or stress bid while crypto retains speculative liquidity often produces the cleanest dual-beta tape for a leveraged long wrapper.',
      'Underperforms in sharp reversals, <strong>correlated selloffs</strong> across metals and tokens, or funding spikes that invert futures curves are the natural adversaries, favorable windows are trending, not chop-filled, environments where you can tolerate daily reset behavior.',
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
    badge: 'Return Stacked - Crypto',
    h1Title: 'BTGD — STKd 100% Bitcoin & 100% Gold ETF',
    displayTicker: 'BTGD',
    issuer: 'Quantify Funds',
    inception: 'Oct 15, 2024',
    addedToSite: '2026-04-17',
    structure: 'Stacked bitcoin + gold futures',
    mer: '1.05%',
    aum: '~$45M',
    pageTitle: 'BTGD ETF — Alpha Stacking',
    description: 'STKd 100% Bitcoin & 100% Gold ETF (BTGD): stacked bitcoin and gold exposure.',
    contentFormat: 'html',
    lede: cryptoLede(
      'BTGD',
      'seeks simultaneous ~100% bitcoin and ~100% gold exposure via futures and ETPs in a capital-efficient structure.'
    ),
    strategyParas: [
      'Quantify’s “STKd” line is explicitly about stacking two sleeves per dollar invested—bitcoin futures/ETPs for digital scarcity beta and gold futures/ETPs for monetary-metal beta—so collateral, margin, and roll mechanics are the entire game versus holding physical coins and bars.',
      'When both legs trend together, compounding can feel exhilarating. When they diverge (risk-on crypto vs. risk-off gold), the fund rebalances risk budgets. CME and exchange limits can create execution gaps worth understanding.',
    ],
    pedigreeParas: ped(
      `Quantify Funds is a California-based issuer that has leaned into branded “stacked” ETPs rather than broad passive lineups. It is not a top-ten sponsor by AUM, so distribution and research coverage are thinner than mega-brand funds.`,
      `Several issuers now list stacked crypto and metals products with similar headlines. Before adding BTGD, compare fee stacks, collateral policy, and exact sleeve notionals so you are not accidentally doubling the same macro bet.`,
    ),
    outperfParas: [
      'Outperforms when bitcoin’s liquidity cycle and gold’s real-rate / FX sensitivity are <strong>both working</strong>, not necessarily in the same direction every day, but with clean trends that futures books can ride without constant whipsaw.',
      'Underperforms in <strong>sharp deleveraging</strong> that hits crypto funding while gold spikes on flight-to-quality, both can move fast, but correlation spikes can still stress dual-book margin; sizing should assume gap risk, not smooth Gaussian returns.',
    ],
    officialUrl: 'https://quantifyfunds.com/btgd',
    officialLabel: 'Quantify Funds (BTGD)',
  },

  ooqb: {
    yahooSymbol: 'OOQB',
    capitalBucketExposurePct: 100,
    alphaBucketExposurePct: 100,
    hubCategoryId: 'crypto',
    badge: 'Return Stacked - Crypto',
    h1Title: 'OOQB — One+One™ Nasdaq-100® and Bitcoin ETF',
    displayTicker: 'OOQB',
    issuer: 'Volatility Shares',
    inception: 'Feb 18, 2025',
    addedToSite: '2026-04-17',
    structure: 'Stacked Nasdaq-100 + bitcoin',
    mer: '0.85%',
    aum: '~$180M',
    pageTitle: 'OOQB ETF — Alpha Stacking',
    description: 'One+One Nasdaq-100 and Bitcoin ETF (OOQB).',
    contentFormat: 'html',
    lede: cryptoLede(
      'OOQB',
      'targets ~100% Nasdaq-100 exposure alongside ~100% bitcoin futures exposure in one listed wrapper.'
    ),
    strategyParas: [
      'Volatility Shares built its franchise engineering listed products around volatility and convexity; OOQB extends that toolkit to “One+One” stacking—Nasdaq-100 futures or swaps plus bitcoin futures so each dollar of NAV carries roughly a dollar of each risk factor before fees.',
      'Because both sleeves are high-beta, margin and exchange rules can force de-risking faster than a 60/40 fund. If one leg limits up or down while the other remains open, execution gaps can be meaningful.',
    ],
    pedigreeParas: ped(
      `Volatility Shares is best known for VIX-linked ETPs that broke new ground (and new risk education) for U.S. investors; the sponsor’s DNA is derivatives engineering, not plain-vanilla indexing—OOQB inherits that culture: tight operations desks, aggressive disclosure updates, and a user base that understands path risk.`,
      `Listed AUM across Volatility Shares is meaningful within structured ETPs but small compared to BlackRock or State Street. Expect episodic liquidity pockets around headline crypto moves rather than continuous tight spreads.`,
    ),
    outperfParas: [
      'Outperforms when both Nasdaq and bitcoin trend together, dispersion stays orderly, and <strong>funding markets behave</strong>.',
      'Underperforms when <strong>bitcoin funding blows out</strong> while Nasdaq gaps down: both legs correlate higher than expected, so each sleeve needs independent drivers to earn.',
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
    badge: 'Return Stacked - Crypto',
    h1Title: 'OOSB — One+One™ S&P 500® and Bitcoin ETF',
    displayTicker: 'OOSB',
    issuer: 'Volatility Shares',
    inception: 'Feb 18, 2025',
    addedToSite: '2026-04-17',
    structure: 'Stacked S&P 500 + bitcoin',
    mer: '0.85%',
    aum: '~$95M',
    pageTitle: 'OOSB ETF — Alpha Stacking',
    description: 'One+One S&P 500 and Bitcoin ETF (OOSB).',
    contentFormat: 'html',
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
      'Outperforms when the S&P grinds higher on broad earnings while bitcoin captures a <strong>parallel liquidity bid</strong>: diversification shows up when correlations stay below one even as both rise.',
      'Underperforms when <strong>macro tightening hits every risk asset</strong> simultaneously: two high-beta sleeves in one wrapper, it needs orderly bull markets with functioning futures markets.',
    ],
    officialUrl:
      'https://www.sec.gov/Archives/edgar/data/1884021/000121390025015194/ea0230935-03_497k.htm',
    officialLabel: 'Volatility Shares — SEC summary prospectus (OOSB)',
  },

  rssx: {
    yahooSymbol: 'RSSX',
    hubCategoryId: 'crypto',
    badge: 'Return Stacked - Crypto',
    h1Title: 'RSSX — Return Stacked U.S. Stocks & Gold/Bitcoin ETF',
    displayTicker: 'RSSX',
    issuer: 'Tidal / Return Stacked ETFs',
    inception: 'May 29, 2025',
    addedToSite: '2026-04-17',
    structure: 'Return-stacked US equity + gold/bitcoin',
    capitalBucketExposurePct: 100,
    alphaBucketExposurePct: 100,
    mer: '0.68%',
    aum: '~$55M',
    pageTitle: 'RSSX ETF — Alpha Stacking',
    description: 'Return Stacked U.S. Stocks & Gold/Bitcoin ETF (RSSX).',
    contentFormat: 'html',
    lede:
      'RSSX applies the Return Stacked® design: large-cap U.S. equity exposure layered with gold and bitcoin sleeves in one fund.',
    strategyParas: [
      'RSSX is the Return Stacked® line’s “equity + hard assets + digital scarcity” combination: a U.S. large-cap sleeve alongside gold and bitcoin exposure, with each implemented via futures, trusts, or swaps depending on the sleeve.',
      'Gold and bitcoin can respond oppositely to real rates, so the fund can behave like a barbell. Liquidity crises tend to correlate everything together.',
    ],
    pedigreeParas: TIDAL_RETURN_STACKED_PEDIGREE_PARAS,
    outperfParas: [
      'Outperforms when U.S. equities deliver carry while gold hedges real-rate shocks and bitcoin captures speculative liquidity: three sleeves, <strong>three different macro channels</strong>.',
      'Underperforms when every asset class moves in <strong>lockstep</strong> down: stacking does not erase beta.',
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
    badge: 'Return Stacked - Crypto',
    h1Title: 'WTIB — USCF Oil Plus Bitcoin Strategy Fund',
    displayTicker: 'WTIB',
    issuer: 'USCF Investments',
    inception: 'Dec 9, 2025',
    addedToSite: '2026-04-17',
    structure: 'Oil + bitcoin strategy',
    mer: '0.93%',
    aum: '~$18M',
    pageTitle: 'WTIB ETF — Alpha Stacking',
    description: 'USCF Oil Plus Bitcoin Strategy Fund (WTIB).',
    contentFormat: 'html',
    lede:
      'WTIB combines crude oil and bitcoin futures/ETP exposure in an actively managed sleeve targeting balanced notional risk across the two themes.',
    strategyParas: [
      'Unlike passive dual-beta ETFs, WTIB is actively allocated between crude oil futures/ETPs and bitcoin futures/ETPs. USCF’s commodity heritage (they built USO) shapes how the desk tilts when curve shape or crypto volatility dominates.',
      'Oil curve shape and bitcoin funding can each drag NAV for months regardless of the spot price story.',
    ],
    pedigreeParas: ped(
      `USCF Investments built its reputation on listed commodity ETPs before crypto became investable at scale. The firm’s infrastructure is energy-markets native, meaning bitcoin is bolted onto a commodity operations stack rather than the other way around.`,
      `USCF’s broader complex sits in the low billions USD of ETP assets: meaningful in commodities but small versus integrated bank ETF businesses, so WTIB suits a satellite position.`,
    ),
    outperfParas: [
      'Outperforms when oil and bitcoin are <strong>trending independently</strong>: a supply shock or geopolitical premium driving crude while bitcoin trades its own liquidity cycle, macro “reflation + digitization” narratives can lift both, but independence is the diversification pitch.',
      'Underperforms when dollar liquidity vanishes and every high-beta sleeve sells together; WTIB is not a hedge, favorable tape is trending energy with orderly crypto funding, not <strong>synchronized deleveraging</strong>.',
    ],
    officialUrl: 'https://www.uscfinvestments.com/wtib',
    officialLabel: 'USCF Investments (WTIB)',
  },

  spbc: {
    yahooSymbol: 'SPBC',
    capitalBucketExposurePct: 100,
    alphaBucketExposurePct: 10,
    hubCategoryId: 'crypto',
    badge: 'Return Stacked - Crypto',
    h1Title: 'SPBC — Simplify US Equity PLUS Bitcoin Strategy ETF',
    displayTicker: 'SPBC',
    issuer: 'Simplify Asset Management',
    inception: 'May 24, 2021',
    addedToSite: '2026-05-23',
    structure: 'S&P 500 + ~10% spot bitcoin overlay',
    mer: '0.54%',
    aum: '~$45M',
    pageTitle: 'SPBC ETF — Alpha Stacking',
    description: 'Simplify US Equity PLUS Bitcoin Strategy ETF (SPBC): 100% S&P 500 with a ~10% spot bitcoin overlay.',
    contentFormat: 'html',
    lede: cryptoLede(
      'SPBC',
      'holds <strong>100% S&P 500 equity</strong> exposure alongside a targeted <strong>~10% spot bitcoin allocation</strong> via exchange-traded products, offering a measured way to add bitcoin to a core equity position.'
    ),
    strategyParas: [
      'Unlike full one-plus-one stacked designs that place a complete second sleeve on every invested dollar, SPBC is deliberately measured: IVV (iShares Core S&P 500) anchors the equity book while S&P 500 E-mini futures supplement to hold 100% notional, and spot bitcoin ETPs (currently VanEck HODL) target 10% of NAV with quarterly rebalancing and a hard 25% cap. Gross notional runs roughly 110%, not 200%.',
      'Simplify avoids bitcoin futures entirely, using only spot ETPs. That choice sidesteps roll costs and contango friction common in futures-based wrappers but means the bitcoin exposure is fully price-linked. Investors should size the 10% sleeve as a convexity addition, not a hedge: in a sharp crypto selloff it clips 3-5 percentage points of NAV regardless of equity direction.',
    ],
    pedigreeParas: ped(
      `Simplify Asset Management was co-founded in 2020 by Paul Kim (CEO) and David Berns, PhD (CIO), with Michael Green (Managing Director and Chief Strategist) also serving as a portfolio manager for SPBC. The firm built its reputation on options-enhanced and convexity-aware ETF structures before expanding into stacked and bitcoin-overlay products; it manages approximately $6.1B in ETF assets across its complex.`,
      `Berns holds a PhD in physics from MIT with a background in quantum computation; Green is widely followed for macro and market-structure research. The team's orientation is toward engineering exposures precisely rather than replicating index conventions: SPBC's quarterly rebalance cadence and explicit bitcoin cap reflect that design-first philosophy.`,
    ),
    outperfParas: [
      'Outperforms when U.S. large-cap equities trend higher and bitcoin captures an independent <strong>digital-scarcity bid</strong>: the 10% sleeve adds meaningful convexity to the upside without proportionally increasing drawdown drag because the notional is modest.',
      'Underperforms when bitcoin sells off hard while equities are flat or moderately positive; the 10% sleeve is large enough to impose real NAV drag (3-5 percentage points in a severe crypto drawdown) with no offsetting diversification if the equity sleeve is only generating <strong>muted returns on the weaker leg</strong>.',
    ],
    officialUrl: 'https://www.simplify.us/etfs/spbc-simplify-us-equity-plus-bitcoin-strategy-etf',
    officialLabel: 'Simplify Asset Management (SPBC)',
  },

  rsbt: {
    yahooSymbol: 'RSBT',
    hubCategoryId: 'return-stacked-ge-2x',
    badge: 'Return Stacked - 2x',
    h1Title: 'RSBT — Return Stacked Bonds & Managed Futures ETF',
    displayTicker: 'RSBT',
    issuer: 'Tidal / Return Stacked ETFs',
    inception: 'Feb 7, 2023',
    addedToSite: '2026-05-20',
    structure: 'Return-stacked US bonds + managed futures',
    capitalBucketExposurePct: 100,
    alphaBucketExposurePct: 100,
    mer: '1.02%',
    aum: '~$126M',
    pageTitle: 'RSBT ETF — Alpha Stacking',
    description: 'Return Stacked Bonds & Managed Futures ETF (RSBT): 100% broad U.S. bond exposure stacked with 100% systematic managed futures.',
    contentFormat: 'html',
    lede:
      'RSBT targets roughly dollar-for-dollar broad U.S. bond exposure alongside a systematic managed-futures sleeve, return stacking for fixed-income allocators who want trend exposure without selling bonds.',
    strategyParas: [
      'For each dollar invested, RSBT holds roughly one dollar of broad U.S. bond exposure targeting the Bloomberg U.S. Aggregate Bond Index (implemented via SPAB, Treasuries, or Treasury futures) and one dollar of systematic managed-futures exposure. The futures sleeve uses a blended approach: 30% top-down regression against leading CTA funds, 70% bottom-up time-series momentum, price-versus-moving-average, and breakout signals across equities, bonds, commodities, and currencies.',
      'The bond sleeve provides duration and credit carry; the futures overlay trend-follows independently. When rates move directionally or macro themes persist, both sleeves can contribute. In choppy, mean-reverting markets the futures drag adds to the carry cost of running leveraged exposures, and investors should review the prospectus for details on swap counterparty risk and gross notional limits.',
    ],
    pedigreeParas: TIDAL_RETURN_STACKED_PEDIGREE_PARAS,
    outperfParas: [
      'Outperforms when bond markets deliver positive total return while <strong>managed-futures trends persist</strong> across rates, FX, or commodities, adding a layer of diversified alpha on top of the core fixed-income allocation rather than replacing it.',
      'Underperforms when <strong>fast mean-reversion</strong> repeatedly stops out trend signals while bond markets trade sideways or decline, collapsing the contribution from both sleeves simultaneously and leaving financing costs unearned.',
    ],
    officialUrl: 'https://www.returnstackedetfs.com/rsbt-return-stacked-bonds-managed-futures/',
    officialLabel: 'Return Stacked ETFs (RSBT)',
  },

  rsst: {
    yahooSymbol: 'RSST',
    hubCategoryId: 'return-stacked-ge-2x',
    badge: 'Return Stacked - 2x',
    h1Title: 'RSST — Return Stacked U.S. Stocks & Managed Futures ETF',
    displayTicker: 'RSST',
    issuer: 'Tidal / Return Stacked ETFs',
    inception: 'Sep 5, 2023',
    addedToSite: '2026-04-17',
    structure: 'Return-stacked US equity + managed futures',
    capitalBucketExposurePct: 100,
    alphaBucketExposurePct: 100,
    mer: '1.04%',
    aum: '~$340M',
    pageTitle: 'RSST ETF — Alpha Stacking',
    description: 'Return Stacked U.S. Stocks & Managed Futures ETF (RSST).',
    contentFormat: 'html',
    lede:
      'RSST targets roughly dollar-for-dollar large-cap U.S. equity alongside a systematic managed-futures sleeve—return stacking in a single ticker.',
    strategyParas: [
      'RSST holds roughly a dollar of U.S. large-cap equity and a dollar of systematic managed-futures exposure per dollar invested: futures, swaps, and cash collateral bring both sleeves to the same capital before fees and roll costs.',
      'The CTA sleeve trend-follows across rates, FX, and commodities. When equity and trend signals disagree, the real question is whether trends are big enough to offset the financing and roll costs that come with leveraged futures.',
    ],
    pedigreeParas: TIDAL_RETURN_STACKED_PEDIGREE_PARAS,
    outperfParas: [
      'Outperforms when equities grind higher while managed futures harvest <strong>directional trends</strong> elsewhere, rates breaking one way, dollar trends, or commodity curves, so the second sleeve diversifies equity path risk instead of doubling it.',
      'Underperforms in <strong>fast mean-reversion</strong> or liquidity shocks that invert signals. Favorable: <strong>growth</strong> environment (persistent macro trends across rates, FX, and commodities with orderly futures markets). Hostile: choppy tape where equity and futures signals reverse together.',
    ],
    officialUrl:
      'https://www.returnstackedetfs.com/rsst-return-stacked-us-stocks-managed-futures/',
    officialLabel: 'Return Stacked ETFs (RSST)',
  },

  rsit: {
    yahooSymbol: 'RSIT',
    hubCategoryId: 'return-stacked-ge-2x',
    badge: 'Return Stacked - 2x',
    h1Title: 'RSIT — Return Stacked International Stocks & Managed Futures ETF',
    displayTicker: 'RSIT',
    issuer: 'Tidal / Return Stacked ETFs',
    inception: 'May 5, 2026',
    addedToSite: '2026-05-20',
    structure: 'Return-stacked international equity + managed futures',
    capitalBucketExposurePct: 100,
    alphaBucketExposurePct: 100,
    mer: '0.98%',
    aum: '~$16M',
    pageTitle: 'RSIT ETF — Alpha Stacking',
    description: 'Return Stacked International Stocks & Managed Futures ETF (RSIT).',
    contentFormat: 'html',
    lede:
      'RSIT targets roughly dollar-for-dollar large-cap international equity alongside a systematic managed-futures sleeve, extending the Return Stacked® approach beyond U.S. large caps.',
    strategyParas: [
      'The equity sleeve is implemented primarily through SPDW (SPDR Portfolio Developed World ex-US ETF) plus international equity index futures. The managed-futures sleeve uses a blended replication approach: 30% top-down regression matching against leading CTA funds, 70% bottom-up time-series momentum and breakout signals across equities, rates, FX, and commodities.',
      'For each dollar invested RSIT targets roughly one dollar of international equity notional and one dollar of managed-futures notional. Daily rebalancing keeps both sleeves near target, but futures gains and losses may realize gains frequently, creating an above-average distribution burden relative to equity-only wrappers.',
    ],
    pedigreeParas: TIDAL_RETURN_STACKED_PEDIGREE_PARAS,
    outperfParas: [
      'Outperforms when international equities lead a sustained re-rating, such as EAFE/EM catch-up windows, while <strong>managed-futures trends persist</strong> across rates, FX, and commodities, delivering non-correlated return on top of equity participation.',
      'Underperforms when <strong>fast mean-reversion</strong> repeatedly stops out trend signals and international equity performance lags U.S. benchmarks simultaneously, combining a weaker equity sleeve with a whipsawing overlay.',
    ],
    officialUrl: 'https://www.returnstackedetfs.com/rsit/',
    officialLabel: 'Return Stacked ETFs (RSIT)',
  },

  ctap: {
    yahooSymbol: 'CTAP',
    hubCategoryId: 'return-stacked-ge-2x',
    badge: 'Return Stacked - 2x',
    h1Title: 'CTAP — Simplify US Equity PLUS Managed Futures Strategy ETF',
    displayTicker: 'CTAP',
    issuer: 'Simplify Asset Management',
    inception: 'Dec 8, 2025',
    addedToSite: '2026-05-05',
    structure: 'Return-stacked US equity + managed futures',
    capitalBucketExposurePct: 100,
    alphaBucketExposurePct: 100,
    mer: '~0.95%',
    aum: '~$167M',
    pageTitle: 'CTAP ETF — Alpha Stacking',
    description: 'Simplify US Equity PLUS Managed Futures Strategy ETF (CTAP).',
    contentFormat: 'html',
    lede:
      'CTAP layers roughly dollar-for-dollar U.S. large-cap equity and systematic managed-futures exposure in one capital-efficient ETF wrapper.',
    strategyParas: [
      'The equity sleeve is implemented through large-cap U.S. stocks, ETFs, and index futures. The alpha sleeve is effectively a full managed-futures (CTA) sleeve, primarily via swaps linked to Simplify’s CTA strategy across rates, FX, equities, and commodities.',
      'For each dollar invested, the fund targets about one dollar of equity exposure plus one dollar of managed-futures exposure. Reported net/gross expense ratios are fund-level; they do not fully capture all embedded derivative and CTA implementation drag.',
    ],
    pedigreeParas: ped(
      `Simplify is a derivatives-focused ETF sponsor that packages institutional-style overlays inside listed wrappers with daily liquidity and transparent disclosures.`,
      `CTAP extends Simplify’s “PLUS” lineup by combining a broad U.S. equity core with the firm’s managed-futures toolkit, aiming for portfolio-level diversification without reducing core equity notional.`,
    ),
    outperfParas: [
      'Outperforms when U.S. equities participate and managed-futures trends are persistent enough to add non-correlated return, especially in macro tapes with directional moves across rates, commodities, and currencies.',
      'Underperforms in fast mean-reversion and correlation spikes where trend models repeatedly reverse, because the overlay can lag while still carrying financing and implementation drag.',
    ],
    officialUrl: 'https://www.simplify.us/etfs/ctap-simplify-us-equity-plus-managed-futures-strategy-etf',
    officialLabel: 'Simplify (CTAP)',
    efficiency: {
      capital: {
        tooltip: capitalEfficiencyTooltip(
          'CTAP targets roughly 100% U.S. large-cap equity exposure as the capital sleeve. The grade scores that equity component versus SPY under the site framework.'
        ),
      },
      alpha: {
        tooltip: alphaEfficiencyStackedTooltip(
          'The second sleeve is a systematic managed-futures program implemented through swaps/futures. The alpha grade scores whether that overlay clears hurdle versus costs.'
        ),
      },
    },
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
    addedToSite: '2026-04-17',
    structure: 'Capital-efficient US + international equity',
    mer: '0.35%',
    aum: '~$420M',
    pageTitle: 'NTSD ETF — Alpha Stacking',
    description: 'WisdomTree Efficient U.S. Plus International Equity Fund (NTSD).',
    contentFormat: 'html',
    lede:
      'NTSD is a capital-efficient 90/60-style sleeve: U.S. large-cap equities plus developed international equity exposure via futures and related instruments.',
    strategyParas: [
      'WisdomTree’s “efficient” line uses futures and swaps to add developed international beta on top of a U.S. equity sleeve without doubling cash equity. The notional targets shift as roll conditions and markets change.',
      'Roll yield on international equity index futures can diverge from owning local shares for years at a time. Comparing realized performance against a 50/50 VTI/VEA split shows where implementation adds or subtracts.',
    ],
    pedigreeParas: WISDOMTREE_PEDIGREE_PARAS,
    outperfParas: [
      'Outperforms when EAFE-style markets rerate faster than U.S. large caps while futures implementation stays cheap, the classic <strong>“international catches up”</strong> window with orderly currency markets.',
      'Underperforms when <strong>the dollar rips and international disappoints</strong>, and futures sit in contango simultaneously; this is still equity risk stacked across regions, not a hedge fund, favorable environments are broad non-U.S. leadership, not every U.S. drawdown.',
    ],
    officialUrl:
      'https://www.wisdomtree.com/investments/etfs/capital-efficient/ntsd',
    officialLabel: 'WisdomTree (NTSD)',
    efficiency: {
      capital: {
        tooltip: insufficientHistoryTooltip(NTSD_CAPITAL_SLEEVE_P2),
        gradedTooltipOverride: capitalEfficiencyTooltip(NTSD_CAPITAL_SLEEVE_P2),
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
    addedToSite: '2026-04-17',
    structure: 'Capital-efficient US equity + gold',
    capitalBucketExposurePct: 80,
    alphaBucketExposurePct: 80,
    mer: '0.20%',
    aum: '~$950M',
    pageTitle: 'GDE ETF — Alpha Stacking',
    description: 'WisdomTree Efficient Gold Plus Equity Strategy Fund (GDE).',
    contentFormat: 'html',
    lede:
      'GDE pairs large-cap U.S. equity exposure with a layered gold futures overlay—capital-efficient exposure to both stocks and gold.',
    strategyParas: [
      'GDE is a barbell: U.S. large-cap equity for growth and carry, gold futures for convexity in real-rate shocks and geopolitical stress. WisdomTree’s methodology documents define how much notional gold sits per dollar of equity.',
      'Gold futures carry (contango/backwardation) and equity margin can interact in stress. If one leg gaps while the other is closed, NAV rebalancing can create short-term tracking noise.',
    ],
    pedigreeParas: WISDOMTREE_PEDIGREE_PARAS,
    outperfParas: [
      'Outperforms when equities trend but investors want <strong>insurance against real-rate spikes</strong>: gold often pays on the margin in the <strong>inflation</strong> environment, when the Fed is perceived as behind the curve or geopolitical risk reprices safe havens.',
      'Underperforms when <strong>real yields rise</strong> and risk appetite stays firm: gold grinds lower in those windows, and stacking doesn\'t create diversification where none exists. Favorable: <strong>inflation</strong> environment (real yields falling or geopolitical safe-haven demand). Hostile: real yields rising with firm risk appetite.',
    ],
    officialUrl:
      'https://www.wisdomtree.com/investments/etfs/capital-efficient/gde',
    officialLabel: 'WisdomTree (GDE)',
  },

  wdig: {
    yahooSymbol: 'WDIG',
    hubCategoryId: 'return-stacked-lt-2x',
    badge: 'Return Stacked - Lower Leverage',
    h1Title: 'WDIG — WisdomTree Efficient Rare Earth Plus Strategic Metals Fund',
    displayTicker: 'WDIG',
    issuer: 'WisdomTree',
    inception: 'May 7, 2026',
    addedToSite: '2026-05-20',
    structure: 'Rare earth and strategic metals miners + base-metals futures',
    capitalBucketExposurePct: 90,
    alphaBucketExposurePct: 90,
    mer: '0.55%',
    aum: '—',
    pageTitle: 'WDIG ETF — Alpha Stacking',
    description: 'WisdomTree Efficient Rare Earth Plus Strategic Metals Fund (WDIG).',
    contentFormat: 'html',
    lede:
      '<strong>WDIG</strong> pairs equity in rare earth and strategic metals miners with a base-metals futures overlay, targeting capital-efficient exposure across the critical-minerals supply chain.',
    strategyParas: [
      'The equity sleeve holds mining companies across market caps focused on rare earth elements and strategic metals including lithium, cobalt, copper, nickel, zinc, and related industrial materials. The futures sleeve overlays CME/LME-listed contracts across aluminum, cobalt, copper, lead, lithium, nickel, platinum, silver, tin, and zinc, implemented through a Cayman subsidiary.',
      'WisdomTree runs the portfolio with proprietary research, co-managed with Mellon Investments Corporation. Because the futures leg introduces leverage on top of already-cyclical mining equities, sleeve interactions matter: both sides can sell together in broad risk-off tapes while diverging sharply when futures curves price structural supply constraints differently from equity sentiment.',
    ],
    pedigreeParas: WISDOMTREE_PEDIGREE_PARAS,
    outperfParas: [
      'Outperforms when the <strong>green-energy transition</strong> and industrial demand drive sustained rallies in base and rare earth metals, with miners re-rating on higher realized prices while futures curves stay in backwardation and provide positive roll yield.',
      'Underperforms when <strong>risk-off rotation hits cyclicals</strong> broadly, compressing miners independently of metals spot moves, or when futures contango erodes roll yield while equity sentiment is already cautious on China demand.',
    ],
    officialUrl: 'https://www.wisdomtree.com/investments/etfs/capital-efficient/wdig',
    officialLabel: 'WisdomTree (WDIG)',
  },

  gdmn: {
    yahooSymbol: 'GDMN',
    hubCategoryId: 'return-stacked-lt-2x',
    badge: 'Return Stacked - Lower Leverage',
    h1Title: 'GDMN — WisdomTree Efficient Gold Plus Gold Miners Strategy Fund',
    displayTicker: 'GDMN',
    issuer: 'WisdomTree',
    inception: 'Dec 16, 2021',
    addedToSite: '2026-04-25',
    structure: 'Gold miners + gold futures stack',
    capitalBucketExposurePct: 90,
    alphaBucketExposurePct: 90,
    mer: '0.45%',
    aum: '~$232M',
    pageTitle: 'GDMN ETF — Alpha Stacking',
    description: 'WisdomTree Efficient Gold Plus Gold Miners Strategy Fund (GDMN).',
    contentFormat: 'html',
    lede:
      'GDMN stacks global gold miners equity exposure with a leveraged gold-futures sleeve to target a higher-conviction precious-metals expression in one ETF wrapper.',
    strategyParas: [
      'GDMN holds two sleeves: equity in gold mining companies plus U.S.-listed gold futures collateralized with Treasury and cash instruments. The futures leg introduces leverage and can amplify both upside and downside versus a miners-only allocation.',
      'The key implementation drivers are futures curve shape, collateral yield, and miners-equity sensitivity to operational/geographic shocks. In stress, miners can trade like cyclical equities while gold futures respond more directly to real rates and dollar moves—so sleeve interaction matters more than headline metals direction.',
    ],
    pedigreeParas: WISDOMTREE_PEDIGREE_PARAS,
    outperfParas: [
      'Outperforms when <strong>gold and miners rally together</strong>: typically in falling-real-yield or policy-uncertainty environments where bullion strength feeds earnings leverage in miners. In those windows, the futures sleeve can add convex upside to equity participation.',
      'Underperforms in rising <strong>real yields</strong>, stronger dollar trends, or equity-led selloffs where <strong>miners de-rate faster than bullion</strong>.',
    ],
    officialUrl: 'https://www.wisdomtree.com/investments/etfs/capital-efficient/gdmn',
    officialLabel: 'WisdomTree (GDMN)',
  },

  foxy: {
    yahooSymbol: 'FOXY',
    hubCategoryId: 'premia-systematic-alternatives',
    badge: 'Premia and systematic alternatives',
    h1Title: 'FOXY — Simplify Currency Strategy ETF',
    displayTicker: 'FOXY',
    issuer: 'Simplify Asset Management',
    inception: 'Feb 3, 2025',
    addedToSite: '2026-05-23',
    structure: 'Systematic currency: EM carry + G10 mean reversion',
    mer: '0.81%',
    aum: '~$314M',
    pageTitle: 'FOXY ETF — Alpha Stacking',
    description: 'Simplify Currency Strategy ETF (FOXY): systematic EM carry and G10 mean-reversion strategy via currency forwards and futures.',
    contentFormat: 'html',
    lede: 'FOXY harvests two systematic currency return premia in one actively managed wrapper: a <strong>long/short emerging market carry trade</strong> (long high-yield EM currencies, short low-yield) and a <strong>G10 mean-reversion strategy</strong> (developed-market currencies faded at historical extremes), implemented via forwards and futures over a T-bill collateral base.',
    strategyParas: [
      'The EM sleeve runs a carry trade across eight currency pairs vs USD: Simplify goes long the four with the highest yield differentials and shorts the four with the lowest, sizing each position by realized volatility to limit single-currency concentration risk. The G10 sleeve takes mean-reversion positions across ten developed-market currencies (AUD, CAD, EUR, JPY, NZD, NOK, GBP, SEK, CHF, USD), fading extended deviations from historical norms with technical signals rather than macro forecasts. T-bills and money market instruments (~74% of NAV) serve as collateral and add short-duration carry on the cash book.',
      'The two-engine design targets genuine decorrelation from equities and bonds. EM carry earns its premium in risk-on, stable-rate environments; G10 mean reversion is more environment-agnostic, engaging when developed currencies push to historically extreme levels. Portfolio leverage is calibrated by volatility metrics applied at the position, sleeve, and portfolio level, which compresses notional in dislocated tape.',
    ],
    pedigreeParas: ped(
      `FOXY is managed by the Simplify Asset Management investment team: David Berns, PhD (CIO) and Ken Miller (Portfolio Manager) co-managed the fund from its February 2025 launch; Chris Getter (Emerging Markets Strategist) was added in October 2025 to deepen the EM currency capability. Simplify manages approximately $6.1B in ETF assets, built primarily on derivatives-centric structures across volatility, convexity, and systematic strategies.`,
      `The EM carry trade is one of the most documented return premia in institutional FX literature, with decades of evidence across macro hedge funds and systematic currency programs. FOXY's contribution is packaging it alongside G10 mean reversion in a no-K-1 listed wrapper accessible to RIA and retail portfolios that have historically lacked a clean standalone currency vehicle.`,
    ),
    outperfParas: [
      'Outperforms when EM interest rate differentials are <strong>wide and stable</strong>: the carry trade captures the rate spread in calm risk-on environments, and G10 currencies revert from trend-extended levels without sudden macro gaps.',
      'Underperforms when a <strong>dollar flight-to-quality spike compresses EM simultaneously</strong>: carry crashes tend to be sudden and asymmetric, with high-yield EM pairs gapping lower together in global deleveraging; the G10 mean-reversion sleeve may partially offset if developed-market trends also reverse, but both engines can correlate in a synchronized risk-off episode.',
    ],
    officialUrl: 'https://www.simplify.us/etfs/foxy-simplify-currency-strategy-etf',
    officialLabel: 'Simplify Asset Management (FOXY)',
  },

  flsp: {
    yahooSymbol: 'FLSP',
    hubCategoryId: 'premia-systematic-alternatives',
    badge: 'Premia and systematic alternatives',
    h1Title: 'FLSP — Franklin Systematic Style Premia ETF',
    displayTicker: 'FLSP',
    issuer: 'Franklin Templeton',
    inception: 'Dec 18, 2019',
    addedToSite: '2026-04-17',
    structure: 'Systematic style-premia alternatives',
    mer: '0.65%',
    aum: '~$55M',
    pageTitle: 'FLSP ETF — Alpha Stacking',
    description: 'Franklin Systematic Style Premia ETF (FLSP).',
    contentFormat: 'html',
    lede:
      'FLSP is an actively managed alternatives-leaning ETF targeting style premia and multi-asset long/short sleeves with an absolute-return posture.',
    strategyParas: [
      'FLSP is a systematic multi-sleeve book: signals tied to style premia (value, momentum, carry analogues) implemented with futures, swaps, and long/short equity. Gross exposure and leverage can vary materially quarter to quarter.',
      'Because sleeves rebalance with model output, headline beta can look nothing like the S&P 500 even when equities are inside the portfolio. Shareholder reports show the current net and factor tilts.',
    ],
    pedigreeParas: ped(
      `Franklin Templeton is a top-tier global active manager with deep quant and multi-asset benches; FLSP sits inside that ecosystem rather than a garage-shop factor ETF. Operational risk and compliance depth match a multi-sleeve systematic strategy at this complexity.`,
      `Franklin Resources reported preliminary group AUM of about $1.68 trillion at Dec. 31, 2025—scale that matters for prime brokerage relationships and swap line capacity, even if FLSP itself is a satellite sleeve on the balance sheet.`,
    ),
    outperfParas: [
      'Outperforms when <strong>style and cross-asset spreads are wide</strong> that systematic long/short books earn after transaction costs, think post-shock mean reversion, leadership handoffs between growth and value, or rates markets that trend instead of chop.',
      'Underperforms when <strong>factors whipsaw</strong> and financing tightens. favorable environments are dispersion-rich, not low-vol grind higher where every sleeve pays a vig to stay hedged.',
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
    addedToSite: '2026-04-17',
    structure: 'Multi-strategy systematic alternatives',
    mer: '~0.99%',
    aum: '~$110M',
    pageTitle: 'IALT ETF — Alpha Stacking',
    description: 'iShares Systematic Alternatives Active ETF (IALT).',
    contentFormat: 'html',
    lede:
      'IALT is BlackRock’s actively managed multi-strategy systematic alternatives ETF—built to rotate risk across market-neutral, strategic-premia, and dynamic macro sleeves rather than loading a single equity factor.',
    strategyParas: [
      'IALT runs three sleeves: a market-neutral book (relative positions across single names), a strategic-premia book (relative value across countries and asset classes tied to valuation, sentiment, growth, and inflation signals), and a dynamic macro book that can take directional equity and credit risk when models favor it.',
      'The fund uses swaps, futures, options, and forwards across global equities, rates, credit, and commodities. Sleeves rebalance with model output, so headline exposures can look different quarter to quarter.',
    ],
    pedigreeParas: ped(
      `BlackRock Fund Advisors serves as investment adviser; the listed portfolio managers sit with BlackRock’s Systematic Investing franchise—the same global quant organization that runs large institutional systematic books. BlackRock, Inc. reported about $14.0 trillion in total assets under management at Dec. 31, 2025 (annual filing / earnings), providing infrastructure, data, and compliance depth behind the ETF wrapper.`,
      `iShares is BlackRock’s retail ETF brand. IALT is a newer sleeve with a short live track record compared to flagship beta funds.`
    ),
    outperfParas: [
      'Outperforms when <strong>security-level dispersion</strong>, cross-country valuation gaps, or macro inflection points matter more than owning a static 60/40 mix, market-neutral books can earn when pair trades work, strategic premia can monetize macro tilts, and the dynamic macro sleeve can add convexity when trends break.',
      'Underperforms when <strong>every sleeve faces hostile conditions at once</strong>: tight liquidity, correlated selloffs, or sharp reversals that whipsaw models), multi-strategy fees and implementation drag show up quickly, favorable environments are those where at least one pillar is clearly “open for business,” not when all markets grind in sync.',
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
    addedToSite: '2026-04-17',
    structure: 'Tail-risk options',
    mer: '0.63%',
    aum: '~$42M',
    pageTitle: 'CAOS ETF — Alpha Stacking',
    description: 'Alpha Architect Tail Risk ETF (CAOS).',
    contentFormat: 'html',
    lede:
      'CAOS uses S&P 500-linked option structures to express convexity and tail hedging alongside or instead of plain equity beta.',
    strategyParas: [
      'CAOS is not a passive put ladder. Alpha Architect uses rules-based S&P 500-linked options (puts, spreads, or combinations) with explicit budgets for premium spend and roll cadence.',
      'Theta bleed is the product: you are renting crash convexity. If implied volatility collapses after you buy protection, NAV can fall even when stocks are flat—size the sleeve as insurance, not core beta.',
    ],
    pedigreeParas: ped(
      `Alpha Architect built its brand publishing factor research and transparent rules before launching ETFs; CAOS inherits that culture—prospectus language tends to be precise about what is systematic versus manager discretion in vol environments.`,
      `Firm AUM is boutique versus BlackRock, but the sponsor’s audience is advisor-quant literate—expect frequent methodology blogs and updates when option markets environment-shift, which matters more for tail products than for vanilla indexers.`,
    ),
    outperfParas: [
      'Outperforms when realized volatility and gap risk exceed what option prices implied: sharp drawdowns, correlation spikes, or liquidity events where <strong>convexity pays multiples</strong> of the carry burned in calm quarters.',
      'Underperforms in <strong>grind-higher, low-vol bull markets</strong> and can lose fast if you buy protection into a vol spike that mean-reverts; favorable tape is episodic stress, not buy-and-hold compounding.',
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
    addedToSite: '2026-04-22',
    structure: '2x daily S&P 500 leverage',
    mer: '0.89%',
    aum: '~$7.5B',
    pageTitle: 'SSO ETF — Alpha Stacking',
    description: 'ProShares Ultra S&P500 (SSO): 2× daily S&P 500 leverage. How it works, when it earns, and how to size it as an equity sleeve in an alpha stacking portfolio.',
    contentFormat: 'html',
    lede:
      'SSO delivers 2× the daily return of the S&P 500, reset at the close of each session.',
    strategyParas: [
      `SSO resets its leverage daily — each day's target is 2× the S&P 500's return for that day. That means the longer you hold it, the more its returns depend on the path the market takes, not just the start and end points. A market that grinds up steadily lets daily compounding work in your favor; a market that whipsaws — down 3%, up 3%, down 3% — bleeds the position even if it ends flat.`,
      'This is not a flaw in the fund; it is the mathematical property of daily-reset leverage. The implication for portfolio construction is that SSO works best as a deliberate equity sleeve in a multi-sleeve portfolio, sized so the overall portfolio beta stays near 1.0, with other sleeves to pick up the slack in choppy or declining markets.',
    ],
    pedigreeParas: PROSHARES_PEDIGREE_PARAS,
    outperfParas: [
      'Outperforms in sustained equity uptrends with relatively calm day-to-day moves, the kind of environment where the S&P 500 is trending higher over weeks and months without big reversals. Daily compounding works in your favor when <strong>volatility is low and direction is clear</strong>.',
      'Underperforms in <strong>choppy, directionless markets</strong> and takes outsized damage in sharp sell-offs, since losses compound the same way gains do. As an equity sleeve in an alpha stacking portfolio, SSO requires other sleeves to earn while equity is pausing or declining.',
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
    addedToSite: '2026-04-22',
    structure: '3x daily S&P 500 leverage',
    mer: '0.91%',
    aum: '~$5.0B',
    pageTitle: 'UPRO ETF — Alpha Stacking',
    description: 'ProShares UltraPro S&P500 (UPRO): 3x daily S&P 500 leverage.',
    contentFormat: 'html',
    lede:
      'UPRO targets three times the daily return of the S&P 500, before fees and expenses, using listed derivatives and collateral management.',
    strategyParas: [
      'UPRO is a high-octane daily reset vehicle: it seeks ~3x of each day’s S&P 500 move, then rebalances notional for the next session. Over multi-day windows, realized outcomes depend heavily on volatility and sequence of returns.',
      'This structure is generally used for tactical views or explicitly risk-managed overlays. In sustained trends, compounding can amplify returns; in volatile two-way markets, volatility drag can materially erode performance versus simple 3x intuition.',
    ],
    pedigreeParas: PROSHARES_PEDIGREE_PARAS,
    outperfParas: [
      'Outperforms in <strong>persistent broad-equity bull runs</strong> where index breadth and earnings momentum keep S&P trend strength intact for extended periods.',
      'Underperforms in repeated sharp reversals and <strong>panic deleveraging</strong>, where daily-reset convexity works against holders.',
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
    addedToSite: '2026-04-22',
    structure: '2x daily Nasdaq-100 leverage',
    mer: '0.95%',
    aum: '~$9.0B',
    pageTitle: 'QLD ETF — Alpha Stacking',
    description: 'ProShares Ultra QQQ (QLD): 2x daily Nasdaq-100 leverage.',
    contentFormat: 'html',
    lede:
      'QLD delivers 2× the daily return of the Nasdaq-100, reset at the close of each session.',
    strategyParas: [
      'QLD gives levered access to Nasdaq-100 beta with a daily reset, typically implemented through index swaps and futures rather than cash stock replication. That makes path and volatility just as important as directional conviction.',
      'Because the underlying index is growth and tech heavy, macro rate shifts and valuation compression can produce larger swings than broad-market leverage funds. Position sizing and rebalance discipline matter more than simple long-only assumptions.',
    ],
    pedigreeParas: PROSHARES_PEDIGREE_PARAS,
    outperfParas: [
      'Outperforms when <strong>mega-cap growth leadership is persistent</strong> and the Nasdaq-100 trend is strong with relatively contained realized volatility.',
      'Underperforms in <strong>violent factor rotations</strong> and whipsaw rate shocks are usually adverse for daily-reset leveraged Nasdaq exposure.',
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
    addedToSite: '2026-04-22',
    structure: '3x daily Nasdaq-100 leverage',
    mer: '0.86%',
    aum: '~$23B',
    pageTitle: 'TQQQ ETF — Alpha Stacking',
    description: 'ProShares UltraPro QQQ (TQQQ): 3x daily Nasdaq-100 leverage.',
    contentFormat: 'html',
    lede:
      'TQQQ targets three times the daily return of the Nasdaq-100 Index, before fees and expenses, via derivative exposure and daily rebalancing.',
    strategyParas: [
      'TQQQ is one of the highest-beta mainstream index ETFs: it resets to ~3x Nasdaq-100 exposure each day, so compounding dominates medium-horizon outcomes. Trend helps; chop and volatility drag hurt.',
      'It is generally used as a tactical expression on growth leadership, not a passive core allocation. Funding costs, derivative execution, and index concentration all matter when volatility rises.',
    ],
    pedigreeParas: PROSHARES_PEDIGREE_PARAS,
    outperfParas: [
      'Outperforms dramatically in <strong>sustained Nasdaq uptrends</strong> where breadth and earnings revisions keep growth leadership intact over long stretches.',
      'Underperforms in <strong>sudden style reversals</strong> and liquidity shocks, the primary failure mode for 3x daily exposure.',
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
    addedToSite: '2026-04-17',
    structure: 'US large-cap momentum factor',
    mer: '0.13%',
    aum: '~$13B',
    pageTitle: 'SPMO ETF — Alpha Stacking',
    description: 'Invesco S&P 500 Momentum ETF (SPMO): large-cap U.S. momentum factor.',
    contentFormat: 'html',
    lede:
      'SPMO tracks the S&P 500 Momentum Index—large-cap U.S. names with stronger risk-adjusted momentum scores, rebalanced on a published rules schedule.',
    strategyParas: [
      'S&P’s momentum index ranks S&P 500 constituents on risk-adjusted price strength over a defined lookback, then rebalances semiannually—so you inherit concentrated winners (often mega-cap growth) until the next rebalance forces turnover.',
      'Momentum crashes happen when leadership flips between rebalances. S&P Dow Jones methodology includes volatility scaling and buffer rules that damp (but do not eliminate) whipsaw.',
    ],
    pedigreeParas: ped(
      `Invesco is a top-five ETF issuer by listed assets with deep capital markets and securities lending infrastructure; SPMO benefits from tight tracking and liquidity in a crowded factor category.`,
      `Invesco Ltd. reported preliminary AUM of about $2.17 trillion at Dec. 31, 2025—scale that supports tight spreads on a $13B sleeve even when momentum names are the most crowded trades in the market.`,
    ),
    outperfParas: [
      'Outperforms when <strong>trends persist longer than expected</strong>: AI capex cycles, narrow leadership, or sector rotations where winners keep winning into the next rebalance.',
      'Underperforms in <strong>sharp factor reversals</strong> (growth to value handoffs) and after parabolic moves that mean-revert between index rebalances; favorable tape is trending, orderly liquidity, not every risk-on rip.',
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
    addedToSite: '2026-04-17',
    structure: 'US free-cash-flow factor',
    mer: '0.44%',
    aum: '~$6B',
    pageTitle: 'VFLO ETF — Alpha Stacking',
    description: 'VictoryShares Free Cash Flow ETF (VFLO): large-cap cash-cows / FCF sleeve.',
    contentFormat: 'html',
    lede:
      'VFLO targets large-cap U.S. names with attractive free-cash-flow yield versus a broad large/mid benchmark—a “cash cows” equity factor sleeve.',
    strategyParas: [
      'Victory’s index sorts the eligible universe for free-cash-flow yield and related quality screens, then weights toward names that convert accounting earnings into distributable cash—expect persistent tilts to cash-rich sectors (tech platforms with ads, healthcare cash machines, selective industrials) versus asset-heavy cyclicals.',
      'FCF yield is backward-looking: commodity or consumer cycles can flip cash conversion faster than annual statements. Comparing VFLO to profitability-focused indexes shows where capex timing changes the picture.',
    ],
    pedigreeParas: ped(
      `Victory Capital runs multi-affiliate equity boutiques under one listed holding company; VictoryShares benefits from shared index governance and capital markets coverage while the FCF methodology is Victory’s proprietary ruleset.`,
      `With about $314 billion in total client assets at year-end 2025, Victory has institutional-grade operations for a $6B factor sleeve—meaningful scale for creation/redemption even when value/cash-flow factors fall out of favor.`,
    ),
    outperfParas: [
      'Outperforms when investors pay up for <strong>balance-sheet quality</strong> and punish levered story stocks, late cycle, credit tightening, or macro ranges where <strong>cash deployment</strong> (buybacks, dividends, M&A) drives returns.',
      'Underperforms in <strong>speculative rallies</strong> where multiples expand on thin cash flows; favorable tape is fundamentals-first leadership, not meme liquidity.',
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
    addedToSite: '2026-04-17',
    structure: 'US small-cap value factor',
    mer: '0.25%',
    aum: '~$24B',
    pageTitle: 'AVUV ETF — Alpha Stacking',
    description: 'Avantis U.S. Small Cap Value ETF (AVUV).',
    contentFormat: 'html',
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
      'Outperforms when <strong>profitability spreads widen</strong> and investors rotate out of mega-cap concentration, classic “catch-up” trades after large-cap growth derates.',
      'Underperforms in liquidity-driven rallies where <strong>unprofitable small caps squeeze higher</strong>, or when credit markets seize; favorable tape is improving fundamentals with orderly funding markets, not every Fed pivot.',
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
    addedToSite: '2026-04-18',
    structure: 'Concentrated active US value',
    mer: '0.75%',
    aum: '~$70M',
    pageTitle: 'SASS ETF — Alpha Stacking',
    description: 'M.D. Sass Concentrated Value ETF (SASS): active concentrated U.S. value.',
    contentFormat: 'html',
    lede:
      'SASS is M.D. Sass’s concentrated U.S. value sleeve—a high-conviction book of about 20–25 large and mid-cap names sourced from Russell 1000/3000 Value, emphasizing misunderstood or out-of-favor situations.',
    strategyParas: [
      'SASS is stock-picking, not factor beta: the team hunts corporate events, sum-of-the-parts discounts, and balance-sheet repair stories inside a tight 20–25 name sleeve—position sizes and overlap with passive value ETFs will be low.',
      'As a young, concentrated ETF, bid/ask spreads and premium/discount to NAV can widen during stress. Monthly holdings downloads are the most current picture of positioning.',
    ],
    pedigreeParas: ped(
      `M.D. Sass has operated as an independent New York value shop for decades—culture is Graham-and-Dodd security analysis with institutional client roots rather than ETF-first marketing.`,
      `Regulatory AUM is mid-market versus mega complexes; that keeps incentives aligned with concentrated performance but means operational resources are leaner—verify Form ADV for personnel and assets before allocating meaningful capital.`,
    ),
    outperfParas: [
      'Outperforms when <strong>catalysts reprice misunderstood franchises</strong>: spin-offs close, capital returns accelerate, or complex structures simplify while fundamentals stay intact.',
      'Underperforms when one <strong>broken thesis</strong> can swamp a quarter; favorable tape is high dispersion value with functioning credit markets, not passive factor drift.',
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
    addedToSite: '2026-04-17',
    structure: 'Systematic managed-futures',
    mer: '0.75%',
    aum: '~$150M',
    pageTitle: 'CTA ETF — Alpha Stacking',
    description: 'Simplify Managed Futures Strategy ETF (CTA).',
    contentFormat: 'html',
    lede:
      'CTA delivers a systematic managed-futures sleeve (Altis models) across equities, rates, commodities, and FX—low correlation to equity beta.',
    strategyParas: [
      'Simplify licenses Altis Partners’ systematic managed-futures signals. The sleeve can be long or short futures across asset classes with volatility-aware sizing.',
      'Because exposure is model-driven, headline beta can flip sign quarter to quarter. Comparing CTA to equity index correlation over full cycles gives a more useful picture than one trending macro year.',
    ],
    pedigreeParas: ped(
      `Simplify built its brand on convexity and hedged equity ETFs before expanding into pure CTA sleeves; the firm markets complexity with unusually clear options diagrams—CTA inherits that education-first distribution style.`,
      `Simplify’s complex is commonly quoted in the mid-single-digit billions USD—large enough for serious prime brokerage relationships but still nimble versus integrated banks.`,
    ),
    outperfParas: [
      'Outperforms when <strong>macro variables persist</strong>: directional rates, sustained dollar moves, or commodity curves that trend long enough for models to load size.',
      'Underperforms in <strong>choppy, range-bound markets</strong> and after sharp reversals that stop out trends; favorable tape is macro persistence with liquid futures, not every equity correction.',
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
    addedToSite: '2026-04-17',
    structure: 'Managed-futures replication',
    mer: '0.85%',
    aum: '~$1.1B',
    pageTitle: 'DBMF ETF — Alpha Stacking',
    description: 'iMGP DBi Managed Futures Strategy ETF (DBMF): CTA replication via listed futures. How it works, what tape it earns in, and its role in an alpha stacking portfolio.',
    contentFormat: 'html',
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
      'Outperforms in <strong>sustained, directional macro moves</strong> (rising rates, falling equities in a clear bear market, a persistent dollar trend) where the large CTA funds are clearly positioned and the trends last long enough for DBMF to track them. 2022 is the benchmark case: equity and bond markets both trended sharply, managed futures earned across the board, and DBMF captured most of that.',
      'Underperforms in <strong>choppy, range-bound markets</strong> where price moves reverse quickly before trends can develop. It also gives back gains when an established trend reverses sharply. Managed futures are trend-followers, not trend-predictors; they exit after the trend has broken. In a sideways equity market where nothing is trending, this sleeve is likely flat-to-negative.',
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
    addedToSite: '2026-04-17',
    structure: 'Rules-based managed-futures trend',
    mer: '~0.90%',
    aum: '~$400M',
    pageTitle: 'KMLM ETF — Alpha Stacking',
    description: 'KraneShares Mount Lucas Managed Futures Index Strategy ETF (KMLM).',
    contentFormat: 'html',
    lede:
      'KMLM tracks the KFA MLM Index—a Mount Lucas–designed, rules-based trend program implemented with liquid futures across commodities, currencies, and global bonds (with materially less reliance on equity index futures than many equity-heavy CTAs).',
    strategyParas: [
      'KMLM tracks roughly two dozen futures markets across three sleeves: commodities, currencies, and global bonds. Volatility-aware weights and equal-risk contributions set the sizing. Signals are time-series momentum, so the fund can be long or short individual markets as trends evolve.',
      'Futures rolls, margin, and exchange limits are the central implementation factors. Rebalance cadence and risk caps are detailed in Krane’s methodology documents.',
    ],
    pedigreeParas: ped(
      `Krane Funds Advisors lists the ETF and handles U.S. distribution; Mount Lucas Management LP is the index architect behind the KFA MLM Index. Mount Lucas has run systematic futures research since the 1980s and focuses on transparent, exchange-traded implementation of trend and macro premia rather than opaque hedge-fund share classes.`,
      `KraneShares’ U.S.-listed ETF complex is typically quoted in the high single-digit billions USD in sponsor league tables (order of magnitude)—large enough for institutional trading infrastructure but still a specialist versus integrated mega banks.`
    ),
    outperfParas: [
      'Outperforms when <strong>macro trends persist for months</strong> across FX, commodities, and rates, think sustained dollar moves, energy curves, or directional bond markets, while equities chop sideways. That is the classic “CTA diversification” window this sleeve is built for.',
      'Underperforms in <strong>fast mean-reversion</strong>, liquidity shocks that invert futures curves, or synchronized risk-off can still punish trend systems after fees, favorable environments are those where trends are clean enough that implementation costs stay small relative to signal strength.',
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
    addedToSite: '2026-05-01',
    structure: 'Active emerging-markets long/short equity',
    mer: '0.85%',
    aum: '~$10M',
    pageTitle: 'MEMA ETF — Alpha Stacking',
    description:
      'Man Active Emerging Markets Alternative ETF (MEMA): active EM long/short equity combining systematic signals with discretionary portfolio management.',
    lede:
      'MEMA is Man Group’s actively managed emerging-markets long/short equity ETF: the portfolio can hold both longs and shorts across EM issuers, aiming to compound stock-selection alpha with lower market dependence than a plain long-only EM index sleeve.',
    strategyParas: [
      'MEMA blends quantitative screening with manager discretion, then expresses views through long and short positions in emerging-markets equities and equity-related instruments. Net exposure can move as risk and opportunity sets change.',
      'Implementation matters more than headline theme: short borrow costs, liquidity in local EM listings, and position sizing can dominate realized returns in stress windows. Net and gross exposure can drift; the monthly holdings file is more informative than the marketing summary.',
    ],
    pedigreeParas: ped(
      `Man Group is a long-standing listed alternatives manager with institutional roots in quantitative and discretionary investing; MEMA extends that research platform into an ETF wrapper for investors who want emerging-markets long/short exposure without a hedge-fund lockup.`,
      `The ETF itself is still early in lifecycle and relatively small by AUM, so trading implementation and capacity management deserve attention alongside pure alpha claims—use limit orders and confirm current liquidity before sizing.`
    ),
    outperfParas: [
      'Outperforms when <strong>EM country and sector dispersion</strong> is wide and persistent, windows where security selection and relative-value shorts can add return independent of broad EM index direction.',
      'Underperforms when <strong>correlations across EM jump to one factor</strong> and <strong>short squeezes</strong> or crowded shorts punish the book.',
    ],
    officialUrl: 'https://www.man.com/products/man-active-emerging-markets-alternative-etf',
    officialLabel: 'Man Group (MEMA)',
    efficiency: {
      capital: {
        tooltip: capitalEfficiencyTooltip(
          'MEMA runs a net-long emerging-markets equity book. The capital grade scores that equity sleeve versus its benchmark after fees.'
        ),
      },
      alpha: {
        tooltip: alphaEfficiencyUnstackedTooltip(
          'Alpha comes from long/short security selection and net/gross exposure management inside emerging-markets equities.'
        ),
      },
    },
  },

  clse: {
    yahooSymbol: 'CLSE',
    hubCategoryId: 'long-short',
    badge: 'Long/short',
    h1Title: 'CLSE — Convergence Long/Short Equity ETF',
    displayTicker: 'CLSE',
    issuer: 'Convergence Investment Partners',
    inception: 'Dec 2009 (strategy); listed Feb 2022',
    addedToSite: '2026-04-17',
    structure: 'Active long/short US equity',
    mer: '~1.52%',
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
      `Convergence Investment Partners runs the strategy out of Florida with a long institutional pedigree in long/short equity; the ETF is the same strategy packaged for exchange liquidity, with published fact sheets, investor guides, and quarterly holdings downloads on investcip.com rather than a bare ticker stub.`,
      `Listed AUM is boutique versus mega issuers—expect wider median bid/ask and more days away from NAV than SPY-class funds—so implementation (limit orders, patience around rebalances) matters as much as the underlying stock calls.`,
    ),
    outperfParas: [
      'Outperforms when <strong>stocks diverge</strong> from each other, when good companies beat bad ones regardless of what the index does. Active stock dispersion environments, where earnings quality and balance-sheet differences drive divergence between longs and shorts, are the favorable tape. CLSE can compound in the <strong>choppy/sideways</strong> environment, in flat or directionless markets that kill pure index strategies.',
      'Underperforms when <strong>everything correlates to 1.0</strong>: a sharp macro-driven risk-off collapses the spread between long and short legs, and a short squeeze can hurt the short book independent of fundamentals. It also needs time, months or years for stock calls to play out, and underperforms in momentum-driven markets where cheap valuation is irrelevant. Favorable: <strong>choppy/sideways</strong> environment (wide stock dispersion, sideways or directionless index). Hostile: synchronized macro risk-off.',
    ],
    officialUrl: 'https://www.investcip.com/etfstrategies.html',
    officialLabel: 'Convergence Investment Partners (CLSE)',
  },

  vamo: {
    yahooSymbol: 'VAMO',
    hubCategoryId: 'long-short',
    badge: 'Long/short',
    h1Title: 'VAMO - Cambria Value and Momentum ETF',
    displayTicker: 'VAMO',
    issuer: 'Cambria Investment Management',
    inception: 'Sep 8, 2015',
    addedToSite: '2026-05-22',
    structure: 'Active tactical long/short US equity',
    mer: '0.65%',
    aum: '~$83M',
    pageTitle: 'VAMO ETF - Alpha Stacking',
    description:
      'Cambria Value and Momentum ETF (VAMO): quantitative U.S. equity fund combining value and momentum factor selection with systematic tactical hedging via S&P 500 futures.',
    lede:
      'VAMO is a quantitative long U.S. equity fund combining value and momentum signals to select roughly 100 holdings, with a systematic overlay that can hedge up to 100% of the long book with S&P 500 futures when markets look expensive or trend turns negative.',
    strategyParas: [
      'VAMO screens U.S. equities above $200M market cap, ranking candidates on long-term value metrics (price relative to fundamentals, typically over five to ten years) and near-term relative momentum (typically less than one year). The top roughly 100 names enter the long book; the portfolio rebalances monthly. The factor pairing is intentional: value finds underpriced candidates while momentum filters out names still in a price downtrend.',
      'Tactical hedging runs as a separate weekly process: Cambria\'s rules assess market valuation and price trend, then scale a short S&amp;P 500 futures position from 0% to up to 100% of the long book. When both signals are unfavorable the fund can be near market-neutral. Futures roll, carry, and implementation costs for the hedge layer on top of the published 0.65% expense ratio and show up in the spread versus a plain equity benchmark.',
    ],
    pedigreeParas: ped(
      `Mebane T. Faber (co-founder and CIO) and Jonathan Keetz (President) have managed VAMO since its September 2015 launch through Cambria Investment Management, a Los Angeles-based independent registered investment adviser. Faber is widely cited in factor investing, global asset allocation, and shareholder yield research; Keetz focuses on portfolio management and operations.`,
      `Cambria managed approximately $4.1 billion across its nineteen-ETF platform as of May 2026, a focused scale relative to index giants. The firm concentrates on evidence-based, rules-driven strategies across shareholder yield, value, trend, and multi-factor equity, applying the same systematic discipline across VAMO and its broader product set.`,
    ),
    outperfParas: [
      'Outperforms when <strong>value stocks re-rate with momentum confirmation</strong>: cheap, fundamentally sound companies begin to outperform the index just as near-term relative strength turns constructive. Periods where earnings quality and balance-sheet discipline drive dispersion between sectors are the favorable tape; both the stock selection and the unhedged net-long position earn simultaneously.',
      'Underperforms in extended <strong>growth-driven momentum markets</strong> where a small number of high-multiple names drive index returns and the value screen systematically avoids them. The tactical hedge introduces timing risk: a rapid recovery within a weekly rebalance cycle can generate drag even when the signal fires correctly. The constructive flip is that wide valuation spreads and deteriorating breadth eventually produce the conditions where VAMO\'s systematic rules activate most cleanly.',
    ],
    officialUrl: 'https://www.cambriafunds.com/vamo',
    officialLabel: 'Cambria Funds (VAMO)',
  },

  wtls: {
    yahooSymbol: 'WTLS',
    hubCategoryId: 'long-short',
    badge: 'Long/short',
    h1Title: 'WTLS - WisdomTree Efficient Long/Short U.S. Equity Fund',
    displayTicker: 'WTLS',
    issuer: 'WisdomTree',
    inception: 'Jan 22, 2026',
    addedToSite: '2026-05-24',
    structure: 'Capital-efficient long/short US equity',
    mer: '0.88%',
    aum: '~$12M',
    pageTitle: 'WTLS ETF - Alpha Stacking',
    description:
      'WisdomTree Efficient Long/Short U.S. Equity Fund (WTLS): capital-efficient 90% U.S. equity plus 90% ML-driven long/short overlay in one wrapper.',
    lede:
      '<strong>WTLS</strong> pairs broad U.S. large-cap equity with a machine-learning-driven long/short overlay in a single capital-efficient wrapper, targeting incremental return above benchmark without requiring investors to reduce existing equity exposure.',
    strategyParas: [
      'The fund runs two strategies simultaneously on the same capital base. The first is a long-only broad U.S. large-cap equity book, designed to track general market participation. The second is an active long/short overlay: machine learning models developed by <strong>AlphaBeta Investment Indices Ltd.</strong> score U.S. securities on predicted return and risk, generating a long book of favored names and a short book of unfavored ones. The combined notional is approximately 180%, funded from one dollar of capital.',
      'Because the L/S overlay is ML-driven and rebalances with model output, turnover and position concentration can shift materially quarter to quarter. Borrow costs, dividend pass-through on short positions, and financing on the incremental notional all flow through returns on top of the 0.88% expense ratio. The fund launched in January 2026 so live track record is short; the AlphaBeta models are trained on historical data, which introduces backtest-to-live risk.',
    ],
    pedigreeParas: ped(
      `WisdomTree is a New York-based ETF sponsor and asset manager with approximately $100 billion in global AUM across factor equity, fixed income, and capital-efficient ETFs; WTLS extends its capital-efficient suite, which already includes NTSX, NTSD, GDE, and GDT, into the long/short equity space. The model provider is AlphaBeta Investment Indices Ltd., a specialist quantitative research firm; WisdomTree holds a minority stake in AlphaBeta ETF Ltd., AlphaBeta's operating entity, aligning incentives between sponsor and model developer.`,
      `AlphaBeta's machine learning framework applies supervised models trained on historical price, fundamental, and risk data to predict relative stock returns across the U.S. large-cap universe. The same team and model infrastructure drive both the long and short selection, which differs from multi-manager structures where long and short books run independently.`
    ),
    outperfParas: [
      'Outperforms when <strong>U.S. large-cap stock dispersion is wide</strong> and ML return predictions align with market outcomes: periods where earnings quality, balance-sheet strength, and factor spreads drive meaningful divergence between longs and shorts. The capital-efficient structure means the overlay can add incremental return above the equity benchmark without requiring portfolio reallocation, a clean fit for investors already long U.S. equities who want to layer on a systematic alpha sleeve.',
      'Underperforms in <strong>macro-driven correlated selloffs</strong> where all large-cap names move together and short selection is overwhelmed by index-level moves, or in short-squeeze episodes where borrowed names gap higher against the thesis. The favorable tape is a <strong>choppy/sideways environment</strong> with high cross-sectional dispersion and stable securities lending conditions, not synchronized risk-off episodes where factor spreads compress to zero.',
    ],
    officialUrl: 'https://www.wisdomtree.com/investments/etfs/capital-efficient/wtls',
    officialLabel: 'WisdomTree (WTLS)',
  },

  orr: {
    yahooSymbol: 'ORR',
    hubCategoryId: 'long-short',
    badge: 'Long/short',
    h1Title: 'ORR — Militia Long/Short Equity ETF',
    displayTicker: 'ORR',
    issuer: 'Militia Investments',
    inception: 'Jan 2025',
    addedToSite: '2026-04-17',
    structure: 'Active global long/short equity',
    mer: '~1.30%',
    aum: '~$22M',
    pageTitle: 'ORR ETF — Alpha Stacking',
    description:
      'Militia Long/Short Equity ETF (ORR): actively managed, higher-turnover fundamental long/short global equity—David Orr’s team runs the same style as Militia’s hedge-fund complex inside a Nasdaq-listed wrapper.',
    lede:
      'ORR is Militia’s global long/short equity ETF: higher-turnover, fundamental stock selection across regions—longs in mispriced franchises, shorts funding pairs and hedges—with capital appreciation as the objective rather than tracking an index.',
    strategyParas: [
      'Under normal circumstances the fund invests the bulk of assets in equities and equity ETFs, mixing single names with baskets where it improves liquidity or express a macro view. Turnover is intentionally high versus closet-index funds, so each month’s schedule of investments is more informative than stale marketing blurbs.',
      'Because shorts are economically large, published expense ratios can look eye-watering next to plain equity ETFs: dividend pass-through on borrowed stock and financing costs flow through the expense line even when management fees are mid-single digits—read the “adjusted” fee disclosure and compare net-of-financing performance to peers, not just the headline ratio.',
    ],
    pedigreeParas: ped(
      `Militia is led by founder and CIO David Orr, who also runs a long/short global hedge-fund complex; ORR is the ETF share class of that intellectual property, distributed with operational plumbing typical of advisor-focused ETF launches (compliance docs, shareholder reports, and a dedicated militiaetf.com landing page).`,
      `The franchise is boutique by design—capacity, borrow relationships, and PM continuity matter more than brand marketing—verify Form ADV assets, personnel, and prime-broker lineup alongside live AUM on the sponsor site before sizing.`,
    ),
    outperfParas: [
      'Outperforms when <strong>global leadership diverges</strong> that stock-specific shorts pay for themselves: Japan quality vs. U.S. megacap, EM airports vs. domestic REITs, or thematic unwinds where fundamentals and positioning disagree for months, not days.',
      'Underperforms in macro <strong>risk-on/risk-off</strong> tapes that crush dispersion, or when <strong>short squeezes</strong> lift borrowed names against the thesis. The constructive case is wide cross-regional earnings revision gaps with orderly securities lending, not synchronized liquidity shocks where every book correlates to one factor.',
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
    addedToSite: '2026-04-17',
    structure: 'Systematic global macro',
    capitalBucketExposurePct: 50,
    alphaBucketExposurePct: 100,
    mer: '0.86%',
    aum: '~$210M',
    pageTitle: 'ASGM ETF — Alpha Stacking',
    description:
      'Virtus AlphaSimplex Global Macro ETF (ASGM): systematic global macro sleeve that pairs dedicated equity risk with futures across rates, FX, and commodities—Virtus lists AlphaSimplex as sub-adviser.',
    lede:
      'ASGM packages AlphaSimplex’s research-driven global macro sleeve inside Virtus’s ETF shelf: a strategic equity sleeve plus systematic futures across rates, currencies, and commodities, so macro risk can rotate without loading everything on a single equity factor.',
    strategyParas: [
      'ASGM uses adaptive risk budgeting layered on trend and macro signals. Gross exposure expands and contracts with volatility targeting, so headline beta in any given month can look very different from a 60/40 proxy. Futures implementation, roll timing, and margin are central to understanding sleeve interaction.',
      'Because the process is model-driven, the failure mode is environment shift: models optimized on long histories can lag abrupt policy reversals or liquidity shocks. Stress tests against 2020 and 2022-style months matter more than a single backtested decade.',
    ],
    pedigreeParas: ped(
      `AlphaSimplex spun out of MIT-linked quantitative finance (Andrew Lo’s research ecosystem) before becoming Virtus’s systematic macro affiliate—its edge is published methodology, peer-reviewed roots, and institutional risk systems rather than discretionary macro “stories.”`,
      `Virtus Investment Partners is a public multi-boutique manager with consolidated assets in the tens of billions of dollars per SEC filings—large enough for prime brokerage and swap infrastructure, while ASGM remains a specialist ETF for investors who want macro convexity alongside listed equity beta.`,
    ),
    outperfParas: [
      'Outperforms when <strong>macro variables diverge</strong>: dollar trends vs. EM, curve steepeners vs. equities, or commodity shocks that hit sectors unevenly, windows where futures sleeves earn while an equity core still participates in carry.',
      'Underperforms in <strong>whipsaw tape</strong> where signals flip monthly; favorable environments are persistent trends with liquid curves, not single-meeting Fed reversals where every asset reprices in one session.',
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
    addedToSite: '2026-04-17',
    structure: 'Merger arbitrage',
    mer: '0.75%',
    aum: '~$16M',
    pageTitle: 'MRGR ETF — Alpha Stacking',
    description: 'ProShares Merger ETF (MRGR): rules-based merger arbitrage via the S&P Merger Arbitrage Index. How deal-spread harvesting works and when it earns.',
    contentFormat: 'html',
    lede:
      'MRGR tracks the S&P Merger Arbitrage Index, which owns stocks of announced acquisition targets at their current trading price and hedges acquirer exposure — capturing the spread between where deals trade and the announced deal price.',
    strategyParas: [
      'When a company announces it will acquire another at $50 per share and the target trades at $48, that $2 spread is what merger arbitrage captures. The fund holds a basket of these announced-deal positions across the current M&A calendar. The spread exists because deal completion takes time and there is always a chance the deal falls through — you are being paid to warehouse that completion risk.',
      'The economics are driven by deal spreads and financing costs, not by equity beta. Net exposure to the broad market is low by design: the fund is long the target (which trades near the deal price regardless of market direction) and hedges the acquirer. The main risks are deal breaks, regulatory blocks, and acquirer repricing.',
    ],
    pedigreeParas: PROSHARES_PEDIGREE_PARAS,
    outperfParas: [
      'Outperforms when <strong>deals close on schedule</strong>: active M&A calendars, friendly transactions where regulatory approval is likely, and calm financing markets. Returns are tied to deal completion rather than equity direction, so can earn in flat or declining markets.',
      'Underperforms when <strong>deals break or get blocked</strong>: an antitrust challenge that kills a deal, or a sharp drop in the acquirer\'s stock that reprices the economics, can turn a steady spread-earner into a loss. Broad risk-off episodes can also widen spreads faster than they close. The sleeve looks bad in the short run even when most deals eventually close.',
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
    addedToSite: '2026-04-25',
    structure: 'Tail-risk equity overlay',
    mer: '0.63%',
    aum: '~$90M',
    pageTitle: 'ATTR ETF — Alpha Stacking',
    description: 'Arin Tactical Tail Risk ETF (ATTR): U.S. large-cap exposure with active tail-risk mitigation.',
    contentFormat: 'html',
    lede:
      'ATTR is an actively managed tail-risk sleeve that seeks U.S. large-cap participation while mitigating severe drawdowns through options structures and tactical overlays.',
    strategyParas: [
      'ATTR blends equity index exposure with options on large-cap benchmarks (S&P 500-linked structures), aiming to retain upside participation while dampening left-tail outcomes in stress environments.',
      'The trade-off is explicit carry cost: hedging and convexity overlays can lag in quiet bull markets, and implementation (strike selection, roll timing, collateral use, and ETF-of-ETF sleeves such as tail-risk allocations) drives realized outcomes versus a plain beta benchmark.',
    ],
    pedigreeParas: ped(
      `ATTR sits on ETF Architect’s operating platform (Empowered Funds, LLC dba EA Advisers), with Arin Risk Advisors as sub-adviser; the structure is a specialist derivatives/risk-management stack rather than plain index replication.`,
      `ETF Architect is a boutique ETF platform (sub-scale versus mega issuers), which often means differentiated exposures and tighter product focus, but also requires investors to monitor liquidity, spreads, and portfolio disclosures more actively than for broad core-beta funds.`,
    ),
    outperfParas: [
      'Outperforms in <strong>fast-volatility expansions</strong>, gap-down tapes, and correlation spikes where options convexity can offset part of equity drawdown pressure.',
      'Underperforms in <strong>smooth, low-volatility melt-ups</strong> when protection spend and hedge drag dominate.',
    ],
    officialUrl: 'https://arinetfs.com/attr',
    officialLabel: 'Arin ETFs (ATTR)',
  },


  mate: {
    yahooSymbol: 'MATE',
    hubCategoryId: 'return-stacked-ge-2x',
    badge: 'Return Stacked - 2x',
    h1Title: 'MATE — Man Active Trend Enhanced ETF',
    displayTicker: 'MATE',
    issuer: 'Man Group',
    inception: 'Dec 16, 2025',
    addedToSite: '2026-05-03',
    capitalBucketExposurePct: 100,
    alphaBucketExposurePct: 100,
    mer: '0.97%',
    aum: '~$37M',
    pageTitle: 'MATE ETF — Alpha Stacking',
    description:
      'Man Active Trend Enhanced ETF (MATE): 100% S&P 500 plus 100% Man-managed trend-following futures on the same capital. When it earns and how it fits in an alpha stacking portfolio.',
    contentFormat: 'html',
    lede: fb.MATE_LEDE_HTML,
    strategyParas: fb.MATE_STRATEGY_PARAS_HTML,
    pedigreeParas: fb.MATE_PEDIGREE_PARAS_HTML,
    outperfParas: fb.MATE_OUTPERF_PARAS_HTML,
    officialUrl: 'https://www.man.com/products/man-active-trend-enhanced-etf',
    officialLabel: 'MATE official page',
    efficiency: {
      capital: {
        tooltip: capitalEfficiencyTooltip(
          "MATE allocates roughly 100% S&P 500 notional to the equity sleeve of the stack."
        ),
      },
      alpha: {
        tooltip: alphaEfficiencyStackedTooltip(
          "MATE's alpha sleeve is approximately 100% trend-following managed futures, spanning equities, rates, currencies, and commodities. It's designed to diversify the equity core across macro environments."
        ),
      },
      footnotes: [
        'Grades above are based on 4 months of live data and should be treated as provisional. Short history may not capture a full market-cycle.',
      ],
    },
  },

  rssy: {
    yahooSymbol: 'RSSY',
    hubCategoryId: 'return-stacked-ge-2x',
    badge: 'Return Stacked - 2x',
    h1Title: 'RSSY — Return Stacked U.S. Stocks & Futures Yield ETF',
    displayTicker: 'RSSY',
    issuer: 'Tidal Trust II / Tidal Investments LLC (adviser)',
    inception: 'May 28, 2024',
    addedToSite: '2026-05-03',
    structure: 'Return-stacked US equity + futures yield',
    capitalBucketExposurePct: 100,
    alphaBucketExposurePct: 100,
    mer: '0.98%',
    aum: '~$96M',
    pageTitle: 'RSSY ETF — Alpha Stacking',
    description:
      'Return Stacked U.S. Stocks & Futures Yield ETF (RSSY): equity stack, futures yield sleeve, and manager context.',
    contentFormat: 'html',
    lede: fb.RSSY_LEDE_HTML,
    strategyParas: fb.RSSY_STRATEGY_PARAS_HTML,
    pedigreeParas: fb.RSSY_PEDIGREE_PARAS_HTML,
    outperfParas: fb.RSSY_OUTPERF_PARAS_HTML,
    officialUrl: 'https://www.returnstackedetfs.com/rssy-return-stacked-us-stocks-futures-yield/',
    officialLabel: 'RSSY official page',
    efficiency: {
      capital: {
        tooltip: capitalEfficiencyTooltip(
          'RSSY targets roughly 100% notional large-cap U.S. equity (ETFs, futures, or combinations) alongside a parallel sleeve (Return Stacked® structure).'
        ),
      },
      alpha: {
        tooltip: alphaEfficiencyStackedTooltip(
          'The second sleeve is a quantitative futures-yield program: long and short futures across commodities, rates, currencies, and equity indices targeting roll and curve payoffs rather than pure directional beta.'
        ),
      },
    },
  },

  hfgm: {
    yahooSymbol: 'HFGM',
    hubCategoryId: 'global-macro',
    badge: 'Global macro',
    h1Title: 'HFGM — Unlimited HFGM Global Macro ETF',
    displayTicker: 'HFGM',
    issuer: 'Unlimited ETFs / Unlimited Funds, Inc. (sub-adviser)',
    inception: 'April 14, 2025',
    addedToSite: '2026-05-03',
    capitalBucketExposurePct: 50,
    alphaBucketExposurePct: 100,
    mer: '1.00%',
    aum: '~$35M',
    pageTitle: 'HFGM ETF — Alpha Stacking',
    description:
      'HFGM replicates hedge fund Global Macro sector returns in an ETF wrapper: long and short positions in ETFs and listed futures, 1% fee, daily liquidity. When it earns and what kills it.',
    contentFormat: 'html',
    belowChart: HFGM_PROXY_NOTE_HTML,
    lede: fb.HFGM_LEDE_HTML,
    strategyParas: fb.HFGM_STRATEGY_PARAS_HTML,
    pedigreeParas: fb.HFGM_PEDIGREE_PARAS_HTML,
    outperfParas: fb.HFGM_OUTPERF_PARAS_HTML,
    officialUrl: 'https://unlimitedetfs.com/hfgm/',
    officialLabel: 'HFGM official page',
    efficiency: {
      capital: {
        tooltip: capitalEfficiencyTooltip(
          'HFGM holds an estimated ~50% S&P 500–style equity sleeve (futures and related exposure) alongside macro alternatives per Unlimited’s published holdings. The grade scores that equity book versus SPY, net of costs.'
        ),
      },
      alpha: {
        tooltip: alphaEfficiencyStackedTooltip(
          'The non-core sleeve is systematic global macro: rates, FX, commodities, and selective equity beta implemented with ETFs and listed futures to replicate hedge-fund Global Macro sector returns.'
        ),
      },
      notes: [
        'Sleeve split estimated from sponsor materials and published holdings. Grades updated when materially new data is available.',
      ],
    },
  },
  rssb: {
    yahooSymbol: 'RSSB',
    hubCategoryId: 'return-stacked-ge-2x',
    badge: 'Return Stacked - 2x',
    h1Title: 'RSSB — Return Stacked® Global Stocks & Bonds ETF',
    displayTicker: 'RSSB',
    issuer: 'Tidal / Return Stacked ETFs',
    inception: 'Feb 6, 2024',
    addedToSite: '2026-05-05',
    structure: 'Return-stacked global equity + Treasuries',
    capitalBucketExposurePct: 100,
    alphaBucketExposurePct: 100,
    mer: '0.41%',
    aum: '~$500M',
    pageTitle: 'RSSB ETF — Alpha Stacking',
    description: 'Return Stacked Global Stocks & Bonds ETF (RSSB).',
    contentFormat: 'html',
    lede:
      'RSSB stacks a global-equity sleeve with a U.S. Treasury futures sleeve so one dollar carries stock beta plus duration ballast in a single ETF.',
    strategyParas: [
      'The fund keeps broad global equity exposure and layers Treasury futures on top, usually targeting a full additional bond sleeve without requiring a separate cash bond allocation. Daily rebalancing and futures roll mechanics are central to tracking behavior.',
      'Because bonds are added through derivatives, realized carry, collateral yield, and term-structure shape matter more than in a plain stock index ETF. This is a structural 2-sleeve allocation tool, not a tactical macro timer.',
    ],
    pedigreeParas: TIDAL_RETURN_STACKED_PEDIGREE_PARAS,
    outperfParas: [
      'Outperforms when global equities trend while Treasuries provide positive carry or convex diversification, especially in growth-slowdown environments where duration offsets part of equity path risk.',
      'Underperforms when <strong>stocks and long-duration bonds sell off together</strong> under inflation shocks or repricing in real yields, because both sleeves can be pressured at the same time.',
    ],
    officialUrl: 'https://www.returnstackedetfs.com/return-stacked-global-stocks-bonds/',
    officialLabel: 'Return Stacked ETFs (RSSB)',
    efficiency: {
      capital: {
        tooltip: capitalEfficiencyTooltip(
          'RSSB carries a global equity sleeve as the capital bucket. The grade scores that equity component versus SPY under the site framework.'
        ),
      },
      alpha: {
        tooltip: alphaEfficiencyStackedTooltip(
          'The second sleeve is U.S. Treasury futures layered through derivatives. The alpha grade measures whether that overlay clears hurdle versus costs.'
        ),
      },
    },
  },
  gdt: {
    yahooSymbol: 'GDT',
    hubCategoryId: 'return-stacked-lt-2x',
    badge: 'Return Stacked - Lower Leverage',
    h1Title: 'GDT — WisdomTree Efficient TIPS Plus Gold Fund',
    displayTicker: 'GDT',
    issuer: 'WisdomTree',
    inception: 'Jan 22, 2026',
    addedToSite: '2026-05-05',
    structure: 'Capital-efficient TIPS + gold futures',
    capitalBucketExposurePct: 90,
    alphaBucketExposurePct: 90,
    mer: '0.30%',
    aum: '~$9M',
    pageTitle: 'GDT ETF — Alpha Stacking',
    description: 'WisdomTree Efficient TIPS Plus Gold Fund (GDT).',
    contentFormat: 'html',
    lede:
      'GDT pairs a TIPS core with a gold futures overlay in a capital-efficient wrapper designed for inflation-sensitive diversification.',
    strategyParas: [
      'The equity-like risk in this fund is minimal; the core sleeve is inflation-linked Treasuries while gold is added through futures. Positioning therefore reflects both real-rate duration and commodity futures dynamics.',
      'This profile can differ meaningfully from holding bullion plus a short-duration bond ETF because futures roll, collateral, and duration path effects influence returns in different macro environments.',
    ],
    pedigreeParas: WISDOMTREE_PEDIGREE_PARAS,
    outperfParas: [
      'Outperforms when inflation expectations rise or real yields fall enough that gold and TIPS both contribute, producing a cleaner inflation-hedge environment than nominal-duration exposure alone.',
      'Underperforms when <strong>real yields rise sharply</strong> and gold weakens at the same time, which can pressure both sleeves despite the diversification intent.',
    ],
    officialUrl: 'https://www.wisdomtree.com/investments/etfs/capital-efficient/gdt',
    officialLabel: 'WisdomTree (GDT)',
    efficiency: {
      capital: {
        tooltip: capitalEfficiencyTooltip(
          'GDT uses a TIPS sleeve as the capital bucket. The grade scores that inflation-linked fixed-income component versus benchmark under the same framework.'
        ),
      },
      alpha: {
        tooltip: alphaEfficiencyStackedTooltip(
          'The second sleeve is gold futures overlay notional. The alpha grade evaluates whether that non-equity sleeve adds enough return above hurdle.'
        ),
      },
    },
  },
  ntsx: {
    yahooSymbol: 'NTSX',
    hubCategoryId: 'return-stacked-lt-2x',
    badge: 'Return Stacked - Lower Leverage',
    h1Title: 'NTSX — WisdomTree U.S. Efficient Core Fund',
    displayTicker: 'NTSX',
    issuer: 'WisdomTree',
    inception: 'Aug 2, 2018',
    addedToSite: '2026-05-05',
    structure: '90/60 U.S. equity + Treasuries',
    capitalBucketExposurePct: 90,
    alphaBucketExposurePct: 60,
    mer: '0.20%',
    aum: '~$1.3B',
    pageTitle: 'NTSX ETF — Alpha Stacking',
    description: 'WisdomTree U.S. Efficient Core Fund (NTSX).',
    contentFormat: 'html',
    lede:
      'NTSX is WisdomTree’s 90/60 U.S. core design: broad U.S. equities plus a Treasury futures sleeve in one capital-efficient ETF.',
    strategyParas: [
      'The fund typically allocates about 90% to equities and uses Treasury futures to add duration without fully funding a second cash bond allocation. That can maintain high equity participation while introducing a bond sleeve.',
      'Implementation relies on futures collateral and roll execution, so results versus a separately funded stock/bond portfolio can diverge through time even when headline exposures look similar.',
    ],
    pedigreeParas: WISDOMTREE_PEDIGREE_PARAS,
    outperfParas: [
      'Outperforms when U.S. equities rise while Treasury duration is neutral-to-helpful, or when growth shocks lift bonds enough to partially cushion equity volatility.',
      'Underperforms when <strong>equities and duration lose together</strong> in inflationary repricing environments where both sleeves face drawdown pressure.',
    ],
    officialUrl: 'https://www.wisdomtree.com/investments/etfs/capital-efficient/ntsx',
    officialLabel: 'WisdomTree (NTSX)',
    efficiency: {
      capital: {
        tooltip: capitalEfficiencyTooltip(
          'NTSX targets roughly 90% U.S. equity exposure as the capital sleeve. The grade scores that equity component versus SPY under the site framework.'
        ),
      },
      alpha: {
        tooltip: alphaEfficiencyStackedTooltip(
          'The second sleeve is Treasury futures notional (~60% target) layered through derivatives. The alpha grade scores return above hurdle for that non-equity sleeve.'
        ),
      },
    },
  },
  ntsi: {
    yahooSymbol: 'NTSI',
    hubCategoryId: 'return-stacked-lt-2x',
    badge: 'Return Stacked - Lower Leverage',
    h1Title: 'NTSI — WisdomTree International Efficient Core Fund',
    displayTicker: 'NTSI',
    issuer: 'WisdomTree',
    inception: 'May 18, 2021',
    addedToSite: '2026-05-05',
    structure: '90/60 developed ex-U.S. equity + Treasuries',
    capitalBucketExposurePct: 90,
    alphaBucketExposurePct: 60,
    mer: '0.26%',
    aum: '~$430M',
    pageTitle: 'NTSI ETF — Alpha Stacking',
    description: 'WisdomTree International Efficient Core Fund (NTSI).',
    contentFormat: 'html',
    lede:
      'NTSI extends the 90/60 framework to developed ex-U.S. equities with a Treasury futures overlay to improve capital efficiency.',
    strategyParas: [
      'The equity sleeve focuses on developed markets outside the U.S., while U.S. Treasury futures provide the added duration sleeve. Currency and regional factor moves can dominate short-run performance.',
      'Compared with holding separate international equity and bond funds, NTSI concentrates implementation risk in one wrapper but can simplify sleeve sizing inside multi-asset portfolios.',
    ],
    pedigreeParas: WISDOMTREE_PEDIGREE_PARAS,
    outperfParas: [
      'Outperforms when developed ex-U.S. equities lead and Treasury duration is stable-to-positive, particularly when non-U.S. cyclicals participate without a bond selloff.',
      'Underperforms when <strong>international equities lag and U.S. rates reset higher</strong>, because both the equity and duration sleeves can be pressured together.',
    ],
    officialUrl: 'https://www.wisdomtree.com/investments/etfs/capital-efficient/ntsi',
    officialLabel: 'WisdomTree (NTSI)',
    efficiency: {
      capital: {
        tooltip: capitalEfficiencyTooltip(
          'NTSI targets roughly 90% developed ex-U.S. equity exposure as the capital sleeve. The grade scores that equity component versus SPY under the site framework.'
        ),
      },
      alpha: {
        tooltip: alphaEfficiencyStackedTooltip(
          'The second sleeve is Treasury futures notional (~60% target) layered through derivatives. The alpha grade scores return above hurdle for that non-equity sleeve.'
        ),
      },
    },
  },
  ntse: {
    yahooSymbol: 'NTSE',
    hubCategoryId: 'return-stacked-lt-2x',
    badge: 'Return Stacked - Lower Leverage',
    h1Title: 'NTSE — WisdomTree Emerging Markets Efficient Core Fund',
    displayTicker: 'NTSE',
    issuer: 'WisdomTree',
    inception: 'May 20, 2021',
    addedToSite: '2026-05-05',
    structure: '90/60 emerging-markets equity + Treasuries',
    capitalBucketExposurePct: 90,
    alphaBucketExposurePct: 60,
    mer: '0.32%',
    aum: '~$47M',
    pageTitle: 'NTSE ETF — Alpha Stacking',
    description: 'WisdomTree Emerging Markets Efficient Core Fund (NTSE).',
    contentFormat: 'html',
    lede:
      'NTSE applies the efficient-core model to emerging-markets equities, pairing EM beta with a Treasury futures sleeve in one fund.',
    strategyParas: [
      'The strategy keeps an EM equity core and overlays Treasury duration via futures, aiming to preserve growth participation while adding a rates-sensitive diversifier.',
      'EM equity path, USD environment changes, and Treasury term-structure moves can all drive outcomes; this is best viewed as a packaged two-sleeve allocation rather than a single-factor equity ETF.',
    ],
    pedigreeParas: WISDOMTREE_PEDIGREE_PARAS,
    outperfParas: [
      'Outperforms when emerging markets advance in a stable-to-falling real-rate backdrop, where both EM risk appetite and duration support can contribute.',
      'Underperforms when <strong>EM risk assets de-rate during rising U.S. real yields</strong>, which can pressure both sleeves simultaneously.',
    ],
    officialUrl: 'https://www.wisdomtree.com/investments/etfs/capital-efficient/ntse',
    officialLabel: 'WisdomTree (NTSE)',
    efficiency: {
      capital: {
        tooltip: capitalEfficiencyTooltip(
          'NTSE targets roughly 90% emerging-markets equity exposure as the capital sleeve. The grade scores that equity component versus SPY under the site framework.'
        ),
      },
      alpha: {
        tooltip: alphaEfficiencyStackedTooltip(
          'The second sleeve is Treasury futures notional (~60% target) layered through derivatives. The alpha grade scores return above hurdle for that non-equity sleeve.'
        ),
      },
    },
  },
  avdv: {
    yahooSymbol: 'AVDV',
    hubCategoryId: 'factor',
    badge: 'Factor',
    h1Title: 'AVDV — Avantis International Small Cap Value ETF',
    displayTicker: 'AVDV',
    issuer: 'Avantis Investors',
    inception: 'Sep 24, 2019',
    addedToSite: '2026-05-05',
    structure: 'International small-cap value factor',
    mer: '0.36%',
    aum: '~$15B',
    pageTitle: 'AVDV ETF — Alpha Stacking',
    description: 'Avantis International Small Cap Value ETF (AVDV).',
    contentFormat: 'html',
    lede:
      'AVDV targets developed ex-U.S. small-cap value stocks with profitability screens in an active, implementation-focused factor wrapper.',
    strategyParas: [
      'The portfolio leans into value and size while emphasizing firms with stronger expected profitability than pure deep-value screens. It is active in execution but anchored to systematic factor inputs.',
      'Turnover, country weights, and liquidity management matter for realized results in international small caps, where index-like replication can be expensive and capacity constrained.',
    ],
    pedigreeParas: ped(
      `Avantis is the systematic equity arm within the American Century platform and focuses on factor implementation quality rather than headline-theory marketing.`,
      `The sponsor is now a large ETF franchise by assets, giving AVDV meaningful scale and tradability compared with many niche international small-cap products.`,
    ),
    outperfParas: [
      'Outperforms when <strong>value spreads and small-cap risk premia widen positively</strong> outside the U.S., especially in cyclical recoveries with broad earnings participation.',
      'Underperforms during momentum-led mega-cap or growth-dominant tapes where international small value is left behind for extended periods.',
    ],
    officialUrl: 'https://www.avantisinvestors.com/avantis-investments/avantis-international-small-cap-value-etf',
    officialLabel: 'Avantis (AVDV)',
    efficiency: {
      capital: {
        tooltip: capitalEfficiencyTooltip(
          'AVDV is an international small-cap value equity sleeve. The grade scores its equity-side excess return versus benchmark after fees.'
        ),
      },
    },
  },
  cowz: {
    yahooSymbol: 'COWZ',
    hubCategoryId: 'factor',
    badge: 'Factor',
    h1Title: 'COWZ — Pacer U.S. Cash Cows 100 ETF',
    displayTicker: 'COWZ',
    issuer: 'Pacer ETFs',
    inception: 'Dec 16, 2016',
    addedToSite: '2026-05-05',
    structure: 'U.S. free-cash-flow yield factor',
    mer: '0.49%',
    aum: '~$30B',
    pageTitle: 'COWZ ETF — Alpha Stacking',
    description: 'Pacer U.S. Cash Cows 100 ETF (COWZ).',
    contentFormat: 'html',
    lede:
      'COWZ screens U.S. large-cap stocks for high free-cash-flow yield, emphasizing cash-generation quality over headline earnings optics.',
    strategyParas: [
      'The index starts from a large-cap universe, excludes financials, and reweights by free-cash-flow yield. Sector tilts can be large and shift quickly as valuation and cash-flow cycles rotate.',
      'Because the methodology is rules-based, factor crowding and rebalance windows can influence short-run performance versus broad market cap indexes.',
    ],
    pedigreeParas: ped(
      `Pacer built a differentiated franchise around “cash cows” indexing and now runs one of the largest thematic-factor ETF complexes outside the biggest index issuers.`,
      `COWZ’s scale has improved secondary-market liquidity and execution depth, but users should still expect factor-style relative cycles rather than benchmark-like behavior.`,
    ),
    outperfParas: [
      'Outperforms when markets reward durable cash generation, valuation discipline, and balance-sheet quality over long-duration growth narratives.',
      'Underperforms when <strong>speculative growth and duration-sensitive sectors lead</strong> and high-cash-flow value exposures lag broad beta.',
    ],
    officialUrl: 'https://www.paceretfs.com/products/COWZ',
    officialLabel: 'Pacer ETFs (COWZ)',
    efficiency: {
      capital: {
        tooltip: capitalEfficiencyTooltip(
          'COWZ is a rules-based U.S. equity factor sleeve. The grade scores equity-side excess return versus benchmark after costs.'
        ),
      },
    },
  },
  ptf: {
    yahooSymbol: 'PTF',
    hubCategoryId: 'factor',
    badge: 'Factor',
    h1Title: 'PTF — Invesco Dorsey Wright Technology Momentum ETF',
    displayTicker: 'PTF',
    issuer: 'Invesco / Dorsey Wright',
    inception: 'Oct 12, 2006',
    addedToSite: '2026-05-05',
    structure: 'Technology momentum factor',
    mer: '0.68%',
    aum: '~$300M',
    pageTitle: 'PTF ETF — Alpha Stacking',
    description: 'Invesco Dorsey Wright Technology Momentum ETF (PTF).',
    contentFormat: 'html',
    lede:
      'PTF applies Dorsey Wright relative-strength momentum rules to U.S. technology stocks in a concentrated sector-factor sleeve.',
    strategyParas: [
      'The index ranks eligible technology names by momentum and refreshes holdings on a rules-based schedule. That creates a high-conviction tech trend profile rather than broad sector beta.',
      'As with most momentum strategies, turnover and trend persistence are the key return drivers; fast reversals can quickly erode prior leadership signals.',
    ],
    pedigreeParas: ped(
      `Invesco’s Dorsey Wright lineup is one of the longest-running momentum ETF families in U.S. markets, built around transparent relative-strength rankings.`,
      `Invesco’s scale supports fund operations and liquidity, while Dorsey Wright provides the factor-construction process that differentiates PTF from cap-weighted tech ETFs.`,
    ),
    outperfParas: [
      'Outperforms when <strong>technology leadership is persistent</strong> and relative-strength trends remain intact across rebalance windows.',
      'Underperforms during sharp factor reversals or broad, low-dispersion rebounds where previously weak tech cohorts mean-revert faster than momentum rules can adapt.',
    ],
    officialUrl:
      'https://www.invesco.com/us/en/financial-products/etfs/invesco-dorsey-wright-technology-momentum-etf.html',
    officialLabel: 'Invesco (PTF)',
    efficiency: {
      capital: {
        tooltip: capitalEfficiencyTooltip(
          'PTF is a technology momentum equity sleeve. The grade scores equity-side excess return versus benchmark after costs.'
        ),
      },
    },
  },
  hard: {
    yahooSymbol: 'HARD',
    hubCategoryId: 'global-macro',
    badge: 'Global macro',
    h1Title: 'HARD — Simplify Commodities Strategy No K-1 ETF',
    displayTicker: 'HARD',
    issuer: 'Simplify Asset Management',
    inception: 'Feb 2026',
    addedToSite: '2026-05-05',
    structure: 'Long/short hard-assets and commodities',
    mer: '0.95%',
    aum: '~$10M',
    pageTitle: 'HARD ETF — Alpha Stacking',
    description: 'Simplify Commodities Strategy No K-1 ETF (HARD).',
    contentFormat: 'html',
    lede:
      'HARD is a systematic long/short commodities sleeve built for hard-asset exposure without K-1 tax reporting.',
    strategyParas: [
      'The strategy runs long and short positions across commodity-linked futures markets using rules-based models, so outcomes depend on trend, carry, and curve dynamics rather than a static long-only commodity basket.',
      'Because this is a derivatives-heavy implementation, collateral yield, roll behavior, and contract selection are core performance drivers in addition to directional commodity moves.',
    ],
    pedigreeParas: ped(
      `Simplify is an alternatives-focused ETF sponsor that packages institutional-style derivatives strategies in listed wrappers with daily liquidity and transparent disclosures.`,
      `HARD extends that lineup into hard-assets with a no-K-1 design, giving taxable-account investors commodity strategy access in 1099 form without commodity partnership reporting complexity.`,
    ),
    outperfParas: [
      'Outperforms when cross-commodity dispersion and trend strength are high enough for long/short positioning to harvest both relative-value and directional opportunities.',
      'Underperforms in low-dispersion, range-bound tapes where futures trends repeatedly reverse and roll dynamics offer limited carry support.',
    ],
    officialUrl: 'https://www.simplify.us/etfs/hard-simplify-commodities-strategy-no-k1-etf',
    officialLabel: 'Simplify (HARD)',
    efficiency: {
      capital: {
        tooltip: capitalEfficiencyTooltip(
          'HARD runs a long/short hard-assets and commodities strategy. The capital line scores live return versus benchmark net of costs.'
        ),
      },
      alpha: {
        tooltip: alphaEfficiencyUnstackedTooltip(
          'Alpha comes from directional and relative-value positioning across commodity futures markets, not from broad equity beta.'
        ),
      },
    },
  },
  hold: {
    yahooSymbol: 'HOLD',
    hubCategoryId: 'return-stacked-lt-2x',
    badge: 'Return Stacked - Lower Leverage',
    h1Title: 'HOLD — Harbor Alpha Layering ETF',
    displayTicker: 'HOLD',
    issuer: 'Harbor Capital / PanAgora',
    inception: 'Aug 13, 2025',
    addedToSite: '2026-05-05',
    structure: 'Equity + managed futures layering',
    capitalBucketExposurePct: 75,
    alphaBucketExposurePct: 75,
    mer: '0.70%',
    aum: '~$20M',
    pageTitle: 'HOLD ETF — Alpha Stacking',
    description: 'Harbor Alpha Layering ETF (HOLD).',
    contentFormat: 'html',
    lede:
      'HOLD layers a U.S. equity sleeve with a trend-following managed-futures sleeve in one ETF to keep beta participation while adding diversifying macro exposure.',
    strategyParas: [
      'The structure combines broad equity exposure and systematic futures positioning, so investors get a return-stacked profile rather than a static 60/40 allocation. Futures sleeves can be long or short across major contracts as trends evolve.',
      'Realized outcomes depend on trend persistence, futures roll/carry, and equity environment. In fast mean-reversion periods, the managed-futures overlay can lag or offset equity direction unexpectedly.',
    ],
    pedigreeParas: ped(
      `Harbor Capital operates a growing active ETF platform and uses specialist sub-advisers for targeted strategies; HOLD is sub-advised by PanAgora, a quantitative manager with long institutional track records.`,
      `The design targets institutional-style alpha layering in a listed format: transparent ETF vehicle, daily liquidity, and a multi-sleeve process that investors can monitor through fund disclosures.`,
    ),
    outperfParas: [
      'Outperforms when equity participation remains constructive and macro trends are persistent enough for managed futures to add non-correlated return on top of the core beta sleeve.',
      'Underperforms when <strong>equity and trend signals whipsaw together</strong>, especially in low-dispersion, choppy tapes that erode systematic futures positioning.',
    ],
    officialUrl: 'https://www.harborcapital.com/etf/hold/',
    officialLabel: 'Harbor Capital (HOLD)',
    efficiency: {
      capital: {
        tooltip: capitalEfficiencyTooltip(
          'HOLD targets roughly 75% passive U.S. equity exposure as the capital sleeve. The grade scores that equity component versus SPY under the site framework.'
        ),
      },
      alpha: {
        tooltip: alphaEfficiencyStackedTooltip(
          'The second sleeve is a trend-following managed-futures program (~75% target). The alpha grade scores whether that overlay clears hurdle versus costs.'
        ),
      },
    },
  },

  jaaa: {
    yahooSymbol: 'JAAA',
    hubCategoryId: 'fixed-income',
    badge: 'Fixed income',
    h1Title: 'JAAA - Janus Henderson AAA CLO ETF',
    displayTicker: 'JAAA',
    issuer: 'Janus Henderson Investors',
    inception: 'Oct 16, 2020',
    addedToSite: '2026-05-22',
    structure: 'AAA CLO (floating rate)',
    mer: '0.20%',
    aum: '~$27B',
    pageTitle: 'JAAA ETF — Alpha Stacking',
    description:
      'Janus Henderson AAA CLO ETF (JAAA): actively managed floating-rate AAA-rated collateralized loan obligation fund.',
    contentFormat: 'html',
    chartHeadingLabel: 'total return',
    lede:
      'JAAA seeks current income by actively selecting <strong>AAA-rated CLO tranches</strong>, delivering floating-rate yield above short-term rates with near-zero duration and equity correlation.',
    strategyParas: [
      'Collateralized loan obligations are securitizations backed by diversified pools of leveraged corporate loans. <strong>AAA-rated tranches</strong> sit at the top of the CLO capital structure and absorb losses only after every junior tranche below them is wiped out — a structural buffer that has protected AAA investors through multiple credit cycles including 2008. JAAA targets this senior tier exclusively, selecting across deal managers, vintages, and loan sectors rather than passively tracking an index.',
      'Coupons reset monthly (SOFR plus a credit spread), so the fund carries effectively <strong>no duration risk</strong> to rising interest rates. When the Fed lifts short-term rates the coupon income rises in lockstep. The tradeoff: credit-spread widening in acute stress events, though AAA CLO spreads have historically compressed again quickly once liquidity normalizes. The prospectus covers swap counterparty exposure and concentration limits.',
    ],
    pedigreeParas: ped(
      'John Kerschner (Head of U.S. Securitized Products at Janus Henderson) co-managed the launch of JAAA in October 2020 alongside Nick Childs and Jessica Shill. The fund was the first listed AAA CLO ETF in the U.S. and grew to more than $27 billion by 2026, making it one of the largest actively managed fixed-income ETFs in the country. The securitized products desk manages across the full CLO capital structure and has covered this asset class through multiple market cycles.',
      'Janus Henderson Group plc managed approximately $379 billion in assets under management as of the end of 2024 (per annual report filings), spanning global equity, fixed income, multi-asset, and alternatives from offices in Denver, London, and Sydney. The firm runs institutional and retail mandates and is one of the larger independent active managers globally.',
    ),
    outperfParas: [
      'Outperforms when the federal funds rate is elevated: coupons reset upward each month, compounding a <strong>carry spread above T-bills</strong> that equity portfolios cannot replicate without duration or credit risk. Stable CLO deal flow and well-functioning leveraged-loan markets let the fund reinvest at prevailing rates without forced selling.',
      'Underperforms when <strong>CLO spreads gap out sharply</strong> in a broad credit event, as NAV reflects mark-to-market prices on thinly traded CLO tranches even if no credit losses are realized. Favorable tape is a high-rate, orderly-credit environment where carry compounds cleanly and the structural protection of AAA seniority is never tested.',
    ],
    officialUrl: 'https://www.janushenderson.com/en-us/investor/etf/jaaa/',
    officialLabel: 'Janus Henderson (JAAA)',
  },

  cloa: {
    yahooSymbol: 'CLOA',
    hubCategoryId: 'fixed-income',
    badge: 'Fixed income',
    h1Title: 'CLOA - iShares AAA CLO Active ETF',
    displayTicker: 'CLOA',
    issuer: 'BlackRock / iShares',
    inception: 'Jan 10, 2023',
    addedToSite: '2026-05-22',
    structure: 'AAA CLO (floating rate)',
    mer: '0.20%',
    aum: '~$2.1B',
    pageTitle: 'CLOA ETF — Alpha Stacking',
    description:
      'iShares AAA CLO Active ETF (CLOA): BlackRock actively managed fund investing in USD-denominated AAA-rated CLO tranches.',
    contentFormat: 'html',
    chartHeadingLabel: 'total return',
    lede:
      'CLOA is BlackRock\'s actively managed entry into <strong>AAA-rated CLO investing</strong>, targeting USD-denominated senior CLO tranches for floating-rate structured credit income.',
    strategyParas: [
      'CLOA invests in USD-denominated CLOs rated <strong>AAA at the senior tranche level</strong>: the highest-quality layer of structured credit, sitting atop the capital structure of a diversified pool of leveraged corporate loans. BlackRock\'s active selection across CLO managers, vintages, and underlying loan sectors aims to optimize yield pickup versus short-term rates while keeping the portfolio inside the AAA envelope.',
      'Like JAAA, CLOA benefits from the <strong>floating-rate coupon</strong> structure: distributions reset monthly with SOFR, eliminating duration sensitivity. Spread compression and deal-level selection drive incremental return. The fund is smaller than JAAA, which can mean slightly wider bid/ask spreads on individual CLO positions, but BlackRock\'s market access and primary-deal relationships offset some of that size disadvantage.',
    ],
    pedigreeParas: ped(
      'CLOA launched in January 2023 on BlackRock\'s iShares platform, the world\'s largest ETF issuer by assets. The iShares active fixed-income team manages the fund, drawing on BlackRock\'s global credit research infrastructure, primary-deal access to new CLO issuance, and proprietary risk analytics. The iShares active platform now spans a broad range of actively managed bond strategies in an ETF wrapper.',
      'BlackRock managed approximately $11.6 trillion in assets under management as of end of 2024 (per annual earnings filings), making it the largest asset manager in the world. Its fixed-income platform is one of the deepest in the industry, with relationships across every major CLO deal manager. That scale provides early access to new deals and liquidity that smaller securitized-credit teams cannot easily replicate.',
    ),
    outperfParas: [
      'Outperforms when <strong>short rates are elevated and CLO spreads are stable</strong>: the floating coupon compounds carry above T-bills each month, and BlackRock\'s primary-market access allows CLOA to participate in new deals at competitive spreads rather than buying seasoned paper in the secondary market.',
      'Underperforms when <strong>CLO secondary market liquidity contracts sharply</strong>, forcing mark-to-market spreads wider on thinly priced positions. As a newer and smaller fund vs JAAA, spread impact on individual trades is somewhat larger. Favorable tape is the same as for any AAA CLO fund: a high-short-rate, orderly-credit environment where the structural seniority of AAA tranches is never approached.',
    ],
    officialUrl: 'https://www.ishares.com/us/products/336360/ishares-aaa-clo-active-etf',
    officialLabel: 'iShares (CLOA)',
  },
}

export const CA_ETF_DYNAMIC_REGISTRY: Record<string, EtfDynamicDef> = {
  baaa: {
    yahooSymbol: 'BAAA.TO',
    hubCategoryId: 'fixed-income',
    badge: 'Fixed income',
    h1Title: 'BAAA.TO - Brompton Wellington Square AAA CLO ETF',
    displayTicker: 'BAAA / BAAA.U',
    issuer: 'Brompton Funds',
    inception: 'Apr 22, 2025',
    addedToSite: '2026-05-23',
    structure: 'Actively managed AAA CLO structured credit',
    mer: '0.40% mgmt fee',
    aum: '~$132M CAD',
    pageTitle: 'BAAA.TO ETF - Alpha Stacking',
    description:
      'Brompton Wellington Square AAA CLO ETF (BAAA.TO): actively managed portfolio of primarily AAA-rated collateralized loan obligation bonds, sub-advised by Wellington Square Advisors.',
    contentFormat: 'html',
    chartHeadingLabel: 'total return',
    lede:
      'BAAA is Brompton\'s actively managed portfolio of primarily <strong>AAA-rated CLO bonds</strong>, sub-advised by Wellington Square Advisors: structured credit income with low equity correlation in an ETF wrapper.',
    strategyParas: [
      'CLOs are floating-rate debt instruments backed by pools of broadly syndicated corporate loans. BAAA holds a minimum 75% in AAA-rated tranches, with the remainder down to BBB quality. The floating-rate coupon structure means distributions adjust with rates and the fund carries minimal duration risk, unlike traditional bond ETFs. Wellington Square selects CLOs across U.S., European, and Canadian markets, targeting monthly income currently running at roughly 4.75% annualized (CAD units).',
      'Because CLO tranches are complex structured instruments, spread and secondary-market liquidity risk can spike during credit stress even at the AAA level. The 0.40% management fee is the base cost; verify the full MER in the ETF Facts as operating expenses combine with the management fee to determine total cost. The fund also offers USD-denominated units (BAAA.U) for investors who want USD settlement.',
    ],
    pedigreeParas: ped(
      `Wellington Square Advisors Inc. is a Toronto-based independent credit advisory whose portfolio managers Jeff Sujitno (CPA, CA, CIM; 23 years credit experience) and Amar Dhanoya (CFA, MBA; 20 years credit experience) bring institutional CLO expertise across U.S., European, and Canadian leveraged loan markets. Wellington Square's total assets under management are not widely published, but the team's track record spans investment-grade and high-yield credit across the full capital structure.`,
      `Brompton Funds is a Toronto-based alternative asset manager overseeing approximately $3 billion across 19 TSX-listed closed-end and exchange-traded funds. The BAAA structure delegates active credit selection to Wellington Square while Brompton handles the ETF wrapper, distribution mechanics, and regulatory compliance. Brompton's broader lineup spans covered-call income, resource, and alternative credit strategies.`,
    ),
    outperfParas: [
      'Outperforms when <strong>investment-grade credit spreads are stable or tightening</strong>: AAA CLO tranches earn the floating coupon with low default risk and monthly distributions compound at a yield well above short-term government bonds, with no equity beta drag pulling the NAV.',
      'Underperforms when <strong>CLO secondary-market liquidity dries up</strong>: even AAA tranches can be marked to crisis prices well below their theoretical default-adjusted value when institutional buyers step back. Favorable tape is an orderly credit market with active CLO issuance and functioning structured-product bids, not a seized syndicated loan market.',
    ],
    officialUrl: 'https://www.bromptongroup.com/product/brompton-wellington-square-aaa-clo-etf/',
    officialLabel: 'Brompton Funds (BAAA)',
  },

  rgbm: {
    yahooSymbol: 'RGBM.TO',
    hubCategoryId: 'return-stacked',
    badge: 'Return Stacked - 2x+',
    h1Title: 'RGBM.TO - Return Stacked® Global Balanced & Macro ETF',
    displayTicker: 'RGBM / RGBM.U',
    issuer: 'LongPoint / Return Stacked® ETFs Canada',
    inception: 'Feb 2025',
    addedToSite: '2026-04-17',
    structure: 'Return-stacked balanced + macro alternatives',
    capitalBucketExposurePct: 100,
    alphaBucketExposurePct: 100,
    mer: '0.85% + perf fee',
    aum: '~$33M CAD',
    pageTitle: 'RGBM.TO ETF - Alpha Stacking',
    description: 'Return Stacked® Global Balanced & Macro ETF (RGBM.TO), Canadian listing.',
    contentFormat: 'html',
    lede:
      'RGBM stacks a global balanced sleeve with a systematic macro sleeve: roughly a dollar of each type of exposure per dollar invested, via leverage and derivatives.',
    strategyParas: [
      'RGBM stacks a global balanced core (equities and investment-grade-style fixed income) with a systematic managed-futures book across rates, FX, and commodities. Capital efficiency comes from derivatives, so margin and leverage caps are central to understanding the return profile.',
      'The fund uses leverage and short positions in the macro sleeve. In stress, CAD versus USD exposure and exchange limits on futures both affect outcomes.',
    ],
    pedigreeParas: ped(
      `Return Stacked® Canada inherits the same intellectual lineage as the U.S. line (ReSolve / Newfound-style capital-efficiency research packaged for TSX investors via LongPoint as manager): narrow franchise, purpose-built slides, and advisor education rather than bank-branch distribution.`,
      `Sponsor scale is modest next to RBC iShares or BMO, but that keeps the product honest about capacity: you are buying a sleeve built for stacking, not a closet indexer with a macro sticker.`,
    ),
    outperfParas: [
      'Outperforms when global balanced beta grinds while futures sleeves harvest <strong>independent trends</strong>: dollar cycles, curve steepeners, or commodity shocks that do not move global equities in lockstep.',
      'Underperforms when <strong>correlations spike</strong> and both sleeves de-risk into the same liquidity hole; favorable tape is persistent macro trends with functioning futures markets, not simultaneous crashes in stocks and bonds with vol targeting cutting exposure late.',
    ],
    officialUrl: 'https://returnstackedetfs.ca/rgbm-global-balanced-macro-etf/',
    officialLabel: 'Return Stacked ETFs Canada (RGBM)',
  },

  onec: {
    yahooSymbol: 'ONEC.TO',
    hubCategoryId: 'premia-systematic-alternatives',
    badge: 'Premia and systematic alternatives',
    h1Title: 'ONEC.TO - Accelerate OneChoice Alternative Multi-Asset Fund',
    displayTicker: 'ONEC',
    issuer: 'Accelerate Financial Technologies',
    inception: 'Jan 27, 2021',
    addedToSite: '2026-04-17',
    structure: 'Multi-asset alternatives fund-of-funds',
    mer: '~1.2%',
    aum: '~$95M CAD',
    pageTitle: 'ONEC.TO ETF - Alpha Stacking',
    description: 'Accelerate OneChoice Alternative Multi-Asset Fund (ONEC.TO).',
    contentFormat: 'html',
    lede:
      'ONEC is a single-ticket multi-alternative sleeve: credit, macro, long/short equity, and real-asset exposures in one fund.',
    strategyParas: [
      'ONEC is a fund-of-alternatives: sleeves span credit, macro, long/short equity, and real assets. The 0.20% management fee is the wrapper cost; the underlying funds carry their own fees. *Fee note: 0.20% management fee, plus the fees of the underlying ETFs/funds it holds.',
      'Because sleeves can share macro sensitivities, “diversified alts” can still correlate in CAD risk-off episodes. Modeling simultaneous equity, credit, and liquidity shocks gives a more realistic stress picture than assuming negative TSX beta.',
    ],
    pedigreeParas: fb.ACCELERATE_FINANCIAL_TECHNOLOGIES_PEDIGREE_PARAS_HTML,
    outperfParas: [
      'Outperforms when <strong>at least one sleeve is clearly earning</strong>: credit dislocation trades, macro trends, or long/short dispersion, while others tread water, so the blended correlation to 60/40 actually falls.',
      'Underperforms when every alt sleeve faces <strong>hostile funding markets</strong> at once; favorable tape is rich dispersion with functioning leverage in underlyings, not synchronized deleveraging.',
    ],
    officialUrl: 'https://accelerateshares.com/investment-solutions/onec/',
    officialLabel: 'Accelerate (ONEC)',
  },

  pfaa: {
    yahooSymbol: 'PFAA.TO',
    hubCategoryId: 'premia-systematic-alternatives',
    badge: 'Premia and systematic alternatives',
    h1Title: 'PFAA.TO - Picton Mahoney Multi-Strategy Alpha Alternative Fund ETF',
    displayTicker: 'PFAA',
    issuer: 'Picton Mahoney',
    inception: 'May 3, 2022',
    addedToSite: '2026-04-17',
    structure: 'Multi-strategy alpha alternatives',
    mer: '0.95% + perf fee',
    aum: '~$78M CAD',
    pageTitle: 'PFAA.TO ETF - Alpha Stacking',
    description: 'Picton Mahoney multi-strategy alpha alternatives ETF (PFAA.TO).',
    contentFormat: 'html',
    lede:
      'PFAA packages Picton Mahoney’s multi-strategy alpha process (long/short, relative value, and macro sleeves) in an ETF structure.',
    strategyParas: [
      'PFAA is Picton’s multi-strat sleeve in ETF form: internal capital rotates between long/short equity, relative-value credit, and macro books as risk budgets change, so monthly factsheets matter more than a one-page marketing summary.',
      'Performance fees and higher MER stacks versus plain beta are explicit tradeoffs; compare net-of-fee outcomes to owning separate Picton sleeves if you care about fee attribution. *Fee note: 0.95% management fee plus 20% performance fee above a 2% hurdle rate.',
    ],
    pedigreeParas: fb.PICTON_MAHONEY_PEDIGREE_PARAS_HTML,
    outperfParas: [
      'Outperforms when <strong>sleeves diversify each other</strong>: macro trends paying while equity long/short harvests dispersion, or credit RV working while equities chop.',
      'Underperforms when <strong>every sleeve pays for the same macro shock</strong> (liquidity, leverage, correlation to one); favorable tape is at least one clean trend or spread environment, not universal calm.',
    ],
    officialUrl:
      'https://casl.pictonmahoney.com/en/Solutions/Fortified-Alternative-Funds-Solutions.aspx',
    officialLabel: 'Picton Mahoney (Fortified alternatives, PFAA)',
  },

  pmm: {
    yahooSymbol: 'PMM.TO',
    betaBenchmarkSymbol: 'XSP.TO',
    hubCategoryId: 'premia-systematic-alternatives',
    badge: 'Premia and systematic alternatives',
    h1Title: 'PMM.TO - Purpose Multi-Strategy Market Neutral Fund',
    displayTicker: 'PMM',
    issuer: 'Purpose Investments',
    inception: 'c. 2014',
    addedToSite: '2026-05-20',
    structure: 'Systematic multi-asset market neutral (long/short)',
    mer: '0.95%',
    aum: '$8M CAD',
    pageTitle: 'PMM.TO ETF - Alpha Stacking',
    description: 'Purpose Multi-Strategy Market Neutral Fund (PMM.TO): systematic long/short across equity, FX, rates, and commodities.',
    contentFormat: 'html',
    lede:
      'PMM is a systematic <strong>market-neutral</strong> fund that runs long/short positions across equities, currencies, commodities, and interest rates, targeting value, carry, and momentum premia with no net directional bias.',
    strategyParas: [
      'Sub-advised by Neuberger Berman Canada (PM: Frank Maeba), PMM uses quantitative signal selection to go long and short across four asset classes simultaneously. The portfolio targets factor premia (value, carry, momentum) in each market independently, which means exposure is diversified by signal type and asset class rather than by geography or sector.',
      'Because the fund is designed to be market-direction independent, it carries less equity beta than most long/short funds. No performance fee is charged, which is unusual in this category. At roughly $8M CAD AUM and low secondary-market volume, use limit orders and check the bid/ask spread before trading — the underlying strategy is sound but the wrapper is illiquid.',
    ],
    pedigreeParas: ped(
      `Purpose Investments is a Canadian ETF innovator with a broad lineup of alternatives and thematic strategies. For PMM, the active management is delegated to Neuberger Berman Canada, the domestic arm of Neuberger Berman, a firm founded in 1939 that manages approximately $460 billion USD globally across equities, fixed income, and alternatives.`,
      `Frank Maeba leads the Canadian systematic strategies team at Neuberger Berman Canada. The no-performance-fee structure and daily liquidity are deliberate design choices, positioning PMM closer to a rules-based factor product than a hedge fund in a wrapper.`,
    ),
    outperfParas: [
      'Outperforms when <strong>factor premia are wide and persistent</strong> across multiple asset classes simultaneously: value spreads in equities, carry in FX, trend in commodities, and momentum in rates all paying at once creates the ideal diversified signal environment.',
      'Underperforms in <strong>synchronised factor drawdowns</strong> when risk-off liquidity events compress spreads across all signals at the same time; favorable tape is a divergent macro environment with genuine cross-asset dispersion, not a single correlated shock.',
    ],
    officialUrl: 'https://www.purposeinvest.com/funds/purpose-multi-strategy-market-neutral-fund',
    officialLabel: 'Purpose Investments (PMM)',
  },

  pfae: {
    yahooSymbol: 'PFAE.TO',
    betaBenchmarkSymbol: 'XSP.TO',
    hubCategoryId: 'long-short',
    badge: 'Long/short',
    h1Title: 'PFAE.TO - PICTON Long Short Equity (130/30) Alternative Fund ETF',
    displayTicker: 'PFAE',
    issuer: 'Picton Mahoney Asset Management',
    inception: 'Jul 16, 2019',
    addedToSite: '2026-05-05',
    structure: '130/30 Canadian long/short equity',
    mer: '0.95% + perf fee',
    aum: '~$36M CAD',
    pageTitle: 'PFAE.TO ETF - Alpha Stacking',
    description:
      'PICTON Long Short Equity (130/30) Alternative Fund ETF (PFAE.TO): active Canadian 130/30 long/short equity, ~100% net market exposure.',
    contentFormat: 'html',
    lede:
      'PFAE is a Canadian <strong>130% long / 30% short</strong> equity ETF: about <strong>100% net</strong> market exposure with extra long positions partly funded by a short book, in one listed fund from Picton Mahoney.',
    strategyParas: [
      'The fund runs an active extension on Canadian stocks: more long notional than a broad market core, with shorts to help fund it, while keeping net exposure close to a full equity allocation. Current limits, concentration, and fees are in the ETF Facts and prospectus on the issuer site.',
      'Shorting adds borrow cost, dividend effects, and squeeze risk when the market moves together. There is a management fee plus a performance fee above a hurdle. The chart on this page uses <strong>XSP.TO</strong> (CAD-hedged S&amp;P 500) only as a beta benchmark, not as a match for Canadian stock selection.',
    ],
    pedigreeParas: fb.PICTON_MAHONEY_PEDIGREE_PARAS_HTML,
    outperfParas: [
      'Outperforms when <strong>TSX dispersion rewards stock picking</strong>: longs and shorts diverge on earnings quality and balance-sheet strength while net exposure stays near full equity.',
      'Underperforms when <strong>macro shocks line up Canadian betas</strong> and shorts get expensive or crowded, or when <strong>short squeezes</strong> lift heavily shorted names. Favorable tape is orderly credit, workable borrow, and leadership spreads between sectors, not a single-theme melt-up.',
    ],
    officialUrl:
      'https://casl.pictonmahoney.com/en/Solutions/Fortified-Alternative-Funds-Solutions.aspx',
    officialLabel: 'Picton Mahoney (PFAE)',
    efficiency: {
      capital: {
        tooltip: capitalEfficiencyTooltip(
          'PFAE targets a 130% long / 30% short Canadian equity book with roughly full-market net exposure. The capital line scores that sleeve versus a CAD-hedged S&P 500 proxy (XSP.TO) under the site framework.'
        ),
      },
    },
  },

  zlb: {
    yahooSymbol: 'ZLB.TO',
    betaBenchmarkSymbol: 'XSP.TO',
    hubCategoryId: 'factor',
    badge: 'Factor',
    h1Title: 'ZLB.TO - BMO Low Volatility Canadian Equity ETF',
    displayTicker: 'ZLB',
    issuer: 'BMO Asset Management',
    inception: 'Oct 2011',
    addedToSite: '2026-04-17',
    mer: '0.35%',
    aum: '~$5.9B CAD',
    pageTitle: 'ZLB.TO ETF - Alpha Stacking',
    description: 'BMO Low Volatility Canadian Equity ETF (ZLB.TO).',
    contentFormat: 'html',
    lede:
      'ZLB is a Canadian <strong>value and defensive equity</strong> sleeve: a rules-based portfolio of TSX names selected for low historical volatility, which in practice means cheaper, cash-generative businesses (banks, utilities, staples) rather than the index\'s resource and momentum leadership.',
    strategyParas: [
      'BMO\'s index ranks TSX-listed stocks for historical beta and volatility, then weights toward the calmer cohort. The result is a structural tilt toward regulated utilities, staples, and large financials, sectors that trade on dividend yield and book value rather than growth multiples, which is the same set of names a value screen tends to surface.',
      'This value/defensive tilt underperforms speculative TSX rallies where small-cap resource names squeeze; read methodology for sector caps and rebalance frequency to understand turnover.',
    ],
    pedigreeParas: ped(
      `BMO ETFs are among Canada's largest third-party issuers; ZLB's ~$6B scale means tight spreads, deep creation/redemption, and index governance backed by a major bank balance sheet.`,
      `BMO Financial Group reported company-wide AUM of about CDN $507 billion at Oct. 31, 2025. That is bank-scale infrastructure behind a factor sleeve that still behaves differently than BMO's cap-weight flagship products.`,
    ),
    outperfParas: [
      'Outperforms when <strong>investors rotate into cheap, cash-generative names</strong>: defensives and value lead during TSX ranges, credit worries, or late-cycle rotations out of high-beta commodity exposure.',
      'Underperforms in <strong>commodity or liquidity rallies</strong> where growth and resource beta are rewarded over book value; favorable tape is value leadership or risk-off tone, not every cyclical upswing.',
    ],
    officialUrl:
      'https://www.bmoetfs.ca/etfs/zlb-bmo-low-volatility-canadian-equity-etf',
    officialLabel: 'BMO ETFs (ZLB)',
  },

  fcmo: {
    yahooSymbol: 'FCMO.TO',
    betaBenchmarkSymbol: 'XSP.TO',
    hubCategoryId: 'factor',
    badge: 'Factor',
    h1Title: 'FCMO.TO - Fidelity U.S. Momentum ETF',
    displayTicker: 'FCMO / FCMO-U',
    issuer: 'Fidelity Investments Canada',
    inception: 'Jun 5, 2020',
    addedToSite: '2026-05-20',
    structure: 'Rules-based U.S. large-cap momentum factor',
    mer: '0.38%',
    aum: '~$2.2B CAD',
    pageTitle: 'FCMO.TO ETF - Alpha Stacking',
    description: 'Fidelity U.S. Momentum ETF (FCMO.TO): single-factor U.S. equity momentum in a Canadian-listed wrapper.',
    contentFormat: 'html',
    lede:
      'FCMO tracks the Fidelity Canada U.S. Momentum Index: a rules-based, <strong>single-factor</strong> sleeve that tilts a 100-stock portfolio toward U.S. large caps exhibiting strong positive momentum signals, rebalanced quarterly.',
    strategyParas: [
      'The index selects and weights U.S. large-cap names scoring highest on proprietary momentum signals developed by Fidelity Product Services. Quarterly rebalancing captures medium-term trend persistence while limiting turnover; at 100 holdings the portfolio is concentrated enough that sector-level momentum tilts dominate cap-weight differences.',
      'Momentum factor funds rotate hard when leadership shifts: expect above-average concentration in whatever sector drove the prior quarter, plus sharp reversals when macro catalysts cause rapid re-rankings. Geode Capital Management (sub-advisor) runs the index implementation with its $1.9 trillion systematic execution infrastructure.',
    ],
    pedigreeParas: ped(
      `Fidelity Investments Canada is the domestic arm of Fidelity, one of the world's largest privately held asset managers. Fidelity Canada manages around $380 billion (April 2026), giving it institutional distribution reach and deep ETF operational infrastructure in the Canadian market.`,
      `The portfolio manager is Geode Capital Management, the systematic asset manager spun out of Fidelity in 2001 that now manages $1.9 trillion in AUM (March 2026) across equity indices, options, and systematic strategies. Geode's mandate here is efficient index implementation, not discretionary stock selection.`,
    ),
    outperfParas: [
      'Outperforms when <strong>price trends persist</strong> across U.S. equity sectors: strong-momentum names keep outrunning laggards through earnings cycles and macro follow-through, particularly in trending tech or energy leadership environments.',
      'Underperforms in <strong>sharp reversals or factor rotations</strong> where last quarter\'s leaders become this quarter\'s crowded exits; favorable tape is one-directional sector leadership, not the abrupt rotation where momentum\'s exposure becomes its biggest liability.',
    ],
    officialUrl: 'https://www.fidelity.ca/en/products/etfs/fcmo/',
    officialLabel: 'Fidelity Canada (FCMO)',
  },

  fccm: {
    yahooSymbol: 'FCCM.TO',
    betaBenchmarkSymbol: 'XSP.TO',
    hubCategoryId: 'factor',
    badge: 'Factor',
    h1Title: 'FCCM.TO - Fidelity Canadian Momentum ETF',
    displayTicker: 'FCCM / FCCM-U',
    issuer: 'Fidelity Investments Canada',
    inception: 'Jun 5, 2020',
    addedToSite: '2026-05-20',
    structure: 'Rules-based Canadian large-cap momentum factor',
    mer: '0.38%',
    aum: '~$1.1B CAD',
    pageTitle: 'FCCM.TO ETF - Alpha Stacking',
    description: 'Fidelity Canadian Momentum ETF (FCCM.TO): single-factor Canadian equity momentum in a listed wrapper.',
    contentFormat: 'html',
    lede:
      'FCCM tracks the Fidelity Canada Canadian Momentum Index: a rules-based, <strong>single-factor</strong> sleeve of 100 Canadian large-cap names ranked on positive momentum signals, rebalanced quarterly.',
    strategyParas: [
      'The index selects stocks from the Canadian large-cap universe scoring highest on proprietary momentum signals developed by Fidelity Product Services. Quarterly rebalancing aims to capture medium-term trend persistence while managing turnover. At 100 holdings the portfolio is concentrated enough that sector-level leadership tilts dominate any individual stock moves.',
      'Momentum is a self-correcting factor: it tends to work until it doesn\'t, and rotations in Canadian equity (from energy to financials, or resources to industrials) can flip the portfolio\'s sector weight sharply at each rebalance. <strong>Note:</strong> Yahoo Finance data for FCCM.TO begins April 2024; the on-page chart reflects partial history. Full returns since the June 2020 inception are at Fidelity Canada.',
    ],
    pedigreeParas: ped(
      `Fidelity Investments Canada manages around $380 billion CAD (April 2026), giving it institutional distribution and operational depth. The FCCM index is proprietary to Fidelity Product Services, so index methodology is disclosed in prospectus and ETF Facts documents rather than a third-party provider.`,
      `Portfolio management is delegated to Geode Capital Management, the systematic manager Fidelity spun out in 2001 and which now runs $1.9 trillion (March 2026) across equity indices and systematic strategies. Geode's mandate is efficient implementation, not active stock selection.`,
    ),
    outperfParas: [
      'Outperforms when <strong>Canadian equity sector leadership persists</strong> quarter over quarter: resource rallies that compound, financial sector runs, or industrial cycles where winners keep winning into the next rebalance.',
      'Underperforms when <strong>sector leadership reverses abruptly</strong>, crowding last quarter\'s winners into this quarter\'s exits; favorable tape is one-directional domestic leadership with follow-through, not the sudden rotation where prior momentum becomes concentrated risk.',
    ],
    officialUrl: 'https://www.fidelity.ca/en/products/etfs/fccm/',
    officialLabel: 'Fidelity Canada (FCCM)',
  },

  atsx: {
    yahooSymbol: 'ATSX.TO',
    betaBenchmarkSymbol: 'XSP.TO',
    hubCategoryId: 'long-short',
    badge: 'Long/short',
    h1Title: 'ATSX.TO - Accelerate Canadian Long Short Equity Fund',
    displayTicker: 'ATSX',
    issuer: 'Accelerate Financial Technologies',
    inception: 'May 10, 2019',
    addedToSite: '2026-04-17',
    structure: 'Quantitative long/short equity (150/50)',
    mer: '0.00% + perf fee',
    aum: '~$42M CAD',
    pageTitle: 'ATSX.TO ETF - Alpha Stacking',
    description: 'Accelerate Canadian Long Short Equity Fund (ATSX.TO).',
    contentFormat: 'html',
    lede:
      'ATSX runs a quantitative 150/50 Canadian long/short sleeve vs. the S&P/TSX 60, with directional hedge-fund-style exposure in an ETF.',
    strategyParas: [
      'The fund runs about 150% long and 50% short versus S&P/TSX 60 names. Systematic signals pick leaders and laggards inside the benchmark, so factor tilts can cluster in banks, energy, and rails when the model chases the same macro environment.',
      'Leverage magnifies both alpha and model error; verify current gross/net in ETF Facts because a 150/50 template still carries meaningful equity beta through the long sleeve. *Fee note: 0% management fee; performance fee is 50% of outperformance above the S&P/TSX 60 index.',
    ],
    pedigreeParas: fb.ACCELERATE_FINANCIAL_TECHNOLOGIES_PEDIGREE_PARAS_HTML,
    outperfParas: [
      'Outperforms when <strong>TSX60 dispersion is high</strong>: stock-specific earnings revisions matter more than WTI alone, and factor signals cleanly separate quality from junk inside the benchmark.',
      'Underperforms when everything trades as <strong>one macro beta</strong> (commodity + rates shock) and short books pay borrow while longs re-rate down together, or when <strong>short squeezes</strong> hit names the model is short.',
    ],
    officialUrl: 'https://accelerateshares.com/investment-solutions/atsx/',
    officialLabel: 'Accelerate (ATSX)',
  },

  pfls: {
    yahooSymbol: 'PFLS.TO',
    hubCategoryId: 'long-short',
    badge: 'Long/short',
    h1Title: 'PFLS.TO - Picton Mahoney Fortified Long Short Alternative Fund ETF',
    displayTicker: 'PFLS',
    issuer: 'Picton Mahoney',
    inception: 'Jul 15, 2020',
    addedToSite: '2026-04-17',
    structure: 'Global long/short equity alternatives',
    mer: '0.95% + perf fee',
    aum: '~$62M CAD',
    pageTitle: 'PFLS.TO ETF - Alpha Stacking',
    description: 'Picton Mahoney Fortified Long Short Alternative Fund ETF (PFLS.TO).',
    contentFormat: 'html',
    lede:
      'Global long/short equity with moderate net exposure from Picton: Fortified risk budgeting in an ETF wrapper.',
    strategyParas: [
      'Long book leans resilient growers and quality cyclicals; shorts fund factor and single-name hedges. You keep meaningful equity risk, just damped next to 100% long TSX or ACWI.',
      'Global book means FX and session risk. Check the docs for how much USD/EUR is hedged back to CAD. *Fee note: 0.95% management fee plus 20% performance fee above a 2% hurdle rate.',
    ],
    pedigreeParas: fb.PICTON_MAHONEY_PEDIGREE_PARAS_HTML,
    outperfParas: [
      'Outperforms when <strong>pair trades earn</strong> and macro stress punishes plain long equity, with enough dispersion between sectors and names that balance-sheet work pays in calm credit.',
      'Underperforms in <strong>correlation spikes</strong> where shorts and longs re-rate together, or when <strong>short squeezes</strong> punish crowded shorts. Favorable tape is dispersion-rich global equities, not single-factor melt-ups.',
    ],
    officialUrl:
      'https://casl.pictonmahoney.com/en/Solutions/Fortified-Alternative-Funds-Solutions.aspx',
    officialLabel: 'Picton Mahoney (Fortified alternatives, PFLS)',
  },

  tgaf: {
    yahooSymbol: 'TGAF.TO',
    hubCategoryId: 'long-short',
    badge: 'Long/short',
    h1Title: 'TGAF.TO - Tralucent Global Alt (Long/Short) Equity Fund ETF',
    displayTicker: 'TGAF',
    issuer: 'Tralucent Asset Management',
    inception: 'Nov 2023',
    addedToSite: '2026-04-17',
    structure: 'Global long/short equity alternatives',
    mer: '1.0%',
    aum: '~$75M+ CAD',
    pageTitle: 'TGAF.TO ETF - Alpha Stacking',
    description: 'Tralucent Global Alt (Long/Short) Equity Fund ETF (TGAF.TO).',
    contentFormat: 'html',
    lede:
      'TGAF is a global long/short equity ETF, roughly 100% long and ~40% short across 200+ names, benchmarked to MSCI ACWI NR (CAD).',
    strategyParas: [
      'TGAF runs a diversified global book: bottom-up longs across regions, shorts funding factor and single-name hedges, with room for options per alternative-fund rules. Gross near 140% notional is intentional engineering, not accidental drift.',
      'Because TGAF is Class E of a pooled trust that also has mutual fund series, flows in those channels can affect cash balances and transaction costs for ETF unitholders.',
    ],
    pedigreeParas: ped(
      `TGAF’s ETF units are Class E of the same long/short pooled trust Tralucent has run since March 2020. OM, mutual-fund, and ETF series sit on one portfolio, not a parallel book with a different sleeve.`,
      `Launch materials cited ~$55M as <strong>firm</strong> AUM, not this fund’s NAV. All unit classes share one book; use Fund Facts or statements for today’s size.`,
    ),
    outperfParas: [
      'Outperforms when <strong>global dispersion is wide enough</strong> that a 200-name book can short crowded winners and buy neglected quality without every leg sharing the same macro beta.',
      'Underperforms when <strong>every region sells off together</strong>, overwhelming stock picking, or when <strong>short squeezes</strong> lift crowded shorts. Favorable tape is idiosyncratic earnings cycles with functioning short locates, not synchronized central-bank hiking.',
    ],
    officialUrl: 'https://tralucent.ca/about-the-etf/',
    officialLabel: 'Tralucent (TGAF)',
  },

  dglm: {
    yahooSymbol: 'DGLM.TO',
    hubCategoryId: 'global-macro',
    badge: 'Global macro',
    h1Title: 'DGLM.TO - Desjardins Global Macro ETF',
    displayTicker: 'DGLM',
    issuer: 'Desjardins Global Asset Management',
    inception: 'Aug 28, 2025',
    addedToSite: '2026-04-17',
    structure: 'Systematic global macro alternatives',
    mer: '0.9%',
    aum: '~$32M CAD',
    pageTitle: 'DGLM.TO ETF - Alpha Stacking',
    description: 'Desjardins Global Macro ETF (DGLM.TO).',
    contentFormat: 'html',
    lede:
      'Desjardins lists it; Graham Capital runs the systematic global-macro book across equities, rates, commodities, and currencies.',
    strategyParas: [
      'Futures and forwards across rates, FX, commodities, and some equity beta. Weights can swing month to month as signals change.',
      'The fund uses leverage and shorts on macro instruments. Exposure bands and default hedging shift with the model.',
    ],
    pedigreeParas: ped(
      `Desjardins Global Asset Management sits inside one of Canada’s largest cooperative groups; Desjardins Group reported about $123 billion in AUM at Dec. 31, 2025. That is real ops muscle behind a small listed sleeve.`,
      `Graham is a Connecticut macro/CTA shop. You get that research engine on a TSX ticker, with Desjardins as manager and Graham as sub-adviser.`,
    ),
    outperfParas: [
      'Outperforms when <strong>macro variables diverge</strong>: curve steepeners, dollar trends, commodity shocks, with enough persistence that systematic sleeves earn after fees.',
      'Underperforms in <strong>whipsaw macro</strong> where signals flip quickly; favorable tape is clean trends with liquid futures, not single-meeting Fed reversals.',
    ],
    officialUrl: 'https://www.fondsdesjardins.com/etf/global-macro/',
    officialLabel: 'Desjardins (DGLM)',
  },

  btccb: {
    yahooSymbol: 'BTCC-B.TO',
    hubCategoryId: 'crypto',
    badge: 'Crypto & digital assets',
    h1Title: 'BTCC-B.TO - Purpose Bitcoin ETF',
    displayTicker: 'BTCC.B',
    issuer: 'Purpose Investments',
    inception: 'Feb 2021',
    addedToSite: '2026-04-17',
    structure: 'Spot Bitcoin',
    mer: '1.0%',
    aum: '~$1.5B+ CAD',
    pageTitle: 'BTCC-B.TO ETF - Alpha Stacking',
    description: 'Purpose Bitcoin ETF, CAD unhedged units (BTCC-B.TO): physically settled spot Bitcoin.',
    contentFormat: 'html',
    lede:
      'BTCC-B is Purpose’s CAD unhedged unit class of the first Canadian spot Bitcoin ETF: direct Bitcoin custody in cold storage, priced in Canadian dollars.',
    strategyParas: [
      'BTCC-B holds spot BTC with standard custodial procedures for Canadian crypto ETFs. Key risks are cold-storage operations, regulatory changes affecting crypto ETFs, and tracking differences when creation baskets include cash or proxies.',
      'CAD unhedged means your P&L mixes bitcoin beta with CAD/USD moves versus a globally USD-priced coin. Compare to Purpose’s USD unit class if you want cleaner USD BTC exposure from Canada.',
    ],
    pedigreeParas: ped(
      `Purpose listed Canada’s first spot bitcoin ETF; BTCC still clears size with real custodians, not a garage experiment.`,
      `Independent of the big banks: faster product moves, fewer implicit balance-sheet backstops. Re-read custodian and insurance lines when they update filings.`,
    ),
    outperfParas: [
      'Outperforms in a full <strong>bitcoin liquidity cycle</strong>: halving narratives, ETF inflows, handoffs from tight macro into risk-on, when system leverage is tame and futures basis behaves.',
      'Underperforms at equity-crash severity when <strong>macro and crypto leverage unwind together</strong>; favorable tape is sustained bid for BTC with functioning banking rails, not every speculative rip.',
    ],
    officialUrl: 'https://www.purposeinvest.com/funds/purpose-bitcoin-etf',
    officialLabel: 'Purpose Investments',
  },

  hsu: {
    yahooSymbol: 'HSU.TO',
    betaBenchmarkSymbol: 'SPY',
    hubCategoryId: 'leveraged-equity',
    badge: 'Leveraged equity ETFs (advanced)',
    h1Title: 'HSU.TO - BetaPro S&P 500 2x Daily Bull ETF',
    displayTicker: 'HSU',
    issuer: 'Global X Investments Canada',
    inception: 'Jun 17, 2008',
    addedToSite: '2026-04-25',
    structure: '2x daily S&P 500 leverage',
    mer: '1.50%',
    aum: '~$170M CAD',
    pageTitle: 'HSU.TO ETF - Alpha Stacking',
    description: 'BetaPro S&P 500 2x Daily Bull ETF (HSU.TO).',
    contentFormat: 'html',
    lede:
      'HSU is Global X Canada’s daily-reset leveraged S&P 500 sleeve, targeting about 2x the index’s one-day move before fees and hedging costs.',
    strategyParas: [
      'HSU uses derivatives and financing tools to target roughly 200% of the S&P 500 on a daily basis. The daily reset matters: multi-day outcomes can diverge materially from 2x simple index return, especially in volatile, mean-reverting tape.',
      'The fund is CAD listed and historically includes currency-hedging mechanics in its structure; compounding drag, financing spread, and path dependence are the core drivers to monitor versus a plain broad-market ETF.',
    ],
    pedigreeParas: fb.GLOBAL_X_INVESTMENTS_CANADA_PEDIGREE_PARAS_HTML,
    outperfParas: [
      'Outperforms in <strong>persistent uptrends with contained volatility</strong>, when daily compounding can reinforce directional gains and 2x exposure captures strong beta environments.',
      'Underperforms in <strong>choppy, high-volatility ranges</strong> because path dependence and volatility drag accumulate quickly.',
    ],
    officialUrl: 'https://www.globalx.ca/product/HSU',
    officialLabel: 'Global X Canada (HSU)',
  },

  hqu: {
    yahooSymbol: 'HQU.TO',
    betaBenchmarkSymbol: 'QQQ',
    hubCategoryId: 'leveraged-equity',
    badge: 'Leveraged equity ETFs (advanced)',
    h1Title: 'HQU.TO - BetaPro NASDAQ-100 2x Daily Bull ETF',
    displayTicker: 'HQU',
    issuer: 'Global X Investments Canada',
    inception: 'Jan 8, 2010',
    addedToSite: '2026-04-25',
    structure: '2x daily Nasdaq-100 leverage',
    mer: '1.44%',
    aum: '~$400M CAD',
    pageTitle: 'HQU.TO ETF - Alpha Stacking',
    description: 'BetaPro NASDAQ-100 2x Daily Bull ETF (HQU.TO).',
    contentFormat: 'html',
    lede:
      'HQU is a daily-reset 2x Nasdaq-100 exposure sleeve in Canada, designed for tactical growth-beta positioning rather than long-horizon buy-and-hold allocation.',
    strategyParas: [
      'The fund aims for roughly two times the NASDAQ-100 daily return before fees. As with all daily leveraged ETFs, realized multi-day performance depends on sequence of returns, volatility, and rebalance math, not just start-to-end index change.',
      'Because the index is tech-heavy and duration-sensitive, HQU’s risk profile is tightly linked to rates environment, mega-cap concentration, and momentum persistence. Position sizing and holding period discipline matter more than ticker selection alone.',
    ],
    pedigreeParas: fb.GLOBAL_X_INVESTMENTS_CANADA_PEDIGREE_PARAS_HTML,
    outperfParas: [
      'Outperforms in <strong>sustained risk-on growth phases</strong> where Nasdaq leadership is broad enough to offset daily leverage costs and volatility stays manageable.',
      'Underperforms in <strong>violent rotations and chop</strong>, where reversal-driven compounding drag can erode returns quickly.',
    ],
    officialUrl: 'https://www.globalx.ca/product/hqu',
    officialLabel: 'Global X Canada (HQU)',
  },

  ussl: {
    yahooSymbol: 'USSL.TO',
    betaBenchmarkSymbol: 'SPY',
    hubCategoryId: 'leveraged-equity',
    badge: 'Leveraged equity ETFs (advanced)',
    h1Title: 'USSL.TO - Global X Enhanced S&P 500 Index ETF',
    displayTicker: 'USSL',
    issuer: 'Global X Investments Canada',
    inception: 'May 21, 2024',
    addedToSite: '2026-04-25',
    structure: '1.25x S&P 500 enhanced beta',
    mer: '0.50%',
    aum: '~$250M CAD',
    pageTitle: 'USSL.TO ETF - Alpha Stacking',
    description: 'Global X Enhanced S&P 500 Index ETF (USSL.TO).',
    contentFormat: 'html',
    lede:
      'USSL targets roughly 1.25x S&P 500 exposure in a Canadian-listed wrapper, aiming for enhanced beta with lower leverage than classic 2x daily products.',
    strategyParas: [
      'USSL uses leverage tools to target about 125% of S&P 500 performance, net of expenses. The lower multiplier reduces volatility drag versus 2x products, but compounding effects still matter.',
      'Investors should still treat it as a leveraged instrument: financing cost, path dependence, and market-gap risk remain central. It sits between plain beta and high-octane tactical leverage in the implementation spectrum.',
    ],
    pedigreeParas: fb.GLOBAL_X_INVESTMENTS_CANADA_PEDIGREE_PARAS_HTML,
    outperfParas: [
      'Outperforms in <strong>steady equity uptrends</strong> where enhanced beta compounds with limited volatility interruption, giving a cleaner participation profile than 2x leverage.',
      'Underperforms in sideways chop and <strong>abrupt drawdowns</strong> that damage realized compounding.',
    ],
    officialUrl: 'https://www.globalx.ca/product/ussl',
    officialLabel: 'Global X Canada (USSL)',
  },

  qqql: {
    yahooSymbol: 'QQQL.TO',
    betaBenchmarkSymbol: 'QQQ',
    hubCategoryId: 'leveraged-equity',
    badge: 'Leveraged equity ETFs (advanced)',
    h1Title: 'QQQL.TO - Global X Enhanced NASDAQ-100 Index ETF',
    displayTicker: 'QQQL',
    issuer: 'Global X Investments Canada',
    inception: 'May 21, 2024',
    addedToSite: '2026-04-25',
    structure: '1.25x Nasdaq-100 enhanced beta',
    mer: '0.50%',
    aum: '~$180M CAD',
    pageTitle: 'QQQL.TO ETF - Alpha Stacking',
    description: 'Global X Enhanced NASDAQ-100 Index ETF (QQQL.TO).',
    contentFormat: 'html',
    lede:
      'QQQL is a Canadian-listed enhanced-beta Nasdaq sleeve targeting about 1.25x index exposure, positioned between plain QQQ-style beta and 2x daily leverage.',
    strategyParas: [
      'The product seeks to replicate approximately 125% of NASDAQ-100 performance using permitted leverage tools. That lower multiplier can be more implementation-friendly than 2x structures, but it is still path-dependent leveraged exposure.',
      'Given Nasdaq concentration, results are sensitive to mega-cap tech leadership, rates shocks, and momentum persistence. In practice, the main risk control is sizing and holding discipline, not the reduced leverage multiple alone.',
    ],
    pedigreeParas: fb.GLOBAL_X_INVESTMENTS_CANADA_PEDIGREE_PARAS_HTML,
    outperfParas: [
      'Outperforms when <strong>growth leadership trends persist</strong> and volatility remains moderate, allowing enhanced beta to compound on the right side of momentum.',
      'Underperforms fastest in <strong>reversal-heavy markets</strong> or sharp risk-off rotations out of mega-cap tech.',
    ],
    officialUrl: 'https://www.globalx.ca/product/qqql',
    officialLabel: 'Global X Canada (QQQL)',
  },

  heql: {
    yahooSymbol: 'HEQL.TO',
    hubCategoryId: 'leveraged-equity',
    badge: 'Leveraged equity ETFs (advanced)',
    h1Title: 'HEQL.TO - Global X Enhanced All-Equity Asset Allocation ETF',
    displayTicker: 'HEQL',
    issuer: 'Global X Investments Canada',
    inception: 'Oct 10, 2023',
    addedToSite: '2026-04-25',
    structure: '1.25x global all-equity allocation',
    mer: '0.45%',
    aum: '~$19M CAD',
    pageTitle: 'HEQL.TO ETF - Alpha Stacking',
    description: 'Global X Enhanced All-Equity Asset Allocation ETF (HEQL.TO).',
    contentFormat: 'html',
    lede:
      'HEQL is a Canadian-listed enhanced all-equity allocation sleeve that targets roughly 125% exposure to a diversified global equity mix through a fund-of-funds structure.',
    strategyParas: [
      'HEQL primarily holds diversified equity ETFs and employs cash borrowing to maintain a leverage ratio near 125%. It sits between plain all-equity beta and higher-volatility daily-reset leverage products.',
      'Because the fund is a leveraged fund-of-funds, realized outcomes depend on underlying regional allocations, financing cost, and equity volatility path. Monthly distributions and rebalancing inside underlying sleeves can also shape return cadence relative to a single-index benchmark.',
    ],
    pedigreeParas: fb.GLOBAL_X_INVESTMENTS_CANADA_PEDIGREE_PARAS_HTML,
    outperfParas: [
      'Outperforms in <strong>steady, broad global equity uptrends</strong> where moderate leverage can compound without frequent volatility shocks. The structure is built to monetize persistent beta participation rather than short-term tactical timing.',
      'Underperforms in <strong>choppy, reversal-heavy markets</strong> where financing and compounding drag can erode excess return. Best conditions are durable risk-on tapes with healthy breadth across U.S., international, and emerging equity sleeves.',
    ],
    officialUrl: 'https://www.globalx.ca/product/heql',
    officialLabel: 'Global X Canada (HEQL)',
  },

  ethxb: {
    yahooSymbol: 'ETHX-B.TO',
    hubCategoryId: 'crypto',
    badge: 'Crypto & digital assets',
    h1Title: 'ETHX-B.TO - CI Galaxy Ethereum ETF',
    displayTicker: 'ETHX.B',
    issuer: 'CI Global Asset Management',
    inception: 'Apr 2021',
    addedToSite: '2026-04-17',
    structure: 'Spot Ether',
    mer: '0.7%',
    aum: '~$650M CAD',
    pageTitle: 'ETHX-B.TO ETF - Alpha Stacking',
    description: 'CI Galaxy Ethereum ETF, CAD unhedged units (ETHX-B.TO): physically settled spot Ether.',
    contentFormat: 'html',
    lede:
      'ETHX-B holds spot Ether in custody: CI and Galaxy’s Canadian-listed sleeve with a competitive fee versus many alt ETH wrappers.',
    strategyParas: [
      'ETHX-B is plain spot ETH in a regulated wrapper. Staking yield and restaking loops are generally not part of the portfolio until prospectuses explicitly allow them; your return is price plus frictions, not validator cash flows.',
      'Ether trades as a high-beta liquidity asset with protocol-specific catalysts (upgrade timelines, ETF flows, L2 competition); CAD unhedged units add FX noise versus globally USD-denominated spot references.',
    ],
    pedigreeParas: ped(
      `CI Global Asset Management is one of Canada’s largest ETF and mutual fund manufacturers; pairing with Galaxy Digital brings crypto-native trading and custody expertise into CI’s compliance and distribution machine.`,
      `CI Financial Corp. reporting gives consolidated scale, large enough for institutional custodians and tight primary markets on a ~$650M sleeve, even if crypto AUM is a fraction of CI’s total book.`,
    ),
    outperfParas: [
      'Outperforms when ETH captures <strong>speculative liquidity</strong> plus idiosyncratic upgrades, fee burns, L2 adoption, institutional on-chain narratives, without a simultaneous deleveraging in stablecoins or centralized venues.',
      'Underperforms at bitcoin-crash severity when <strong>funding markets break</strong>; favorable tape is orderly crypto credit with rising on-chain usage, not every macro risk-on day.',
    ],
    officialUrl: 'https://funds.cifinancial.com/en/funds/alternative_investments/CIGalaxyEthereumETF.html',
    officialLabel: 'CI Galaxy Ethereum ETF',
  },


  hdge: {
    yahooSymbol: 'HDGE.TO',
    hubCategoryId: 'long-short',
    badge: 'Long/short',
    h1Title: 'HDGE.TO - Accelerate Absolute Return Fund',
    displayTicker: 'HDGE / HDGE.U',
    issuer: 'Accelerate Financial Technologies Inc.',
    issuerRole: 'manager',
    inception: 'May 10, 2019',
    addedToSite: '2026-05-03',
    structure: 'Alternative (long/short equity)',
    mer: '3.95%',
    aum: '~$105M CAD',
    pageTitle: 'HDGE.TO ETF - Alpha Stacking',
    description:
      'Accelerate Absolute Return Fund (HDGE.TO): strategy, manager background, and long/short market environment context.',
    contentFormat: 'html',
    lede: fb.HDGE_LEDE_HTML,
    strategyParas: fb.HDGE_STRATEGY_PARAS_HTML,
    pedigreeParas: fb.HDGE_PEDIGREE_PARAS_HTML,
    outperfParas: fb.HDGE_OUTPERF_PARAS_HTML,
    officialUrl: 'https://accelerateshares.com/investment-solutions/hdge/',
    officialLabel: 'HDGE.TO official page',
    efficiency: {
      capital: {
        tooltip: capitalEfficiencyTooltip(
          'HDGE.TO is Accelerate’s quantitative long/short North American equity sleeve: ranked longs and shorts with material short exposure, scored like other long/short equity vehicles versus SPY net of costs.'
        ),
      },
    },
  },

  pfmn: {
    yahooSymbol: 'PFMN.TO',
    hubCategoryId: 'long-short',
    badge: 'Long/short',
    h1Title: 'PFMN.TO - Picton Mahoney Fortified Market Neutral Alternative Fund ETF',
    displayTicker: 'PFMN',
    issuer: 'Picton Mahoney Asset Management',
    issuerRole: 'manager',
    inception: 'July 16, 2019',
    addedToSite: '2026-05-03',
    mer: '1.25%',
    aum: '~$58M CAD',
    pageTitle: 'PFMN.TO ETF - Alpha Stacking',
    description:
      'Picton Mahoney Fortified Market Neutral Alternative Fund ETF (PFMN.TO): strategy, Picton pedigree, and environment context.',
    contentFormat: 'html',
    lede: fb.PFMN_LEDE_HTML,
    strategyParas: fb.PFMN_STRATEGY_PARAS_HTML,
    pedigreeParas: fb.PFMN_PEDIGREE_PARAS_HTML,
    outperfParas: fb.PFMN_OUTPERF_PARAS_HTML,
    officialUrl:
      'https://casl.pictonmahoney.com/en/Solutions/Fortified-Alternative-Funds-Solutions.aspx',
    officialLabel: 'Picton Mahoney (Fortified alternatives, PFMN)',
    efficiency: {
      capital: {
        tooltip: capitalEfficiencyTooltip(
          'PFMN.TO is Picton’s Fortified market-neutral long/short equity sleeve: paired longs and shorts designed for low net beta versus broad Canadian equities.'
        ),
      },
    },
  },

  arb: {
    yahooSymbol: 'ARB.TO',
    hubCategoryId: 'arbitrage',
    badge: 'Arbitrage',
    h1Title: 'ARB.TO - Accelerate Arbitrage Fund',
    displayTicker: 'ARB',
    issuer: 'Accelerate Financial Technologies Inc.',
    issuerRole: 'manager',
    inception: 'April 7, 2020',
    addedToSite: '2026-05-03',
    structure: 'Alternative (merger / SPAC arbitrage)',
    mer: '1.0%',
    aum: '~$195M CAD',
    pageTitle: 'ARB.TO ETF - Alpha Stacking',
    description:
      'Accelerate Arbitrage Fund (ARB.TO): merger arbitrage strategy, Accelerate pedigree, and deal-market context.',
    contentFormat: 'html',
    lede: fb.ARB_LEDE_HTML,
    strategyParas: fb.ARB_STRATEGY_PARAS_HTML,
    pedigreeParas: fb.ARB_PEDIGREE_PARAS_HTML,
    outperfParas: fb.ARB_OUTPERF_PARAS_HTML,
    officialUrl: 'https://accelerateshares.com/investment-solutions/arb/',
    officialLabel: 'ARB.TO official page',
    efficiency: {
      alpha: {
        tooltip: alphaEfficiencyUnstackedTooltip(
          'ARB.TO is Accelerate’s merger and SPAC arbitrage sleeve: deal-target longs with acquirer or related hedges, event-driven returns rather than broad equity beta.'
        ),
      },
    },
  },
}
