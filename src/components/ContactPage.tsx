import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import styles from './ContactPage.module.css'

export default function ContactPage() {
  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.inner}>
        <p className={styles.kicker}>Site</p>
        <h1 className={styles.h1}>Feedback & requests</h1>
        <p className={styles.lede}>
          Share corrections, ideas for the ETF pages or portfolio tools, or anything else that would make this site
          more useful.
        </p>
        <ContactForm />
        <p className={styles.privacy}>
          If you include an email, it is only used to reply to this message. Submissions are sent through a mail
          provider; see their privacy policy for how they process messages in transit.
        </p>
      </section>
      <Footer />
    </main>
  )
}
