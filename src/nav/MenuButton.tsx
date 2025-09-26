import React from 'react'

type Props = {
  onClick?: () => void
}

export default function MenuButton({ onClick }: Props) {
  return (
    <button className="menu-btn" title="Goals" onClick={onClick}>
      <img src="/images/ButtonMenu.png" alt="Goals menu" />
    </button>
  )
}
