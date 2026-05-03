import {
  capitalEfficiencyTooltip,
  insufficientHistoryTooltip,
} from '@/lib/etfEfficiencyTooltipFraming'

const NTSD_CAPITAL_SLEEVE_P2 =
  'NTSD targets a capital-efficient blend of U.S. large-cap equity with additional developed international equity notional via futures and related instruments. It\u2019s a 90/60-style equity stack, not an uncorrelated managed-futures alpha sleeve.'

/** NTSD efficiency tooltip copy — align with `.cursor/skills/beta-efficiency-grades/SKILL.md` (NTSD special case). */

export const NTSD_CAPITAL_EFFICIENCY_TOOLTIP_NA = insufficientHistoryTooltip(NTSD_CAPITAL_SLEEVE_P2)

/** When live history clears the 4-month threshold, monthly grades swap to this (framework + sleeve) tooltip. */
export const NTSD_CAPITAL_EFFICIENCY_TOOLTIP_GRADED = capitalEfficiencyTooltip(NTSD_CAPITAL_SLEEVE_P2)
