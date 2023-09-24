/**
 * @author Lia Arroyo <liayzabel@gmail.com>
 */

export type SendEmailRequest = {
  bookingId: string;
};

import { prisma } from "@/db";
import { Booking, GameSession, User } from "@prisma/client";
import { Exception } from "@prisma/client/runtime/library";
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

  // sending email using sendgrid
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: "liayzabel@gmail.com",
    from: "uabc@projects.wdcc.co.nz",
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error: Exception) => {
      console.error(error);
    });
}
