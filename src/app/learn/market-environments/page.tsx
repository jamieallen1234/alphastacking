import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { fetchDailySeries } from '@/lib/yahooFinance'
import LearnArticleShell from '@/components/learn/LearnArticleShell'
import MarketEnvironmentsArticle from '@/components/learn/MarketEnvironmentsArticle'
import { MARKET_ENVIRONMENTS_SLUG } from '@/lib/learnArticles'

export const metadata: Metadata = {
  title: 'Five market environments | Learn | Alpha Stacking',
  description:
    'What growth, inflation, recession, deflation, and choppy markets look like on a chart, and why a portfolio that only thrives in one of them is a fragile portfolio.',
}

const START_OF_2000_SEC = Date.UTC(2000, 0, 1) / 1000

const getSpyHistory = unstable_cache(
  () => fetchDailySeries('SPY', 'max'),
  ['spy-max-history'],
  { revalidate: 86400 },
)

export default async function MarketEnvironmentsPage() {
  const series = await getSpyHistory()

  const startIdx = series.timestamps.findIndex((t) => t >= START_OF_2000_SEC)
  const timestamps = startIdx >= 0 ? series.timestamps.slice(startIdx) : series.timestamps
  const rawPrices = startIdx >= 0 ? series.prices.slice(startIdx) : series.prices

  const first = rawPrices[0] ?? 1
  const values = rawPrices.map((p) => (p / first) * 10_000)

  return (
    <LearnArticleShell edition="us" currentSlug={MARKET_ENVIRONMENTS_SLUG}>
      <MarketEnvironmentsArticle edition="us" timestamps={timestamps} values={values} />
    </LearnArticleShell>
  )
}
