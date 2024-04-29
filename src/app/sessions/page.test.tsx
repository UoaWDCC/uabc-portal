import { render, screen, userEvent } from "@/tests/test-utils";
import SelectSessionsPage from "./page";

//import {server} from "./server";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

//server.listen()

describe("Select Sessions page", () => {
  beforeEach(() => {
    /*jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockUserData),
    } as Response);*/
    render(<SelectSessionsPage />);
  });

  /*afterEach(() => {
    jest.resetAllMocks();
  });*/

  it("should render h1 with the text 'Sessions'", () => {
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Sessions",
    );
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
    const sessionsSelected = screen.getByText("0 / 2");
    const sessionCards = await screen.findAllByTestId("session-card");

    await user.click(sessionCards[0]);
    expect(sessionsSelected).toHaveTextContent("1 / 2");

    await user.click(sessionCards[1]);
    expect(sessionsSelected).toHaveTextContent("2 / 2");

    await user.click(sessionCards[2]);
    expect(sessionsSelected).toHaveTextContent("2 / 2");
  });
});
