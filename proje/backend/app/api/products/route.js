import { corsHeaders, handleCORS } from "../cors";

export async function OPTIONS(request) {
  return handleCORS(request);
}

export async function GET(request) {
  const origin = request.headers.get("origin");

  const products = [
    { id: 1, name: "Baby Care Product 1", price: 29.99 },
    { id: 2, name: "Baby Care Product 2", price: 39.99 },
    { id: 3, name: "Baby Care Product 3", price: 49.99 },
  ];

  return Response.json(
    { ok: true, data: products },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders(origin),
      },
    }
  );
}
