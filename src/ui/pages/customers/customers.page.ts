import { Locator } from "@playwright/test";
import { SalesPortalPage } from "../salesPortal.page";

export class CustomersPage extends SalesPortalPage {
  readonly addNewCustomerButton = this.page.getByRole("button", {
    name: "Add Customer",
  });
  readonly customerDetailsButton = this.page.getByTitle("Details");

  readonly uniqueElement = this.addNewCustomerButton;

  async clickAddNewCustomer() {
    await this.addNewCustomerButton.click();
  }

  async clickCustomerDetails() {
    await this.customerDetailsButton.first().click();
  }
}
