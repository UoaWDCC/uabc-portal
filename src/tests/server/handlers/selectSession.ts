import { http, HttpResponse } from "msw";

export const selectSessionHandlers = [
  http.get("/api/users/123", () => {
    return HttpResponse.json({
      id: "123",
      firstName: "Test",
      lastName: "Name",
      member: true,
      verified: true,
      remainingSessions: 11,
    });
  }),
];
