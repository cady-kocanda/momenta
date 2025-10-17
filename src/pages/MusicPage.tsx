import React, { useState } from 'react'
import Menu from '../components/Menu'

export default function MusicPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [spotifyData, setSpotifyData] = useState<any>(null)
  const [showSpotifyContainer, setShowSpotifyContainer] = useState(false)

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

  const handleSpotifyClick = () => {
    setShowSpotifyContainer(!showSpotifyContainer)
  }

 

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

      {/* Top Half - Main Visual Elements */}
      <div style={{
        height: '50%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Kitty Character */}
        <img 
          src="/images/kitty.png" 
          alt="Kitty with headphones" 
          style={{
            position: 'absolute',
            left: '40%',
            bottom: '12%',
            width: '380px',
            height: '380px',
            objectFit: 'contain',
            zIndex: 3,
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
          top: '70%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1
        }}>
          <img 
            src="/images/blacktape.png" 
            alt="Cassette tape" 
            style={{
              width: '380px',
              height: 'auto',
              opacity: 0.8
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

        {/* Spotify Integration - Original "tap for my spotify" */}
        <div style={{
          position: 'absolute',
          right: '75%',
          top: '65%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          zIndex: 4
        }}>
          <img 
            src="/images/Record2.png" 
            alt="Vinyl record" 
            style={{
              width: '80px',
              height: '80px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))'
            }}
            onClick={handleSpotifyClick}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)'
              e.currentTarget.style.filter = 'drop-shadow(0 6px 16px rgba(0,0,0,0.4))'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)'
              e.currentTarget.style.filter = 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))'
            }}
          />
          <div style={{
            color: '#333',
            fontSize: '0.9em',
            textAlign: 'center',
            padding: '6px 12px',
            fontWeight: 'bold',
            fontFamily: "'Poppins', sans-serif",
            background: 'rgba(255,255,255,0.8)',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            tap for my spotify
          </div>
        </div>

      </div>

      {/* Bottom Half - Spotify Interface */}
      <div style={{
        height: '50%',
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        position: 'relative'
      }}>
        {showSpotifyContainer ? (
          /* Floating Spotify Interface Container */
          <div style={{
            background: '#191414',
            borderRadius: '20px',
            padding: '10px',
            maxWidth: '500px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.1)',
            animation: 'fadeIn 0.5s ease-in'
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

          {/* Bottom Section - Playlist Info and Controls */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
          }}>
            {/* Left - Playlist Info */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              {/* Playlist Title */}
              <div style={{
                height: '16px',
                width: '200px',
                background: '#404040',
                borderRadius: '2px'
              }} />
              
              {/* Preview Button */}
              <div style={{
                height: '32px',
                width: '80px',
                background: '#404040',
                borderRadius: '16px'
              }} />
            </div>

            {/* Right - Playback Controls */}
            <div style={{
              display: 'flex',
              gap: '3px',
              alignItems: 'center'
            }}>
              {/* Previous Track */}
              <div style={{
                width: '32px',
                height: '32px',
                background: '#404040',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#b3b3b3',
                fontSize: '12px'
              }}>
                ⏮
              </div>

              {/* Next Track */}
              <div style={{
                width: '32px',
                height: '32px',
                background: '#404040',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#b3b3b3',
                fontSize: '12px'
              }}>
                ⏭
              </div>

              {/* Add to Playlist */}
              <div style={{
                width: '32px',
                height: '32px',
                background: '#404040',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#b3b3b3',
                fontSize: '12px'
              }}>
                +
              </div>

              {/* More Options */}
              <div style={{
                width: '32px',
                height: '32px',
                background: '#404040',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#b3b3b3',
                fontSize: '12px'
              }}>
                ⋯
              </div>

              {/* Play Button */}
              <div style={{
                width: '40px',
                height: '40px',
                background: '#1db954',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '14px'
              }}>
                ▶
              </div>
            </div>
          </div>
        </div>
        ) : (
          /* Default message when Spotify container is not shown */
          <div style={{
            textAlign: 'center',
            color: 'var(--text)',
            fontFamily: "'Poppins', sans-serif",
            fontSize: '1.5em',
            opacity: 0.6
          }}>
            <p>Click the record above to open Spotify</p>
          </div>
        )}
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