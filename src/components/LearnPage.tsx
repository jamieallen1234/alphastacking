import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { homePath } from '@/lib/siteRegion'
import { LEARN_ARTICLES, learnArticlePath } from '@/lib/learnArticles'
import styles from './LearnPage.module.css'

export type LearnPageEdition = 'us' | 'ca'

export default function LearnPage({ edition }: { edition: LearnPageEdition }) {
  const isCa = edition === 'ca'
  const home = homePath(isCa)

  const articles = LEARN_ARTICLES.map((a) => ({
    ...a,
    href: learnArticlePath(isCa, a.slug),
  }))

  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.inner}>
        <p className={styles.kicker}>Educational</p>
        <h1 className={styles.h1}>Learn</h1>
        <ol className={styles.articleList}>
          {articles.map((a, i) => (
            <li key={a.href}>
              <Link href={a.href} className={styles.articleCard}>
                <div className={styles.articleCardMeta}>
                  <span className={styles.articleStep}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.articleEyebrow}>{a.eyebrow}</span>
                  <span className={styles.articleRead}>{a.read}</span>
                </div>
                <h2 className={styles.articleCardTitle}>{a.title}</h2>
                <p className={styles.articleCardDeck}>{a.deck}</p>
                <span className={styles.articleCta}>Read article →</span>
              </Link>
            </li>
          ))}
        </ol>

        <Link href={home} className={styles.back}>
          ← Back to home
        </Link>
      </section>
      <Footer />
    </main>
  )
}
