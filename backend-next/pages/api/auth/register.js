import { readDb, saveDb, getNextId } from "../../../lib/store.js";
import bcrypt from "bcryptjs";
import { allowCors } from "../../../lib/cors.js";

export default async function handler(req, res) {
  if (allowCors(req, res)) return;
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const { firstName, lastName, email, password, phoneNumber, babyAge } = req.body || {};
  if (!firstName || !lastName || !email || !password || !phoneNumber || babyAge == null) {
    return res.status(400).json({ error: "Eksik alan var" });
  }

  const db = await readDb();
  const existing = db.users.find((user) => user.email === email);
  if (existing) {
    return res.status(400).json({ error: "Email zaten kullanılıyor" });
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const user = {
    id: getNextId(db.users),
    firstName,
    lastName,
    email,
    phoneNumber,
    babyAge: Number(babyAge),
    passwordHash,
    roleId: 2,
  };

  db.users.push(user);
  await saveDb(db);

  res.status(201).json({ message: "Kullanıcı oluşturuldu" });
}
