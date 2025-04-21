import { test, expect, Page } from "@playwright/test";

test.describe("[UI] Registration", () => {
  const baseUrl = "https://anatoly-karpovich.github.io/demo-login-form/";

  const registerOnLoginButton = "#registerOnLogin";
  const usernameInput = "#userNameOnRegister";
  const passwordInput = "#passwordOnRegister";
  const registerButton = "#register";

  async function assertSuccessMessage(page: Page) {
    await expect(page.locator("#errorMessageOnRegister")).toContainText(
      "Successfully registered!"
    );
  }

  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
    await page.locator(registerOnLoginButton).click();
  });

  test("Should successfully display input fields and buttons", async ({
    page,
  }) => {

    await expect(page.locator(usernameInput)).toBeVisible();
    await expect(page.locator(passwordInput)).toBeVisible();
    await expect(page.locator(registerButton)).toBeVisible();
  });

  test("Should successfully register with valid maximum allowed length credentials", async ({
    page,
  }) => {
    const usernameValue = "u".repeat(40);
    const passwordValue = "P".repeat(10) + "p".repeat(10);

    await page.locator(usernameInput).fill(usernameValue);
    await page.locator(passwordInput).fill(passwordValue);
    await page.locator(registerButton).click();

    await assertSuccessMessage(page);
  });

  test("Should successfully register with valid minimum allowed length credentials", async ({
    page,
  }) => {
    await page.locator(usernameInput).fill("usr");
    await page.locator(passwordInput).fill("Password");
    await page.locator(registerButton).click();

    await assertSuccessMessage(page);
  });
});