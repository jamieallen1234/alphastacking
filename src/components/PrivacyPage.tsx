import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import styles from './PrivacyPage.module.css'

export default function PrivacyPage() {
  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.inner}>
        <p className={styles.kicker}>Site</p>
        <h1 className={styles.h1}>Privacy</h1>
        <p className={styles.updated}>Last updated September 16, 2026</p>

        <div className={styles.body}>
          <section>
            <h2>What this covers</h2>
            <p>
              This notice explains how alphastacking.co handles information when you visit the site or contact us.
              Alpha Stacking is an independent educational website, not an investment adviser.
            </p>
          </section>

          <section>
            <h2>Information we receive</h2>
            <p>
              If you email us, we receive the information you choose to include, such as your name, email address,
              and message. We also receive standard technical information needed to serve the site, such as request
              logs and device information handled by our hosting providers.
            </p>
          </section>

          <section>
            <h2>Analytics and preferences</h2>
            <p>
              We use Vercel Web Analytics to understand aggregate site traffic and page use. It does not use cookies.
              The site stores a non-sensitive <code>as_region</code> cookie for one year after you choose the US or
              Canadian edition. Your light or dark theme preference is stored in your browser’s local storage.
            </p>
          </section>

          <section>
            <h2>How we use information</h2>
            <p>
              We use messages to respond to feedback, corrections, and requests. We use aggregated analytics and
              preferences to maintain and improve the site. We do not use site data to provide personalized
              investment advice.
            </p>
          </section>

          <section>
            <h2>Service providers</h2>
            <p>
              The site is hosted on Vercel, which provides the analytics described above. Third-party providers may
              process information only as needed to host the site, deliver email, protect the site from abuse, or meet
              legal obligations.
            </p>
          </section>

          <section>
            <h2>Your choices and contact</h2>
            <p>
              You can clear the region cookie and theme storage in your browser settings. You can also choose not to
              email us. For privacy questions or requests, contact{' '}
              <a href="mailto:contact@alphastacking.co">contact@alphastacking.co</a>.
            </p>
          </section>

          <section>
            <h2>Changes to this notice</h2>
            <p>
              We may update this notice when the site or its data practices change. The date above shows when it was
              last revised.
            </p>
          </section>
        </div>
      </section>
      <Footer />
    </main>
  )
}
