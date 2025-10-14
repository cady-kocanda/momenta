import React from 'react'
import { NavigationProvider, useNavigation } from './contexts/NavigationContext'
import MenuButton from './nav/MenuButton'
import GoalsPage from './pages/GoalsPage'
import InspoPage from './pages/InspoPage'
import MusicPage from './pages/MusicPage'

function AppContent() {
  const { currentPage } = useNavigation()

  return (
    <div id="app" className="app-root">
      {/* MenuButton - always present, handles all navigation logic internally */}
      <MenuButton />

      {currentPage === 'home' && (
        <div className="home-wrap">
          <img src="/images/Home.png" alt="Home" className="home-img" />
          <div className="home-overlay">welcome</div>
        </div>
      )}
      {currentPage === 'goals' && (
        <GoalsPage />
      )}
      {currentPage === 'inspo' && (
        <InspoPage />
      )}
      {currentPage === 'music' && (
        <MusicPage />
      )}
    </div>
  )
}

export default function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  )
}
