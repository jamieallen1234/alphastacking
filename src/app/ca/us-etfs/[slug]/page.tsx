import { notFound } from 'next/navigation'
import EtfDynamicPageLayout from '@/components/EtfDynamicPageLayout'
import {
  mergeDynamicEtfEfficiencyWithPatch,
} from '@/lib/etfDynamicEfficiencyBySlug'
import { getCachedMonthlyEfficiencyPatchForSlug } from '@/lib/getCachedMonthlyEtfEfficiencyGrades'
import { US_ETF_DYNAMIC_REGISTRY } from '@/lib/etfDynamicRegistry'
import { getCachedEtfChart } from '@/lib/getCachedEtfChart'
import styles from '@/app/us-etfs/mate/page.module.css'

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
  return {
    title: `${def.pageTitle} (Canadian edition)`,
    description: def.description,
  }
}

export default async function CaUsEtfDynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const raw = US_ETF_DYNAMIC_REGISTRY[slug]
  if (!raw) notFound()
  let monthlyPatch = null
  try {
    monthlyPatch = await getCachedMonthlyEfficiencyPatchForSlug(slug, 'us')
  } catch {
    monthlyPatch = null
  }
  const def = mergeDynamicEtfEfficiencyWithPatch(raw, slug, 'us', monthlyPatch)
  const chart = await getCachedEtfChart(def.yahooSymbol, '1y', def.betaBenchmarkSymbol)
  return (
    <EtfDynamicPageLayout
      variant="us"
      hubBase="/ca/us-etfs"
      def={def}
      chart={chart}
      slug={slug}
      styles={styles}
    />
  )
}
