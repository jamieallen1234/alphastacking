import PortfolioBuilderPage from '@/components/PortfolioBuilderPage'
import { parsePortfolioBuilderPrefill } from '@/lib/portfolioBuilderPrefill'

export const metadata = {
  title: 'Portfolio Builder — Alpha Stacking (Canadian edition)',
  description:
    'Build a custom portfolio from Canadian and US-listed ETFs, set weights, and generate a live return chart versus SPY with max drawdown — Canadian edition.',
}

export default async function PortfolioBuilderCaPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}) {
  const sp = searchParams != null ? await searchParams : {}
  const initialPrefill = parsePortfolioBuilderPrefill(sp)
  return <PortfolioBuilderPage edition="ca" initialPrefill={initialPrefill} />
}

