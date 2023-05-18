/**
 * @author David Zhu <dzhu292@aucklanduni.ac.nz>
 */

"use client";

import Heading from "@/components/Heading/Heading";
import Button from "@/components/Button/Button";
import DebitDetailsCard from "@/components/DebitDetailsCard/DebitDetailsCard";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";

import "scroll-shadow-element";

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

      <scroll-shadow>
        <div className="flex flex-col overflow-y-auto w-full h-[calc(100dvh-334px)] gap-4 px-5">
          <DebitDetailsCard
            title="..."
            text={[
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et tellus blandit, malesuada sapien in, elementum elit. Proin volutpat est erat, a lacinia odio interdum eget. Proin id nulla ipsum. Nulla eu augue sit amet elit sagittis molestie. Fusce dapibus sit amet est vel condimentum. Praesent pellentesque augue augue, eget congue justo maximus ac. Vivamus pulvinar elit nisi. Suspendisse vel nunc urna. In pulvinar ac enim et rhoncus. Nullam felis urna, dignissim vel ante semper, aliquet porta ligula. Pellentesque a lorem vel est congue pellentesque. Phasellus iaculis commodo ultrices. Cras auctor, nisi et tincidunt scelerisque, nibh nulla suscipit elit, id efficitur est enim quis nisl. Donec velit mauris, rhoncus non euismod vel, hendrerit id ligula. Nullam sit amet nunc orci. Donec sed consectetur nulla. Fusce et dui quis lorem molestie consequat nec sit amet risus. In posuere egestas orci ut tincidunt. Fusce posuere orci non justo imperdiet, et viverra augue pharetra. Morbi nunc neque, interdum ac neque nec, eleifend aliquet lacus. Sed sollicitudin augue vitae nisl ultrices vestibulum. Nunc fermentum posuere quam et faucibus. Integer eget maximus ipsum. Nulla sed ipsum non velit varius rutrum. Proin eleifend egestas accumsan.Nullam mollis sem id ex placerat, sit .",
            ]}
          />
        </div>
      </scroll-shadow>

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
