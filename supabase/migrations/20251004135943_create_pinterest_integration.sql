/*
  # Pinterest Integration Schema

  1. New Tables
    - `pinterest_connections`
      - `id` (uuid, primary key) - Unique identifier for the connection
      - `user_id` (uuid, foreign key) - Reference to auth.users
      - `pinterest_user_id` (text) - Pinterest user ID
      - `access_token` (text) - Encrypted OAuth access token
      - `refresh_token` (text) - Encrypted OAuth refresh token
      - `token_expires_at` (timestamptz) - When the access token expires
      - `pinterest_username` (text) - Pinterest username
      - `connected_at` (timestamptz) - When the connection was established
      - `last_synced_at` (timestamptz) - Last time pins were synced
      - `is_active` (boolean) - Whether the connection is active
    
    - `pinterest_pins`
      - `id` (uuid, primary key) - Unique identifier
      - `connection_id` (uuid, foreign key) - Reference to pinterest_connections
      - `pinterest_pin_id` (text) - Pinterest pin ID
      - `image_url` (text) - URL to the pin image
      - `title` (text) - Pin title
      - `description` (text) - Pin description
      - `board_name` (text) - Name of the board
      - `created_at` (timestamptz) - When the pin was created
      - `synced_at` (timestamptz) - When we last synced this pin

  2. Security
    - Enable RLS on both tables
    - Users can only access their own Pinterest connections
    - Users can only access pins from their own connections
*/

CREATE TABLE IF NOT EXISTS pinterest_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  pinterest_user_id text NOT NULL,
  access_token text NOT NULL,
  refresh_token text,
  token_expires_at timestamptz,
  pinterest_username text,
  connected_at timestamptz DEFAULT now(),
  last_synced_at timestamptz,
  is_active boolean DEFAULT true,
  UNIQUE(user_id, pinterest_user_id)
);

CREATE TABLE IF NOT EXISTS pinterest_pins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  connection_id uuid NOT NULL REFERENCES pinterest_connections(id) ON DELETE CASCADE,
  pinterest_pin_id text NOT NULL,
  image_url text NOT NULL,
  title text,
  description text,
  board_name text,
  created_at timestamptz DEFAULT now(),
  synced_at timestamptz DEFAULT now(),
  UNIQUE(connection_id, pinterest_pin_id)
);

ALTER TABLE pinterest_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE pinterest_pins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own Pinterest connections"
  ON pinterest_connections FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own Pinterest connections"
  ON pinterest_connections FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own Pinterest connections"
  ON pinterest_connections FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own Pinterest connections"
  ON pinterest_connections FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view pins from own connections"
  ON pinterest_pins FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM pinterest_connections
      WHERE pinterest_connections.id = pinterest_pins.connection_id
      AND pinterest_connections.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert pins for own connections"
  ON pinterest_pins FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM pinterest_connections
      WHERE pinterest_connections.id = pinterest_pins.connection_id
      AND pinterest_connections.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update pins from own connections"
  ON pinterest_pins FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM pinterest_connections
      WHERE pinterest_connections.id = pinterest_pins.connection_id
      AND pinterest_connections.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM pinterest_connections
      WHERE pinterest_connections.id = pinterest_pins.connection_id
      AND pinterest_connections.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete pins from own connections"
  ON pinterest_pins FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM pinterest_connections
      WHERE pinterest_connections.id = pinterest_pins.connection_id
      AND pinterest_connections.user_id = auth.uid()
    )
  );

CREATE INDEX IF NOT EXISTS idx_pinterest_connections_user_id ON pinterest_connections(user_id);
CREATE INDEX IF NOT EXISTS idx_pinterest_pins_connection_id ON pinterest_pins(connection_id);
CREATE INDEX IF NOT EXISTS idx_pinterest_pins_synced_at ON pinterest_pins(synced_at);
