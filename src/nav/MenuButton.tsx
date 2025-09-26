import React, { useRef, useState } from 'react'

type Props = {}

export default function MenuButton({}: Props) {
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
            fontFamily: "'Caveat', 'Comic Sans MS', 'Brush Script MT', cursive, arial, sans-serif",
            fontWeight: 600,
            fontSize: '1.0em',
            color: '#333',
            cursor: 'pointer',
            minWidth: 90,
            zIndex: 20,
            backdropFilter: 'blur(6px)',
            transition: 'opacity 0.2s',
          }}
        >
          <div style={{ padding: '10px 0', textAlign: 'left' }}>Set Goals</div>
        </nav>
      )}
    </>
  )
}
