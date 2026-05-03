/** First paragraphs for ETF efficiency tooltips — align with `.cursor/skills/beta-efficiency-grades/SKILL.md` §7. */

export const CAPITAL_EFFICIENCY_FRAME_P1 =
  'Capital Efficiency grades how well this ETF delivers equity-side returns relative to the capital and beta it uses, with SPY as the B baseline. Leveraged ETFs score higher when they free up capital for an alpha sleeve. Long/short and factor ETFs are graded on excess return versus SPY, net of costs.'

export const ALPHA_EFFICIENCY_UNSTACKED_FRAME_P1 =
  'Alpha Efficiency grades how much return this ETF generates above the risk-free rate, independent of the equity market. SPY sets the B baseline. A higher grade means more return per unit of non-equity risk.'

export const ALPHA_EFFICIENCY_STACKED_FRAME_P1 =
  "Alpha Efficiency grades the non-equity sleeve of this stacked ETF on return above its borrowing cost: that's the true hurdle for a futures overlay. A sleeve that only matches its financing cost adds no value; grades above B mean the overlay is genuinely earning its keep."

export const INSUFFICIENT_HISTORY_P1 =
  'Not enough live history to assign a grade yet. The minimum is 4 months of NAV data.'

export const EFFICIENCY_PROVISIONAL_FOOTNOTE =
  'Grades above are based on 4–11 months of live data and should be treated as provisional. Short history may not capture a full market-cycle.'

export function capitalEfficiencyTooltip(sleeveParagraph2: string): string {
  return `${CAPITAL_EFFICIENCY_FRAME_P1}\n\n${sleeveParagraph2}`
}

export function alphaEfficiencyUnstackedTooltip(sleeveParagraph2: string): string {
  return `${ALPHA_EFFICIENCY_UNSTACKED_FRAME_P1}\n\n${sleeveParagraph2}`
}

export function alphaEfficiencyStackedTooltip(sleeveParagraph2: string): string {
  return `${ALPHA_EFFICIENCY_STACKED_FRAME_P1}\n\n${sleeveParagraph2}`
}

export function insufficientHistoryTooltip(contextParagraph2: string): string {
  return `${INSUFFICIENT_HISTORY_P1}\n\n${contextParagraph2}`
}
