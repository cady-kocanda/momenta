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
                position: relative;
                color: var(--text-dark);
                padding: 4px 8px;
                cursor: pointer;
                text-align: center;
                transition: none;
                display: inline-block;
                width: fit-content;
              }
              .nav-item::before,
              .nav-item::after {
                content: '';
                position: absolute;
                inset: -1px -5px;
                border: 2px solid var(--accent);
                border-radius: 999px;
                transform: rotate(-0.5deg);
                opacity: 0.9;
                pointer-events: none;
                filter: drop-shadow(0 2px 0 rgba(0,0,0,0.05));
              }
              .nav-item::after {
                inset: -3px -7px;
                border-width: 1.6px;
                transform: rotate(0.8deg) scale(1.01);
                opacity: 0.6;
              }
              /* Handwritten variation per item */
              .nav-item:nth-child(1)::before { transform: rotate(-2deg) scaleX(1.02) translateY(0.5px); }
              .nav-item:nth-child(1)::after  { transform: rotate(1.4deg) scale(1.015) translateY(-0.4px); }
              .nav-item:nth-child(2)::before { inset: -2px -6px; transform: rotate(0.8deg) scaleX(0.98) translateX(-0.5px); }
              .nav-item:nth-child(2)::after  { inset: -4px -8px; transform: rotate(-0.6deg) scale(1.02); opacity: 0.55; }
              .nav-item:nth-child(3)::before { inset: -1px -6px; border-width: 2.2px; transform: rotate(-1.2deg) scale(1.005); }
              .nav-item:nth-child(3)::after  { inset: -3px -7px; transform: rotate(1.6deg) scale(1.01); }
              .nav-item:nth-child(4)::before { inset: -2px -5px; transform: rotate(1.2deg) scaleX(1.04); }
              .nav-item:nth-child(4)::after  { inset: -4px -7px; transform: rotate(-1.1deg) scale(1.02); }
              .nav-item:nth-child(5)::before { inset: -1px -4px; transform: rotate(-0.8deg) scale(0.995); }
              .nav-item:nth-child(5)::after  { inset: -3px -6px; transform: rotate(1.1deg) scale(1.008); }
              /* No hover effects per design */
            `}
          </style>
          <nav
            style={{
              position: 'absolute',
              top: 22,
              left: 20,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 10,
              padding: 0,
              background: 'transparent',
              border: 'none',
              zIndex: 20
            }}
          >
            {/* First row, offset to the right of the button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 22, marginLeft: 52 }}>
              {[{ label: 'Home', action: navigateToHome }, { label: 'Goals', action: navigateToGoals }, { label: 'Inspo', action: navigateToInspo }].map((item, i) => (
                <div
                  key={item.label}
                  onClick={() => handleNavClick(item.action)}
                  className="nav-item"
                  style={{ fontSize: '20px', transform: `translateY(${[0, -2, 1][i]}px) skewX(${[-1, 0.5, -0.5][i]}deg)` }}
                >
                  {item.label}
                </div>
              ))}
            </div>
            {/* Second row starts below the button at the left-hand side */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginLeft: 0 }}>
              {[{ label: 'Music', action: navigateToMusic }, { label: 'Calendar', action: navigateToCalendar }].map((item, i) => (
                <div
                  key={item.label}
                  onClick={() => handleNavClick(item.action)}
                  className="nav-item"
                  style={{ fontSize: '20px', transform: `translateY(${[1, -1][i]}px) skewX(${[0.5, -0.2][i]}deg)` }}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </nav>
        </>
      )}
    </>
  )
}
