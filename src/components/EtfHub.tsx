import FeedbackInlineLink from '@/components/FeedbackInlineLink'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { getEtfHubCategoryRows } from '@/lib/etfCategories'
import { getEtfHubItems, type EtfHubListItem } from '@/lib/etfHubData'
import EtfPageHubNav from '@/components/EtfPageHubNav'
import styles from './EtfHub.module.css'

export interface EtfHubProps {
  /** Which ETF universe to list (US-listed vs Canadian-listed rows in `etfHubData`). */
  listing: 'us' | 'ca'
  /** Regional site chrome: Canadian edition vs United States (nav + labels). */
  edition: 'us' | 'ca'
}

function EtfRow({ item }: { item: EtfHubListItem }) {
  const inner = (
    <>
      <p className={styles.etfName}>{item.nameLine}</p>
      <p className={styles.etfDesc}>{item.desc}</p>
    </>
  )

  return (
    <Link href={item.href} className={styles.etfRow}>
      {inner}
    </Link>
  )
}

export default function EtfHub({ listing, edition }: EtfHubProps) {
  const categoryRows = getEtfHubCategoryRows(listing)

  return (
    <main className={styles.main}>
      <Nav />
      <div className={styles.hubNavTop}>
        <EtfPageHubNav variant={listing} compact />
      </div>
      <section className={styles.section} aria-labelledby="etf-hub-heading">
        <div className={styles.sectionLabel}>
          {edition === 'ca' ? 'Canadian edition' : 'United States'}
        </div>
        <h1 id="etf-hub-heading" className={styles.heading}>
          ETFs
        </h1>
        <p className={styles.lede}>
          {listing === 'ca'
            ? 'Canadian-listed funds grouped by strategy. Each category below explains what these funds do and why they belong in an alpha stacking portfolio.'
            : 'US-listed funds grouped by strategy. Each category below explains what these funds do and why they belong in an alpha stacking portfolio.'}
        </p>

        <div className={styles.categories}>
          {categoryRows.map((cat) => {
            const items = getEtfHubItems(listing, cat.id, edition)
            return (
              <section
                key={cat.id}
                id={cat.id}
                className={styles.category}
                aria-labelledby={`etf-cat-${cat.id}`}
              >
                <h2 id={`etf-cat-${cat.id}`} className={styles.categoryTitle}>
                  {cat.title}
                </h2>
                {cat.subtitle ? (
                  <p className={styles.categorySubtitle}>{cat.subtitle}</p>
                ) : null}
                {items.length === 0 ? (
                  <p className={styles.comingSoon}>Coming soon</p>
                ) : (
                  <ul className={styles.etfList}>
                    {items.map((item) => (
                      <li key={item.key}>
                        <EtfRow item={item} />
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )
          })}
        </div>
      </section>
      <div className={styles.hubFeedbackSlot}>
        <div className={styles.hubFeedbackInner}>
          <FeedbackInlineLink isCa={edition === 'ca'} context="etf" />
        </div>
      </div>
      <Footer />
    </main>
  )
}
