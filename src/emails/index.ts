import { MessageRejected, SendEmailCommand, SES } from "@aws-sdk/client-ses";

import { env } from "@/env";

import "server-only";

import { render } from "@react-email/components";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { obfuscateId } from "@/lib/sqid";
import { getBookingBySqid } from "@/services/booking";
import { insertForgotPasswordToken } from "@/services/forgot-password";
import type { User } from "@/types/next-auth";
import CasualBookingConfirmationEmail from "./components/CasualBookingConfirmationEmail";
import ForgotPasswordEmail from "./components/ForgotPasswordEmail";
import MemberApprovalEmail from "./components/MemberApprovalEmail";
import MemberBookingConfirmationEmail from "./components/MemberBookingConfirmationEmail";
import MemberRejectionEmail from "./components/MemberRejectionEmail";
import NoMoreSessionsRemainingEmail from "./components/NoMoreSessionsRemainingEmail";
import VerificationCodeEmail from "./components/VerificationCodeEmail";

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
    ReplyToAddresses: [replyToAddresses ?? env.REPLY_TO],
    Source: env.MAIL_FROM,
  });

  const MAX_RETRIES = 5;
  let retries = 0;
  while (retries < MAX_RETRIES) {
    try {
      await client.send(sendEmailCommand);
      break;
    } catch (error) {
      console.error("Error sending email:", error);
      if (!(error instanceof MessageRejected)) break;
      const waitTime = (Math.pow(2, retries) + 1 * Math.random()) * 1000;
      await new Promise((resolve) => setTimeout(resolve, waitTime));
      retries++;
    }
  }
  if (retries === MAX_RETRIES) {
    console.error(
      "Max retries exceeded. Email send failed for user emails:",
      toAddresses
    );
  }
};

export const sendForgotPasswordEmail = async (user: User, token: string) => {
  await sendEmail({
    toAddresses: [user.email],
    subject: "Booking Confirmation",
    html: render(
      ForgotPasswordEmail({
        firstName: user.firstName!,
        token: token,
      })
    ),
  });
};

export const sendBookingConfirmationEmail = async (
  user: User,
  bookingId: string
) => {
  const booking = await getBookingBySqid(bookingId);

  if (!booking || booking.userId !== user.id)
    throw new Error("Booking not found");

  if (!user.firstName || !user.lastName) return;

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
          firstName: user.firstName,
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
          firstName: user.firstName,
          lastName: user.lastName,
          bookingDetail: bookingDetails[0],
        })
      ),
    });
  }
};

export const sendNoMoreSessionsRemainingEmail = async (user: User) => {
  if (!user.firstName) return;

  await sendEmail({
    toAddresses: [user.email],
    subject: "No More Sessions Available",
    html: render(
      NoMoreSessionsRemainingEmail({
        firstName: user.firstName,
      })
    ),
  });
};

export const sendVerificationCodeEmail = async (
  email: string,
  code: string
) => {
  await sendEmail({
    toAddresses: [email],
    subject: "Your Verification Code",
    html: render(
      VerificationCodeEmail({
        code,
      })
    ),
  });
};

export const sendMemberApprovalEmail = async (
  user: User,
  prepaidSessionCount: number
) => {
  if (!user.firstName) return;

  await sendEmail({
    toAddresses: [user.email],
    subject: "Membership Approved",
    html: render(
      MemberApprovalEmail({
        firstName: user.firstName,
        prepaidSessionCount: prepaidSessionCount,
      })
    ),
  });
};

export const sendMemberRejectionEmail = async (user: User) => {
  if (!user.firstName) return;

  await sendEmail({
    toAddresses: [user.email],
    subject: "Membership Approved",
    html: render(
      MemberRejectionEmail({
        firstName: user.firstName,
      })
    ),
  });
};
