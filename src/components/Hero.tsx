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
        {isCa ? 'Canadian edition' : 'A new framework for portfolio construction'}
      </div>

      <h1 className={`${styles.heading} animate animate-2`}>
        Stack <em>alpha</em>, not beta
      </h1>

      <p className={`${styles.sub} animate animate-3`}>
        <span className={styles.subHighlightWhite}>Alpha</span>
        <span className={styles.subHighlightGold}> stacking</span> takes the strongest ideas from different proven strategies—long/short
        equity, global macro, managed futures, risk premia, systematic alternatives—and combines them in
        synergistic ways on top of a core book. The aim is a whole portfolio that can seek excess return
        in bull, bear, and sideways or choppy markets alike, without treating “more equity beta” as the only
        dial for performance.
      </p>

      <div className={`${styles.actions} animate animate-4`}>
        <Link href={portfolioHref} className={styles.btnPrimary}>
          Explore portfolios
        </Link>
      </div>

      <p className={`${styles.legal} animate animate-5`}>
        Educational only—not advice. Past performance does not guarantee future results. Leveraged ETFs involve substantial risk.
      </p>
    </section>
  )
}
