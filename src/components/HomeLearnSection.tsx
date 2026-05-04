import Link from 'next/link'
import { learnPath } from '@/lib/siteRegion'
import styles from './HomeLearnSection.module.css'

export interface HomeLearnSectionProps {
  variant?: 'us' | 'ca'
}

export default function HomeLearnSection({ variant = 'us' }: HomeLearnSectionProps) {
  const isCa = variant === 'ca'
  const learnHref = learnPath(isCa)

  return (
    <section className={styles.section} aria-labelledby="home-learn-heading">
      <h2 id="home-learn-heading" className={styles.label}>
        Learn
      </h2>
      <p className={styles.lede}>
        Short guides on alpha stacking, the portfolio builder, ETF pages, and efficiency grades.
      </p>
      <div className={styles.actions}>
        <Link href={learnHref} className={styles.cta}>
          Learn the basics
        </Link>
      </div>
    </section>
  )
}
