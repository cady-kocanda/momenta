import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface PinterestConnection {
  id: string
  user_id: string
  pinterest_user_id: string
  pinterest_username: string
  connected_at: string
  last_synced_at: string | null
  is_active: boolean
}

export interface PinterestPin {
  id: string
  connection_id: string
  pinterest_pin_id: string
  image_url: string
  title: string | null
  description: string | null
  board_name: string | null
  synced_at: string
}

export async function startPinterestOAuth(): Promise<string> {
  const apiUrl = `${supabaseUrl}/functions/v1/pinterest-oauth?action=start`

  const response = await fetch(apiUrl, {
    headers: {
      'Authorization': `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to start Pinterest OAuth')
  }

  const data = await response.json()
  return data.authUrl
}

export async function handlePinterestCallback(code: string): Promise<void> {
  const apiUrl = `${supabaseUrl}/functions/v1/pinterest-oauth?action=callback&code=${code}`

  const response = await fetch(apiUrl, {
    headers: {
      'Authorization': `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to complete Pinterest OAuth')
  }
}

export async function syncPinterestPins(): Promise<number> {
  const apiUrl = `${supabaseUrl}/functions/v1/pinterest-oauth?action=sync-pins`

  const response = await fetch(apiUrl, {
    headers: {
      'Authorization': `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to sync Pinterest pins')
  }

  const data = await response.json()
  return data.pinsCount
}

export async function getPinterestConnection(): Promise<PinterestConnection | null> {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data, error } = await supabase
    .from('pinterest_connections')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_active', true)
    .maybeSingle()

  if (error) {
    console.error('Error fetching Pinterest connection:', error)
    return null
  }

  return data
}

export async function getPinterestPins(): Promise<PinterestPin[]> {
  const connection = await getPinterestConnection()

  if (!connection) {
    return []
  }

  const { data, error } = await supabase
    .from('pinterest_pins')
    .select('*')
    .eq('connection_id', connection.id)
    .order('synced_at', { ascending: false })
    .limit(50)

  if (error) {
    console.error('Error fetching Pinterest pins:', error)
    return []
  }

  return data || []
}
