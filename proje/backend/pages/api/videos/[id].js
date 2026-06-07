import { readDb, saveDb } from "../../../lib/store.js";
import { requireAdmin } from "../../../lib/auth.js";
import { allowCors } from "../../../lib/cors.js";
import fs from "fs/promises";
import path from "path";

export default async function handler(req, res) {
  if (allowCors(req, res)) return;
  if (req.method !== "DELETE") return res.status(405).json({ error: "Method Not Allowed" });

  const auth = requireAdmin(req, res);
  if (!auth) return;

  const id = Number(req.query.id);
  const db = await readDb();
  const video = db.videos.find((item) => item.id === id);
  if (!video) return res.status(404).json({ error: "Video bulunamadı" });

  const videoPath = path.join(process.cwd(), "public", "videos", video.fileName);
  try {
    await fs.unlink(videoPath);
  } catch {
    // ignore missing file
  }

  db.videos = db.videos.filter((item) => item.id !== id);
  await saveDb(db);

  res.status(200).json({ message: "Video silindi" });
}
