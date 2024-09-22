"use client";

import * as React from "react";
import { useState } from "react";

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
    <div>
      <div>
        <Select onValueChange={setSelectedDay}>
          <SelectTrigger>
            <SelectValue placeholder="Select a day of the week" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Days of the Week</SelectLabel>
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
          <p>
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
