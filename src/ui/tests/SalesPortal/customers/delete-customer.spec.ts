import { test, expect } from "fixtures/businessSteps.fixture";
import { generateCustomerData } from "data/customers/generateCustomer.data";
import { NOTIFICATIONS } from "data/notifications.data";
import { getUserData } from "data/user.data";
import _ from "lodash";

const data = generateCustomerData();
test.beforeEach(
  async ({ homePage, customersPage, addNewCustomerPage, loginAsLocalUser }) => {
    const userData = getUserData();

    await loginAsLocalUser(userData);

    await homePage.waitForOpenedWithSpinner();
    await homePage.clickModuleButton("Customers");

    await customersPage.waitForOpenedWithSpinner();
    await customersPage.clickAddNewCustomer();

    await addNewCustomerPage.waitForOpenedWithSpinner();
    await addNewCustomerPage.fillInputs(data);
    await addNewCustomerPage.clickSaveNewCustomer();

    await customersPage.waitForOpenedWithSpinner();
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);
  }
);

test.describe("[UI] [Sales Portal] [Customers]", async () => {
  test("Should delete existing customer", async ({ customersPage }) => {
    await expect(customersPage.tableRowByEmail(data.email)).toBeVisible();

    const actualCustomerData = await customersPage.getCustomerData(data.email);

    expect(actualCustomerData).toEqual(
      _.pick(data, ["email", "name", "country"])
    );

    await customersPage.clickDeleteCustomer(data.email);
    await customersPage.deleteModal.clickDelete();
    await customersPage.waitForSpinner();
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_DELETED);

    const actualTableData = await customersPage.getTableData();

    expect(
      !actualTableData.every((row) => data.email.includes(row.email)),
      "Expect table to not contain deleted customer"
    ).toBe(true);
  });
});
