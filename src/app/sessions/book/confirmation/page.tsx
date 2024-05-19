/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import { ConfirmationBanner } from "@/components/Icons";
import { ConfirmationIcon } from "@/components/payment/ConfirmationIcon";
import { ConfirmedSessionCard } from "@/components/payment/ConfirmedSessionCard";
import { convertTo12HourFormat } from "@/lib/utils";

const sessions = [
  {
    id: 0,
    weekDay: "Wednesday",
    locationName: "Auckland Badminton Association",
    address: "99 Gillies Avenue, Epsom",
    startTime: "17:00:00",
    endTime: "19:00:00",
  },
  {
    id: 1,
    weekDay: "Friday",
    locationName: "UoA Rec Center",
    address: "7 Wynyard Street, Auckland City",
    startTime: "19:30:00",
    endTime: "22:00:00",
  },
];

const confirmed = false;

export default async function ConfirmationPage() {
  return (
    <div className="flex h-dvh flex-col">
      <div className="relative">
        <ConfirmationBanner className="w-full" />

        <p className="absolute inset-x-0 top-10 z-10 text-center text-5xl font-bold text-blue-600">
          UABC
        </p>
      </div>

      <div className="mx-20 my-10 flex grow items-center justify-center">
        <ConfirmationIcon confirmed={confirmed} />
      </div>

      <div className="flex flex-col overflow-hidden bg-blue-600">
        <p className="mx-6 mb-3 mt-5 text-xl font-medium text-white">
          Rackets at the ready!
        </p>
        <div className="flex max-h-80 flex-col gap-4 overflow-y-scroll px-6 pb-4">
          {sessions.map((session) => {
            return (
              <ConfirmedSessionCard
                key={session.id}
                weekDay={session.weekDay}
                locationName={session.locationName}
                address={session.address}
                startTime={convertTo12HourFormat(session.startTime)}
                endTime={convertTo12HourFormat(session.endTime)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
