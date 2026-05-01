import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { homePath } from '@/lib/siteRegion'
import {
  ETF_PAGES_BUILDER_101_SLUG,
  EFFICIENCY_GRADES_SLUG,
  HOW_TO_BUILD_SLUG,
  learnArticlePath,
  RETURN_STACKING_VS_ALPHA_SLUG,
  WHY_ALPHA_STACKING_SLUG,
} from '@/lib/learnArticles'
import styles from './LearnPage.module.css'

export type LearnPageEdition = 'us' | 'ca'

export default function LearnPage({ edition }: { edition: LearnPageEdition }) {
  const isCa = edition === 'ca'
  const home = homePath(isCa)
  const rsVsAlphaHref = learnArticlePath(isCa, RETURN_STACKING_VS_ALPHA_SLUG)
  const etf101Href = learnArticlePath(isCa, ETF_PAGES_BUILDER_101_SLUG)
  const howToBuildHref = learnArticlePath(isCa, HOW_TO_BUILD_SLUG)
  const whyAlphaHref = learnArticlePath(isCa, WHY_ALPHA_STACKING_SLUG)
  const gradesHref = learnArticlePath(isCa, EFFICIENCY_GRADES_SLUG)

  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.inner}>
        <p className={styles.kicker}>Educational</p>
        <h1 className={styles.h1}>Learn</h1>
        <p className={styles.lede}>
          How alpha stacking works, how it compares to other strategies, and how to use the ETF pages and portfolio
          builder to put a portfolio together.
        </p>

        <ul className={styles.articleList}>
          <li>
            <Link href={howToBuildHref} className={styles.articleCard}>
              <div className={styles.articleCardMeta}>
                <span className={styles.articleEyebrow}>Portfolio construction</span>
                <span className={styles.articleRead}>~8 min read</span>
              </div>
              <h2 className={styles.articleCardTitle}>How to build an alpha stacking portfolio</h2>
              <p className={styles.articleCardDeck}>
                A walkthrough from sleeve selection to position sizing, using a model portfolio as a worked example.
                Covers why each layer is there and how they fit together.
              </p>
              <span className={styles.articleCta}>Read article →</span>
            </Link>
          </li>
          <li>
            <Link href={whyAlphaHref} className={styles.articleCard}>
              <div className={styles.articleCardMeta}>
                <span className={styles.articleEyebrow}>Strategy comparison</span>
                <span className={styles.articleRead}>~7 min read</span>
              </div>
              <h2 className={styles.articleCardTitle}>Why alpha stacking — and when it might not be right for you</h2>
              <p className={styles.articleCardDeck}>
                How alpha stacking compares to index funds, all-weather, return stacking, leveraged ETFs, and
                covered-call funds. One honest section per comparison, including when each alternative wins.
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
                Return stacking vs. alpha stacking
              </h2>
              <p className={styles.articleCardDeck}>
                Return stacking is the mechanism — fitting more exposure into each dollar. Alpha stacking is the
                philosophy — which exposures to combine and why. The difference matters for portfolio construction.
              </p>
              <span className={styles.articleCta}>Read article →</span>
            </Link>
          </li>
          <li>
            <Link href={gradesHref} className={styles.articleCard}>
              <div className={styles.articleCardMeta}>
                <span className={styles.articleEyebrow}>Reference</span>
                <span className={styles.articleRead}>~5 min read</span>
              </div>
              <h2 className={styles.articleCardTitle}>Capital, Alpha, and Stacked Efficiency grades explained</h2>
              <p className={styles.articleCardDeck}>
                What the letter grades on each ETF page measure, how they&apos;re calculated, and what they do
                not tell you.
              </p>
              <span className={styles.articleCta}>Read article →</span>
            </Link>
          </li>
          <li>
            <Link href={etf101Href} className={styles.articleCard}>
              <div className={styles.articleCardMeta}>
                <span className={styles.articleEyebrow}>Site guide</span>
                <span className={styles.articleRead}>~5 min read</span>
              </div>
              <h2 className={styles.articleCardTitle}>ETF pages, model portfolios, and the portfolio builder</h2>
              <p className={styles.articleCardDeck}>
                How to read each section of the site and move from ETF research to model weights to builder
                stress-tests — without leaving the site.
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
