import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { homePath } from '@/lib/siteRegion'
import {
  ETF_PAGES_BUILDER_101_SLUG,
  learnArticlePath,
  RETURN_STACKING_VS_ALPHA_SLUG,
} from '@/lib/learnArticles'
import styles from './LearnPage.module.css'

export type LearnPageEdition = 'us' | 'ca'

export default function LearnPage({ edition }: { edition: LearnPageEdition }) {
  const isCa = edition === 'ca'
  const home = homePath(isCa)
  const rsVsAlphaHref = learnArticlePath(isCa, RETURN_STACKING_VS_ALPHA_SLUG)
  const etf101Href = learnArticlePath(isCa, ETF_PAGES_BUILDER_101_SLUG)

  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.inner}>
        <p className={styles.kicker}>Educational</p>
        <h1 className={styles.h1}>Learn</h1>
        <p className={styles.lede}>
          Return stacking versus alpha stacking, plus how to move from the ETF write-ups and model portfolios into the
          builder.
        </p>

        <ul className={styles.articleList}>
          <li>
            <Link href={etf101Href} className={styles.articleCard}>
              <div className={styles.articleCardMeta}>
                <span className={styles.articleEyebrow}>Getting started</span>
                <span className={styles.articleRead}>~6 min read</span>
              </div>
              <h2 className={styles.articleCardTitle}>ETF pages, sample portfolios, and the portfolio builder</h2>
              <p className={styles.articleCardDeck}>
                How to read the ETF research pages, then copy ideas from model portfolios into the builder to stress-test
                weights and ranges — without leaving the site.
              </p>
              <span className={styles.articleCta}>Read article →</span>
            </Link>
          </li>
          <li>
            <Link href={rsVsAlphaHref} className={styles.articleCard}>
              <div className={styles.articleCardMeta}>
                <span className={styles.articleEyebrow}>Concepts</span>
                <span className={styles.articleRead}>~6 min read</span>
              </div>
              <h2 className={styles.articleCardTitle}>
                Return Stacking vs. Alpha Stacking: What&apos;s the Difference?
              </h2>
              <p className={styles.articleCardDeck}>
                One is about fitting more market exposure into each dollar; the other is about which types of return you
                deliberately combine. Written for index investors new to these terms.
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
