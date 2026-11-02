import { notFound } from 'next/navigation'
import PortfolioDetailMain from '@/components/PortfolioDetailMain'
import { usPortfolioRoutes } from '@/lib/portfolioRoutes'
import { pairedAlternates } from '@/lib/seoAlternates'

// Generate each portfolio on its first request, then serve the cached page while a fresh version
// regenerates in the background at most once per day. Returning no build-time params avoids a
// burst of Yahoo requests during every deployment.
export const dynamic = 'force-static'
export const revalidate = 86400

export function generateStaticParams() {
  return []
}

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
