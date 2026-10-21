/**
 * Validation constants shared across
 * the authentication system.
 */

export const VALIDATION = {

  NAME: {

    MIN_LENGTH: 2,

    MAX_LENGTH: 100,

  },

  USERNAME: {

    MIN_LENGTH: 3,

    MAX_LENGTH: 30,

    REGEX:
      /^[a-zA-Z0-9_]+$/,

  },

  EMAIL: {

    REGEX:
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  },

  PHONE: {

    REGEX:
      /^\+?[1-9]\d{9,14}$/,

  },

} as const;

export const VALIDATION_MESSAGES = {

  REQUIRED:
    "This field is required.",

  INVALID_EMAIL:
    "Invalid email address.",

  INVALID_PHONE:
    "Invalid phone number.",

  INVALID_USERNAME:
    "Username may contain only letters, numbers and underscores.",

  INVALID_NAME:
    "Invalid name.",

  PASSWORD_MISMATCH:
    "Passwords do not match.",

  PASSWORD_WEAK:
    "Password does not meet the required strength.",

} as const;