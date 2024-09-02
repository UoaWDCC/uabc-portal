import type { Meta, StoryObj } from "@storybook/react";

import SelectDropdown from "@/components/SelectDropdown";

const meta: Meta<typeof SelectDropdown> = {
  title: "Components/SelectDropdown",
  component: SelectDropdown,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
