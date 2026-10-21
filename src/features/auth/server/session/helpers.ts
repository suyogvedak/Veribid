import type { AuthSession } from "./types";

import { AUTH_ERRORS } from "./errors";

/**
 * Extracts a guaranteed email from
 * the authenticated session.
 */

export function requireEmail(
  session: AuthSession
): string {
  const email = session.user.email;

  if (!email) {
    throw new Error(
      AUTH_ERRORS.SESSION_EMAIL_MISSING.message
    );
  }

  return email;
}