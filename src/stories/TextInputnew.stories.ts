import type { Meta, StoryObj } from "@storybook/react";

import { TextInputOld } from "@/components/ui/textInputnew";

const meta = {
  title: "TextInputnew",
  component: TextInputOld,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TextInputOld>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Text Input",
    value: "",
    type: "text",
    isError: false,
    onChange: () => {},
  },
};
