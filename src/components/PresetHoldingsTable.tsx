import Link from 'next/link'
import type { PresetHolding } from '@/lib/presets'
import styles from './PresetHoldingsTable.module.css'

interface PresetHoldingsTableProps {
  holdings: PresetHolding[]
  weightedBeta: number
  estimatedDistributionYieldPct?: number
  distributionYieldAsOf?: string
  /** When set, shows “Copy portfolio to builder” on the same row as weighted beta, right-aligned. */
  copyBuilderHref?: string
}

export default function PresetHoldingsTable({
  holdings,
  weightedBeta,
  estimatedDistributionYieldPct,
  distributionYieldAsOf,
  copyBuilderHref,
}: PresetHoldingsTableProps) {
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
      <div className={styles.summaryRow}>
        <div className={styles.summaryText}>
          <p className={styles.betaRowText}>
            Weighted portfolio beta (approx.): <strong>{weightedBeta.toFixed(2)}</strong>
          </p>
          {estimatedDistributionYieldPct != null ? (
            <p className={styles.betaRowText}>
              Estimated portfolio distribution yield: <strong>{estimatedDistributionYieldPct.toFixed(2)}%</strong>
              {distributionYieldAsOf ? `, weighted as of ${distributionYieldAsOf}` : ''}
            </p>
          ) : null}
        </div>
        {copyBuilderHref ? (
          <Link className={styles.copyBuilderLink} href={copyBuilderHref}>
            Copy portfolio to builder →
          </Link>
        ) : null}
      </div>
    </div>
  )
}
