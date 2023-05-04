/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import Card from '../Card/Card';
import SessionInfoCardProps from './SessionInfoCardProps';

const SessionInfoCard = (props: SessionInfoCardProps) => {

    return (
        <Card className="bg-blue-500 text-blue-100 p-5">
            <p className="text-white font-medium">{props.weekDay}</p>
            <p className="text-sm mb-2">{props.locationName}</p>
            <p className="text-sm">{props.address}</p>
            <p className="text-sm">{props.startTime} - {props.endTime}</p>
        </Card>
    )
}

export default SessionInfoCard