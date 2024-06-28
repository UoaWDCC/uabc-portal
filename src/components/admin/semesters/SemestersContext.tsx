import React, { createContext, type PropsWithChildren } from "react";

type SemesterDetailCardProps = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  breakStart: string;
  breakEnd: string;
  bookingOpenDay: string;
  bookingOpenTime: string;
};

export const SemesterContext = createContext<SemesterDetailCardProps>(
  {} as SemesterDetailCardProps,
);

export const SemesterContextProvider = ({
  value,
  children,
}: PropsWithChildren<{ value: SemesterDetailCardProps }>) => {
  return (
    <SemesterContext.Provider value={value}>
      {children}
    </SemesterContext.Provider>
  );
};
