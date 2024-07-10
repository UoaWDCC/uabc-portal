import { SendEmailCommand, SES } from "@aws-sdk/client-ses";

import { env } from "@/env";

import "server-only";

import { render } from "@react-email/components";

import { getBookingBySqid } from "@/services/booking";
import type { User } from "@/types/next-auth";
import CasualBookingConfirmationEmail from "./components/CasualBookingConfirmationEmail";
import MemberBookingConfirmationEmail from "./components/MemberBookingConfirmationEmail";
import NoMoreSessionsRemainingEmail from "./components/NoMoreSessionsRemainingEmail";

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
  if (env.ENVIRONMENT == "DEVELOPMENT") {
    console.log(
      "Email send request recieved. Skipping email send in development mode."
    );
    return;
  }
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

  const bookingDetails = booking.bookingDetails.map((bookingDetail) => {
    return {
      ...bookingDetail.gameSession,
      playLevel: bookingDetail.playLevel,
    };
  });

  if (user.member) {
    await sendEmail({
      toAddresses: [user.email],
      subject: "Booking Confirmation",
      html: render(
        MemberBookingConfirmationEmail({
          firstName: user.firstName!,
          bookingDetails,
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
          bookingDetail: bookingDetails[0],
        })
      ),
    });
  }
};

export const sendNoMoreSessionsRemainingEmail = async (user: User) => {
  await sendEmail({
    toAddresses: [user.email],
    subject: "No More Sessions Available",
    html: render(
      NoMoreSessionsRemainingEmail({
        firstName: user.firstName!,
      })
    ),
  });
};
