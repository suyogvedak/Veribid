import bcrypt from "bcryptjs";

import { PASSWORD_CONFIG } from "./constants";

export async function hashPassword(
  password: string
) {
  return bcrypt.hash(
    password,
    PASSWORD_CONFIG.SALT_ROUNDS
  );
}

export async function verifyPassword(
  password: string,
  hash: string
) {
  return bcrypt.compare(
    password,
    hash
  );
}