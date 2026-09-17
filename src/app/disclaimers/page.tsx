import DisclaimersPage from '@/components/DisclaimersPage'
import { pairedAlternates } from '@/lib/seoAlternates'

export const metadata = {
  title: 'Disclaimers | Alpha Stacking',
  description:
    'Educational and informational disclaimers, non-advice notice, model portfolio limitations, and leveraged ETF risk.',
  alternates: pairedAlternates('/disclaimers', '/ca/disclaimers', 'us'),
}

export default function UsDisclaimersPage() {
  return <DisclaimersPage />
}
