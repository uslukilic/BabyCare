import { corsHeaders, handleCORS } from "../cors";

export async function OPTIONS(request) {
  return handleCORS(request);
}

export async function GET(request) {
  const origin = request.headers.get("origin");

  const videos = [
    {
      id: 1,
      title: "Baby Care Guide 1",
      description: "Tips for newborn care",
      url: "/videos/baby-care-1.mp4",
    },
    {
      id: 2,
      title: "Baby Care Guide 2",
      description: "Feeding and nutrition",
      url: "/videos/baby-care-2.mp4",
    },
    {
      id: 3,
      title: "Baby Care Guide 3",
      description: "Sleep and development",
      url: "/videos/baby-care-3.mp4",
    },
  ];

  return Response.json(
    { ok: true, data: videos },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders(origin),
      },
    }
  );
}
