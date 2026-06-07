import { readDb, saveDb } from "../../../../lib/store.js";
import { requireAdmin } from "../../../../lib/auth.js";
import { allowCors } from "../../../../lib/cors.js";

export default async function handler(req, res) {
  if (allowCors(req, res)) return;
  const auth = requireAdmin(req, res);
  if (!auth) return;

  const id = Number(req.query.id);
  const db = await readDb();
  const message = db.contactMessages.find((item) => item.id === id);
  if (!message) return res.status(404).json({ error: "Mesaj bulunamadı" });

  if (req.method === "DELETE") {
    db.contactMessages = db.contactMessages.filter((item) => item.id !== id);
    await saveDb(db);
    return res.status(200).json({ message: "Mesaj silindi" });
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
