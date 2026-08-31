import { getEtfHubItems } from '@/lib/etfHubData'
import { ETF_CATEGORY_ROWS } from '@/lib/etfCategories'
import { getSiteUrl } from '@/lib/siteUrl'

export type SocialPostTopic = {
  /** Stable key so we can track "already posted" state without depending on array order */
  key: string
  text: string
}

const MAX_TWEET_LENGTH = 280

function buildTweetText(nameLine: string, desc: string, href: string): string {
  const url = `${getSiteUrl()}${href}`
  // Reserve room for a trailing space + URL; X shortens links to a fixed
  // t.co length but the pre-shortened URL still counts toward local budget.
  const budget = MAX_TWEET_LENGTH - url.length - 1
  const body = `${nameLine}\n${desc}`
  const trimmed = body.length > budget ? `${body.slice(0, budget - 1).trimEnd()}…` : body
  return `${trimmed}\n${url}`
}

/** All rotation-eligible topics, one per US-hub ETF across every category, in a stable order. */
export function getAllSocialPostTopics(): SocialPostTopic[] {
  const topics: SocialPostTopic[] = []
  const seen = new Set<string>()
  for (const category of ETF_CATEGORY_ROWS) {
    const items = getEtfHubItems('us', category.id, 'us')
    for (const item of items) {
      if (seen.has(item.key)) continue
      seen.add(item.key)
      topics.push({ key: item.key, text: buildTweetText(item.nameLine, item.desc, item.href) })
    }
  }
  return topics
}

/** Deterministic day-of-year pick so re-running the same day (e.g. a retry) yields the same topic. */
export function pickTopicForDate(date: Date): SocialPostTopic {
  const topics = getAllSocialPostTopics()
  const start = Date.UTC(date.getUTCFullYear(), 0, 1)
  const dayOfYear = Math.floor((Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) - start) / 86_400_000)
  const index = dayOfYear % topics.length
  return topics[index]
}
