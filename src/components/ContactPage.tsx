import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import styles from './ContactPage.module.css'

export default function ContactPage() {
  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.inner}>
        <p className={styles.kicker}>Site</p>
        <h1 className={styles.h1}>Feedback & requests</h1>
        <p className={styles.lede}>
          Share corrections, ideas for the ETF pages or portfolio tools, requests for chart proxies (e.g. portfolio
          builder or preset back-tests), or anything else that would make this site more useful.
        </p>
        <p className={styles.lede}>
          Email{' '}
          <a href="mailto:contact@alphastacking.co" className={styles.emailLink}>
            contact@alphastacking.co
          </a>
          .
        </p>
      </section>
      <Footer />
    </main>
  )
}
