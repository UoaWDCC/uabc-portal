import React from "react";
import { RenderResult } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";

import SelectSessionPage from "@/app/sessions/page";
import { renderWithQueryClient } from "@/tests/utils";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

let screen: RenderResult;
let user: UserEvent;

beforeEach(() => {
  screen = renderWithQueryClient(<SelectSessionPage />);
  user = userEvent.setup();
});

describe("SelectSessionPage", () => {
  let sessionCount: HTMLElement;

  beforeEach(() => {
    sessionCount = screen.getByTestId("session-count");
  });

  it("should render the session heading", () => {
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Sessions");
  });

  it("should render the session list", async () => {
    const sessionList = await screen.findByTestId("session-list");
    expect(sessionList).toBeInTheDocument();
  });

  describe("session counter", () => {
    it("should initialise with 0 sessions", () => {
      expect(sessionCount).toHaveTextContent("0 / 2");
    });

    it("should increments the session counter by 1 when a session is selected", async () => {
      const sessionCard = await screen.findByText("Location 1");
      await user.click(sessionCard);
      expect(sessionCount).toHaveTextContent("1 / 2");
    });

    it("should not change the session counter when a full session is selected", async () => {
      const sessionCard = await screen.findByText("Location 4 (Full)");
      await user.click(sessionCard);
      expect(sessionCount).toHaveTextContent("0 / 2");
    });

    it("should decrement the session counter when session is deselected", async () => {
      const sessionCard = await screen.findByText("Location 1");
      await user.click(sessionCard); // Select
      await user.click(sessionCard); // Deselect
      expect(sessionCount).toHaveTextContent("0 / 2");
    });

    it("should not increment session count anymore after limit is reached", async () => {
      const sessionCards = await screen.findAllByTestId("session-card");
      for (const sessionCard of sessionCards) {
        await user.click(sessionCard);
      }
      expect(sessionCount).toHaveTextContent("2 / 2");
    });
  });

  describe("Button", () => {
    let button: HTMLElement;

    beforeEach(() => {
      button = screen.getByRole("button", { name: "Next" });
    });
    it("should be disabled initially", () => {
      expect(button).toBeDisabled();
    });

    it("should be enabled only when a session is selected", async () => {
      const sessionCard = await screen.findByText("Location 1");

      await user.click(sessionCard);
      expect(button).toBeEnabled();

      await user.click(sessionCard);
      expect(button).toBeDisabled();
    });
  });
});
