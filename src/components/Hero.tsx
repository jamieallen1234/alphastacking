import Link from 'next/link'
import styles from './Hero.module.css'

export interface HeroProps {
  /** `ca`: Canadian edition label and CTA to `/ca/portfolios`. */
  variant?: 'us' | 'ca'
}

export default function Hero({ variant = 'us' }: HeroProps) {
  const isCa = variant === 'ca'
  const portfolioHref = isCa ? '/ca/portfolios' : '/portfolios'

  return (
    <section className={styles.hero}>
      <div className={`${styles.label} animate animate-1`}>
        {isCa ? 'Canadian edition' : 'A framework for portfolio construction'}
      </div>

      <h1 className={`${styles.heading} animate animate-2`}>
        Stack <em>alpha</em>, not beta
      </h1>

      <p className={`${styles.tagline} animate animate-3`}>
        Hedge fund strategies open to <span className={styles.taglineGold}>anyone</span>
      </p>

      <p className={`${styles.sub} animate animate-4`}>
        <span className={styles.subHighlightWhite}>Alpha</span>
        <span className={styles.subHighlightGold}> stacking</span>
        {' '}
        takes the strongest ideas from different proven strategies (long/short equity, global macro, managed futures,
        risk premia, systematic alternatives) and layers them
        on top of equity. The aim is to create portfolios that can seek excess total returns in bull, bear and sideways
        markets.
      </p>

      <div className={`${styles.actions} animate animate-5`}>
        <Link href={portfolioHref} className={styles.btnPrimary}>
          Explore portfolios
        </Link>
      </div>
    </section>
  )
}
