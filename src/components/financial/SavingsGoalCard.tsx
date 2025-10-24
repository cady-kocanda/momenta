import React from 'react'
import { SavingsGoal } from '../../types/financial'

interface SavingsGoalCardProps {
  goal: SavingsGoal
  onAddProgress?: () => void
}

export default function SavingsGoalCard({ goal, onAddProgress }: SavingsGoalCardProps) {
  const percentage = (goal.currentAmount / goal.targetAmount) * 100
  const remaining = goal.targetAmount - goal.currentAmount

  const getGoalEmoji = () => {
    switch (goal.type) {
      case 'emergency': return '☂️'
      case 'vacation': return '✈️'
      case 'car': return '🚗'
      case 'home': return '🏠'
      case 'education': return '📚'
      case 'purchase': return '🛍️'
      default: return '💰'
    }
  }

  return (
    <div style={{
      background: goal.isCompleted 
        ? 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)'
        : 'var(--card-bg)',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Image Background (if provided) */}
      {goal.imageUrl && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${goal.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1,
          pointerEvents: 'none'
        }} />
      )}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '16px' }}>
          <span style={{ fontSize: '40px', marginRight: '12px' }}>{getGoalEmoji()}</span>
          <div style={{ flex: 1 }}>
            <h3 style={{
              margin: '0 0 4px 0',
              fontSize: '20px',
              fontWeight: '600',
              color: goal.isCompleted ? '#2d7a3e' : 'var(--text-dark)',
              fontFamily: "'LiebeHeide', 'Caveat', cursive"
            }}>
              {goal.name}
            </h3>
            {goal.deadline && (
              <p style={{
                margin: 0,
                fontSize: '13px',
                color: 'var(--text-light)'
              }}>
                Due: {new Date(goal.deadline).toLocaleDateString()}
              </p>
            )}
          </div>
          {goal.isCompleted && (
            <span style={{ fontSize: '24px' }}>🎉</span>
          )}
        </div>

        {/* Progress */}
        <div style={{
          width: '100%',
          height: '12px',
          background: goal.isCompleted ? 'rgba(45, 122, 62, 0.2)' : 'var(--border)',
          borderRadius: '6px',
          overflow: 'hidden',
          marginBottom: '12px'
        }}>
          <div style={{
            width: `${Math.min(percentage, 100)}%`,
            height: '100%',
            background: goal.isCompleted 
              ? '#2d7a3e'
              : 'linear-gradient(90deg, var(--accent), #ff96c4)',
            transition: 'width 0.5s ease'
          }} />
        </div>

        {/* Amounts */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '12px'
        }}>
          <div>
            <span style={{
              fontSize: '24px',
              fontWeight: '700',
              color: goal.isCompleted ? '#2d7a3e' : 'var(--accent)',
              fontFamily: "'Poppins', sans-serif"
            }}>
              ${goal.currentAmount.toLocaleString()}
            </span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontSize: '14px',
              color: 'var(--text-light)',
              marginBottom: '2px'
            }}>
              Target: ${goal.targetAmount.toLocaleString()}
            </div>
            {!goal.isCompleted && (
              <div style={{
                fontSize: '12px',
                color: 'var(--text-light)'
              }}>
                ${remaining.toLocaleString()} to go
              </div>
            )}
          </div>
        </div>

        {/* Percentage Badge */}
        <div style={{
          display: 'inline-block',
          padding: '4px 12px',
          background: goal.isCompleted 
            ? 'rgba(45, 122, 62, 0.2)'
            : 'rgba(255, 150, 196, 0.2)',
          borderRadius: '12px',
          fontSize: '13px',
          fontWeight: '600',
          color: goal.isCompleted ? '#2d7a3e' : 'var(--accent)'
        }}>
          {Math.round(percentage)}% {goal.isCompleted ? 'Complete!' : 'saved'}
        </div>

        {/* Add Progress Button */}
        {!goal.isCompleted && onAddProgress && (
          <button
            onClick={onAddProgress}
            style={{
              marginTop: '12px',
              width: '100%',
              padding: '10px',
              background: 'var(--accent)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background 0.2s',
              fontFamily: "'Poppins', sans-serif"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#ff7aa8'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--accent)'
            }}
          >
            + Add Progress
          </button>
        )}
      </div>
    </div>
  )
}

