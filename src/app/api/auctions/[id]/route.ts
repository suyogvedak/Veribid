import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: Request,
  { params }: RouteContext,
) {
  try {
    const { id } = await params;

    const auction = await prisma.auction.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        category: true,
        startingPrice: true,
        currentPrice: true,
        status: true,
        endDate: true,
        createdAt: true,
        seller: {
          select: {
            name: true,
            username: true,
          },
        },
        _count: {
          select: { bids: true },
        },
        bids: {
          orderBy: { createdAt: "desc" },
          take: 20,
          select: {
            id: true,
            amount: true,
            createdAt: true,
            user: {
              select: {
                name: true,
                username: true,
              },
            },
          },
        },
      },
    });

    if (!auction) {
      return NextResponse.json(
        { message: "Auction not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ auction });
  } catch (error) {
    console.error("GET_AUCTION_DETAILS_ERROR:", error);

    return NextResponse.json(
      { message: "Unable to load auction details." },
      { status: 500 },
    );
  }
}
