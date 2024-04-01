import React from "react";

import { SelectSessionList } from "@/components/booking/SelectSessionList/SelectSessionList";
import type { UserEvent } from "@/tests/test-utils";
import { render, screen, userEvent } from "@/tests/test-utils";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

jest.mock("@/hooks/query/useCurrentGameSessions", () => ({
  useCurrentGameSessions: jest.fn().mockReturnValue({
    data: [
      {
        id: 4,
        isFull: false,
      },
      {
        id: 3,
        isFull: false,
      },
      {
        id: 2,
        isFull: false,
      },
      {
        id: 1,
        isFull: true,
      },
    ],
    isLoading: false,
    error: {},
  }),
}));

describe("SelectSessionList", () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("should render 4 items in the the session list", async () => {
    render(<SelectSessionList isMember={true} onLimitReached={() => {}} />);
    const sessionCards = await screen.findAllByTestId("session-card");
    expect(sessionCards.length).toBe(4);
  });

  describe("general selection behaviour", () => {
    let onLimitReached: () => void;
    let sessionCards: HTMLElement[];

    beforeEach(async () => {
      onLimitReached = jest.fn();
      render(
        <SelectSessionList isMember={true} onLimitReached={onLimitReached} />,
      );
      sessionCards = await screen.findAllByTestId("session-card");
    });

    it("should add a session to the cart when clicked", async () => {
      const firstSessionCard = sessionCards[0];

      expect(firstSessionCard.getAttribute("aria-checked")).toBe("false");

      await user.click(firstSessionCard);

      expect(firstSessionCard.getAttribute("aria-checked")).toBe("true");
    });

    it("should not add a session to the cart if the session is full", async () => {
      const fullSessionCard = sessionCards[3];

      expect(fullSessionCard.getAttribute("aria-checked")).toBe("false");

      await user.click(fullSessionCard);

      expect(fullSessionCard.getAttribute("aria-checked")).toBe("false");
    });

    it("should remove a session from the cart when clicked", async () => {
      const firstSessionCard = sessionCards[0];

      await user.click(firstSessionCard);
      await user.click(firstSessionCard);

      expect(firstSessionCard.getAttribute("aria-checked")).toBe("false");
    });
  });

  describe("when the user is a member", () => {
    let onLimitReached: () => void;
    let sessionCards: HTMLElement[];

    beforeEach(async () => {
      onLimitReached = jest.fn();
      render(
        <SelectSessionList isMember={true} onLimitReached={onLimitReached} />,
      );
      sessionCards = await screen.findAllByTestId("session-card");
    });
    it("should not add a session to the cart if 2 sessions have already been selected", async () => {
      for (const sessionCard of sessionCards) {
        await user.click(sessionCard);
      }

      expect(sessionCards[0].getAttribute("aria-checked")).toBe("true");
      expect(sessionCards[1].getAttribute("aria-checked")).toBe("true");
      expect(sessionCards[2].getAttribute("aria-checked")).toBe("false");
    });

    it("should call onLimitReaced if the max number of sessions has been selected", async () => {
      for (const sessionCard of sessionCards) {
        await user.click(sessionCard);
      }

      expect(onLimitReached).toHaveBeenCalledTimes(1);
    });
  });

  describe("when the user is not a member", () => {
    let onLimitReached: () => void;
    let sessionCards: HTMLElement[];

    beforeEach(async () => {
      onLimitReached = jest.fn();
      render(
        <SelectSessionList isMember={false} onLimitReached={onLimitReached} />,
      );
      sessionCards = await screen.findAllByTestId("session-card");
    });
    it("should not add a session to the cart if 1 session has already been selected", async () => {
      for (const sessionCard of sessionCards) {
        await user.click(sessionCard);
      }

      expect(sessionCards[0].getAttribute("aria-checked")).toBe("true");
      expect(sessionCards[1].getAttribute("aria-checked")).toBe("false");
      expect(sessionCards[2].getAttribute("aria-checked")).toBe("false");
    });

    it("should call onLimitReaced if the max number of sessions has been selected", async () => {
      for (const sessionCard of sessionCards) {
        await user.click(sessionCard);
      }

      expect(onLimitReached).toHaveBeenCalledTimes(2);
    });
  });
});
