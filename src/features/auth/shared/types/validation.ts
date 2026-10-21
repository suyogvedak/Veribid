/**
 * Represents a validation error
 * associated with a specific field.
 */
export type FieldValidationError = {
  field: string;
  message: string;
};

/**
 * Collection of validation errors.
 */
export type ValidationErrors =
  FieldValidationError[];