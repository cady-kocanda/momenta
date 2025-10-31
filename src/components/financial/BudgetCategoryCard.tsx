import React from 'react'
import { BudgetCategory } from '../../types/financial'

interface BudgetCategoryCardProps {
  category: BudgetCategory
  onUpdateBudget?: (newAmount: number) => void
}

export default function BudgetCategoryCard({ category, onUpdateBudget }: BudgetCategoryCardProps) {
  const percentage = category.budgetAmount > 0 ? (category.spent / category.budgetAmount) * 100 : 0
  const isOverBudget = percentage > 100
  const isWarning = percentage > 80 && percentage <= 100

  const getProgressColor = () => {
    if (isOverBudget) return '#ff6b6b'
    if (isWarning) return '#ffd93d'
    return 'var(--accent)'
  }

  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: '12px',
      padding: '16px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)'
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)'
    }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
        <span style={{ fontSize: '28px', marginRight: '12px' }}>{category.icon}</span>
        <div style={{ flex: 1 }}>
          <h3 style={{
            margin: 0,
            fontSize: '16px',
            fontWeight: '600',
            color: 'var(--text-dark)',
            fontFamily: "'LiebeHeide', 'Caveat', cursive"
          }}>
            {category.name}
          </h3>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{
        width: '100%',
        height: '8px',
        background: 'var(--border)',
        borderRadius: '4px',
        overflow: 'hidden',
        marginBottom: '8px'
      }}>
        <div style={{
          width: `${Math.min(percentage, 100)}%`,
          height: '100%',
          background: getProgressColor(),
          transition: 'width 0.3s ease'
        }} />
      </div>

      {/* Amounts */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '14px'
      }}>
        <span style={{ color: 'var(--text-dark)', fontWeight: '600' }}>
          ${category.spent.toFixed(2)}
        </span>
        <span style={{ color: 'var(--text-light)' }}>
          of ${category.budgetAmount.toFixed(2)}
        </span>
      </div>

      {/* Status */}
      {isOverBudget && (
        <div style={{
          marginTop: '8px',
          padding: '6px 12px',
          background: 'rgba(255, 107, 107, 0.1)',
          borderRadius: '6px',
          fontSize: '12px',
          color: '#ff6b6b',
          textAlign: 'center'
        }}>
          ${(category.spent - category.budgetAmount).toFixed(2)} over budget
        </div>
      )}
      {isWarning && !isOverBudget && (
        <div style={{
          marginTop: '8px',
          padding: '6px 12px',
          background: 'rgba(255, 217, 61, 0.1)',
          borderRadius: '6px',
          fontSize: '12px',
          color: '#f5a623',
          textAlign: 'center'
        }}>
          {Math.round(100 - percentage)}% remaining
        </div>
      )}
    </div>
  )
}

