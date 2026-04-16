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
        <span className={styles.subHighlightGold}> stacking</span> involves stacking uncorrelated assets on top of a core portfolio to
        generate excess returns. It improves upon return stacking by focusing on higher expected returns
        while keeping beta similar to traditional portfolios. Strategies found in hedge funds such as long/short,
        global macro, risk premia and systematic alternatives are deployed to improve returns while managing risk.
      </p>

      <div className={`${styles.actions} animate animate-4`}>
        <Link href={portfolioHref} className={styles.btnPrimary}>
          Explore portfolios
        </Link>
      </div>

      <p className={`${styles.legal} animate animate-5`}>
        Educational content only. Not investment advice. Past performance does not
        guarantee future results. Leveraged ETFs involve substantial risk and are
        not suitable for all investors.
      </p>
    </section>
  )
}
