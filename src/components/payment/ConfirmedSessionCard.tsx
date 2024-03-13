/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import { Card } from "../Card";

type ConfirmedSessionCardProps = {
  weekDay: string;
  locationName: string;
  address: string;
  startTime: string;
  endTime: string;
};

export const ConfirmedSessionCard = ({
  weekDay,
  locationName,
  address,
  startTime,
  endTime,
}: ConfirmedSessionCardProps) => {
  return (
    <Card className="bg-blue-500 p-5 text-blue-100">
      <p className="font-medium text-white">{weekDay}</p>
      <p className="mb-2 text-sm">{locationName}</p>
      <p className="text-sm">{address}</p>
      <p className="text-sm">
        {startTime} - {endTime}
      </p>
    </Card>
  );
};
