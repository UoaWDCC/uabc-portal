import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db";

// @TODO remove this later
import { ObjectId } from "bson";
import type { CheckoutCartItem, Booking } from "@prisma/client";

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
 * Create a new booking from user cart
 */
export async function POST(req: NextRequest) {
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
    include: {
      CheckoutCartItem: {
        include: {
          GameSession: true,
        },
      },
    },
  });

  if (!cart) {
    return NextResponse.json(
      { data: {}, msg: "cart not found" },
      { status: 404 },
    );
  }

  const cartItems = cart.CheckoutCartItem;

  if (!cartItems.length) {
    return NextResponse.json(
      { data: {}, msg: "no cart items found" },
      { status: 404 },
    );
  }

  const newBookings: Booking[] = [];

  for (const cartItem of cartItems) {
    const session = cartItem.GameSession;

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

    // TODO: decide what to do here, make one go through but not the other?
    if (bookingCount >= session.maxUsers) {
      return NextResponse.json(
        { data: {}, msg: "session is full" },
        { status: 404 },
      );
    }

    newBookings.push(
      await prisma.booking.create({
        data: {
          createdAt: new Date(),
          userId,
          sessionId: cartItem.gameSessionId,
          paymentMethod: new ObjectId().toString(), //TODO: add payment method enum
          status: "pending", // TODO: add status enum
        },
      }),
    );
  }

  return NextResponse.json({ data: newBookings });
}
