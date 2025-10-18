import React, { useState, useEffect, useRef } from 'react'
import Menu from '../components/Menu'
import { startPinterestOAuth, syncPinterestPins, getPinterestPins, getPinterestConnection, type PinterestPin } from '../services/pinterest'

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

interface DraggableItem {
  id: string
  src: string
  alt: string
  x: number
  y: number
  width: number
  height: number
}

const DRAGGABLE_ITEMS: DraggableItem[] = [
  {
    id: 'max',
    src: '/images/max.png',
    alt: 'Max',
    x: 15,
    y: 20,
    width: 140,
    height: 140
  },
  {
    id: 'rhode',
    src: '/images/rhode.png',
    alt: 'Rhode',
    x: 25,
    y: 45,
    width: 60,
    height: 60
  },
  {
    id: 'camera',
    src: '/images/camera.png',
    alt: 'Camera',
    x: 60,
    y: 35,
    width: 150,
    height: 150
  },
  {
    id: 'lowe',
    src: '/images/lowe.png',
    alt: 'Lowe',
    x: 70,
    y: 15,
    width: 90,
    height: 90
  }
]

export default function InspoPage() {
  const [stage, setStage] = useState<'choose' | 'loading' | 'loaded'>('choose')
  const [mode, setMode] = useState<'demo' | 'pinterest' | null>(null)
  const [pinterestPins, setPinterestPins] = useState<PinterestPin[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  
  // Airport tray draggable items state
  const [items, setItems] = useState<DraggableItem[]>(DRAGGABLE_ITEMS)
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    checkPinterestConnection()
  }, [])

  const checkPinterestConnection = async () => {
    const connection = await getPinterestConnection()
    setIsConnected(!!connection)
  }

  const handleChoice = async (choice: 'demo' | 'pinterest') => {
    setMode(choice)
    setStage('loading')
    setError(null)

    if (choice === 'demo') {
      setTimeout(() => {
        setStage('loaded')
      }, 2000)
      return
    }

    try {
      if (!isConnected) {
        const authUrl = await startPinterestOAuth()
        window.location.href = authUrl
        return
      }

      // For Pinterest mode, show the airport tray UI instead of Pinterest pins
      setStage('loaded')
    } catch (err) {
      console.error('Pinterest error:', err)
      setError(err instanceof Error ? err.message : 'Failed to connect to Pinterest')
      setStage('choose')
    }
  }

  // Drag and drop functionality for airport tray
  const handleMouseDown = (e: React.MouseEvent, itemId: string) => {
    e.preventDefault()
    const item = items.find(i => i.id === itemId)
    if (!item || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const offsetX = e.clientX - rect.left - (item.x * rect.width / 100)
    const offsetY = e.clientY - rect.top - (item.y * rect.height / 100)

    setDraggedItem(itemId)
    setDragOffset({ x: offsetX, y: offsetY })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedItem || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const newX = ((e.clientX - rect.left - dragOffset.x) / rect.width) * 100
    const newY = ((e.clientY - rect.top - dragOffset.y) / rect.height) * 100

    setItems(prev => prev.map(item => 
      item.id === draggedItem 
        ? { ...item, x: Math.max(0, Math.min(90, newX)), y: Math.max(0, Math.min(80, newY)) }
        : item
    ))
  }

  const handleMouseUp = () => {
    setDraggedItem(null)
    setDragOffset({ x: 0, y: 0 })
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
      <Menu />
      
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid var(--shadow)'
      }}>
        <h1 style={{
          fontFamily: "'LiebeHeide', 'Caveat', cursive",
          fontSize: '2.4em',
          margin: 0,
          color: 'var(--text)'
        }}>
          My Favourites
        </h1>
      </div>

      {/* Error message */}
      {error && (
        <div style={{
          padding: '16px 20px',
          background: '#fee',
          color: '#c00',
          textAlign: 'center',
          borderBottom: '1px solid #fcc'
        }}>
          {error}
        </div>
      )}

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
            fontFamily: "'LiebeHeide', 'Caveat', cursive",
            fontSize: '2.0em',
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
              src="/public/images/pinterest-logo.png"
              alt="Pinterest"
              style={{ width: '60px', height: '60px', objectFit: 'contain' }}
            />
            <span style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.3em',
              color: '#E60023',
              fontWeight: 600
            }}>
              {isConnected ? 'Load Pinterest Pins' : 'Connect Pinterest'}
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
              fontFamily: "'Poppins', sans-serif",
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
          {/* Airport Tray Container - Always show for both demo and pinterest modes */}
          <div 
            ref={containerRef}
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              maxWidth: '700px',
              margin: '0 auto',
              aspectRatio: '1.2',
              cursor: draggedItem ? 'grabbing' : 'default'
            }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Airport Tray Background */}
            <img
              src="/images/airportTray.png"
              alt="Airport Tray"
              style={{
                width: '100%',
                height: '60%',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                left: '0',
                objectFit: 'cover',
                borderRadius: '12px',
                userSelect: 'none',
                pointerEvents: 'none'
              }}
            />

            {/* Draggable Items */}
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  position: 'absolute',
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  width: `${item.width}px`,
                  height: `${item.height}px`,
                  cursor: draggedItem === item.id ? 'grabbing' : 'grab',
                  zIndex: draggedItem === item.id ? 10 : 1,
                  transform: draggedItem === item.id ? 'scale(1.1)' : 'scale(1)',
                  transition: draggedItem === item.id ? 'none' : 'transform 0.2s ease',
                  filter: draggedItem === item.id ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' : 'drop-shadow(0 2px 6px rgba(0,0,0,0.2))'
                }}
                onMouseDown={(e) => handleMouseDown(e, item.id)}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    userSelect: 'none',
                    pointerEvents: 'none'
                  }}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
