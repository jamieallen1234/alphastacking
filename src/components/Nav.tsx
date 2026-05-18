'use client'

import Link from 'next/link'
import {
  disclaimersPath,
  homePath,
  learnPath,
  portfolioBuilderPath,
  portfoliosPath,
  updatesPath,
  usEtfHubPath,
} from '@/lib/siteRegion'
import { useSiteRegion } from '@/lib/useSiteRegion'
import styles from './Nav.module.css'

export default function Nav() {
  const { isCa } = useSiteRegion()
  const home = homePath(isCa)
  const portfolios = portfoliosPath(isCa)
  const portfolioBuilder = portfolioBuilderPath(isCa)
  const learn = learnPath(isCa)
  const updates = updatesPath(isCa)
  const usEtfHub = usEtfHubPath(isCa)
  const disclaimers = disclaimersPath(isCa)

  return (
    <>
      <div className={styles.disclaimerBanner}>
        <p>
          For educational purposes only. Nothing on this site constitutes investment advice.
          <span className={styles.disclaimerBannerTail}>
            {' '}
            <Link href={disclaimers} className={styles.disclaimerBannerLink}>
              Disclaimers
            </Link>
          </span>
        </p>
      </div>

      <nav className={styles.nav}>
        <Link href={home} className={styles.logo}>
          alpha<span>stacking</span>.co
        </Link>

        <ul className={styles.navLinks}>
          <li>
            <Link href={portfolios}>Portfolios</Link>
          </li>
          <li>
            <Link href={usEtfHub}>{isCa ? 'US ETFs' : 'ETFs'}</Link>
          </li>
          {isCa ? (
            <li>
              <Link href="/ca/etfs">CA ETFs</Link>
            </li>
          ) : null}
          <li>
            <Link href={learn}>Learn</Link>
          </li>
          <li>
            <Link href={updates}>Updates</Link>
          </li>
          <li>
            <Link href={portfolioBuilder}>Builder</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
