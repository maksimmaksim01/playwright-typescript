import { test, expect } from "fixtures/businessSteps.fixture";
import { generateCustomerData } from "data/customers/generateCustomer.data";
import { NOTIFICATIONS } from "data/notifications.data";
import _ from "lodash";
import { getUserData } from "data/user.data";

test.beforeEach(async ({ loginAsLocalUser, homePage }) => {
  const userData = getUserData();

  await loginAsLocalUser(userData);
  await homePage.clickModuleButton("Customers");
});
test.describe("[UI] [Sales Portal] [Customers]", async () => {
  test("Should check created customer in table", async ({
    customersPage,
    addNewCustomerPage,
  }) => {
    //Precondition
    const data = generateCustomerData();

    await customersPage.waitForOpenedWithSpinner();
    await customersPage.clickAddNewCustomer();

    await addNewCustomerPage.waitForOpenedWithSpinner();
    await addNewCustomerPage.fillInputs(data);
    await addNewCustomerPage.clickSaveNewCustomer();

    await customersPage.waitForOpenedWithSpinner();
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);
    //Act
    await expect(customersPage.tableRowByEmail(data.email)).toBeVisible();

    //Assert
    const actualCustomerData = await customersPage.getCustomerData(data.email);
    expect(actualCustomerData).toEqual(
      _.pick(data, ["email", "name", "country"])
    );
    await customersPage.clickDeleteCustomer(data.email);
  });

  test("Should check filtered by country table data", async ({
    customersPage,
  }) => {
    //Precondition
    const countriesToCheck = ["USA", "Belarus", "Germany"];

    await customersPage.waitForOpenedWithSpinner();
    await customersPage.clickFilter();
    await customersPage.filterModal.waitForOpenedWithSpinner();
    await customersPage.filterModal.checkFilters(...countriesToCheck);
    await customersPage.filterModal.clickApply();
    await customersPage.filterModal.waitForClosed();
    await customersPage.waitForOpenedWithSpinner();

    const actualTableData = await customersPage.getTableData();

    expect(
      actualTableData.every((row) => countriesToCheck.includes(row.country)),
      `Expect table to contain only customers from ${countriesToCheck.join(", ")}`
    ).toBe(true);
  });
});
