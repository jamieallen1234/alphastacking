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
    variant === 'us'
      ? 'Growth & value barbell from the hub. Full overlapping history vs the S&P 500 index — same weights as the portfolio detail page, which offers additional range tabs.'
      : 'Global + Long/Short from the CAD hub. Full history vs the S&P 500 index, modeled in CAD — same weights as the portfolio detail page, which offers additional range tabs.'

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
