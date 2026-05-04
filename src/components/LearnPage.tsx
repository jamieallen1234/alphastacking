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

  const first = articles[0]
  const second = articles[1]
  const third = articles[2]

  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.inner}>
        <p className={styles.kicker}>Educational</p>
        <h1 className={styles.h1}>Learn</h1>
        <p className={styles.lede}>
          Five articles in a suggested order, or open any topic you need—for any investor, with ETFs as the
          shared implementation lens across this site.
        </p>

        {first && second && third ? (
          <div className={styles.suggestedBox} role="note" aria-label="Suggested reading path">
            <p className={styles.suggestedTitle}>Suggested start</p>
            <p className={styles.suggestedBody}>
              Start with{' '}
              <Link href={first.href} className={styles.suggestedLink}>
                {first.title}
              </Link>
              , then{' '}
              <Link href={second.href} className={styles.suggestedLink}>
                {second.title}
              </Link>
              , then{' '}
              <Link href={third.href} className={styles.suggestedLink}>
                {third.title}
              </Link>
              <span className={styles.suggestedTime}> (~15 min total)</span>.
            </p>
          </div>
        ) : null}

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
