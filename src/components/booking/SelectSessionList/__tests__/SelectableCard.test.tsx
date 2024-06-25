import React from "react";

import { render, screen, userEvent } from "@/tests/test-utils";
import { SelectableCard } from "../SelectableCard";

const session = {
  id: 1,
  weekday: "Monday",
  startTime: "2:00PM",
  endTime: "4:00PM",
  locationName: "Location",
  locationAddress: "Address",
  isFull: false,
};

describe("SelectableCard", () => {
  it("should render the card correctly", () => {
    render(
      <SelectableCard
        session={session}
        checked={false}
        handleSessionClick={() => {}}
      />,
    );
    const card = screen.getByTestId("session-card");

    expect(card.textContent?.includes(session.weekday)).toBe(true);
    expect(card.textContent?.includes(session.startTime)).toBe(true);
    expect(card.textContent?.includes(session.endTime)).toBe(true);
    expect(card.textContent?.includes(session.locationName)).toBe(true);
  });

  it("should render the card as disabled if the session is full", () => {
    render(
      <SelectableCard
        session={{ ...session, isFull: true }}
        checked={false}
        handleSessionClick={() => {}}
      />,
    );
    const card = screen.getByTestId("session-card");

    expect(card.className).toContain("pointer-events-none");
    expect(card.textContent?.includes("(Session Full)")).toBe(true);
  });

  it("should call handleSessionClick when clicked", async () => {
    const handleSessionClick = jest.fn();
    const user = userEvent.setup();
    render(
      <SelectableCard
        session={session}
        checked={false}
        handleSessionClick={handleSessionClick}
      />,
    );
    const card = screen.getByTestId("session-card");

    await user.click(card);

    expect(handleSessionClick).toHaveBeenCalledWith(session.id);
  });
});
