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
        <nav
          style={{
            position: 'absolute',
            top: 60,
            left: 20,
            display: 'flex',
            flexDirection: 'column',
            padding: '4px 5px',
            fontFamily: "'Dancing Script', cursive",
            fontWeight: 600,
            fontSize: '1.0em',
            color: '#000000ff',
            cursor: 'pointer',
            minWidth: 90,
            zIndex: 20,
            backdropFilter: 'blur(6px)',
            transition: 'opacity 0.2s',
          }}
        >
          <div onClick={() => handleNavClick(navigateToHome)} style={{ padding: '10px 0', textAlign: 'left' }}>Home</div>
          <div onClick={() => handleNavClick(navigateToGoals)} style={{ padding: '10px 0', textAlign: 'left' }}>Set Goals</div>
          <div onClick={() => handleNavClick(navigateToInspo)} style={{ padding: '10px 0', textAlign: 'left' }}>Inspo</div>
          <div onClick={() => handleNavClick(navigateToMusic)} style={{ padding: '10px 0', textAlign: 'left' }}>Music</div>
          <div onClick={() => handleNavClick(navigateToCalendar)} style={{ padding: '10px 0', textAlign: 'left' }}>Calendar</div>
        </nav>
      )}
    </>
  )
}
