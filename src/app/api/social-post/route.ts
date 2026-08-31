import { NextResponse } from 'next/server'
import { pickTopicForDate } from '@/lib/socialPostTopics'
import { postTweet } from '@/lib/xClient'

export const runtime = 'nodejs'

function isAuthorized(request: Request): boolean {
  // CRON_SECRET is Vercel's documented convention: when set, Vercel Cron
  // automatically sends it as this bearer token on scheduled invocations.
  const secret = process.env.CRON_SECRET
  if (!secret) return false
  const header = request.headers.get('authorization')
  return header === `Bearer ${secret}`
}

/**
 * Triggered daily by Vercel Cron (see vercel.json). Also callable manually
 * with `?dryRun=1` to preview the chosen topic's text without posting.
 */
export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const dryRun = searchParams.get('dryRun') === '1'

  const topic = pickTopicForDate(new Date())

  if (dryRun) {
    return NextResponse.json({ ok: true, dryRun: true, topic })
  }

  const result = await postTweet(topic.text)
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error, topic }, { status: 502 })
  }

  return NextResponse.json({ ok: true, tweetId: result.id, topic })
}
