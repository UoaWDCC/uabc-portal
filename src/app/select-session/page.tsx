/**
 * @author David Zhu <dzhu292@aucklanduni.ac.nz>
 */

"use client";

import Heading from "@/components/Heading/Heading";
import Button from "@/components/Button/Button";
import { useEffect, useState, useRef, ChangeEvent } from "react";
import { CgProfile } from "react-icons/cg";
import { AiFillCaretDown } from "react-icons/ai";

import SessionCard from "@/components/SessionCard/SessionCard";
import { SessionCardStatus } from "@/components/SessionCard/SessionCardStatusEnum";
import SessionCardProps from "@/components/SessionCard/SessionCardProps";
import ScrollShadow from "@/components/ScrollShadow";
import { twJoin } from "tailwind-merge";
import { useQuery } from "@tanstack/react-query";
import type { GameSession } from "@prisma/client";

export default function SelectSessionPage() {
  const remainingSessions = 11;
  const isMember = true;
  const firstName = "David";

  const { data } = useQuery(['current-sessions'], async () => {
    const response = await fetch('api/session/current', {cache: 'no-store'})
    return await response.json()
  })

  const queriedSessions : SessionCardProps[] | undefined = data?.map((session: GameSession) => {
    const startDate = session.dateTime
    const endDate = session.dateTime
    endDate.setHours(endDate.getHours() + 1); //TODO: confirm
    return {
      startDate,
      endDate,
      location: session.location,
      status: SessionCardStatus.DEFAULT,
  }})

  const sessions: SessionCardProps[] = [
    {
      startDate: new Date("2023-05-10T10:30:00"),
      endDate: new Date("2023-05-10T11:30:00"),
      location: "Auckland Badminton Association",
      status: SessionCardStatus.DEFAULT,
    },
    {
      startDate: new Date("2023-05-10T10:30:00"),
      endDate: new Date("2023-05-10T11:30:00"),
      location: "Auckland Badminton Association",
      status: SessionCardStatus.DISABLED,
    },
    {
      startDate: new Date("2023-05-10T10:30:00"),
      endDate: new Date("2023-05-10T11:30:00"),
      location: "Auckland Badminton Association",
      status: SessionCardStatus.DEFAULT,
    },
    {
      startDate: new Date("2023-05-10T10:30:00"),
      endDate: new Date("2023-05-10T11:30:00"),
      location: "Auckland Badminton Association",
      status: SessionCardStatus.DEFAULT,
    },
    {
      startDate: new Date("2023-05-10T10:30:00"),
      endDate: new Date("2023-05-10T11:30:00"),
      location: "Auckland Badminton Association",
      status: SessionCardStatus.DEFAULT,
    },
  ];

  const maxSessions: number = isMember ? 2 : 1;
  const [isOverflown, setIsOverflown] = useState(false);

  const [session, setSession] = useState<SessionCardProps[]>(sessions);
  const [sessionsSelected, setSessionsSelected] = useState(0);
  const [shake, setShake] = useState(false);
  const [scrollIndicator, setScrollIndicator] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  /**Changes the status of the card on click conditionally
   * If number of cards active exceeds the allowed amount, plays error animation
   */
  function sessionClick(e: ChangeEvent<HTMLInputElement>, index: number) {
    if (e.target.checked && sessionsSelected === maxSessions) {
      e.currentTarget.checked = false;
      setShake(true);
      setTimeout(() => {
        setShake(false);
      }, 480);
    } else {
      let tempArray = [...session];
      tempArray[index].status = e.target.checked
        ? SessionCardStatus.SELECTED
        : SessionCardStatus.DEFAULT;
      setSession(tempArray);
    }
  }

  /**On status change, changes the counter of number of sessions selected*/
  useEffect(() => {
    const numberActive = session.filter((card: SessionCardProps) => {
      if (card.status === SessionCardStatus.SELECTED) {
        return true;
      } else {
        return false;
      }
    }).length;
    setSessionsSelected(numberActive);
  }, [session]);

  /**Doesn't show bouncing arrow on load if there is no overflow */
  useEffect(() => {
    setTimeout(() => {
      if (ref.current && ref.current.scrollHeight > ref.current.clientHeight) {
        setIsOverflown(true);
      }
    }, 200);
  });

  return (
    <div className="h-[100dvh] flex flex-col">
      <div className="pt-5 pb-5 pl-7 flex">
        <Heading>Sessions</Heading>
        <CgProfile
          className="ml-auto mr-4"
          size={30}
          onClick={() => alert("profile")}
        ></CgProfile>
      </div>
      <div
        className={twJoin(
          "bg-[#EAEEF3] min-h-[66px] flex",
          !isMember && "justify-center",
        )}
      >
        <p className="p-5 text-md flex items-center font-medium">
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
        className={twJoin(
          "flex min-h-[76px] p-5 items-center",
          !isMember && "justify-center text-center",
        )}
      >
        <p className={`max-w-[70%] text-s leading-5 font-medium`}>
          Please select a badminton session for this week
        </p>
        {isMember && (
          <div className="flex grow flex-row-reverse">
            <p
              className={twJoin(
                "flex items-center justify-center rounded bg-[#D9D9D9] h-[34px] w-[63px] font-semibold",
                shake &&
                  "error-shake text-[#AF3737] border-[#AF3737] border-solid border",
              )}
            >
              {sessionsSelected} / {maxSessions}
            </p>
          </div>
        )}
      </div>

      {/* TODO: check whether to use this or mask */}
      <ScrollShadow>
      <div
        // scroll-fade py-4
        className="flex flex-col overflow-y-auto w-full h-[calc(100dvh-329px)] gap-3 px-5"
        onScroll={(e) => setScrollIndicator(false)}
        ref={ref}
      >
        {session.map((card, index) => {
          return (
            <SessionCard
              startDate={card.startDate}
              endDate={card.endDate}
              location={card.location}
              status={card.status}
              key={index}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                sessionClick(e, index)
              }
            ></SessionCard>
          );
        })}
      </div>
      </ScrollShadow>

      {scrollIndicator && isOverflown && (
        <AiFillCaretDown
          className="absolute bottom-[105px] w-full z-10 opacity-20 animate-bounce pointer-events-none"
          size={80}
        />
      )}

      <div className="flex justify-center mt-5 mb-10">
        <Button
          label="next"
          disabled={
            sessionsSelected <= maxSessions && sessionsSelected > 0
              ? false
              : true
          }
          onClick={() => alert("NEXT")}
        />
      </div>
    </div>
  );
}
