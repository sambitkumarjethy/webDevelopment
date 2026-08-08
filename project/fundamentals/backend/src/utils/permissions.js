import Role from "../models/Role.js";

/**
 * Resolve the full set of effective permissions for a list of role IDs,
 * walking up each role's parentRole chain and unioning permissions.
 * A visited-set guards against accidental cycles in the hierarchy.
 */
export async function resolvePermissions(roleIds = []) {
  const permissions = new Set();
  const visited = new Set();
  const roleNames = new Set();

  async function walk(roleId) {
    const idStr = roleId.toString();
    if (visited.has(idStr)) return;
    visited.add(idStr);

    const role = await Role.findById(roleId);
    if (!role) return;

    roleNames.add(role.name);
    role.permissions.forEach((p) => permissions.add(p));

    if (role.parentRole) {
      await walk(role.parentRole);
    }
  }

  for (const roleId of roleIds) {
    await walk(roleId);
  }

  return { permissions: [...permissions], roleNames: [...roleNames] };
}

export function hasPermission(userPermissions, required) {
  return userPermissions.includes("*") || userPermissions.includes(required);
}
