import { PASSWORD_CONFIG } from "./constants";
import { PASSWORD_ERRORS } from "./errors";

import {
  calculatePasswordStrength,
} from "./strength";

import {
  isPasswordCompromised,
} from "./compromised";

import type {
  PasswordIssue,
  PasswordValidationInput,
  PasswordValidationResult,
} from "./types";

/**
 * Local validation
 *
 * Runs instantly on every keystroke.
 * Does NOT call any external APIs.
 */
export function validateLocal(
  input: PasswordValidationInput
): PasswordValidationResult {

  const issues: PasswordIssue[] = [];

  const {
    password,
    email,
    username,
    name,
  } = input;

  if (
    password.length <
    PASSWORD_CONFIG.MIN_LENGTH
  ) {
    issues.push(
      PASSWORD_ERRORS.MIN_LENGTH
    );
  }

  if (
    password.length >
    PASSWORD_CONFIG.MAX_LENGTH
  ) {
    issues.push(
      PASSWORD_ERRORS.MAX_LENGTH
    );
  }

  if (
    PASSWORD_CONFIG.ENABLE_PERSONAL_INFO_CHECK
  ) {

    const lower =
      password.toLowerCase();

    if (
      email &&
      lower.includes(
        email
          .split("@")[0]
          .toLowerCase()
      )
    ) {
      issues.push(
        PASSWORD_ERRORS.CONTAINS_EMAIL
      );
    }

    if (
      username &&
      lower.includes(
        username.toLowerCase()
      )
    ) {
      issues.push(
        PASSWORD_ERRORS.CONTAINS_USERNAME
      );
    }

    if (
      name &&
      lower.includes(
        name.toLowerCase()
      )
    ) {
      issues.push(
        PASSWORD_ERRORS.CONTAINS_NAME
      );
    }

  }

  const strength =
    calculatePasswordStrength(
      password,
      [
        email ?? "",
        username ?? "",
        name ?? "",
      ]
    );

  if (
    strength.score <
    PASSWORD_CONFIG.MIN_ZXCVBN_SCORE
  ) {

    issues.push(
      PASSWORD_ERRORS.WEAK_PASSWORD
    );

  }

  return {

    valid:
      issues.every(
        issue =>
          issue.severity !==
          "error"
      ),

    score:
      strength.score,

    strength:
      strength.strength,

    estimatedCrackTime:
      strength.estimatedCrackTime,

    breached: false,

    issues,

  };

}

/**
 * Server validation
 *
 * Calls HIBP only during
 * signup/change password.
 */
export async function validateServer(
  input: PasswordValidationInput
): Promise<PasswordValidationResult> {

  const result =
    validateLocal(input);

  if (
    !PASSWORD_CONFIG.ENABLE_BREACH_CHECK
  ) {
    return result;
  }

  try {

    const compromised =
      await isPasswordCompromised(
        input.password
      );

    if (compromised) {

      result.valid = false;

      result.breached = true;

      result.issues.push(
        PASSWORD_ERRORS.COMPROMISED_PASSWORD
      );

    }

  } catch (error) {

    console.error(
      "HIBP Error:",
      error
    );

    /**
     * Never fail signup
     * because HIBP is down.
     */

  }

  return result;

}