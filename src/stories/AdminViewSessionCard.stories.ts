import type { Meta, StoryObj } from "@storybook/react";

import { AdminViewSessionCard } from "@/components/admin/view-sessions/AdminViewSessionCard";

const meta = {
  title: "AdminViewSessionCard",
  component: AdminViewSessionCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof AdminViewSessionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 123,
    title: "Thursday 21st March 2024",
    startTime: "12:00 PM",
    endTime: "1:00 PM",
    locationName: "Location Name",
    locationAddress: "Location Address",
    attendees: 10,
    totalCapacity: 20,
    state: "upcoming",
  },
};
