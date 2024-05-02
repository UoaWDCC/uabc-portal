import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/components/ui/button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      control: "radio",
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "ghost",
        "link",
      ],
    },
    large: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    disabled: false,
    children: "Button",
    variant: "default",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Button",
  },
};

export const Destructive: Story = {
  args: {
    disabled: false,
    variant: "destructive",
    children: "Button",
  },
};

export const Outline: Story = {
  args: {
    disabled: false,
    variant: "outline",
    children: "Button",
  },
};

export const Ghost: Story = {
  args: {
    disabled: false,
    variant: "ghost",
    children: "Button",
  },
};

export const Link: Story = {
  args: {
    disabled: false,
    variant: "link",
    children: "Button",
  },
};
