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

export class UsernameValidator {
  /**
   * Validate username.
   */
  static validate(
    username: string,
  ): void {

    CommonValidator.required(
      username,
      "username",
    );

    const normalized =
      this.normalize(username);

    CommonValidator.minLength(
      normalized,
      VALIDATION.USERNAME.MIN_LENGTH,
      "username",
    );

    CommonValidator.maxLength(
      normalized,
      VALIDATION.USERNAME.MAX_LENGTH,
      "username",
    );

    if (
      !VALIDATION.USERNAME.REGEX.test(
        normalized,
      )
    ) {
      throw new ValidationError(
        VALIDATION_MESSAGES.INVALID_USERNAME,
        "username",
      );
    }
  }

  /**
   * Normalize username.
   */
  static normalize(
    username: string,
  ): string {
    return username
      .trim()
      .toLowerCase();
  }
}