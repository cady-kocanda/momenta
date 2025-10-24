import {
  BudgetCategory,
  SavingsGoal,
  WishlistItem,
  Transaction
} from '../types/financial'

export const sampleBudgetCategories: BudgetCategory[] = [
  {
    id: 'cat_shopping',
    category: 'shopping',
    name: 'Shopping & Fashion',
    budgetAmount: 300,
    spent: 180,
    icon: '🛍️',
    color: '#ff96c4'
  },
  {
    id: 'cat_coffee',
    category: 'coffee',
    name: 'Coffee & Treats',
    budgetAmount: 100,
    spent: 85,
    icon: '☕',
    color: '#ffd93d'
  },
  {
    id: 'cat_food',
    category: 'food',
    name: 'Groceries',
    budgetAmount: 400,
    spent: 320,
    icon: '🛒',
    color: '#96e6a1'
  },
  {
    id: 'cat_dining',
    category: 'dining',
    name: 'Dining Out',
    budgetAmount: 200,
    spent: 145,
    icon: '🍽️',
    color: '#ffb3d1'
  },
  {
    id: 'cat_beauty',
    category: 'beauty',
    name: 'Beauty & Self-Care',
    budgetAmount: 150,
    spent: 120,
    icon: '💅',
    color: '#c77dff'
  },
  {
    id: 'cat_entertainment',
    category: 'entertainment',
    name: 'Entertainment & Fun',
    budgetAmount: 180,
    spent: 95,
    icon: '🎉',
    color: '#4facfe'
  }
]

export const sampleSavingsGoals: SavingsGoal[] = [
  {
    id: 'goal_vacation',
    name: 'Dream Vacation to Japan',
    type: 'vacation',
    targetAmount: 5000,
    currentAmount: 2340,
    deadline: new Date('2025-12-31'),
    notes: 'Cherry blossom season!',
    isCompleted: false,
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400'
  },
  {
    id: 'goal_emergency',
    name: 'Emergency Fund',
    type: 'emergency',
    targetAmount: 10000,
    currentAmount: 6500,
    notes: '6 months of expenses',
    isCompleted: false
  },
  {
    id: 'goal_laptop',
    name: 'New MacBook Pro',
    type: 'purchase',
    targetAmount: 2500,
    currentAmount: 1200,
    deadline: new Date('2025-06-01'),
    isCompleted: false,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'
  }
]

export const sampleWishlistItems: WishlistItem[] = [
  {
    id: 'wish_bag',
    name: 'Designer Crossbody Bag',
    price: 450,
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400',
    url: 'https://example.com',
    category: 'shopping',
    priority: 'want',
    dateAdded: new Date('2025-01-15'),
    savedTowards: 180,
    notes: 'Perfect for summer!',
    isPurchased: false
  },
  {
    id: 'wish_camera',
    name: 'Fujifilm X100V Camera',
    price: 1399,
    imageUrl: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400',
    url: 'https://example.com',
    category: 'other',
    priority: 'dream',
    dateAdded: new Date('2025-01-10'),
    savedTowards: 400,
    notes: 'For my photography hobby',
    isPurchased: false
  },
  {
    id: 'wish_shoes',
    name: 'White Leather Sneakers',
    price: 120,
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
    category: 'shopping',
    priority: 'want',
    dateAdded: new Date('2025-01-20'),
    savedTowards: 60,
    isPurchased: false
  },
  {
    id: 'wish_skincare',
    name: 'Luxury Skincare Set',
    price: 195,
    imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400',
    category: 'beauty',
    priority: 'want',
    dateAdded: new Date('2025-01-18'),
    savedTowards: 100,
    notes: 'Birthday gift to myself',
    isPurchased: false
  }
]

export const sampleTransactions: Transaction[] = [
  {
    id: 'txn_1',
    amount: 45.50,
    category: 'shopping',
    description: 'Target shopping trip',
    date: new Date('2025-01-22'),
    type: 'expense',
    merchantName: 'Target'
  },
  {
    id: 'txn_2',
    amount: 5.75,
    category: 'coffee',
    description: 'Morning latte',
    date: new Date('2025-01-23'),
    type: 'expense',
    merchantName: 'Starbucks'
  },
  {
    id: 'txn_3',
    amount: 85.20,
    category: 'food',
    description: 'Weekly groceries',
    date: new Date('2025-01-21'),
    type: 'expense',
    merchantName: 'Whole Foods'
  },
  {
    id: 'txn_4',
    amount: 42.00,
    category: 'dining',
    description: 'Dinner with friends',
    date: new Date('2025-01-20'),
    type: 'expense',
    merchantName: 'Local Restaurant'
  },
  {
    id: 'txn_5',
    amount: 3500.00,
    category: 'income',
    description: 'Monthly salary',
    date: new Date('2025-01-15'),
    type: 'income'
  }
]

// Function to initialize sample data in the FinancialContext
export function initializeSampleData() {
  const data = {
    budgetCategories: sampleBudgetCategories,
    savingsGoals: sampleSavingsGoals,
    wishlistItems: sampleWishlistItems,
    transactions: sampleTransactions,
    incomeStreams: [],
    subscriptions: [],
    achievements: []
  }
  
  localStorage.setItem('momenta-financial-data', JSON.stringify(data))
  console.log('Sample financial data initialized!')
  return data
}

