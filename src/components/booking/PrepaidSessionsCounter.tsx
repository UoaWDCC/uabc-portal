import { CountIndicator } from "../CountIndicator";

interface PrepaidSessionsCounterProps {
  remainingSessions: number;
}

export function PrepaidSessionsCounter({
  remainingSessions,
}: PrepaidSessionsCounterProps) {
  return (
    <div className="flex items-center">
      <div className="px-5 text-xs font-medium">
        Prepaid Sessions <br />
        Remaining
      </div>
      <CountIndicator>{remainingSessions}</CountIndicator>
    </div>
  );
}
