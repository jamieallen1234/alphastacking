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
        Built from ETFs, for every investor
      </h2>
      <p className={styles.body}>
        The portfolio ideas on this site are made up of <strong>ETFs</strong> exclusively.
        ETFs are known for low fees and are available to the public —
        unlike hedge funds, private equity, and closed-ended funds that wall off retail investors.
        We believe that alpha stacking should be accessible to everyone.
      </p>
      <Link href={etfHref} className={styles.etfButton}>
        Explore ETFs
      </Link>
    </section>
  )
}
