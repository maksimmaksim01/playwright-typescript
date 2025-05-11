import { SALES_PORTAL_URL } from "config/evnironment";
import { test as base } from "./pages.fixture";
import { IUser } from "types/user.types";

interface IBusinessSteps {
  loginAsLocalUser(userData: IUser): Promise<void>;
}

export const test = base.extend<IBusinessSteps>({
  loginAsLocalUser: async ({ page, homePage, signInPage }, use) => {
    await use(async (userData: IUser) => {
      await page.goto(SALES_PORTAL_URL);
      await signInPage.waitForOpenedWithoutSpinner();
      await signInPage.fillCredentials(userData);
      await signInPage.clickOnLoginButton();
      await homePage.waitForOpenedWithSpinner();
    });
  },
});

export { expect } from "@playwright/test";
