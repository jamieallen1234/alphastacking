import Link from 'next/link'
import styles from './EtfRetailMission.module.css'

export interface EtfRetailMissionProps {
  /** US home → `/us-etfs`; Canadian home → `/ca/etfs`. */
  variant?: 'us' | 'ca'
}

/** Why this site focuses on ETFs: retail access vs gated vehicles. */
export default function EtfRetailMission({ variant = 'us' }: EtfRetailMissionProps) {
  const etfHref = variant === 'ca' ? '/ca/etfs' : '/us-etfs'

  return (
    <section className={styles.section} aria-labelledby="etf-mission-heading">
      <h2 id="etf-mission-heading" className={styles.heading}>
        For every investor
      </h2>
      <p className={styles.body}>
        Alpha stacking brings institutional portfolio construction within reach of any investor, built entirely from
        low-cost, publicly listed ETFs. These strategies are no longer exclusive to hedge funds, private equity, and
        venture capital. No minimums or accreditation required.
      </p>
      <Link href={etfHref} className={styles.etfButton}>
        Explore ETFs
      </Link>
    </section>
  )
}
