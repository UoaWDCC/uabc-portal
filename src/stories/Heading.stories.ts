import type { Meta, StoryObj } from "@storybook/react";

import { Heading } from "@/components/Heading";

const meta = {
  title: "Heading",
  component: Heading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Heading",
  },
};
