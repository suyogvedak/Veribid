import { NextResponse } from "next/server";

import crypto from "crypto";

import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";

export async function POST(
  req: Request
) {
  try {
    const { email } =
      await req.json();

    if (!email) {
      return NextResponse.json(
        {
          error:
            "Email is required",
        },
        {
          status: 400,
        }
      );
    }

    const user =
      await prisma.user.findUnique({
        where: { email },
      });

    if (!user) {
      return NextResponse.json(
        {
          error:
            "No account found with this email",
        },
        {
          status: 404,
        }
      );
    }

    const token =
      crypto
        .randomBytes(32)
        .toString("hex");

    const expires =
      new Date(
        Date.now() +
          1000 *
            60 *
            60
      );

    await prisma.passwordResetToken.create(
      {
        data: {
          email,
          token,
          expires,
        },
      }
    );

    const resetUrl =
      `${process.env.NEXTAUTH_URL}/auth/reset-password/${token}`;

    await resend.emails.send({
      from:
        "VeriBid <onboarding@resend.dev>",

      to: email,

      subject:
        "Reset Your VeriBid Password",

      html: `
      <h2>Password Reset</h2>

      <p>
        Click the link below
        to reset your password.
      </p>

      <a href="${resetUrl}">
        Reset Password
      </a>

      <p>
        This link expires in 1 hour.
      </p>
      `,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}