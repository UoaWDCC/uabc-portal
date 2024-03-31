import type { Meta, StoryObj } from "@storybook/react";

import { CountIndicator } from "@/components/CountIndicator";

const meta = {
  title: "CountIndicator",
  component: CountIndicator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof CountIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "1",
  },
};
