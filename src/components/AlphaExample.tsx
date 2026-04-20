import Link from 'next/link'
import { totalReturnPercentFromValues } from '@/lib/portfolioMath'
import { learnPath } from '@/lib/siteRegion'
import styles from './AlphaExample.module.css'

/**
 * Hardcoded from Yahoo SPY adjusted close on 2016-04-15 and 2026-04-15 (one-time fetch).
 * P_start≈176.528, P_end≈699.94 → $10k×(P_end/P_start)≈$39,650.43 → rounded $39,650.
 * Illustrative stacked portfolio: +3% alpha/yr over that SPY path → round($39,650.43 × 1.03^10) = $53,287.
 */
const START_NOTIONAL = 10_000
const SPY_END_10K = 39_650
const SPY_PLUS_3PCT_ALPHA_END = 53_287

const BENCHMARK_TR_PCT = totalReturnPercentFromValues([START_NOTIONAL, SPY_END_10K])
const PORTFOLIO_TR_PCT = totalReturnPercentFromValues([START_NOTIONAL, SPY_PLUS_3PCT_ALPHA_END])
const EXCESS_ALPHA_PCT =
  BENCHMARK_TR_PCT != null && PORTFOLIO_TR_PCT != null ? PORTFOLIO_TR_PCT - BENCHMARK_TR_PCT : null

const ALPHA_DELTA = SPY_PLUS_3PCT_ALPHA_END - SPY_END_10K

function fmtUsd(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

function fmtTrPct(x: number): string {
  return `${x >= 0 ? '+' : ''}${x.toFixed(2)}%`
}

export default function AlphaExample({ edition }: { edition: 'us' | 'ca' }) {
  const learnHref = learnPath(edition === 'ca')
  return (
    <section className={styles.section}>
      <p className={styles.lede}>
        Starting with $10k, how much could a stacked portfolio generating{' '}
        <strong>+3% alpha per year</strong>{' '}
        over S&amp;P 500 yield after a decade?
      </p>
      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.cardLabel}>S&amp;P 500 (SPY total return)</div>
          <div className={styles.cardValue}>{fmtUsd(SPY_END_10K)}</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardLabel}>
            Illustrative stacked portfolio (+3% alpha/yr vs S&amp;P 500)
          </div>
          <div className={`${styles.cardValue} ${styles.cardValueHighlight}`}>
            {fmtUsd(SPY_PLUS_3PCT_ALPHA_END)}
          </div>
        </div>
      </div>
      {EXCESS_ALPHA_PCT != null ? (
        <p className={styles.excessLine}>
          <span className={styles.excessLabel}>Excess α vs S&amp;P 500</span>
          <strong className={styles.excessVal}>{fmtTrPct(EXCESS_ALPHA_PCT)}</strong>
        </p>
      ) : null}
      <p className={styles.learnLine}>
        Learn how to build alpha stacked portfolios.{' '}
        <Link href={learnHref} className={styles.learnCta}>
          Learn →
        </Link>
      </p>
    </section>
  )
}
