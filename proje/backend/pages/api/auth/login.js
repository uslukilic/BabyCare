import bcrypt from "bcryptjs";
import { readDb } from "../../../lib/store.js";
import { signToken } from "../../../lib/auth.js";
import { allowCors } from "../../../lib/cors.js";

export default async function handler(req, res) {
  if (allowCors(req, res)) return;
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const data = req.body || req.query || {};
  const { email, password } = data;
  if (!email || !password) {
    return res.status(400).json({ error: "Eksik alan var" });
  }

  const db = await readDb();
  const user = db.users.find((user) => user.email === email);
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ error: "Email veya şifre hatalı" });
  }

  const token = signToken(user);
  res.status(200).json({ token });
}
