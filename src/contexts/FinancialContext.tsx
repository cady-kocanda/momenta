import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import {
  Transaction,
  BudgetCategory,
  WishlistItem,
  SavingsGoal,
  IncomeStream,
  Subscription,
  Achievement,
  FinancialStats,
  TransactionCategory
} from '../types/financial'

interface FinancialContextType {
  // Transactions
  transactions: Transaction[]
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void
  deleteTransaction: (id: string) => void
  getTransactionsByMonth: (month: number, year: number) => Transaction[]
  
  // Budget
  budgetCategories: BudgetCategory[]
  updateBudget: (categoryId: string, newBudget: number) => void
  getCategorySpending: (category: TransactionCategory) => number
  
  // Wishlist
  wishlistItems: WishlistItem[]
  addWishlistItem: (item: Omit<WishlistItem, 'id' | 'dateAdded' | 'savedTowards' | 'isPurchased'>) => void
  deleteWishlistItem: (id: string) => void
  updateWishlistSavings: (id: string, amount: number) => void
  markWishlistPurchased: (id: string) => void
  
  // Savings Goals
  savingsGoals: SavingsGoal[]
  addSavingsGoal: (goal: Omit<SavingsGoal, 'id' | 'currentAmount' | 'isCompleted'>) => void
  updateGoalProgress: (id: string, amount: number) => void
  deleteSavingsGoal: (id: string) => void
  
  // Income
  incomeStreams: IncomeStream[]
  addIncomeStream: (stream: Omit<IncomeStream, 'id'>) => void
  deleteIncomeStream: (id: string) => void
  
  // Subscriptions
  subscriptions: Subscription[]
  addSubscription: (subscription: Omit<Subscription, 'id'>) => void
  deleteSubscription: (id: string) => void
  
  // Achievements
  achievements: Achievement[]
  
  // Stats
  getFinancialStats: () => FinancialStats
}

const FinancialContext = createContext<FinancialContextType | undefined>(undefined)

