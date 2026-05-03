'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { getEtfHubCategoryRows } from '@/lib/etfCategories'
import { usEtfHubPath } from '@/lib/siteRegion'
import styles from './EtfPageHubNav.module.css'

export interface EtfPageHubNavProps {
  variant: 'us' | 'ca'
  compact?: boolean
}

/** Jump-to-category dropdown linking to hub section anchors. */
export default function EtfPageHubNav({ variant, compact = false }: EtfPageHubNavProps) {
  const router = useRouter()
  const pathname = usePathname()
  const rows = getEtfHubCategoryRows(variant)
  const onCanadianSite = pathname === '/ca' || pathname.startsWith('/ca/')
  const base = variant === 'us' ? usEtfHubPath(onCanadianSite) : '/ca/etfs'

  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <nav className={compact ? styles.navCompact : styles.nav} aria-label="ETF hub categories">
      <span className={styles.label}>Hub categories</span>
      <div ref={rootRef} className={styles.root}>
        <button
          type="button"
          className={styles.trigger}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          Browse categories...
        </button>
        {open && (
          <ul role="listbox" className={styles.list}>
            {rows.map((r) => (
              <li key={r.id} role="presentation" className={styles.item}>
                <button
                  type="button"
                  role="option"
                  aria-selected={false}
                  className={styles.option}
                  onClick={() => {
                    router.push(`${base}#${r.id}`)
                    setOpen(false)
                  }}
                >
                  {r.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  )
}
