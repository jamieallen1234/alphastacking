interface SparklineProps {
  points: string
  color: string
}

export default function Sparkline({ points, color }: SparklineProps) {
  const fillColor = color.replace(')', ', 0.06)').replace('rgb', 'rgba')

  return (
    <svg
      viewBox="0 0 200 60"
      preserveAspectRatio="none"
      style={{ width: '100%', height: '100%' }}
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <polyline
        points={`${points} 200,60 0,60`}
        fill={fillColor}
        stroke="none"
      />
    </svg>
  )
}
