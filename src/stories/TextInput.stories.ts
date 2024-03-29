import type { Meta, StoryObj } from "@storybook/react";

import { TextInput } from "@/components/TextInput";

const meta = {
  title: "TextInput",
  component: TextInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TextInput>;

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
