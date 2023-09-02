/**
 * @author Lia Arroyo <liayzabel@gmail.com>
 */

type SendEmailRequest = {
  bookingId: string;
};

import { prisma } from "@/db";
import { Booking, GameSession, User } from "@prisma/client";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { bookingId } = (await request.json()) as SendEmailRequest;

  // get details needed for email
  const booking = (await prisma.booking.findFirstOrThrow({
    where: { id: bookingId },
  })) as Booking;

  const user = (await prisma.user.findFirst({
    where: { id: booking.userId },
  })) as User;

  const gameSession = (await prisma.gameSession.findFirst({
    where: { id: booking.sessionId },
  })) as GameSession;

  // TODO: send email using SendGrid API
}
