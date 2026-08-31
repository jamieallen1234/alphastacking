import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { homePath } from '@/lib/siteRegion'
import { getUpdatesFeed, type UpdateEntry } from '@/lib/updatesFeed'
import { getEtfHubOverallRatings, type EtfHubOverallRatings } from '@/lib/etfHubOverallRatings'
import { loadPortfolioHubAlphaBySlug, type PortfolioHubSlugData } from '@/lib/loadPortfolioHubAlpha'
import { computeBlendedGrade, type PortfolioLetterGrade } from '@/lib/portfolioHubGrade'
import styles from './UpdatesPage.module.css'

export type UpdatesPageEdition = 'us' | 'ca'

function ratingForEntry(
  entry: UpdateEntry,
  portfolioDataBySlug: Record<string, PortfolioHubSlugData>,
  etfRatings: EtfHubOverallRatings
): PortfolioLetterGrade | null {
  if (entry.kind === 'etf') return etfRatings[entry.slug] ?? null
  if (entry.kind !== 'portfolio' || entry.weightedBeta == null) return null
  const data = portfolioDataBySlug[entry.slug]
  if (!data) return null
  return computeBlendedGrade(data.payload1y, data.payloadMax, entry.weightedBeta)
}

export default async function UpdatesPage({ edition }: { edition: UpdatesPageEdition }) {
  const isCa = edition === 'ca'
  const home = homePath(isCa)
  const days = getUpdatesFeed(edition)
  const [portfolioDataBySlug, etfRatings] = await Promise.all([
    loadPortfolioHubAlphaBySlug(),
    getEtfHubOverallRatings(isCa ? 'ca' : 'us'),
  ])

  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.inner}>
        <h1 className={styles.h1}>What&rsquo;s new</h1>

        {days.length === 0 ? (
          <p className={styles.empty}>
            Updates will appear here as new ETFs, portfolios, and learn articles are added.
          </p>
        ) : (
          <ol className={styles.dayList}>
            {days.map((day) => (
              <li key={day.date} className={styles.dayBlock}>
                <h2 className={styles.dayHeading}>{day.displayDate}</h2>
                <ul className={styles.entryList}>
                  {day.entries.map((entry) => {
                    const rating = ratingForEntry(entry, portfolioDataBySlug, etfRatings)
                    const ratingClass = [
                      styles.entryRating,
                      rating === 'A+' ? styles.entryRatingAPlus : rating === 'A' ? styles.entryRatingA : '',
                    ]
                      .filter(Boolean)
                      .join(' ')
                    return (
                      <li key={`${entry.kind}-${entry.slug}`}>
                        <Link href={entry.href} className={styles.entryCard}>
                          <div className={styles.entryMeta}>
                            <span className={styles.entryKind}>
                              {entry.kindLabel ??
                                (entry.kind === 'etf'
                                  ? 'ETF'
                                  : entry.kind === 'portfolio'
                                    ? 'Portfolio'
                                    : entry.kind === 'feature'
                                      ? 'Site update'
                                      : 'Learn')}
                            </span>
                            {isCa ? (
                              <span className={styles.entryRegion}>
                                {entry.region === 'ca' ? 'CAD' : 'US'}
                              </span>
                            ) : null}
                            {entry.ticker ? (
                              <span className={styles.entryTicker}>{entry.ticker}</span>
                            ) : null}
                            {rating != null ? (
                              <span
                                className={ratingClass}
                                aria-label={
                                  entry.kind === 'etf'
                                    ? `Overall efficiency rating ${rating}`
                                    : `Portfolio rating ${rating}`
                                }
                              >
                                {rating}
                              </span>
                            ) : null}
                          </div>
                          <h3 className={styles.entryTitle}>{entry.title}</h3>
                          <p className={styles.entryBlurb}>{entry.blurb}</p>
                          <span className={styles.entryCta}>
                            {entry.kind === 'learn'
                              ? 'Read article'
                              : entry.kind === 'feature'
                                ? 'Try it now'
                                : 'View page'}{' '}
                            &rarr;
                          </span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </li>
            ))}
          </ol>
        )}

        <Link href={home} className={styles.back}>
          &larr; Back to home
        </Link>
      </section>
      <Footer />
    </main>
  )
}
