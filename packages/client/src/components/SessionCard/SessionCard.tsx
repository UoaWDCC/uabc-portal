/**
 * @author Moeka Nakane <mnak534@aucklanduni.ac.nz>
 */

import { useEffect, useState } from 'react';
import Card from '../Card/Card';
import CheckMark from './CheckMark';
import SessionCardProps from './SessionCardProps';
import { SessionCardStatus } from './SessionCardStatusEnum';
import { getClassNames } from './SessionCardStyling';

const SessionCard = (props: SessionCardProps) => {

    const [status, setStatus] = useState(props.status);
    const [className, setClassNames] = useState( {
        cardClassName: "", 
        dayOfWeekClassName: "",
        locationClassName: "",
        timeClassName: ""
    });

    const toggleStatus = () => {
        setStatus(status == SessionCardStatus.SELECTED ? SessionCardStatus.DEFAULT : SessionCardStatus.SELECTED);
    };

    useEffect(() => {
        const updatedClassNames = getClassNames(status);
        setClassNames(updatedClassNames);
    }, [status]);

    return (
        <Card className={className.cardClassName} onClick={toggleStatus}>
            <p className={className.dayOfWeekClassName}>{props.dayOfWeek}</p>
            {status == SessionCardStatus.SELECTED ? <CheckMark/> : <></>}
            <p className={className.locationClassName}>{props.location}</p>
            <p className={className.timeClassName}>{props.startTime} - {props.endTime}</p>
        </Card>
    )
}

export default SessionCard

