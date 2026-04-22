/** First paragraphs for ETF efficiency tooltips — align with `.cursor/skills/beta-efficiency-grades/SKILL.md` §7. */

export const CAPITAL_EFFICIENCY_FRAME_P1 =
  'Capital Efficiency grades how well this ETF delivers equity-side returns relative to the capital and beta it consumes, compared to SPY (grade B). LETFs score higher by freeing capital for alpha sleeves. Long/short and factor ETFs score on excess return vs SPY net of costs.'

export const ALPHA_EFFICIENCY_UNSTACKED_FRAME_P1 =
  'Alpha Efficiency grades how much return this ETF delivers above the risk-free rate, independent of equity markets. SPY is the B baseline for comparison. Higher grades mean more return per unit of non-equity risk taken.'

export const ALPHA_EFFICIENCY_STACKED_FRAME_P1 =
  "Alpha Efficiency grades the non-equity sleeve of this stacked ETF on return above its borrowing cost — the true hurdle for a futures overlay. A sleeve that only matches its financing cost adds no value; grades above B indicate genuine additive return."

export const INSUFFICIENT_HISTORY_P1 =
  'Insufficient live history to assign a grade. Minimum 4 months of NAV data required.'

export const EFFICIENCY_PROVISIONAL_FOOTNOTE =
  'Grades above are based on 4–11 months of live data. Treat as provisional — short history may not reflect full market cycle behaviour.'

export function capitalEfficiencyTooltip(sleeveParagraph2: string): string {
  return `${CAPITAL_EFFICIENCY_FRAME_P1}\n\n${sleeveParagraph2}`
}

export function alphaEfficiencyUnstackedTooltip(engineParagraph2: string): string {
  return `${ALPHA_EFFICIENCY_UNSTACKED_FRAME_P1}\n\n${engineParagraph2}`
}

export function alphaEfficiencyStackedTooltip(sleeveParagraph2: string): string {
  return `${ALPHA_EFFICIENCY_STACKED_FRAME_P1}\n\n${sleeveParagraph2}`
}

export function insufficientHistoryTooltip(contextParagraph2: string): string {
  return `${INSUFFICIENT_HISTORY_P1}\n\n${contextParagraph2}`
}
