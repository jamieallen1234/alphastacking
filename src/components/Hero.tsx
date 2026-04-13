import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`${styles.label} animate animate-1`}>
        A new framework for portfolio construction
      </div>

      <h1 className={`${styles.heading} animate animate-2`}>
        Stack more <em>alpha.</em>
        <br />
        Deploy less capital.
      </h1>

      <p className={`${styles.sub} animate animate-3`}>
        Alpha stacking layers leveraged excess returns on top of a core portfolio —
        compounding advantage across strategies without proportionally increasing
        capital at risk.
      </p>

      <div className={`${styles.actions} animate animate-4`}>
        <a href="/portfolios" className={styles.btnPrimary}>
          Explore sample portfolios
        </a>
        <a href="/learn" className={styles.btnGhost}>
          What is alpha stacking? →
        </a>
      </div>

      <p className={`${styles.legal} animate animate-5`}>
        Educational content only. Not investment advice. Past performance does not
        guarantee future results. Leveraged ETFs involve substantial risk and are
        not suitable for all investors.
      </p>
    </section>
  )
}
