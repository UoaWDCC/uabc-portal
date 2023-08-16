/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import Card from "../Card/Card";
import ConfirmedSessionCardProps from "./ConfirmedSessionCardProps";

const ConfirmedSessionCard = ({weekDay, locationName, address, startTime, endTime}: ConfirmedSessionCardProps) => {
  return (
    <Card className="bg-blue-500 text-blue-100 p-5">
      <p className="text-white font-medium">{weekDay}</p>
      <p className="text-sm mb-2">{locationName}</p>
      <p className="text-sm">{address}</p>
      <p className="text-sm">
        {startTime} - {endTime}
      </p>
    </Card>
  );
};

export default ConfirmedSessionCard;
