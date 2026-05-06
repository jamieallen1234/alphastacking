import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import styles from './DisclaimersPage.module.css'

export default function DisclaimersPage() {
  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.inner}>
        <p className={styles.kicker}>Site</p>
        <h1 className={styles.h1}>Disclaimers</h1>
        <div className={styles.body}>
          <p className="legalFooterCopy">
            alphastacking.co is an independent educational website. Nothing on this site constitutes financial,
            investment, legal, or tax advice. All content is provided for informational purposes only. Model
            portfolios are for educational purposes and do not represent actual investment results. Past performance
            is not indicative of future results.
          </p>
          <p className="legalFooterCopy">
            Leveraged and inverse ETFs are complex instruments that use financial derivatives and debt to amplify
            returns. They are subject to volatility decay and are designed for short-term trading by definition of
            their structure. They may not be suitable for long-term investors or investors who are not able to
            withstand the risk of significant loss.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  )
}
