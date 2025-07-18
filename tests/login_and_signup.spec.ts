import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page, baseURL }) => {
  await page.goto("./");
});

test("basic test", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Ontrack" })).toBeVisible({
    timeout: 3000,
  });
});

test("test signup form errors", async ({ page }) => {
  const formElement = page.locator(
    "#root > div.overflow-x-hidden > div.flex > div.min-w-full > form"
  );

  await formElement
    .locator("input")
    .getByText("Continue", { exact: true })
    .click({ timeout: 5000 });

  await Promise.all([
    expect(
      formElement.locator("p", { hasText: "Name is required" })
    ).toBeVisible(),
    expect(
      formElement.locator("p", { hasText: "Email is required" })
    ).toBeVisible(),
    expect(
      formElement.locator("p", { hasText: "Password is required" })
    ).toBeVisible(),
  ]);

  await formElement.locator("> div:nth-child(1) > input").fill("23");
  await formElement.locator("input", { hasText: "Continue" }).click();
  await expect(
    formElement.locator("p", {
      hasText: "Name cannot have symbols or special characters",
    })
  ).toBeVisible();

  await formElement.locator("> div:nth-child(2) > input").fill("23");
  await formElement.locator("input", { hasText: "Continue" }).click();
  await expect(
    formElement.locator("p", { hasText: "Email is invalid" })
  ).toBeVisible();

  await formElement.locator("> div:nth-child(3) > input").fill("23");
  await formElement.locator("input", { hasText: "Continue" }).click();
  await expect(
    formElement.locator("p", {
      hasText: "Password must be 6 characters or more",
    })
  ).toBeVisible();
});

test("test login form errors", async ({ page }) => {
  const formElement = page.locator(
    "#root > div.overflow-x-hidden > div.flex > div.min-w-full > form"
  );

  await formElement
    .locator("button", { hasText: "Sign in" })
    .click({ timeout: 5000 });
  await formElement.locator("input", { hasText: "Continue" }).click();

  await Promise.all([
    expect(
      formElement.locator("p", { hasText: "Email is required" })
    ).toBeVisible(),
    expect(
      formElement.locator("p", { hasText: "Password is required" })
    ).toBeVisible(),
  ]);

  await formElement
    .locator("> div:nth-child(1) > input")
    .fill("email@test.com");
  await formElement.locator("> div:nth-child(2) > input").fill("password");
  await formElement.locator("input", { hasText: "Continue" }).click();

  await expect(
    formElement.locator("p", {
      hasText: "Email or password is invalid",
    })
  ).toBeVisible();
});
