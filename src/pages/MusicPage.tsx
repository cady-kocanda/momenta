import React, { useState } from 'react'

type Props = {
  onBack: () => void
}

export default function MusicPage({ onBack }: Props) {
  const [stage] = useState<'connect'>('connect')

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'var(--bg)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
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
          Music
        </h1>
        <div style={{ width: 40 }} />
      </div>

      {stage === 'connect' && (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          padding: '40px'
        }}>
          <p style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: '1.5em',
            color: 'var(--text)',
            textAlign: 'center',
            maxWidth: '300px'
          }}>
            Music integration coming soon!
          </p>
        </div>
      )}
    </div>
  )
}
