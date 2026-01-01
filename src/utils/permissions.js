export const ROLE_PERMISSIONS = {
  admin: ["users:read", "users:update", "users:delete"],
  user: [],
};

export const hasPermission = (role, permission) => {
  return ROLE_PERMISSIONS[role]?.includes(permission);
};