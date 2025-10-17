import React, { useRef, useState } from 'react'
import { useNavigation } from '../contexts/NavigationContext'

export default function MenuButton() {
  const { navigateToHome, navigateToGoals, navigateToInspo, navigateToMusic, navigateToCalendar } = useNavigation()
  const btnRef = useRef<HTMLButtonElement>(null)
  const [showNav, setShowNav] = useState(false)

  const handleClick = () => {
    if (btnRef.current) {
      btnRef.current.animate([
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(360deg)' }
      ], {
        duration: 400,
        easing: 'cubic-bezier(0.4, 0.2, 0.2, 1)'
      })
    }
    setShowNav(v => !v)
  }

  const handleNavClick = (callback: () => void) => {
    setShowNav(false)
    callback()
  }

  return (
    <>
      <button ref={btnRef} className="menu-btn" title="Menu" onClick={handleClick}>
        <img src="/images/ButtonMenu.png" alt="Menu" />
      </button>
      {showNav && (
        <>
          {/* Custom font styles */}
          <style>
            {`
              .nav-item {
                font-family: 'LiebeHeide', 'Caveat', cursive !important;
                font-weight: 600 !important;
                letter-spacing: 0.5px !important;
              }
            `}
          </style>
          <nav
            style={{
              position: 'absolute',
              top: 60,
              left: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              padding: '16px',
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              zIndex: 20,
              minWidth: '140px',
              transition: 'all 0.3s ease'
            }}
          >
            {[
              { label: 'Home', action: navigateToHome },
              { label: 'Goals', action: navigateToGoals },
              { label: 'Inspo', action: navigateToInspo },
              { label: 'Music', action: navigateToMusic },
              { label: 'Calendar', action: navigateToCalendar }
            ].map((item, index) => (
              <div
                key={item.label}
                onClick={() => handleNavClick(item.action)}
                className="nav-item"
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: '2px solid #333',
                  background: 'transparent',
                  fontSize: '16px',
                  color: '#333',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#ff96c4'
                  e.currentTarget.style.color = 'white'
                  e.currentTarget.style.borderColor = '#ff96c4'
                  e.currentTarget.style.transform = 'scale(1.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#333'
                  e.currentTarget.style.borderColor = '#333'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                {item.label}
              </div>
            ))}
          </nav>
        </>
      )}
    </>
  )
}
