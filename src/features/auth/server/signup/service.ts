import {
  SignupRepository,
} from "./repository";

import {
  SignupValidator,
} from "./validator";

import {
  SignupMapper,
} from "./mapper";

import type {
  SignupRequest,
  SignupResponse,
} from "./types";

import {
  DuplicateEmailError,
  DuplicateUsernameError,
  DuplicatePhoneError,
} from "./errors";

import {
  EmailValidator,
  PhoneValidator,
  UsernameValidator,
} from "../../shared/validators";

import {
  PasswordService,
} from "../password";

export class SignupService {

  static async register(
    request: SignupRequest,
  ): Promise<SignupResponse> {

    // --------------------------------------------
    // Normalize input
    // --------------------------------------------

    const email =
      EmailValidator.normalize(
        request.email,
      );

    const username =
      UsernameValidator.normalize(
        request.username,
      );

    const phone =
      request.phone
        ? PhoneValidator.normalize(
            request.phone,
          )
        : undefined;

    const normalizedRequest: SignupRequest = {
      ...request,

      name:
        request.name.trim(),

      username,

      email,

      phone,
    };

    // --------------------------------------------
    // Validate input
    // --------------------------------------------

    await SignupValidator.validate(
      normalizedRequest,
    );

    // --------------------------------------------
    // EMAIL DUPLICATE CHECK
    // --------------------------------------------

    const emailExists =
      await SignupRepository.emailExists(
        email,
      );

    if (emailExists) {
      throw new DuplicateEmailError();
    }

    // --------------------------------------------
    // USERNAME DUPLICATE CHECK
    // --------------------------------------------

    const usernameExists =
      await SignupRepository.usernameExists(
        username,
      );

    if (usernameExists) {
      throw new DuplicateUsernameError();
    }

    // --------------------------------------------
    // PHONE DUPLICATE CHECK
    // --------------------------------------------

    if (phone) {

      const phoneExists =
        await SignupRepository.phoneExists(
          phone,
        );

      if (phoneExists) {
        throw new DuplicatePhoneError();
      }
    }

    // --------------------------------------------
    // HASH PASSWORD
    // --------------------------------------------

    const hashedPassword =
      await PasswordService.hash(
        normalizedRequest.password,
      );

    // --------------------------------------------
    // CREATE USER
    // --------------------------------------------

    const user =
      await SignupRepository.createUser({

        name:
          normalizedRequest.name,

        username,

        email,

        phoneNumber:
          phone ?? null,

        password:
          hashedPassword,
      });

    // --------------------------------------------
    // MAP RESPONSE
    // --------------------------------------------

    return SignupMapper.toResult(
      user,
    );
  }
}