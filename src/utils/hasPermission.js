import { ROLE_PERMISSIONS } from "@/constants/permissions";

export const hasPermission = (role, permission) => {
  return ROLE_PERMISSIONS[role]?.includes(permission);
};