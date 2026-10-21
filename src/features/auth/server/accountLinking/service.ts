import type {
  User,
} from "@prisma/client";

import {
  UserLinking,
} from "./userLinking";

import {
  ProviderLinking,
} from "./providerLinking";

import type {
  AuthenticationResult,
  OAuthProfile,
  ProviderAccount,
} from "./types";

export class AccountLinkingService {

  /**
   * Authenticate an OAuth user.
   *
   * Used by:
   * Google
   * GitHub
   * Microsoft
   * Apple
   * Discord
   */
  static async authenticateOAuth(
  profile: OAuthProfile,
  account: ProviderAccount
): Promise<AuthenticationResult> {

    // --------------------------------------------------
    // Find existing user
    // --------------------------------------------------

    let user =
  await UserLinking.findUser(
    profile.email
  );

let isNewUser = false;

if (!user) {

  isNewUser = true;

  user =
    await UserLinking.createUser({

      email: profile.email,

      name: profile.name,

      image: profile.image,

      passwordCreated: false,

      profileCompleted: false,

      isVerified: true,

    });

}


    // --------------------------------------------------
    // Ensure provider linked
    // --------------------------------------------------

const alreadyLinked =
  await ProviderLinking.isLinked(

    user.id,

    account.provider

  );

if (!alreadyLinked) {

  await ProviderLinking.createProviderLink(

    user.id,

    account

  );

}

    // --------------------------------------------------
    // Synchronize profile
    // --------------------------------------------------

user =
  await UserLinking.syncProfile(

    user,

    {

      name: profile.name,

      image: profile.image,

    }

  );

return {

  user,

  isNewUser,

  providerLinked:
    !alreadyLinked,

  needsOnboarding:

    UserLinking.needsOnboarding(
      user
    ),

};


  }

  /**
   * Check onboarding status.
   */
  static needsOnboarding(
    user: User
  ): boolean {

    return UserLinking.needsOnboarding(
      user
    );

  }

  /**
   * Link another provider
   * to an existing account.
   */
  static async linkProvider(

    user: User,

    account: ProviderAccount

  ) {

    return ProviderLinking.ensureProviderLinked(

      user.id,

      account

    );

  }

  /**
   * Remove linked provider.
   */
  static async unlinkProvider(

    user: User,

    provider: string

  ) {

    return ProviderLinking.unlinkProvider(

      user.id,

      provider

    );

  }

  /**
   * Synchronize OAuth profile.
   */
  static async syncProfile(

    user: User,

    profile: OAuthProfile

  ) {

    return UserLinking.syncProfile(

      user,

      {

        name:
          profile.name,

        image:
          profile.image,

      }

    );

  }

  /**
 * Whether the user
 * may login.
 */
static canLogin(
  result: AuthenticationResult
): boolean {

  return true;

}

/**
 * Whether this is the
 * user's first login.
 */
static isFirstLogin(
  result: AuthenticationResult
): boolean {

  return result.isNewUser;

}

/**
 * Determine redirect path.
 */
static getRedirectPath(
  result: AuthenticationResult
): string {

  if (
    result.needsOnboarding
  ) {

    return "/complete-profile";

  }

  return "/";

}

}