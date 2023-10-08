import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db";

// @TODO remove this later
import { ObjectId } from "bson";

/**
 * Get booking by id
 */
export async function GET(request: NextRequest) {
  const bookingId = request.nextUrl.searchParams.get("id");

  if (!bookingId) {
    return NextResponse.json(
      { data: {}, msg: "No id provided in the request" },
      { status: 404 },
    );
  }

  const booking = await prisma.booking.findFirst({ where: { id: bookingId } });

  if (!booking) {
    return NextResponse.json(
      { data: {}, msg: `no booking found for id: ${bookingId}` },
      { status: 404 },
    );
  }

  return NextResponse.json({ data: booking });
}

/**
 * Create a new booking
 */
export async function POST(req: NextRequest) {
  // @TODO auth users
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json(
      { data: {}, msg: "No userId provided in the request" },
      { status: 404 },
    );
  }

  const cart = await prisma.checkoutCart.findFirst({
    where: {
      userId,
    },
  });

  if (!cart) {
    return NextResponse.json(
      { data: {}, msg: "cart not found" },
      { status: 404 },
    );
  }

  const cartItems = await prisma.checkoutCartItem.findMany({
    where: {
      checkoutCartId: cart.id,
    },
  });

  if (!cartItems.length) {
    return NextResponse.json(
      { data: {}, msg: "no cart items found" },
      { status: 404 },
    );
  }

  const newBookings = [];

  for (const cartItem of cartItems) {
    const session = await prisma.gameSession.findFirst({
      where: {
        id: cartItem.gameSessionId,
      },
    });

    if (!session) {
      return NextResponse.json(
        { data: {}, msg: "session not found" },
        { status: 404 },
      );
    }
    const bookingCount = await prisma.booking.count({
      where: {
        sessionId: cartItem.gameSessionId,
      },
    });

    // TODO: decide what to do here, make one go through but not the other?
    if (bookingCount >= session.maxUsers) {
      return NextResponse.json(
        { data: {}, msg: "session is full" },
        { status: 404 },
      );
    }

    const booking = await prisma.booking.findFirst({
      where: {
        sessionId: cartItem.gameSessionId,
        userId: userId,
      },
    });

    if (booking) {
      return NextResponse.json(
        { data: {}, msg: "session already booked" },
        { status: 404 },
      );
    }

    newBookings.push(
      await prisma.booking.create({
        data: {
          createdAt: new Date(),
          userId,
          sessionId: cartItem.gameSessionId,
          paymentMethod: new ObjectId().toString(),
          status: "pending",
        },
      }),
    );
  }

  return NextResponse.json({ data: newBookings });
}
