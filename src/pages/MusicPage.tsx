import React, { useState } from 'react'
import Menu from '../components/Menu'

export default function MusicPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [spotifyData, setSpotifyData] = useState<any>(null)

  // TODO: Spotify API Integration
  // Replace this with actual Spotify API calls
  // Example structure for spotifyData:
  // {
  //   tracks: [
  //     { title: "Song Title", artist: "Artist Name", albumArt: "url", previewUrl: "url" },
  //     ...
  //   ],
  //   currentTrack: { ... },
  //   isPlaying: boolean
  // }
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  // Always show Spotify UI; no toggling

 

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'var(--bg)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <Menu />

      {/* Unified Stage - Visuals + Spotify */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {/* Kitty Character */}
        <img 
          src="/images/kitty.png" 
          alt="Kitty with headphones" 
          style={{
            position: 'absolute',
            left: '40%',
            top: '27%',
            width: '380px',
            height: '380px',
            objectFit: 'contain',
            zIndex: 9,
            filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.3))',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)'
            e.currentTarget.style.filter = 'drop-shadow(0 10px 25px rgba(0,0,0,0.4))'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.filter = 'drop-shadow(0 8px 20px rgba(0,0,0,0.3))'
          }}
        />

        {/* Large Cassette Tape Background */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1,
          width: '100%',
          padding: '0 0px',
          boxSizing: 'border-box'
        }}>
          <img 
            src="/images/blacktape.png" 
            alt="Cassette tape" 
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              margin: '0 auto'
            }}
          />
          {/* Playlist Label Text */}
          <div style={{
            position: 'absolute',
            top: '60px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'transparent',
            color: '#333',
            fontFamily: "'LiebeHeide', 'Caveat', cursive",
            fontSize: '1.8em',
            fontWeight: 'bold',
            textAlign: 'center',
            padding: '2px 4px',
            zIndex: 2,
            textShadow: '0 2px 4px rgba(255,255,255,0.9)'
          }}>
            if i were a playlist
          </div>
        </div>

        {/* Spotify Panel (bottom-centered, always visible) */}
        <div style={{
          position: 'absolute',
          left: '48%',
          top: '43%',
          transform: 'translate(-51%, -50%)',
          zIndex: 5,
          width: '73%'
        }}>
          <div style={{
            background: '#191414',
            borderRadius: '20px',
            padding: '10px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            height: '130px'
          }}>
              {/* Top Section - Album Cover and Track List */}
              <div style={{
                display: 'flex',
                gap: '20px',
                marginBottom: '20px',
                flex: 1
              }}>
                {/* Album Cover Area */}
                <div style={{
                  width: '120px',
                  height: '120px',
                  background: '#282828',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#b3b3b3',
                  fontSize: '0.9em'
                }}>
                  {/* Empty album cover */}
                </div>

                {/* Track List Area */}
                <div style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  {/* Spotify Logo */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginBottom: '10px'
                  }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      background: '#1db954',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      ♪
                    </div>
                  </div>

                  {/* Empty Track List */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}>
                    {/* Empty track rows */}
                    {[1, 2, 3].map((_, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '4px 0',
                        color: '#b3b3b3',
                        fontSize: '0.9em'
                      }}>
                        <div style={{
                          width: '16px',
                          height: '16px',
                          background: '#404040',
                          borderRadius: '2px'
                        }} />
                        <div style={{
                          flex: 1,
                          height: '12px',
                          background: '#404040',
                          borderRadius: '2px'
                        }} />
                      </div>
                    ))}
                  </div>
                </div>
              
              </div>
          </div>
        </div>
      </div>
      
      {/* Add CSS animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}