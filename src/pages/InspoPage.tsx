import React, { useState } from 'react'

type Props = {
  onBack: () => void
}

const DEMO_IMAGES = [
  '/images/coffee.png',
  '/images/diary.png',
  '/images/disco.png',
  '/images/nevergiveup.jpg',
  '/images/photostrip.png',
  '/images/scrapbookitem.png',
  '/images/scrapbookitem2.png',
  '/images/stamp.png',
  '/images/stamp2.png',
  '/images/star.png',
  '/images/star2.png'
]

export default function InspoPage({ onBack }: Props) {
  const [mode, setMode] = useState<'demo' | 'pinterest'>('demo')
  const [pinterestConnected, setPinterestConnected] = useState(false)

  const handleConnectPinterest = () => {
    // Placeholder for Pinterest OAuth flow
    alert('Pinterest connection coming soon! For now, enjoy the demo mode.')
  }

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'var(--bg)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--shadow)'
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '4px 8px'
          }}
        >
          ←
        </button>
        <h1 style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: '1.8em',
          margin: 0,
          color: 'var(--text)'
        }}>
          Inspo
        </h1>
        <div style={{ width: 40 }} />
      </div>

      {/* Mode Toggle */}
      <div style={{
        padding: '16px 20px',
        display: 'flex',
        gap: '12px',
        justifyContent: 'center'
      }}>
        <button
          onClick={() => setMode('demo')}
          style={{
            padding: '8px 20px',
            background: mode === 'demo' ? 'var(--accent)' : 'transparent',
            border: '2px solid var(--accent)',
            borderRadius: '20px',
            cursor: 'pointer',
            fontFamily: "'Dancing Script', cursive",
            fontSize: '1.1em',
            color: mode === 'demo' ? '#fff' : 'var(--text)',
            transition: 'all 0.3s'
          }}
        >
          Demo Mode
        </button>
        <button
          onClick={handleConnectPinterest}
          style={{
            padding: '8px 20px',
            background: mode === 'pinterest' ? 'var(--accent)' : 'transparent',
            border: '2px solid var(--accent)',
            borderRadius: '20px',
            cursor: 'pointer',
            fontFamily: "'Dancing Script', cursive",
            fontSize: '1.1em',
            color: mode === 'pinterest' ? '#fff' : 'var(--text)',
            transition: 'all 0.3s'
          }}
        >
          Connect Pinterest
        </button>
      </div>

      {/* Image Grid */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '0 20px 20px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px'
        }}>
          {DEMO_IMAGES.map((img, idx) => (
            <div
              key={idx}
              style={{
                aspectRatio: '1',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px var(--shadow)',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img
                src={img}
                alt={`Inspiration ${idx + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
