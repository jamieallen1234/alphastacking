import { getSiteUrl } from '@/lib/siteUrl'

interface BreadcrumbItem {
  name: string
  href: string
}

export default function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const siteUrl = getSiteUrl()
  const payload = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.href}`,
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  )
}
