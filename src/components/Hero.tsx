import Link from 'next/link'
import styles from './Hero.module.css'

export interface HeroProps {
  /** `ca`: CTA to `/ca/portfolios` instead of `/portfolios`. */
  variant?: 'us' | 'ca'
}

export default function Hero({ variant = 'us' }: HeroProps) {
  const isCa = variant === 'ca'
  const portfolioHref = isCa ? '/ca/portfolios' : '/portfolios'

  return (
    <section className={styles.hero}>
      <h1 className={`${styles.heading} animate animate-1`}>
        Stack <em>alpha</em>, not beta
      </h1>

      <p className={`${styles.tagline} animate animate-2`}>
        Hedge fund strategies, stacked. Open to <span className={styles.taglineGold}>anyone</span>.
      </p>

      <p className={`${styles.sub} animate animate-3`}>
        <span className={styles.subHighlightWhite}>Alpha</span>
        <span className={styles.subHighlightGold}> stacking</span>
        {' '}
        takes the strongest ideas from proven institutional strategies (long/short equity, global macro, managed futures,
        risk premia, systematic alternatives) and layers them
        on top of equity. The aim is to create portfolios that can seek excess total returns in bull, bear and sideways
        markets.
      </p>

      <div className={`${styles.actions} animate animate-4`}>
        <Link href={portfolioHref} className={styles.btnPrimary}>
          Explore portfolios
        </Link>
      </div>
    </section>
  )
}
