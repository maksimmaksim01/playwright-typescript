import { test, expect, Page } from "@playwright/test";

test.describe("[UI] Registration", () => {
  const baseUrl = "https://anatoly-karpovich.github.io/demo-login-form/";

  const registerOnLoginButton = "#registerOnLogin";
  const usernameInput = "#userNameOnRegister";
  const passwordInput = "#passwordOnRegister";
  const registerButton = "#register";

  const invalidTestData = [
    {
      username: "",
      password: "Password",
      errorMessage: "Username is required",
    },
    {
      username: "ab",
      password: "Password",
      errorMessage: "Username should contain at least 3 characters",
    },
    {
      username: "a".repeat(41),
      password: "Password",
      errorMessage: "Username can't exceed 40 characters",
    },
    {
      username: " User",
      password: "Password",
      errorMessage: "Prefix and postfix spaces are not allowed is username",
    },
    {
      username: "User ",
      password: "Password",
      errorMessage: "Prefix and postfix spaces are not allowed is username",
    },
    {
      username: "Username",
      password: "",
      errorMessage: "Password is required",
    },
    {
      username: "Username",
      password: "Passwor",
      errorMessage: "Password should contain at least 8 characters",
    },
    {
      username: "Username",
      password: "a".repeat(21),
      errorMessage: "Password can't exceed 20 characters",
    },
    {
      username: "Username",
      password: "password",
      errorMessage: "Password should contain at least one capital letter",
    },
    {
      username: "Username",
      password: "       ",
      errorMessage: "Password is required",
    },
    {
      username: "",
      password: "",
      errorMessage: "Please, provide valid data",
    },
  ];

  async function assertMessage(page: Page, message: string) {
    await expect(page.locator("#errorMessageOnRegister")).toContainText(
      message
    );
  }

  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
    await page.locator(registerOnLoginButton).click();
  });

  for (const data of invalidTestData) {
    test(`Should unsuccessfully register with invalid credentials: username:${data.username}, password:${data.password} `, async ({
      page,
    }) => {
      await page.evaluate(() => {
        document
          .querySelector("#userNameOnRegister")
          ?.removeAttribute("maxlength");
      });
      await page.evaluate(() => {
        document
          .querySelector("#passwordOnRegister")
          ?.removeAttribute("maxlength");
      });

      await page.locator(usernameInput).fill(data.username);
      await page.locator(passwordInput).fill(data.password);
      await page.locator(registerButton).click();

      await assertMessage(page, data.errorMessage);
    });
  }
});

test.describe("[UI] Login", () => {
  const baseUrl = "https://anatoly-karpovich.github.io/demo-login-form/";

  const submitButton = "#submit";
  const usernameInput = "#userName";
  const passwordInput = "#password";
  const registerButton = "#register";

  const registerOnLoginButton = "#registerOnLogin";
  const registerUsernameInput = "#userNameOnRegister";
  const registerPasswordInput = "#passwordOnRegister";
  const backButton = "#backOnRegister";

  const invalidTestData = [
    {
      username: "",
      password: "Password",
      errorMessage: "Username is required",
    },
    {
      username: "Username",
      password: "",
      errorMessage: "Password is required",
    },
    {
      username: "",
      password: "",
      errorMessage: "Credentials are required",
    },
    {
      username: "nonexistent",
      password: "Password",
      errorMessage: "Invalid credentials",
    },
  ];

  async function assertMessage(page: Page, message: string) {
    await expect(page.locator("#errorMessage")).toContainText(message);
  }

  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  for (const data of invalidTestData) {
    test(`Should unsuccessfully login with invalid credentials: username:${data.username}, password:${data.password} `, async ({
      page,
    }) => {
      await page.locator(usernameInput).fill(data.username);
      await page.locator(passwordInput).fill(data.password);
      await page.locator(submitButton).click();

      await assertMessage(page, data.errorMessage);
    });
  }

  test("Should unsuccessfully login with invalid password for existing user", async ({
    page,
  }) => {
    
  const validTestData = [
    {
      username: "Username",
      password: "Password",
    }
  ];

    await page.locator(registerOnLoginButton).click();
    await page.locator(registerUsernameInput).fill(validTestData[0].username);
    await page.locator(registerPasswordInput).fill(validTestData[0].password);
    await page.locator(registerButton).click();
    await page.locator(backButton).click();
    
    await page.locator(usernameInput).fill(validTestData[0].username);
    await page.locator(passwordInput).fill("invalidpassword");
    await page.locator(submitButton).click();

    await assertMessage(page, "Invalid credentials");
  });
});