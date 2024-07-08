import { NextResponse } from "next/server";

import { client, createSendEmailCommand } from "@/email";
import { BookingEmailTemplate } from "@/email/templates/BookingEmailTemplate";
import { getCurrentUser } from "@/lib/session";
import { getBookingBySqid } from "@/services/booking";

export async function sendBookingConfirmationEmail(bookingId: string) {
  try {
    const currentUser = await getCurrentUser();
    const booking = await getBookingBySqid(bookingId);

    if (!booking || booking.userId !== currentUser?.id) {
      throw new Error("Booking not found");
    }

    const sessions = booking.bookingDetails.map(
      (bookingDetail) => bookingDetail.gameSession
    );

    const sendEmailCommand = createSendEmailCommand({
      toAddress: currentUser.email,
      template: BookingEmailTemplate(
        currentUser.firstName ?? "there",
        !!currentUser.member,
        sessions
      ),
    });

    const data = await client.send(sendEmailCommand);
    return NextResponse.json(data);
  } catch (caught) {
    return NextResponse.json(caught, { status: 400 });
  }
}
