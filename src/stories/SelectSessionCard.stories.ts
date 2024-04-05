import type { Meta, StoryObj } from "@storybook/react";

import { SelectSessionCard } from "@/components/booking/SelectSessionList/SelectSessionCard";

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
    day: "Monday",
    startTime: new Date().toLocaleTimeString([], { timeStyle: "short" }),
    endTime: new Date().toLocaleTimeString([], { timeStyle: "short" }),
    location: "Location",
    status: "default",
  },
};

export const Selected: Story = {
  args: {
    day: "Monday",
    startTime: new Date().toLocaleTimeString([], { timeStyle: "short" }),
    endTime: new Date().toLocaleTimeString([], { timeStyle: "short" }),
    location: "Location",
    status: "selected",
  },
};

export const Disabled: Story = {
  args: {
    day: "Monday",
    startTime: new Date().toLocaleTimeString([], { timeStyle: "short" }),
    endTime: new Date().toLocaleTimeString([], { timeStyle: "short" }),
    location: "Location",
    status: "disabled",
  },
};
