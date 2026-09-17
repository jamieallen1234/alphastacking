import ContactPage from '@/components/ContactPage'
import { pairedAlternates } from '@/lib/seoAlternates'

export const metadata = {
  title: 'Contact & feedback — Alpha Stacking (CA)',
  description:
    'Send site feedback, feature requests, chart proxy ideas, or corrections. Optional email for replies. For educational use only; not investment advice.',
  alternates: pairedAlternates('/contact', '/ca/contact', 'ca'),
}

export default function CaContactPage() {
  return <ContactPage />
}
