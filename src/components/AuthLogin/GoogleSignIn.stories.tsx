import type { Meta, StoryObj } from "@storybook/react";

import GoogleSignIn from "./GoogleSignIn";

const meta = {
  title: "GoogleSignInButton",
  component: GoogleSignIn,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof GoogleSignIn>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
