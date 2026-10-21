import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request
) {
  try {
    const { username } =
      await request.json();

    if (!username) {
      return NextResponse.json({
        available: false,
      });
    }

    const existingUser =
      await prisma.user.findUnique({
        where: {
          username,
        },
      });

    return NextResponse.json({
      available: !existingUser,
    });
  } catch {
    return NextResponse.json(
      {
        available: false,
      },
      {
        status: 500,
      }
    );
  }
}