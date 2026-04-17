import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { getEtfHubCategoryRows } from '@/lib/etfCategories'
import { getEtfHubItems, type EtfHubListItem } from '@/lib/etfHubData'
import styles from './EtfHub.module.css'

export interface EtfHubProps {
  variant: 'us' | 'ca'
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

export default function EtfHub({ variant }: EtfHubProps) {
  const isCa = variant === 'ca'
  const categoryRows = getEtfHubCategoryRows(variant)

  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.section} aria-labelledby="etf-hub-heading">
        <div className={styles.sectionLabel}>
          {isCa ? 'Canadian edition' : 'United States'}
        </div>
        <h1 id="etf-hub-heading" className={styles.heading}>
          ETFs
        </h1>
        <p className={styles.lede}>
          {isCa
            ? 'Canadian-listed and we track for alpha stacking — grouped by strategy. Full write-ups are on the way.'
            : 'US-listed funds we track for alpha stacking — grouped by strategy. Full write-ups are on the way.'}
        </p>

        <div className={styles.categories}>
          {categoryRows.map((cat) => {
            const items = getEtfHubItems(variant, cat.id)
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
      <Footer />
    </main>
  )
}
