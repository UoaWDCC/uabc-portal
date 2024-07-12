import React, {
  createContext,
  useContext,
  type PropsWithChildren,
} from "react";

type GameSessionContextType = {
  date: string;
  canCreate: boolean;
  bookingOpen?: string;
  id?: number;
  startTime?: string;
  endTime?: string;
  locationName?: string;
  locationAddress?: string;
  capacity?: number;
  casualCapacity?: number;
};

const GameSessionContext = createContext<GameSessionContextType>(
  {} as GameSessionContextType
);

export const useGameSessionContext = () => {
  const context = useContext(GameSessionContext);
  if (!context) {
    throw new Error(
      "useGameSessionContext must be used within a GameSessionContextProvider"
    );
  }
  return context;
};

export const GameSessionProvider = ({
  value,
  children,
}: PropsWithChildren<{ value: GameSessionContextType }>) => {
  return (
    <GameSessionContext.Provider value={value}>
      {children}
    </GameSessionContext.Provider>
  );
};
