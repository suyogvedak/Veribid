export class AuthError extends Error {

  readonly code: string;

  readonly status: number;

  constructor(
    code: string,
    message: string,
    status = 400
  ) {

    super(message);

    this.code = code;

    this.status = status;

  }

}

export const AUTH_ERRORS = {

  UNAUTHORIZED: {

    code: "UNAUTHORIZED",

    message:
      "You must be logged in.",

    status: 401,

  },

  FORBIDDEN: {

    code: "FORBIDDEN",

    message:
      "You don't have permission.",

    status: 403,

  },

  USER_NOT_FOUND: {

    code: "USER_NOT_FOUND",

    message:
      "User not found.",

    status: 404,

  },

  SESSION_EMAIL_MISSING: {

    code:
      "SESSION_EMAIL_MISSING",

    message:
      "Authenticated session does not contain an email.",

    status: 500,

  },

} as const;