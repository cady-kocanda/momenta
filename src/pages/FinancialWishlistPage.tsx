import React from 'react'
import { useFinancial } from '../contexts/FinancialContext'
import WishlistItemCard from '../components/financial/WishlistItemCard'
import { initializeSampleData } from '../utils/sampleFinancialData'
import { useNavigation } from '../contexts/NavigationContext'

export default function FinancialWishlistPage() {
  const { wishlistItems, deleteWishlistItem, markWishlistPurchased } = useFinancial()
  const { navigateToFinance } = useNavigation()

  const handleLoadSampleData = () => {
    initializeSampleData()
    window.location.reload()
  }

  return (
    <div style={{ width: '100%', height: '100%', background: 'var(--bg)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '76px 32px 16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          className="nav-item"
          onClick={navigateToFinance}
          style={{ padding: '8px 12px', border: 'none', borderRadius: '8px', background: 'var(--bg)', cursor: 'pointer' }}
        >
          ← Back
        </button>
        <h1 style={{ margin: 0, fontSize: '32px', fontWeight: 700, fontFamily: "'LiebeHeide', 'Caveat', cursive" }}>Wishlist</h1>
        <div />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 32px 24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
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
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-light)' }}>
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
    </div>
  )
}


