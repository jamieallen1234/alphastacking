import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import styles from './RouteLoading.module.css'

export default function RouteLoading() {
  return (
    <main className={styles.main} aria-busy="true" aria-live="polite">
      <Nav />
      <section className={styles.inner}>
        <p className={styles.kicker}>Alpha Stacking</p>
        <p className={styles.label}>Loading page</p>
        <div className={styles.title} />
        <div className={styles.copy}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.chart} />
      </section>
      <Footer />
    </main>
  )
}
