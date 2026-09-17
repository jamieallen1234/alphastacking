import { notFound } from 'next/navigation'
import PortfolioDetailMain from '@/components/PortfolioDetailMain'
import { usPortfolioRoutes } from '@/lib/portfolioRoutes'
import { pairedAlternates } from '@/lib/seoAlternates'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const def = usPortfolioRoutes.find((r) => r.slug === slug)
  return {
    title: def ? `${def.title} — Alpha Stacking` : 'Portfolio',
    description: def?.description,
    alternates: def
      ? pairedAlternates(`/portfolios/${slug}`, `/ca/portfolios/${slug}`, 'us')
      : undefined,
  }
}

export default async function UsPortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!usPortfolioRoutes.some((r) => r.slug === slug)) notFound()
  return <PortfolioDetailMain slug={slug} backHref="/portfolios" routeSet="us" />
}
