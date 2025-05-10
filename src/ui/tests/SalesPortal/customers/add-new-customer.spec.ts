import test from "@playwright/test";
import { generateCustomerData } from "data/customers/generateCustomer.data";
import { NOTIFICATIONS } from "data/notifications.data";
import { getUserData } from "data/user.data";
import { AddNewCustomerPage } from "ui/pages/customers/add-new-customer.page";
import { CustomersPage } from "ui/pages/customers/customers.page";
import { HomePage } from "ui/pages/home.page";
import { SignInPage } from "ui/pages/signIn.page";

test.beforeEach(async ({ page }) => {
  await page.goto("https://anatoly-karpovich.github.io/aqa-course-project/#");
});

test.describe("[UI] [Sales Portal] [Customers]", async () => {
  const userData = getUserData();

  test("Should create customer with smoke data", async ({ page }) => {
    const signInPage = new SignInPage(page);
    const homePage = new HomePage(page);
    const customersPage = new CustomersPage(page);
    const addNewCustomerPage = new AddNewCustomerPage(page);

    await signInPage.waitForOpenedWithoutSpinner();
    await signInPage.fillCredentials(userData);
    await signInPage.clickOnLoginButton();

    await homePage.waitForOpenedWithSpinner();
    await homePage.clickModuleButton("Customers");
    await customersPage.waitForOpenedWithSpinner();
    await customersPage.clickAddNewCustomer();
    await addNewCustomerPage.waitForOpenedWithSpinner();
    const data = generateCustomerData();
    await addNewCustomerPage.fillInputs(data);
    await addNewCustomerPage.clickSaveNewCustomer();
    await customersPage.waitForOpenedWithSpinner();
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);
  });

  test("Should NOT create customer with duplicated email", async ({ page }) => {
    const signInPage = new SignInPage(page);
    const homePage = new HomePage(page);
    const customersPage = new CustomersPage(page);
    const addNewCustomerPage = new AddNewCustomerPage(page);

    await signInPage.waitForOpenedWithoutSpinner();
    await signInPage.fillCredentials(userData);
    await signInPage.clickOnLoginButton();

    await homePage.waitForOpenedWithSpinner();
    await homePage.clickModuleButton("Customers");
    await customersPage.waitForOpenedWithSpinner();
    await customersPage.clickAddNewCustomer();
    await addNewCustomerPage.waitForOpenedWithSpinner();
    const data = generateCustomerData();
    await addNewCustomerPage.fillInputs(data);
    await addNewCustomerPage.clickSaveNewCustomer();
    await customersPage.waitForOpenedWithSpinner();
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);

    await customersPage.clickAddNewCustomer();
    await addNewCustomerPage.waitForOpenedWithSpinner();
    await addNewCustomerPage.fillInputs(
      generateCustomerData({ email: data.email })
    );
    await addNewCustomerPage.clickSaveNewCustomer();
    await customersPage.waitForNotification(
      NOTIFICATIONS.CUSTOMER_DUPLICATED(data.email)
    );
  });
});
