import React, { useState } from 'react'
import { useFinancial } from '../contexts/FinancialContext'
import BudgetCategoryCard from '../components/financial/BudgetCategoryCard'
import SavingsGoalCard from '../components/financial/SavingsGoalCard'
import WishlistItemCard from '../components/financial/WishlistItemCard'
import { initializeSampleData } from '../utils/sampleFinancialData'

type TabType = 'overview' | 'budget' | 'savings' | 'wishlist'

export default function FinancialPage() {
  const {
    budgetCategories,
    savingsGoals,
    wishlistItems,
    getFinancialStats,
    deleteWishlistItem,
    markWishlistPurchased
  } = useFinancial()

  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const stats = getFinancialStats()

  const handleLoadSampleData = () => {
    initializeSampleData()
    window.location.reload() // Reload to fetch the new data
  }

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview' },
    { id: 'budget' as TabType, label: 'Budget'},
    { id: 'savings' as TabType, label: 'Savings'},
    { id: 'wishlist' as TabType, label: 'Wishlist'}
  ]

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'var(--bg)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '12px',
        padding: '80px 32px 16px 32px',
        overflowX: 'auto',
        alignItems: 'center'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="nav-item"
            style={{
              padding: '8px 16px',
              background: activeTab === tab.id ? 'var(--accent)' : 'var(--bg)',
              color: activeTab === tab.id ? 'white' : 'var(--text-dark)',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: "'LiebeHeide', 'Caveat', cursive",
              whiteSpace: 'nowrap',
              boxShadow: activeTab === tab.id ? '0 2px 8px rgba(255, 150, 196, 0.3)' : '0 2px 6px rgba(0, 0, 0, 0.08)',
              position: 'relative'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '24px 32px'
      }}>
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '32px'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '16px',
                padding: '20px',
                color: 'white'
              }}>
                <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>Net Worth</div>
                <div style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  fontFamily: "'Poppins', sans-serif"
                }}>
                  ${stats.netWorth.toLocaleString()}
                </div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                borderRadius: '16px',
                padding: '20px',
                color: 'white'
              }}>
                <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>This Month</div>
                <div style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  fontFamily: "'Poppins', sans-serif"
                }}>
                  ${stats.totalExpenses.toLocaleString()}
                </div>
                <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '4px' }}>spent</div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                borderRadius: '16px',
                padding: '20px',
                color: 'white'
              }}>
                <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>Total Savings</div>
                <div style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  fontFamily: "'Poppins', sans-serif"
                }}>
                  ${stats.totalSavings.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Quick Overview Sections */}
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: '16px',
                fontFamily: "'LiebeHeide', 'Caveat', cursive"
              }}>
                 Active Goals ({savingsGoals.filter(g => !g.isCompleted).length})
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '16px'
              }}>
                {savingsGoals.filter(g => !g.isCompleted).slice(0, 3).map(goal => (
                  <SavingsGoalCard key={goal.id} goal={goal} />
                ))}
              </div>
            </div>

            {/* Top Wishlist Items */}
            {wishlistItems.filter(w => !w.isPurchased).length > 0 && (
              <div>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  fontFamily: "'LiebeHeide', 'Caveat', cursive"
                }}>
                  Top Wishlist Items
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                  gap: '16px'
                }}>
                  {wishlistItems
                    .filter(w => !w.isPurchased)
                    .slice(0, 4)
                    .map(item => (
                      <WishlistItemCard
                        key={item.id}
                        item={item}
                        onDelete={() => deleteWishlistItem(item.id)}
                        onMarkPurchased={() => markWishlistPurchased(item.id)}
                      />
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Budget Tab */}
        {activeTab === 'budget' && (
          <div>
            <h2 style={{
              fontSize: '28px',
              fontWeight: '600',
              marginBottom: '24px',
              fontFamily: "'LiebeHeide', 'Caveat', cursive"
            }}>
              Monthly Budget
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '16px'
            }}>
              {budgetCategories.map(category => (
                <BudgetCategoryCard key={category.id} category={category} />
              ))}
            </div>

            {budgetCategories.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: 'var(--text-light)'
              }}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>📊</div>
                <p style={{ fontSize: '18px', marginBottom: '8px' }}>No budget categories yet.</p>
                <p style={{ fontSize: '14px', marginBottom: '24px' }}>Add some sample data to get started!</p>
                <button
                  onClick={handleLoadSampleData}
                  style={{
                    padding: '12px 24px',
                    background: 'var(--accent)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontFamily: "'LiebeHeide', 'Caveat', cursive",
                    boxShadow: '0 4px 12px rgba(255, 150, 196, 0.3)'
                  }}
                >
                  Load Sample Data
                </button>
              </div>
            )}
          </div>
        )}

        {/* Savings Tab */}
        {activeTab === 'savings' && (
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '600',
                margin: 0,
                fontFamily: "'LiebeHeide', 'Caveat', cursive"
              }}>
                Savings Goals
              </h2>
              <button style={{
                padding: '10px 20px',
                background: 'var(--accent)',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                + New Goal
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              {savingsGoals.map(goal => (
                <SavingsGoalCard key={goal.id} goal={goal} />
              ))}
            </div>

            {savingsGoals.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: 'var(--text-light)'
              }}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎯</div>
                <p style={{ fontSize: '18px', marginBottom: '8px' }}>No savings goals yet.</p>
                <p style={{ fontSize: '14px', marginBottom: '24px' }}>Create your first goal to start saving!</p>
                <button
                  onClick={handleLoadSampleData}
                  style={{
                    padding: '12px 24px',
                    background: 'var(--accent)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontFamily: "'LiebeHeide', 'Caveat', cursive",
                    boxShadow: '0 4px 12px rgba(255, 150, 196, 0.3)'
                  }}
                >
                  Load Sample Data
                </button>
              </div>
            )}
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === 'wishlist' && (
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '600',
                margin: 0,
                fontFamily: "'LiebeHeide', 'Caveat', cursive"
              }}>
                Wishlist
              </h2>
              <button style={{
                padding: '10px 20px',
                background: 'var(--accent)',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                + Add Item
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '16px'
            }}>
              {wishlistItems.map(item => (
                <WishlistItemCard
                  key={item.id}
                  item={item}
                  onDelete={() => deleteWishlistItem(item.id)}
                  onMarkPurchased={() => markWishlistPurchased(item.id)}
                />
              ))}
            </div>

            {wishlistItems.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: 'var(--text-light)'
              }}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>🛍️</div>
                <p style={{ fontSize: '18px', marginBottom: '8px' }}>Your wishlist is empty.</p>
                <p style={{ fontSize: '14px', marginBottom: '24px' }}>Add items you're dreaming about!</p>
                <button
                  onClick={handleLoadSampleData}
                  style={{
                    padding: '12px 24px',
                    background: 'var(--accent)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontFamily: "'LiebeHeide', 'Caveat', cursive",
                    boxShadow: '0 4px 12px rgba(255, 150, 196, 0.3)'
                  }}
                >
                  Load Sample Data
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

