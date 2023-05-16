/**
 * @author Moeka Nakane <mnak534@aucklanduni.ac.nz>
 */

import Button from "../Button/Button";
import Card from "../Card/Card"
import CheckMark from "./CheckMark";
import ExpandedSessionCardProps from "./ExpandedSessionCardProps"

// this can be moved to somewhere else
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const ExpandedSessionCard = (props: ExpandedSessionCardProps) => {
    
    // this can be moved to somewhere else
    const dayOfWeek = weekday[props.selectedSessionProps.startdate.getDay()];
    const start_time = props.selectedSessionProps.startdate.toLocaleTimeString([], {timeStyle: 'short'}).toUpperCase();
    const end_time = props.selectedSessionProps.enddate.toLocaleTimeString([], {timeStyle: 'short'}).toUpperCase();

    return (
        <Card className="px-8 py-5 bg-pink-200">
            <p>{dayOfWeek}</p>
            <CheckMark/>
            <p>{props.selectedSessionProps.location}</p>
            <p>---</p>
            <p>Address</p>
            <p>{props.address}</p>
            <p>---</p>
            <p>Time</p>
            <p>{start_time} - {end_time}</p>
            <p className="pt-5 font-medium" onClick={() => alert('BUTTON CLICKED =D') }>Selecte Player Level</p>
        </Card>
    )
}

export default ExpandedSessionCard