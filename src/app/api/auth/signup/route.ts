import { NextResponse } from "next/server";

import {
  SignupService,
} from "@/features/auth/server/signup";

import {
  SignupError,
} from "@/features/auth/server/signup/errors";

import {
  ValidationError,
  DatabaseError,
} from "@/features/auth/shared/errors";

import type {
  SignupRequest,
} from "@/features/auth/server/signup";

export async function POST(
  request: Request,
) {
  try {
    // --------------------------------------------
    // Parse request body
    // --------------------------------------------

    const body =
      (await request.json()) as Partial<SignupRequest>;

    // --------------------------------------------
    // Build signup request
    // --------------------------------------------

    const signupRequest: SignupRequest = {
      name:
        typeof body.name === "string"
          ? body.name
          : "",

      username:
        typeof body.username === "string"
          ? body.username
          : "",

      email:
        typeof body.email === "string"
          ? body.email
          : "",

      phone:
        typeof body.phone === "string"
          ? body.phone
          : undefined,

      password:
        typeof body.password === "string"
          ? body.password
          : "",

      confirmPassword:
        typeof body.confirmPassword === "string"
          ? body.confirmPassword
          : "",
    };

    // --------------------------------------------
    // Execute signup workflow
    // --------------------------------------------

    const result =
      await SignupService.register(
        signupRequest,
      );

    // --------------------------------------------
    // Successful registration
    // --------------------------------------------

    return NextResponse.json(
      result,
      {
        status: 201,
      },
    );

  } catch (error: unknown) {

    // --------------------------------------------
    // Signup / business errors
    // --------------------------------------------

    if (
      error instanceof SignupError
    ) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        {
          status: 400,
        },
      );
    }

    // --------------------------------------------
    // Validation errors
    // --------------------------------------------

    if (
      error instanceof ValidationError
    ) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
          field: error.field,
        },
        {
          status: 400,
        },
      );
    }

    // --------------------------------------------
    // Database errors
    // --------------------------------------------

    if (
      error instanceof DatabaseError
    ) {
      console.error(
        "[Signup API] Database error:",
        error,
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to complete registration at this time.",
        },
        {
          status: 500,
        },
      );
    }

    // --------------------------------------------
    // Unexpected errors
    // --------------------------------------------

    console.error(
      "[Signup API] Unexpected error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
}