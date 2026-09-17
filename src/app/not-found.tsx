import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import NotFoundHomeLink from '@/components/NotFoundHomeLink'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.inner}>
        <p className={styles.code}>404</p>
        <h1 className={styles.heading}>This page is not in the stack.</h1>
        <p className={styles.copy}>
          The link may be out of date, or the page may have moved. Return to the home page to find portfolios, ETF
          research, and the builder.
        </p>
        <NotFoundHomeLink className={styles.cta} />
      </section>
      <Footer />
    </main>
  )
}
