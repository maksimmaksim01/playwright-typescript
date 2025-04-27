import { test, expect } from "@playwright/test";

test.describe("[UI] Registration", () => {
  const baseUrl = "https://anatoly-karpovich.github.io/demo-registration-form/";

  const firstNameInput = "#firstName";
  const lastNameInput = "#lastName";
  const addressInput = "#address";
  const emailInput = "#email";
  const phoneNumberInput = "#phone";
  const countryDropdown = "#country";
  const maleGenderRadioOption = "//*[@value='male']";
  const travellingHobbyCheckboxOption = "//*[@value='Travelling']";
  const moviesHobbyCheckboxOption = "//*[@value='Movies']";
  const languageInput = "#language";
  const skillsSelect = "//*[@id='skills']";
  const dateOfBirthYearSelect = "//*[@id='year']";
  const dateOfBirthMonthSelect = "//*[@id='month']";
  const dateOfBirthDaySelect = "//*[@id='day']";
  const passwordInput = "#password";
  const confirmPasswordInput = "#password-confirm";
  const submitButton = "//*[@type='submit']";
  const registrationDetailsTitle =
    "//h2[contains(text(), 'Registration Details')]";
  const fullnameValue = "#fullName";
  const genderValue = "#gender";
  const skillsValue = "#skills";
  const hobbiesValue = "#hobbies";
  const dateOfBirthValue = "#dateOfBirth";
  const passwordValue = "#password";

  const testValues = {
    firstName: "first name",
    lastName: "last name",
    address: "123 demo street",
    email: "qwe@qwe.qwe",
    phoneNumber: "123-456-789",
    country: "USA",
    gender: "male",
    language: "eng",
    skills: ["JavaScript", "Ruby"],
    hobbies: ["Travelling", "Movies"],
    dateOfBirthDay: "1",
    dateOfBirthMonth: "January",
    dateOfBirthYear: "1970",
    password: "Password",
  };

  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test("Should successfully register with valid credentials", async ({
    page,
  }) => {
    await page.locator(firstNameInput).fill(testValues.firstName);
    await page.locator(lastNameInput).fill(testValues.lastName);
    await page.locator(addressInput).fill(testValues.address);
    await page.locator(emailInput).fill(testValues.email);
    await page.locator(phoneNumberInput).fill(testValues.phoneNumber);
    await page.locator(countryDropdown).selectOption(testValues.country);
    await page.locator(maleGenderRadioOption).check();
    await page.locator(travellingHobbyCheckboxOption).check();
    await page.locator(moviesHobbyCheckboxOption).check();
    await page.locator(languageInput).fill(testValues.language);
    await page
      .locator(skillsSelect)
      .selectOption([testValues.skills[0], testValues.skills[1]]);
    await page
      .locator(dateOfBirthYearSelect)
      .selectOption(testValues.dateOfBirthYear);
    await page
      .locator(dateOfBirthMonthSelect)
      .selectOption(testValues.dateOfBirthMonth);
    await page
      .locator(dateOfBirthDaySelect)
      .selectOption(testValues.dateOfBirthDay);
    await page.locator(passwordInput).fill(testValues.password);
    await page.locator(confirmPasswordInput).fill(testValues.password);
    await page.locator(submitButton).click();

    await expect(page.locator(registrationDetailsTitle)).toBeVisible();
    await expect(page.locator(fullnameValue)).toContainText(
      `${testValues.firstName} ${testValues.lastName}`
    );
    await expect(page.locator(addressInput)).toContainText(testValues.address);
    await expect(page.locator(emailInput)).toContainText(testValues.email);
    await expect(page.locator(phoneNumberInput)).toContainText(
      testValues.phoneNumber
    );
    await expect(page.locator(countryDropdown)).toContainText(
      testValues.country
    );
    await expect(page.locator(genderValue)).toContainText(testValues.gender);
    await expect(page.locator(languageInput)).toContainText(
      testValues.language
    );
    await expect(page.locator(skillsValue)).toContainText(
      `${testValues.skills[0]}, ${testValues.skills[1]}`
    );
    await expect(page.locator(hobbiesValue)).toContainText(
      `${testValues.hobbies[0]}, ${testValues.hobbies[1]}`
    );
    await expect(page.locator(dateOfBirthValue)).toContainText(
      `${testValues.dateOfBirthDay} ${testValues.dateOfBirthMonth} ${testValues.dateOfBirthYear}`
    );
    await expect(page.locator(passwordValue)).toContainText("***");
  });
});
