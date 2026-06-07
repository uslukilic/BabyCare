import { readDb, saveDb } from "../../../../../lib/store.js";
import { requireAdmin } from "../../../../../lib/auth.js";
import { allowCors } from "../../../../../lib/cors.js";

export default async function handler(req, res) {
  if (allowCors(req, res)) return;
  if (req.method !== "PUT") return res.status(405).json({ error: "Method Not Allowed" });

  const auth = requireAdmin(req, res);
  if (!auth) return;

  const id = Number(req.query.id);
  const db = await readDb();
  const message = db.contactMessages.find((item) => item.id === id);
  if (!message) return res.status(404).json({ error: "Mesaj bulunamadı" });

  message.isRead = true;
  await saveDb(db);

  res.status(200).json({ message: "Okundu işaretlendi" });
}
