import type { GameSessionDto } from "@/types/game-session";
import { Card } from "../Card";
import { LevelSelector } from "./LevelSelector";

interface ExpandedSessionCardProps {
  gameSession: GameSessionDto;
}

export const ExpandedSessionCard = ({
  gameSession,
}: ExpandedSessionCardProps) => (
  <Card className="text-sm">
    <div className="rounded-t-md bg-primary px-6 py-4 drop-shadow-lg">
      <p className="text-lg text-primary-foreground">{gameSession.weekday}</p>
      <p className="text-primary-foreground/70">{gameSession.locationName}</p>
    </div>
    <div className="bg-secondary p-6">
      <p className="text-tertiary font-semibold">Address</p>
      <p className="text-tertiary/70">{gameSession.locationAddress}</p>
      <br />
      <p className="text-tertiary font-semibold">Time</p>
      <p className="uppercase text-tertiary/70">
        {gameSession.startTime} - {gameSession.endTime}
      </p>
    </div>
    <LevelSelector id={gameSession.id} playLevel={gameSession.playLevel} />
  </Card>
);
