import type { Meta, StoryObj } from "@storybook/react";

import { ExpandedSessionCard } from "@/components/booking/ExpandedSessionCard";

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
    day: "Monday",
    startTime: "5pm",
    endTime: "7pm",
    location: "Auckland Badminton Association",
    address: " 9 Gillies Avenue",
  },
};
