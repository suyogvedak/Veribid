import { getServerSession } from "next-auth";
import type { Session } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {
  try {
    const session = (await getServerSession(
      authOptions as any
    )) as Session | null;

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const body = await req.json();

    const {
      username,
      phoneNumber,
      location,
      bio,
    } = body;

    if (!username?.trim()) {
      return NextResponse.json(
        {
          error: "Username is required",
        },
        {
          status: 400,
        }
      );
    }

    if (!phoneNumber?.trim()) {
      return NextResponse.json(
        {
          error:
            "Phone Number is required",
        },
        {
          status: 400,
        }
      );
    }

    if (!location?.trim()) {
      return NextResponse.json(
        {
          error:
            "Location is required",
        },
        {
          status: 400,
        }
      );
    }

    const existing =
      await prisma.user.findFirst({
        where: {
          username,

          NOT: {
            email:
              session.user.email,
          },
        },
      });

    if (existing) {
      return NextResponse.json(
        {
          error:
            "Username already exists",
        },
        {
          status: 400,
        }
      );
    }

    const updatedUser =
      await prisma.user.update({
        where: {
          email:
            session.user.email,
        },

        data: {
          username,
          phoneNumber,
          location,
          bio,

          profileCompleted: true,
        },
      });

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error(
      "COMPLETE PROFILE ERROR:",
      error
    );

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