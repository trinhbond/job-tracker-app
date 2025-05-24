import { test, expect } from "@playwright/test";

const baseURL = "http://localhost:3000";

test.beforeEach(async ({ page }) => {
  await page.goto(baseURL);
});

test("should be able to select dropdown filter component", async ({ page }) => {
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

  await page.goto(`${baseURL}/applications`);

  await page.waitForTimeout(3000);

  // Toggle Select filter
  await page
    .locator(
      "div.MuiFormControl-root.css-1nrs0l5-MuiFormControl-root > div > div"
    )
    .click();

  const listItemsCount = await page.locator("li.MuiButtonBase-root").count();

  await Promise.all([
    expect(
      page.locator("li.MuiButtonBase-root", { hasText: "All" })
    ).toBeVisible(),
    expect(
      page.locator("li.MuiButtonBase-root", { hasText: "Applied" })
    ).toBeVisible(),
    expect(
      page.locator("li.MuiButtonBase-root", { hasText: "Interview" })
    ).toBeVisible(),
    expect(
      page.locator("li.MuiButtonBase-root", { hasText: "Offer" })
    ).toBeVisible(),
    expect(
      page.locator("li.MuiButtonBase-root", { hasText: "Rejected" })
    ).toBeVisible(),
    expect(listItemsCount).toBe(5),
  ]);

  await page.screenshot({ fullPage: true, path: "screenshot_app.png" });
});

test("toggle application form", async ({ page }) => {
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

  await page.goto(`${baseURL}/applications`);

  await page.waitForTimeout(3000);

  //
  await page.getByRole("button", { name: "Create" }).click();

  // Wait for page to settle
  await page.waitForTimeout(15000);

  await page
    .locator("div.MuiModal-root.css-1g04pbp-MuiModal-root > div.p-4", {
      has: page.getByRole("heading", { name: "New application" }),
    })
    .screenshot({ path: "form.png" });
  //   await page.screenshot({ fullPage: true, path: "form.png" });
});
// body > div.MuiModal-root.css-1g04pbp-MuiModal-root > div.p-4
