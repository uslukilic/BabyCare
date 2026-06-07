import { readDb } from "../../../../lib/store.js";
import { requireAdmin } from "../../../../lib/auth.js";
import { allowCors } from "../../../../lib/cors.js";

export default async function handler(req, res) {
  if (allowCors(req, res)) return;
  if (req.method !== "GET") return res.status(405).json({ error: "Method Not Allowed" });

  const auth = requireAdmin(req, res);
  if (!auth) return;

  const scaleId = req.query.scaleId?.toString();
  const db = await readDb();
  const responses = db.scaleResponses
    .filter((item) => item.scaleId === scaleId)
    .map((item) => ({
      id: item.id,
      userId: item.userId,
      createdAt: item.createdAt,
      responses: JSON.parse(item.responseData || "{}"),
    }));

  res.status(200).json(responses);
}
