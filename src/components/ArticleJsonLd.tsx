import { getSiteUrl } from '@/lib/siteUrl'

export default function ArticleJsonLd({
  title,
  description,
  path,
  publishedDate,
}: {
  title: string
  description: string
  path: string
  publishedDate: string
}) {
  const siteUrl = getSiteUrl()
  const payload = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${siteUrl}${path}`,
    image: `${siteUrl}/opengraph-image`,
    datePublished: `${publishedDate}T00:00:00Z`,
    author: {
      '@type': 'Organization',
      name: 'Alpha Stacking',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Alpha Stacking',
      url: siteUrl,
    },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  )
}
