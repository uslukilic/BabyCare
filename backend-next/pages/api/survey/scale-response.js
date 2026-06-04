import { readDb, saveDb, getNextId } from "../../../lib/store.js";
import { requireAuth } from "../../../lib/auth.js";
import { allowCors } from "../../../lib/cors.js";

export default async function handler(req, res) {
  if (allowCors(req, res)) return;
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const auth = requireAuth(req, res);
  if (!auth) return;

  const { scaleId, responses } = req.body || {};
  if (!scaleId || !responses || typeof responses !== "object") {
    return res.status(400).json({ error: "Geçersiz veri" });
  }

  const db = await readDb();
  const response = {
    id: getNextId(db.scaleResponses),
    userId: auth.sub,
    scaleId,
    responseData: JSON.stringify(responses),
    createdAt: new Date().toISOString(),
  };

  db.scaleResponses.push(response);
  await saveDb(db);

  res.status(201).json({ message: "Yanıtlar kaydedildi", id: response.id });
}
