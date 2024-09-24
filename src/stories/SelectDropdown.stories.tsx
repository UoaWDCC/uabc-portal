import * as React from "react";
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectDropdown = () => {
  const [selectedDay, setSelectedDay] = useState("");

  return (
    <div>
      <div>
        <Select onValueChange={setSelectedDay}>
          <SelectTrigger label="Days of the Week">
            <SelectValue placeholder="Select a day of the week" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Days</SelectLabel>
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

// Define the Storybook metadata for the component
const meta: Meta<typeof SelectDropdown> = {
  title: "Components/SelectDropdown",
  component: SelectDropdown,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Define the default story
export const Default: Story = {
  args: {},
};
