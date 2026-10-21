import { NextResponse } from "next/server";

import type {
  NextRequest,
} from "next/server";

import {
  getToken,
} from "next-auth/jwt";

export async function middleware(
  req: NextRequest
) {
  const token =
    await getToken({
      req,
      secret:
        process.env
          .NEXTAUTH_SECRET,
    });

  const pathname =
    req.nextUrl.pathname;

  const publicRoutes = [
    "/auth/login",
    "/auth/signup",
    "/complete-profile",
  ];

  if (
    publicRoutes.some((r) =>
      pathname.startsWith(r)
    )
  ) {
    return NextResponse.next();
  }

  if (
    token &&
    !token.username
  ) {
    return NextResponse.redirect(
      new URL(
        "/complete-profile",
        req.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico).*)",
  ],
};