import PresetPortfolioChart from '@/components/PresetPortfolioChart'
import type { StrategyCompareSlot } from '@/lib/loadStrategyCompareCharts'
import styles from '@/components/StrategiesCompareMain.module.css'

export default function ComparisonChartCard({ slot }: { slot: StrategyCompareSlot }) {
  if (!slot.ok) {
    return (
      <div className={styles.chartCard}>
        <h3 className={styles.chartCardTitle}>{slot.heading}</h3>
        <p className={styles.chartError}>{slot.message}</p>
      </div>
    )
  }
  return (
    <div className={styles.chartCard}>
      <h3 className={styles.chartCardTitle}>{slot.heading}</h3>
      <PresetPortfolioChart
        payload={slot.payload}
        portfolioLabel={slot.portfolioLabel}
        footnote="minimal"
      />
    </div>
  )
}
