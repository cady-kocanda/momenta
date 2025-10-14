import React, { useState } from 'react'
import MenuButton from './nav/MenuButton'
import GoalsPage from './pages/GoalsPage'
import InspoPage from './pages/InspoPage'
import MusicPage from './pages/MusicPage'

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'goals' | 'inspo' | 'music'>('home')

  return (
    <div id="app" className="app-root">
      {currentPage === 'home' && (
        <>
          <MenuButton
            onClick={() => setCurrentPage('goals')}
            onInspoClick={() => setCurrentPage('inspo')}
            onMusicClick={() => setCurrentPage('music')}
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
      {currentPage === 'music' && (
        <>
          <MenuButton
            onClick={() => setCurrentPage('goals')}
            onInspoClick={() => setCurrentPage('inspo')}
            onMusicClick={() => setCurrentPage('music')}
          />
          <MusicPage onBack={() => setCurrentPage('home')} />
        </>
      )}
    </div>
  )
}
