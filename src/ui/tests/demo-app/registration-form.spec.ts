import { test, expect } from "@playwright/test";

test.describe("[UI] Registration", () => {
  const baseUrl = "https://anatoly-karpovich.github.io/demo-registration-form/";

  const firstNameInput = "#firstName";
  const lastNameInput = "#lastName";
  const addressInput = "#address";
  const emailInput = "#email";
  const phoneNumberInput = "#phone";
  const countryDropdown = "#country";
  const genderRadioOption = "//*[@name='gender']";
  const hobbyCheckboxOption = "//*[@type='checkbox' and @class='hobby']";
  const languageInput = "#language";
  const skillsSelect = "//*[@id='skills']";
  const dateOfBirthYearSelect = "//*[@id='year']";
  const dateOfBirthMonthSelect = "//*[@id='month']";
  const dateOfBirthDaySelect = "//*[@id='day']";
  const passwordInput = "#password";
  const confirmPasswordInput = "#password-confirm";
  const submitButton = "//*[@type='submit']";
  const registrationDetailsTitle = "//h2[contains(text(), 'Registration Details')]";


  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test("Should successfully register with valid credentials", async ({
    page,
  }) => {
    await page.locator(firstNameInput).fill("first name");
    await page.locator(lastNameInput).fill("last name");
    await page.locator(addressInput).fill("123 demo street");
    await page.locator(emailInput).fill("qwe@qwe.qwe");
    await page.locator(phoneNumberInput).fill("123-456-789");
    await page.locator(countryDropdown).selectOption("USA");
    await page.locator(genderRadioOption).first().check();
    await page.locator(hobbyCheckboxOption).first().check();
    await page.locator(hobbyCheckboxOption).last().check();
    await page.locator(languageInput).fill("eng");
    await page.locator(skillsSelect).selectOption("JavaScript");
    await page.locator(skillsSelect).selectOption("Ruby");
    await page.locator(dateOfBirthYearSelect).selectOption("1970");
    await page.locator(dateOfBirthMonthSelect).selectOption("January");
    await page.locator(dateOfBirthDaySelect).selectOption("1");
    await page.locator(passwordInput).fill("Password");
    await page.locator(confirmPasswordInput).fill("Password");
    await page.locator(submitButton).click();

    await expect(page.locator(registrationDetailsTitle)).toBeVisible();
  });
});
