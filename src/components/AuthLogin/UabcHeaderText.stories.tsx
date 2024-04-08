import type { Meta, StoryObj } from "@storybook/react";

import { UabcHeaderText } from "./UabcHeaderText";

const meta = {
  title: "UABC Header Text",
  component: UabcHeaderText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UabcHeaderText>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
