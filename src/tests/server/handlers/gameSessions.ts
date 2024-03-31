import { http, HttpResponse } from "msw";

import { mockCurrentGameSessions } from "../../mock-data";

export const gameSessionHandlers = [
  http.get("/api/game-session/current", () => {
    return HttpResponse.json(mockCurrentGameSessions);
  }),
];
