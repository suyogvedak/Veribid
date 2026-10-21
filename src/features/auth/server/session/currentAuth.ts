import type {
  CurrentAuth,
} from "./types";

import {
  requireAuth,
} from "./guards";

import {
  requireEmail,
} from "./helpers";

import {
  UserRepository,
} from "./userRepository";

import {
  isAdmin,
  hasCompletedProfile,
  hasPassword,
  isVerified,
} from "./permissions";

export async function getCurrentAuth():

Promise<CurrentAuth> {

  const session =
    await requireAuth();

  const email =
    requireEmail(session);

  const user =
    await UserRepository.findUserByEmail(
      email
    );

  if (!user) {

    throw new Error(
      "Authenticated user not found."
    );

  }

  return {

    session,

    user,

    permissions: {

      authenticated: true,

      verified:
        isVerified(user),

      profileCompleted:
        hasCompletedProfile(user),

      passwordCreated:
        hasPassword(user),

      admin:
        isAdmin(user.role),

    },

  };

}