import type { Metadata } from 'next'
import { Playfair_Display, DM_Mono, DM_Sans } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '700'],
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  weight: ['300', '400', '500'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500'],
})

export const metadata: Metadata = {
  title: 'Alpha Stacking — Stack alpha, not beta',
  description:
    'Build portfolios from multiple return sources — equity, managed futures, long/short, macro, systematic alternatives — using listed ETFs and live total-return charts.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmMono.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
