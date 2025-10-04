/*
  # Spotify Integration Schema

  1. New Tables
    - `spotify_connections`
      - `id` (uuid, primary key) - Unique identifier for the connection
      - `user_id` (uuid, foreign key) - Reference to auth.users
      - `spotify_user_id` (text) - Spotify user ID
      - `access_token` (text) - OAuth access token
      - `refresh_token` (text) - OAuth refresh token
      - `token_expires_at` (timestamptz) - When the access token expires
      - `spotify_display_name` (text) - Spotify display name
      - `connected_at` (timestamptz) - When the connection was established
      - `last_synced_at` (timestamptz) - Last time tracks were synced
      - `is_active` (boolean) - Whether the connection is active
    
    - `spotify_top_tracks`
      - `id` (uuid, primary key) - Unique identifier
      - `connection_id` (uuid, foreign key) - Reference to spotify_connections
      - `spotify_track_id` (text) - Spotify track ID
      - `track_name` (text) - Track name
      - `artist_name` (text) - Artist name
      - `album_name` (text) - Album name
      - `album_image_url` (text) - Album cover image URL
      - `preview_url` (text) - 30-second preview URL
      - `external_url` (text) - Spotify URL to the track
      - `rank` (integer) - Ranking position (1-5)
      - `synced_at` (timestamptz) - When this track was synced

  2. Security
    - Enable RLS on both tables
    - Users can only access their own Spotify connections
    - Users can only access tracks from their own connections
*/

CREATE TABLE IF NOT EXISTS spotify_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  spotify_user_id text NOT NULL,
  access_token text NOT NULL,
  refresh_token text NOT NULL,
  token_expires_at timestamptz NOT NULL,
  spotify_display_name text,
  connected_at timestamptz DEFAULT now(),
  last_synced_at timestamptz,
  is_active boolean DEFAULT true,
  UNIQUE(user_id, spotify_user_id)
);

CREATE TABLE IF NOT EXISTS spotify_top_tracks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  connection_id uuid NOT NULL REFERENCES spotify_connections(id) ON DELETE CASCADE,
  spotify_track_id text NOT NULL,
  track_name text NOT NULL,
  artist_name text NOT NULL,
  album_name text,
  album_image_url text,
  preview_url text,
  external_url text NOT NULL,
  rank integer NOT NULL,
  synced_at timestamptz DEFAULT now(),
  UNIQUE(connection_id, rank)
);

ALTER TABLE spotify_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE spotify_top_tracks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own Spotify connections"
  ON spotify_connections FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own Spotify connections"
  ON spotify_connections FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own Spotify connections"
  ON spotify_connections FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own Spotify connections"
  ON spotify_connections FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view tracks from own connections"
  ON spotify_top_tracks FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM spotify_connections
      WHERE spotify_connections.id = spotify_top_tracks.connection_id
      AND spotify_connections.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert tracks for own connections"
  ON spotify_top_tracks FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM spotify_connections
      WHERE spotify_connections.id = spotify_top_tracks.connection_id
      AND spotify_connections.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update tracks from own connections"
  ON spotify_top_tracks FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM spotify_connections
      WHERE spotify_connections.id = spotify_top_tracks.connection_id
      AND spotify_connections.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM spotify_connections
      WHERE spotify_connections.id = spotify_top_tracks.connection_id
      AND spotify_connections.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete tracks from own connections"
  ON spotify_top_tracks FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM spotify_connections
      WHERE spotify_connections.id = spotify_top_tracks.connection_id
      AND spotify_connections.user_id = auth.uid()
    )
  );

CREATE INDEX IF NOT EXISTS idx_spotify_connections_user_id ON spotify_connections(user_id);
CREATE INDEX IF NOT EXISTS idx_spotify_top_tracks_connection_id ON spotify_top_tracks(connection_id);
CREATE INDEX IF NOT EXISTS idx_spotify_top_tracks_rank ON spotify_top_tracks(rank);
