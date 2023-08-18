/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import ConfirmationIconProps from "./ConfirmationIconProps";
import { BsCheckCircle, BsClock } from "react-icons/bs";

const ConfirmationIcon = ({confirmed}: ConfirmationIconProps) => {
  if (confirmed) {
    return (
      <div className="text-center">
        <BsCheckCircle size={120} className="mx-auto text-green-500" />
        <p className="text-lg font-medium">Confirmed</p>
        <p className="text-gray-500">
          A confirmation has been sent to your email.
        </p>
      </div>
    );
  } else {
    return (
      <div className="text-center">
        <BsClock size={120} className="text-yellow-500 mx-auto" />
        <p className="text-lg font-medium">Awaiting Payment</p>
        <p className="text-gray-500">
          A confirmation will be sent to your email once the payment has been
          received
        </p>
      </div>
    );
  }
};

export default ConfirmationIcon;
