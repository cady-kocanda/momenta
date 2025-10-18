import React, { createContext, useContext, useState, ReactNode } from 'react'

type Page = 'home' | 'goals' | 'inspo' | 'music' | 'calendar'

interface NavigationContextType {
  currentPage: Page
  navigateTo: (page: Page) => void
  navigateToHome: () => void
  navigateToGoals: () => void
  navigateToInspo: () => void
  navigateToMusic: () => void
  navigateToCalendar: () => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

interface NavigationProviderProps {
  children: ReactNode
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  const navigateTo = (page: Page) => setCurrentPage(page)
  const navigateToHome = () => setCurrentPage('home')
  const navigateToGoals = () => setCurrentPage('goals')
  const navigateToInspo = () => setCurrentPage('inspo')
  const navigateToMusic = () => setCurrentPage('music')
  const navigateToCalendar = () => setCurrentPage('calendar')

  const value: NavigationContextType = {
    currentPage,
    navigateTo,
    navigateToHome,
    navigateToGoals,
    navigateToInspo,
    navigateToMusic,
    navigateToCalendar
  }

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}
