import PrivacyPage from '@/components/PrivacyPage'
import { pairedAlternates } from '@/lib/seoAlternates'

export const metadata = {
  title: 'Privacy | Alpha Stacking (Canadian edition)',
  description:
    'How Alpha Stacking handles contact messages, analytics, site preferences, and information collected when you use the Canadian edition.',
  alternates: pairedAlternates('/privacy', '/ca/privacy', 'ca'),
}

export default function CaPrivacyPage() {
  return <PrivacyPage />
}
