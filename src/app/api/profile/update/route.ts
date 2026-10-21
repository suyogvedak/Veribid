import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request
) {
  try {
    const session =
        (await getServerSession(
        authOptions as any
        )) as any;

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

    const body =
      await request.json();

    const {
      name,
      username,
      phoneNumber,
      location,
      bio,
    } = body;

    const user =
      await prisma.user.update({
        where: {
          email:
            session.user.email,
        },

        data: {
          name,
          username,
          phoneNumber,
          location,
          bio,
        },
      });

    return NextResponse.json(
      user
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Failed to update profile",
      },
      {
        status: 500,
      }
    );
  }
}