/** Canonical site origin, no trailing slash. */
export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://alphastacking.co').replace(/\/$/, '')
}

/** Public X (Twitter) handle without @ — used in URLs and meta tags. */
export const SITE_TWITTER_HANDLE = 'alphastackingco'

export function siteTwitterUrl(): string {
  return `https://x.com/${SITE_TWITTER_HANDLE}`
}
