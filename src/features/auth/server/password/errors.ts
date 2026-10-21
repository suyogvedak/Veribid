import type { PasswordIssue } from "./types";

export const PASSWORD_ERRORS = {
  MIN_LENGTH: {
    code: "MIN_LENGTH",
    message: "Password must contain at least 12 characters.",
    severity: "error",
  },

  MAX_LENGTH: {
    code: "MAX_LENGTH",
    message: "Password cannot exceed 128 characters.",
    severity: "error",
  },

  CONTAINS_EMAIL: {
    code: "CONTAINS_EMAIL",
    message: "Password should not contain your email address.",
    severity: "warning",
  },

  CONTAINS_USERNAME: {
    code: "CONTAINS_USERNAME",
    message: "Password should not contain your username.",
    severity: "warning",
  },

  CONTAINS_NAME: {
    code: "CONTAINS_NAME",
    message: "Password should not contain your name.",
    severity: "warning",
  },

  WEAK_PASSWORD: {
    code: "WEAK_PASSWORD",
    message: "Password is too weak.",
    severity: "error",
  },

  COMPROMISED_PASSWORD: {
    code: "COMPROMISED_PASSWORD",
    message:
      "This password has appeared in a known data breach.",
    severity: "error",
  },
} as const satisfies Record<string, PasswordIssue>;