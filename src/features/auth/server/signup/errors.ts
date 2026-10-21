/**
 * Signup specific errors.
 */

export class SignupError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "SignupError";
  }
}

export class DuplicateEmailError extends SignupError {
  constructor() {
    super("Email already exists.");
  }
}

export class DuplicateUsernameError extends SignupError {
  constructor() {
    super("Username already exists.");
  }
}

export class DuplicatePhoneError extends SignupError {
  constructor() {
    super("Phone number already exists.");
  }
}

export class PasswordMismatchError extends SignupError {
  constructor() {
    super("Passwords do not match.");
  }
}

export class InvalidSignupDataError extends SignupError {
  constructor(message: string) {
    super(message);
  }
}