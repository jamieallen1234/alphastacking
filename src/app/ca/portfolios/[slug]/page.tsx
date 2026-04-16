import { notFound } from 'next/navigation'
import PortfolioDetailMain from '@/components/PortfolioDetailMain'
import { caPortfolioRoutes, usPortfolioRoutes } from '@/lib/portfolioRoutes'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const caDef = caPortfolioRoutes.find((r) => r.slug === slug)
  if (caDef) return { title: `${caDef.title} — Alpha Stacking` }
  const usDef = usPortfolioRoutes.find((r) => r.slug === slug)
  return { title: usDef ? `${usDef.title} — Alpha Stacking` : 'Portfolio' }
}

export default async function CaPortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const caDef = caPortfolioRoutes.find((r) => r.slug === slug)
  if (!caDef) {
    if (usPortfolioRoutes.some((r) => r.slug === slug)) {
      return <PortfolioDetailMain slug={slug} backHref="/ca/portfolios" routeSet="us" />
    }
    notFound()
  }
  return <PortfolioDetailMain slug={slug} backHref="/ca/portfolios" routeSet="ca" />
}
