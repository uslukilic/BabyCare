import { corsHeaders, handleCORS } from "../cors";

const ADMIN_EMAIL = "admin@site.com";
const ADMIN_PASSWORD = "Admin123!";

export async function OPTIONS(request) {
  return handleCORS(request);
}

export async function POST(request) {
  const origin = request.headers.get("origin");

  try {
    const { email, password } = await request.json();

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const response = new Response(
        JSON.stringify({
          ok: true,
          message: "Login successful",
          token: "demo-jwt-token",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders(origin),
          },
        }
      );

      response.headers.set(
        "Set-Cookie",
        "token=demo-jwt; Path=/; HttpOnly; Secure; SameSite=None"
      );

      return response;
    }

    return new Response(
      JSON.stringify({ ok: false, message: "Invalid credentials" }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders(origin),
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ ok: false, message: error.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders(origin),
        },
      }
    );
  }
}
