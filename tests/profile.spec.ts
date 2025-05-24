import { test, expect } from "@playwright/test";

const baseURL = "http://localhost:3000";

test.beforeEach(async ({ page }) => {
  await page.goto(baseURL);
});

test("navigate to profile", async ({ page }) => {
  await page.locator("button", { hasText: "Sign in" }).click({ timeout: 5000 });

  const emailField = page.getByPlaceholder("Email");
  await emailField.click({ timeout: 2500 });
  await emailField.fill("test@user.com");

  const passwordField = page.getByPlaceholder(
    "Password (6 or more characters)"
  );
  await passwordField.click({ timeout: 2500 });
  await passwordField.fill("password1");

  await page.locator("input", { hasText: "Continue" }).click({ timeout: 2500 });

  await page.waitForTimeout(5000);
  await expect(page.getByRole("heading", { name: "Profile" })).toBeVisible();
});
