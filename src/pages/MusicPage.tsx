import React, { useState, useEffect } from 'react'
import { startSpotifyOAuth, syncSpotifyTracks, getSpotifyTopTracks, getSpotifyConnection, type SpotifyTopTrack } from '../services/spotify'

type Props = {
  onBack: () => void
}

export default function MusicPage({ onBack }: Props) {
  const [stage, setStage] = useState<'connect' | 'loading' | 'loaded'>('connect')
  const [tracks, setTracks] = useState<SpotifyTopTrack[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    checkSpotifyConnection()
  }, [])

  const checkSpotifyConnection = async () => {
    const connection = await getSpotifyConnection()
    setIsConnected(!!connection)

    if (connection) {
      loadTracks()
    }
  }

  const loadTracks = async () => {
    const existingTracks = await getSpotifyTopTracks()
    if (existingTracks.length > 0) {
      setTracks(existingTracks)
      setStage('loaded')
    }
  }

  const handleConnect = async () => {
    setStage('loading')
    setError(null)

    try {
      if (!isConnected) {
        const authUrl = await startSpotifyOAuth()
        window.location.href = authUrl
        return
      }

      await syncSpotifyTracks()
      const topTracks = await getSpotifyTopTracks()
      setTracks(topTracks)
      setStage('loaded')
    } catch (err) {
      console.error('Spotify error:', err)
      setError(err instanceof Error ? err.message : 'Failed to connect to Spotify')
      setStage('connect')
    }
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
          <h2 style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: '1.5em',
            color: 'var(--text)',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            {isConnected ? 'Load your top songs' : 'Connect your Spotify'}
          </h2>

          <button
            onClick={handleConnect}
            style={{
              width: '240px',
              padding: '20px',
              background: '#1DB954',
              border: 'none',
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
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(29, 185, 84, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = '0 4px 12px var(--shadow)'
            }}
          >
            <span style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: '1.5em',
              color: '#fff',
              fontWeight: 600
            }}>
              {isConnected ? 'Load Top 5 Songs' : 'Connect Spotify'}
            </span>
          </button>

          <p style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: '1em',
            color: 'var(--text)',
            textAlign: 'center',
            maxWidth: '300px'
          }}>
            See your top 5 most played songs
          </p>
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
            borderTop: '4px solid #1DB954',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: '1.5em',
            color: 'var(--text)',
            textAlign: 'center'
          }}>
            loading your music...
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
          padding: '20px'
        }}>
          {tracks.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              fontFamily: "'Dancing Script', cursive",
              fontSize: '1.2em',
              color: 'var(--text)'
            }}>
              No tracks found. Listen to some music on Spotify first!
            </div>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              {tracks.map((track) => (
                <a
                  key={track.id}
                  href={track.external_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px',
                    background: '#fff',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px var(--shadow)',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 4px 16px var(--shadow)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 2px 8px var(--shadow)'
                  }}
                >
                  <div style={{
                    fontSize: '2em',
                    fontWeight: 'bold',
                    color: '#1DB954',
                    minWidth: '40px',
                    textAlign: 'center'
                  }}>
                    {track.rank}
                  </div>

                  {track.album_image_url && (
                    <img
                      src={track.album_image_url}
                      alt={track.album_name || 'Album cover'}
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '8px',
                        objectFit: 'cover'
                      }}
                    />
                  )}

                  <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}>
                    <div style={{
                      fontFamily: "'Dancing Script', cursive",
                      fontSize: '1.3em',
                      fontWeight: 600,
                      color: 'var(--text)'
                    }}>
                      {track.track_name}
                    </div>
                    <div style={{
                      fontFamily: "'Dancing Script', cursive",
                      fontSize: '1em',
                      color: '#666'
                    }}>
                      {track.artist_name}
                    </div>
                    {track.album_name && (
                      <div style={{
                        fontFamily: "'Dancing Script', cursive",
                        fontSize: '0.9em',
                        color: '#999'
                      }}>
                        {track.album_name}
                      </div>
                    )}
                  </div>

                  <div style={{
                    fontSize: '1.5em',
                    color: '#1DB954'
                  }}>
                    ▶
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
