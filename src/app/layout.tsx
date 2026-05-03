import type { Metadata } from 'next'
import { Playfair_Display, DM_Mono, DM_Sans } from 'next/font/google'
import SiteJsonLd from '@/components/SiteJsonLd'
import { getSiteUrl, SITE_TWITTER_HANDLE } from '@/lib/siteUrl'
import './globals.css'

const siteUrl = getSiteUrl()
const defaultTitle = 'Alpha Stacking — Stack alpha, not beta'
const defaultDescription =
  'Build portfolios from multiple return sources — equity, managed futures, long/short, macro, systematic alternatives — using listed ETFs and live total-return charts.'

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
  metadataBase: new URL(siteUrl),
  title: defaultTitle,
  description: defaultDescription,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Alpha Stacking',
    title: defaultTitle,
    description: defaultDescription,
  },
  twitter: {
    card: 'summary',
    site: `@${SITE_TWITTER_HANDLE}`,
    creator: `@${SITE_TWITTER_HANDLE}`,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmMono.variable} ${dmSans.variable}`}>
      <body>
        <SiteJsonLd />
        {children}
      </body>
    </html>
  )
}
