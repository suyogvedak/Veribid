import {
  hashPassword,
  verifyPassword,
} from "./hashing";

import {
  validateLocal,
  validateServer,
} from "./validator";

import type {
  PasswordValidationInput,
} from "./types";

export class PasswordService {

  /**
   * Hash password
   */
  static async hash(
    password: string
  ) {
    return hashPassword(
      password
    );
  }

  /**
   * Verify password
   */
  static async verify(
    password: string,
    hash: string
  ) {
    return verifyPassword(
      password,
      hash
    );
  }

  /**
   * Local validation
   *
   * Runs instantly.
   */
  static validateLocal(
    input: PasswordValidationInput
  ) {
    return validateLocal(
      input
    );
  }

  /**
   * Full validation
   *
   * Includes HIBP.
   */
  static async validateServer(
    input: PasswordValidationInput
  ) {
    return validateServer(
      input
    );
  }

}