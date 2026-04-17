'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getEtfHubCategoryRows } from '@/lib/etfCategories'
import { usEtfHubPath } from '@/lib/siteRegion'
import styles from './EtfPageHubNav.module.css'

export interface EtfPageHubNavProps {
  variant: 'us' | 'ca'
}

/** In-page links to ETF hub category sections (same anchors as the hub page). */
export default function EtfPageHubNav({ variant }: EtfPageHubNavProps) {
  const pathname = usePathname()
  const rows = getEtfHubCategoryRows(variant)
  const onCanadianSite = pathname === '/ca' || pathname.startsWith('/ca/')
  const base =
    variant === 'us' ? usEtfHubPath(onCanadianSite) : '/ca/etfs'

  return (
    <nav className={styles.nav} aria-label="ETF hub categories">
      <p className={styles.label}>Hub categories</p>
      <ul className={styles.list}>
        {rows.map((r) => (
          <li key={r.id}>
            <Link href={`${base}#${r.id}`} className={styles.link}>
              {r.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
