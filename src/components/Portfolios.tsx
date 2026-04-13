'use client'

import { useState } from 'react'
import Sparkline from './Sparkline'
import PortfolioBuilder from './PortfolioBuilder'
import { portfolios, type Region } from '@/lib/portfolios'
import styles from './Portfolios.module.css'

const tabs: { label: string; value: Region }[] = [
  { label: 'US portfolios', value: 'us' },
  { label: 'CA portfolios', value: 'ca' },
  { label: 'Mixed', value: 'mixed' },
]

export default function Portfolios() {
  const [activeTab, setActiveTab] = useState<Region>('us')

  const filtered = portfolios.filter((p) => p.region.includes(activeTab))

  return (
    <section className={styles.section}>
      <div className={styles.sectionLabel}>Sample portfolios</div>
      <h2 className={styles.heading}>Real returns. Real ETFs.</h2>

      <div className={styles.disclaimer}>
        <span className={styles.disclaimerIcon}>⚠</span>
        <p>
          Sample portfolios are shown for educational purposes only. Returns are
          hypothetical or historical and do not represent actual investment results.
          Leveraged ETFs are complex instruments subject to volatility decay. Past
          performance does not guarantee future results. This is not a recommendation
          to buy or sell any security.
        </p>
      </div>

      <PortfolioBuilder />

      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`${styles.tab} ${activeTab === tab.value ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>

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
    </section>
  )
}
