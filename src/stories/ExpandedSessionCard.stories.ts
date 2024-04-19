import type { Meta, StoryObj } from "@storybook/react";

import { ExpandedSessionCard } from "@/components/booking/ExpandedSessionCard";
import { getShortenedTime, getWeekday } from "@/lib/utils";

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
    day: getWeekday(new Date()),
    startTime: getShortenedTime(new Date()),
    endTime: getShortenedTime(new Date()),
    location: "Auckland Badminton Association",
    address: " 9 Gillies Avenue",
  },
};
