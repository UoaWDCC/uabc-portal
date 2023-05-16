/**
 * @author Moeka Nakane <mnak534@aucklanduni.ac.nz>
 */

import { SessionCardStatus } from "./SessionCardStatusEnum"

type SessionCardProps = {
    //props here
    dayOfWeek: string,
    startTime: string,
    endTime: string,
    location: string,
    status: SessionCardStatus
}

export default SessionCardProps