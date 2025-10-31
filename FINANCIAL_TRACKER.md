# Financial Tracker 

## Overview
A beautiful, scrapbook-style financial tracker integrated into Momenta. Makes money management feel less intimidating and more like curating your dream life.

## Features Implemented

###  Core Infrastructure
- **Type System** (`src/types/financial.ts`)
  - Complete TypeScript interfaces for all financial data
  - Budget categories, savings goals, wishlist items, transactions, etc.

- **State Management** (`src/contexts/FinancialContext.tsx`)
  - React Context for global financial state
  - LocalStorage persistence
  - CRUD operations for all financial entities

### UI Components
- **BudgetCategoryCard** - Visual budget tracking with progress bars
- **SavingsGoalCard** - Gorgeous goal cards with progress visualization
- **WishlistItemCard** - Pinterest-style wishlist items with images

### Pages & Navigation
- **FinancialPage** with 4 tabs:
  - Overview: Dashboard with stats and highlights
  - Budget: Category-based budget tracking
  - Savings: Goal visualization and tracking
  - Wishlist: Dream items with save-up tracking

### Sample Data
- Pre-built sample data for testing (`src/utils/sampleFinancialData.ts`)
- One-click load sample data button
- Realistic examples with categories, goals, wishlist items

## File Structure

```
src/
├── types/
│   └── financial.ts                 # TypeScript interfaces
├── contexts/
│   └── FinancialContext.tsx         # State management
├── components/
│   └── financial/
│       ├── BudgetCategoryCard.tsx   # Budget category UI
│       ├── SavingsGoalCard.tsx      # Savings goal UI
│       └── WishlistItemCard.tsx     # Wishlist item UI
├── pages/
│   └── FinancialPage.tsx            # Main financial page
└── utils/
    └── sampleFinancialData.ts       # Sample/mock data
```

## Usage

### Navigate to Finance
Click the menu button → Select "Finance" from the nav menu

### Load Sample Data
On any empty tab, click the "Load Sample Data" button to populate with example data

### Features Ready to Use
- View budget categories with spending tracking
- Browse savings goals with visual progress
- Manage wishlist items
- Overview dashboard with financial stats

## Future Enhancements

### High Priority
1. **Add/Edit Modals**
   - Create new budget categories
   - Add savings goals
   - Add wishlist items from URLs

2. **Transaction Management**
   - Add expense/income transactions
   - Transaction list view
   - Filter by date/category

3. **Visual Enhancements**
   - Animated progress bars
   - Confetti on goal completion
   - Achievement badges

### Medium Priority
4. **Subscription Tracker**
   - Manage recurring bills
   - Subscription audit
   - Next billing reminders

5. **Income Streams**
   - Track multiple income sources
   - Irregular income support

6. **Monthly Insights**
   - Spending patterns
   - Comparison charts
   - AI-powered suggestions

### Nice to Have
7. **Bank Integration** (Plaid API)
8. **Receipt Scanner**
9. **Export Reports**
10. **Budget vs Actual Charts**

## Design Philosophy
- **Aspirational over restrictive**: Focus on dreams and goals
- **Visual and playful**: Use of emojis, colors, and animations
- **Scrapbook aesthetic**: Matches the overall Momenta vibe
- **Non-judgmental**: Celebrate wins, gentle on overspending

## Technical Notes

### Data Persistence
- All data stored in localStorage
- Key: `momenta-financial-data`
- Automatic save on every change

### Component Architecture
- Context API for global state
- Reusable card components
- Type-safe throughout

### Styling
- Inline styles matching Momenta design system
- Uses CSS variables (--bg, --accent, --text-dark, etc.)
- Responsive card grids

## Getting Started for Development

1. Navigate to the Finance page
2. Click "Load Sample Data"
3. Explore the different tabs
4. Data persists in localStorage
5. Refresh to see data persistence working

 