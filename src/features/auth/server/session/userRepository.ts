import { prisma } from "@/lib/prisma";

import type {
  User,
  Prisma,
} from "@prisma/client";

export class UserRepository {

  // ==========================================================
  // USER LOOKUPS
  // ==========================================================

  /**
   * Find user by ID.
   */
  static async findUserById(
    id: string
  ): Promise<User | null> {

    return prisma.user.findUnique({
      where: {
        id,
      },
    });

  }

  /**
   * Find user by email.
   */
  static async findUserByEmail(
    email: string
  ): Promise<User | null> {

    return prisma.user.findUnique({
      where: {
        email,
      },
    });

  }

  /**
   * Find user by username.
   */
  static async findUserByUsername(
    username: string
  ): Promise<User | null> {

    return prisma.user.findUnique({
      where: {
        username,
      },
    });

  }

  /**
   * Find user by phone number.
   */
  static async findUserByPhone(
    phoneNumber: string
  ): Promise<User | null> {

    return prisma.user.findFirst({
      where: {
        phoneNumber,
      },
    });

  }

    /**
   * Require user by ID.
   * Throws if user does not exist.
   */
  static async requireUserById(
    id: string
  ): Promise<User> {

    const user =
      await this.findUserById(id);

    if (!user) {

      throw new Error(
        `User with id "${id}" not found.`
      );

    }

    return user;

  }

  /**
   * Require user by email.
   * Throws if user does not exist.
   */
  static async requireUserByEmail(
    email: string
  ): Promise<User> {

    const user =
      await this.findUserByEmail(email);

    if (!user) {

      throw new Error(
        `User with email "${email}" not found.`
      );

    }

    return user;

  }

  /**
   * Require user by username.
   * Throws if user does not exist.
   */
  static async requireUserByUsername(
    username: string
  ): Promise<User> {

    const user =
      await this.findUserByUsername(
        username
      );

    if (!user) {

      throw new Error(
        `User "${username}" not found.`
      );

    }

    return user;

  }

  /**
   * Require user by phone number.
   * Throws if user does not exist.
   */
  static async requireUserByPhone(
    phoneNumber: string
  ): Promise<User> {

    const user =
      await this.findUserByPhone(
        phoneNumber
      );

    if (!user) {

      throw new Error(
        `User with phone "${phoneNumber}" not found.`
      );

    }

    return user;

  }

  // ==========================================================
  // EXISTENCE HELPERS
  // ==========================================================

  /**
   * Check whether an email exists.
   */
  static async existsByEmail(
    email: string
  ): Promise<boolean> {

    const count =
      await prisma.user.count({
        where: {
          email,
        },
      });

    return count > 0;

  }

  /**
   * Check whether a username exists.
   */
  static async existsByUsername(
    username: string
  ): Promise<boolean> {

    const count =
      await prisma.user.count({
        where: {
          username,
        },
      });

    return count > 0;

  }

  /**
   * Check whether a phone number exists.
   */
  static async existsByPhone(
    phoneNumber: string
  ): Promise<boolean> {

    const count =
      await prisma.user.count({
        where: {
          phoneNumber,
        },
      });

    return count > 0;

  }

  // ==========================================================
  // CRUD
  // ==========================================================

  /**
   * Create a new user.
   */
  static async createUser(
    data: Prisma.UserCreateInput
  ): Promise<User> {

    return prisma.user.create({
      data,
    });

  }

  /**
   * Update user.
   */
  static async updateUser(
    id: string,
    data: Prisma.UserUpdateInput
  ): Promise<User> {

    return prisma.user.update({

      where: {
        id,
      },

      data,

    });

  }

  /**
   * Delete user.
   */
  static async deleteUser(
    id: string
  ): Promise<User> {

    return prisma.user.delete({

      where: {
        id,
      },

    });

  }

    // ==========================================================
  // PASSWORD / AUTHENTICATION
  // ==========================================================

  /**
   * Update user password.
   */
  static async updatePassword(
    id: string,
    password: string
  ): Promise<User> {

    return prisma.user.update({

      where: {
        id,
      },

      data: {

        password,

        passwordCreated: true,

      },

    });

  }

  /**
   * Mark password created.
   */
  static async markPasswordCreated(
    id: string
  ): Promise<User> {

    return prisma.user.update({

      where: {
        id,
      },

      data: {

        passwordCreated: true,

      },

    });

  }

  /**
   * Mark email/account verified.
   */
  static async markVerified(
    id: string
  ): Promise<User> {

    return prisma.user.update({

      where: {
        id,
      },

      data: {

        isVerified: true,

        emailVerified: new Date(),

      },

    });

  }

  /**
   * Check whether user has created
   * a password.
   */
  static async hasPassword(
    id: string
  ): Promise<boolean> {

    const user =
      await prisma.user.findUnique({

        where: {
          id,
        },

        select: {
          passwordCreated: true,
        },

      });

    return user?.passwordCreated ?? false;

  }

  /**
   * Check whether the account
   * is verified.
   */
  static async isVerified(
    id: string
  ): Promise<boolean> {

    const user =
      await prisma.user.findUnique({

        where: {
          id,
        },

        select: {
          isVerified: true,
        },

      });

    return user?.isVerified ?? false;

  }

  // ==========================================================
  // PROFILE
  // ==========================================================

  /**
   * Update profile completion.
   */
  static async updateProfileCompleted(
    id: string,
    completed: boolean
  ): Promise<User> {

    return prisma.user.update({

      where: {
        id,
      },

      data: {

        profileCompleted:
          completed,

      },

    });

  }

  /**
   * Check profile completion.
   */
  static async isProfileCompleted(
    id: string
  ): Promise<boolean> {

    const user =
      await prisma.user.findUnique({

        where: {
          id,
        },

        select: {

          profileCompleted: true,

        },

      });

    return (
      user?.profileCompleted ??
      false
    );

  }

  // ==========================================================
  // PROVIDERS
  // ==========================================================

  /**
   * Find linked provider account.
   */
  static async findProviderAccount(
    provider: string,
    providerAccountId: string
  ) {

    return prisma.account.findUnique({

      where: {

        provider_providerAccountId: {

          provider,

          providerAccountId,

        },

      },

    });

  }

  /**
   * Check whether a provider
   * is already linked.
   */
  static async isProviderLinked(
    userId: string,
    provider: string
  ): Promise<boolean> {

    const account =
      await prisma.account.findFirst({

        where: {

          userId,

          provider,

        },

      });

    return Boolean(
      account
    );

  }

  /**
   * Link authentication provider.
   */
  static async createProviderLink(
    data: Prisma.AccountCreateInput
  ) {

    return prisma.account.create({

      data,

    });

  }

  /**
   * Remove linked provider.
   */
  static async unlinkProvider(
    userId: string,
    provider: string
  ) {

    return prisma.account.deleteMany({

      where: {

        userId,

        provider,

      },

    });

  }

}