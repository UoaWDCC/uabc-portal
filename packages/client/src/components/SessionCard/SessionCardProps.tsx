/**
 * @author Moeka Nakane <mnak534@aucklanduni.ac.nz>
 */

type SessionCardProps = {
    //props here
    startdate: Date,
    enddate: Date
    location: string,
    
    status: string, //(stuts enum) later

    onSelect: () => void,
    onDisable: () => void,
    onUnavailable: () => void
}

export default SessionCardProps