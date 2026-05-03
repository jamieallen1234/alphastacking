const WINDOW_MS = 15 * 60 * 1000
const MAX_PER_WINDOW = 5

type Bucket = { count: number; reset: number }

const buckets = new Map<string, Bucket>()

function prune(ip: string, now: number) {
  for (const [k, b] of buckets) {
    if (k === ip) continue
    if (now > b.reset) buckets.delete(k)
  }
}

/** Returns true if the request is allowed, false if rate limit exceeded. */
export function allowFeedbackRequest(ip: string, now: number = Date.now()): boolean {
  prune(ip, now)
  const b = buckets.get(ip)
  if (!b || now > b.reset) {
    buckets.set(ip, { count: 1, reset: now + WINDOW_MS })
    return true
  }
  if (b.count >= MAX_PER_WINDOW) return false
  b.count += 1
  return true
}
