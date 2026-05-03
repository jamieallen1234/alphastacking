import {
  alphaEfficiencyStackedTooltip,
  capitalEfficiencyTooltip,
} from '@/lib/etfEfficiencyTooltipFraming'

/** Tooltip copy — keep aligned with `.cursor/skills/beta-efficiency-grades/SKILL.md` §7. */

export const MATE_CAPITAL_EFFICIENCY_TOOLTIP = capitalEfficiencyTooltip(
  "MATE's equity sleeve targets approximately 100% S&P 500 as the core return engine."
)

export const MATE_ALPHA_EFFICIENCY_TOOLTIP = alphaEfficiencyStackedTooltip(
  "MATE's alpha sleeve is approximately 100% trend-following managed futures, spanning equities, rates, currencies, and commodities. It's designed to diversify the equity core across macro regimes."
)

export const MATE_EFFICIENCY_FOOTNOTE =
  'Grades above are based on 4 months of live data and should be treated as provisional. Short history may not capture a full market-cycle.'
