import React, {
  createContext,
  useContext,
  type PropsWithChildren,
} from "react";

// type GameSessionExists = {
//   exists: true;
//   id: number;
//   bookingOpen: string;
//   bookingClose: string;
//   startTime: string;
//   endTime: string;
//   locationName: string;
//   locationAddress: string;
//   capacity: number;
//   casualCapacity: number;
//   attendees: number;
// };

// type GameSessionContextType = {
//   date: string;
//   exists: boolean;
// } & (GameSessionExists | { exists: false });

type GameSessionContextType = {
  date: string;
  canCreate: boolean;
  bookingOpen?: string;
  bookingClose?: string;
  id?: number;
  startTime?: string;
  endTime?: string;
  locationName?: string;
  locationAddress?: string;
  capacity?: number;
  casualCapacity?: number;
};

const GameSessionContext = createContext<GameSessionContextType>(
  {} as GameSessionContextType,
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
}: PropsWithChildren<{ value: GameSessionContextType }>) => {
  return (
    <GameSessionContext.Provider value={value}>
      {children}
    </GameSessionContext.Provider>
  );
};
