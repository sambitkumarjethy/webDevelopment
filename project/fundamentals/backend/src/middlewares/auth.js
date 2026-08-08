import { verifyAccessToken } from "../utils/tokens.js";

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) return res.status(401).json({ error: "Missing access token" });

  try {
    req.user = verifyAccessToken(token); // { sub, username, roles, permissions }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired access token" });
  }
}
