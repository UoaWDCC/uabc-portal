import { NextResponse } from "next/server";

import { client, createSendEmailCommand } from "@/email";
import { EmailTemplate } from "@/email/templates/BasicEmailTemplate";
import { getCurrentUser } from "@/lib/session";
import { getBookingBySqid } from "@/services/booking";

export async function GET(
  _req: Request,
  { params }: { params: { bookingId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    const booking = await getBookingBySqid(params.bookingId);

    if (!booking || booking.userId !== currentUser?.id) {
      throw new Error("Booking not found");
    }

    const sessions = booking.bookingDetails.map(
      (bookingDetail) => bookingDetail.gameSession
    );

    const sendEmailCommand = createSendEmailCommand({
      toAddress: "user@test.com",
      template: EmailTemplate(!!currentUser!.member, sessions),
    });

    const data = await client.send(sendEmailCommand);
    return NextResponse.json(data);
  } catch (caught) {
    return NextResponse.json(caught, { status: 400 });
  }
}
