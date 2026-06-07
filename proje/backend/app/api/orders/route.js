import { corsHeaders, handleCORS } from "../cors";

export async function OPTIONS(request) {
  return handleCORS(request);
}

export async function GET(request) {
  const origin = request.headers.get("origin");

  const orders = [
    { id: 1, product: "Baby Care Product 1", status: "Delivered", date: "2026-06-01" },
    { id: 2, product: "Baby Care Product 2", status: "Processing", date: "2026-06-05" },
    { id: 3, product: "Baby Care Product 3", status: "Shipped", date: "2026-06-07" },
  ];

  return Response.json(
    { ok: true, data: orders },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders(origin),
      },
    }
  );
}

export async function POST(request) {
  const origin = request.headers.get("origin");

  try {
    const body = await request.json();

    const newOrder = {
      id: Math.floor(Math.random() * 1000),
      ...body,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
    };

    return Response.json(
      { ok: true, data: newOrder, message: "Order created successfully" },
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders(origin),
        },
      }
    );
  } catch (error) {
    return Response.json(
      { ok: false, message: error.message },
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
