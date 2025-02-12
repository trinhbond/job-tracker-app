import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await expect(page).toHaveTitle(/Job Tracker/);
});

test("has error messages", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.locator("button", { hasText: "Continue" }).click();

  await Promise.all([
    expect(page.locator("p", { hasText: "Name is required" })).toBeVisible(),
    expect(page.locator("p", { hasText: "Email is required" })).toBeVisible(),
    expect(
      page.locator("p", { hasText: "Password is required" })
    ).toBeVisible(),
  ]);
});
