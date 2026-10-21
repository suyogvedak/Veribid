import type {
  NextAuthOptions,
} from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { prisma } from "@/lib/prisma";

import {
  PasswordService,
} from "@/features/auth/server/password";

import {
  UserRepository,
} from "@/features/auth/server/session";

import {
  AccountLinkingService,AuthProvider,
} from "@/features/auth/server/accountLinking";

export const authOptions: NextAuthOptions = {

  adapter: PrismaAdapter(prisma),

  session: {

    strategy: "jwt",

  },

  providers: [

    // ======================================================
    // GOOGLE
    // ======================================================

    GoogleProvider({

      clientId:
        process.env.GOOGLE_CLIENT_ID!,

      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET!,

    }),

    // ======================================================
    // EMAIL / PASSWORD
    // ======================================================

    CredentialsProvider({

      name: "Credentials",

      credentials: {

        email: {

          label: "Email",

          type: "email",

        },

        password: {

          label: "Password",

          type: "password",

        },

      },

      async authorize(credentials) {

        if (!credentials) {

          return null;

        }

        const email =
          credentials.email;

        const password =
          credentials.password;

        if (!email || !password) {

          return null;

        }

        const user =
          await UserRepository.findUserByEmail(
            email
          );

        if (!user) {

          return null;

        }

        if (!user.password) {

          /**
           * OAuth user
           * without password.
           */

          return null;

        }

        const valid =
          await PasswordService.verify(

            password,

            user.password

          );

        if (!valid) {

          return null;

        }

        return {

          id:
            user.id,

          email:
            user.email,

          name:
            user.name,

          image:
            user.image,

          username:
            user.username,

          role:
            user.role,

          profileCompleted:
            user.profileCompleted,

          passwordCreated:
            user.passwordCreated,

          isVerified:
            user.isVerified,

        };

      },

    }),

  ],
  callbacks: {

    // ======================================================
    // SIGN IN
    // ======================================================

    async signIn({

      user,

      account,

      profile,

    }) {

      // --------------------------------------------
      // Credentials Login
      // --------------------------------------------

      if (
        account?.provider ===
        "credentials"
      ) {

        return true;

      }

      // --------------------------------------------
      // OAuth Login
      // --------------------------------------------

      if (
        account &&
        profile &&
        profile.email
      ) {

        const result =
          await AccountLinkingService.authenticateOAuth(

            {

              email:
                profile.email,

              name:
                profile.name,

              image:
                user.image,

            },

            {

              provider:
                account.provider as AuthProvider,

              providerAccountId:
                account.providerAccountId,

              type:
                account.type,

            }

          );

        /**
         * Attach latest user
         * information.
         */

        user.id =
          result.user.id;

        user.name =
          result.user.name;

        user.email =
          result.user.email;

        user.image =
          result.user.image;

        return AccountLinkingService.canLogin(
          result
        );

      }

      return true;

    },

    // ======================================================
    // JWT
    // ======================================================

    async jwt({

      token,

      user,

    }) {

      if (user) {

        token.id =
          user.id;

        token.username =
          user.username;

        token.role =
          user.role;

        token.profileCompleted =
          user.profileCompleted;

        token.passwordCreated =
          user.passwordCreated;

        token.isVerified =
          user.isVerified;

      }

      return token;

    },

    // ======================================================
    // SESSION
    // ======================================================

    async session({

      session,

      token,

    }) {

      if (
        session.user
      ) {

        session.user.id =
          token.id;

        session.user.username =
          token.username;

        session.user.role =
          token.role;

        session.user.profileCompleted =
          token.profileCompleted;

        session.user.passwordCreated =
          token.passwordCreated;

        session.user.isVerified =
          token.isVerified;

      }

      return session;

    },

  },
  // ======================================================
  // EVENTS
  // ======================================================

  events: {

    /**
     * New user created.
     */
    async createUser({ user }) {

      console.log(
        "[Auth] User created:",
        user.email
      );

    },

    /**
     * Provider linked.
     */
    async linkAccount({ user, account }) {

      console.log(

        "[Auth] Provider linked:",

        account.provider,

        user.email

      );

    },

    /**
     * Successful sign in.
     */
    async signIn({ user, account }) {

      console.log(

        "[Auth] Login:",

        account?.provider,

        user.email

      );

    },

  },

  // ======================================================
  // CUSTOM PAGES
  // ======================================================

  pages: {

    signIn:
      "/auth/login",

    error:
      "/auth/error",

    verifyRequest:
      "/auth/verify-request",

    newUser:
      "/complete-profile",

  },

  // ======================================================
  // SECURITY
  // ======================================================

  secret:
    process.env.NEXTAUTH_SECRET,

  debug:
    process.env.NODE_ENV ===
    "development",

};