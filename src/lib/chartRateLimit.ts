import { createRateLimiter } from '@/lib/rateLimit'

/**
 * Chart endpoints fan out to upstream (Yahoo) fetches — the portfolio/builder routes
 * trigger one upstream request per symbol (up to ~20). Without a cap these are an
 * unauthenticated amplification/DoS vector. 60 req/min/IP comfortably covers the
 * legitimate UI (which prefetches a few ranges on load) while bounding abuse.
 */
const limiter = createRateLimiter({ windowMs: 60 * 1000, max: 60 })

/** Returns true if the request is allowed, false if rate limit exceeded. */
export function allowChartRequest(ip: string, now: number = Date.now()): boolean {
  return limiter.allow(ip, now)
}
