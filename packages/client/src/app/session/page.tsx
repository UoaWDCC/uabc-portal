/**
 * @author Moeka Nakane <mnak534@aucklanduni.ac.nz>
 */

"use client";

import SessionCard from "@/components/SessionCard/SessionCard";
import { SessionCardStatus } from "@/components/SessionCard/SessionCardStatusEnum";
import { useSessions } from "@/useQuery/useSessions";
import { useEffect } from "react";

export default function SessionPage() {

    const { query } = useSessions();

    useEffect(() => {
        console.log(query.data)
    }, [query.data])


    fetch("/api/session")


    return query.data ? (
        <div>
            {
                query.data.map((session) => {
                    return (
                        <SessionCard
                            startdate={new Date(session.bookingOpen)}
                            enddate={new Date(session.bookingClose)}
                            location={session.location}
                            status={SessionCardStatus.DEFAULT}
                        />
                    )
                })
            }
        </div>

    ) : null
}