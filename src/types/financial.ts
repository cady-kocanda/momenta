// Financial Tracker Type Definitions

export type TransactionCategory = 
  | 'shopping'
  | 'food'
  | 'coffee'
  | 'travel'
  | 'home'
  | 'beauty'
  | 'entertainment'
  | 'dining'
  | 'learning'
  | 'gifts'
  | 'bills'
  | 'income'
  | 'other'

export type IncomeSource = 
  | 'salary'
  | 'freelance'
  | 'creative'
  | 'investments'
  | 'gifts'
  | 'refunds'
  | 'other'

export type WishlistPriority = 'need' | 'want' | 'dream'

export type SavingsGoalType = 
  | 'emergency'
  | 'vacation'
  | 'purchase'
  | 'home'
  | 'car'
  | 'education'
  | 'general'

export interface Transaction {
  id: string
  amount: number
  category: TransactionCategory
  description: string
  date: Date
  type: 'expense' | 'income'
  notes?: string
  merchantName?: string
  receiptUrl?: string
}

export interface BudgetCategory {
  id: string
  category: TransactionCategory
  name: string
  budgetAmount: number
  spent: number
  icon: string
  color: string
}

export interface WishlistItem {
  id: string
  name: string
  price: number
  imageUrl?: string
  url?: string
  category: TransactionCategory
  priority: WishlistPriority
  dateAdded: Date
  savedTowards: number
  notes?: string
  daysToWait?: number // 30-day rule
  isPurchased: boolean
}

export interface SavingsGoal {
  id: string
  name: string
  type: SavingsGoalType
  targetAmount: number
  currentAmount: number
  deadline?: Date
  imageUrl?: string
  notes?: string
  isCompleted: boolean
  milestones?: Milestone[]
}

export interface Milestone {
  id: string
  amount: number
  date: Date
  isReached: boolean
}

export interface IncomeStream {
  id: string
  source: IncomeSource
  name: string
  amount: number
  frequency: 'weekly' | 'biweekly' | 'monthly' | 'irregular'
  lastReceived?: Date
  icon: string
  color: string
}

export interface Subscription {
  id: string
  name: string
  amount: number
  frequency: 'monthly' | 'yearly'
  category: TransactionCategory
  nextBillingDate: Date
  lastUsed?: Date
  isEssential: boolean
  url?: string
  icon?: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  dateEarned: Date
  type: 'savings' | 'budget' | 'goal' | 'streak'
}

export interface FinancialStats {
  netWorth: number
  totalIncome: number
  totalExpenses: number
  totalSavings: number
  savingsRate: number
  topSpendingCategory: TransactionCategory
  monthlyAverage: number
}

export interface MonthlyInsight {
  month: string
  totalSpent: number
  totalIncome: number
  topPurchases: Transaction[]
  achievements: string[]
  suggestions: string[]
  comparisonToPreviousMonth: number
}

