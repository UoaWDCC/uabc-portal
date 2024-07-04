import type { Meta, StoryObj } from "@storybook/react";

import SkeletonSessionCard from "../components/booking/SelectSessionList/SkeletonSessionCard";

const meta = {
  title: "SkeletonSessionCard",
  component: SkeletonSessionCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SkeletonSessionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
