import type { ReactNode } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import styles from './LearnArticle.module.css'

export default function LearnArticleShell({ children }: { children: ReactNode }) {
  return (
    <main className={styles.main}>
      <Nav />
      {children}
      <Footer />
    </main>
  )
}
