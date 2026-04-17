import { notFound } from 'next/navigation'
import EtfDynamicPageLayout from '@/components/EtfDynamicPageLayout'
import { US_ETF_DYNAMIC_REGISTRY } from '@/lib/etfDynamicRegistry'
import { getCachedEtfChart } from '@/lib/getCachedEtfChart'
import styles from '../mate/page.module.css'

export function generateStaticParams() {
  return Object.keys(US_ETF_DYNAMIC_REGISTRY).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const def = US_ETF_DYNAMIC_REGISTRY[slug]
  if (!def) return {}
  return { title: def.pageTitle, description: def.description }
}

export default async function UsEtfDynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const def = US_ETF_DYNAMIC_REGISTRY[slug]
  if (!def) notFound()
  const chart = await getCachedEtfChart(def.yahooSymbol, '1y')
  return (
    <EtfDynamicPageLayout
      variant="us"
      hubBase="/us-etfs"
      def={def}
      chart={chart}
      styles={styles}
    />
  )
}
