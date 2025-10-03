import React, { useState, useEffect } from 'react'
import { supabase, Goal, Todo } from '../lib/supabase'

type Props = {
  onBack: () => void
}

export default function GoalsPage({ onBack }: Props) {
  const [goals, setGoals] = useState<Goal[]>([])
  const [todos, setTodos] = useState<Todo[]>([])
  const [newGoal, setNewGoal] = useState('')
  const [newTodo, setNewTodo] = useState('')
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    const [goalsRes, todosRes] = await Promise.all([
      supabase.from('goals').select('*').order('created_at', { ascending: false }),
      supabase.from('todos').select('*').order('created_at', { ascending: false })
    ])

    if (goalsRes.data) setGoals(goalsRes.data)
    if (todosRes.data) setTodos(todosRes.data)
    setLoading(false)
  }

  async function addGoal() {
    if (!newGoal.trim()) return
    const { data, error } = await supabase
      .from('goals')
      .insert([{ title: newGoal }])
      .select()

    if (data && data[0]) {
      setGoals([data[0], ...goals])
      setNewGoal('')
    }
  }

  async function addTodo() {
    if (!newTodo.trim()) return
    const { data, error } = await supabase
      .from('todos')
      .insert([{ title: newTodo, goal_id: selectedGoalId }])
      .select()

    if (data && data[0]) {
      setTodos([data[0], ...todos])
      setNewTodo('')
    }
  }

  async function toggleGoal(id: string, isCompleted: boolean) {
    await supabase
      .from('goals')
      .update({ is_completed: !isCompleted })
      .eq('id', id)

    setGoals(goals.map(g => g.id === id ? { ...g, is_completed: !isCompleted } : g))
  }

  async function toggleTodo(id: string, isCompleted: boolean) {
    await supabase
      .from('todos')
      .update({ is_completed: !isCompleted })
      .eq('id', id)

    setTodos(todos.map(t => t.id === id ? { ...t, is_completed: !isCompleted } : t))
  }

  async function deleteGoal(id: string) {
    await supabase.from('goals').delete().eq('id', id)
    setGoals(goals.filter(g => g.id !== id))
    setTodos(todos.filter(t => t.goal_id !== id))
  }

  async function deleteTodo(id: string) {
    await supabase.from('todos').delete().eq('id', id)
    setTodos(todos.filter(t => t.id !== id))
  }

  const standaloneTodos = todos.filter(t => !t.goal_id)

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
            {goals.length === 0 && !loading && (
              <div className="empty-state">
                <img src="/images/scrapbookitem.png" alt="Empty" className="empty-img" />
                <p>No goals yet. Create your first one!</p>
              </div>
            )}
            {goals.map(goal => (
              <div key={goal.id} className="item-card goal-card">
                <div className="item-content">
                  <input
                    type="checkbox"
                    checked={goal.is_completed}
                    onChange={() => toggleGoal(goal.id, goal.is_completed)}
                    className="checkbox"
                  />
                  <span className={goal.is_completed ? 'completed' : ''}>{goal.title}</span>
                </div>
                <button onClick={() => deleteGoal(goal.id)} className="delete-btn">×</button>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <div className="section-header">
            <img src="/images/stamp2.png" alt="To-Dos" className="section-icon" />
            <h2>To-Do List</h2>
          </div>

          <div className="input-group">
            <select
              value={selectedGoalId || ''}
              onChange={(e) => setSelectedGoalId(e.target.value || null)}
              className="goal-select"
            >
              <option value="">Standalone to-do</option>
              {goals.map(g => (
                <option key={g.id} value={g.id}>{g.title}</option>
              ))}
            </select>
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="Enter a new to-do..."
              className="todo-input"
            />
            <button onClick={addTodo} className="add-btn">+</button>
          </div>

          <div className="items-list">
            {standaloneTodos.length === 0 && goals.length === 0 && !loading && (
              <div className="empty-state">
                <img src="/images/scrapbookitem2.png" alt="Empty" className="empty-img" />
                <p>No to-dos yet. Add your first task!</p>
              </div>
            )}

            {standaloneTodos.length > 0 && (
              <div className="todo-group">
                <h3 className="group-title">Standalone</h3>
                {standaloneTodos.map(todo => (
                  <div key={todo.id} className="item-card todo-card">
                    <div className="item-content">
                      <input
                        type="checkbox"
                        checked={todo.is_completed}
                        onChange={() => toggleTodo(todo.id, todo.is_completed)}
                        className="checkbox"
                      />
                      <span className={todo.is_completed ? 'completed' : ''}>{todo.title}</span>
                    </div>
                    <button onClick={() => deleteTodo(todo.id)} className="delete-btn">×</button>
                  </div>
                ))}
              </div>
            )}

            {goals.map(goal => {
              const goalTodos = todos.filter(t => t.goal_id === goal.id)
              if (goalTodos.length === 0) return null

              return (
                <div key={goal.id} className="todo-group">
                  <h3 className="group-title">
                    <img src="/images/coffee.png" alt="Goal" className="group-icon" />
                    {goal.title}
                  </h3>
                  {goalTodos.map(todo => (
                    <div key={todo.id} className="item-card todo-card">
                      <div className="item-content">
                        <input
                          type="checkbox"
                          checked={todo.is_completed}
                          onChange={() => toggleTodo(todo.id, todo.is_completed)}
                          className="checkbox"
                        />
                        <span className={todo.is_completed ? 'completed' : ''}>{todo.title}</span>
                      </div>
                      <button onClick={() => deleteTodo(todo.id)} className="delete-btn">×</button>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>

        <div className="motivational-banner">
          <img src="/images/nevergiveup.jpg" alt="Never give up" className="banner-img" />
        </div>
      </div>
    </div>
  )
}
