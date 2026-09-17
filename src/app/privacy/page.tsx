import PrivacyPage from '@/components/PrivacyPage'
import { pairedAlternates } from '@/lib/seoAlternates'

export const metadata = {
  title: 'Privacy | Alpha Stacking',
  description:
    'How Alpha Stacking handles contact messages, analytics, site preferences, and information collected when you use the site.',
  alternates: pairedAlternates('/privacy', '/ca/privacy', 'us'),
}

export default function UsPrivacyPage() {
  return <PrivacyPage />
}
