import React, { useRef, useState } from 'react'

type Props = {
  onClick: () => void
  onInspoClick?: () => void
}

export default function MenuButton({ onClick, onInspoClick }: Props) {
  const props = { onInspoClick };
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

  const handleNavClick = () => {
    setShowNav(false)
    onClick()
  }

  return (
    <>
      <button ref={btnRef} className="menu-btn" title="Goals" onClick={handleClick}>
        <img src="/images/ButtonMenu.png" alt="Goals menu" />
      </button>
      {showNav && (
        <nav
          style={{
            position: 'absolute',
            top: 70,
            left: 18,
            display: 'flex',
            flexDirection: 'column',
            padding: '8px 20px',
            fontFamily: "'Dancing Script', cursive",
            fontWeight: 600,
            fontSize: '1.2em',
            color: '#000000ff',
            cursor: 'pointer',
            minWidth: 90,
            zIndex: 20,
            backdropFilter: 'blur(6px)',
            transition: 'opacity 0.2s',
          }}
        >
          <div onClick={() => { handleNavClick(); onClick(); }} style={{ padding: '10px 0', textAlign: 'left' }}>Set Goals</div>
          <div onClick={() => { handleNavClick(); if (props.onInspoClick) props.onInspoClick(); }} style={{ padding: '10px 0', textAlign: 'left' }}>Inspo</div>
        </nav>
      )}
    </>
  )
}
