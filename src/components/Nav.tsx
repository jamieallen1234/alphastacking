'use client'

import styles from './Nav.module.css'

export default function Nav() {
  return (
    <>
      {/* Disclaimer banner */}
      <div className={styles.disclaimerBanner}>
        <p>
          For informational and educational purposes only. Nothing on this site constitutes investment advice.{' '}
          <a href="/disclaimer">Full disclaimer →</a>
        </p>
      </div>

      {/* Main nav */}
      <nav className={styles.nav}>
        <div className={styles.logo}>
          alpha<span>stacking</span>.co
        </div>

        <ul className={styles.navLinks}>
          <li><a href="/learn">Learn</a></li>
          <li><a href="/portfolios">Portfolios</a></li>
          <li><a href="/us-etfs">US ETFs</a></li>
          <li><a href="/ca-etfs">CA ETFs</a></li>
          <li><a href="/tools">Tools</a></li>
        </ul>

        <a href="/portfolios" className={styles.navCta}>
          View portfolios →
        </a>
      </nav>
    </>
  )
}
