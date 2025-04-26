import { test, expect } from "@playwright/test";

test.describe("[UI] Registration", () => {
  const baseUrl = "https://anatoly-karpovich.github.io/aqa-course-project/#";

  const validCredentials = {
    username: "test@gmail.com",
    password: "12345678",
  };

  const emailInput = "#emailinput";
  const passwordInput = "#passwordinput";
  const loginButton = ".btn-lg";
  const totalOrdersContainer = "#total-orders-container";
  const ordersChartContainer = "#orders-chart-container";
  const recentOrdersContainer = "#recent-orders-container";
  const userMenuDropdown = "#dropdownUser1";
  const navigationMenu = "//*[contains(@class, 'nav-pills')]";


  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test("Should successfully register with valid credentials", async ({
    page,
  }) => {
    await page.locator(emailInput).fill(validCredentials.username);
    await page.locator(passwordInput).fill(validCredentials.password);
    await page.locator(loginButton).click();

    await expect(page.locator(totalOrdersContainer)).toBeVisible();
    await expect(page.locator(ordersChartContainer)).toBeVisible();
    await expect(page.locator(recentOrdersContainer)).toBeVisible();

    await expect(page.locator(userMenuDropdown)).toContainText("Anatoly");
    await expect(page.locator(navigationMenu)).toHaveScreenshot();
  });
});