'use client'

import Link from 'next/link'
import { REGION_COOKIE, contactPath, disclaimersPath, type SiteRegion } from '@/lib/siteRegion'
import { useSiteRegion } from '@/lib/useSiteRegion'
import styles from './Footer.module.css'

function setRegionCookie(region: SiteRegion) {
  if (typeof document === 'undefined') return
  document.cookie = `${REGION_COOKIE}=${region};path=/;max-age=31536000;SameSite=Lax`
}

export default function Footer() {
  const { isCa } = useSiteRegion()
  const contact = contactPath(isCa)
  const disclaimers = disclaimersPath(isCa)

  return (
    <footer>
      <div className={styles.strip}>
        <div className={styles.stripLeft}>
          <div className={styles.logo}>
            alpha<span>stacking</span>.co
          </div>
          <div className={styles.stripLinks}>
            <Link href={contact} className={styles.footerContact}>
              Contact
            </Link>
            <Link href={disclaimers} className={styles.footerContact}>
              Disclaimers
            </Link>
          </div>
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
      </div>
    </footer>
  )
}
