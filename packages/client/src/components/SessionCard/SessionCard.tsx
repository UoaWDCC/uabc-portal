/**
 * @author Moeka Nakane <mnak534@aucklanduni.ac.nz>
 */

import Card from '../Card/Card';
import SessionCardProps from './SessionCardProps';

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const SessionCard = (props: SessionCardProps) => {

    const dayOfWeek = weekday[props.startdate.getDay()];
    const start_time = props.startdate.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
    const end_time = props.enddate.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");

    return (
        <Card className="bg-gray-200 px-8 py-5">
            <p className="font-medium text-2xl">{dayOfWeek}</p>
            <p className="font-normal text-gray-500 text-lg">{props.location}</p>
            <p className="font-normal text-gray-500 text-lg pt-2">{start_time} - {end_time}</p>
        </Card>
    )

}

export default SessionCard

