import HomePage from '@/components/HomePage'

export const metadata = {
  title: 'Alpha Stacking — Canadian edition',
  description: 'Return stacking and model portfolios for Canadian investors.',
}

export default function CaHomePage() {
  return <HomePage variant="ca" />
}
