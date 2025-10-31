import React from 'react'
import { useFinancial } from '../contexts/FinancialContext'
import { initializeSampleData } from '../utils/sampleFinancialData'
import { useNavigation } from '../contexts/NavigationContext'

 

export default function FinancialPage() {
  const {
    budgetCategories,
    savingsGoals,
    wishlistItems,
    getFinancialStats,
    deleteWishlistItem,
    markWishlistPurchased
  } = useFinancial()

  const { navigateToFinanceOverview, navigateToFinanceSavings, navigateToFinanceBudget, navigateToFinanceWishlist } = useNavigation()
  const stats = getFinancialStats()

  const handleLoadSampleData = () => {
    initializeSampleData()
    window.location.reload() // Reload to fetch the new data
  }

  // hub-only – no scroll sections

  const formatMoneyShort = (amount: number) => {
    if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}m`
    if (amount >= 1_000) return `$${(amount / 1_000).toFixed(1)}k`
    return `$${Math.round(amount).toLocaleString()}`
  }

  const activeGoalsCount = savingsGoals.filter(g => !g.isCompleted).length
  const budgetCount = budgetCategories.length
  const wishlistCount = wishlistItems.length

  

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'var(--bg)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>

      {/* Title Row */}
      <div style={{
        padding: '72px 32px 4px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div />
        <h1 style={{
          margin: 0,
          fontSize: '36px',
          fontWeight: 700,
          color: 'var(--text-dark)',
          fontFamily: "'LiebeHeide', 'Caveat', cursive",
          letterSpacing: '0.5px'
        }}>
          Financial Tracker
        </h1>
      </div>
            <br>
            </br>
      {/* Tile Navigation (no second navbar) */}
      <div style={{ padding: '12px 16px 8px 16px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: "repeat(2, min(28vmin, 180px))",
          gridTemplateRows: "repeat(2, min(28vmin, 180px))",
          gap: '10px',
          justifyContent: 'center',
          alignContent: 'start'
        }}>
          <button
            onClick={navigateToFinanceOverview}
            style={{
              position: 'relative',
              textAlign: 'left',
              padding: '18px 16px 16px 16px',
              backgroundImage: "url('/images/image1.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: 'var(--text-dark)',
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 6px 0 rgba(0,0,0,0.08), 0 12px 16px rgba(0,0,0,0.06)',
              letterSpacing: '0.3px',
              width: '100%',
              height: '100%',
              opacity: 0.8
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.8' }}
          >
            <div style={{
              fontSize: '26px',
              marginBottom: '6px',
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(2px)',
              borderRadius: '10px',
              padding: '6px 10px',
              display: 'inline-block',
              boxShadow: '0 2px 6px rgba(0,0,0,0.12)'
            }}>Overview</div>
            <div style={{
              fontSize: '14px',
              opacity: 0.9,
              background: 'rgba(255,255,255,0.8)',
              borderRadius: '8px',
              padding: '4px 8px',
              display: 'inline-block',
              boxShadow: '0 2px 6px rgba(0,0,0,0.12)'
            }}>{activeGoalsCount} goals</div>
          </button>
          <button
            onClick={navigateToFinanceBudget}
            style={{
              position: 'relative',
              textAlign: 'left',
              padding: '18px 16px 16px 16px',
              backgroundImage: "url('/images/image2.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: 'var(--text-dark)',
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 6px 0 rgba(0,0,0,0.08), 0 12px 16px rgba(0,0,0,0.06)',
              letterSpacing: '0.3px',
              width: '100%',
              height: '100%',
              opacity: 0.8
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.9' }}
          >
            <div style={{
              fontSize: '26px',
              marginBottom: '6px',
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(2px)',
              borderRadius: '10px',
              padding: '6px 10px',
              display: 'inline-block',
              boxShadow: '0 2px 6px rgba(0,0,0,0.12)'
            }}>Budget</div>
            <div style={{
              fontSize: '14px',
              opacity: 0.9,
              background: 'rgba(255,255,255,0.8)',
              borderRadius: '8px',
              padding: '4px 8px',
              display: 'inline-block',
              boxShadow: '0 2px 6px rgba(0,0,0,0.12)'
            }}>{budgetCount} cats</div>
          </button>
          <button
            onClick={navigateToFinanceSavings}
            style={{
              position: 'relative',
              textAlign: 'left',
              padding: '18px 16px 16px 16px',
              backgroundImage: "url('/images/image3.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: 'var(--text-dark)',
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 6px 0 rgba(0,0,0,0.08), 0 12px 16px rgba(0,0,0,0.06)',
              letterSpacing: '0.3px',
              width: '100%',
              height: '100%',
              opacity: 0.8
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.8' }}
          >
            <div style={{
              fontSize: '26px',
              marginBottom: '6px',
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(2px)',
              borderRadius: '10px',
              padding: '6px 10px',
              display: 'inline-block',
              boxShadow: '0 2px 6px rgba(0,0,0,0.12)'
            }}>Savings</div>
            <div style={{
              fontSize: '14px',
              opacity: 0.9,
              background: 'rgba(255,255,255,0.8)',
              borderRadius: '8px',
              padding: '4px 8px',
              display: 'inline-block',
              boxShadow: '0 2px 6px rgba(0,0,0,0.12)'
            }}>{formatMoneyShort(stats.totalSavings)}</div>
          </button>
          <button
            onClick={navigateToFinanceWishlist}
            style={{
              position: 'relative',
              textAlign: 'left',
              padding: '18px 16px 16px 16px',
              backgroundImage: "url('/images/image4.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: 'var(--text-dark)',
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 6px 0 rgba(0,0,0,0.08), 0 12px 16px rgba(0,0,0,0.06)',
              letterSpacing: '0.3px',
              width: '100%',
              height: '100%',
              opacity: 0.8
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.8' }}
          >
            <div style={{
              fontSize: '26px',
              marginBottom: '6px',
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(2px)',
              borderRadius: '10px',
              padding: '6px 10px',
              display: 'inline-block',
              boxShadow: '0 2px 6px rgba(0,0,0,0.12)'
            }}>Wishlist</div>
            <div style={{
              fontSize: '14px',
              opacity: 0.9,
              background: 'rgba(255,255,255,0.8)',
              borderRadius: '8px',
              padding: '4px 8px',
              display: 'inline-block',
              boxShadow: '0 2px 6px rgba(0,0,0,0.12)'
            }}>{wishlistCount} items</div>
          </button>
        </div>
      </div>

      {/* Hub-only; no content sections */}
      <div />
    </div>
  )
}