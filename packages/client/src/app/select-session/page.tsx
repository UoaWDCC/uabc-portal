/**
 * @author David Zhu <dzhu292@aucklanduni.ac.nz>
 */

"use client";

import Heading from "@/components/Heading/Heading";
import Button from "@/components/Button/Button";
import DebitDetailsCard from "@/components/DebitDetailsCard/DebitDetailsCard";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";

export default function SelectSessionPage() {
  const remainingSessions: number = 11;
  const isMember: boolean = true;
  const firstName: string = "David";
  const [sessionsSelected, setSessionsSelected] = useState(0);

  return (
    <div className="h-[100dvh] flex flex-col">
      <div className="pt-10 pb-5 pl-7 flex">
        <Heading>Sessions</Heading>
        <CgProfile
          className="ml-auto mr-4"
          size={30}
          onClick={() => alert("profile")}
        ></CgProfile>
      </div>
      <div
        className={`bg-[#EAEEF3] min-h-[66px] flex ${
          !isMember && "justify-center"
        }`}
      >
        <p className="p-5 text-md flex items-center">
          Hey {isMember ? firstName : "Guest"}!
        </p>
        {isMember && (
          <p className="text-xs flex flex-row-reverse grow items-center">
            Prepaid Sessions <br />
            Remaining
          </p>
        )}
        {isMember && (
          <p className="flex m-4 justify-center items-center rounded bg-[#D9D9D9] h-[34px] w-[34px]">
            {remainingSessions}
          </p>
        )}
      </div>
      <div
        className={`flex min-h-[76px] p-5 items-center ${
          !isMember && "justify-center text-center"
        }`}
      >
        <p className={`max-w-[70%] text-s leading-5`}>
          Please select a badminton session for this week
        </p>
        {isMember && (
          <div className="flex grow flex-row-reverse">
            <p className="flex items-center justify-center rounded bg-[#D9D9D9] h-[34px] w-[63px] font-semibold">
              {sessionsSelected} / 2
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-col-reverse grow overflow-y-auto w-full gap-4 bg-bottom px-5 justify-center">
        <DebitDetailsCard
          title="..."
          text={[
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et tellus blandit, malesuada sapien in, elementum elit. Proin volutpat est erat, a lacinia odio interdum eget. Proin id nulla ipsum. Nulla eu augue sit amet elit sagittis molestie. Fusce dapibus sit amet est vel condimentum. Praesent pellentesque augue augue, eget congue justo maximus ac. Vivamus pulvinar elit nisi. Suspendisse vel nunc urna. In pulvinar ac enim et rhoncus. Nullam felis urna, dignissim vel ante semper, aliquet porta ligula. Pellentesque a lorem vel est congue pellentesque. Phasellus iaculis commodo ultrices. Cras auctor, nisi et tincidunt scelerisque, nibh nulla suscipit elit, id efficitur est enim quis nisl. Donec velit mauris, rhoncus non euismod vel, hendrerit id ligula. Nullam sit amet nunc orci. Donec sed consectetur nulla. Fusce et dui quis lorem molestie consequat nec sit amet risus. In posuere egestas orci ut tincidunt. Fusce posuere orci non justo imperdiet, et viverra augue pharetra. Morbi nunc neque, interdum ac neque nec, eleifend aliquet lacus. Sed sollicitudin augue vitae nisl ultrices vestibulum. Nunc fermentum posuere quam et faucibus. Integer eget maximus ipsum. Nulla sed ipsum non velit varius rutrum. Proin eleifend egestas accumsan.Nullam mollis sem id ex placerat, sit amet dictum nunc dictum. Phasellus ut purus id erat elementum vehicula nec vitae est. Cras tristique, lacus vitae aliquet pharetra, massa enim laoreet ligula, sollicitudin dignissim quam metus id turpis. Mauris consectetur ultrices bibendum. Praesent non ultrices massa. Nulla ultricies finibus erat, eget tristique arcu. Praesent porttitor faucibus neque at luctus. Curabitur scelerisque quis velit non rutrum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas consequat diam et vehicula pretium. Duis mollis elit vel porta viverra. Nam felis dui, tempus ac imperdiet vel, porta sit amet enim. Phasellus sit amet facilisis urna. Morbi varius elementum lorem id tempor. Fusce tellus enim, elementum ac sagittis quis, vehicula malesuada diam. Interdum et malesuada fames ac ante ipsum primis in faucibus.Praesent dignissim erat sit amet lectus mollis, ac condimentum nisi faucibus. Vivamus fermentum, lectus id facilisis volutpat, orci eros bibendum orci, vitae luctus dolor tortor ac diam. In hac habitasse platea dictumst. Nulla non leo sed lacus molestie pharetra. Pellentesque ullamcorper commodo nunc, nec congue mauris euismod sed. Duis ornare luctus maximus. Sed a urna ac erat porta condimentum non in ex. Curabitur at purus.",
          ]}
        />
      </div>
      <div className="flex justify-center mt-5 mb-10">
        <Button
          label="next"
          disabled={sessionsSelected == 2 ? false : true}
          onClick={() => alert("NEXT")}
        />
      </div>
    </div>
  );
}
