import {
  MATE_ALPHA_EFFICIENCY_TOOLTIP,
  MATE_CAPITAL_EFFICIENCY_TOOLTIP,
  MATE_EFFICIENCY_FOOTNOTE,
} from '@/components/usEtfPages/mateEfficiencyCopy'
import type { EtfDynamicDef } from '@/lib/etfDynamicRegistryTypes'
import * as fb from '@/lib/etfFeaturedRegistryBodies'
import {
  alphaEfficiencyStackedTooltip,
  alphaEfficiencyUnstackedTooltip,
  capitalEfficiencyTooltip,
} from '@/lib/etfEfficiencyTooltipFraming'
import { HFGM_ASGM_SYNTHETIC_ANNUAL_DRAG } from '@/lib/syntheticChartConstants'

const PED_VERIFY =
  'Verify fees, leverage or short limits, tax character, and current holdings on the issuer’s official ETF page and filings—this site is educational only, not a recommendation.'

function ped(...main: string[]): string[] {
  return [...main, PED_VERIFY]
}

const HFGM_PROXY_NOTE_HTML = `Model portfolio charts on this site extend HFGM before its first listed session using 1.5× ASGM (Virtus AlphaSimplex Global Macro) daily total returns minus ~${(HFGM_ASGM_SYNTHETIC_ANNUAL_DRAG * 100).toFixed(1)}% annual drag as a proxy; the chart above is HFGM-only (Yahoo adjusted close).`

export const US_ETF_FEATURED_PART: Record<string, EtfDynamicDef> = {
  mate: {
    yahooSymbol: 'MATE',
    hubCategoryId: 'return-stacked-ge-2x',
    badge: 'Return Stacked - 2x',
    h1Title: 'MATE — Man Active Trend Enhanced ETF',
    displayTicker: 'MATE',
    issuer: 'Man Group',
    inception: 'Dec 16, 2025',
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
        gradeTone: 'gold',
        tooltip: MATE_CAPITAL_EFFICIENCY_TOOLTIP,
      },
      alpha: { tooltip: MATE_ALPHA_EFFICIENCY_TOOLTIP },
      footnotes: [MATE_EFFICIENCY_FOOTNOTE],
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
          'RSSY targets roughly 100% notional large-cap U.S. equity (ETFs, futures, or combinations) alongside a parallel sleeve per Return Stacked® disclosures.'
        ),
      },
      alpha: {
        tooltip: alphaEfficiencyStackedTooltip(
          'The second sleeve is a quantitative futures-yield program—long and short futures across commodities, rates, currencies, and equity indices targeting roll and curve payoffs rather than pure directional beta.'
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
    capitalBucketExposurePct: 50,
    alphaBucketExposurePct: 100,
    mer: '1.00%',
    aum: '~$35M',
    pageTitle: 'HFGM ETF — Alpha Stacking',
    description:
      'Unlimited HFGM Global Macro ETF (HFGM): global macro replication, Unlimited pedigree, and regime context.',
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
          'HFGM includes an estimated ~50% S&P 500–style equity sleeve (futures and related exposure) alongside macro alternatives per Unlimited published holdings—capital efficiency scores that equity book versus SPY net of costs.'
        ),
      },
      alpha: {
        tooltip: alphaEfficiencyStackedTooltip(
          'The non-core sleeve is systematic global macro—rates, FX, commodities, and selective equity beta implemented with ETFs and listed futures to target hedge-fund Global Macro sector return patterns.'
        ),
      },
      notes: [
        'Sleeve split estimated from sponsor materials and published holdings. Grades updated when materially new data is available.',
      ],
    },
  },
}

