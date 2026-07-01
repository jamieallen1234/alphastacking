import styles from './FeedbackInlineLink.module.css'

const FEEDBACK_EMAIL = 'contact@alphastacking.co'

export default function FeedbackInlineLink({
  isCa: _isCa,
  context,
  showDivider = true,
}: {
  isCa: boolean
  context: 'builder' | 'etf'
  showDivider?: boolean
}) {
  if (context === 'builder') {
    return (
      <p className={showDivider ? styles.wrapBuilder : styles.wrapBuilderNoDivider}>
        Want a ticker in the builder or have a feature idea?{' '}
        <a href={`mailto:${FEEDBACK_EMAIL}`} className={styles.link}>
          Send feedback
        </a>
        .
      </p>
    )
  }

  return (
    <div className={styles.etfPreFooterShell}>
      <p className={styles.etfPreFooterText}>
        Missing an ETF on the hub?{' '}
        <a href={`mailto:${FEEDBACK_EMAIL}`} className={styles.link}>
          Send feedback
        </a>
        .
      </p>
    </div>
  )
}
