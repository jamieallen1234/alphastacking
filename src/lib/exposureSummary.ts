import type { PresetHolding } from '@/lib/presets/usInternational'

export type ExposureSummary = {
  grossLongEquityPct: number
  grossShortEquityPct: number
  grossAlphaExposurePct: number
}

type ExposureModel = {
  longEquityPct: number
  shortEquityPct: number
  alphaPct: number
}

const EXPOSURE_BY_TICKER: Record<string, ExposureModel> = {
  // Levered equity sleeves
  SSO: { longEquityPct: 200, shortEquityPct: 0, alphaPct: 0 },
  UPRO: { longEquityPct: 300, shortEquityPct: 0, alphaPct: 0 },
  QLD: { longEquityPct: 200, shortEquityPct: 0, alphaPct: 0 },
  TQQQ: { longEquityPct: 300, shortEquityPct: 0, alphaPct: 0 },
  'HSU.TO': { longEquityPct: 200, shortEquityPct: 0, alphaPct: 0 },
  'HQU.TO': { longEquityPct: 200, shortEquityPct: 0, alphaPct: 0 },
  'USSL.TO': { longEquityPct: 125, shortEquityPct: 0, alphaPct: 0 },
  'QQQL.TO': { longEquityPct: 125, shortEquityPct: 0, alphaPct: 0 },
  'HEQL.TO': { longEquityPct: 125, shortEquityPct: 0, alphaPct: 0 },

  // Long-only equity sleeves
  QQQ: { longEquityPct: 100, shortEquityPct: 0, alphaPct: 0 },
  SPMO: { longEquityPct: 100, shortEquityPct: 0, alphaPct: 0 },
  VFLO: { longEquityPct: 100, shortEquityPct: 0, alphaPct: 0 },
  AVUV: { longEquityPct: 100, shortEquityPct: 0, alphaPct: 0 },
  'ZLB.TO': { longEquityPct: 100, shortEquityPct: 0, alphaPct: 0 },

  // Stacked / capital-efficient
  NTSD: { longEquityPct: 150, shortEquityPct: 0, alphaPct: 0 },
  GDE: { longEquityPct: 80, shortEquityPct: 0, alphaPct: 80 },
  GDMN: { longEquityPct: 100, shortEquityPct: 0, alphaPct: 100 },
  MATE: { longEquityPct: 100, shortEquityPct: 0, alphaPct: 100 },
  RSST: { longEquityPct: 100, shortEquityPct: 0, alphaPct: 100 },
  RSSY: { longEquityPct: 100, shortEquityPct: 0, alphaPct: 100 },
  OOQB: { longEquityPct: 100, shortEquityPct: 0, alphaPct: 100 },
  OOSB: { longEquityPct: 100, shortEquityPct: 0, alphaPct: 100 },
  RSSX: { longEquityPct: 100, shortEquityPct: 0, alphaPct: 100 },
  BTGD: { longEquityPct: 0, shortEquityPct: 0, alphaPct: 200 },
  BEGS: { longEquityPct: 0, shortEquityPct: 0, alphaPct: 200 },
  ISBG: { longEquityPct: 0, shortEquityPct: 0, alphaPct: 200 },
  WTIB: { longEquityPct: 0, shortEquityPct: 0, alphaPct: 200 },
  'RGBM.TO': { longEquityPct: 50, shortEquityPct: 0, alphaPct: 100 },

  // Long/short style assumptions
  // ORR requested baseline by user in chat context.
  ORR: { longEquityPct: 150, shortEquityPct: 100, alphaPct: 0 },
  CLSE: { longEquityPct: 150, shortEquityPct: 50, alphaPct: 0 },
  'HDGE.TO': { longEquityPct: 100, shortEquityPct: 100, alphaPct: 0 },
  'PFLS.TO': { longEquityPct: 100, shortEquityPct: 50, alphaPct: 0 },
  'ATSX.TO': { longEquityPct: 150, shortEquityPct: 50, alphaPct: 0 },
  'TGAF.TO': { longEquityPct: 100, shortEquityPct: 40, alphaPct: 0 },

  // Alternatives / macro / arb
  FLSP: { longEquityPct: 0, shortEquityPct: 0, alphaPct: 100 },
  IALT: { longEquityPct: 0, shortEquityPct: 0, alphaPct: 100 },
  ASGM: { longEquityPct: 50, shortEquityPct: 0, alphaPct: 100 },
  HFGM: { longEquityPct: 50, shortEquityPct: 0, alphaPct: 100 },
  'DGLM.TO': { longEquityPct: 0, shortEquityPct: 0, alphaPct: 100 },
  'ONEC.TO': { longEquityPct: 0, shortEquityPct: 0, alphaPct: 100 },
  'PFAA.TO': { longEquityPct: 0, shortEquityPct: 0, alphaPct: 100 },
  MRGR: { longEquityPct: 0, shortEquityPct: 0, alphaPct: 100 },
  'ARB.TO': { longEquityPct: 0, shortEquityPct: 0, alphaPct: 100 },
}

function modelForTicker(ticker: string): ExposureModel | null {
  return EXPOSURE_BY_TICKER[ticker.toUpperCase()] ?? null
}

export function buildExposureSummaryFromPresetHoldings(
  holdings: PresetHolding[]
): ExposureSummary | null {
  let longEq = 0
  let shortEq = 0
  let alpha = 0
  let usedAny = false

  for (const h of holdings) {
    const m = modelForTicker(h.ticker)
    if (!m) continue
    usedAny = true
    const w = h.weightPct / 100
    longEq += w * m.longEquityPct
    shortEq += w * m.shortEquityPct
    alpha += w * m.alphaPct
  }
  if (!usedAny) return null
  return { grossLongEquityPct: longEq, grossShortEquityPct: shortEq, grossAlphaExposurePct: alpha }
}

export function buildExposureSummaryFromWeightedTickers(
  rows: Array<{ ticker: string; weightPct: number }>
): ExposureSummary | null {
  let longEq = 0
  let shortEq = 0
  let alpha = 0
  let usedAny = false

  for (const r of rows) {
    const m = modelForTicker(r.ticker)
    if (!m) continue
    if (!(r.weightPct > 0)) continue
    usedAny = true
    const w = r.weightPct / 100
    longEq += w * m.longEquityPct
    shortEq += w * m.shortEquityPct
    alpha += w * m.alphaPct
  }
  if (!usedAny) return null
  return { grossLongEquityPct: longEq, grossShortEquityPct: shortEq, grossAlphaExposurePct: alpha }
}