export const CA_ETF_FEATURED_PART: Record<string, EtfDynamicDef> = {
  hdge: {
    yahooSymbol: 'HDGE.TO',
    hubCategoryId: 'long-short',
    badge: 'Long/short',
    h1Title: 'HDGE.TO — Accelerate Absolute Return Fund',
    displayTicker: 'HDGE / HDGE.U',
    issuer: 'Accelerate Financial Technologies Inc.',
    issuerRole: 'manager',
    inception: 'May 10, 2019',
    structure: 'Alternative (long/short equity)',
    mer: '3.95%',
    aum: '~$105M CAD',
    pageTitle: 'HDGE.TO ETF — Alpha Stacking',
    description:
      'Accelerate Absolute Return Fund (HDGE.TO): strategy, manager background, and long/short market regime context.',
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
          'HDGE.TO is Accelerate’s quantitative long/short North American equity sleeve—ranked longs and shorts with material short exposure per disclosures, scored like other long/short equity vehicles vs SPY net of costs.'
        ),
      },
    },
  },

  pfmn: {
    yahooSymbol: 'PFMN.TO',
    hubCategoryId: 'long-short',
    badge: 'Long/short',
    h1Title: 'PFMN.TO — Picton Mahoney Fortified Market Neutral Alternative Fund ETF',
    displayTicker: 'PFMN',
    issuer: 'Picton Mahoney Asset Management',
    issuerRole: 'manager',
    inception: 'July 16, 2019',
    mer: '1.25%',
    aum: '~$58M CAD',
    pageTitle: 'PFMN.TO ETF — Alpha Stacking',
    description:
      'Picton Mahoney Fortified Market Neutral Alternative Fund ETF (PFMN.TO): strategy, Picton pedigree, and regime context.',
    contentFormat: 'html',
    lede: fb.PFMN_LEDE_HTML,
    strategyParas: fb.PFMN_STRATEGY_PARAS_HTML,
    pedigreeParas: ped(
      `PICTON Investments (formerly Picton Mahoney) has cited low-teens billions CAD in firm assets under management in recent issuer communications—confirm the current headline on pictoninvestments.com. <strong>Picton Mahoney Asset Management</strong> is a Canadian <strong>alternatives</strong>-focused manager known for institutional <strong>quant</strong> and discretionary processes and the <strong>Authentic Hedge®</strong> / <strong>Fortified</strong> fund franchises—bringing hedge-style tools to mutual and ETF wrappers. PFMN sits in that lineage: a listed vehicle for <strong>market-neutral</strong> equity skill rather than passive beta.`,
      `The firm’s edge is framed as repeatable research, <strong>risk management</strong>, and execution at scale—what matters for this product is the same playbook applied in long/short <strong>alpha</strong> mandates: disciplined sizing, hedging, and ongoing portfolio oversight.`,
    ),
    outperfParas: fb.PFMN_OUTPERF_PARAS_HTML,
    officialUrl:
      'https://casl.pictonmahoney.com/en/Solutions/Fortified-Alternative-Funds-Solutions.aspx',
    officialLabel: 'Picton Mahoney (Fortified alternatives — PFMN)',
    efficiency: {
      capital: {
        tooltip: capitalEfficiencyTooltip(
          'PFMN.TO is Picton’s Fortified market-neutral long/short equity mandate—paired longs and shorts designed for lower net beta versus broad Canadian equities per ETF Facts.'
        ),
      },
    },
  },

  arb: {
    yahooSymbol: 'ARB.TO',
    hubCategoryId: 'arbitrage',
    badge: 'Arbitrage',
    h1Title: 'ARB.TO — Accelerate Arbitrage Fund',
    displayTicker: 'ARB',
    issuer: 'Accelerate Financial Technologies Inc.',
    issuerRole: 'manager',
    inception: 'April 7, 2020',
    structure: 'Alternative (merger / SPAC arbitrage)',
    mer: '1.0%',
    aum: '~$195M CAD',
    pageTitle: 'ARB.TO ETF — Alpha Stacking',
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
          'ARB.TO is Accelerate’s merger and SPAC arbitrage sleeve—deal-target longs with acquirer or related hedges per prospectus, event-driven returns rather than broad equity beta.'
        ),
      },
    },
  },
}
