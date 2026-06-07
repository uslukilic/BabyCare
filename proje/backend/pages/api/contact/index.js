import { readDb, saveDb, getNextId } from "../../../lib/store.js";
import { allowCors } from "../../../lib/cors.js";

export default async function handler(req, res) {
  if (allowCors(req, res)) return;
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const { firstName, lastName, email, phone, babyAge, message } = req.body || {};
  if (!firstName || !lastName || !email || !phone || babyAge == null || !message) {
    return res.status(400).json({ error: "Eksik alan var" });
  }

  const db = await readDb();
  const contact = {
    id: getNextId(db.contactMessages),
    firstName,
    lastName,
    email,
    phone,
    babyAge: Number(babyAge),
    message,
    isRead: false,
    createdAt: new Date().toISOString(),
  };

  db.contactMessages.push(contact);
  await saveDb(db);

  res.status(201).json({ message: "Mesaj alındı" });
}
