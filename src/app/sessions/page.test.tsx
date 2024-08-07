import { render, screen, userEvent } from "@/tests/test-utils";
import ClientSessionPage from "./client-page";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: {
      verified: true,
    },
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: "authenticated" };
    }),
  };
});

describe("Select Sessions page", () => {
  beforeEach(() => {
    render(<ClientSessionPage isMember={true} prepaidSessions={2} />);
  });

  it("should initially render the button as disabled", () => {
    const button = screen.getByRole("button", { name: "Next" });

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("should make button enabled if session is selected", async () => {
    const user = userEvent.setup();
    const button = screen.getByRole("button", { name: "Next" });

    const sessionCards = await screen.findAllByTestId("session-card");
    await user.click(sessionCards[0]);

    expect(button).toBeEnabled();
  });

  it("should render n sessions selected after click", async () => {
    const user = userEvent.setup();
    const sessionsSelected = await screen.findByText("0 / 2");
    const sessionCards = await screen.findAllByTestId("session-card");

    await user.click(sessionCards[0]);
    expect(sessionsSelected).toHaveTextContent("1 / 2");

    await user.click(sessionCards[1]);
    expect(sessionsSelected).toHaveTextContent("2 / 2");

    await user.click(sessionCards[2]);
    expect(sessionsSelected).toHaveTextContent("2 / 2");
  });
});
