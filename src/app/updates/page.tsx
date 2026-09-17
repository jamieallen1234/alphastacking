import UpdatesPage from '@/components/UpdatesPage'
import { pairedAlternates } from '@/lib/seoAlternates'

export const metadata = {
  title: 'Updates | Alpha Stacking',
  description:
    "What's new on Alpha Stacking: every day a new ETF write-up or model portfolio was added to the site.",
  alternates: pairedAlternates('/updates', '/ca/updates', 'us'),
}

export default function UsUpdatesPage() {
  return <UpdatesPage edition="us" />
}
