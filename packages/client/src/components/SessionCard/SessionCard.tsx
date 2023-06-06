/**
 * @author Moeka Nakane <mnak534@aucklanduni.ac.nz>
 */

import Card from '../Card/Card';
import SessionCardProps from './SessionCardProps';
import { SessionCardStatus } from './SessionCardStatusEnum';

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function checkMark(status: SessionCardStatus) {
    return (
        <>
            {status == SessionCardStatus.SELECTED ?
                <div className="absolute right-20">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" width="45" height="45">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                    </svg>
                </div>
                :
                <></>
            }
        </>
    )
}

const SessionCard = (props: SessionCardProps) => {

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

    return (
        <Card className={cardClassName}>
            <p className={dayOfWeekClassName}>{dayOfWeek}</p>
            {checkMark(props.status)}
            <p className={locationClassName}>{props.location}</p>
            <p className={timeClassName}>{start_time} - {end_time}</p>
        </Card>
    )

}

export default SessionCard

