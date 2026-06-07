import { readDb, saveDb } from "../../../lib/store.js";
import { requireAdmin } from "../../../lib/auth.js";
import { allowCors } from "../../../lib/cors.js";

export default async function handler(req, res) {
  if (allowCors(req, res)) return;
  if (req.method !== "DELETE") return res.status(405).json({ error: "Method Not Allowed" });

  const auth = requireAdmin(req, res);
  if (!auth) return;

  const id = Number(req.query.id);
  const db = await readDb();
  const survey = db.surveys.find((item) => item.id === id);
  if (!survey) return res.status(404).json({ error: "Anket bulunamadı" });

  db.surveys = db.surveys.filter((item) => item.id !== id);
  db.surveyVotes = db.surveyVotes.filter((vote) => vote.surveyId !== id);
  await saveDb(db);

  res.status(200).json({ message: "Anket silindi" });
}
