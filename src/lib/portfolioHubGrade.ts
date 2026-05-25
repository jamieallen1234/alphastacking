export type PortfolioLetterGrade = 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D'

export const GRADE_ORDER: PortfolioLetterGrade[] = ['A+', 'A', 'B+', 'B', 'C', 'D']

function pointsToLetter(points: number): PortfolioLetterGrade {
  if (points >= 4.5) return 'A+'
  if (points >= 3.5) return 'A'
  if (points >= 2.5) return 'B+'
  if (points >= 1.5) return 'B'
  if (points >= 0.75) return 'C'
  return 'D'
}

function downgradeOneLetter(grade: PortfolioLetterGrade): PortfolioLetterGrade {
  if (grade === 'A+') return 'A'
  if (grade === 'A') return 'B+'
  if (grade === 'B+') return 'B'
  if (grade === 'B') return 'C'
  return 'D'
}

function alphaPoints(alphaVsBenchmarkPct: number): number {
  if (alphaVsBenchmarkPct >= 50) return 5
  if (alphaVsBenchmarkPct >= 25) return 4
  if (alphaVsBenchmarkPct > 0) return 3
  if (alphaVsBenchmarkPct > -15) return 2
  if (alphaVsBenchmarkPct > -40) return 1
  return 0
}

function drawdownPoints(drawdownVsBenchmarkPct: number): number {
  if (drawdownVsBenchmarkPct <= -40) return 5
  if (drawdownVsBenchmarkPct <= -20) return 4
  if (drawdownVsBenchmarkPct < 0) return 3
  if (drawdownVsBenchmarkPct < 15) return 2
  if (drawdownVsBenchmarkPct < 40) return 1
  return 0
}

function betaPoints(betaEdge: number): number {
  if (betaEdge >= 0.5) return 5
  if (betaEdge >= 0.2) return 4
  if (betaEdge >= 0) return 3
  if (betaEdge > -0.2) return 2
  if (betaEdge > -0.5) return 1
  return 0
}

/** Mirrors the scorecard logic in PresetPortfolioChart.tsx (alpha 50%, drawdown 30%, beta 20%). */
export function computePortfolioHubGrade(
  totalReturnPercent: number | null,
  benchmarkTotalReturnPercent: number | null,
  maxDrawdownPortfolioPercent: number | null,
  maxDrawdownBenchmarkPercent: number | null,
  weightedBeta: number,
  limitingFirstTradeDate: string,
): PortfolioLetterGrade | null {
  const alphaEdge =
    totalReturnPercent != null &&
    benchmarkTotalReturnPercent != null &&
    Math.abs(benchmarkTotalReturnPercent) > 0
      ? (totalReturnPercent / benchmarkTotalReturnPercent - 1) * 100
      : null

  const drawdownEdge =
    maxDrawdownPortfolioPercent != null &&
    maxDrawdownBenchmarkPercent != null &&
    Math.abs(maxDrawdownBenchmarkPercent) > 0
      ? (Math.abs(maxDrawdownPortfolioPercent) / Math.abs(maxDrawdownBenchmarkPercent) - 1) * 100
      : null

  const betaEdge = 1 - weightedBeta

  if (alphaEdge == null || drawdownEdge == null) return null

  const weightedScore =
    alphaPoints(alphaEdge) * 0.5 +
    drawdownPoints(drawdownEdge) * 0.3 +
    betaPoints(betaEdge) * 0.2

  const rawGrade = pointsToLetter(weightedScore)

  const underOneYear = (() => {
    const ts = Date.parse(`${limitingFirstTradeDate}T00:00:00Z`)
    if (!Number.isFinite(ts)) return false
    return (Date.now() - ts) / (1000 * 60 * 60 * 24) < 365
  })()

  return underOneYear ? downgradeOneLetter(rawGrade) : rawGrade
}

/** Sort index for a grade: lower = better (A+ = 0, D = 5). */
export function gradeRank(grade: PortfolioLetterGrade | null): number {
  if (grade == null) return 99
  return GRADE_ORDER.indexOf(grade)
}
