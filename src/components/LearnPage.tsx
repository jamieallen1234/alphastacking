import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { homePath } from '@/lib/siteRegion'
import styles from './LearnPage.module.css'

export type LearnPageEdition = 'us' | 'ca'

export default function LearnPage({ edition }: { edition: LearnPageEdition }) {
  const isCa = edition === 'ca'
  const home = homePath(isCa)

  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.inner}>
        <p className={styles.kicker}>Coming soon</p>
        <h1 className={styles.h1}>Learn</h1>
        <p className={styles.lede}>
          Portfolio construction—how to combine sleeves, think about risk and correlation, and use
          return stacking in a deliberate, educational way.
        </p>
        <p className={styles.body}>
          This section is under construction. It will walk through building a portfolio oriented
          toward sustainable alpha versus broad market beta, with plain-language framing—not
          personalized advice.
        </p>
        <Link href={home} className={styles.back}>
          ← Back to home
        </Link>
      </section>
      <Footer />
    </main>
  )
}
