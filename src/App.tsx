import React from 'react'
import MenuButton from './nav/MenuButton'

export default function App() {
  return (
    <div id="app" className="app-root">
      <MenuButton onClick={() => alert('Goals menu clicked!')} />
      <div className="home-wrap">
        <img src="/images/Home.png" alt="Home" className="home-img" />
        <div className="home-overlay">welcome</div>
      </div>
    </div>
  )
}
