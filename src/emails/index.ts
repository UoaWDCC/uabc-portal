import { SendEmailCommand, SES } from "@aws-sdk/client-ses";

import { env } from "@/env";

import "server-only";

import { render } from "@react-email/components";

import { getBookingBySqid } from "@/services/booking";
import type { User } from "@/types/next-auth";
import CasualBookingConfirmationEmail from "./components/CasualBookingConfirmationEmail";
import MemberBookingConfirmationEmail from "./components/MemberBookingConfirmationEmail";

const SES_CONFIG = {
  credentials: {
    accessKeyId: env.SES_ACCESS_KEY,
    secretAccessKey: env.SES_SECRET_ACCESS_KEY,
  },
  region: env.AWS_REGION,
};

export const client = new SES(SES_CONFIG);

interface SendEmailDataProps {
  toAddresses: string[];
  replyToAddresses?: string;
  subject: string;
  html: string;
}

export const sendEmail = async ({
  toAddresses,
  replyToAddresses,
  subject,
  html,
}: SendEmailDataProps) => {
  const sendEmailCommand = new SendEmailCommand({
    Destination: {
      ToAddresses: toAddresses,
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: html,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    ReplyToAddresses: [replyToAddresses ?? env.SENDER_EMAIL_ADDRESS],
    Source: env.SENDER_EMAIL_ADDRESS,
  });

  await client.send(sendEmailCommand);
};

export const sendBookingConfirmationEmail = async (
  user: User,
  bookingId: string
) => {
  const booking = await getBookingBySqid(bookingId);

  if (!booking || booking.userId !== user.id)
    throw new Error("Booking not found");

  const gameSessions = booking.bookingDetails.map(
    (bookingDetail) => bookingDetail.gameSession
  );

  if (user.member) {
    await sendEmail({
      toAddresses: [user.email],
      subject: "Booking Confirmation",
      html: render(
        MemberBookingConfirmationEmail({
          firstName: user.firstName!,
          bookingDetails: gameSessions,
        })
      ),
    });
  } else {
    await sendEmail({
      toAddresses: [user.email],
      subject: "Booking Confirmation",
      html: render(
        CasualBookingConfirmationEmail({
          firstName: user.firstName!,
          bookingDetail: gameSessions[0],
        })
      ),
    });
  }
};
