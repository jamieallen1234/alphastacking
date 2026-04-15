'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { REGION_COOKIE, type SiteRegion } from '@/lib/siteRegion'
import styles from './Footer.module.css'

function setRegionCookie(region: SiteRegion) {
  if (typeof document === 'undefined') return
  document.cookie = `${REGION_COOKIE}=${region};path=/;max-age=31536000;SameSite=Lax`
}

export default function Footer() {
  const pathname = usePathname()
  const isCa = pathname === '/ca' || pathname.startsWith('/ca/')

  return (
    <footer>
      <div className={styles.legalBlock}>
        <p>
          alphastacking.co is an independent educational website. Nothing on this
          site constitutes financial, investment, legal, or tax advice. All content
          is provided for informational purposes only. Sample portfolios are
          for educational purposes and do not represent actual investment results. Past
          performance is not indicative of future results.
        </p>
        <p>
          Leveraged and inverse ETFs are complex instruments that use financial
          derivatives and debt to amplify returns. They are subject to volatility
          decay and are designed for short-term trading by definition of their
          structure. They may not be suitable for long-term investors or investors
          who are not able to withstand the risk of significant loss. alphastacking.co
          may receive compensation through affiliate relationships with brokers and
          financial services. All affiliate relationships are disclosed.{' '}
          <a href="/disclaimer">Full disclaimer</a>{' '}
          ·{' '}
          <a href="/affiliate-disclosure">Affiliate disclosure</a>
        </p>
      </div>

      <div className={styles.strip}>
        <div className={styles.logo}>
          alpha<span>stacking</span>.co
        </div>

        <div className={styles.regionToggle}>
          Viewing:
          <Link
            href="/"
            className={`${styles.regionBtn} ${!isCa ? styles.regionBtnActive : ''}`}
            onClick={() => setRegionCookie('us')}
          >
            🇺🇸 US
          </Link>
          <Link
            href="/ca"
            className={`${styles.regionBtn} ${isCa ? styles.regionBtnActive : ''}`}
            onClick={() => setRegionCookie('ca')}
          >
            🇨🇦 CA
          </Link>
        </div>

        <ul className={styles.links}>
          <li><a href="/disclaimer">Disclaimer</a></li>
          <li><a href="/affiliate-disclosure">Affiliate disclosure</a></li>
          <li><a href="https://x.com/alphastacking" target="_blank" rel="noopener noreferrer">X / Twitter</a></li>
        </ul>
      </div>
    </footer>
  )
}
