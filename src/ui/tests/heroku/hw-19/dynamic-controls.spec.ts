import test, { expect } from "@playwright/test";

test.describe("[UI] Dynamic Controls", () => {
  const baseUrl = "https://the-internet.herokuapp.com/";
  const dynamicControlsLink = "//li/a[contains(.,'Dynamic Controls')]";
  const removeCheckboxButton = "//button[contains(.,'Remove')]";
  const pageTitle = "//div[@class='example']/h4[1]";
  const removeAddSectionTitle = "//div[@class='example']/h4[2]";
  const enableDisableSectionTitle = "//div[@class='example']/h4[3]";
  const pageDescription = "//div[@class='example']/p";
  const checkbox = "//input[@type='checkbox']";
  const removeButton = "//button[contains(.,'Remove')]";
  const addButton = "//button[contains(.,'Add')]";
  const message = "#message";

  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test("Should pass Add/Remove checkbox flow", async ({ page }) => {
    await page.locator(dynamicControlsLink).click();
    await expect(page.locator(removeCheckboxButton)).toBeVisible();

    await expect(page.locator(pageTitle)).toContainText("Dynamic Controls");
    await expect(page.locator(removeAddSectionTitle)).toContainText(
      "Remove/add"
    );
    await expect(page.locator(enableDisableSectionTitle)).toContainText(
      "Enable/disable"
    );
    await expect(page.locator(pageDescription)).toContainText(
      "This example demonstrates when elements (e.g., checkbox, input field, etc.) are changed asynchronously."
    );

    await page.locator(checkbox).check();
    await page.locator(removeButton).click();

    await expect(page.locator(checkbox)).not.toBeVisible();
    await expect(page.locator(addButton)).toBeVisible();
    await expect(page.locator(message)).toContainText("It's gone!");

    await page.locator(addButton).click();

    await expect(page.locator(checkbox)).toBeVisible();
    await expect(page.locator(message)).toContainText("It's back!");
  });
});
