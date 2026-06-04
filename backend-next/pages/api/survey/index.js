import { readDb, saveDb, getNextId } from "../../../lib/store.js";
import { requireAdmin } from "../../../lib/auth.js";
import { allowCors } from "../../../lib/cors.js";

export default async function handler(req, res) {
  if (allowCors(req, res)) return;
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const auth = requireAdmin(req, res);
  if (!auth) return;

  const { question } = req.body || {};
  if (!question || !question.trim()) {
    return res.status(400).json({ error: "Anket sorusu gerekli" });
  }

  const db = await readDb();
  db.surveys.forEach((survey) => {
    survey.isActive = false;
  });

  const survey = {
    id: getNextId(db.surveys),
    question,
    isActive: true,
    options: [],
    createdAt: new Date().toISOString(),
  };

  db.surveys.push(survey);
  await saveDb(db);

  res.status(201).json({
    id: survey.id,
    question: survey.question,
    options: [],
  });
}
