import type { User } from "@prisma/client";

import { prisma } from "@/lib/prisma";

import {
  DatabaseError,
  DATABASE_ERRORS,
} from "../../shared/errors";

export interface SignupUserCreateData {
  name: string;
  username: string;
  email: string;
  phoneNumber?: string | null;
  password: string;
}

export class SignupRepository {

  /**
   * Check whether an email already exists.
   *
   * Emails are normalized before reaching this
   * repository, but we still normalize here so
   * this repository remains safe on its own.
   */
  static async emailExists(
    email: string,
  ): Promise<boolean> {

    try {
      const normalizedEmail =
        email.trim().toLowerCase();

      const user =
        await prisma.user.findUnique({
          where: {
            email: normalizedEmail,
          },

          select: {
            id: true,
          },
        });

      return user !== null;

    } catch (error) {

      console.error(
        "[SignupRepository] Email lookup failed:",
        error,
      );

      throw new DatabaseError(
        DATABASE_ERRORS.FETCH_FAILED,
      );
    }
  }

  /**
   * Check whether username already exists.
   */
  static async usernameExists(
    username: string,
  ): Promise<boolean> {

    try {
      const normalizedUsername =
        username.trim().toLowerCase();

      const user =
        await prisma.user.findUnique({
          where: {
            username: normalizedUsername,
          },

          select: {
            id: true,
          },
        });

      return user !== null;

    } catch (error) {

      console.error(
        "[SignupRepository] Username lookup failed:",
        error,
      );

      throw new DatabaseError(
        DATABASE_ERRORS.FETCH_FAILED,
      );
    }
  }

  /**
   * Check whether phone number already exists.
   */
  static async phoneExists(
    phoneNumber: string,
  ): Promise<boolean> {

    try {

      const user =
        await prisma.user.findFirst({
          where: {
            phoneNumber,
          },

          select: {
            id: true,
          },
        });

      return user !== null;

    } catch (error) {

      console.error(
        "[SignupRepository] Phone lookup failed:",
        error,
      );

      throw new DatabaseError(
        DATABASE_ERRORS.FETCH_FAILED,
      );
    }
  }

  /**
   * Create a new user.
   */
  static async createUser(
    data: SignupUserCreateData,
  ): Promise<User> {

    try {

      const user =
        await prisma.user.create({
          data: {
            name:
              data.name.trim(),

            username:
              data.username
                .trim()
                .toLowerCase(),

            email:
              data.email
                .trim()
                .toLowerCase(),

            phoneNumber:
              data.phoneNumber ?? null,

            password:
              data.password,

            passwordCreated:
              true,

            profileCompleted:
              false,

            isVerified:
              false,
          },
        });

      return user;

    } catch (error) {

      console.error(
        "[SignupRepository] User creation failed:",
        error,
      );

      throw new DatabaseError(
        DATABASE_ERRORS.CREATE_FAILED,
      );
    }
  }

  /**
   * Find user by ID.
   */
  static async findUserById(
    id: string,
  ): Promise<User | null> {

    try {

      return await prisma.user.findUnique({
        where: {
          id,
        },
      });

    } catch (error) {

      console.error(
        "[SignupRepository] User lookup failed:",
        error,
      );

      throw new DatabaseError(
        DATABASE_ERRORS.FETCH_FAILED,
      );
    }
  }
}