import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { homePath } from '@/lib/siteRegion'
import {
  WHAT_IS_ALPHA_SLUG,
  ETF_PAGES_BUILDER_101_SLUG,
  EFFICIENCY_GRADES_SLUG,
  HOW_TO_BUILD_SLUG,
  learnArticlePath,
  WHY_ALPHA_STACKING_SLUG,
} from '@/lib/learnArticles'
import styles from './LearnPage.module.css'

export type LearnPageEdition = 'us' | 'ca'

export default function LearnPage({ edition }: { edition: LearnPageEdition }) {
  const isCa = edition === 'ca'
  const home = homePath(isCa)

  const articles = [
    {
      href: learnArticlePath(isCa, WHAT_IS_ALPHA_SLUG),
      eyebrow: 'Concepts',
      read: '~3 min read',
      title: 'What is alpha stacking',
      deck: 'Equity plus return sources that earn when stocks don\u2019t. What the strategy is, how capital efficiency makes it possible, and definitions of the key terms.',
    },
    {
      href: learnArticlePath(isCa, ETF_PAGES_BUILDER_101_SLUG),
      eyebrow: 'Site guide',
      read: '~5 min read',
      title: 'ETF pages, model portfolios, and the portfolio builder',
      deck: 'How to read each section of the site and move from ETF research to model weights to builder stress-tests.',
    },
    {
      href: learnArticlePath(isCa, HOW_TO_BUILD_SLUG),
      eyebrow: 'Portfolio construction',
      read: '~6 min read',
      title: 'How to build an alpha stacking portfolio',
      deck: 'The four sleeve types, how total beta works, and a worked example using the US Alpha Stack model portfolio.',
    },
    {
      href: learnArticlePath(isCa, WHY_ALPHA_STACKING_SLUG),
      eyebrow: 'Strategy comparison',
      read: '~7 min read',
      title: 'Why alpha stacking',
      deck: 'How alpha stacking compares to index funds, return stacking, all-weather portfolios, and leveraged ETFs, with a plain language read on when each option tends to fit.',
    },
    {
      href: learnArticlePath(isCa, EFFICIENCY_GRADES_SLUG),
      eyebrow: 'Reference',
      read: '~5 min read',
      title: 'Capital, Alpha, and Stacked Efficiency grades explained',
      deck: 'What the letter grades on each ETF page measure, how they\u2019re calculated, and what they do not tell you.',
    },
  ]

  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.inner}>
        <p className={styles.kicker}>Educational</p>
        <h1 className={styles.h1}>Learn</h1>
        <p className={styles.lede}>
          Five articles, start to finish. Read them in order or jump to the one you need.
        </p>

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
