import LearnPage from '@/components/LearnPage'
import { pairedAlternates } from '@/lib/seoAlternates'

export const metadata = {
  title: 'Learn | Alpha Stacking',
  description:
    'ETF-focused guides for investors: alpha stacking concepts, why it differs from indexing alone, using ETF pages and the portfolio builder, construction basics, and efficiency grades.',
  alternates: pairedAlternates('/learn', '/ca/learn', 'us'),
}

export default function UsLearnPage() {
  return <LearnPage edition="us" />
}
