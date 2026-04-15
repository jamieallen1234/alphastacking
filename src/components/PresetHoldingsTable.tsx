import type { PresetHolding } from '@/lib/presets/usInternational'
import styles from './PresetHoldingsTable.module.css'

interface PresetHoldingsTableProps {
  holdings: PresetHolding[]
  weightedBeta: number
}

export default function PresetHoldingsTable({ holdings, weightedBeta }: PresetHoldingsTableProps) {
  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Weight</th>
            <th>Beta</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((h) => (
            <tr key={h.ticker}>
              <td className={styles.ticker}>{h.ticker}</td>
              <td>{h.weightPct}%</td>
              <td>{h.beta}</td>
              <td className={styles.blurb}>{h.blurb}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className={styles.betaLine}>
        Weighted portfolio beta (approx.): <strong>{weightedBeta.toFixed(2)}</strong>
      </p>
    </div>
  )
}
