import React, { useState } from 'react'

type Props = {
  onBack: () => void
}

export default function MusicPage({ onBack }: Props) {
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

      {/* Main Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative Music Notes */}
        <img 
          src="/images/music.png" 
          alt="Music note" 
          style={{
            position: 'absolute',
            top: '8%',
            left: '8%',
            width: '35px',
            height: '35px',
            opacity: 0.6,
            transform: 'rotate(-15deg)',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(-15deg) scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(-15deg) scale(1)'}
        />
        <img 
          src="/images/music2.png" 
          alt="Music note" 
          style={{
            position: 'absolute',
            top: '12%',
            right: '12%',
            width: '30px',
            height: '30px',
            opacity: 0.5,
            transform: 'rotate(20deg)',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(20deg) scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(20deg) scale(1)'}
        />
        <img 
          src="/images/music.png" 
          alt="Music note" 
          style={{
            position: 'absolute',
            top: '25%',
            left: '3%',
            width: '25px',
            height: '25px',
            opacity: 0.4,
            transform: 'rotate(45deg)',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(45deg) scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(45deg) scale(1)'}
        />
        <img 
          src="/images/music2.png" 
          alt="Music note" 
          style={{
            position: 'absolute',
            top: '30%',
            right: '3%',
            width: '28px',
            height: '28px',
            opacity: 0.4,
            transform: 'rotate(-30deg)',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(-30deg) scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(-30deg) scale(1)'}
        />

        {/* Kitty Character */}
        <img 
          src="/images/kitty.png" 
          alt="Kitty with headphones" 
          style={{
            position: 'absolute',
            left: '-30%',
            bottom: '15%',
            width: '360px',
            height: '360px',
            objectFit: 'contain',
            zIndex: 3,
            filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.25))',
            transition: 'all 0.3s ease'
          }}
        
        />
        {/* Large Cassette Tape Background */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1
        }}>
          <img 
            src="/images/blacktape.png" 
            alt="Cassette tape" 
            style={{
              width: '420px',
              height: 'auto',
              filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.15))',
              opacity: 0.7
            }}
          />
      </div>

        {/* Spotify Integration */}
        <div style={{
          position: 'absolute',
          right: '5%',
          bottom: '12%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px'
        }}>
          <img 
            src="/images/Record2.png" 
            alt="Vinyl record" 
            style={{
              width: '100px',
              height: '100px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)'
            }}
          />
          <div style={{
            color: '#333',
            fontSize: '0.9em',
            textAlign: 'center',
            padding: '6px 12px',
            fontWeight: 'bold',
            fontFamily: "'Dancing Script', cursive"
          }}>
            tap for my spotify
          </div>
        </div>
      </div>
    </div>
  )
}
    