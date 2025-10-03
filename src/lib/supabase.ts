import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Goal = {
  id: string
  title: string
  description: string | null
  is_completed: boolean
  created_at: string
  updated_at: string
}

export type Todo = {
  id: string
  goal_id: string | null
  title: string
  is_completed: boolean
  created_at: string
  updated_at: string
}
