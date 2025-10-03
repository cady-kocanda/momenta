import React, { useState } from 'react'

type Props = {
  onBack: () => void
}

type Goal = {
  id: string
  title: string
  progress: number
}

type TodoList = {
  id: string
  title: string
  items: TodoItem[]
}

type TodoItem = {
  id: string
  text: string
  is_completed: boolean
}

export default function GoalsPage({ onBack }: Props) {
  const [goals, setGoals] = useState<Goal[]>([])
  const [todoLists, setTodoLists] = useState<TodoList[]>([])
  const [newGoal, setNewGoal] = useState('')
  const [newListName, setNewListName] = useState('')
  const [newItemText, setNewItemText] = useState<{ [listId: string]: string }>({})

  function addGoal() {
    if (!newGoal.trim()) return
    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal,
      progress: 0
    }
    setGoals([goal, ...goals])
    setNewGoal('')
  }

  function updateGoalProgress(id: string, progress: number) {
    setGoals(goals.map(g => g.id === id ? { ...g, progress } : g))
  }

  function deleteGoal(id: string) {
    setGoals(goals.filter(g => g.id !== id))
  }

  function addTodoList() {
    if (!newListName.trim()) return
    const list: TodoList = {
      id: Date.now().toString(),
      title: newListName,
      items: []
    }
    setTodoLists([list, ...todoLists])
    setNewListName('')
  }

  function addTodoItem(listId: string) {
    const text = newItemText[listId]?.trim()
    if (!text) return

    setTodoLists(todoLists.map(list => {
      if (list.id === listId) {
        const newItem: TodoItem = {
          id: Date.now().toString(),
          text,
          is_completed: false
        }
        return { ...list, items: [...list.items, newItem] }
      }
      return list
    }))
    setNewItemText({ ...newItemText, [listId]: '' })
  }

  function toggleTodoItem(listId: string, itemId: string) {
    setTodoLists(todoLists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          items: list.items.map(item =>
            item.id === itemId ? { ...item, is_completed: !item.is_completed } : item
          )
        }
      }
      return list
    }))
  }

  function deleteTodoItem(listId: string, itemId: string) {
    setTodoLists(todoLists.map(list => {
      if (list.id === listId) {
        return { ...list, items: list.items.filter(item => item.id !== itemId) }
      }
      return list
    }))
  }

  function deleteTodoList(id: string) {
    setTodoLists(todoLists.filter(list => list.id !== id))
  }

  return (
    <div className="goals-page">
      <button className="back-btn" onClick={onBack}>
        <img src="/images/ButtonMenu.png" alt="Back" />
      </button>

      <div className="goals-container">
        <div className="page-header">
          <img src="/images/star.png" alt="Star" className="header-icon" />
          <h1 className="page-title">My Goals & To-Dos</h1>
          <img src="/images/star2.png" alt="Star" className="header-icon" />
        </div>

        <div className="section">
          <div className="section-header">
            <img src="/images/stamp.png" alt="Goals" className="section-icon" />
            <h2>Goals</h2>
          </div>

          <div className="input-group">
            <input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addGoal()}
              placeholder="Enter a new goal..."
              className="goal-input"
            />
            <button onClick={addGoal} className="add-btn">+</button>
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
            <img src="/images/stamp2.png" alt="To-Dos" className="section-icon" />
            <h2>To-Do Lists</h2>
          </div>

          <div className="input-group">
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodoList()}
              placeholder="Create a new list..."
              className="goal-input"
            />
            <button onClick={addTodoList} className="add-btn">+</button>
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
                      <span className={item.is_completed ? 'completed' : ''}>{item.text}</span>
                      <button onClick={() => deleteTodoItem(list.id, item.id)} className="delete-btn-small">×</button>
                    </div>
                  ))}
                </div>

                <div className="add-item-group">
                  <input
                    type="text"
                    value={newItemText[list.id] || ''}
                    onChange={(e) => setNewItemText({ ...newItemText, [list.id]: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && addTodoItem(list.id)}
                    placeholder="Add item..."
                    className="item-input"
                  />
                  <button onClick={() => addTodoItem(list.id)} className="add-btn-small">+</button>
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
