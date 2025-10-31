import React from 'react'
import { NavigationProvider, useNavigation } from './contexts/NavigationContext'
import { GoalsProvider } from './contexts/GoalsContext'
import { FinancialProvider } from './contexts/FinancialContext'
import MenuButton from './nav/MenuButton'
import GoalsPage from './pages/GoalsPage'
import InspoPage from './pages/InspoPage'
import MusicPage from './pages/MusicPage'
import ExplosionAnimation from './components/ExplosionAnimation'
import CalendarPage from './pages/CalendarPage'
import FinancialPage from './pages/FinancialPage'
import FinancialSavingsPage from './pages/FinancialSavingsPage'
import FinancialBudgetPage from './pages/FinancialBudgetPage'
import FinancialWishlistPage from './pages/FinancialWishlistPage'
import FinancialOverviewPage from './pages/FinancialOverviewPage'

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
      {currentPage === 'calendar' && (
        <CalendarPage />
      )}
      {currentPage === 'finance' && (
        <FinancialPage />
      )}
      {currentPage === 'finance_overview' && (
        <FinancialOverviewPage />
      )}
      {currentPage === 'finance_savings' && (
        <FinancialSavingsPage />
      )}
      {currentPage === 'finance_budget' && (
        <FinancialBudgetPage />
      )}
      {currentPage === 'finance_wishlist' && (
        <FinancialWishlistPage />
      )}
    </div>
  )
}

export default function App() {
  return (
    <GoalsProvider>
      <FinancialProvider>
        <NavigationProvider>
          <AppContent />
        </NavigationProvider>
      </FinancialProvider>
    </GoalsProvider>
  )
}
