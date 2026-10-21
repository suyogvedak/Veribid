export class AccountLinkingError
  extends Error {

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

export const ACCOUNT_LINKING_ERRORS = {

  USER_NOT_FOUND: {

    code: "USER_NOT_FOUND",

    message:
      "User not found.",

    status: 404,

  },

  EMAIL_ALREADY_EXISTS: {

    code:
      "EMAIL_ALREADY_EXISTS",

    message:
      "An account with this email already exists.",

    status: 409,

  },

  PROVIDER_ALREADY_LINKED: {

    code:
      "PROVIDER_ALREADY_LINKED",

    message:
      "Authentication provider is already linked.",

    status: 409,

  },

  PROVIDER_NOT_LINKED: {

    code:
      "PROVIDER_NOT_LINKED",

    message:
      "Authentication provider is not linked.",

    status: 404,

  },

} as const;