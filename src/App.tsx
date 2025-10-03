import React, { useState } from 'react'
import MenuButton from './nav/MenuButton'
import GoalsPage from './pages/GoalsPage'

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'goals'>('home')

  return (
    <div id="app" className="app-root">
      {currentPage === 'home' && (
        <>
          <MenuButton onClick={() => setCurrentPage('goals')} />
          <div className="home-wrap">
            <img src="/images/Home.png" alt="Home" className="home-img" />
            <div className="home-overlay">welcome</div>
          </div>
        </>
      )}
      {currentPage === 'goals' && (
        <GoalsPage onBack={() => setCurrentPage('home')} />
      )}
    </div>
  )
}
