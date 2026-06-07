import { readDb, saveDb, getNextId } from "../../../../lib/store.js";
import { requireAdmin } from "../../../../lib/auth.js";
import { allowCors } from "../../../../lib/cors.js";

export default async function handler(req, res) {
  if (allowCors(req, res)) return;
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const auth = requireAdmin(req, res);
  if (!auth) return;

  const id = Number(req.query.id);
  const { text } = req.body || {};
  if (!text || !text.trim()) {
    return res.status(400).json({ error: "Seçenek metni gerekli" });
  }

  const db = await readDb();
  const survey = db.surveys.find((item) => item.id === id);
  if (!survey) return res.status(404).json({ error: "Anket bulunamadı" });

  survey.options.push({ id: getNextId(survey.options), text, voteCount: 0 });
  await saveDb(db);

  res.status(201).json({ message: "Seçenek eklendi" });
}
