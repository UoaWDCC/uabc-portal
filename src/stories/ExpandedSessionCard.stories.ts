import type { Meta, StoryObj } from "@storybook/react";

import { ExpandedSessionCard } from "@/components/booking/ExpandedSessionCard";

enum weekday {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}
const meta = {
  title: "ExpandedSessionCard",
  component: ExpandedSessionCard,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ExpandedSessionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    day: weekday.Monday,
    startTime: new Date(2022, 2, 15, 10, 0),
    endTime: new Date(2022, 2, 15, 12, 0),
    location: "Auckland Badminton Association",
    address: " 9 Gillies Avenue",
  },
};
