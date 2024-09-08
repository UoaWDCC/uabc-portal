"use client";

import * as React from "react";
import { useState } from "react";
import { twMerge } from "tailwind-merge"; // Merge Tailwind classes

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const SelectDropdown = () => {
  const [selectedDay, setSelectedDay] = useState("");

  return (
    <div className="flex flex-col space-y-4">
      <div className="relative">
        <Select onValueChange={setSelectedDay}>
          <SelectTrigger
            className={twMerge(
              "w-[280px] border-2 border-tertiary/70 p-2 outline-none transition-colors focus:border-primary focus:ring-primary",
              selectedDay && "border-primary text-primary" // Blue border and text when selected
            )}
          >
            <SelectValue placeholder="Select a day of the week" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="text-tertiary/70">
                Days of the Week
              </SelectLabel>
              <SelectItem value="monday">Monday</SelectItem>
              <SelectItem value="tuesday">Tuesday</SelectItem>
              <SelectItem value="wednesday">Wednesday</SelectItem>
              <SelectItem value="thursday">Thursday</SelectItem>
              <SelectItem value="friday">Friday</SelectItem>
              <SelectItem value="saturday">Saturday</SelectItem>
              <SelectItem value="sunday">Sunday</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {selectedDay && (
          <p className="mt-2 text-primary">
            <strong>
              {selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}
            </strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default SelectDropdown;
