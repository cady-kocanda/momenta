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
  const [stage, setStage] = useState<'choose' | 'loading' | 'loaded'>('choose')
  const [mode, setMode] = useState<'demo' | 'pinterest' | null>(null)

  const handleChoice = (choice: 'demo' | 'pinterest') => {
    setMode(choice)
    setStage('loading')
    
    // Show loading for 2 seconds
    setTimeout(() => {
      setStage('loaded')
    }, 2000)
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

      {/* Content based on stage */}
      {stage === 'choose' && (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          padding: '40px'
        }}>
          <h2 style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: '1.5em',
            color: 'var(--text)',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            Choose your inspiration source
          </h2>
          
          <button
            onClick={() => handleChoice('pinterest')}
            style={{
              width: '220px',
              padding: '20px',
              background: '#fff',
              border: '3px solid #E60023',
              borderRadius: '16px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 4px 12px var(--shadow)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(230, 0, 35, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = '0 4px 12px var(--shadow)'
            }}
          >
            <img 
              src="/images/pinterest-logo.png" 
              alt="Pinterest"
              style={{ width: '60px', height: '60px', objectFit: 'contain' }}
            />
            <span style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: '1.3em',
              color: '#E60023',
              fontWeight: 600
            }}>
              Connect Pinterest
            </span>
          </button>

          <button
            onClick={() => handleChoice('demo')}
            style={{
              width: '220px',
              padding: '20px',
              background: 'var(--accent)',
              border: 'none',
              borderRadius: '16px',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 4px 12px var(--shadow)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = '0 4px 12px var(--shadow)'
            }}
          >
            <span style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: '1.3em',
              color: '#fff',
              fontWeight: 600
            }}>
              Try Demo
            </span>
          </button>
        </div>
      )}

      {stage === 'loading' && (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid var(--shadow)',
            borderTop: '4px solid var(--accent)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: '1.5em',
            color: 'var(--text)',
            textAlign: 'center'
          }}>
            fetching your inspo...
          </p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      {stage === 'loaded' && (
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
      )}
    </div>
  )
}
