import type { Meta, StoryObj } from "@storybook/react";

import { SelectSessionCard } from "@/components/booking/sessions/SelectSessionList/SelectSessionCard";
import { getWeekday } from "@/lib/utils";

const meta = {
  title: "SelectSessionCard",
  component: SelectSessionCard,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: { type: "select" },
      options: ["default", "selected", "disabled"],
    },
  },
} satisfies Meta<typeof SelectSessionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    day: getWeekday(new Date()),
    startTime: "2:00PM",
    endTime: "4:00PM",
    location: "Location",
    status: "default",
  },
};

export const Selected: Story = {
  args: {
    day: getWeekday(new Date()),
    startTime: "2:00PM",
    endTime: "4:00PM",
    location: "Location",
    status: "selected",
  },
};

export const Disabled: Story = {
  args: {
    day: getWeekday(new Date()),
    startTime: "2:00PM",
    endTime: "4:00PM",
    location: "Location",
    status: "disabled",
  },
};
