import type { PortfolioChartPayload } from '@/lib/computePortfolioChart'
import {
  getCachedCaCoreBuyHoldChartMax,
  getCachedCaInternationalChartMax,
  getCachedUsCoreBuyHoldChartMax,
  getCachedUsInternationalChartMax,
} from '@/lib/getCachedPresetChart'
import { caPortfolioRoutes, usPortfolioRoutes } from '@/lib/portfolioRoutes'

export type HomePortfolioChartSlot = {
  slug: string
  href: string
  title: string
  description: string
  chartHeading: string
  payload: PortfolioChartPayload
}

/** Two live model portfolios for the home page (full history `max` range; detail pages still default to 1Y). */
export async function loadHomePortfolioChartSlots(
  variant: 'us' | 'ca'
): Promise<HomePortfolioChartSlot[]> {
  if (variant === 'us') {
    const [intlPayload, corePayload] = await Promise.all([
      getCachedUsInternationalChartMax(),
      getCachedUsCoreBuyHoldChartMax(),
    ])
    const intlDef = usPortfolioRoutes.find((r) => r.slug === 'us-international')
    const coreDef = usPortfolioRoutes.find((r) => r.slug === 'us-core-buy-hold')
    if (!intlDef || !coreDef) {
      throw new Error('loadHomePortfolioChartSlots: missing US route defs')
    }
    return [
      {
        slug: intlDef.slug,
        href: `/portfolios/${intlDef.slug}`,
        title: intlDef.title,
        description: intlDef.description,
        chartHeading: 'Total return vs SPY (all history)',
        payload: intlPayload,
      },
      {
        slug: coreDef.slug,
        href: `/portfolios/${coreDef.slug}`,
        title: coreDef.title,
        description: coreDef.description,
        chartHeading: 'Total return vs SPY (all history)',
        payload: corePayload,
      },
    ]
  }

  const [intlPayload, corePayload] = await Promise.all([
    getCachedCaInternationalChartMax(),
    getCachedCaCoreBuyHoldChartMax(),
  ])
  const intlDef = caPortfolioRoutes.find((r) => r.slug === 'ca-international')
  const coreDef = caPortfolioRoutes.find((r) => r.slug === 'ca-core-buy-hold')
  if (!intlDef || !coreDef) {
    throw new Error('loadHomePortfolioChartSlots: missing CA route defs')
  }
  return [
    {
      slug: intlDef.slug,
      href: `/ca/portfolios/${intlDef.slug}`,
      title: intlDef.title,
      description: intlDef.description,
      chartHeading: 'Total return vs SPY (all history, CAD)',
      payload: intlPayload,
    },
    {
      slug: coreDef.slug,
      href: `/ca/portfolios/${coreDef.slug}`,
      title: coreDef.title,
      description: coreDef.description,
      chartHeading: 'Total return vs SPY (all history, CAD)',
      payload: corePayload,
    },
  ]
}
