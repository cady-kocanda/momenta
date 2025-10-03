import React, { useState } from 'react'
import MenuButton from './nav/MenuButton'
import GoalsPage from './pages/GoalsPage'
import InspoPage from './pages/InspoPage'

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'goals' | 'inspo'>('home')

  return (
    <div id="app" className="app-root">
      {currentPage === 'home' && (
        <>
          <MenuButton 
            onClick={() => setCurrentPage('goals')}
            onInspoClick={() => setCurrentPage('inspo')}
          />
          <div className="home-wrap">
            <img src="/images/Home.png" alt="Home" className="home-img" />
            <div className="home-overlay">welcome</div>
          </div>
        </>
      )}
      {currentPage === 'goals' && (
        <GoalsPage onBack={() => setCurrentPage('home')} />
      )}
      {currentPage === 'inspo' && (
        <InspoPage onBack={() => setCurrentPage('home')} />
      )}
    </div>
  )
}
