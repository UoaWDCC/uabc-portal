import React, {
  createContext,
  useContext,
  type PropsWithChildren,
} from "react";

type GameSessionResponse = {
  date: string;
  id?: number | undefined;
  startTime?: string | undefined;
  endTime?: string | undefined;
  locationName?: string | undefined;
  locationAddress?: string | undefined;
  capacity?: number | undefined;
  casualCapacity?: number | undefined;
};

const GameSessionContext = createContext<GameSessionResponse>(
  {} as GameSessionResponse,
);

export const useGameSessionContext = () => {
  const context = useContext(GameSessionContext);
  if (!context) {
    throw new Error(
      "useGameSessionContext must be used within a GameSessionContextProvider",
    );
  }
  return context;
};

export const GameSessionProvider = ({
  value,
  children,
}: PropsWithChildren<{ value: GameSessionResponse }>) => {
  return (
    <GameSessionContext.Provider value={value}>
      {children}
    </GameSessionContext.Provider>
  );
};
