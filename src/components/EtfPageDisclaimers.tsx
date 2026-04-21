import type { ReactNode } from 'react'
import styles from './EtfPageDisclaimers.module.css'

export default function EtfPageDisclaimers({ extra }: { extra?: ReactNode }) {
  return (
    <p className={`legalFooterCopy ${styles.root}`}>
      Beta and MER may not be accurate.
      <br />
      Educational content only; not investment advice. Past performance does not guarantee future
      results.
      {extra ? (
        <>
          <br />
          {extra}
        </>
      ) : null}
    </p>
  )
}
