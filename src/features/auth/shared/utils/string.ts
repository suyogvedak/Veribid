/**
 * String utility functions shared
 * across authentication features.
 */

/**
 * Trim a string safely.
 */
export function normalizeString(
  value: string,
): string {
  return value.trim();
}

/**
 * Normalize an email address.
 */
export function normalizeEmail(
  email: string,
): string {
  return email.trim().toLowerCase();
}

/**
 * Normalize a username.
 */
export function normalizeUsername(
  username: string,
): string {
  return username.trim().toLowerCase();
}

/**
 * Return null for empty strings.
 *
 * Useful when preparing optional
 * database fields.
 */
export function emptyToNull(
  value?: string | null,
): string | null {

  if (
    value === undefined ||
    value === null ||
    value.trim().length === 0
  ) {
    return null;
  }

  return value.trim();
}

/**
 * Check whether a string is empty
 * after trimming whitespace.
 */
export function isBlank(
  value?: string | null,
): boolean {

  return (
    value === undefined ||
    value === null ||
    value.trim().length === 0
  );
}

/**
 * Mask an email address for safe
 * display in messages/logs.
 *
 * Example:
 * john@example.com
 * -> j***@example.com
 */
export function maskEmail(
  email: string,
): string {

  const normalized =
    normalizeEmail(email);

  const [localPart, domain] =
    normalized.split("@");

  if (
    !localPart ||
    !domain
  ) {
    return "***";
  }

  if (localPart.length === 1) {
    return `*@${domain}`;
  }

  return `${localPart[0]}***@${domain}`;
}