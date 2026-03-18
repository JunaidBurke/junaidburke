import { ImageResponse } from 'next/og'
import { type NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'Junaid Burke'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          backgroundColor: '#07070c',
          color: '#eeedf6',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Green accent line at top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(to right, #00ffaa, #3ee8ff, #8b7aff)',
          }}
        />

        {/* Site branding */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#00ffaa',
            }}
          />
          <span
            style={{ fontSize: '18px', color: '#8785a3', fontFamily: 'monospace' }}
          >
            junaidburke.com
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '52px',
            fontWeight: 'bold',
            lineHeight: 1.2,
            maxWidth: '800px',
          }}
        >
          {title}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
