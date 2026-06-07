/**
 * Lightweight in-memory IP rate limiter shared by API routes.
 *
 * Best-effort only: state is per server instance, so on a horizontally scaled or
 * serverless deployment limits apply per instance, not globally. That is still a
 * meaningful brake on abuse/amplification (e.g. chart routes that fan out to many
 * upstream fetches) without needing external infrastructure.
 */

type Bucket = { count: number; reset: number }

export interface RateLimiter {
  /** Returns true if the request is allowed, false if the limit is exceeded. */
  allow(key: string, now?: number): boolean
}

/** Extract a best-effort client IP from proxy headers. */
export function clientIp(request: Request): string {
  const xff = request.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0]?.trim() || 'unknown'
  return request.headers.get('x-real-ip') ?? 'unknown'
}

export function createRateLimiter(opts: { windowMs: number; max: number }): RateLimiter {
  const { windowMs, max } = opts
  const buckets = new Map<string, Bucket>()

  // Drop expired buckets so the map can't grow without bound under many distinct keys.
  function prune(now: number) {
    for (const [k, b] of buckets) {
      if (now > b.reset) buckets.delete(k)
    }
  }

  return {
    allow(key: string, now: number = Date.now()): boolean {
      prune(now)
      const b = buckets.get(key)
      if (!b || now > b.reset) {
        buckets.set(key, { count: 1, reset: now + windowMs })
        return true
      }
      if (b.count >= max) return false
      b.count += 1
      return true
    },
  }
}
