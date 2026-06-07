import { readDb } from "../../../lib/store.js";
import { requireAdmin } from "../../../lib/auth.js";
import { allowCors } from "../../../lib/cors.js";

export default async function handler(req, res) {
  if (allowCors(req, res)) return;
  if (req.method !== "GET") return res.status(405).json({ error: "Method Not Allowed" });

  const auth = requireAdmin(req, res);
  if (!auth) return;

  const db = await readDb();
  const survey = db.surveys.find((item) => item.isActive);
  if (!survey) return res.status(404).json({ error: "Aktif anket yok" });

  res.status(200).json({
    question: survey.question,
    results: survey.options.map((opt) => ({ text: opt.text, voteCount: opt.voteCount || 0 })),
  });
}
