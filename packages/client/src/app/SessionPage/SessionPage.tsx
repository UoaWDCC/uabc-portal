/**
 * @author Moeka Nakane <mnak534@aucklanduni.ac.nz>
 */

"use client";

import ExpandedSessionCard from "@/components/SessionCard/ExpandedSessionCard";
import SessionCard from "@/components/SessionCard/SessionCard";
import SessionCardProps from "@/components/SessionCard/SessionCardProps";
import { SessionCardStatus } from "@/components/SessionCard/SessionCardStatusEnum";

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const getDayOfWeek = (startdate : Date) => {
    return weekday[startdate.getDay()];
}
const getStartTime = (startdate: Date) => {
    return startdate.toLocaleTimeString([], {timeStyle: 'short'}).toUpperCase();
}
const getEndTime = (enddate: Date) => {
    return enddate.toLocaleTimeString([], {timeStyle: 'short'}).toUpperCase();
}

export default function SessionPage() {

    const sessions: SessionCardProps[] = [
        {
            dayOfWeek: getDayOfWeek(new Date('2023-05-10T10:30:00')),
            startTime: getStartTime(new Date('2023-05-10T10:30:00')),
            endTime: getEndTime(new Date('2023-05-10T11:30:00')),
            location: "Auckland Badminton Association",
            status: SessionCardStatus.DEFAULT
        },
        {
            dayOfWeek: getDayOfWeek(new Date('2023-05-10T10:30:00')),
            startTime: getStartTime(new Date('2023-05-10T10:30:00')),
            endTime: getEndTime(new Date('2023-05-10T11:30:00')),
            location: "Auckland Badminton Association",
            status: SessionCardStatus.DEFAULT
        }
    ];

    return (
        <div>
            {sessions.map((sessionProps, index) => (
                <SessionCard key={index} {...sessionProps} />
            ))}

            <ExpandedSessionCard 
                selectedSessionProps={sessions[0]}
                address={"99 Gillies Avenue, Epson"} 
            />
        </div>

    )
}