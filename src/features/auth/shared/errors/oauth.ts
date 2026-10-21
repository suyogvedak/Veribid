export class OAuthError extends Error {

  constructor(message: string) {

    super(message);

    this.name = "OAuthError";

  }

}

export const OAUTH_ERRORS = {

  PROVIDER_ALREADY_LINKED:
    "Provider already linked.",

  PROVIDER_NOT_LINKED:
    "Provider not linked.",

  UNSUPPORTED_PROVIDER:
    "Unsupported authentication provider.",

};