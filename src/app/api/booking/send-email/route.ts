/**
 * This endpoint sends an email with the booking details to the user.
 * To use, send a @type SendEmailRequest with the booking ID in the POST request body.
 * @author Lia Arroyo <liayzabel@gmail.com>
 */

export type SendEmailRequest = {
  bookingId: number;
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
    where: { id: booking.gameSessionId },
  })) as GameSession;

  // setting up sendgrid
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour12: true,
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const msg = {
    to: [user.email],
    from: "uabc@projects.wdcc.co.nz",
    subject: `UABC Booking Confirmed for ${user.name}`,
    text: `Thank you, ${
      user.name
    }, for booking a session with UABC! Your booking is confirmed:\n
    Location: ${gameSession.location}\n
    Date: ${gameSession.startTime.toLocaleDateString(
      "en-NZ",
      dateOptions,
    )} ${gameSession.startTime.toLocaleTimeString(
      "en-NZ",
      timeOptions,
    )} - ${gameSession.endTime.toLocaleTimeString("en-NZ", timeOptions)}\n
    Booking made on ${booking.createdAt}.
    `,
  };

  // sending email using sendgrid
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error: any) => {
      console.error(error);
    });
}
