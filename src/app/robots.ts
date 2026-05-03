import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/siteUrl'

const SITE = getSiteUrl()

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE}/sitemap.xml`,
  }
}
