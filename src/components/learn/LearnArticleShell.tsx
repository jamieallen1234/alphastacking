import type { ReactNode } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { learnPath } from '@/lib/siteRegion'
import { getLearnArticleNeighbors, learnArticlePath } from '@/lib/learnArticles'
import styles from './LearnArticle.module.css'

export default function LearnArticleShell({
  children,
  edition,
  currentSlug,
}: {
  children: ReactNode
  edition: 'us' | 'ca'
  /** Slug segment only, e.g. `what-is-alpha-stacking`. */
  currentSlug: string
}) {
  const isCa = edition === 'ca'
  const learnHref = learnPath(isCa)
  const { prev, next } = getLearnArticleNeighbors(currentSlug)

  return (
    <main className={styles.main}>
      <Nav />
      <div className={styles.shellTop}>
        <nav className={styles.shellNav} aria-label="Learn section">
          <Link href={learnHref} className={styles.shellBack} aria-label="Back to Learn">
            <span className={styles.shellBackArrow} aria-hidden>
              ←
            </span>
            Learn
          </Link>
          <div className={styles.shellSeries}>
            {prev ? (
              <Link
                href={learnArticlePath(isCa, prev.slug)}
                className={styles.shellSeriesLink}
                rel="prev"
              >
                <span className={styles.shellSeriesDir} aria-hidden>
                  ←{' '}
                </span>
                {prev.title}
              </Link>
            ) : (
              <span className={styles.shellSeriesMuted}>First article</span>
            )}
            <span className={styles.shellSeriesSep} aria-hidden>
              |
            </span>
            {next ? (
              <Link
                href={learnArticlePath(isCa, next.slug)}
                className={styles.shellSeriesLink}
                rel="next"
              >
                {next.title}
                <span className={styles.shellSeriesDir} aria-hidden>
                  {' '}
                  →
                </span>
              </Link>
            ) : (
              <span className={styles.shellSeriesMuted}>Last article</span>
            )}
          </div>
        </nav>
      </div>
      {children}
      <Footer />
    </main>
  )
}
