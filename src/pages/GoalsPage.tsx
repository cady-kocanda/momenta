import React, { useState } from 'react'
import Menu from '../components/Menu'
import { useGoals } from '../contexts/GoalsContext'

export default function GoalsPage() {
  const { 
    goals, 
    todoLists, 
    addGoal, 
    updateGoalProgress, 
    deleteGoal, 
    addTodoList, 
    addTodoItem, 
    toggleTodoItem, 
    deleteTodoItem, 
    deleteTodoList 
  } = useGoals()
  
  const [newGoal, setNewGoal] = useState('')
  const [newListName, setNewListName] = useState('')
  const [newItemText, setNewItemText] = useState<{ [listId: string]: string }>({})
  const [newItemDueDate, setNewItemDueDate] = useState<{ [listId: string]: string }>({})

  const handleAddGoal = () => {
    addGoal(newGoal)
    setNewGoal('')
  }

  const handleAddTodoList = () => {
    addTodoList(newListName)
    setNewListName('')
  }

  const handleAddTodoItem = (listId: string) => {
    const text = newItemText[listId]?.trim()
    if (text) {
      const dueDate = newItemDueDate[listId] || undefined
      addTodoItem(listId, text, dueDate)
      setNewItemText({ ...newItemText, [listId]: '' })
      setNewItemDueDate({ ...newItemDueDate, [listId]: '' })
    }
  }

  return (
    <div className="goals-page">
      <Menu />
      <div className="goals-container">
        <div className="page-header">
          <img src="/images/star.png" alt="Star" className="header-icon" />
          <h1 className="page-title">My Goals & To-Dos</h1>
          <img src="/images/star2.png" alt="Star" className="header-icon" />
        </div>

        <div className="section">
          <div className="section-header">
            <img src="/images/disco.png" alt="Goals" className="section-icon" />
            <h2>Goals</h2>
          </div>

          <div className="input-group">
            <input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddGoal()}
              placeholder="Enter a new goal..."
              className="goal-input"
            />
            <button onClick={handleAddGoal} className="add-btn">+</button>
          </div>

          <div className="items-list">
            {goals.length === 0 && (
              <div className="empty-state">
                <img src="/images/scrapbookitem.png" alt="Empty" className="empty-img" />
                <p>No goals yet. Create your first one!</p>
              </div>
            )}
            {goals.map(goal => (
              <div key={goal.id} className="goal-card-new">
                <div className="goal-header">
                  <span className="goal-title">{goal.title}</span>
                  <button onClick={() => deleteGoal(goal.id)} className="delete-btn">×</button>
                </div>
                <div className="progress-section">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={goal.progress}
                    onChange={(e) => updateGoalProgress(goal.id, parseInt(e.target.value))}
                    className="progress-slider"
                  />
                  <span className="progress-text">{goal.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <div className="section-header">
            <img src="/images/star.png" alt="To-Dos" className="section-icon" />
            <h2>To-Do Lists</h2>
          </div>

          <div className="input-group">
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTodoList()}
              placeholder="Create a new list..."
              className="goal-input"
            />
            <button onClick={handleAddTodoList} className="add-btn">+</button>
          </div>

          <div className="items-list">
            {todoLists.length === 0 && (
              <div className="empty-state">
                <img src="/images/scrapbookitem2.png" alt="Empty" className="empty-img" />
                <p>No lists yet. Create your first one!</p>
              </div>
            )}

            {todoLists.map(list => (
              <div key={list.id} className="todo-list-card">
                <div className="list-header">
                  <h3 className="list-title">
                    <img src="/images/coffee.png" alt="List" className="group-icon" />
                    {list.title}
                  </h3>
                  <button onClick={() => deleteTodoList(list.id)} className="delete-btn">×</button>
                </div>

                <div className="list-items">
                  {list.items.map(item => (
                    <div key={item.id} className="list-item">
                      <input
                        type="checkbox"
                        checked={item.is_completed}
                        onChange={() => toggleTodoItem(list.id, item.id)}
                        className="checkbox"
                      />
                      <div className="item-content">
                        <span className={item.is_completed ? 'completed' : ''}>{item.text}</span>
                        {item.dueDate && (
                          <span className={`due-date ${item.is_completed ? 'completed' : ''}`}>
                            📅 {new Date(item.dueDate).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                        )}
                      </div>
                      <button onClick={() => deleteTodoItem(list.id, item.id)} className="delete-btn-small">×</button>
                    </div>
                  ))}
                </div>

                <div className="add-item-group">
                  <input
                    type="text"
                    value={newItemText[list.id] || ''}
                    onChange={(e) => setNewItemText({ ...newItemText, [list.id]: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTodoItem(list.id)}
                    placeholder="Add item..."
                    className="item-input"
                  />
                  <input
                    type="date"
                    value={newItemDueDate[list.id] || ''}
                    onChange={(e) => setNewItemDueDate({ ...newItemDueDate, [list.id]: e.target.value })}
                    className="date-input"
                    title="Set due date (optional)"
                  />
                  <button onClick={() => handleAddTodoItem(list.id)} className="add-btn-small">+</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="floating-decorations">
          <img src="/images/stamp.png" alt="Stamp" className="floating-item stamp" />
          <img src="/images/coffee.png" alt="Coffee" className="floating-item coffee" />
          <img src="/images/disco.png" alt="Disco" className="floating-item disco" />
        </div>
      </div>
    </div>
  )
}
