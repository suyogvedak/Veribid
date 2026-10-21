import type {
  User,
  UserRole,
} from "@prisma/client";

export function isAdmin(
  role: UserRole
): boolean {
  return role === "ADMIN";
}

export function hasRole(
  user: User,
  role: UserRole
): boolean {
  return user.role === role;
}

export function hasCompletedProfile(
  user: User
): boolean {
  return user.profileCompleted;
}

export function hasPassword(
  user: User
): boolean {
  return user.passwordCreated;
}

export function isVerified(
  user: User
): boolean {
  return user.isVerified;
}