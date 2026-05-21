import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Alpha Stacking: Stack alpha, not beta'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 76,
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: 28,
            letterSpacing: '-1px',
          }}
        >
          Alpha Stacking
        </div>
        <div
          style={{
            fontSize: 34,
            color: '#9ca3af',
            fontWeight: 400,
          }}
        >
          Stack alpha, not beta
        </div>
      </div>
    ),
    { ...size },
  )
}
