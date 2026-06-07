import { createRateLimiter } from '@/lib/rateLimit'

const limiter = createRateLimiter({ windowMs: 15 * 60 * 1000, max: 5 })

/** Returns true if the request is allowed, false if rate limit exceeded. */
export function allowFeedbackRequest(ip: string, now: number = Date.now()): boolean {
  return limiter.allow(ip, now)
}
