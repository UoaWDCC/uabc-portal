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

const gameSession = {
  id: 1,
  weekday: getWeekday(new Date()),
  startTime: getShortenedTime(new Date()),
  endTime: getShortenedTime(new Date()),
  locationName: "Auckland Badminton Association",
  locationAddress: "99 Gillies Avenue",
  isFull: false,
};

export const Default: Story = {
  args: {
    gameSession,
  },
};
