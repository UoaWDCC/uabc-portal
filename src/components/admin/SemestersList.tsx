"use client";

import React, { useMemo } from "react";

import { useCurrentSemesters } from "@/hooks/query/useCurrentSemesters";
import { SemesterDetailCard } from "./SemesterDetailCard";
import SkeletonSemesterCard from "./SkeletonSemesterCard";

export const SemestersList = () => {
  const { data, isLoading } = useCurrentSemesters();

  const semesters = useMemo(
    () =>
      data?.map((semester) => {
        console.log(typeof semester.startDate);
        return {
          id: semester.id,
          name: semester.name,
          startDate: new Date(semester.startDate).toLocaleDateString("en-NZ"),
          endDate: new Date(semester.endDate).toLocaleDateString("en-NZ"),
          breakStart: new Date(semester.breakStart).toLocaleDateString("en-NZ"),
          breakEnd: new Date(semester.breakEnd).toLocaleDateString("en-NZ"),
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
    <SemesterDetailCard
      key={semester.id}
      id={semester.id}
      name={semester.name}
      startDate={semester.startDate}
      endDate={semester.endDate}
      breakStart={semester.breakStart}
      breakEnd={semester.breakEnd}
    />
  ));
};

export default SemestersList;