export function FinancialProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>([])
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([])
  const [incomeStreams, setIncomeStreams] = useState<IncomeStream[]>([])
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('momenta-financial-data')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        if (data.transactions) setTransactions(data.transactions)
        if (data.budgetCategories) setBudgetCategories(data.budgetCategories)
        if (data.wishlistItems) setWishlistItems(data.wishlistItems)
        if (data.savingsGoals) setSavingsGoals(data.savingsGoals)
        if (data.incomeStreams) setIncomeStreams(data.incomeStreams)
        if (data.subscriptions) setSubscriptions(data.subscriptions)
        if (data.achievements) setAchievements(data.achievements)
      } catch (error) {
        console.error('Error loading financial data:', error)
      }
    }
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    const data = {
      transactions,
      budgetCategories,
      wishlistItems,
      savingsGoals,
      incomeStreams,
      subscriptions,
      achievements
    }
    localStorage.setItem('momenta-financial-data', JSON.stringify(data))
  }, [transactions, budgetCategories, wishlistItems, savingsGoals, incomeStreams, subscriptions, achievements])

  // Transaction methods
  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }
    setTransactions(prev => [newTransaction, ...prev])
    
    // Update budget spending
    if (transaction.type === 'expense') {
      setBudgetCategories(prev =>
        prev.map(cat =>
          cat.category === transaction.category
            ? { ...cat, spent: cat.spent + transaction.amount }
            : cat
        )
      )
    }
  }

  const deleteTransaction = (id: string) => {
    const transaction = transactions.find(t => t.id === id)
    if (transaction && transaction.type === 'expense') {
      setBudgetCategories(prev =>
        prev.map(cat =>
          cat.category === transaction.category
            ? { ...cat, spent: Math.max(0, cat.spent - transaction.amount) }
            : cat
        )
      )
    }
    setTransactions(prev => prev.filter(t => t.id !== id))
  }

  const getTransactionsByMonth = (month: number, year: number) => {
    return transactions.filter(t => {
      const date = new Date(t.date)
      return date.getMonth() === month && date.getFullYear() === year
    })
  }

  // Budget methods
  const updateBudget = (categoryId: string, newBudget: number) => {
    setBudgetCategories(prev =>
      prev.map(cat => (cat.id === categoryId ? { ...cat, budgetAmount: newBudget } : cat))
    )
  }

  const getCategorySpending = (category: TransactionCategory) => {
    return transactions
      .filter(t => t.category === category && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
  }

  // Wishlist methods
  const addWishlistItem = (item: Omit<WishlistItem, 'id' | 'dateAdded' | 'savedTowards' | 'isPurchased'>) => {
    const newItem: WishlistItem = {
      ...item,
      id: `wish_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      dateAdded: new Date(),
      savedTowards: 0,
      isPurchased: false
    }
    setWishlistItems(prev => [newItem, ...prev])
  }

  const deleteWishlistItem = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id))
  }

  const updateWishlistSavings = (id: string, amount: number) => {
    setWishlistItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, savedTowards: item.savedTowards + amount } : item
      )
    )
  }

  const markWishlistPurchased = (id: string) => {
    setWishlistItems(prev =>
      prev.map(item => (item.id === id ? { ...item, isPurchased: true } : item))
    )
  }

  // Savings Goal methods
  const addSavingsGoal = (goal: Omit<SavingsGoal, 'id' | 'currentAmount' | 'isCompleted'>) => {
    const newGoal: SavingsGoal = {
      ...goal,
      id: `goal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      currentAmount: 0,
      isCompleted: false
    }
    setSavingsGoals(prev => [newGoal, ...prev])
  }

  const updateGoalProgress = (id: string, amount: number) => {
    setSavingsGoals(prev =>
      prev.map(goal => {
        if (goal.id === id) {
          const newAmount = goal.currentAmount + amount
          return {
            ...goal,
            currentAmount: newAmount,
            isCompleted: newAmount >= goal.targetAmount
          }
        }
        return goal
      })
    )
  }

  const deleteSavingsGoal = (id: string) => {
    setSavingsGoals(prev => prev.filter(goal => goal.id !== id))
  }

  // Income methods
  const addIncomeStream = (stream: Omit<IncomeStream, 'id'>) => {
    const newStream: IncomeStream = {
      ...stream,
      id: `income_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }
    setIncomeStreams(prev => [newStream, ...prev])
  }

  const deleteIncomeStream = (id: string) => {
    setIncomeStreams(prev => prev.filter(stream => stream.id !== id))
  }

  // Subscription methods
  const addSubscription = (subscription: Omit<Subscription, 'id'>) => {
    const newSubscription: Subscription = {
      ...subscription,
      id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }
    setSubscriptions(prev => [newSubscription, ...prev])
  }

  const deleteSubscription = (id: string) => {
    setSubscriptions(prev => prev.filter(sub => sub.id !== id))
  }

  // Stats calculation
  const getFinancialStats = (): FinancialStats => {
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
    
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
    
    const totalSavings = savingsGoals.reduce((sum, goal) => sum + goal.currentAmount, 0)
    
    const netWorth = totalIncome - totalExpenses + totalSavings
    const savingsRate = totalIncome > 0 ? (totalSavings / totalIncome) * 100 : 0

    // Find top spending category
    const categoryTotals = new Map<TransactionCategory, number>()
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        const current = categoryTotals.get(t.category) || 0
        categoryTotals.set(t.category, current + t.amount)
      })
    
    let topSpendingCategory: TransactionCategory = 'other'
    let maxSpending = 0
    categoryTotals.forEach((amount, category) => {
      if (amount > maxSpending) {
        maxSpending = amount
        topSpendingCategory = category
      }
    })

    return {
      netWorth,
      totalIncome,
      totalExpenses,
      totalSavings,
      savingsRate,
      topSpendingCategory,
      monthlyAverage: totalExpenses / Math.max(1, new Set(transactions.map(t => new Date(t.date).getMonth())).size)
    }
  }

  const value: FinancialContextType = {
    transactions,
    addTransaction,
    deleteTransaction,
    getTransactionsByMonth,
    budgetCategories,
    updateBudget,
    getCategorySpending,
    wishlistItems,
    addWishlistItem,
    deleteWishlistItem,
    updateWishlistSavings,
    markWishlistPurchased,
    savingsGoals,
    addSavingsGoal,
    updateGoalProgress,
    deleteSavingsGoal,
    incomeStreams,
    addIncomeStream,
    deleteIncomeStream,
    subscriptions,
    addSubscription,
    deleteSubscription,
    achievements,
    getFinancialStats
  }

  return <FinancialContext.Provider value={value}>{children}</FinancialContext.Provider>
}

export function useFinancial() {
  const context = useContext(FinancialContext)
  if (context === undefined) {
    throw new Error('useFinancial must be used within a FinancialProvider')
  }
  return context
}

