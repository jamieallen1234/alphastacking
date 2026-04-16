'use client'

import Sparkline from './Sparkline'
import PortfolioBuilder from './PortfolioBuilder'
import { portfolios } from '@/lib/portfolios'
import styles from './Portfolios.module.css'

/** US home: illustrative cards only; Canadian models live on the CA edition. */
const US_HOME_PORTFOLIOS = portfolios.filter((p) => p.region.includes('us'))

export default function Portfolios() {
  const filtered = US_HOME_PORTFOLIOS

  return (
    <section className={styles.section}>
      <div className={styles.sectionInner}>
      <div className={styles.sectionLabel}>Model portfolios</div>
      <h2 className={styles.heading}>Real returns. Real ETFs.</h2>

      <div className={styles.disclaimer}>
        <span className={styles.disclaimerIcon}>⚠</span>
        <p>Illustrative only — not advice. Leveraged ETFs decay; past ≠ future.</p>
      </div>

      <PortfolioBuilder />

      <div className={styles.cards}>
        {filtered.map((portfolio) => (
          <div
            key={portfolio.id}
            className={`${styles.card} ${portfolio.featured ? styles.cardFeatured : ''}`}
          >
            <span className={styles.cardBadge}>{portfolio.badge}</span>
            <div className={styles.cardName}>{portfolio.name}</div>
            <div className={styles.cardDesc}>{portfolio.description}</div>

            <div className={styles.chartArea}>
              <Sparkline points={portfolio.sparkPoints} color={portfolio.sparkColor} />
            </div>

            <div className={styles.metrics}>
              <div className={styles.metric}>
                <span
                  className={`${styles.metricVal} ${
                    portfolio.metrics.returnPositive ? styles.pos : styles.neg
                  }`}
                >
                  {portfolio.metrics.return1y}
                </span>
                <span className={styles.metricLabel}>1Y return</span>
              </div>
              <div className={styles.metric}>
                <span className={styles.metricVal}>{portfolio.metrics.sharpe}</span>
                <span className={styles.metricLabel}>Sharpe</span>
              </div>
              <div className={styles.metric}>
                <span className={`${styles.metricVal} ${styles.neg}`}>
                  {portfolio.metrics.maxDD}
                </span>
                <span className={styles.metricLabel}>Max DD</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  )
}
