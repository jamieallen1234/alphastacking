import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LearnArticleShell from '@/components/learn/LearnArticleShell'
import StrategyLearnArticle from '@/components/learn/StrategyLearnArticle'
import { getStrategyLearnTopic, STRATEGY_LEARN_TOPICS } from '@/lib/strategyLearnTopics'
import { pairedAlternates } from '@/lib/seoAlternates'

export const dynamicParams = false

export function generateStaticParams() {
  return STRATEGY_LEARN_TOPICS.map((topic) => ({ slug: topic.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const topic = getStrategyLearnTopic(slug)
  if (!topic) return {}

  return {
    title: `${topic.title} | Learn | Alpha Stacking Canada`,
    description: topic.deck,
    alternates: pairedAlternates(`/learn/${topic.slug}`, `/ca/learn/${topic.slug}`, 'ca'),
  }
}

export default async function CaStrategyLearnPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const topic = getStrategyLearnTopic(slug)
  if (!topic) notFound()

  return (
    <LearnArticleShell edition="ca" currentSlug={topic.slug}>
      <StrategyLearnArticle edition="ca" topic={topic} />
    </LearnArticleShell>
  )
}
