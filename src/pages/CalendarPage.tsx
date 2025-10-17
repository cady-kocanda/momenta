import React, { useState } from 'react'
import Menu from '../components/Menu'
import EventModal from '../components/EventModal'
import { useGoals } from '../contexts/GoalsContext'

interface CalendarEvent {
  id: string
  date: string
  title: string
  color: string
}

export default function CalendarPage() {
  const { getTasksForDate } = useGoals()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [inputDate, setInputDate] = useState('')
  const [showModal, setShowModal] = useState(false)

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sat', 'Su']

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7 // Convert Sunday=0 to Monday=0

    const days = []
    
    // Previous month's trailing days
    const prevMonth = new Date(year, month - 1, 0)
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: prevMonth.getDate() - i,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        hasEvent: false
      })
    }

    // Current month's days
    const today = new Date()
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(year, month, day)
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      const tasksForDay = getTasksForDate(dateString)
      
      days.push({
        date: day,
        isCurrentMonth: true,
        isToday: dayDate.toDateString() === today.toDateString(),
        isSelected: selectedDate?.toDateString() === dayDate.toDateString(),
        hasEvent: tasksForDay.length > 0
      })
    }

    // Next month's leading days
    const remainingDays = 42 - days.length // 6 weeks * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        date: day,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        hasEvent: false
      })
    }

    return days
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const handleDateClick = (day: any) => {
    if (day.isCurrentMonth) {
      const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day.date)
      setSelectedDate(newDate)
      setInputDate(newDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }))
      setShowModal(true)
    }
  }

  const handleQuickSelect = (type: 'today' | 'yesterday' | 'week') => {
    const today = new Date()
    let targetDate = new Date(today)

    switch (type) {
      case 'today':
        targetDate = new Date(today)
        break
      case 'yesterday':
        targetDate = new Date(today)
        targetDate.setDate(today.getDate() - 1)
        break
      case 'week':
        // Start of current week (Monday)
        const dayOfWeek = today.getDay()
        const monday = new Date(today)
        monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))
        targetDate = monday
        break
    }

    setSelectedDate(targetDate)
    setInputDate(targetDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }))
    setShowModal(true)
  }

  const days = getDaysInMonth(currentDate)

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'var(--bg)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <Menu />
      
      {/* Calendar Container */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        background: '#f5f5f5'
      }}>
        <div style={{
          background: 'var(--card-bg)',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          width: '100%',
          maxWidth: '400px'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #ff96c4, #ffb3d1)',
            padding: '20px',
            textAlign: 'center',
            position: 'relative'
          }}>
            {/* Navigation Arrows */}
            <button
              onClick={() => navigateMonth('prev')}
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '20px',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '50%',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none'
              }}
            >
              ‹
            </button>
            
            <button
              onClick={() => navigateMonth('next')}
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '20px',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '50%',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none'
              }}
            >
              ›
            </button>

            {/* Month/Year */}
            <h2 style={{
              margin: '0 0 16px 0',
              color: 'white',
              fontSize: '32px',
              fontWeight: '600',
              fontFamily: "'LiebeHeide', 'Caveat', cursive"
            }}>
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>

            {/* Date Input */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'white',
              borderRadius: '12px',
              padding: '12px 16px',
              margin: '0 auto',
              maxWidth: '200px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <span style={{
                color: '#666',
                marginRight: '8px',
                fontSize: '16px'
              }}>
                
              </span>
              <input
                type="text"
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
                placeholder="Dec 8, 2024"
                style={{
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  color: 'var(--text-dark)',
                  fontSize: '16px',
                  fontFamily: "'Poppins', sans-serif",
                  width: '100%'
                }}
              />
            </div>
          </div>

          {/* Quick Selection Buttons */}
          <div style={{
            padding: '16px 20px',
            display: 'flex',
            gap: '8px',
            justifyContent: 'center'
          }}>
            {['Today', 'Yesterday', 'This week'].map((label, index) => {
              const types = ['today', 'yesterday', 'week'] as const
              return (
                <button
                  key={label}
                  onClick={() => handleQuickSelect(types[index])}
                  style={{
                    padding: '8px 16px',
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
                    e.currentTarget.style.background = 'var(--accent)'
                    e.currentTarget.style.color = 'white'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--border)'
                    e.currentTarget.style.color = 'var(--text-dark)'
                  }}
                >
                  {label}
                </button>
              )
            })}
          </div>

          {/* Calendar Grid */}
          <div style={{ padding: '0 20px 20px' }}>
            {/* Days of Week Header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '4px',
              marginBottom: '8px'
            }}>
              {daysOfWeek.map(day => (
                <div
                  key={day}
                style={{
                  textAlign: 'center',
                  padding: '8px 4px',
                  color: 'var(--text-light)',
                  fontSize: '14px',
                  fontWeight: '500',
                  fontFamily: "'Poppins', sans-serif"
                }}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '4px'
            }}>
              {days.map((day, index) => (
                <button
                  key={index}
                  onClick={() => handleDateClick(day)}
                  style={{
                    aspectRatio: '1',
                    border: 'none',
                    borderRadius: '8px',
                    background: day.isSelected 
                      ? 'var(--accent)' 
                      : day.isToday 
                        ? 'rgba(255, 150, 196, 0.2)' 
                        : 'transparent',
                    color: day.isCurrentMonth 
                      ? (day.isSelected ? 'white' : 'var(--text-dark)')
                      : 'var(--text-light)',
                    fontSize: '14px',
                    fontFamily: "'Poppins', sans-serif",
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => {
                    if (day.isCurrentMonth && !day.isSelected) {
                      e.currentTarget.style.background = 'rgba(255, 150, 196, 0.1)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (day.isCurrentMonth && !day.isSelected) {
                      e.currentTarget.style.background = day.isToday 
                        ? 'rgba(255, 150, 196, 0.2)' 
                        : 'transparent'
                    }
                  }}
                >
                  {day.date}
                  {day.hasEvent && (
                    <div style={{
                      width: '4px',
                      height: '4px',
                      background: 'var(--accent)',
                      borderRadius: '50%',
                      marginTop: '2px'
                    }} />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      <EventModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        selectedDate={selectedDate}
      />
    </div>
  )
}
