import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import type {
  AuthSession,
} from "./types";

/**
 * Returns authenticated session.
 */

export async function getAuthSession():

Promise<AuthSession | null> {

  const session =
    await getServerSession(
      authOptions
    );

  return session as AuthSession | null;

}