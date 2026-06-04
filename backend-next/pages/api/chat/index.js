import { allowCors } from "../../../lib/cors.js";
import { getChatAnswer } from "../../../lib/chatService.js";

export default function handler(req, res) {
  if (allowCors(req, res)) return;
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const { question } = req.body || {};
  if (!question || !question.trim()) {
    return res.status(400).json({ answer: "Lütfen bir soru yazın." });
  }

  const answer = getChatAnswer(question);
  res.status(200).json({ answer });
}
