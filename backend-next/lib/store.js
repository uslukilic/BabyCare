import fs from "fs/promises";
import path from "path";
import bcrypt from "bcryptjs";

const dbFile = path.join(process.cwd(), "data", "db.json");

const defaultDb = {
  users: [],
  contactMessages: [],
  videos: [],
  surveys: [],
  surveyVotes: [],
  scaleResponses: [],
};

function getDefaultAdmin() {
  return {
    id: 1,
    firstName: "Admin",
    lastName: "User",
    email: "admin@site.com",
    phoneNumber: "0000000000",
    babyAge: 0,
    passwordHash: bcrypt.hashSync("Admin123!", 10),
    roleId: 1,
  };
}

async function ensureStore() {
  const dir = path.dirname(dbFile);
  await fs.mkdir(dir, { recursive: true });
  try {
    await fs.access(dbFile);
  } catch {
    await saveDb({ ...defaultDb, users: [getDefaultAdmin()] });
  }
}

export async function readDb() {
  await ensureStore();
  const text = await fs.readFile(dbFile, "utf8");
  if (!text.trim()) {
    await saveDb({ ...defaultDb, users: [getDefaultAdmin()] });
    return { ...defaultDb, users: [getDefaultAdmin()] };
  }
  return JSON.parse(text);
}

export async function saveDb(db) {
  await ensureStore();
  await fs.writeFile(dbFile, JSON.stringify(db, null, 2), "utf8");
  return db;
}

export function getNextId(items) {
  if (!items || items.length === 0) return 1;
  return Math.max(...items.map((item) => item.id)) + 1;
}
