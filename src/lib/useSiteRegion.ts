'use client'

import { usePathname } from 'next/navigation'
import { pathIsCa, type SiteRegion } from '@/lib/siteRegion'

/** Client hook: derives the current site region from the URL pathname. */
export function useSiteRegion(): { isCa: boolean; region: SiteRegion } {
  const pathname = usePathname()
  const isCa = pathIsCa(pathname)
  return { isCa, region: isCa ? 'ca' : 'us' }
}
