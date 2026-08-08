import { hasPermission } from "../utils/permissions.js";

/**
 * requirePermission("users:create") -- checks the permission set that was
 * baked into the access token at login/refresh time. This means a role
 * change only takes effect on the user's next token refresh, which is a
 * reasonable and common tradeoff (avoids a DB hit on every request).
 */
export function requirePermission(permission) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: "Not authenticated" });
    if (!hasPermission(req.user.permissions || [], permission)) {
      return res.status(403).json({ error: `Missing permission: ${permission}` });
    }
    next();
  };
}
