import type { Meta, StoryObj } from "@storybook/react";

import { SelectSessionCard } from "@/components/booking/SelectSessionCard";

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
    weekday: 0,
    startTime: new Date().toLocaleTimeString([], { timeStyle: "short" }),
    endTime: new Date().toLocaleTimeString([], { timeStyle: "short" }),
    status: "default",
    locationName: "Location",
  },
};
