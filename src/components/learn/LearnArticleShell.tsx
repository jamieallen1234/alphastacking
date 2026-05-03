import type { ReactNode } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { learnPath } from '@/lib/siteRegion'
import styles from './LearnArticle.module.css'

export default function LearnArticleShell({
  children,
  edition,
}: {
  children: ReactNode
  edition: 'us' | 'ca'
}) {
  const learnHref = learnPath(edition === 'ca')

  return (
    <main className={styles.main}>
      <Nav />
      <div className={styles.shellTop}>
        <Link href={learnHref} className={styles.shellBack} aria-label="Back to Learn">
          <span className={styles.shellBackArrow} aria-hidden>
            ←
          </span>
          Learn
        </Link>
      </div>
      {children}
      <Footer />
    </main>
  )
}
