import { redirect } from "next/navigation";

import type {
  User,
  UserRole,
} from "@prisma/client";

import {
  AUTH_ERRORS,
} from "./errors";

import {
  AUTH_ROUTES,
} from "./constants";

import {
  getAuthSession,
} from "./authSession";

import {
  requireEmail,
} from "./helpers";

import {
  UserRepository,
} from "./userRepository";

/**
 * Require authenticated session.
 */
export async function requireAuth() {

  const session =
    await getAuthSession();

  if (!session) {

    redirect(
      AUTH_ROUTES.LOGIN
    );

  }

  return session;

}

/**
 * Require authenticated user.
 */
export async function requireUser(): Promise<User> {

  const session =
    await requireAuth();

  const email =
    requireEmail(session);

  const user =
    await UserRepository.findUserByEmail(
      email
    );

  if (!user) {

    throw new Error(
      AUTH_ERRORS.USER_NOT_FOUND.message
    );

  }

  return user;

}

/**
 * Require specific role.
 */
export async function requireRole(
  role: UserRole
): Promise<User> {

  const user =
    await requireUser();

  if (user.role !== role) {

    redirect(
      AUTH_ROUTES.HOME
    );

  }

  return user;

}