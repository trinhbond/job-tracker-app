import { test, expect } from "@playwright/test";

const baseURL = "http://localhost:3000/";

test("has title", async ({ page }) => {
  await page.goto(baseURL);

  await expect(page).toHaveTitle(/Job Tracker/);
});

test("signup form errors", async ({ page }) => {
  await page.goto(baseURL);

  // No inputs
  await page.locator("input", { hasText: "Continue" }).click();
  await Promise.all([
    expect(page.locator("p", { hasText: "Name is required" })).toBeVisible(),
    expect(page.locator("p", { hasText: "Email is required" })).toBeVisible(),
    expect(
      page.locator("p", { hasText: "Password is required" })
    ).toBeVisible(),
  ]);

  // Invalid input
  await page.locator("form > div:nth-child(1) > input").fill("23");
  await page.locator("input", { hasText: "Continue" }).click();
  await expect(
    page.locator("p", {
      hasText: "Name cannot have symbols or special characters",
    })
  ).toBeVisible();

  await page.locator("form > div:nth-child(2) > input").fill("23");
  await page.locator("input", { hasText: "Continue" }).click();
  await expect(
    page.locator("p", {
      hasText: "Email is invalid",
    })
  ).toBeVisible();

  await page.locator("form > div:nth-child(3) > input").fill("23");
  await page.locator("input", { hasText: "Continue" }).click();
  await expect(
    page.locator("p", {
      hasText: "Password must be 6 characters or more",
    })
  ).toBeVisible();
});

test("login form errors", async ({ page }) => {
  await page.goto(baseURL);
  await page.locator("button", { hasText: "Sign in" }).click();

  await page.locator("input", { hasText: "Continue" }).click();

  await Promise.all([
    expect(page.locator("p", { hasText: "Email is required" })).toBeVisible(),
    expect(
      page.locator("p", { hasText: "Password is required" })
    ).toBeVisible(),
  ]);

  // Invalid input
  await page.locator("form > div:nth-child(1) > input").fill("email@test.com");
  await page.locator("form > div:nth-child(2) > input").fill("password");
  await page.locator("input", { hasText: "Continue" }).click();

  // Invalid credentials
  await expect(
    page.locator("p", {
      hasText: "Email or password is invalid",
    })
  ).toBeVisible();
});
