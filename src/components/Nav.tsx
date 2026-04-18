'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { comparisonPath, homePath, portfoliosPath, usEtfHubPath } from '@/lib/siteRegion'
import styles from './Nav.module.css'

export default function Nav() {
  const pathname = usePathname()
  const isCa = pathname === '/ca' || pathname.startsWith('/ca/')
  const home = homePath(isCa)
  const portfolios = portfoliosPath(isCa)
  const usEtfHub = usEtfHubPath(isCa)
  const comparison = comparisonPath(isCa)

  return (
    <>
      <div className={styles.disclaimerBanner}>
        <p>
          For informational and educational purposes only. Nothing on this site constitutes investment advice.
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
          <li>
            <Link href={comparison}>Comparison</Link>
          </li>
          {isCa ? (
            <li>
              <Link href="/ca/etfs">CA ETFs</Link>
            </li>
          ) : null}
        </ul>
      </nav>
    </>
  )
}
