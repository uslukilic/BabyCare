import formidable from "formidable";
import fs from "fs/promises";
import path from "path";
import { readDb, saveDb, getNextId } from "../../../lib/store.js";
import { requireAdmin } from "../../../lib/auth.js";
import { allowCors } from "../../../lib/cors.js";

export const config = {
  api: {
    bodyParser: false,
  },
};

function parseForm(req) {
  const form = formidable({ multiples: false, keepExtensions: true });
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}

export default async function handler(req, res) {
  if (allowCors(req, res)) return;
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const auth = requireAdmin(req, res);
  if (!auth) return;

  const { fields, files } = await parseForm(req);
  const file = files.file;
  if (!file || !file.filepath) {
    return res.status(400).json({ error: "Video dosyası gerekli" });
  }

  const title = fields.title?.toString() || "";
  const description = fields.description?.toString() || "";
  const originalName = file.originalFilename || "video.mp4";
  const fileName = `${Date.now()}-${originalName.replace(/[^a-zA-Z0-9.\-_]/g, "_")}`;
  const targetDir = path.join(process.cwd(), "public", "videos");
  await fs.mkdir(targetDir, { recursive: true });
  const targetPath = path.join(targetDir, fileName);
  await fs.copyFile(file.filepath, targetPath);

  const db = await readDb();
  const video = {
    id: getNextId(db.videos),
    title,
    description,
    fileName,
    viewCount: 0,
  };

  db.videos.push(video);
  await saveDb(db);

  res.status(201).json(video);
}
