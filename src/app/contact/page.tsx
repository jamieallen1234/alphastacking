import ContactPage from '@/components/ContactPage'
import { pairedAlternates } from '@/lib/seoAlternates'

export const metadata = {
  title: 'Contact & feedback — Alpha Stacking',
  description:
    'Send site feedback, feature requests, chart proxy ideas, or corrections. Optional email for replies. For educational use only; not investment advice.',
  alternates: pairedAlternates('/contact', '/ca/contact', 'us'),
}

export default function UsContactPage() {
  return <ContactPage />
}
