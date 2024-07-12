import { expect } from "@playwright/test";

import { test } from "./lib/fixtures";
import { generateMockOnboardingUser } from "./utils/mock";

test.beforeEach(async ({ page, users }) => {
  const user = await users.create(generateMockOnboardingUser());
  await user.login();
  await page.goto("/sessions");
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
