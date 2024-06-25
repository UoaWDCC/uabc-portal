"use client";

import React, { useMemo } from "react";

import { useCurrentSemesters } from "@/hooks/query/useCurrentSemesters";
import { SemesterDetailCard } from "./SemesterDetailCard";
import { SemesterContextProvider } from "./SemestersContext";
import { SkeletonSemesterCard } from "./SkeletonSemesterCard";

export const SemestersList = () => {
  const { data, isLoading } = useCurrentSemesters();

  data?.sort((a, b) => a.name.localeCompare(b.name));

  const semesters = useMemo(
    () =>
      data?.map((semester) => {
        return {
          id: semester.id,
          name: semester.name,
          startDate: new Date(semester.startDate).toLocaleDateString("en-NZ"),
          endDate: new Date(semester.endDate).toLocaleDateString("en-NZ"),
          breakStart: new Date(semester.breakStart).toLocaleDateString("en-NZ"),
          breakEnd: new Date(semester.breakEnd).toLocaleDateString("en-NZ"),
          bookingOpenDay: semester.bookingOpenDay,
          bookingOpenTime: semester.bookingOpenTime,
        };
      }),
    [data],
  );

  if (isLoading || !data) {
    return (
      <>
        <SkeletonSemesterCard />
        <SkeletonSemesterCard />
      </>
    );
  }

  return semesters?.map((semester) => (
    <SemesterContextProvider key={semester.id} value={semester}>
      <SemesterDetailCard />
    </SemesterContextProvider>
  ));
};

export default SemestersList;
