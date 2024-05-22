import { expect, test } from "@playwright/test";

import { signUpAndLogin } from "./utils/helper";
import { users } from "./utils/mock";

const user = users.onboarding[0];

test.beforeEach(async ({ page }) => {
  await signUpAndLogin(page, user.email, user.password);
});

test.afterEach(async ({ page }) => {
  page.request
    .get(`/api/auth/session`)
    .then((res) => res.json())
    .then(({ user }) => {
      page.request.delete(`/api/auth/users/${user.id}`);
    });
});

test.describe("Onboarding flow", () => {
  test("should navigate to the name page", async ({ page }) => {
    await expect(page).toHaveURL("/onboarding/name");
  });

  // test('should navigate to the member page', async ({ page }) => {
  //     await page.goto('http://localhost:3000/onboarding/name')
  //     await page.fill('text=First Name', 'John')
  //     await page.fill('text=Last Name', 'Doe')
  //     await page.click('text=Continue')
  //     await expect(page).toHaveURL('http://localhost:3000/onboarding/member')
  // })
});
