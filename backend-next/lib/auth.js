import jwt from "jsonwebtoken";

const JWT_KEY = process.env.JWT_KEY || "replace_with_secure_key";
const JWT_ISSUER = process.env.JWT_ISSUER || "babycare.local";
const JWT_AUDIENCE = process.env.JWT_AUDIENCE || "babycare.local";
const JWT_EXPIRE_MINUTES = process.env.JWT_EXPIRE_MINUTES || "1440";

export function signToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      role: user.roleId,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
    },
    JWT_KEY,
    {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
      expiresIn: `${JWT_EXPIRE_MINUTES}m`,
    },
  );
}

export function verifyToken(header) {
  if (!header || typeof header !== "string") return null;
  const token = header.startsWith("Bearer ") ? header.slice(7) : header;
  try {
    return jwt.verify(token, JWT_KEY, {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    });
  } catch {
    return null;
  }
}

export function requireAuth(req, res) {
  const payload = verifyToken(req.headers.authorization || req.headers.Authorization);
  if (!payload) {
    res.status(401).json({ error: "Unauthorized" });
    return null;
  }
  return payload;
}

export function requireAdmin(req, res) {
  const payload = requireAuth(req, res);
  if (!payload) return null;
  const role = payload.role;
  const isAdmin = role === 1 || role === "1" || role === "Admin";
  if (!isAdmin) {
    res.status(403).json({ error: "Forbidden" });
    return null;
  }
  return payload;
}
