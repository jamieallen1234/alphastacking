export type PortfolioLetterGrade = 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D'

export const GRADE_ORDER: PortfolioLetterGrade[] = ['A+', 'A', 'B+', 'B', 'C', 'D']

export function pointsToLetter(points: number): PortfolioLetterGrade {
  if (points >= 4.5) return 'A+'
  if (points >= 3.5) return 'A'
  if (points >= 2.5) return 'B+'
  if (points >= 1.5) return 'B'
  if (points >= 0.75) return 'C'
  return 'D'
}

export function downgradeOneLetter(grade: PortfolioLetterGrade): PortfolioLetterGrade {
  if (grade === 'A+') return 'A'
  if (grade === 'A') return 'B+'
  if (grade === 'B+') return 'B'
  if (grade === 'B') return 'C'
  return 'D'
}

export function alphaPoints(alphaVsBenchmarkPct: number): number {
  if (alphaVsBenchmarkPct >= 50) return 5
  if (alphaVsBenchmarkPct >= 25) return 4
  if (alphaVsBenchmarkPct > 0) return 3
  if (alphaVsBenchmarkPct > -15) return 2
  if (alphaVsBenchmarkPct > -40) return 1
  return 0
}

export function drawdownPoints(drawdownVsBenchmarkPct: number): number {
  if (drawdownVsBenchmarkPct <= -40) return 5
  if (drawdownVsBenchmarkPct <= -20) return 4
  if (drawdownVsBenchmarkPct < 0) return 3
  if (drawdownVsBenchmarkPct < 15) return 2
  if (drawdownVsBenchmarkPct < 40) return 1
  return 0
}

export function betaPoints(betaEdge: number): number {
  if (betaEdge >= 0.5) return 5
  if (betaEdge >= 0.2) return 4
  if (betaEdge >= 0) return 3
  if (betaEdge > -0.2) return 2
  if (betaEdge > -0.5) return 1
  return 0
}

export interface ScorecardPayload {
  totalReturnPercent: number | null
  benchmarkTotalReturnPercent: number | null
  maxDrawdownPortfolioPercent: number | null
  maxDrawdownBenchmarkPercent: number | null
  limitingFirstTradeDate: string
}

/** Score a single payload window. Returns null if data is insufficient. */
export function scorePayload(
  p: ScorecardPayload,
  weightedBeta: number,
): number | null {
  const alphaEdge =
    p.totalReturnPercent != null &&
    p.benchmarkTotalReturnPercent != null &&
    Math.abs(p.benchmarkTotalReturnPercent) > 0
      ? (p.totalReturnPercent / p.benchmarkTotalReturnPercent - 1) * 100
      : null

  const drawdownEdge =
    p.maxDrawdownPortfolioPercent != null &&
    p.maxDrawdownBenchmarkPercent != null &&
    Math.abs(p.maxDrawdownBenchmarkPercent) > 0
      ? (Math.abs(p.maxDrawdownPortfolioPercent) / Math.abs(p.maxDrawdownBenchmarkPercent) - 1) * 100
      : null

  if (alphaEdge == null || drawdownEdge == null) return null

  const betaEdge = 1 - weightedBeta
  return alphaPoints(alphaEdge) * 0.5 + drawdownPoints(drawdownEdge) * 0.3 + betaPoints(betaEdge) * 0.2
}

function underOneYear(limitingFirstTradeDate: string): boolean {
  const ts = Date.parse(`${limitingFirstTradeDate}T00:00:00Z`)
  if (!Number.isFinite(ts)) return false
  return (Date.now() - ts) / (1000 * 60 * 60 * 24) < 365
}

/**
 * Blended grade: 50% 1Y score + 50% MAX score.
 * If 1Y data is unavailable (< 1 year history), falls back to 100% MAX.
 * Under-1-year penalty downgrades the final blended grade by one letter.
 */
export function computeBlendedGrade(
  payload1y: ScorecardPayload | null,
  payloadMax: ScorecardPayload | null,
  weightedBeta: number,
): PortfolioLetterGrade | null {
  const score1y = payload1y ? scorePayload(payload1y, weightedBeta) : null
  const scoreMax = payloadMax ? scorePayload(payloadMax, weightedBeta) : null

  let blended: number | null
  if (score1y != null && scoreMax != null) {
    blended = score1y * 0.5 + scoreMax * 0.5
  } else if (scoreMax != null) {
    blended = scoreMax
  } else if (score1y != null) {
    blended = score1y
  } else {
    return null
  }

  const rawGrade = pointsToLetter(blended)

  // Use whichever payload is available for the under-1-year check
  const limitingDate =
    payload1y?.limitingFirstTradeDate ?? payloadMax?.limitingFirstTradeDate ?? ''
  return underOneYear(limitingDate) ? downgradeOneLetter(rawGrade) : rawGrade
}

/** Sort index for a grade: lower = better (A+ = 0, D = 5). */
export function gradeRank(grade: PortfolioLetterGrade | null): number {
  if (grade == null) return 99
  return GRADE_ORDER.indexOf(grade)
}

// Keep old entry point for hub card usage
export function computePortfolioHubGrade(
  totalReturnPercent: number | null,
  benchmarkTotalReturnPercent: number | null,
  maxDrawdownPortfolioPercent: number | null,
  maxDrawdownBenchmarkPercent: number | null,
  weightedBeta: number,
  limitingFirstTradeDate: string,
): PortfolioLetterGrade | null {
  return computeBlendedGrade(
    { totalReturnPercent, benchmarkTotalReturnPercent, maxDrawdownPortfolioPercent, maxDrawdownBenchmarkPercent, limitingFirstTradeDate },
    null,
    weightedBeta,
  )
}
