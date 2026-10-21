/**
 * Supported authentication providers.
 */

export const AUTH_PROVIDERS = {

  GOOGLE: "google",

  CREDENTIALS: "credentials",

} as const;

/**
 * Account linking configuration.
 */

export const ACCOUNT_LINKING_CONFIG = {

  /**
   * Sync OAuth profile picture
   * whenever the user logs in.
   */
  SYNC_PROFILE_IMAGE: true,

  /**
   * Sync OAuth display name.
   */
  SYNC_PROFILE_NAME: true,

  /**
   * Automatically create
   * provider accounts.
   */
  AUTO_LINK_PROVIDER: true,

} as const;