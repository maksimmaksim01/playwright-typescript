import { test, expect } from "fixtures/businessSteps.fixture";
import { generateCustomerData } from "data/customers/generateCustomer.data";
import { NOTIFICATIONS } from "data/notifications.data";
import { getUserData } from "data/user.data";

test.beforeEach(async ({ homePage, loginAsLocalUser }) => {
  const userData = getUserData();

  await loginAsLocalUser(userData);
  await homePage.waitForOpenedWithSpinner();
  await homePage.clickModuleButton("Customers");
});

test.describe("[UI] [Sales Portal] [Customers]", async () => {
  test("Should create customer with smoke data", async ({
    customersPage,
    addNewCustomerPage,
    customerDetailsPage,
  }) => {
    const data = generateCustomerData();

    await customersPage.waitForOpenedWithSpinner();
    await customersPage.clickAddNewCustomer();

    await addNewCustomerPage.waitForOpenedWithSpinner();
    await addNewCustomerPage.fillInputs(data);
    await addNewCustomerPage.clickSaveNewCustomer();

    await customersPage.waitForOpenedWithSpinner();
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);
    await customersPage.clickCustomerDetails();

    await customerDetailsPage.waitForOpenedWithSpinner();

    await expect(customerDetailsPage.emailValue).toHaveText(data.email);
    await expect(customerDetailsPage.nameValue).toHaveText(data.name);
    await expect(customerDetailsPage.phoneValue).toHaveText(data.phone);
    if (data.notes !== undefined) {
      await expect(customerDetailsPage.notesValue).toHaveText(data.notes);
    }
    await expect(customerDetailsPage.countryValue).toHaveText(data.country);
    await expect(customerDetailsPage.cityValue).toHaveText(data.city);
    await expect(customerDetailsPage.streetValue).toHaveText(data.street);
    await expect(customerDetailsPage.houseValue).toHaveText(
      data.house.toString()
    );
    await expect(customerDetailsPage.flatValue).toHaveText(
      data.flat.toString()
    );
  });

  test("Should NOT create customer with duplicated email", async ({
    customersPage,
    addNewCustomerPage,
  }) => {
    const data = generateCustomerData();

    await customersPage.waitForOpenedWithSpinner();
    await customersPage.clickAddNewCustomer();

    await addNewCustomerPage.waitForOpenedWithSpinner();
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
