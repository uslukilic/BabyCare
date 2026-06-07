import { readDb } from "../../../lib/store.js";
import { allowCors } from "../../../lib/cors.js";

export default async function handler(req, res) {
  if (allowCors(req, res)) return;
  if (req.method !== "GET") return res.status(405).json({ error: "Method Not Allowed" });

  const db = await readDb();
  const survey = db.surveys.find((item) => item.isActive);
  if (!survey) return res.status(404).json({ error: "Aktif anket yok" });

  res.status(200).json({
    id: survey.id,
    question: survey.question,
    options: survey.options.map((opt) => ({ id: opt.id, text: opt.text })),
  });
}
