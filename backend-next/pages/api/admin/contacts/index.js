import { readDb } from "../../../../lib/store.js";
import { requireAdmin } from "../../../../lib/auth.js";
import { allowCors } from "../../../../lib/cors.js";

export default async function handler(req, res) {
  if (allowCors(req, res)) return;
  if (req.method !== "GET") return res.status(405).json({ error: "Method Not Allowed" });

  const auth = requireAdmin(req, res);
  if (!auth) return;

  const db = await readDb();
  res.status(200).json(db.contactMessages || []);
}
