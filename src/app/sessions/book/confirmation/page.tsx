/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import { ConfirmationIcon } from "@/components/payment/ConfirmationIcon";
import { ConfirmedSessionCard } from "@/components/payment/ConfirmedSessionCard";
import { ConfirmationBanner } from "@/lib/Icons";

const sessions = [
  {
    id: 0,
    weekDay: "Wednesday",
    locationName: "Auckland Badminton Association",
    address: "99 Gillies Avenue, Epsom",
    startTime: "5:00PM",
    endTime: "7:00PM",
  },
  {
    id: 1,
    weekDay: "Friday",
    locationName: "UoA Rec Center",
    address: "7 Wynyard Street, Auckland City",
    startTime: "7:30PM",
    endTime: "10:00PM",
  },
];

const confirmed = false;

export default async function ConfirmationPage() {
  return (
    <div className="flex h-[100dvh] flex-col">
      <div className="relative">
        <ConfirmationBanner className="w-full" />

        <p className="absolute left-0 right-0 top-10 z-10 text-center text-5xl font-bold text-blue-600">
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
                startTime={session.startTime}
                endTime={session.endTime}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
