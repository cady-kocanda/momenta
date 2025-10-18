import React, { createContext, useContext, useState, ReactNode } from 'react'

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
  dueDate?: string
}

type DailyTask = {
  id: string
  goalId: string
  goalTitle: string
  date: string
  is_completed: boolean
  type: 'daily' | 'weekly' | 'custom'
}

interface GoalsContextType {
  goals: Goal[]
  todoLists: TodoList[]
  dailyTasks: DailyTask[]
  addGoal: (title: string) => void
  updateGoalProgress: (id: string, progress: number) => void
  deleteGoal: (id: string) => void
  addTodoList: (title: string) => void
  addTodoItem: (listId: string, text: string, dueDate?: string) => void
  toggleTodoItem: (listId: string, itemId: string) => void
  deleteTodoItem: (listId: string, itemId: string) => void
  deleteTodoList: (id: string) => void
  getTasksForDate: (date: string) => DailyTask[]
  getTodoTasksForDate: (date: string) => TodoItem[]
  toggleTodoItemById: (itemId: string) => void
  toggleDailyTask: (taskId: string) => void
  addCustomTask: (date: string, title: string) => void
  deleteDailyTask: (taskId: string) => void
}

const GoalsContext = createContext<GoalsContextType | undefined>(undefined)

interface GoalsProviderProps {
  children: ReactNode
}

export function GoalsProvider({ children }: GoalsProviderProps) {
  const [goals, setGoals] = useState<Goal[]>([])
  const [todoLists, setTodoLists] = useState<TodoList[]>([])
  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>([])

  const addGoal = (title: string) => {
    if (!title.trim()) return
    const goal: Goal = {
      id: Date.now().toString(),
      title: title.trim(),
      progress: 0
    }
    setGoals(prev => [goal, ...prev])
    
    // Generate daily tasks for this goal for the next 30 days
    const newTasks: DailyTask[] = []
    const today = new Date()
    for (let i = 0; i < 30; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      const dateString = date.toISOString().split('T')[0]
      
      newTasks.push({
        id: `${goal.id}-${dateString}`,
        goalId: goal.id,
        goalTitle: goal.title,
        date: dateString,
        is_completed: false,
        type: 'daily'
      })
    }
    setDailyTasks(prev => [...prev, ...newTasks])
  }

  const updateGoalProgress = (id: string, progress: number) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, progress } : g))
  }

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id))
    setDailyTasks(prev => prev.filter(task => task.goalId !== id))
  }

  const addTodoList = (title: string) => {
    if (!title.trim()) return
    const list: TodoList = {
      id: Date.now().toString(),
      title: title.trim(),
      items: []
    }
    setTodoLists(prev => [list, ...prev])
  }

  const addTodoItem = (listId: string, text: string, dueDate?: string) => {
    if (!text.trim()) return
    const newItem: TodoItem = {
      id: Date.now().toString(),
      text: text.trim(),
      is_completed: false,
      dueDate
    }
    setTodoLists(prev => prev.map(list => 
      list.id === listId 
        ? { ...list, items: [...list.items, newItem] }
        : list
    ))
  }

  const toggleTodoItem = (listId: string, itemId: string) => {
    setTodoLists(prev => prev.map(list => {
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

  const deleteTodoItem = (listId: string, itemId: string) => {
    setTodoLists(prev => prev.map(list => {
      if (list.id === listId) {
        return { ...list, items: list.items.filter(item => item.id !== itemId) }
      }
      return list
    }))
  }

  const deleteTodoList = (id: string) => {
    setTodoLists(prev => prev.filter(list => list.id !== id))
  }

  const getTasksForDate = (date: string): DailyTask[] => {
    return dailyTasks.filter(task => task.date === date)
  }

  const getTodoTasksForDate = (date: string): TodoItem[] => {
    const tasks: TodoItem[] = []
    todoLists.forEach(list => {
      list.items.forEach(item => {
        if (item.dueDate === date) {
          tasks.push(item)
        }
      })
    })
    return tasks
  }

  const toggleTodoItemById = (itemId: string) => {
    setTodoLists(prev => prev.map(list => {
      const hasItem = list.items.some(item => item.id === itemId)
      if (hasItem) {
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

  const toggleDailyTask = (taskId: string) => {
    setDailyTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, is_completed: !task.is_completed } : task
    ))
  }

  const addCustomTask = (date: string, title: string) => {
    if (!title.trim()) return
    const newTask: DailyTask = {
      id: `custom-${Date.now()}`,
      goalId: 'custom',
      goalTitle: title.trim(),
      date,
      is_completed: false,
      type: 'custom'
    }
    setDailyTasks(prev => [...prev, newTask])
  }

  const deleteDailyTask = (taskId: string) => {
    setDailyTasks(prev => prev.filter(task => task.id !== taskId))
  }

  const value: GoalsContextType = {
    goals,
    todoLists,
    dailyTasks,
    addGoal,
    updateGoalProgress,
    deleteGoal,
    addTodoList,
    addTodoItem,
    toggleTodoItem,
    deleteTodoItem,
    deleteTodoList,
    getTasksForDate,
    getTodoTasksForDate,
    toggleTodoItemById,
    toggleDailyTask,
    addCustomTask,
    deleteDailyTask
  }

  return (
    <GoalsContext.Provider value={value}>
      {children}
    </GoalsContext.Provider>
  )
}

export function useGoals() {
  const context = useContext(GoalsContext)
  if (context === undefined) {
    throw new Error('useGoals must be used within a GoalsProvider')
  }
  return context
}
