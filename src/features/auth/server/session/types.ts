import type { Session } from "next-auth";

import type {
  User,
  UserRole,
} from "@prisma/client";

export interface AuthSession
  extends Session {
  user: Session["user"] & {
    id: string;

    username?: string | null;

    role: UserRole;
  };
}

export interface AuthPermissions {
  authenticated: boolean;

  verified: boolean;

  profileCompleted: boolean;

  passwordCreated: boolean;

  admin: boolean;
}

export interface CurrentAuth {
  session: AuthSession;

  user: User;

  permissions: AuthPermissions;
}