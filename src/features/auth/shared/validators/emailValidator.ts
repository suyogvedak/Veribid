import {
  VALIDATION,
  VALIDATION_MESSAGES,
} from "../constants";

import {
  ValidationError,
} from "../errors";

import {
  CommonValidator,
} from "./commonValidator";

export class EmailValidator {
  /**
   * Validate an email address.
   */
  static validate(
    email: string,
  ): void {

    CommonValidator.required(
      email,
      "email",
    );

    const normalized =
      this.normalize(email);

    if (
      !VALIDATION.EMAIL.REGEX.test(
        normalized,
      )
    ) {
      throw new ValidationError(
        VALIDATION_MESSAGES.INVALID_EMAIL,
        "email",
      );
    }
  }

  /**
   * Normalize email addresses
   * consistently across the system.
   */
  static normalize(
    email: string,
  ): string {
    return email
      .trim()
      .toLowerCase();
  }
}