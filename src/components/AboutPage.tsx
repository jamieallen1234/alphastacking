import Link from 'next/link'
import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import { methodologyPath } from '@/lib/siteRegion'
import styles from './SiteInfoPage.module.css'

export default function AboutPage({ edition }: { edition: 'us' | 'ca' }) {
  const isCa = edition === 'ca'

  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.inner}>
        <p className={styles.kicker}>Site</p>
        <h1 className={styles.h1}>About Alpha Stacking</h1>
        <p className={styles.lede}>
          Alpha Stacking is an independent educational site about ETF portfolio construction. It covers
          return stacking, diversified return sources, model portfolios, and the trade-offs behind each
          choice.
        </p>

        <div className={styles.section}>
          <h2>Created by Jamie Allen</h2>
          <p>
            Jamie Allen holds a Bachelor of Computer Science with an Economics minor, completed in
            2005. He has invested in Canadian and U.S. markets since 2006 and focuses his research on
            ETF strategies and portfolio construction.
          </p>
          <p>
            Jamie created the Alpha Stacking methodology and applies it in his personal and family
            portfolios.
          </p>
        </div>

        <div className={styles.section}>
          <h2>What the site provides</h2>
          <p>
            ETF write-ups, educational model portfolios, portfolio charts, and tools for comparing
            allocations. It does not provide individualized financial, legal, or tax advice.
          </p>
        </div>

        <div className={styles.section}>
          <h2>How information is checked</h2>
          <p>
            ETF pages link to issuer and regulatory materials for current fund details. Charts and
            ratings use historical market data and stated assumptions. Read the{' '}
            <Link href={methodologyPath(isCa)}>methodology</Link> for the short version of how those
            tools work and where their limits are.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  )
}
