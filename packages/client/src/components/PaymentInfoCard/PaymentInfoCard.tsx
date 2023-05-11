/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import Card from "../Card/Card";
import PaymentInfoCardProps from "./PaymentInfoCardProps";

const PaymentInfoCard = (props: PaymentInfoCardProps) => {
  const dollarAmount = "$" + (Math.round(props.amount * 100) / 100).toFixed(2);

  return (
    <Card className="text-center p-8 pt-12 bg-blue-600 text-white drop-shadow-md">
      <p className="text-blue-100 text-xs">Your total for this session:</p>
      <p className="text-3xl font-bold mb-5">{dollarAmount}</p>
      <p className="text-xs">Casual Badminton Session</p>
    </Card>
  );
};

export default PaymentInfoCard;
