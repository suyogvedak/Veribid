import type { User } from "@prisma/client";

import type {
  SignupResult,
} from "./types";

import {
  SIGNUP_SUCCESS_MESSAGE,
} from "./constants";

/**
 * Maps database User records into the
 * public Signup response.
 *
 * Sensitive database fields are deliberately
 * excluded from the returned object.
 */
export class SignupMapper {
  /**
   * Convert a Prisma User into the public
   * signup result.
   */
  static toResult(
    user: User,
  ): SignupResult {
    return {
      success: true,

      message:
        SIGNUP_SUCCESS_MESSAGE,

      user: {
        id: user.id,

        name: user.name,

        username:
          user.username,

        email:
          user.email,

        phone:
          user.phoneNumber,

        profileCompleted:
          user.profileCompleted,

        passwordCreated:
          user.passwordCreated,

        isVerified:
          user.isVerified,
      },
    };
  }
}