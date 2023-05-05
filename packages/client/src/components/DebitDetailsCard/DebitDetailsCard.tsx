/**
 * @author David Zhu <dzhu292@aucklanduni.ac.nz>
 */

import Card from '../Card/Card';
import DebitDetailsCardProps from './DebitDetailsCardProps';
import { MdContentCopy } from 'react-icons/md';


const DebitDetailsCard = (props: DebitDetailsCardProps) => {
    const body = props.text.map((text) => 
    <p className="font-normal text-gray-500">{text}</p>);
    if (props.sessionId) {
        body.push(<br/>, 
        <p className="font-normal text-gray-500 inline">SessionID: </p>, 
        <p className="font-bold text-gray-500 inline">{props.sessionId}</p>)
    }
    if (props.copy) {
        body.push(<MdContentCopy className="absolute right-5 bottom-7 text-3xl"/>)
    }
    return (
        <Card onClick={props.onClick} className="bg-gray-200 p-5 pt-5 relative">
            <p className="font-medium text-xl top-5">{props.title}</p>
            {body}
        </Card>
    )
}

export default DebitDetailsCard