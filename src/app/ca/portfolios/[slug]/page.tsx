import { notFound } from 'next/navigation'
import PortfolioDetailMain from '@/components/PortfolioDetailMain'
import { caPortfolioRoutes, usPortfolioRoutes } from '@/lib/portfolioRoutes'
import { pairedAlternates, singleEditionAlternates } from '@/lib/seoAlternates'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const caDef = caPortfolioRoutes.find((r) => r.slug === slug)
  if (caDef) {
    return {
      title: `${caDef.title} — Alpha Stacking`,
      description: caDef.description,
      alternates: singleEditionAlternates(`/ca/portfolios/${slug}`, 'en-CA'),
    }
  }
  const usDef = usPortfolioRoutes.find((r) => r.slug === slug)
  return {
    title: usDef ? `${usDef.title} — Alpha Stacking` : 'Portfolio',
    description: usDef?.description,
    alternates: usDef
      ? pairedAlternates(`/portfolios/${slug}`, `/ca/portfolios/${slug}`, 'ca')
      : undefined,
  }
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
