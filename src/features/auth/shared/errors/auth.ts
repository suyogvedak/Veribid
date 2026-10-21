export class AuthenticationError extends Error {

  constructor(message: string) {

    super(message);

    this.name = "AuthenticationError";

  }

}

export class AuthorizationError extends Error {

  constructor(message: string) {

    super(message);

    this.name = "AuthorizationError";

  }

}

export const AUTH_ERRORS = {

  INVALID_CREDENTIALS:
    "Invalid email or password.",

  EMAIL_NOT_VERIFIED:
    "Please verify your email.",

  ACCOUNT_LOCKED:
    "Your account has been locked.",

  ACCOUNT_DISABLED:
    "Your account has been disabled.",

  SESSION_EXPIRED:
    "Your session has expired.",

};