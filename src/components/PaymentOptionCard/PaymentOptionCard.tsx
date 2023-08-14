/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import Card from '../Card/Card';
import PaymentOptionCardProps from './PaymentOptionCardProps';
import { BsArrowRight } from 'react-icons/bs';

const PaymentOptionCard = (props: PaymentOptionCardProps) => {

    return (
        <Card onClick={props.onClick} className="bg-gray-200 p-5 pt-10 relative">
            <p className="font-medium text-xl">{props.title}</p>
            <p className="font-medium text-gray-500">{props.subtitle}</p>
            <BsArrowRight className="absolute bottom-5 right-5 text-3xl"/>
        </Card>
    )
}

export default PaymentOptionCard