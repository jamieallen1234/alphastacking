import { NextResponse } from 'next/server'

type CacheControlMode = 'no-store' | 'public-1h'

const CACHE_CONTROL: Record<CacheControlMode, string> = {
  'no-store': 'private, no-store',
  'public-1h': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
}

/** Wrap chart payloads with the standard `Cache-Control` header for chart API routes. */
export function chartJsonResponse<T>(payload: T, cacheControl: CacheControlMode = 'no-store') {
  return NextResponse.json(payload, {
    headers: { 'Cache-Control': CACHE_CONTROL[cacheControl] },
  })
}

/**
 * Map a thrown error from a chart-compute path to a JSON response.
 *
 * Routes that distinguish bad-input errors ("not enough", "at least") from upstream failures
 * keep the default `mapBadInput=true`. Routes that always treat thrown errors as upstream
 * failures (etf-chart) pass `false`.
 */
export function chartErrorResponse(
  e: unknown,
  fallback: string,
  options: { mapBadInput?: boolean } = {}
): NextResponse {
  const { mapBadInput = true } = options
  const message = e instanceof Error ? e.message : fallback
  if (mapBadInput) {
    const lower = message.toLowerCase()
    const status =
      lower.includes('not enough') || lower.includes('at least') ? 400 : 502
    return NextResponse.json({ error: message }, { status })
  }
  return NextResponse.json({ error: message }, { status: 502 })
}
