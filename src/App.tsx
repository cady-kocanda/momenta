import React from 'react'
import { NavigationProvider, useNavigation } from './contexts/NavigationContext'
import MenuButton from './nav/MenuButton'
import GoalsPage from './pages/GoalsPage'
import InspoPage from './pages/InspoPage'
import MusicPage from './pages/MusicPage'
import ExplosionAnimation from './components/ExplosionAnimation'

function AppContent() {
  const { currentPage } = useNavigation()

  return (
    <div id="app" className="app-root">
      {/* MenuButton - always present, handles all navigation logic internally */}
      <MenuButton />

      {currentPage === 'home' && (
        <div className="home-wrap">
          <ExplosionAnimation isVisible={currentPage === 'home'} />
          <img src="/images/Homepage.png" alt="Home" className="home-img" />
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
