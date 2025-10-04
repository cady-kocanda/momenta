import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.58.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface PinterestTokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
}

interface PinterestUserResponse {
  id: string;
  username: string;
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
      const clientId = Deno.env.get("PINTEREST_APP_ID");
      const redirectUri = `${url.origin}/pinterest-oauth?action=callback`;
      const scope = "boards:read,pins:read";
      const state = crypto.randomUUID();

      const authUrl = `https://www.pinterest.com/oauth/?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}&state=${state}`;

      return new Response(
        JSON.stringify({ authUrl, state }),
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

      const clientId = Deno.env.get("PINTEREST_APP_ID");
      const clientSecret = Deno.env.get("PINTEREST_APP_SECRET");
      const redirectUri = `${url.origin}/pinterest-oauth?action=callback`;

      const tokenResponse = await fetch("https://api.pinterest.com/v5/oauth/token", {
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

      const tokenData: PinterestTokenResponse = await tokenResponse.json();

      const userResponse = await fetch("https://api.pinterest.com/v5/user_account", {
        headers: {
          "Authorization": `Bearer ${tokenData.access_token}`,
        },
      });

      if (!userResponse.ok) {
        return new Response(
          JSON.stringify({ error: "Failed to fetch Pinterest user data" }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const userData: PinterestUserResponse = await userResponse.json();

      const tokenExpiresAt = tokenData.expires_in
        ? new Date(Date.now() + tokenData.expires_in * 1000).toISOString()
        : null;

      const { error: dbError } = await supabase
        .from("pinterest_connections")
        .upsert({
          user_id: user.id,
          pinterest_user_id: userData.id,
          access_token: tokenData.access_token,
          refresh_token: tokenData.refresh_token || null,
          token_expires_at: tokenExpiresAt,
          pinterest_username: userData.username,
          connected_at: new Date().toISOString(),
          is_active: true,
        }, {
          onConflict: "user_id,pinterest_user_id",
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
        JSON.stringify({ success: true, username: userData.username }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (action === "sync-pins") {
      const { data: connection } = await supabase
        .from("pinterest_connections")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_active", true)
        .maybeSingle();

      if (!connection) {
        return new Response(
          JSON.stringify({ error: "No active Pinterest connection found" }),
          {
            status: 404,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const pinsResponse = await fetch("https://api.pinterest.com/v5/pins?page_size=25", {
        headers: {
          "Authorization": `Bearer ${connection.access_token}`,
        },
      });

      if (!pinsResponse.ok) {
        return new Response(
          JSON.stringify({ error: "Failed to fetch pins from Pinterest" }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const pinsData = await pinsResponse.json();
      const pins = pinsData.items || [];

      const pinRecords = pins.map((pin: any) => ({
        connection_id: connection.id,
        pinterest_pin_id: pin.id,
        image_url: pin.media?.images?.['400x300']?.url || pin.media?.images?.original?.url || "",
        title: pin.title || "",
        description: pin.description || "",
        board_name: pin.board_id || "",
        synced_at: new Date().toISOString(),
      }));

      if (pinRecords.length > 0) {
        const { error: pinsError } = await supabase
          .from("pinterest_pins")
          .upsert(pinRecords, {
            onConflict: "connection_id,pinterest_pin_id",
          });

        if (pinsError) {
          return new Response(
            JSON.stringify({ error: "Failed to save pins", details: pinsError.message }),
            {
              status: 500,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }
      }

      await supabase
        .from("pinterest_connections")
        .update({ last_synced_at: new Date().toISOString() })
        .eq("id", connection.id);

      return new Response(
        JSON.stringify({ success: true, pinsCount: pinRecords.length }),
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
