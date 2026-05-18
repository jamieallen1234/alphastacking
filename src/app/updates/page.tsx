import UpdatesPage from '@/components/UpdatesPage'

export const metadata = {
  title: 'Updates | Alpha Stacking',
  description:
    "What's new on Alpha Stacking: every day a new ETF write-up or model portfolio was added to the site.",
}

export default function UsUpdatesPage() {
  return <UpdatesPage edition="us" />
}
