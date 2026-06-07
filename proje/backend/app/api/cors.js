const allowedOrigin = "https://lightblue-horse-121787.hostingersite.com";

export function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin === allowedOrigin ? origin : "",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  };
}

export async function handleCORS(request) {
  if (request.method === "OPTIONS") {
    const origin = request.headers.get("origin");
    return new Response(null, {
      status: 204,
      headers: corsHeaders(origin),
    });
  }
}
