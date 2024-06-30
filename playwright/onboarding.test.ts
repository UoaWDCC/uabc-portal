import { expect, test } from "@playwright/test";

import { signUpAndLogin } from "./utils/helper";
import { generateMockOnboardingUser } from "./utils/mock";

test.beforeEach(async ({ page }) => {
  const user = generateMockOnboardingUser();
  await signUpAndLogin(page, user.email, user.password);
});

test.afterEach(async ({ page }) => {
  // await is necessary so test context is not disposed before the request is completed
  await page.request
    .get(`/api/auth/session`)
    .then((res) => res.json())
    .then(async ({ user }) => {
      await page.request.delete(`/api/users/${user.id}`);
    });
});

test.describe("Onboarding flow", () => {
  test("should navigate to the name page", async ({ page }) => {
    await expect(page).toHaveURL("/onboarding/name");
  });

  test("should navigate to the member page", async ({ page }) => {
    await page.getByRole("textbox").nth(0).fill("John");
    await page.getByRole("textbox").nth(1).fill("Doe");
    await page.click("text=Continue");
    await expect(page).toHaveURL("onboarding/member");
  });
  test("should navigate to the session page", async ({ page }) => {
    await page.getByRole("textbox").nth(0).fill("John");
    await page.getByRole("textbox").nth(1).fill("Doe");
    await page.click("text=Continue");
    await page.click("text=Prepaid Member");
    await page.click("text=Next");
    await expect(page).toHaveURL("sessions");
  });
  test("should fill in first name and last name before continuing", async ({
    page,
  }) => {
    const continueButton = await page.locator("text=Continue");
    await expect(continueButton).toBeDisabled();
  });

  test("should select membership type before continuing", async ({ page }) => {
    await page.getByRole("textbox").nth(0).fill("John");
    await page.getByRole("textbox").nth(1).fill("Doe");
    await page.click("text=Continue");
    const nextButton = await page.locator("text=Next");
    await expect(nextButton).toBeDisabled();
  });
});
