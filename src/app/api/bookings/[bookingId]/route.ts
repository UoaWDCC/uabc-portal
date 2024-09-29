import { NextResponse } from "next/server";

import { responses } from "@/lib/api/responses";
import { userRouteWrapper } from "@/lib/wrappers";
import { getBookingBySqid } from "@/services/booking";

export const GET = userRouteWrapper(
  async (_req, { params }: { params: { bookingId: string } }, currentUser) => {
    const userBooking = await getBookingBySqid(params.bookingId);

    if (!userBooking)
      return responses.notFound({
        resourceType: "booking",
        resourceId: params.bookingId,
      });

    if (userBooking.userId !== currentUser.id) return responses.forbidden();

    return NextResponse.json(userBooking.bookingDetails);
  }
);
