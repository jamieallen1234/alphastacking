import { getPresetById } from '@/lib/presets'
import { HUB_SLUG_TO_PRESET_ID } from '@/lib/loadPortfolioHubAlpha'
import { getCachedPresetChart1y, getCachedPresetChartMax } from '@/lib/getCachedPresetChart'
import {
  US_PORTFOLIO_CATEGORIES,
  caPortfolioRoutes,
  portfolioHubRoutes,
  type PortfolioRouteDef,
  usPortfolioRoutes,
} from '@/lib/portfolioRoutes'
import {
  computeBlendedGrade,
  computeBlendedScore,
  gradeRank,
  type PortfolioLetterGrade,
} from '@/lib/portfolioHubGrade'

export type PortfolioEtfMembershipRegion = 'us' | 'ca'

export interface PortfolioEtfMembership {
  slug: string
  title: string
  category: string
  weightPct: number
  grade: PortfolioLetterGrade | null
  ratingScore: number | null
}

function routesForRegion(region: PortfolioEtfMembershipRegion): PortfolioRouteDef[] {
  return region === 'ca' ? caPortfolioRoutes : usPortfolioRoutes
}

function categoryLabel(route: PortfolioRouteDef): string {
  return US_PORTFOLIO_CATEGORIES.find((category) => category.id === route.hubSection)?.title
    ?? route.hubSection
}

async function loadRating(route: PortfolioRouteDef): Promise<{
  grade: PortfolioLetterGrade | null
  ratingScore: number | null
}> {
  const presetId = HUB_SLUG_TO_PRESET_ID[route.slug]
  if (presetId == null || route.weightedBeta == null) return { grade: null, ratingScore: null }

  try {
    const [payload1y, payloadMax] = await Promise.all([
      getCachedPresetChart1y(presetId),
      getCachedPresetChartMax(presetId),
    ])
    return {
      grade: computeBlendedGrade(payload1y, payloadMax, route.weightedBeta),
      ratingScore: computeBlendedScore(payload1y, payloadMax, route.weightedBeta),
    }
  } catch {
    return { grade: null, ratingScore: null }
  }
}

/**
 * Finds the top five live model portfolios in one region that hold an ETF,
 * ordered by their underlying portfolio rating score.
 */
export async function loadPortfolioEtfMemberships(
  ticker: string,
  region: PortfolioEtfMembershipRegion,
): Promise<PortfolioEtfMembership[]> {
  const normalizedTicker = ticker.trim().toUpperCase()
  const matching = portfolioHubRoutes(routesForRegion(region)).flatMap((route) => {
    const presetId = HUB_SLUG_TO_PRESET_ID[route.slug]
    const holding = presetId
      ? getPresetById(presetId)?.holdings.find((item) => item.ticker.toUpperCase() === normalizedTicker)
      : undefined
    return holding ? [{ route, weightPct: holding.weightPct }] : []
  })

  if (matching.length === 0) return []

  const memberships = await Promise.all(matching.map(async ({ route, weightPct }) => {
    const rating = await loadRating(route)
    return {
      slug: route.slug,
      title: route.title,
      category: categoryLabel(route),
      weightPct,
      ...rating,
    }
  }))
  return memberships
    .sort((a, b) => (
      (b.ratingScore ?? -Infinity) - (a.ratingScore ?? -Infinity)
      || gradeRank(a.grade) - gradeRank(b.grade)
      || a.title.localeCompare(b.title)
    ))
    .slice(0, 5)
}
