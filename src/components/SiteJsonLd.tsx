import { getSiteUrl, siteTwitterUrl } from '@/lib/siteUrl'

/** Sitewide WebSite + social profile hints for search engines. */
export default function SiteJsonLd() {
  const siteUrl = getSiteUrl()
  const payload = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Alpha Stacking',
    url: siteUrl,
    sameAs: [siteTwitterUrl()],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  )
}
