import Link from 'next/link'
import PresetPortfolioChart from '@/components/PresetPortfolioChart'
import { homeChartPayloadIsRenderable, type HomePortfolioChartSlot } from '@/lib/loadHomePortfolioCharts'
import styles from './HomePortfolioCharts.module.css'

export interface HomePortfolioChartsProps {
  variant: 'us' | 'ca'
  slots: HomePortfolioChartSlot[]
}

export default function HomePortfolioCharts({ variant, slots }: HomePortfolioChartsProps) {
  const hubHref = variant === 'us' ? '/portfolios' : '/ca/portfolios'
  const lede =
    'See how alpha stacked portfolios have performed historically against the S&P 500.'

  return (
    <section className={styles.section} aria-labelledby="home-portfolio-charts-heading">
      <h2 id="home-portfolio-charts-heading" className={styles.label}>
        Model portfolios
      </h2>
      <p className={styles.lede}>{lede}</p>
      <div className={`${styles.chartGrid}${slots.length === 1 ? ` ${styles.chartGridSingle}` : ''}`}>
        {slots.map((slot) => (
          <article key={slot.slug} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>
                <Link href={slot.href} className={styles.cardTitleLink}>
                  {slot.title}
                </Link>
              </h3>
              <p className={styles.cardDesc}>{slot.description}</p>
            </div>
            <h4 className={styles.chartHeading}>{slot.chartHeading}</h4>
            {homeChartPayloadIsRenderable(slot.payload) ? (
              <PresetPortfolioChart
                payload={slot.payload}
                portfolioLabel={slot.title}
                footnote="none"
                showMaxDrawdown={false}
              />
            ) : (
              <p className={styles.chartFallback}>
                Chart data is not available right now — open the portfolio page to retry.
              </p>
            )}
            <Link href={slot.href} className={styles.cardCta}>
              Holdings & details →
            </Link>
          </article>
        ))}
      </div>
      <p className={styles.foot}>
        <Link href={hubHref} className={styles.link}>
          All model portfolios →
        </Link>
      </p>
    </section>
  )
}
