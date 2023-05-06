/**
 * @author David Zhu <dzhu292@aucklanduni.ac.nz>
 */

import Card from '../Card/Card';
import DebitDetailsCardProps from './DebitDetailsCardProps';
import { MdContentCopy } from 'react-icons/md';


const DebitDetailsCard = (props: DebitDetailsCardProps) => {
    const body = props.text.map((text, index) => 
        <p className="font-normal text-gray-500" key={index}>{text}</p>); // TODO: redundant
    if (typeof(props.sessionId) != "undefined") {
        body.push(<br/>,
        <p className="font-normal text-gray-500 inline">SessionID: </p>, // TODO: try not to use this
        <p className="font-bold text-gray-500 inline">{props.sessionId}</p>)
    }
    if (typeof(props.copy) != "undefined") { // dont need bg-change for mobile devices but can be used for desktop
        body.push(
            <button onPointerDown={props.onClick} className="absolute right-4 top-1/2 translate-y-[-50%] p-2 rounded-lg active:bg-gray-300">
                <MdContentCopy className="text-3xl"/>
            </button>
        )
    }
    return (
        <Card className="bg-gray-200 p-5 pt-50 relative">
            <p className="font-medium text-xl top-5">{props.title}</p>
            {body}
        </Card>
    )
}

export default DebitDetailsCard