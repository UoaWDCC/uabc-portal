import { Card } from "@/components/Card";

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
    <Card className="bg-white/10 text-primary-foreground">
      <p className="text-lg font-medium">{weekDay}</p>
      <div className="text-sm text-primary-foreground/70">
        <p className="mb-2">
          {startTime} - {endTime}
        </p>
        <p>{locationName}</p>
        <p>{address}</p>
      </div>
    </Card>
  );
};
