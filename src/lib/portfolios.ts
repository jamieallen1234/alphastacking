export type Region = 'us' | 'ca' | 'mixed'

export interface Portfolio {
  id: string
  badge: string
  featured?: boolean
  name: string
  description: string
  sparkPoints: string
  sparkColor: string
  metrics: {
    return1y: string
    returnPositive: boolean
    sharpe: string
    maxDD: string
  }
  region: Region[]
}

export const portfolios: Portfolio[] = [
  {
    id: 'alpha-stack',
    badge: '★ Core strategy',
    featured: true,
    name: 'The Alpha Stack',
    description: 'UPRO + NTSD + DBMF + IALT. Return-stacked core with managed futures overlay.',
    sparkPoints: '0,50 20,45 40,38 55,42 70,30 90,25 110,20 130,28 150,15 170,10 190,8 200,5',
    sparkColor: '#c9a84c',
    metrics: { return1y: '+18.4%', returnPositive: true, sharpe: '1.42', maxDD: '-14.2%' },
    region: ['us', 'mixed'],
  },
  {
    id: 'leveraged-premia',
    badge: 'Aggressive',
    name: 'Leveraged Premia',
    description: 'UPRO + SSO + MATE + CTAP. High-octane LETF core with return-stacked alts.',
    sparkPoints: '0,45 15,50 30,35 50,40 70,20 85,30 100,15 120,25 140,10 160,18 180,6 200,3',
    sparkColor: '#5dca8a',
    metrics: { return1y: '+26.1%', returnPositive: true, sharpe: '1.18', maxDD: '-22.7%' },
    region: ['us', 'mixed'],
  },
  {
    id: 'capital-efficient',
    badge: 'Conservative',
    name: 'Capital Efficient Core',
    description: 'SSO + NTSD + HFGM + CLSE. Balanced leverage with global macro hedge.',
    sparkPoints: '0,48 25,44 45,40 65,36 80,38 100,32 120,28 140,24 160,20 180,16 200,12',
    sparkColor: '#85b7eb',
    metrics: { return1y: '+12.8%', returnPositive: true, sharpe: '1.65', maxDD: '-8.9%' },
    region: ['us', 'mixed'],
  },
  {
    id: 'ca-alpha-stack',
    badge: '★ Core strategy',
    featured: true,
    name: 'Canadian Alpha Stack',
    description: 'HEQL.TO + PFMN.TO + HDGE.TO + ONEC.TO. TSX-listed leveraged alternatives.',
    sparkPoints: '0,50 20,46 40,40 60,35 80,30 100,22 120,18 140,25 160,14 180,9 200,6',
    sparkColor: '#c9a84c',
    metrics: { return1y: '+15.2%', returnPositive: true, sharpe: '1.31', maxDD: '-12.8%' },
    region: ['ca', 'mixed'],
  },
  {
    id: 'ca-conservative',
    badge: 'Conservative',
    name: 'TSX Efficient Core',
    description: 'HEQL.TO + ARB.TO + PFMN.TO. Capital-efficient with merger arb overlay.',
    sparkPoints: '0,50 20,47 40,43 60,40 80,37 100,33 120,29 140,26 160,22 180,18 200,14',
    sparkColor: '#85b7eb',
    metrics: { return1y: '+10.9%', returnPositive: true, sharpe: '1.58', maxDD: '-7.4%' },
    region: ['ca', 'mixed'],
  },
  {
    id: 'ca-aggressive',
    badge: 'Aggressive',
    name: 'Leveraged TSX',
    description: 'HEQL.TO + HDGE.TO + PFMN.TO + MEMA. High-conviction leveraged Canadian portfolio.',
    sparkPoints: '0,48 15,52 30,38 50,44 70,24 85,34 100,18 120,28 140,12 160,20 180,7 200,4',
    sparkColor: '#5dca8a',
    metrics: { return1y: '+22.3%', returnPositive: true, sharpe: '1.09', maxDD: '-19.5%' },
    region: ['ca', 'mixed'],
  },
]
