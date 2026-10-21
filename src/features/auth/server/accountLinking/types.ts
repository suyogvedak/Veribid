import type {
  User,
} from "@prisma/client";

import {
  AUTH_PROVIDERS,
} from "./constants";

/**
 * Supported provider names.
 */
export type AuthProvider =
  typeof AUTH_PROVIDERS[
    keyof typeof AUTH_PROVIDERS
  ];

/**
 * OAuth profile returned
 * by the provider.
 */
export interface OAuthProfile {

  email: string;

  name?: string | null;

  image?: string | null;

}

/**
 * Provider account information.
 */
export interface ProviderAccount {

  provider: AuthProvider;

  providerAccountId: string;

  type: string;

}

/**
 * Used when linking
 * an authentication provider.
 */
export interface LinkProviderInput {

  user: User;

  account: ProviderAccount;

}

/**
 * Result after linking.
 */
export interface LinkProviderResult {

  success: boolean;

  linked: boolean;

  user: User;

}

/**
 * Used when creating an
 * OAuth user.
 */
export interface CreateOAuthUserInput {

  profile: OAuthProfile;

  account: ProviderAccount;

}

/**
 * Used when synchronizing
 * provider profile data.
 */
export interface SyncProfileInput {

  user: User;

  profile: OAuthProfile;

}

/**
 * Result returned after
 * authenticating an OAuth user.
 */
export interface AuthenticationResult {

  /**
   * Authenticated user.
   */
  user: User;

  /**
   * Whether the account
   * was created during
   * this authentication.
   */
  isNewUser: boolean;

  /**
   * Whether the provider
   * was linked during
   * this authentication.
   */
  providerLinked: boolean;

  /**
   * Whether onboarding
   * is still required.
   */
  needsOnboarding: boolean;

}