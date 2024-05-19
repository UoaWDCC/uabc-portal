import type { Meta, StoryObj } from "@storybook/react";

import { ExpandedSessionCard } from "@/components/booking/ExpandedSessionCard";
import { getWeekday } from "@/lib/utils";

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
  startTime: "2:00PM",
  endTime: "4:00PM",
  locationName: "Auckland Badminton Association",
  locationAddress: "99 Gillies Avenue",
  isFull: false,
};

export const Default: Story = {
  args: {
    gameSession,
  },
};
