import { expect, test } from "@playwright/test";

import { env } from "@/env";

type credentials = {
  email: string;
  password: string;
};
const signIn = async (cred: credentials) => {
  return fetch(`/api/auth/csrf`)
    .then((r) => r.json())
    .then(({ csrfToken }) =>
      fetch(`/api/auth/callback/credentials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...cred, csrfToken, json: "true" }),
      }),
    );
};

const signOut = async () => {
  return fetch(`/api/auth/csrf`)
    .then((r) => r.json())
    .then(({ csrfToken }) =>
      fetch(`/api/auth/signout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csrfToken, json: "true" }),
      }),
    );
};

test.describe("Onboarding flow", () => {
  test("should navigate to the name page", async ({ page, request }) => {
    const res = await request.get(`/api`);
    console.log(await res.text());
    const { csrfToken } = await res.json();

    await request.post(`/api/auth/callback/credentials`, {
      data: {
        email: "test@user.com",
        password: "ABCabc123",
        csrfToken,
      },
    });

    // await page.goto('http://localhost:3000');
    await signIn({
      email: "test@user.com",
      password: "ABCabc123",
    });
    await expect(page).toHaveURL("/onboard/name");
  });

  // test('should navigate to the member page', async ({ page }) => {
  //     await page.goto('http://localhost:3000/onboard/name')
  //     await page.fill('text=First Name', 'John')
  //     await page.fill('text=Last Name', 'Doe')
  //     await page.click('text=Continue')
  //     await expect(page).toHaveURL('http://localhost:3000/onboard/member')
  // })
});
