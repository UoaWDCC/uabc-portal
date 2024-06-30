import Link from "next/link";
import { notFound } from "next/navigation";

import ConfirmationMessage from "@/components/booking/confirmation/ConfirmationMessage";
import { ConfirmedSessionCard } from "@/components/booking/confirmation/ConfirmedSessionCard";
import { UabcHeaderText } from "@/components/UabcHeaderText";
import { buttonVariants } from "@/components/ui/button";
import type { CurrentUserProps } from "@/lib/hoc/withCurrentUser";
import withCurrentUser from "@/lib/hoc/withCurrentUser";
import { convertTo12HourFormat, getWeekday } from "@/lib/utils";
import { getBookingBySqid } from "@/services/booking";

async function ConfirmationPage({
  params,
  currentUser,
}: CurrentUserProps & { params: { bookingId: string } }) {
  const booking = await getBookingBySqid(params.bookingId);

  if (!booking || booking.userId !== currentUser.id) {
    notFound();
  }

  const sessions = booking.bookingDetails.map(
    (bookingDetail) => bookingDetail.gameSession,
  );

  return (
    <div className="flex flex-col min-h-dvh">
      <div className="relative h-32 flex justify-center items-center overflow-hidden">
        <div className="absolute bg-secondary h-full w-[120%] md:w-[110%] rounded-b-[50%] -z-10"></div>
        <Link href="/">
          <UabcHeaderText className="mt-4" />
        </Link>
      </div>

      <div className="flex flex-col grow items-center justify-center gap-6 py-10 mx-4">
        <ConfirmationMessage
          member={currentUser.member!}
          email={currentUser.email}
        />
        <Link href="/" className={buttonVariants({ variant: "ghost" })}>
          Return Home
        </Link>
      </div>

      <div className="flex flex-col bg-primary p-4 pt-5 pb-6 gap-4">
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
    </div>
  );
}

export default withCurrentUser(ConfirmationPage);
