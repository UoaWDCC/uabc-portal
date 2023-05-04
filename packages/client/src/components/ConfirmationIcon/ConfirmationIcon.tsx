/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import ConfirmationIconProps from './ConfirmationIconProps';
import { BsCheckCircle, BsClock } from 'react-icons/bs';

const ConfirmationIcon = (props: ConfirmationIconProps) => {
    if (props.confirmed) {
        return (
            <div className="text-center my-5 mx-20">
                <BsCheckCircle size={120} className="mx-auto text-green-500"/>
                <p className="text-lg font-medium">Confirmed</p>
                <p className="text-gray-500">A confirmation has been sent to your email.</p>
            </div>
        )
    } else {
        return (
            <div className="text-center my-5 mx-20">
                <BsClock size={120} className="text-yellow-500 mx-auto"/>
                <p className="text-lg font-medium">Awaiting confirmation</p>
            </div>
        )
    }
}

export default ConfirmationIcon