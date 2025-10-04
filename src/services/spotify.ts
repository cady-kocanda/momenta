import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface SpotifyConnection {
  id: string
  user_id: string
  spotify_user_id: string
  spotify_display_name: string | null
  connected_at: string
  last_synced_at: string | null
  is_active: boolean
}

export interface SpotifyTopTrack {
  id: string
  connection_id: string
  spotify_track_id: string
  track_name: string
  artist_name: string
  album_name: string | null
  album_image_url: string | null
  preview_url: string | null
  external_url: string
  rank: number
  synced_at: string
}

export async function startSpotifyOAuth(): Promise<string> {
  const apiUrl = `${supabaseUrl}/functions/v1/spotify-oauth?action=start`

  const response = await fetch(apiUrl, {
    headers: {
      'Authorization': `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to start Spotify OAuth')
  }

  const data = await response.json()
  return data.authUrl
}

export async function handleSpotifyCallback(code: string): Promise<void> {
  const apiUrl = `${supabaseUrl}/functions/v1/spotify-oauth?action=callback&code=${code}`

  const response = await fetch(apiUrl, {
    headers: {
      'Authorization': `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to complete Spotify OAuth')
  }
}

export async function syncSpotifyTracks(): Promise<number> {
  const apiUrl = `${supabaseUrl}/functions/v1/spotify-oauth?action=sync-tracks`

  const response = await fetch(apiUrl, {
    headers: {
      'Authorization': `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to sync Spotify tracks')
  }

  const data = await response.json()
  return data.tracksCount
}

export async function getSpotifyConnection(): Promise<SpotifyConnection | null> {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data, error } = await supabase
    .from('spotify_connections')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_active', true)
    .maybeSingle()

  if (error) {
    console.error('Error fetching Spotify connection:', error)
    return null
  }

  return data
}

export async function getSpotifyTopTracks(): Promise<SpotifyTopTrack[]> {
  const connection = await getSpotifyConnection()

  if (!connection) {
    return []
  }

  const { data, error } = await supabase
    .from('spotify_top_tracks')
    .select('*')
    .eq('connection_id', connection.id)
    .order('rank', { ascending: true })

  if (error) {
    console.error('Error fetching Spotify top tracks:', error)
    return []
  }

  return data || []
}
