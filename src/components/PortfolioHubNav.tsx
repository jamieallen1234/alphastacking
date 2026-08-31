'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './EtfPageHubNav.module.css'

export interface PortfolioHubNavCategory {
  id: string
  title: string
}

export interface PortfolioHubNavProps {
  categories: PortfolioHubNavCategory[]
  base: string
  compact?: boolean
}

/** Jump-to-category dropdown for the portfolio hub. */
export default function PortfolioHubNav({ categories, base, compact = false }: PortfolioHubNavProps) {
  const router = useRouter()
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
    <nav className={compact ? styles.navCompact : styles.nav} aria-label="Portfolio categories">
      <span className={styles.label}>Portfolio categories</span>
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
            {categories.map((cat) => (
              <li key={cat.id} role="presentation" className={styles.item}>
                <button
                  type="button"
                  role="option"
                  aria-selected={false}
                  className={styles.option}
                  onClick={() => {
                    router.push(`${base}#${cat.id}`)
                    setOpen(false)
                  }}
                >
                  {cat.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  )
}
