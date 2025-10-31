import React from 'react'
import { WishlistItem } from '../../types/financial'

interface WishlistItemCardProps {
  item: WishlistItem
  onDelete?: () => void
  onMarkPurchased?: () => void
}

export default function WishlistItemCard({ item, onDelete, onMarkPurchased }: WishlistItemCardProps) {
  const percentage = (item.savedTowards / item.price) * 100
  const remaining = item.price - item.savedTowards

  const getPriorityColor = () => {
    switch (item.priority) {
      case 'need': return '#ff6b6b'
      case 'want': return '#ffd93d'
      case 'dream': return '#c77dff'
      default: return 'var(--accent)'
    }
  }

  const getPriorityLabel = () => {
    switch (item.priority) {
      case 'need': return 'Need'
      case 'want': return 'Want'
      case 'dream': return 'Dream'
    }
  }

  return (
    <div style={{
      background: item.isPurchased ? 'rgba(150, 230, 161, 0.2)' : 'var(--card-bg)',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      transition: 'transform 0.2s',
      opacity: item.isPurchased ? 0.7 : 1
    }}>
      {/* Image */}
      {item.imageUrl && (
        <div style={{
          width: '100%',
          height: '180px',
          backgroundImage: `url(${item.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}>
          {item.isPurchased && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(45, 122, 62, 0.95)',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '24px',
              fontSize: '18px',
              fontWeight: '700',
              fontFamily: "'LiebeHeide', 'Caveat', cursive"
            }}>
              Purchased! 🎉
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div style={{ padding: '16px' }}>
        {/* Priority Badge */}
        <div style={{
          display: 'inline-block',
          padding: '4px 10px',
          background: getPriorityColor(),
          color: 'white',
          borderRadius: '12px',
          fontSize: '11px',
          fontWeight: '700',
          marginBottom: '8px',
          textTransform: 'uppercase'
        }}>
          {getPriorityLabel()}
        </div>

        {/* Name */}
        <h3 style={{
          margin: '0 0 8px 0',
          fontSize: '18px',
          fontWeight: '600',
          color: 'var(--text-dark)',
          fontFamily: "'LiebeHeide', 'Caveat', cursive",
          textDecoration: item.isPurchased ? 'line-through' : 'none'
        }}>
          {item.name}
        </h3>

        {/* Price */}
        <div style={{
          fontSize: '24px',
          fontWeight: '700',
          color: 'var(--accent)',
          marginBottom: '12px',
          fontFamily: "'Poppins', sans-serif"
        }}>
          ${item.price.toFixed(2)}
        </div>

        {/* Savings Progress */}
        {!item.isPurchased && item.savedTowards > 0 && (
          <>
            <div style={{
              width: '100%',
              height: '6px',
              background: 'var(--border)',
              borderRadius: '3px',
              overflow: 'hidden',
              marginBottom: '8px'
            }}>
              <div style={{
                width: `${Math.min(percentage, 100)}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #96e6a1, #2d7a3e)',
                transition: 'width 0.3s ease'
              }} />
            </div>
            <div style={{
              fontSize: '13px',
              color: 'var(--text-light)',
              marginBottom: '8px'
            }}>
              ${item.savedTowards.toFixed(2)} saved • ${remaining.toFixed(2)} to go
            </div>
          </>
        )}

        {/* Notes */}
        {item.notes && (
          <p style={{
            fontSize: '13px',
            color: 'var(--text-light)',
            margin: '8px 0',
            fontStyle: 'italic'
          }}>
            "{item.notes}"
          </p>
        )}

        {/* Actions */}
        {!item.isPurchased && (
          <div style={{
            display: 'flex',
            gap: '8px',
            marginTop: '12px'
          }}>
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  padding: '8px',
                  background: 'var(--accent)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '600',
                  textAlign: 'center',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              >
                View Item
              </a>
            )}
            {onMarkPurchased && (
              <button
                onClick={onMarkPurchased}
                style={{
                  flex: 1,
                  padding: '8px',
                  background: '#2d7a3e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              >
                Mark Purchased
              </button>
            )}
          </div>
        )}

        {/* Delete button */}
        {onDelete && (
          <button
            onClick={onDelete}
            style={{
              width: '100%',
              marginTop: '8px',
              padding: '6px',
              background: 'transparent',
              color: '#ff6b6b',
              border: '1px solid #ff6b6b',
              borderRadius: '6px',
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#ff6b6b'
              e.currentTarget.style.color = 'white'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#ff6b6b'
            }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  )
}

