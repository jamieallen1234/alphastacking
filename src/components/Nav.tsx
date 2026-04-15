'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { homePath, portfoliosPath } from '@/lib/siteRegion'
import styles from './Nav.module.css'

export default function Nav() {
  const pathname = usePathname()
  const isCa = pathname === '/ca' || pathname.startsWith('/ca/')
  const home = homePath(isCa)
  const portfolios = portfoliosPath(isCa)

  return (
    <>
      <div className={styles.disclaimerBanner}>
        <p>
          For informational and educational purposes only. Nothing on this site constitutes investment advice.{' '}
          <a href="/disclaimer">Full disclaimer →</a>
        </p>
      </div>

      <nav className={styles.nav}>
        <Link href={home} className={styles.logo}>
          alpha<span>stacking</span>.co
        </Link>

        <ul className={styles.navLinks}>
          <li><a href="/learn">Learn</a></li>
          <li>
            <Link href={portfolios}>Portfolios</Link>
          </li>
          <li><a href="/us-etfs">US ETFs</a></li>
          <li><a href="/ca-etfs">CA ETFs</a></li>
          <li><a href="/tools">Tools</a></li>
        </ul>

        <Link href={portfolios} className={styles.navCta}>
          View portfolios →
        </Link>
      </nav>
    </>
  )
}
