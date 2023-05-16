/**
 * @author Moeka Nakane <mnak534@aucklanduni.ac.nz>
 */

import Card from "../Card/Card"
import CheckMark from "./CheckMark";
import ExpandedSessionCardProps from "./ExpandedSessionCardProps"

const ExpandedSessionCard = (props: ExpandedSessionCardProps) => {
    
    return (
        <Card className="px-8 py-5 bg-pink-200">
            <p>{props.selectedSessionProps.dayOfWeek}</p>
            <CheckMark/>
            <p>{props.selectedSessionProps.location}</p>
            <p>---</p>
            <p>Address</p>
            <p>{props.address}</p>
            <p>---</p>
            <p>Time</p>
            <p>{props.selectedSessionProps.startTime} - {props.selectedSessionProps.endTime}</p>
            <p className="pt-5 font-medium" onClick={() => alert('BUTTON CLICKED =D') }>Selecte Player Level</p>
        </Card>
    )
}

export default ExpandedSessionCard