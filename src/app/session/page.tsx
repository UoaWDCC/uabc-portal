/**
 * @author Moeka Nakane <mnak534@aucklanduni.ac.nz>
 */

"use client";

import SessionCard from "@/components/SessionCard/SessionCard";
import { SessionCardStatus } from "@/components/SessionCard/SessionCardStatusEnum";
import { useGetSessions } from "@/lib/useQuery/useGetSessions";
import { useEffect } from "react";

export default function SessionPage() {
  const { data } = useGetSessions();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return data ? (
    <div>
      {data.map((session) => {
        return (
          <SessionCard
            key={session.id}
            startDate={new Date(session.bookingOpen)}
            endDate={new Date(session.bookingClose)}
            location={session.location}
            status={SessionCardStatus.DEFAULT}
          />
        );
      })}
    </div>
  ) : null;
}
