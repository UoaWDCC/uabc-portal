/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

"use client";

import ConfirmationIcon from "@/components/ConfirmationIcon/ConfirmationIcon";
import ConfirmedSessionCard from "@/components/ConfirmedSessionCard/ConfirmedSessionCard";

export default function ConfirmationPage() {
  return (
    <div>
        <div className="bg-blue-100 p-8" style={{borderRadius: '0 0 50% 50%'}}>
            <p className="text-5xl font-bold text-center text-blue-600">UABC</p>
        </div>
        

        <ConfirmationIcon confirmed={true} />

        <div className="bg-blue-600 absolute bottom-0 left-0 w-full">
            <p className="text-white mx-5 mt-5 text-xl font-medium">Rackets at the ready!</p>
            <ConfirmedSessionCard
                weekDay="Wednesday"
                locationName="Auckland Badminton Association"
                address="99 Gillies Avenue, Epsom"
                startTime="5:00PM"
                endTime="7:00PM"
            />
            <ConfirmedSessionCard
                weekDay="Friday"
                locationName="UoA Rec Center"
                address="7 Wynyard Street, Auckland City"
                startTime="7:30PM"
                endTime="10:00PM"
            />
        </div>
    </div>
  )
}