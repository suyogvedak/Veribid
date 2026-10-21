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

export class PhoneValidator {
  /**
   * Validate an optional phone number.
   *
   * Signup currently allows phone
   * to be optional, so an empty value
   * is accepted here.
   */
  static validate(
    phone?: string | null,
  ): void {

    if (
      phone === undefined ||
      phone === null ||
      phone.trim().length === 0
    ) {
      return;
    }

    const normalized =
      this.normalize(phone);

    if (
      !VALIDATION.PHONE.REGEX.test(
        normalized,
      )
    ) {
      throw new ValidationError(
        VALIDATION_MESSAGES.INVALID_PHONE,
        "phone",
      );
    }
  }

  /**
   * Normalize phone number.
   */
  static normalize(
    phone: string,
  ): string {
    return phone.trim();
  }
}