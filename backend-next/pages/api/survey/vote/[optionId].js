import { readDb, saveDb, getNextId } from "../../../../lib/store.js";
import { requireAuth } from "../../../../lib/auth.js";
import { allowCors } from "../../../../lib/cors.js";

export default async function handler(req, res) {
  if (allowCors(req, res)) return;
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const auth = requireAuth(req, res);
  if (!auth) return;

  const optionId = Number(req.query.optionId);
  const db = await readDb();
  const survey = db.surveys.find((item) => item.options.some((opt) => opt.id === optionId));
  if (!survey) return res.status(404).json({ error: "Seçenek bulunamadı" });

  const alreadyVoted = db.surveyVotes.some(
    (vote) => vote.surveyId === survey.id && vote.userId === auth.sub,
  );
  if (alreadyVoted) {
    return res.status(400).json({ error: "Zaten oy verdin" });
  }

  const option = survey.options.find((opt) => opt.id === optionId);
  if (!option) return res.status(404).json({ error: "Seçenek bulunamadı" });

  option.voteCount = (option.voteCount || 0) + 1;
  db.surveyVotes.push({ id: getNextId(db.surveyVotes), surveyId: survey.id, userId: auth.sub });
  await saveDb(db);

  res.status(200).json({ message: "Oy alındı" });
}
