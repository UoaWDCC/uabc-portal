/**
 * @author Moeka Nakane <mnak534@aucklanduni.ac.nz>
 */

"use client";

import ExpandedSessionCard from "@/components/SessionCard/ExpandedSessionCard";
import SessionCard from "@/components/SessionCard/SessionCard";
import SessionCardProps from "@/components/SessionCard/SessionCardProps";
import { SessionCardStatus } from "@/components/SessionCard/SessionCardStatusEnum";

export default function SessionPage() {

    const sessions: SessionCardProps[] = [
        {
            startdate: new Date('2023-05-10T10:30:00'), 
            enddate: new Date('2023-05-10T11:30:00'),
            location: "Auckland Badminton Association",
            status: SessionCardStatus.DEFAULT
        },
        {
            startdate: new Date('2023-05-10T10:30:00'), 
            enddate: new Date('2023-05-10T11:30:00'),
            location: "Auckland Badminton Association",
            status: SessionCardStatus.DEFAULT
        }
    ];

    return (
        <div>
            {sessions.map((sessionProps, index) => (
                <SessionCard key={index} {...sessionProps} />
            ))}

            {/* <ExpandedSessionCard 
                selectedSessionProps={selectedSession}
                address={"99 Gillies Avenue, Epson"} 
            /> */}
        </div>

    )
}