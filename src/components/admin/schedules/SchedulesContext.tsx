import React, {
  createContext,
  useContext,
  type PropsWithChildren,
} from "react";

type ScheduleDetailCardProps = {
  id: number;
  semesterId: number;
  weekday: string;
  startTime: string;
  endTime: string;
  locationName: string;
  locationAddress: string;
  memberCapacity: number;
  casualCapacity: number;
};

const ScheduleContext = createContext<ScheduleDetailCardProps>(
  {} as ScheduleDetailCardProps
);

export const useScheduleContext = () => {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error(
      "useScheduleContext must be used within a ScheduleContextProvider"
    );
  }
  return context;
};

export const ScheduleContextProvider = ({
  value,
  children,
}: PropsWithChildren<{ value: ScheduleDetailCardProps }>) => {
  return (
    <ScheduleContext.Provider value={value}>
      {children}
    </ScheduleContext.Provider>
  );
};
