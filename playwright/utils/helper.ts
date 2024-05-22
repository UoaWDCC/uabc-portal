import type { Page } from "@playwright/test";

export const signUpAndLogin = async (
  page: Page,
  email: string,
  password: string,
): Promise<void> => {
  await page.request.post(`/api/auth/register`, {
    data: {
      email,
      password,
    },
  });

  const res = await page.request.get(`/api/auth/csrf`);
  const { csrfToken } = await res.json();

  await page.goto("/");

  // page.request stores cookies between requests
  await page.request.post(`/api/auth/callback/credentials`, {
    data: {
      email,
      password,
      csrfToken,
    },
  });

  await page.reload();
};
