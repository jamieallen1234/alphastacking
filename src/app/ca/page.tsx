import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import styles from '@/app/portfolios/PortfoliosPage.module.css'

export const metadata = {
  title: 'Alpha Stacking — Canadian edition',
  description: 'Return stacking and model portfolios for Canadian investors.',
}

export default function CaHomePage() {
  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.section}>
        <div className={styles.sectionLabel}>Canadian edition</div>
        <h1 className={styles.heading}>Alpha stacking, CA-listed sleeves</h1>
        <p className={styles.lede}>
          Same educational mission as our US site — plus TSX-listed ETFs and Canada-aware examples where
          it matters. Browse both US- and Canadian-listed model portfolios in one place. Nothing here is
          investment advice.
        </p>
        <p className={styles.lede}>
          <Link href="/ca/portfolios#us-models" style={{ color: 'var(--color-gold)' }}>
            Browse US &amp; Canadian model portfolios →
          </Link>
        </p>
      </section>
      <Footer />
    </main>
  )
}
