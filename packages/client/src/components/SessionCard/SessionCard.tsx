/**
 * @author Moeka Nakane <mnak534@aucklanduni.ac.nz>
 */

import { useState } from 'react';
import Card from '../Card/Card';
import CheckMark from './CheckMark';
import SessionCardProps from './SessionCardProps';
import { SessionCardStatus } from './SessionCardStatusEnum';

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const SessionCard = (props: SessionCardProps) => {

    const [status, setStatus] = useState(props.status);

    const dayOfWeek = weekday[props.startdate.getDay()];
    const start_time = props.startdate.toLocaleTimeString([], {timeStyle: 'short'}).toUpperCase();
    const end_time = props.enddate.toLocaleTimeString([], {timeStyle: 'short'}).toUpperCase();

    let cardClassName = "relative px-8 py-5 ";
    let dayOfWeekClassName = "font-medium text-2xl ";
    let locationClassName = "font-normal text-lg ";
    let timeClassName = "font-normal text-lg pt-2 ";

    // Exact colours to be adjusted
    switch(props.status) {
        case SessionCardStatus.SELECTED:
            cardClassName += "bg-blue-600";
            dayOfWeekClassName += "text-white";
            locationClassName += "text-indigo-200";
            timeClassName += "text-indigo-200";
            break;
        case SessionCardStatus.DISABLED:
            cardClassName += "bg-gray-100";
            dayOfWeekClassName += "text-gray-300";
            locationClassName += "text-gray-300";
            timeClassName += "text-gray-300";
            break;
        case SessionCardStatus.UNAVAILABLE:
            cardClassName += "bg-orange-700";
            dayOfWeekClassName += "text-white";
            locationClassName += "text-rose-200";
            timeClassName += "text-rose-200";
            break;
        default:
            cardClassName += "bg-gray-200";
            locationClassName += "text-gray-500";
            timeClassName += "text-gray-500";
    }

    const toggleStatus = () => {
        setStatus(status == SessionCardStatus.SELECTED ? SessionCardStatus.DEFAULT : SessionCardStatus.SELECTED);
    };

    return (
        <Card className={cardClassName} onClick={toggleStatus}>
            <p className={dayOfWeekClassName}>{dayOfWeek}</p>
            {status == SessionCardStatus.SELECTED ?
                <CheckMark/> : <></>
            }
            <p className={locationClassName}>{props.location}</p>
            <p className={timeClassName}>{start_time} - {end_time}</p>
        </Card>
    )

}

export default SessionCard

