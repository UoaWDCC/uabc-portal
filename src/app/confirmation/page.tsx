/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import ConfirmationIcon from "@/components/ConfirmationIcon/ConfirmationIcon";
import ConfirmedSessionCard from "@/components/ConfirmedSessionCard/ConfirmedSessionCard";
import { getSession } from "next-auth/react";
import Image from "next/image";
import ConfirmationBannerSVG from "public/images/ConfirmationBannerSVG.svg";

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

const confirmed = true;

export default async function ConfirmationPage() {
  // const {data} = useSession();
  // console.log(data)

  const session = await getSession();
  console.log(session);

  return (
    <div className="flex flex-col h-[100dvh]">
      <div className="relative">
        <Image
          src={ConfirmationBannerSVG.src}
          className="w-full"
          alt={"Confirmation Banner"}
        />
        <p className="text-5xl font-bold text-center text-blue-600 z-10 absolute left-0 right-0 top-10">
          UABC
        </p>
      </div>

      <div className="grow flex justify-center items-center my-10 mx-20">
        <ConfirmationIcon confirmed={confirmed} />
      </div>

      <div className="bg-blue-600 overflow-hidden flex flex-col">
        <p className="text-white mx-6 mt-5 mb-3 text-xl font-medium">
          Rackets at the ready!
        </p>
        <div className="overflow-y-scroll max-h-80 flex gap-4 flex-col px-6 pb-4">
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
