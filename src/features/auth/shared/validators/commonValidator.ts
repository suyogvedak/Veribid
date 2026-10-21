import { ValidationError } from "../errors";
import {
  VALIDATION_MESSAGES,
} from "../constants";

export class CommonValidator {
  /**
   * Check whether a value is empty.
   */
  static isEmpty(
    value?: string | null,
  ): boolean {
    return (
      value === null ||
      value === undefined ||
      value.trim().length === 0
    );
  }

  /**
   * Require a non-empty value.
   */
  static required(
    value: string | null | undefined,
    field: string,
  ): void {
    if (this.isEmpty(value)) {
      throw new ValidationError(
        VALIDATION_MESSAGES.REQUIRED,
        field,
      );
    }
  }

  /**
   * Check minimum length.
   */
  static minLength(
    value: string,
    minimum: number,
    field: string,
  ): void {
    if (value.trim().length < minimum) {
      throw new ValidationError(
        `Must contain at least ${minimum} characters.`,
        field,
      );
    }
  }

  /**
   * Check maximum length.
   */
  static maxLength(
    value: string,
    maximum: number,
    field: string,
  ): void {
    if (value.trim().length > maximum) {
      throw new ValidationError(
        `Cannot exceed ${maximum} characters.`,
        field,
      );
    }
  }

  /**
   * Normalize whitespace.
   */
  static normalize(
    value: string,
  ): string {
    return value.trim();
  }
}