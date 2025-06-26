import { test, expect } from "@playwright/test";

const baseURL = "http://localhost:3000";

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto(baseURL);
  testInfo.setTimeout(testInfo.timeout + 30_000);
});

test("test signup form errors", async ({ page }) => {
  const form = page.locator(
    "#root > div.overflow-x-hidden > div.flex > div.min-w-full > form"
  );

  await form
    .locator("input")
    .getByText("Continue", { exact: true })
    .click({ timeout: 5000 });

  await Promise.all([
    expect(form.locator("p", { hasText: "Name is required" })).toBeVisible(),
    expect(form.locator("p", { hasText: "Email is required" })).toBeVisible(),
    expect(
      form.locator("p", { hasText: "Password is required" })
    ).toBeVisible(),
  ]);

  await form.locator("> div:nth-child(1) > input").fill("23");
  await form.locator("input", { hasText: "Continue" }).click();
  await expect(
    form.locator("p", {
      hasText: "Name cannot have symbols or special characters",
    })
  ).toBeVisible();

  await form.locator("> div:nth-child(2) > input").fill("23");
  await form.locator("input", { hasText: "Continue" }).click();
  await expect(
    form.locator("p", { hasText: "Email is invalid" })
  ).toBeVisible();

  await form.locator("> div:nth-child(3) > input").fill("23");
  await form.locator("input", { hasText: "Continue" }).click();
  await expect(
    form.locator("p", { hasText: "Password must be 6 characters or more" })
  ).toBeVisible();
});

test("test login form errors", async ({ page }) => {
  const form = page.locator(
    "#root > div.overflow-x-hidden > div.flex > div.min-w-full > form"
  );

  await form.locator("button", { hasText: "Sign in" }).click({ timeout: 5000 });
  await form.locator("input", { hasText: "Continue" }).click();

  await Promise.all([
    expect(form.locator("p", { hasText: "Email is required" })).toBeVisible(),
    expect(
      form.locator("p", { hasText: "Password is required" })
    ).toBeVisible(),
  ]);

  await form.locator("> div:nth-child(1) > input").fill("email@test.com");
  await form.locator("> div:nth-child(2) > input").fill("password");
  await form.locator("input", { hasText: "Continue" }).click();

  await expect(
    form.locator("p", {
      hasText: "Email or password is invalid",
    })
  ).toBeVisible();
});
