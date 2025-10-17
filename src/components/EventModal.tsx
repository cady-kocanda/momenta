import React, { useState } from 'react'
import { useGoals } from '../contexts/GoalsContext'

interface EventModalProps {
  isOpen: boolean
  onClose: () => void
  selectedDate: Date | null
}

type TaskType = 'event' | 'task' | 'out-of-office'

export default function EventModal({ isOpen, onClose, selectedDate }: EventModalProps) {
  const { getTasksForDate, toggleDailyTask, addCustomTask, deleteDailyTask } = useGoals()
  const [selectedType, setSelectedType] = useState<TaskType>('task')
  const [newTaskTitle, setNewTaskTitle] = useState('')

  if (!isOpen || !selectedDate) return null

  const dateString = selectedDate.toISOString().split('T')[0]
  const tasks = getTasksForDate(dateString)
  const formattedDate = selectedDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addCustomTask(dateString, newTaskTitle)
      setNewTaskTitle('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask()
    }
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        background: 'var(--card-bg)',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
        width: '100%',
        maxWidth: '500px',
        maxHeight: '80vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: '24px 24px 16px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '20px',
            fontWeight: '600',
            color: 'var(--text-dark)',
            fontFamily: "'LiebeHeide', 'Caveat', cursive"
          }}>
            {formattedDate}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              color: 'var(--text-light)',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--border)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none'
            }}
          >
            ×
          </button>
        </div>

        {/* Task Type Selector */}
        <div style={{
          padding: '16px 24px',
          display: 'flex',
          gap: '8px'
        }}>
          {(['event', 'task'] as TaskType[]).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: 'none',
                background: selectedType === type ? 'var(--accent)' : 'var(--border)',
                color: selectedType === type ? 'white' : 'var(--text-dark)',
                fontSize: '14px',
                fontFamily: "'Great Vibes', cursive",
                cursor: 'pointer',
                transition: 'all 0.2s',
                textTransform: 'capitalize'
              }}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Tasks List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0 24px'
        }}>
          {tasks.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: 'var(--text-light)'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '16px'
              }}>📅</div>
              <p style={{
                margin: 0,
                fontFamily: "'Poppins', sans-serif",
                fontSize: '16px'
              }}>
                No tasks for this day
              </p>
            </div>
          ) : (
            <div style={{ paddingBottom: '16px' }}>
              {tasks.map((task) => (
                <div
                  key={task.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 0',
                    borderBottom: '1px solid var(--border)'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={task.is_completed}
                    onChange={() => toggleDailyTask(task.id)}
                    style={{
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer',
                      accentColor: 'var(--accent)'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <span style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '16px',
                      color: task.is_completed ? 'var(--text-light)' : 'var(--text-dark)',
                      textDecoration: task.is_completed ? 'line-through' : 'none'
                    }}>
                      {task.goalTitle}
                    </span>
                    {task.type === 'custom' && (
                      <div style={{
                        fontSize: '12px',
                        color: 'var(--text-light)',
                        marginTop: '2px'
                      }}>
                        Custom task
                      </div>
                    )}
                  </div>
                  {task.type === 'custom' && (
                    <button
                      onClick={() => deleteDailyTask(task.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ff6b9d',
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 107, 157, 0.1)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'none'
                      }}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Task Input */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          gap: '8px'
        }}>
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a custom task..."
            style={{
              flex: 1,
              padding: '12px 16px',
              border: '2px solid var(--border)',
              borderRadius: '12px',
              fontSize: '16px',
              fontFamily: "'Poppins', sans-serif",
              background: 'var(--card-bg)',
              color: 'var(--text-dark)',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--accent)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border)'
            }}
          />
          <button
            onClick={handleAddTask}
            style={{
              padding: '12px 20px',
              background: 'var(--accent)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '16px',
              fontFamily: "'Poppins', sans-serif",
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#ff7fb3'
              e.currentTarget.style.transform = 'scale(1.02)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--accent)'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            <span>📝</span>
            Add
          </button>
        </div>

        {/* Footer Actions */}
        <div style={{
          padding: '16px 24px 24px',
          display: 'flex',
          gap: '12px',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              background: 'var(--border)',
              border: 'none',
              borderRadius: '20px',
              color: 'var(--text-dark)',
              fontSize: '14px',
              fontFamily: "'Poppins', sans-serif",
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#e0e0e0'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--border)'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
