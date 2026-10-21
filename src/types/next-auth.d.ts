import { DefaultSession, DefaultUser } from "next-auth";
import type { UserRole } from "@prisma/client";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {

  interface Session {

    user: {

      id: string;

      username: string | null;

      role: UserRole;

      profileCompleted: boolean;

      passwordCreated: boolean;

      isVerified: boolean;

    } & DefaultSession["user"];

  }

  interface User extends DefaultUser {

    id: string;

    username: string | null;

    role: UserRole;

    profileCompleted: boolean;

    passwordCreated: boolean;

    isVerified: boolean;

  }

}

declare module "next-auth/jwt" {

  interface JWT extends DefaultJWT {

    id: string;

    username: string | null;

    role: UserRole;

    profileCompleted: boolean;

    passwordCreated: boolean;

    isVerified: boolean;

  }

}