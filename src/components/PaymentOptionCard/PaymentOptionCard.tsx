/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import Card from "../Card/Card";
import PaymentOptionCardProps from "./PaymentOptionCardProps";
import { BsArrowRight } from "react-icons/bs";

const PaymentOptionCard = ({onClick, title, subtitle}: PaymentOptionCardProps) => {
  return (
    <Card onClick={onClick} className="bg-gray-200 p-5 pt-10 relative">
      <p className="font-medium text-xl">{title}</p>
      <p className="font-medium text-gray-500">{subtitle}</p>
      <BsArrowRight className="absolute bottom-5 right-5 text-3xl" />
    </Card>
  );
};

export default PaymentOptionCard;
