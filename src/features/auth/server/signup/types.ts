import type { User } from "@prisma/client";

/**
 * Request payload for registering
 * a new user.
 */
export interface SignupRequest {
  name: string;
  username: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
}

/**
 * Data required to create a user.
 *
 * This represents application-level data,
 * not the Prisma model itself.
 */
export interface CreateUserData {
  name: string;
  username: string;
  email: string;
  phone?: string;
  password: string;
}

/**
 * Public user data returned after signup.
 */
export type SignupUser = Pick<
  User,
  | "id"
  | "name"
  | "username"
  | "email"
  | "profileCompleted"
  | "passwordCreated"
  | "isVerified"
> & {
  phone: string | null;
};

/**
 * Successful signup result.
 */
export interface SignupResult {
  success: true;
  message: string;
  user: SignupUser;
}

/**
 * Failed signup result.
 */
export interface SignupFailure {
  success: false;
  message: string;
  field?: keyof SignupRequest;
}

/**
 * Signup service response.
 */
export type SignupResponse =
  | SignupResult
  | SignupFailure;