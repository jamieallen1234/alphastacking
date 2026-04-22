import { notFound } from 'next/navigation'
import EtfDynamicPageLayout from '@/components/EtfDynamicPageLayout'
import {
  mergeDynamicEtfEfficiencyWithPatch,
} from '@/lib/etfDynamicEfficiencyBySlug'
import { getCachedMonthlyEfficiencyPatchForSlug } from '@/lib/getCachedMonthlyEtfEfficiencyGrades'
import { CA_ETF_DYNAMIC_REGISTRY } from '@/lib/etfDynamicRegistry'
import { getCachedEtfChart } from '@/lib/getCachedEtfChart'
import styles from '../hdge/page.module.css'

export function generateStaticParams() {
  return Object.keys(CA_ETF_DYNAMIC_REGISTRY).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const def = CA_ETF_DYNAMIC_REGISTRY[slug]
  if (!def) return {}
  return { title: def.pageTitle, description: def.description }
}

export default async function CaEtfDynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const raw = CA_ETF_DYNAMIC_REGISTRY[slug]
  if (!raw) notFound()
  let monthlyPatch = null
  try {
    monthlyPatch = await getCachedMonthlyEfficiencyPatchForSlug(slug, 'ca')
  } catch {
    monthlyPatch = null
  }
  const def = mergeDynamicEtfEfficiencyWithPatch(raw, slug, 'ca', monthlyPatch)
  const chart = await getCachedEtfChart(def.yahooSymbol, '1y', def.betaBenchmarkSymbol)
  return (
    <EtfDynamicPageLayout
      variant="ca"
      hubBase="/ca/etfs"
      def={def}
      chart={chart}
      styles={styles}
    />
  )
}
