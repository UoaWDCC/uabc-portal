"use client";

import React, { useMemo } from "react";

import { useCurrentSchedules } from "@/hooks/query/useCurrentSchedules";
import { ScheduleDetailCard } from "./ScheduleDetailCard";
import { ScheduleContextProvider } from "./SchedulesContext";
import { SkeletonScheduleCard } from "./SkeletonScheduleCard";

interface SchedulesListProps {
  semesterId: number;
}

export const SchedulesList = ({ semesterId }: SchedulesListProps) => {
  const { data, isLoading } = useCurrentSchedules(semesterId);

  const schedules = useMemo(
    () =>
      data?.map((schedule) => {
        return {
          id: schedule.id,
          semesterId: schedule.semesterId,
          weekday: schedule.weekday,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          locationName: schedule.locationName,
          locationAddress: schedule.locationAddress,
          capacity: schedule.capacity,
          casualCapacity: schedule.casualCapacity,
        };
      }),
    [data]
  );

  if (isLoading || !data) {
    return (
      <>
        <SkeletonScheduleCard />
        <SkeletonScheduleCard />
        <SkeletonScheduleCard />
      </>
    );
  }

  return (
    <>
      {schedules?.map((schedule) => (
        <ScheduleContextProvider key={schedule.id} value={schedule}>
          <ScheduleDetailCard semesterId={semesterId} />
        </ScheduleContextProvider>
      ))}
    </>
  );
};
