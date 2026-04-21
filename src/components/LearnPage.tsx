import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { homePath } from '@/lib/siteRegion'
import { learnArticlePath, RETURN_STACKING_VS_ALPHA_SLUG } from '@/lib/learnArticles'
import styles from './LearnPage.module.css'

export type LearnPageEdition = 'us' | 'ca'

export default function LearnPage({ edition }: { edition: LearnPageEdition }) {
  const isCa = edition === 'ca'
  const home = homePath(isCa)
  const articleHref = learnArticlePath(isCa, RETURN_STACKING_VS_ALPHA_SLUG)

  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.inner}>
        <p className={styles.kicker}>Educational</p>
        <h1 className={styles.h1}>Learn</h1>
        <p className={styles.lede}>
          Plain-language notes on portfolio construction — how sleeves combine, how correlation shapes outcomes, and
          how return stacking relates to building for compounding. Not personalized advice.
        </p>

        <ul className={styles.articleList}>
          <li>
            <Link href={articleHref} className={styles.articleCard}>
              <div className={styles.articleCardMeta}>
                <span className={styles.articleEyebrow}>Concepts</span>
                <span className={styles.articleRead}>~5 min read</span>
              </div>
              <h2 className={styles.articleCardTitle}>
                Return Stacking vs. Alpha Stacking: What&apos;s the Difference?
              </h2>
              <p className={styles.articleCardDeck}>
                Return stacking gives you more exposure per dollar. Alpha stacking gives you better sources of return.
                They&apos;re related — but not the same thing.
              </p>
              <span className={styles.articleCta}>Read article →</span>
            </Link>
          </li>
        </ul>

        <Link href={home} className={styles.back}>
          ← Back to home
        </Link>
      </section>
      <Footer />
    </main>
  )
}
