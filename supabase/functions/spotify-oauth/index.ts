import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.58.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface SpotifyTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

interface SpotifyUserResponse {
  id: string;
  display_name: string;
}

interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string; height: number; width: number }>;
  };
  preview_url: string | null;
  external_urls: { spotify: string };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const url = new URL(req.url);
    const action = url.searchParams.get("action");

    if (action === "start") {
      const clientId = Deno.env.get("SPOTIFY_CLIENT_ID");
      const redirectUri = `${url.origin}/spotify-oauth?action=callback`;
      const scope = "user-top-read";
      const state = crypto.randomUUID();

      const authUrl = new URL("https://accounts.spotify.com/authorize");
      authUrl.searchParams.set("client_id", clientId!);
      authUrl.searchParams.set("response_type", "code");
      authUrl.searchParams.set("redirect_uri", redirectUri);
      authUrl.searchParams.set("scope", scope);
      authUrl.searchParams.set("state", state);

      return new Response(
        JSON.stringify({ authUrl: authUrl.toString(), state }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (action === "callback") {
      const code = url.searchParams.get("code");
      
      if (!code) {
        return new Response(
          JSON.stringify({ error: "No authorization code provided" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const clientId = Deno.env.get("SPOTIFY_CLIENT_ID");
      const clientSecret = Deno.env.get("SPOTIFY_CLIENT_SECRET");
      const redirectUri = `${url.origin}/spotify-oauth?action=callback`;

      const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: redirectUri,
        }),
      });

      if (!tokenResponse.ok) {
        const errorData = await tokenResponse.text();
        return new Response(
          JSON.stringify({ error: "Failed to exchange code for token", details: errorData }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const tokenData: SpotifyTokenResponse = await tokenResponse.json();

      const userResponse = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          "Authorization": `Bearer ${tokenData.access_token}`,
        },
      });

      if (!userResponse.ok) {
        return new Response(
          JSON.stringify({ error: "Failed to fetch Spotify user data" }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const userData: SpotifyUserResponse = await userResponse.json();

      const tokenExpiresAt = new Date(Date.now() + tokenData.expires_in * 1000).toISOString();

      const { error: dbError } = await supabase
        .from("spotify_connections")
        .upsert({
          user_id: user.id,
          spotify_user_id: userData.id,
          access_token: tokenData.access_token,
          refresh_token: tokenData.refresh_token,
          token_expires_at: tokenExpiresAt,
          spotify_display_name: userData.display_name,
          connected_at: new Date().toISOString(),
          is_active: true,
        }, {
          onConflict: "user_id,spotify_user_id",
        });

      if (dbError) {
        return new Response(
          JSON.stringify({ error: "Failed to save connection", details: dbError.message }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      return new Response(
        JSON.stringify({ success: true, displayName: userData.display_name }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (action === "sync-tracks") {
      const { data: connection } = await supabase
        .from("spotify_connections")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_active", true)
        .maybeSingle();

      if (!connection) {
        return new Response(
          JSON.stringify({ error: "No active Spotify connection found" }),
          {
            status: 404,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const tracksResponse = await fetch(
        "https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=medium_term",
        {
          headers: {
            "Authorization": `Bearer ${connection.access_token}`,
          },
        }
      );

      if (!tracksResponse.ok) {
        return new Response(
          JSON.stringify({ error: "Failed to fetch top tracks from Spotify" }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const tracksData = await tracksResponse.json();
      const tracks: SpotifyTrack[] = tracksData.items || [];

      await supabase
        .from("spotify_top_tracks")
        .delete()
        .eq("connection_id", connection.id);

      const trackRecords = tracks.map((track, index) => ({
        connection_id: connection.id,
        spotify_track_id: track.id,
        track_name: track.name,
        artist_name: track.artists.map(a => a.name).join(", "),
        album_name: track.album.name,
        album_image_url: track.album.images[0]?.url || "",
        preview_url: track.preview_url,
        external_url: track.external_urls.spotify,
        rank: index + 1,
        synced_at: new Date().toISOString(),
      }));

      if (trackRecords.length > 0) {
        const { error: tracksError } = await supabase
          .from("spotify_top_tracks")
          .insert(trackRecords);

        if (tracksError) {
          return new Response(
            JSON.stringify({ error: "Failed to save tracks", details: tracksError.message }),
            {
              status: 500,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }
      }

      await supabase
        .from("spotify_connections")
        .update({ last_synced_at: new Date().toISOString() })
        .eq("id", connection.id);

      return new Response(
        JSON.stringify({ success: true, tracksCount: trackRecords.length }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: "Invalid action" }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
