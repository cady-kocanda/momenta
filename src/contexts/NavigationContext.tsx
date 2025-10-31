import React, { createContext, useContext, useState, ReactNode } from 'react'

type Page =
  | 'home'
  | 'goals'
  | 'inspo'
  | 'music'
  | 'calendar'
  | 'finance'
  | 'finance_savings'
  | 'finance_budget'
  | 'finance_wishlist'
  | 'finance_overview'

interface NavigationContextType {
  currentPage: Page
  navigateTo: (page: Page) => void
  navigateToHome: () => void
  navigateToGoals: () => void
  navigateToInspo: () => void
  navigateToMusic: () => void
  navigateToCalendar: () => void
  navigateToFinance: () => void
  navigateToFinanceOverview: () => void
  navigateToFinanceSavings: () => void
  navigateToFinanceBudget: () => void
  navigateToFinanceWishlist: () => void
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
  const navigateToFinance = () => setCurrentPage('finance')
  const navigateToFinanceOverview = () => setCurrentPage('finance_overview')
  const navigateToFinanceSavings = () => setCurrentPage('finance_savings')
  const navigateToFinanceBudget = () => setCurrentPage('finance_budget')
  const navigateToFinanceWishlist = () => setCurrentPage('finance_wishlist')

  const value: NavigationContextType = {
    currentPage,
    navigateTo,
    navigateToHome,
    navigateToGoals,
    navigateToInspo,
    navigateToMusic,
    navigateToCalendar,
    navigateToFinance,
    navigateToFinanceOverview,
    navigateToFinanceSavings,
    navigateToFinanceBudget,
    navigateToFinanceWishlist
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
