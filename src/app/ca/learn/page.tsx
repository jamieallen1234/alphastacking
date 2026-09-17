import LearnPage from '@/components/LearnPage'
import { pairedAlternates } from '@/lib/seoAlternates'

export const metadata = {
  title: 'Learn | Alpha Stacking (Canadian edition)',
  description:
    'ETF-focused guides for Canadian investors: alpha stacking concepts, strategy comparisons, ETF pages and portfolio builder, construction basics, and efficiency grades.',
  alternates: pairedAlternates('/learn', '/ca/learn', 'ca'),
}

export default function CaLearnPage() {
  return <LearnPage edition="ca" />
}
