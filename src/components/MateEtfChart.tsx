import ReturnLineChart from '@/components/ReturnLineChart'
import { getCachedMateChart } from '@/lib/getCachedEtfChart'
import styles from './MateEtfChart.module.css'

export default async function MateEtfChart() {
  const payload = await getCachedMateChart('max')
  if (payload.values.length < 2 || payload.timestamps.length !== payload.values.length) return null

  const trClass =
    payload.totalReturnPercent != null && payload.totalReturnPercent >= 0 ? styles.metricPos : ''

  return (
    <div className={styles.chartBlock}>
      <div className={styles.metricsRow}>
        <div>
          <div className={`${styles.metricBig} ${trClass}`}>
            {payload.totalReturnPercent != null
              ? `${payload.totalReturnPercent >= 0 ? '+' : ''}${payload.totalReturnPercent.toFixed(2)}%`
              : '—'}
          </div>
          <div className={styles.metricSub}>Total return since inception</div>
        </div>
        <div>
          <div className={styles.metricBig}>{payload.chartStartDate}</div>
          <div className={styles.metricSub}>Chart start</div>
        </div>
      </div>

      <div className={styles.legend}>
        <span className={styles.legendSwatch} aria-hidden="true" />
        {payload.symbol}
      </div>

      <ReturnLineChart
        series={[{ values: payload.values, color: 'var(--color-gold)', label: payload.symbol }]}
        timestampsSec={payload.timestamps}
        height={140}
        chartCurrency="USD"
      />

      <p className={styles.disclaimer}>
        Total return (Yahoo adjusted close—dividends and splits per Yahoo), normalized to $10,000 at first
        available trade date. Educational only.
      </p>
    </div>
  )
}
