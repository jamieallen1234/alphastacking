import UpdatesPage from '@/components/UpdatesPage'

export const metadata = {
  title: 'Updates | Alpha Stacking (Canadian edition)',
  description:
    "What's new on Alpha Stacking: every day a new ETF write-up or model portfolio was added to the Canadian site.",
}

export default function CaUpdatesPage() {
  return <UpdatesPage edition="ca" />
}
