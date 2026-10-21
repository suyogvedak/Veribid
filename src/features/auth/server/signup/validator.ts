import {
  EmailValidator,
  PhoneValidator,
  UsernameValidator,
} from "../../shared/validators";

import {
  VALIDATION,
} from "../../shared/constants";

import {
  ValidationError,
} from "../../shared/errors";

import {
  PasswordMismatchError,
} from "./errors";

import type {
  SignupRequest,
} from "./types";

import {
  calculatePasswordStrength,
} from "../password";

export class SignupValidator {
  /**
   * Validate all signup input.
   *
   * This method performs validation only.
   * It does not access the database.
   */
  static async validate(
    request: SignupRequest,
  ): Promise<void> {

    const {
      name,
      username,
      email,
      phone,
      password,
      confirmPassword,
    } = request;

    // --------------------------------------------
    // Name
    // --------------------------------------------

    if (
      !name ||
      name.trim().length === 0
    ) {
      throw new ValidationError(
        "Name is required.",
        "name",
      );
    }

    const normalizedName =
      name.trim();

    if (
      normalizedName.length <
      VALIDATION.NAME.MIN_LENGTH
    ) {
      throw new ValidationError(
        `Name must contain at least ${VALIDATION.NAME.MIN_LENGTH} characters.`,
        "name",
      );
    }

    if (
      normalizedName.length >
      VALIDATION.NAME.MAX_LENGTH
    ) {
      throw new ValidationError(
        `Name cannot exceed ${VALIDATION.NAME.MAX_LENGTH} characters.`,
        "name",
      );
    }

    // --------------------------------------------
    // Email
    // --------------------------------------------

    EmailValidator.validate(email);

    // --------------------------------------------
    // Username
    // --------------------------------------------

    UsernameValidator.validate(username);

    // --------------------------------------------
    // Phone
    // --------------------------------------------

    PhoneValidator.validate(phone);

    // --------------------------------------------
    // Password
    // --------------------------------------------

    const passwordResult =
      calculatePasswordStrength(password);

    if (passwordResult.score < 3) {
      throw new ValidationError(
        "Password does not meet the required strength.",
        "password",
      );
    }

    // --------------------------------------------
    // Confirm password
    // --------------------------------------------

    if (
      password !== confirmPassword
    ) {
      throw new PasswordMismatchError();
    }
  }
}