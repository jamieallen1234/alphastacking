import Link from 'next/link'
import { contactPath } from '@/lib/siteRegion'
import styles from './FeedbackInlineLink.module.css'

export default function FeedbackInlineLink({
  isCa,
  context,
}: {
  isCa: boolean
  context: 'builder' | 'etf'
}) {
  const href = contactPath(isCa)

  if (context === 'builder') {
    return (
      <p className={styles.wrapBuilder}>
        Want a ticker in the builder or have a feature idea?{' '}
        <Link href={href} className={styles.link}>
          Send feedback
        </Link>
        .
      </p>
    )
  }

  return (
    <div className={styles.etfPreFooterShell}>
      <p className={styles.etfPreFooterText}>
        Missing an ETF on the hub?{' '}
        <Link href={href} className={styles.link}>
          Send feedback
        </Link>
        .
      </p>
    </div>
  )
}
