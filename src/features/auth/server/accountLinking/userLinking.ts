import type {
  User,
  Prisma,
} from "@prisma/client";

import {
  UserRepository,
} from "../session";

export interface CreateUserInput {

  email: string;

  name?: string | null;

  image?: string | null;

  password?: string | null;

  passwordCreated: boolean;

  profileCompleted: boolean;

  isVerified?: boolean;

}

export class UserLinking {

  /**
   * Find user by email.
   */
  static async findUser(
    email: string
  ): Promise<User | null> {

    return UserRepository.findUserByEmail(
      email
    );

  }

  /**
   * Generic user creation.
   *
   * Can be used by:
   *
   * • Credentials Signup
   * • Google OAuth
   * • GitHub OAuth
   * • Microsoft OAuth
   * • Admin Panel
   */
  static async createUser(
    input: CreateUserInput
  ): Promise<User> {

    const data: Prisma.UserCreateInput = {

      email:
        input.email,

      name:
        input.name,

      image:
        input.image,

      password:
        input.password,

      passwordCreated:
        input.passwordCreated,

      profileCompleted:
        input.profileCompleted,

      isVerified:
        input.isVerified ?? false,

    };

    return UserRepository.createUser(
      data
    );

  }

  /**
   * Synchronize OAuth profile
   * with database.
   */
  static async syncProfile(
    user: User,
    data: {

      name?: string | null;

      image?: string | null;

    }

  ): Promise<User> {

    return UserRepository.updateUser(

      user.id,

      {

        name:
          data.name ??
          user.name,

        image:
          data.image ??
          user.image,

      }

    );

  }

  /**
   * Determine whether
   * onboarding is required.
   */
  static needsOnboarding(
    user: User
  ): boolean {

    return (

      !user.profileCompleted ||

      !user.passwordCreated ||

      !user.username ||

      !user.phoneNumber

    );

  }

}