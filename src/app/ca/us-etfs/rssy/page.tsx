import RssyEtfPageContent from '@/components/usEtfPages/RssyEtfPageContent'

export const metadata = {
  title: 'RSSY ETF — Alpha Stacking (Canadian edition)',
  description:
    'Return Stacked U.S. Stocks & Futures Yield ETF (RSSY): equity stack, futures yield sleeve, and manager context.',
}

export default function CaRssyEtfPage() {
  return <RssyEtfPageContent hubBase="/ca/us-etfs" />
}
