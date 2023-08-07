/**
 * @author Moeka Nakane <mnak534@aucklanduni.ac.nz>
 */

"use client";

import SessionCard from "@/components/SessionCard/SessionCard";
import { SessionCardStatus } from "@/components/SessionCard/SessionCardStatusEnum";

export default function SessionPage() {
    return (
        <div>
            <SessionCard 
                startdate={new Date('2023-05-10T10:30:00')} 
                enddate={new Date('2023-05-10T11:30:00')}
                location={"Auckland Badminton Association"} 
                status={SessionCardStatus.DEFAULT} 
            />
            <SessionCard 
                startdate={new Date('2023-05-10T10:30:00')} 
                enddate={new Date('2023-05-10T11:30:00')}
                location={"Auckland Badminton Association"} 
                status={SessionCardStatus.DISABLED} 
            />
            <SessionCard 
                startdate={new Date('2023-05-10T10:30:00')} 
                enddate={new Date('2023-05-10T11:30:00')}
                location={"Auckland Badminton Association"} 
                status={SessionCardStatus.SELECTED} 
            />
            <SessionCard 
                startdate={new Date('2023-05-10T10:30:00')} 
                enddate={new Date('2023-05-10T11:30:00')}
                location={"Auckland Badminton Association"} 
                status={SessionCardStatus.UNAVAILABLE} 
            />
        </div>

    )
}