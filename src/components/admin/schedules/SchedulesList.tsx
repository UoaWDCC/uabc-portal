"use client";

import React, { useMemo } from "react";

import { useSchedules } from "@/hooks/query/useSchedules";
import { ScheduleDetailCard } from "./ScheduleDetailCard";
import { ScheduleContextProvider } from "./SchedulesContext";
import { SkeletonScheduleCard } from "./SkeletonScheduleCard";

interface SchedulesListProps {
  semesterId: number;
}

export const SchedulesList = ({ semesterId }: SchedulesListProps) => {
  const { data, isLoading } = useSchedules(semesterId);

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
        <SkeletonScheduleCard />
      </>
    );
  }

  return (
    <>
      {schedules?.map((schedule) => (
        <ScheduleContextProvider key={schedule.id} value={schedule}>
          <ScheduleDetailCard />
        </ScheduleContextProvider>
      ))}
    </>
  );
};
