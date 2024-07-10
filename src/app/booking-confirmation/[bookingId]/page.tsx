import Link from "next/link";
import { notFound } from "next/navigation";

import { CartClearer } from "@/components/booking/confirmation/CartClearer";
import ConfirmationMessage from "@/components/booking/confirmation/ConfirmationMessage";
import { ConfirmedSessionCard } from "@/components/booking/confirmation/ConfirmedSessionCard";
import { UabcHeaderText } from "@/components/UabcHeaderText";
import { buttonVariants } from "@/components/ui/button";
import type { CurrentUserProps } from "@/lib/hoc/withCurrentUser";
import withCurrentUser from "@/lib/hoc/withCurrentUser";
import { convertTo12HourFormat, getWeekday } from "@/lib/utils";
import { getBookingBySqid } from "@/services/booking";

export const metadata = {
  title: "Booking Confirmation - UABC Booking Portal",
};

async function ConfirmationPage({
  params,
  currentUser,
}: CurrentUserProps & { params: { bookingId: string } }) {
  const booking = await getBookingBySqid(params.bookingId);

  if (!booking || booking.userId !== currentUser.id) {
    notFound();
  }

  const sessions = booking.bookingDetails.map(
    (bookingDetail) => bookingDetail.gameSession
  );

  return (
    <div className="flex min-h-dvh flex-col">
      <div className="relative flex h-32 items-center justify-center overflow-hidden">
        <div className="absolute -z-10 h-full w-[120%] rounded-b-[50%] bg-secondary md:w-[110%]"></div>
        <Link href="/">
          <UabcHeaderText className="mt-4" />
        </Link>
      </div>

      <div className="mx-4 flex grow flex-col items-center justify-center gap-6 py-10">
        <ConfirmationMessage
          member={booking.isMember}
          email={currentUser.email}
        />
        <Link href="/sessions" className={buttonVariants({ variant: "ghost" })}>
          Return Home
        </Link>
      </div>

      <div className="flex flex-col gap-4 bg-primary p-4 pb-6 pt-5">
        <p className="text-xl font-semibold text-primary-foreground">
          Rackets at the ready!
        </p>
        {sessions.map((session) => (
          <ConfirmedSessionCard
            key={session.id}
            weekDay={getWeekday(session.date)}
            locationName={session.locationName}
            address={session.locationAddress}
            startTime={convertTo12HourFormat(session.startTime)}
            endTime={convertTo12HourFormat(session.endTime)}
          />
        ))}
      </div>
      <CartClearer />
    </div>
  );
}

export default withCurrentUser(ConfirmationPage);
