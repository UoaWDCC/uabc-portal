/**
 * @author Moeka Nakane <mnak534@aucklanduni.ac.nz>
 */

"use client";

import SessionCard from "@/components/SessionCard/SessionCard";

export default function SessionPage() {
    return (
        <div>
            <SessionCard 
                startdate={new Date('2023-05-10T10:30:00')} 
                enddate={new Date('2023-05-10T11:30:00')}
                location={"Auckland Badminton Association"} 
                status={"DEFAULT"} 
                onSelect={() => alert("Clicked card should be in blue")}
                onDisable={() => alert("Disabled card should be in red")}
                onUnavailable={() => alert("Unavilable card should be in grey")}           
            />
        </div>

    )
}